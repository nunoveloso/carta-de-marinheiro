import React, { useState, useEffect, useMemo } from 'react';
import {
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  Search,
  Filter,
  Compass,
  Star,
  FileText,
  X,
  Plus,
  BookOpen,
  Sparkles,
  ArrowUpDown,
  CheckCircle,
} from 'lucide-react';

import { auth, db, handleFirestoreError, OperationType, logOut } from './firebase';
import { NauticalTerm, TermCategory, TermImportance } from './types/glossary';
import { CATEGORIES, INITIAL_TERMS } from './data/initialTerms';
import { Navbar } from './components/Navbar';
import { TermCard } from './components/TermCard';
import { TermDetailModal } from './components/TermDetailModal';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { VisualGuideView } from './components/VisualGuideView';
import { AddTermModal } from './components/AddTermModal';
import { AuthModal } from './components/AuthModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'glossario' | 'flashcards' | 'quiz' | 'guia'>('glossario');

  // Terms state
  const [terms, setTerms] = useState<NauticalTerm[]>(INITIAL_TERMS);
  const [isSeedingFirestore, setIsSeedingFirestore] = useState(false);

  // User private study data
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImportance, setSelectedImportance] = useState<string>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [onlyWithNotes, setOnlyWithNotes] = useState(false);
  const [sortBy, setSortBy] = useState<'alpha' | 'importance' | 'category'>('alpha');

  // Modals state
  const [selectedTerm, setSelectedTerm] = useState<NauticalTerm | null>(null);
  const [isAddTermOpen, setIsAddTermOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // 2. Load and Sync Terms from Firestore collection 'terms'
  useEffect(() => {
    const termsCollectionRef = collection(db, 'terms');

    const unsubscribe = onSnapshot(
      termsCollectionRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: NauticalTerm[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as NauticalTerm;
            loaded.push({ ...data, id: docSnap.id });
          });
          // Merge with initial terms if any are missing
          const existingIds = new Set(loaded.map((t) => t.id));
          const merged = [...loaded];
          INITIAL_TERMS.forEach((it) => {
            if (!existingIds.has(it.id)) {
              merged.push(it);
            }
          });
          setTerms(merged);
        } else {
          // If Firestore is empty, auto-seed with official terms in background
          seedTermsToFirestore();
        }
      },
      (error) => {
        console.warn('Firestore snapshot error for terms, using cached syllabus:', error);
        handleFirestoreError(error, OperationType.GET, 'terms');
      }
    );

    return () => unsubscribe();
  }, []);

  // Auto-seed function to populate Firestore
  const seedTermsToFirestore = async () => {
    try {
      setIsSeedingFirestore(true);
      for (const t of INITIAL_TERMS) {
        await setDoc(doc(db, 'terms', t.id), {
          ...t,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Could not auto-seed Firestore (may require user sign-in):', err);
    } finally {
      setIsSeedingFirestore(false);
    }
  };

  // 3. User Bookmarks Listener (when signed in)
  useEffect(() => {
    if (!currentUser) {
      setBookmarkedIds(new Set());
      return;
    }

    const path = `users/${currentUser.uid}/bookmarks`;
    const bookmarksRef = collection(db, 'users', currentUser.uid, 'bookmarks');

    const unsubscribe = onSnapshot(
      bookmarksRef,
      (snapshot) => {
        const ids = new Set<string>();
        snapshot.forEach((d) => ids.add(d.id));
        setBookmarkedIds(ids);
      },
      (error) => {
        console.warn('Bookmarks snapshot error:', error);
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // 4. User Notes Listener (when signed in)
  useEffect(() => {
    if (!currentUser) {
      setUserNotes({});
      return;
    }

    const path = `users/${currentUser.uid}/notes`;
    const notesRef = collection(db, 'users', currentUser.uid, 'notes');

    const unsubscribe = onSnapshot(
      notesRef,
      (snapshot) => {
        const notesMap: Record<string, string> = {};
        snapshot.forEach((d) => {
          const data = d.data();
          if (data && data.note) {
            notesMap[d.id] = data.note;
          }
        });
        setUserNotes(notesMap);
      },
      (error) => {
        console.warn('Notes snapshot error:', error);
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Bookmark Toggle
  const handleToggleBookmark = async (termId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const isCurrently = bookmarkedIds.has(termId);
    const docRef = doc(db, 'users', currentUser.uid, 'bookmarks', termId);
    const path = `users/${currentUser.uid}/bookmarks/${termId}`;

    try {
      if (isCurrently) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          termId,
          userId: currentUser.uid,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      handleFirestoreError(
        error,
        isCurrently ? OperationType.DELETE : OperationType.CREATE,
        path
      );
    }
  };

  // Save Personal Note
  const handleSaveNote = async (termId: string, noteText: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const docRef = doc(db, 'users', currentUser.uid, 'notes', termId);
    const path = `users/${currentUser.uid}/notes/${termId}`;

    try {
      if (!noteText.trim()) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          termId,
          userId: currentUser.uid,
          note: noteText.trim(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Add new term to Firestore
  const handleAddNewTerm = async (newTerm: NauticalTerm) => {
    const docRef = doc(db, 'terms', newTerm.id);
    const path = `terms/${newTerm.id}`;

    try {
      await setDoc(docRef, newTerm);
      setTerms((prev) => [newTerm, ...prev]);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Filtered and Sorted Terms
  const filteredTerms = useMemo(() => {
    // Normalization helper for accent-insensitive search in Portuguese
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const queryNorm = normalize(searchQuery.trim());

    return terms
      .filter((term) => {
        // Search query match
        if (queryNorm) {
          const matchTerm = normalize(term.term).includes(queryNorm);
          const matchDef = normalize(term.definition).includes(queryNorm);
          const matchSyn = term.synonyms?.some((s) => normalize(s).includes(queryNorm));
          const matchTip = term.examTip ? normalize(term.examTip).includes(queryNorm) : false;
          if (!matchTerm && !matchDef && !matchSyn && !matchTip) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && term.category !== selectedCategory) {
          return false;
        }

        // Importance filter
        if (selectedImportance !== 'all' && term.importance !== selectedImportance) {
          return false;
        }

        // Bookmarked only
        if (onlyBookmarked && !bookmarkedIds.has(term.id)) {
          return false;
        }

        // With notes only
        if (onlyWithNotes && !userNotes[term.id]) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'alpha') {
          return a.term.localeCompare(b.term, 'pt');
        }
        if (sortBy === 'importance') {
          const weight: Record<TermImportance, number> = {
            essencial: 3,
            importante: 2,
            complementar: 1,
          };
          return weight[b.importance] - weight[a.importance];
        }
        if (sortBy === 'category') {
          return a.category.localeCompare(b.category, 'pt');
        }
        return 0;
      });
  }, [
    terms,
    searchQuery,
    selectedCategory,
    selectedImportance,
    onlyBookmarked,
    onlyWithNotes,
    sortBy,
    bookmarkedIds,
    userNotes,
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAddTerm={() => {
          if (!currentUser) setIsAuthModalOpen(true);
          else setIsAddTermOpen(true);
        }}
        onSignOut={logOut}
        termsCount={terms.length}
        bookmarksCount={bookmarkedIds.size}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* GLOSSÁRIO INTERATIVO TAB */}
        {activeTab === 'glossario' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            
            {/* Hero / Quick Search Banner */}
            <div className="relative rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20 mb-3">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>DGRM • Carta de Marinheiro • Nomenclatura & RIPAM</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Glossário Náutico Interativo
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Consulte os termos oficiais, regras do RIPAM, luzes de navegação e balizamento IALA da costa portuguesa com pronúncia áudio e dicas diretas para o exame.
                </p>

                {/* Instant Search Bar */}
                <div className="mt-5 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Search className="w-5 h-5 text-cyan-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar termo, manobra, sigla (ex: Estibordo, RIPAM, BB, Ferro, Ch 16, IALA)..."
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 py-3.5 pl-12 pr-10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filter and Category Pills */}
            <div className="space-y-4 mb-8">
              
              {/* Category selector chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === 'all'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  Todas ({terms.length})
                </button>

                {CATEGORIES.map((cat) => {
                  const count = terms.filter((t) => t.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Secondary Sub-filters: Importance, Bookmarks, Notes, Sorting */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-900 text-xs">
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* Importance Selector */}
                  <select
                    value={selectedImportance}
                    onChange={(e) => setSelectedImportance(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="all">Todas as Importâncias</option>
                    <option value="essencial">★ Apenas Exame Obrigatório</option>
                    <option value="importante">Muito Importante</option>
                    <option value="complementar">Complementar</option>
                  </select>

                  {/* Bookmark Filter Pill */}
                  <button
                    onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition ${
                      onlyBookmarked
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-amber-400' : ''}`} />
                    <span>Favoritos ({bookmarkedIds.size})</span>
                  </button>

                  {/* Notes Filter Pill */}
                  <button
                    onClick={() => setOnlyWithNotes(!onlyWithNotes)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition ${
                      onlyWithNotes
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Minhas Notas ({Object.keys(userNotes).length})</span>
                  </button>
                </div>

                {/* Sort Option */}
                <div className="flex items-center gap-2 text-slate-400">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'alpha' | 'importance' | 'category')}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-200 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="alpha">Ordem Alfabética (A-Z)</option>
                    <option value="importance">Importância no Exame</option>
                    <option value="category">Por Categoria</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Results Grid */}
            {filteredTerms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredTerms.map((term) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    isBookmarked={bookmarkedIds.has(term.id)}
                    hasNote={Boolean(userNotes[term.id])}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectTerm={setSelectedTerm}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center max-w-md mx-auto">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Nenhum termo náutico encontrado</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                  Não existem termos que correspondam à sua pesquisa "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedImportance('all');
                    setOnlyBookmarked(false);
                    setOnlyWithNotes(false);
                  }}
                  className="mt-4 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-500 transition"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            )}

          </div>
        )}

        {/* FLASHCARDS TAB */}
        {activeTab === 'flashcards' && (
          <FlashcardsView terms={terms} bookmarkedIds={bookmarkedIds} />
        )}

        {/* QUIZ EXAM SIMULATOR TAB */}
        {activeTab === 'quiz' && <QuizView />}

        {/* VISUAL GUIDE TAB */}
        {activeTab === 'guia' && <VisualGuideView />}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-300">
              Carta de Marinheiro • Aplicação PWA de Estudo & Glossário
            </p>
            <p className="mt-0.5 text-slate-500">
              Alinhado com o programa oficial DGRM, RIPAM (RIPEAM 1972) e Sistema de Balizamento IALA Região A.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Base de Dados: Cloud Firestore (<code className="text-cyan-400">carta-de-marinheiro</code>)</span>
            <span>•</span>
            <span>PWA Compatível com Android & iOS</span>
          </div>
        </div>
      </footer>

      {/* Offline Indicator Banner */}
      <OfflineIndicator />

      {/* MODAL: Term Details */}
      <TermDetailModal
        term={selectedTerm}
        allTerms={terms}
        onClose={() => setSelectedTerm(null)}
        isBookmarked={selectedTerm ? bookmarkedIds.has(selectedTerm.id) : false}
        onToggleBookmark={handleToggleBookmark}
        currentUser={currentUser}
        savedNote={selectedTerm ? userNotes[selectedTerm.id] || '' : ''}
        onSaveNote={handleSaveNote}
        onSelectTerm={setSelectedTerm}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* MODAL: Add New Term */}
      <AddTermModal
        isOpen={isAddTermOpen}
        onClose={() => setIsAddTermOpen(false)}
        currentUser={currentUser}
        onAddTerm={handleAddNewTerm}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* MODAL: User Auth & Firestore Seed */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        bookmarksCount={bookmarkedIds.size}
        notesCount={Object.keys(userNotes).length}
        onSeedFirestore={seedTermsToFirestore}
        isSeeding={isSeedingFirestore}
      />
    </div>
  );
}
