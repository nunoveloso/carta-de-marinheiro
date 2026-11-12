import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Sparkles,
} from 'lucide-react';

import { auth, db, handleFirestoreError, OperationType, logOut } from './firebase';
import {
  NauticalTerm,
  TermCategory,
  TermImportance,
  MainCategory,
  SubCategory,
  TAXONOMY_TREE,
  getMainCategoryForSubCategory,
} from './types/glossary';
import { CATEGORIES } from './data/initialTerms';
import { Navbar } from './components/Navbar';
import { TermCard } from './components/TermCard';
import { TermDetailModal } from './components/TermDetailModal';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { TestSimulator } from './components/tests/TestSimulator';
import { VisualGuideView } from './components/VisualGuideView';
import { StudyProgressView } from './components/StudyProgressView';
import { AddTermModal } from './components/AddTermModal';
import { AuthModal } from './components/AuthModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AlphabetFilter } from './components/AlphabetFilter';
import { DirectMatchesRow } from './components/DirectMatchesRow';

export default function App() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'glossario' | 'flashcards' | 'quiz' | 'guia' | 'progresso'>('glossario');

  // Terms state loaded dynamically from Firestore (sole source of truth)
  const [terms, setTerms] = useState<NauticalTerm[]>([]);
  const [isLoadingTerms, setIsLoadingTerms] = useState(true);

  // User private study data
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [selectedImportance, setSelectedImportance] = useState<string>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [onlyWithNotes, setOnlyWithNotes] = useState(false);
  const [sortBy, setSortBy] = useState<'alpha' | 'importance' | 'category'>('alpha');

  // Lazy loading state: 12 terms initially, +12 on scroll
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Helper to extract first normalized capital letter
  const getFirstLetter = (str: string) =>
    str
      .trim()
      .charAt(0)
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Calculate terms count per letter (filtered by active category)
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    terms.forEach((t) => {
      if (selectedCategory === 'all' || t.category === selectedCategory) {
        const letter = getFirstLetter(t.term);
        if (letter) {
          counts[letter] = (counts[letter] || 0) + 1;
        }
      }
    });
    return counts;
  }, [terms, selectedCategory]);

  // Reset selectedLetter if it no longer has terms in the selectedCategory
  useEffect(() => {
    if (selectedLetter !== 'all' && (!letterCounts[selectedLetter] || letterCounts[selectedLetter] === 0)) {
      setSelectedLetter('all');
    }
  }, [letterCounts, selectedLetter]);

  // Reset lazy load pagination whenever any filter or search changes
  useEffect(() => {
    setVisibleCount(12);
  }, [
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    selectedLetter,
    selectedImportance,
    onlyBookmarked,
    onlyWithNotes,
    sortBy,
  ]);

  // Dynamically derive available main categories from loaded Firestore terms
  const availableCategories = useMemo(() => {
    const presentCats = new Set<string>();
    terms.forEach((t) => {
      if (t.category) presentCats.add(t.category);
    });

    const list = CATEGORIES.filter((c) => presentCats.has(c.id));
    // Graceful fallback for any category present in DB not in metadata
    presentCats.forEach((catId) => {
      if (!list.some((c) => c.id === catId)) {
        list.push({
          id: catId,
          name: catId,
          description: catId,
          iconName: 'Compass',
          color: 'from-blue-600 to-indigo-700',
        });
      }
    });
    return list;
  }, [terms]);

  // Dynamically derive available subcategories based on terms actually present in DB
  const availableSubcategories = useMemo<SubCategory[]>(() => {
    const subSet = new Set<SubCategory>();
    terms.forEach((t) => {
      if (selectedCategory === 'all' || t.category === selectedCategory) {
        const sub = (t.subCategory || t.subcategory) as SubCategory | undefined;
        if (sub) {
          subSet.add(sub);
        }
      }
    });

    // Sort alphabetically for clean navigation
    return Array.from(subSet).sort((a, b) => a.localeCompare(b, 'pt'));
  }, [terms, selectedCategory]);

  // Reset selectedSubCategory if it no longer belongs to the selectedCategory
  useEffect(() => {
    if (selectedSubCategory !== 'all' && !availableSubcategories.includes(selectedSubCategory as SubCategory)) {
      setSelectedSubCategory('all');
    }
  }, [availableSubcategories, selectedSubCategory]);

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

  // 2. Load and Sync Terms directly from Firestore collection 'terms' (Sole Source of Truth)
  useEffect(() => {
    const termsCollectionRef = collection(db, 'terms');

    const unsubscribe = onSnapshot(
      termsCollectionRef,
      (snapshot) => {
        const loadedFromFirestore: NauticalTerm[] = [];
        snapshot.forEach((docSnap) => {
          const rawData = docSnap.data();
          const { section: _sec, subsection: _subSec, ...cleanData } = rawData as Record<string, any>;

          const subCat = (cleanData.subCategory || cleanData.subcategory) as SubCategory | undefined;
          const cat = (cleanData.category && Object.keys(TAXONOMY_TREE).includes(cleanData.category)
            ? cleanData.category
            : (subCat ? getMainCategoryForSubCategory(subCat) : 'Outras Matérias')) as MainCategory;

          loadedFromFirestore.push({
            ...cleanData,
            id: docSnap.id,
            category: cat,
            subCategory: subCat,
          } as NauticalTerm);
        });
        setTerms(loadedFromFirestore);
        setIsLoadingTerms(false);
      },
      (error) => {
        console.warn('Firestore snapshot error for terms:', error);
        setIsLoadingTerms(false);
      }
    );

    return () => unsubscribe();
  }, []);

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

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const sortTerms = (list: NauticalTerm[]) => {
    return list.slice().sort((a, b) => {
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
  };

  // Base terms filtered by category, subcategory, alphabet letter, importance, and user flags
  const baseFilteredTerms = useMemo(() => {
    return terms.filter((term) => {
      if (selectedCategory !== 'all' && term.category !== selectedCategory) {
        return false;
      }

      if (selectedSubCategory !== 'all') {
        const currentSub = term.subCategory || term.subcategory;
        if (currentSub !== selectedSubCategory) {
          return false;
        }
      }

      if (selectedLetter !== 'all' && getFirstLetter(term.term) !== selectedLetter) {
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
    });
  }, [
    terms,
    selectedCategory,
    selectedSubCategory,
    selectedLetter,
    selectedImportance,
    onlyBookmarked,
    onlyWithNotes,
    bookmarkedIds,
    userNotes,
  ]);

  // Search Results Split: Section 1 (Direct name matches) & Section 2 (Content matches)
  const isSearching = Boolean(searchQuery.trim());

  const { directNameMatches, contentMatches, nonSearchFilteredTerms } = useMemo(() => {
    const queryNorm = normalize(searchQuery.trim());

    if (!queryNorm) {
      return {
        directNameMatches: [] as NauticalTerm[],
        contentMatches: [] as NauticalTerm[],
        nonSearchFilteredTerms: sortTerms(baseFilteredTerms),
      };
    }

    const direct: NauticalTerm[] = [];
    const content: NauticalTerm[] = [];

    baseFilteredTerms.forEach((term) => {
      const matchName =
        normalize(term.term).includes(queryNorm) ||
        Boolean(term.synonyms?.some((s) => normalize(s).includes(queryNorm)));

      const matchDef = normalize(term.definition).includes(queryNorm);
      const matchTip = term.examTip ? normalize(term.examTip).includes(queryNorm) : false;
      const matchEx = term.example ? normalize(term.example).includes(queryNorm) : false;

      if (matchName) {
        direct.push(term);
      } else if (matchDef || matchTip || matchEx) {
        // Exclude terms that already matched directly by name
        content.push(term);
      }
    });

    return {
      directNameMatches: sortTerms(direct),
      contentMatches: sortTerms(content),
      nonSearchFilteredTerms: [] as NauticalTerm[],
    };
  }, [baseFilteredTerms, searchQuery, sortBy]);

  // Active cards list for the bottom cards grid
  const activeCardsList = isSearching ? contentMatches : nonSearchFilteredTerms;
  const visibleCards = activeCardsList.slice(0, visibleCount);
  const hasMore = visibleCount < activeCardsList.length;

  // Infinite Scroll IntersectionObserver (lazy load +12 on scroll)
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, activeCardsList.length));
        }
      },
      { rootMargin: '300px' }
    );

    const currentEl = sentinelRef.current;
    observer.observe(currentEl);

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [hasMore, activeCardsList.length]);

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
              
              {/* Alphabet Navigation (A-Z) */}
              <AlphabetFilter
                selectedLetter={selectedLetter}
                onSelectLetter={setSelectedLetter}
                letterCounts={letterCounts}
                totalCount={terms.length}
              />

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

                {availableCategories.map((cat) => {
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
                  {/* SubCategory Filter */}
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="rounded-xl border border-[#ded5c2] bg-white px-3 py-1.5 text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs font-semibold max-w-[220px] truncate"
                    title="Filtrar por Subcategoria"
                  >
                    <option value="all">
                      {selectedCategory === 'all'
                        ? `Todas as Subcategorias (${availableSubcategories.length})`
                        : `Subcategorias de ${selectedCategory} (${availableSubcategories.length})`}
                    </option>
                    {availableSubcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
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

            {/* Loading State */}
            {isLoadingTerms && terms.length === 0 ? (
              <div className="py-20 text-center max-w-md mx-auto">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4efe4] border border-[#ded5c2] text-[#112338]">
                  <Compass className="w-8 h-8 animate-spin text-[#a16207]" />
                </div>
                <h3 className="mt-4 font-maritime text-xl font-bold text-[#112338]">
                  A carregar termos náuticos...
                </h3>
                <p className="mt-1 text-xs text-[#64748b]">
                  A sincronizar os dados da Cloud Firestore.
                </p>
              </div>
            ) : isSearching ? (
              /* SEARCH VIEW: TWO DISTINCT SECTIONS */
              <div className="space-y-8">
                {/* SECTION 1: Direct matches in the term name (horizontal single row) */}
                {directNameMatches.length > 0 && (
                  <DirectMatchesRow
                    terms={directNameMatches}
                    searchQuery={searchQuery}
                    bookmarkedIds={bookmarkedIds}
                    userNotes={userNotes}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectTerm={setSelectedTerm}
                    allTerms={terms}
                  />
                )}

                {/* SECTION 2: Matches inside the card content (definition, examTip, example) */}
                {contentMatches.length > 0 ? (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#ded5c2] pb-2.5">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#a16207]" />
                        <h3 className="font-maritime text-base sm:text-lg font-bold text-[#112338]">
                          Termos com correspondência no conteúdo ({contentMatches.length})
                        </h3>
                      </div>
                      <span className="text-xs text-[#64748b]">
                        A mostrar {visibleCards.length} de {contentMatches.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {visibleCards.map((term) => (
                        <TermCard
                          key={term.id}
                          term={term}
                          isBookmarked={bookmarkedIds.has(term.id)}
                          hasNote={Boolean(userNotes[term.id])}
                          onToggleBookmark={handleToggleBookmark}
                          onSelectTerm={setSelectedTerm}
                          allTerms={terms}
                          highlightQuery={searchQuery}
                        />
                      ))}
                    </div>

                    {/* Infinite Scroll Sentinel */}
                    <div ref={sentinelRef} className="h-6 w-full" />

                    {/* Lazy load indicator or manual button */}
                    {hasMore && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => setVisibleCount((prev) => Math.min(prev + 12, contentMatches.length))}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#ded5c2] bg-white px-5 py-2.5 text-xs font-semibold text-[#112338] shadow-2xs hover:bg-[#f4efe4] transition"
                        >
                          <span>Carregar mais 12 termos</span>
                          <span className="text-[#a16207] font-bold">({contentMatches.length - visibleCount} restantes)</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : directNameMatches.length > 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#ded5c2] bg-[#fcfaf7] p-6 text-center text-xs text-[#64748b]">
                    Não foram encontradas menções adicionais a "{searchQuery}" nas definições ou dicas de exame de outros termos.
                  </div>
                ) : (
                  /* No direct matches and no content matches */
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
                        setSelectedSubCategory('all');
                        setSelectedLetter('all');
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
            ) : (
              /* REGULAR BROWSING VIEW (NO SEARCH QUERY) WITH LAZY LOAD */
              <div>
                {/* Result count bar */}
                <div className="flex items-center justify-between mb-4 text-xs text-[#64748b] border-b border-[#ede6d8] pb-2">
                  <div className="flex items-center gap-2">
                    <span>
                      A mostrar <strong>{visibleCards.length}</strong> de <strong>{activeCardsList.length}</strong> termos
                      {selectedLetter !== 'all' && (
                        <span className="ml-1 text-[#a16207] font-semibold">(Letra {selectedLetter})</span>
                      )}
                      {selectedCategory !== 'all' && (
                        <span className="ml-1 text-[#112338]">· {selectedCategory}</span>
                      )}
                      {selectedSubCategory !== 'all' && (
                        <span className="ml-1 text-[#64748b]">› {selectedSubCategory}</span>
                      )}
                    </span>
                  </div>

                  {activeCardsList.length > 0 && (
                    <span>
                      {visibleCards.length === activeCardsList.length
                        ? 'Todos os termos carregados'
                        : `Scroll para carregar mais (+12)`}
                    </span>
                  )}
                </div>

                {activeCardsList.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {visibleCards.map((term) => (
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

                    {/* Infinite Scroll Sentinel */}
                    <div ref={sentinelRef} className="h-8 w-full" />

                    {/* Manual load more button */}
                    {hasMore && (
                      <div className="mt-8 text-center">
                        <button
                          onClick={() => setVisibleCount((prev) => Math.min(prev + 12, activeCardsList.length))}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#ded5c2] bg-white px-6 py-2.5 text-xs font-semibold text-[#112338] shadow-2xs hover:bg-[#f4efe4] transition"
                        >
                          <span>Carregar mais 12 termos</span>
                          <span className="text-[#a16207] font-bold">({activeCardsList.length - visibleCount} restantes)</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-16 text-center max-w-md mx-auto">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4efe4] border border-[#ded5c2] text-[#64748b]">
                      <Search className="w-7 h-7" />
                    </div>
                    <h3 className="mt-4 font-maritime text-2xl font-bold text-[#112338]">
                      Nenhum termo encontrado
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#64748b]">
                      Nenhum termo corresponde aos filtros selecionados
                      {selectedLetter !== 'all' ? ` para a letra "${selectedLetter}"` : ''}.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedSubCategory('all');
                        setSelectedLetter('all');
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

          </div>
        )}

        {/* FLASHCARDS TAB */}
        {activeTab === 'flashcards' && (
          <FlashcardsView terms={terms} bookmarkedIds={bookmarkedIds} />
        )}

        {/* QUIZ EXAM SIMULATOR TAB */}
        {activeTab === 'quiz' && <TestSimulator />}

        {/* VISUAL GUIDE TAB */}
        {activeTab === 'guia' && (
          <VisualGuideView
            terms={terms}
            onSelectTerm={setSelectedTerm}
            currentUser={currentUser}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            userNotes={userNotes}
            onSaveNote={handleSaveNote}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* STUDY PROGRESS TAB */}
        {activeTab === 'progresso' && (
          <StudyProgressView
            terms={terms}
            userNotes={userNotes}
            bookmarkedIds={bookmarkedIds}
            onSelectTerm={setSelectedTerm}
            onNavigateToTab={setActiveTab}
          />
        )}

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

      {/* MODAL: User Auth & Cloud Account */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        bookmarksCount={bookmarkedIds.size}
        notesCount={Object.keys(userNotes).length}
        termsCount={terms.length}
      />
    </div>
  );
}
