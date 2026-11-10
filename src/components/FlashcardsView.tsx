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
import { NauticalTerm } from '../types/glossary';
import { CATEGORIES } from '../data/initialTerms';

interface FlashcardsViewProps {
  terms: NauticalTerm[];
  bookmarkedIds: Set<string>;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  terms,
  bookmarkedIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyEssential, setOnlyEssential] = useState<boolean>(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4efe4] border border-[#ded5c2] text-[#64748b]">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="mt-4 font-maritime text-2xl font-bold text-[#112338]">Nenhum termo encontrado</h3>
        <p className="mt-2 text-xs sm:text-sm text-[#64748b]">
          Não existem cartões com os filtros selecionados. Tente remover os filtros ou adicionar termos aos favoritos.
        </p>
        <button
          onClick={() => {
            setSelectedCategory('all');
            setOnlyEssential(false);
            setOnlyBookmarked(false);
          }}
          className="mt-4 rounded-xl bg-[#112338] px-4 py-2 text-xs font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  const categoryMeta = currentTerm
    ? CATEGORIES.find((c) => c.id === currentTerm.category) || CATEGORIES[0]
    : CATEGORIES[0];

  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);
  const isCurrentMastered = currentTerm ? masteredIds.has(currentTerm.id) : false;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-maritime text-2xl sm:text-3xl font-bold text-[#112338] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#a16207]" />
            Modo Estudo: Flashcards
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b]">
            Treine e memorize a terminologia essencial para o exame prático e teórico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 rounded-xl border border-[#ded5c2] bg-white px-3 py-1.5 text-xs font-semibold text-[#1e293b] hover:border-[#112338] hover:bg-[#f4efe4] transition shadow-2xs"
            title="Baralhar cartões"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#112338]" />
            <span>Baralhar</span>
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 rounded-xl border border-[#ded5c2] bg-white px-3 py-1.5 text-xs font-semibold text-[#1e293b] hover:border-[#112338] hover:bg-[#f4efe4] transition shadow-2xs"
            title="Reiniciar baralho"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#112338]" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl bg-[#f4efe4] border border-[#ded5c2]">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-[#ded5c2] bg-white px-3 py-1.5 text-xs text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
        >
          <option value="all">Todas as Categorias ({terms.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setOnlyEssential(!onlyEssential)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
            onlyEssential
              ? 'bg-[#112338] text-[#fbf8f2]'
              : 'border border-[#ded5c2] bg-white text-[#475569] hover:bg-[#eae3d2] shadow-2xs'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#d4af37]" />
          <span>Apenas Exame</span>
        </button>

        <button
          onClick={() => setOnlyBookmarked(!onlyBookmarked)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
            onlyBookmarked
              ? 'bg-[#112338] text-[#fbf8f2]'
              : 'border border-[#ded5c2] bg-white text-[#475569] hover:bg-[#eae3d2] shadow-2xs'
          }`}
        >
          <span>Favoritos ({bookmarkedIds.size})</span>
        </button>

        <div className="ml-auto text-xs font-medium text-[#64748b]">
          Dominados: <span className="text-[#15803d] font-bold">{masteredIds.size}</span>/{deck.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#64748b] mb-1.5">
          <span>
            Cartão {currentIndex + 1} de {deck.length}
          </span>
          <span>{progressPercent}% percorrido</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#eae3d2] overflow-hidden">
          <div
            className="h-full bg-[#112338] transition-all duration-300"
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
          className={`relative h-full w-full rounded-3xl transition-transform duration-500 transform-style-3d shadow-md ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden flex flex-col justify-between rounded-3xl border border-[#ded5c2] bg-[#fdfcf9] p-8 text-center shadow-xs">
            <div className="flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-1.5 flex-wrap text-left">
                <span className="font-semibold text-[#112338]">
                  {categoryMeta.name}
                </span>
                {currentTerm.section && (
                  <>
                    <span className="text-[#94a3b8]">›</span>
                    <span className="text-[#64748b] font-medium text-[11px] truncate max-w-[220px]" title={currentTerm.section}>
                      {currentTerm.section}
                    </span>
                  </>
                )}
              </div>
              {isCurrentMastered && (
                <span className="flex items-center gap-1 text-[#15803d] font-semibold shrink-0">
                  <CheckCircle2 className="w-4 h-4" /> Dominado
                </span>
              )}
            </div>

            <div className="my-auto space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#94a3b8] font-semibold">
                Termo Náutico
              </p>
              <h3 className="font-maritime text-4xl sm:text-5xl font-bold text-[#112338] tracking-tight">
                {currentTerm.term}
              </h3>
              {currentTerm.synonyms && currentTerm.synonyms.length > 0 && (
                <p className="text-xs text-[#64748b] italic">
                  {currentTerm.synonyms.join(' • ')}
                </p>
              )}
            </div>

            <div className="text-xs text-[#64748b] font-medium flex items-center justify-center gap-1.5 group-hover:text-[#112338] transition-colors">
              <span>Toque ou clique para virar o cartão</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between rounded-3xl border border-[#ded5c2] bg-white p-7 text-left overflow-y-auto shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#ded5c2]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#112338] uppercase tracking-wider">
                    Definição Oficial
                  </span>
                  {currentTerm.section && (
                    <span className="text-[11px] text-[#64748b]">
                      • {currentTerm.section}{currentTerm.subsection ? ` › ${currentTerm.subsection}` : ''}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#94a3b8] shrink-0">Toque para voltar</span>
              </div>

              <h4 className="mt-3 font-maritime text-2xl font-bold text-[#112338]">{currentTerm.term}</h4>
              <p className="mt-2 text-sm text-[#1e293b] leading-relaxed">
                {currentTerm.definition}
              </p>

              {currentTerm.example && (
                <div className="mt-3 rounded-xl bg-[#f7f4ea] p-3.5 border border-[#e8dfcf] text-xs text-[#334155]">
                  <strong className="text-[#112338] block mb-0.5">A Bordo:</strong>
                  {currentTerm.example}
                </div>
              )}

              {currentTerm.examTip && (
                <div className="mt-3 rounded-xl bg-[#fefce8] p-3.5 border border-[#fef08a] text-xs text-[#854d0e]">
                  <strong className="text-[#92400e] block mb-0.5">Importante para o Exame:</strong>
                  {currentTerm.examTip}
                </div>
              )}

              {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
                <div className="mt-3 pt-2 border-t border-[#f0ebd9] flex items-center gap-1.5 flex-wrap text-xs">
                  <span className="text-[11px] font-semibold text-[#64748b]">Termos Relacionados:</span>
                  {currentTerm.relatedTerms.slice(0, 3).map((rId) => {
                    const match = terms.find((t) => t.id === rId);
                    return (
                      <span
                        key={rId}
                        className="rounded-lg bg-[#f4efe4] border border-[#ded5c2] px-2 py-0.5 text-[11px] font-medium text-[#112338]"
                      >
                        {match ? match.term : rId.replace(/-/g, ' ')}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#f0ebd9] text-center text-xs text-[#94a3b8]">
              Avalie abaixo o seu conhecimento deste termo
            </div>
          </div>
        </div>
      </div>

      {/* Action Navigation Controls */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 rounded-xl border border-[#ded5c2] bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1e293b] hover:bg-[#f4efe4] transition disabled:opacity-40 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            className="rounded-xl border border-[#ded5c2] bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#475569] hover:bg-[#f4efe4] transition shadow-2xs"
          >
            Ainda a Rever
          </button>

          <button
            onClick={handleMarkMastered}
            className="flex items-center gap-1.5 rounded-xl bg-[#1b4332] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#2d6a4f] transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Já Domino!</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === deck.length - 1}
          className="flex items-center gap-1.5 rounded-xl border border-[#ded5c2] bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1e293b] hover:bg-[#f4efe4] transition disabled:opacity-40 shadow-2xs"
        >
          <span>Seguinte</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
