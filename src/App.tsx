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
  getCategoryStyle,
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
import { HomePage } from './components/HomePage';
import { EstudoPage } from './components/EstudoPage';
import { SobrePage } from './components/SobrePage';
import { ContactoPage } from './components/ContactoPage';
import { AddTermModal } from './components/AddTermModal';
import { AuthModal } from './components/AuthModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AlphabetFilter } from './components/AlphabetFilter';
import { CategoryIcon } from './components/CategoryIcon';
import {
  RouteId,
  ROUTES,
  getRouteFromPathname,
  normalizePathname,
  applyRouteSEO,
} from './utils/routes';

export default function App() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Client-side URL route state
  const [activeRoute, setActiveRoute] = useState<RouteId>(() =>
    getRouteFromPathname(window.location.pathname).id
  );

  const navigateTo = (routeId: RouteId) => {
    const targetPath = ROUTES[routeId].path;
    if (normalizePathname(window.location.pathname) !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setActiveRoute(routeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(getRouteFromPathname(window.location.pathname).id);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    applyRouteSEO(ROUTES[activeRoute]);
  }, [activeRoute]);

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
          iconName: 'Map',
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
      if (!user) {
        setOnlyBookmarked(false);
        setOnlyWithNotes(false);
      }
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
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

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
  const queryNorm = useMemo(() => normalize(searchQuery), [searchQuery]);
  const isSearching = Boolean(queryNorm);

  const { directNameMatches, contentMatches, nonSearchFilteredTerms } = useMemo(() => {
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
  }, [baseFilteredTerms, queryNorm, sortBy]);

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
    <div className="min-h-screen bg-[#faf7f0] text-[#0b3a55] flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeRoute={activeRoute}
        onNavigate={navigateTo}
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
        {/* HOME (/) */}
        {activeRoute === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            termsCount={terms.length}
            bookmarksCount={bookmarkedIds.size}
          />
        )}

        {/* GLOSSÁRIO INTERATIVO (/glossario) */}
        {activeRoute === 'glossario' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            
            {/* Hero / Quick Search Banner - Chart Paper & Admiralty Editorial Look */}
            <div className="relative rounded-xs border border-[#d7d0c1] bg-[#ede9de]/45 p-6 sm:p-8 mb-8">
              <div className="relative z-10 max-w-2xl">
                
                {/* Clean monospaced archival kicker */}
                <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-[#4f6e82] mb-2.5">
                  <Compass className="w-4 h-4 text-[#9a7413]" />
                  <span>DGRM Portugal</span>
                  <span aria-hidden="true" className="text-[#d7d0c1]">·</span>
                  <span>Manual do Marinheiro (2021)</span>
                </div>

                <h2 className="font-maritime text-3xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight leading-tight">
                  Glossário Náutico Interativo
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-[#4f6e82] leading-relaxed">
                  Consulte os termos e definições oficiais extraídos integralmente do <strong className="text-[#0b3a55]">Manual do Marinheiro</strong>, organizados pelas suas secções e subsecções originais, com pronúncia áudio, regras do R.I.E.A.M. e dicas de exame.
                </p>

                {/* Instant Search Bar */}
                <div className="mt-5 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#4f6e82]">
                    <Search className="w-5 h-5 text-[#9a7413]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar termo, secção, manobra (ex: Quilha, Barlavento, Butakow, Ferro, Marés, IALA, Navtex)..."
                    className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] py-3.5 pl-12 pr-10 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:outline-none focus:ring-1 focus:ring-[#0b3a55] transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#4f6e82] hover:text-[#0b3a55] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filter and Category Controls */}
            <div className="space-y-4 mb-8">
              
              {/* Alphabet Navigation (A-Z) */}
              <AlphabetFilter
                selectedLetter={selectedLetter}
                onSelectLetter={setSelectedLetter}
                letterCounts={letterCounts}
                totalCount={terms.length}
              />

              {/* Category selector buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-xs px-3.5 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium whitespace-nowrap shrink-0 border transition cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                      : 'border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:border-[#0b3a55] hover:bg-[#ede9de] hover:text-[#0b3a55]'
                  }`}
                >
                  Todas as Categorias ({terms.length})
                </button>

                {availableCategories.map((cat) => {
                  const count = terms.filter((t) => t.category === cat.id).length;
                  const catStyle = getCategoryStyle(cat.id);
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={
                        isActive
                          ? { backgroundColor: catStyle.solid, borderColor: catStyle.solid, color: '#faf7f0' }
                          : undefined
                      }
                      className={`inline-flex items-center gap-2 rounded-xs px-3.5 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium whitespace-nowrap shrink-0 border transition cursor-pointer ${
                        isActive
                          ? ''
                          : 'border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:border-[#0b3a55] hover:bg-[#ede9de] hover:text-[#0b3a55]'
                      }`}
                    >
                      <CategoryIcon
                        category={cat.id}
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: isActive ? '#faf7f0' : catStyle.solid }}
                      />
                      <span>{cat.name} ({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Secondary Sub-filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#d7d0c1] text-xs">
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* SubCategory Filter */}
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] px-3 py-1.5 text-[#0b3a55] hover:border-[#0b3a55] focus:border-[#0b3a55] focus:outline-none font-semibold max-w-[240px] truncate cursor-pointer transition"
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
                    className="rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] px-3 py-1.5 text-[#0b3a55] hover:border-[#0b3a55] focus:border-[#0b3a55] focus:outline-none font-medium cursor-pointer transition"
                  >
                    <option value="all">Todas as Importâncias</option>
                    <option value="essencial">★ Apenas Exame Obrigatório</option>
                    <option value="importante">Muito Importante</option>
                    <option value="complementar">Complementar</option>
                  </select>

                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setIsAuthModalOpen(true);
                        return;
                      }
                      setOnlyBookmarked(!onlyBookmarked);
                    }}
                    className={`flex items-center gap-1.5 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.04em] font-medium whitespace-nowrap shrink-0 border transition cursor-pointer ${
                      onlyBookmarked
                        ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                        : 'border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:border-[#0b3a55] hover:bg-[#ede9de] hover:text-[#0b3a55]'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-[#ca9e1c] text-[#ca9e1c]' : 'text-[#9a7413]'}`} />
                    <span>Favoritos ({bookmarkedIds.size})</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setIsAuthModalOpen(true);
                        return;
                      }
                      setOnlyWithNotes(!onlyWithNotes);
                    }}
                    className={`flex items-center gap-1.5 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.04em] font-medium whitespace-nowrap shrink-0 border transition cursor-pointer ${
                      onlyWithNotes
                        ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                        : 'border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:border-[#0b3a55] hover:bg-[#ede9de] hover:text-[#0b3a55]'
                    }`}
                  >
                    <FileText className={`w-3.5 h-3.5 ${onlyWithNotes ? 'text-[#ca9e1c]' : 'text-[#4f6e82]'}`} />
                    <span>Minhas Notas ({Object.keys(userNotes).length})</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[#4f6e82]">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span className="font-mono-naut text-[11px] uppercase tracking-wider">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'alpha' | 'importance' | 'category')}
                    className="rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] px-2.5 py-1 text-[#0b3a55] hover:border-[#0b3a55] focus:border-[#0b3a55] focus:outline-none font-medium cursor-pointer transition"
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
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                  <Compass className="w-8 h-8 animate-spin text-[#9a7413]" />
                </div>
                <h3 className="mt-4 font-maritime text-xl font-bold text-[#0b3a55]">
                  A carregar termos náuticos...
                </h3>
                <p className="mt-1 font-mono-naut text-xs text-[#4f6e82]">
                  A sincronizar os dados da Cloud Firestore.
                </p>
              </div>
            ) : isSearching ? (
              /* SEARCH VIEW: TWO DISTINCT SECTIONS */
              <div className="space-y-8">
                {/* SECTION 1: Direct matches in the term name */}
                {directNameMatches.length > 0 && (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#d7d0c1] pb-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#9a7413]" />
                        <h3 className="font-maritime text-base sm:text-lg font-bold text-[#0b3a55]">
                          Correspondências Diretas no Nome do Termo ({directNameMatches.length})
                        </h3>
                      </div>
                      <span className="font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82]">
                        {directNameMatches.length === 1
                          ? '1 termo com nome coincidente'
                          : `${directNameMatches.length} termos com nomes coincidentes`}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {directNameMatches.map((term) => (
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
                  </div>
                )}

                {/* SECTION 2: Matches inside the card content (definition, examTip, example) */}
                {contentMatches.length > 0 ? (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#d7d0c1] pb-2.5">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#9a7413]" />
                        <h3 className="font-maritime text-base sm:text-lg font-bold text-[#0b3a55]">
                          Termos com correspondência no conteúdo ({contentMatches.length})
                        </h3>
                      </div>
                      <span className="font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82]">
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
                          className="inline-flex items-center gap-2 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-5 py-2.5 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de]/50 transition"
                        >
                          <span>Carregar mais 12 termos</span>
                          <span className="text-[#9a7413] font-semibold">({contentMatches.length - visibleCount} restantes)</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : directNameMatches.length > 0 ? (
                  <div className="rounded-xs border border-dashed border-[#d7d0c1] bg-[#fcfbf8] p-6 text-center text-xs text-[#4f6e82]">
                    Não foram encontradas menções adicionais a "{searchQuery}" nas definições ou dicas de exame de outros termos.
                  </div>
                ) : (
                  /* No direct matches and no content matches */
                  <div className="py-16 text-center max-w-md mx-auto">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#4f6e82]">
                      <Search className="w-7 h-7" />
                    </div>
                    <h3 className="mt-4 font-maritime text-2xl font-bold text-[#0b3a55]">
                      Nenhum termo náutico encontrado
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#4f6e82]">
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
                      className="mt-4 rounded-xs bg-[#0b3a55] px-4 py-2 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition"
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
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82] border-b border-[#d7d0c1] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span>
                      A mostrar <strong className="text-[#0b3a55]">{visibleCards.length}</strong> de <strong className="text-[#0b3a55]">{activeCardsList.length}</strong> termos
                      {selectedLetter !== 'all' && (
                        <span className="ml-1 text-[#9a7413] font-semibold">(Letra {selectedLetter})</span>
                      )}
                      {selectedCategory !== 'all' && (
                        <span className="ml-1 text-[#0b3a55]">· {selectedCategory}</span>
                      )}
                      {selectedSubCategory !== 'all' && (
                        <span className="ml-1 text-[#4f6e82]">› {selectedSubCategory}</span>
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
                          className="inline-flex items-center gap-2 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-6 py-2.5 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de]/50 transition"
                        >
                          <span>Carregar mais 12 termos</span>
                          <span className="text-[#9a7413] font-semibold">({activeCardsList.length - visibleCount} restantes)</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-16 text-center max-w-md mx-auto">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#4f6e82]">
                      <Search className="w-7 h-7" />
                    </div>
                    <h3 className="mt-4 font-maritime text-2xl font-bold text-[#0b3a55]">
                      Nenhum termo encontrado
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#4f6e82]">
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
                      className="mt-4 rounded-xs bg-[#0b3a55] px-4 py-2 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition"
                    >
                      Limpar Todos os Filtros
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ESTUDO HUB (/estudo) */}
        {activeRoute === 'estudo' && (
          <EstudoPage
            onNavigate={navigateTo}
            termsCount={terms.length}
            bookmarksCount={bookmarkedIds.size}
            notesCount={Object.keys(userNotes).length}
          />
        )}

        {/* FLASHCARDS (/estudo/flashcards) */}
        {activeRoute === 'flashcards' && (
          <FlashcardsView
            terms={terms}
            bookmarkedIds={bookmarkedIds}
            isLoggedIn={Boolean(currentUser)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* QUIZ EXAM SIMULATOR (/estudo/testes) */}
        {activeRoute === 'testes' && <TestSimulator />}

        {/* VISUAL GUIDE (/estudo/guias-visuais) */}
        {activeRoute === 'guias-visuais' && (
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

        {/* STUDY PROGRESS (/estudo/progresso) */}
        {activeRoute === 'progresso' && (
          <StudyProgressView
            terms={terms}
            userNotes={userNotes}
            bookmarkedIds={bookmarkedIds}
            onSelectTerm={setSelectedTerm}
            onNavigateToTab={(tab) => {
              const map: Record<'glossario' | 'flashcards' | 'quiz' | 'guia', RouteId> = {
                glossario: 'glossario',
                flashcards: 'flashcards',
                quiz: 'testes',
                guia: 'guias-visuais',
              };
              navigateTo(map[tab]);
            }}
          />
        )}

        {/* SOBRE (/sobre) */}
        {activeRoute === 'sobre' && <SobrePage onNavigate={navigateTo} />}

        {/* CONTACTO (/contacto) */}
        {activeRoute === 'contacto' && <ContactoPage currentUser={currentUser} />}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#d7d0c1] bg-[#ede9de]/50 py-8 text-xs text-[#4f6e82]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-[#0b3a55] font-maritime text-base">
              Carta de Marinheiro • Caderno de Estudo &amp; Glossário Náutico
            </p>
            <p className="mt-0.5 text-[#4f6e82]">
              Alinhado com o programa oficial DGRM, RIPAM (RIPEAM 1972) e Sistema de Balizamento IALA Região A.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82]">
            <a
              href={ROUTES.sobre.path}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('sobre');
              }}
              className="hover:text-[#0b3a55] transition"
            >
              Sobre
            </a>
            <span>•</span>
            <a
              href={ROUTES.contacto.path}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contacto');
              }}
              className="hover:text-[#0b3a55] transition"
            >
              Contacto
            </a>
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
