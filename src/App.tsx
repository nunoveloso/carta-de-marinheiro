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
  Compass,
  Star,
  FileText,
  X,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';

import { auth, db, handleFirestoreError, OperationType, logOut } from './firebase';
import { NauticalTerm, TermCategory, TermImportance } from './types/glossary';
import { CATEGORIES, INITIAL_TERMS, MANUAL_SECTIONS } from './data/initialTerms';
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
  const [selectedSection, setSelectedSection] = useState<string>('all');
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
          const loadedFromFirestore: NauticalTerm[] = [];
          snapshot.forEach((docSnap) => {
            loadedFromFirestore.push({ ...docSnap.data(), id: docSnap.id } as NauticalTerm);
          });
          setTerms(loadedFromFirestore);
        } else {
          setTerms(INITIAL_TERMS);
          seedTermsToFirestore();
        }
      },
      (error) => {
        console.warn('Firestore snapshot error for terms, using manual syllabus:', error);
      }
    );

    return () => unsubscribe();
  }, []);

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

  // 3. User Bookmarks Listener
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

  // 4. User Notes Listener
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
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const queryNorm = normalize(searchQuery.trim());

    return terms
      .filter((term) => {
        if (queryNorm) {
          const matchTerm = normalize(term.term).includes(queryNorm);
          const matchDef = normalize(term.definition).includes(queryNorm);
          const matchSyn = term.synonyms?.some((s) => normalize(s).includes(queryNorm));
          const matchTip = term.examTip ? normalize(term.examTip).includes(queryNorm) : false;
          const matchSection = term.section ? normalize(term.section).includes(queryNorm) : false;
          const matchSubsec = term.subsection ? normalize(term.subsection).includes(queryNorm) : false;
          if (!matchTerm && !matchDef && !matchSyn && !matchTip && !matchSection && !matchSubsec) return false;
        }

        if (selectedCategory !== 'all' && term.category !== selectedCategory) {
          return false;
        }

        if (selectedSection !== 'all' && term.section !== selectedSection) {
          return false;
        }

        if (selectedImportance !== 'all' && term.importance !== selectedImportance) {
          return false;
        }

        if (onlyBookmarked && !bookmarkedIds.has(term.id)) {
          return false;
        }

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
    selectedSection,
    selectedImportance,
    onlyBookmarked,
    onlyWithNotes,
    sortBy,
    bookmarkedIds,
    userNotes,
  ]);

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#1e293b] flex flex-col font-sans">
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
            
            {/* Hero / Quick Search Banner - Papyrus & Maritime Admiralty Look */}
            <div className="relative rounded-3xl border border-[#ded5c2] bg-[#f4efe4] p-6 sm:p-8 mb-8 shadow-xs">
              <div className="relative z-10 max-w-2xl">
                
                {/* Clean unboxed subtitle */}
                <div className="flex items-center gap-2 text-xs text-[#64748b] font-medium mb-2.5">
                  <Compass className="w-4 h-4 text-[#a16207]" />
                  <span>DGRM Portugal</span>
                  <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
                  <span>Manual do Marinheiro (2021)</span>
                </div>

                <h2 className="font-maritime text-3xl sm:text-5xl font-bold text-[#112338] tracking-tight leading-tight">
                  Glossário Náutico Interativo
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Consulte os termos e definições oficiais extraídos integralmente do <strong>Manual do Marinheiro</strong>, organizados pelas suas secções e subsecções originais, com pronúncia áudio, regras do R.I.E.A.M. e dicas de exame.
                </p>

                {/* Instant Search Bar */}
                <div className="mt-5 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#64748b]">
                    <Search className="w-5 h-5 text-[#a16207]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar termo, secção, manobra (ex: Quilha, Barlavento, Butakow, Ferro, Marés, IALA, Navtex)..."
                    className="w-full rounded-2xl border border-[#ded5c2] bg-white py-3.5 pl-12 pr-10 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338] shadow-2xs transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94a3b8] hover:text-[#112338]"
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
                      ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                      : 'border border-[#ded5c2] bg-white text-[#475569] hover:bg-[#eae3d2] hover:text-[#112338]'
                  }`}
                >
                  Todas as Categorias ({terms.length})
                </button>

                {CATEGORIES.map((cat) => {
                  const count = terms.filter((t) => t.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat.id
                          ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                          : 'border border-[#ded5c2] bg-white text-[#475569] hover:bg-[#eae3d2] hover:text-[#112338]'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Secondary Sub-filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#ede6d8] text-xs">
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* Manual Section Filter */}
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="rounded-xl border border-[#ded5c2] bg-white px-3 py-1.5 text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs font-semibold max-w-[200px] truncate"
                    title="Filtrar por Secção do Manual"
                  >
                    <option value="all">Todas as Secções do Manual ({MANUAL_SECTIONS.length})</option>
                    {MANUAL_SECTIONS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedImportance}
                    onChange={(e) => setSelectedImportance(e.target.value)}
                    className="rounded-xl border border-[#ded5c2] bg-white px-3 py-1.5 text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs font-medium"
                  >
                    <option value="all">Todas as Importâncias</option>
                    <option value="essencial">★ Apenas Exame Obrigatório</option>
                    <option value="importante">Muito Importante</option>
                    <option value="complementar">Complementar</option>
                  </select>

                  <button
                    onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition ${
                      onlyBookmarked
                        ? 'bg-[#112338] text-[#fbf8f2]'
                        : 'border border-[#ded5c2] bg-white text-[#475569] hover:bg-[#eae3d2] shadow-2xs'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-[#d97706]' : 'text-[#64748b]'}`} />
                    <span>Favoritos ({bookmarkedIds.size})</span>
                  </button>

                  <button
                    onClick={() => setOnlyWithNotes(!onlyWithNotes)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition ${
                      onlyWithNotes
                        ? 'bg-[#112338] text-[#fbf8f2]'
                        : 'border border-[#ded5c2] bg-white text-[#475569] hover:bg-[#eae3d2] shadow-2xs'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-[#64748b]" />
                    <span>Minhas Notas ({Object.keys(userNotes).length})</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[#64748b]">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'alpha' | 'importance' | 'category')}
                    className="rounded-xl border border-[#ded5c2] bg-white px-2.5 py-1 text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
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
                    allTerms={terms}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center max-w-md mx-auto">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4efe4] border border-[#ded5c2] text-[#64748b]">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="mt-4 font-maritime text-2xl font-bold text-[#112338]">
                  Nenhum termo náutico encontrado
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#64748b]">
                  Não existem termos que correspondam à sua pesquisa "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedSection('all');
                    setSelectedImportance('all');
                    setOnlyBookmarked(false);
                    setOnlyWithNotes(false);
                  }}
                  className="mt-4 rounded-xl bg-[#112338] px-4 py-2 text-xs font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition"
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
      <footer className="mt-auto border-t border-[#ded5c2] bg-[#f4efe4] py-8 text-xs text-[#64748b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-[#112338] font-maritime text-base">
              Carta de Marinheiro • Caderno de Estudo & Glossário Náutico
            </p>
            <p className="mt-0.5 text-[#64748b]">
              Alinhado com o programa oficial DGRM, RIPAM (RIPEAM 1972) e Sistema de Balizamento IALA Região A.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#64748b]">
            <span>Base de Dados: Cloud Firestore (<code className="text-[#112338] font-mono">carta-de-marinheiro</code>)</span>
            <span>•</span>
            <span>PWA Compatível</span>
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
