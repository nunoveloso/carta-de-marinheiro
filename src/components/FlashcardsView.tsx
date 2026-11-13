import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Shuffle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
} from 'lucide-react';
import { NauticalTerm, getCategoryStyle } from '../types/glossary';
import { CATEGORIES } from '../data/initialTerms';
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

  // Dynamically derive categories from provided terms
  const availableCategories = useMemo(() => {
    const presentCats = new Set<string>();
    terms.forEach((t) => {
      if (t.category) presentCats.add(t.category);
    });
    return CATEGORIES.filter((c) => presentCats.has(c.id));
  }, [terms]);

  // Filter terms according to options
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

  // Sync deck when filters change
  React.useEffect(() => {
    setDeck(filteredTerms);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filteredTerms]);

  const currentTerm = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

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

  if (deck.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#4f6e82]">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="mt-4 font-maritime text-2xl font-bold text-[#0b3a55]">Nenhum termo encontrado</h3>
        <p className="mt-2 text-xs sm:text-sm text-[#4f6e82]">
          Não existem cartões com os filtros selecionados. Tente remover os filtros ou adicionar termos aos favoritos.
        </p>
        <button
          onClick={() => {
            setSelectedCategory('all');
            setOnlyEssential(false);
            setOnlyBookmarked(false);
          }}
          className="mt-4 rounded-xs bg-[#0b3a55] px-4 py-2 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  const catStyle = currentTerm ? getCategoryStyle(currentTerm.category) : getCategoryStyle('');

  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);
  const isCurrentMastered = currentTerm ? masteredIds.has(currentTerm.id) : false;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-maritime text-2xl sm:text-3xl font-bold text-[#0b3a55] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#9a7413]" />
            Modo Estudo: Flashcards
          </h2>
          <p className="text-xs sm:text-sm text-[#4f6e82]">
            Treine e memorize a terminologia essencial para o exame prático e teórico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de]/60 transition whitespace-nowrap shrink-0"
            title="Baralhar cartões"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#0b3a55]" />
            <span>Baralhar</span>
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de]/60 transition whitespace-nowrap shrink-0"
            title="Reiniciar baralho"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#0b3a55]" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-xs bg-[#ede9de]/60 border border-[#d7d0c1]">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] px-3 py-1.5 text-xs text-[#0b3a55] focus:border-[#0b3a55] focus:outline-none font-medium"
        >
          <option value="all">Todas as Categorias ({terms.length})</option>
          {availableCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setOnlyEssential(!onlyEssential)}
          className={`flex items-center gap-1.5 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium border transition whitespace-nowrap shrink-0 ${
            onlyEssential
              ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
              : 'border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:border-[#0b3a55] hover:text-[#0b3a55]'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#ca9e1c]" />
          <span>Apenas Exame</span>
        </button>

        <button
          onClick={() => {
            if (!isLoggedIn && onOpenAuth) {
              onOpenAuth();
              return;
            }
            setOnlyBookmarked(!onlyBookmarked);
          }}
          className={`flex items-center gap-1.5 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium border transition whitespace-nowrap shrink-0 ${
            onlyBookmarked
              ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
              : 'border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:border-[#0b3a55] hover:text-[#0b3a55]'
          }`}
        >
          <span>Favoritos ({bookmarkedIds.size})</span>
        </button>

        <div className="ml-auto font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82]">
          Dominados: <span className="text-[#1e7d4f] font-semibold">{masteredIds.size}</span>/{deck.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82] mb-1.5">
          <span>
            Cartão {currentIndex + 1} de {deck.length}
          </span>
          <span>{progressPercent}% percorrido</span>
        </div>
        <div className="h-2 w-full rounded-xs bg-[#ede9de] border border-[#d7d0c1] overflow-hidden">
          <div
            className="h-full bg-[#0b3a55] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Flashcard with 3D Flip */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="group relative h-96 w-full cursor-pointer perspective-1000 select-none"
      >
        <div
          className={`relative h-full w-full rounded-xs transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden flex flex-col justify-between rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-8 text-center shadow-[4px_4px_0_0_#0b3a55] group-hover:border-[#0b3a55] transition-colors">
            <div className="flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 flex-wrap text-left font-mono-naut text-[11px] uppercase tracking-wider">
                <CategoryIcon
                  category={currentTerm.category}
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: catStyle.solid }}
                />
                <span className="font-semibold" style={{ color: catStyle.solid }}>
                  {currentTerm.category}
                </span>
                {(currentTerm.subCategory || currentTerm.subcategory) && (
                  <>
                    <span className="text-[#9a7413]">→</span>
                    <span className="text-[#4f6e82] font-medium truncate max-w-[220px]">
                      {currentTerm.subCategory || currentTerm.subcategory}
                    </span>
                  </>
                )}
              </div>
              {isCurrentMastered && (
                <span className="flex items-center gap-1 font-mono-naut text-[11px] uppercase tracking-wider text-[#1e7d4f] font-semibold shrink-0">
                  <CheckCircle2 className="w-4 h-4" /> Dominado
                </span>
              )}
            </div>

            <div className="my-auto space-y-3">
              <p className="font-mono-naut text-[11px] uppercase tracking-[0.14em] text-[#4f6e82] font-medium">
                Termo Náutico
              </p>
              <h3 className="font-maritime text-4xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight">
                {currentTerm.term}
              </h3>
              {currentTerm.synonyms && currentTerm.synonyms.length > 0 && (
                <p className="text-xs text-[#4f6e82] italic">
                  {currentTerm.synonyms.join(' • ')}
                </p>
              )}
            </div>

            <div className="font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82] flex items-center justify-center gap-1.5 group-hover:text-[#0b3a55] transition-colors">
              <span>Toque ou clique para virar o cartão</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between rounded-xs border border-[#0b3a55] bg-[#fcfbf8] p-7 text-left overflow-y-auto shadow-[4px_4px_0_0_#0b3a55]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1]">
                <div className="flex items-center gap-2 flex-wrap font-mono-naut text-[11px] uppercase tracking-wider">
                  <span className="font-semibold text-[#0b3a55]">
                    Definição Oficial
                  </span>
                  <span className="text-[#d7d0c1]">•</span>
                  <span className="inline-flex items-center gap-1 font-semibold" style={{ color: catStyle.solid }}>
                    <CategoryIcon category={currentTerm.category} className="w-3 h-3 shrink-0" />
                    <span>{currentTerm.category}</span>
                  </span>
                  {(currentTerm.subCategory || currentTerm.subcategory) && (
                    <span className="font-medium text-[#9a7413]">
                      → {currentTerm.subCategory || currentTerm.subcategory}
                    </span>
                  )}
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82] shrink-0">Toque para voltar</span>
              </div>

              <h4 className="mt-3 font-maritime text-2xl font-bold text-[#0b3a55]">{currentTerm.term}</h4>
              <p className="mt-2 text-sm text-[#0b3a55]/90 leading-relaxed">
                {currentTerm.definition}
              </p>

              {currentTerm.example && (
                <div className="mt-3 rounded-xs bg-[#faf7f0] p-3.5 border border-[#d7d0c1] text-xs text-[#0b3a55]/90">
                  <strong className="font-mono-naut text-[10px] uppercase tracking-wider text-[#0b3a55] block mb-0.5">A Bordo:</strong>
                  {currentTerm.example}
                </div>
              )}

              {currentTerm.examTip && (
                <div className="mt-3 rounded-xs bg-[#f0e8cf]/65 p-3.5 border border-[#ca9e1c]/40 text-xs text-[#0b3a55]">
                  <strong className="font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413] block mb-0.5">Importante para o Exame:</strong>
                  {currentTerm.examTip}
                </div>
              )}

              {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-[#d7d0c1] flex items-center gap-1.5 flex-wrap text-xs">
                  <span className="font-mono-naut text-[10px] uppercase tracking-wider font-medium text-[#4f6e82]">Termos Relacionados:</span>
                  {currentTerm.relatedTerms.slice(0, 3).map((rId) => {
                    const match = terms.find((t) => t.id === rId);
                    return (
                      <span
                        key={rId}
                        className="rounded-xs bg-[#faf7f0] border border-[#d7d0c1] px-2 py-0.5 font-mono-naut text-[11px] font-medium text-[#0b3a55]"
                      >
                        {match ? match.term : rId.replace(/-/g, ' ')}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#d7d0c1] text-center font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82]">
              Avalie abaixo o seu conhecimento deste termo
            </div>
          </div>
        </div>
      </div>

      {/* Action Navigation Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-4 py-2.5 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de]/60 transition disabled:opacity-40 whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-3.5 py-2.5 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#4f6e82] hover:border-[#0b3a55] hover:text-[#0b3a55] transition whitespace-nowrap shrink-0"
          >
            Ainda a Rever
          </button>

          <button
            onClick={handleMarkMastered}
            className="flex items-center gap-1.5 rounded-xs bg-[#1e7d4f] px-4 py-2.5 font-mono-naut text-xs uppercase tracking-wider font-semibold text-[#faf7f0] hover:bg-[#17633e] transition whitespace-nowrap shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Já Domino!</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === deck.length - 1}
          className="flex items-center gap-1.5 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-4 py-2.5 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de]/60 transition disabled:opacity-40 whitespace-nowrap shrink-0"
        >
          <span>Seguinte</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
