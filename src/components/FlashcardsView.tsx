import React, { useState, useMemo, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Shuffle,
  Check,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Star,
} from 'lucide-react';
import { NauticalTerm, getCategoryStyle } from '../types/glossary';
import { CATEGORIES } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';

interface FlashcardsViewProps {
  terms: NauticalTerm[];
  bookmarkedIds: Set<string>;
  isLoggedIn?: boolean;
  onOpenAuth?: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  terms,
  bookmarkedIds,
  isLoggedIn = true,
  onOpenAuth,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyEssential, setOnlyEssential] = useState<boolean>(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  const availableCategories = useMemo(() => {
    const presentCats = new Set<string>();
    terms.forEach((t) => {
      if (t.category) presentCats.add(t.category);
    });
    return CATEGORIES.filter((c) => presentCats.has(c.id));
  }, [terms]);

  const filteredTerms = useMemo(() => {
    let result = terms;
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (onlyEssential) {
      result = result.filter((t) => t.importance === 'essencial');
    }
    if (onlyBookmarked) {
      result = result.filter((t) => bookmarkedIds.has(t.id));
    }
    return result;
  }, [terms, selectedCategory, onlyEssential, onlyBookmarked, bookmarkedIds]);

  const [deck, setDeck] = useState<NauticalTerm[]>(filteredTerms);

  useEffect(() => {
    setDeck(filteredTerms);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filteredTerms]);

  const currentTerm = deck[currentIndex];

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < deck.length - 1 ? prev + 1 : prev));
  }, [deck.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRestart = () => {
    setDeck(filteredTerms);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleReviewLater = () => {
    if (!currentTerm) return;
    if (masteredIds.has(currentTerm.id)) {
      const next = new Set(masteredIds);
      next.delete(currentTerm.id);
      setMasteredIds(next);
    }
    handleNext();
  };

  const handleMarkMastered = () => {
    if (!currentTerm) return;
    const nextMastered = new Set(masteredIds);
    nextMastered.add(currentTerm.id);
    setMasteredIds(nextMastered);

    if (nextMastered.size === deck.length && deck.length > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    handleNext();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (target?.tagName !== 'BUTTON') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  if (deck.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center border border-border bg-secondary text-muted-foreground">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-primary">
          Nenhum termo encontrado
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Não existem fichas com os filtros selecionados. Remova os filtros ou adicione termos aos favoritos.
        </p>
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('all');
            setOnlyEssential(false);
            setOnlyBookmarked(false);
          }}
          className="font-mono-naut mt-5 inline-flex min-h-11 items-center border border-primary bg-primary px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#082b3f]"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  const catStyle = currentTerm ? getCategoryStyle(currentTerm.category) : getCategoryStyle('');
  const deckMasteredCount = deck.filter((t) => masteredIds.has(t.id)).length;
  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);
  const isCurrentMastered = currentTerm ? masteredIds.has(currentTerm.id) : false;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-12 pt-6 sm:pt-8">
      {/* Topbar matching .topbar + .counter in estudo.css */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-primary">
            Fichas de estudo
          </h1>
          <p className="font-mono-naut mt-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Toque para virar · Espaço / Setas para navegar
          </p>
        </div>

        <div className="font-mono-naut border border-border bg-card px-3.5 py-2.5 text-[11px] uppercase tracking-[0.12em]">
          <span className="font-semibold text-primary">{deckMasteredCount}</span>{' '}
          <span className="text-muted-foreground">/ {deck.length} sabidos</span>
        </div>
      </div>

      {/* Category chips matching .chips in estudo.css & Home.tsx */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`font-mono-naut min-h-11 border px-3.5 text-[11px] font-medium uppercase tracking-[0.1em] transition ${
            selectedCategory === 'all'
              ? 'border-[#0b3a55] bg-[#0b3a55] text-[#fbf9f0]'
              : 'border-transparent bg-[#e8e2d2] text-[#0b3a55] hover:brightness-95'
          }`}
        >
          Todas · {terms.length}
        </button>

        {availableCategories.map((cat) => {
          const style = getCategoryStyle(cat.id);
          const isActive = selectedCategory === cat.id;
          const catCount = terms.filter((t) => t.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(isActive ? 'all' : cat.id)}
              style={
                isActive
                  ? {
                      backgroundColor: style.solid,
                      color: '#fbf9f0',
                      borderColor: style.solid,
                    }
                  : {
                      backgroundColor: style.soft,
                      color: style.solid,
                      borderColor: 'transparent',
                    }
              }
              className="font-mono-naut inline-flex min-h-11 items-center gap-2 border px-3.5 text-[11px] font-medium uppercase tracking-[0.1em] transition hover:brightness-95"
            >
              <CategoryIcon
                category={cat.id}
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: isActive ? '#fbf9f0' : style.solid }}
              />
              <span>
                {cat.name} · {catCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary study toggles */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOnlyEssential(!onlyEssential)}
            className={`font-mono-naut inline-flex min-h-10 items-center gap-1.5 border px-3 text-[11px] font-medium uppercase tracking-[0.1em] transition ${
              onlyEssential
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#ca9e1c]" />
            <span>Apenas Exame</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isLoggedIn && onOpenAuth) {
                onOpenAuth();
                return;
              }
              setOnlyBookmarked(!onlyBookmarked);
            }}
            className={`font-mono-naut inline-flex min-h-10 items-center gap-1.5 border px-3 text-[11px] font-medium uppercase tracking-[0.1em] transition ${
              onlyBookmarked
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                onlyBookmarked ? 'fill-[#ca9e1c] text-[#ca9e1c]' : 'text-[#9a7413]'
              }`}
            />
            <span>Favoritos ({bookmarkedIds.size})</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="font-mono-naut inline-flex min-h-10 items-center gap-1.5 border border-border bg-card px-3 text-[11px] font-medium uppercase tracking-[0.1em] text-foreground transition hover:border-primary hover:bg-secondary"
          title="Reiniciar ordem do baralho"
        >
          <RotateCcw className="h-3.5 w-3.5 text-primary" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* 3D Flip Card matching .persp, .flip-inner, .flip-face in estudo.css */}
      <div className="mt-6" style={{ perspective: '1400px' }}>
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          aria-label={isFlipped ? 'Mostrar frente da ficha' : 'Virar ficha para ver definição'}
          className="relative block min-h-[340px] w-full text-left sm:aspect-[16/10] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.7, 0.3, 1)',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT FACE (.flip-face.front) */}
          <div className="backface-hidden absolute inset-0 flex flex-col overflow-hidden border border-[#0b3a55] bg-[#fffdf6] shadow-[6px_6px_0_0_#0b3a55]">
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center border-b border-[#d8d2c0] bg-[#f7f2e6] px-6 py-8 text-center">
              <p className="font-mono-naut text-[10px] font-medium uppercase tracking-[0.18em] text-[#3d647c]">
                {currentTerm.subCategory || currentTerm.subcategory || 'Terminologia Náutica'}
                {currentTerm.importance === 'essencial' ? ' · Exame Obrigatório' : ''}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#0b3a55] sm:text-5xl">
                {currentTerm.term}
              </h2>

              {currentTerm.synonyms && currentTerm.synonyms.length > 0 && (
                <p className="mt-2.5 text-sm italic text-[#3d647c]">
                  {currentTerm.synonyms.join(' • ')}
                </p>
              )}

              <span className="font-mono-naut mt-6 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[#3d647c]/80">
                <RotateCcw className="h-3 w-3" />
                Toque para ver definição
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 bg-[#fffdf6] px-5 py-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="truncate text-lg font-semibold tracking-[-0.02em] text-[#20201d] sm:text-xl">
                  {currentTerm.term}
                </span>
                {isCurrentMastered && (
                  <span className="font-mono-naut inline-flex shrink-0 items-center gap-1 border border-[#1e7d4f]/30 bg-[#dcebe1] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1e7d4f]">
                    <Check className="h-3 w-3" /> Sabido
                  </span>
                )}
              </div>

              <span
                className="font-mono-naut inline-flex shrink-0 items-center gap-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{
                  backgroundColor: catStyle.soft,
                  color: catStyle.solid,
                }}
              >
                <CategoryIcon category={currentTerm.category} className="h-3 w-3 shrink-0" />
                <span>{currentTerm.category}</span>
              </span>
            </div>
          </div>

          {/* BACK FACE (.flip-face.back) */}
          <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col overflow-hidden border border-[#0b3a55] bg-[#0b3a55] text-[#fbf9f0] shadow-[6px_6px_0_0_rgba(11,58,85,0.35)]">
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-7">
              <p className="font-mono-naut text-[10px] uppercase tracking-[0.18em] text-[#fbf9f0]/70">
                {currentTerm.category}
                {(currentTerm.subCategory || currentTerm.subcategory) &&
                  ` · ${currentTerm.subCategory || currentTerm.subcategory}`}
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#fbf9f0]">
                {currentTerm.term}
              </h2>

              <p className="my-4 text-[16px] leading-[1.7] text-[#fbf9f0]/95">
                {currentTerm.definition}
              </p>

              {currentTerm.example && (
                <div className="mt-3 border-l-2 border-[#ca9e1c] bg-[#082b3f]/80 px-3.5 py-2.5 text-xs leading-relaxed text-[#fbf9f0]/90">
                  <strong className="font-mono-naut mb-0.5 block text-[10px] uppercase tracking-[0.14em] text-[#ca9e1c]">
                    A Bordo
                  </strong>
                  {currentTerm.example}
                </div>
              )}

              {currentTerm.examTip && (
                <div className="mt-2.5 border border-[#fbf9f0]/20 bg-[#082b3f]/60 px-3.5 py-2.5 text-xs leading-relaxed text-[#fbf9f0]/90">
                  <strong className="font-mono-naut mb-0.5 block text-[10px] uppercase tracking-[0.14em] text-[#ca9e1c]">
                    Importante para o Exame
                  </strong>
                  {currentTerm.examTip}
                </div>
              )}

              {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#fbf9f0]/15 pt-3 text-xs">
                  <span className="font-mono-naut text-[10px] uppercase tracking-[0.14em] text-[#fbf9f0]/65">
                    Relacionados:
                  </span>
                  {currentTerm.relatedTerms.slice(0, 3).map((rId) => {
                    const match = terms.find((t) => t.id === rId);
                    return (
                      <span
                        key={rId}
                        className="font-mono-naut border border-[#fbf9f0]/25 bg-[#082b3f] px-2 py-0.5 text-[10px] text-[#fbf9f0]/90"
                      >
                        {match ? match.term : rId.replace(/-/g, ' ')}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-[#fbf9f0]/15 px-6 py-2.5 font-mono-naut text-[10px] uppercase tracking-[0.18em] text-[#fbf9f0]/70">
              Toque para voltar à frente
            </div>
          </div>
        </button>
      </div>

      {/* Controls row matching .controls & .btn classes in estudo.css */}
      <div className="mt-5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-[#0b3a55] bg-transparent px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b3a55] transition hover:bg-[#0b3a55] hover:text-[#fbf9f0] disabled:opacity-35 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReviewLater}
            className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-[#b3402f] bg-transparent px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b3402f] transition hover:bg-[#b3402f] hover:text-white"
            title="Marcar para rever"
          >
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Rever</span>
          </button>

          <button
            type="button"
            onClick={handleMarkMastered}
            className={`font-mono-naut inline-flex min-h-11 items-center gap-2 border border-[#1e7d4f] px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
              isCurrentMastered
                ? 'bg-[#1e7d4f] text-white'
                : 'bg-transparent text-[#1e7d4f] hover:bg-[#1e7d4f] hover:text-white'
            }`}
            title="Marcar como sabido"
          >
            <Check className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Sei</span>
          </button>

          <button
            type="button"
            onClick={handleShuffle}
            className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-[#d8d2c0] bg-transparent px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#20201d] transition hover:bg-[#e8e2d2]"
            title="Baralhar fichas"
          >
            <Shuffle className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Baralhar</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === deck.length - 1}
          className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-[#0b3a55] bg-transparent px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b3a55] transition hover:bg-[#0b3a55] hover:text-[#fbf9f0] disabled:opacity-35 disabled:pointer-events-none"
        >
          <span className="hidden sm:inline">Seguinte</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      </div>

      {/* Progress bar matching .progress / .bar / .fill in estudo.css */}
      <div className="mt-4">
        <div className="font-mono-naut mb-1.5 flex justify-between text-[10px] uppercase tracking-[0.14em] text-[#3d647c]">
          <span>
            Ficha {currentIndex + 1} de {deck.length}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="flex h-1.5 w-full bg-[#e8e2d2]">
          <div
            className="h-full bg-[#0b3a55] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
