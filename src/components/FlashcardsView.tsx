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
  Trophy,
} from 'lucide-react';
import { NauticalTerm, TermCategory } from '../types/glossary';
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-white">Nenhum termo encontrado</h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Não existem cartões com os filtros selecionados. Tente remover os filtros ou adicionar termos aos favoritos.
        </p>
        <button
          onClick={() => {
            setSelectedCategory('all');
            setOnlyEssential(false);
            setOnlyBookmarked(false);
          }}
          className="mt-4 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-500 transition"
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
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            Modo Estudo: Flashcards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Treine e memorize a terminologia essencial para o exame prático e teórico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500 transition"
            title="Baralhar cartões"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Baralhar</span>
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
            title="Reiniciar baralho"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
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
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Apenas Exame</span>
        </button>

        <button
          onClick={() => setOnlyBookmarked(!onlyBookmarked)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
            onlyBookmarked
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span>Favoritos ({bookmarkedIds.size})</span>
        </button>

        <div className="ml-auto text-xs font-medium text-slate-400">
          Dominados: <span className="text-emerald-400 font-bold">{masteredIds.size}</span>/{deck.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>
            Cartão {currentIndex + 1} de {deck.length}
          </span>
          <span>{progressPercent}% percorrido</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
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
          className={`relative h-full w-full rounded-3xl transition-transform duration-500 transform-style-3d shadow-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden flex flex-col justify-between rounded-3xl border border-cyan-900/50 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-8 text-center ring-1 ring-cyan-500/20">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 font-semibold text-cyan-300 border border-cyan-500/20">
                {categoryMeta.name}
              </span>
              {isCurrentMastered && (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Dominado
                </span>
              )}
            </div>

            <div className="my-auto space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Termo Náutico
              </p>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {currentTerm.term}
              </h3>
              {currentTerm.synonyms && currentTerm.synonyms.length > 0 && (
                <p className="text-xs text-slate-400">
                  {currentTerm.synonyms.join(' • ')}
                </p>
              )}
            </div>

            <div className="text-xs text-cyan-400 font-medium flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100">
              <span>Toque ou clique para virar o cartão</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between rounded-3xl border border-slate-700 bg-slate-900 p-7 text-left overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Resposta / Definição
                </span>
                <span className="text-xs text-slate-400">Toque para voltar</span>
              </div>

              <h4 className="mt-3 text-lg font-bold text-white">{currentTerm.term}</h4>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                {currentTerm.definition}
              </p>

              {currentTerm.example && (
                <div className="mt-3 rounded-xl bg-slate-800/60 p-3 border-l-2 border-cyan-500 text-xs text-slate-300">
                  <strong className="text-cyan-300 block mb-0.5">A Bordo:</strong>
                  {currentTerm.example}
                </div>
              )}

              {currentTerm.examTip && (
                <div className="mt-3 rounded-xl bg-amber-950/40 p-3 border border-amber-500/30 text-xs text-amber-200">
                  <strong className="text-amber-400 block mb-0.5">Dica de Exame:</strong>
                  {currentTerm.examTip}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
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
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-800 transition disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            Ainda a Rever
          </button>

          <button
            onClick={handleMarkMastered}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:from-emerald-500 hover:to-teal-500 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Já Domino!</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === deck.length - 1}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-800 transition disabled:opacity-40"
        >
          <span>Seguinte</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
