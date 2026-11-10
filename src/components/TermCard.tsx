import React, { useState } from 'react';
import { Star, Volume2, VolumeX, FileText, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { NauticalTerm, TermImportance } from '../types/glossary';
import { CATEGORIES } from '../data/initialTerms';

interface TermCardProps {
  term: NauticalTerm;
  isBookmarked: boolean;
  hasNote: boolean;
  onToggleBookmark: (termId: string) => void;
  onSelectTerm: (term: NauticalTerm) => void;
}

const IMPORTANCE_CONFIG: Record<
  TermImportance,
  { label: string; badgeClass: string; borderClass: string }
> = {
  essencial: {
    label: 'Exame Obrigatório',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    borderClass: 'border-l-amber-500',
  },
  importante: {
    label: 'Muito Importante',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    borderClass: 'border-l-cyan-500',
  },
  complementar: {
    label: 'Complementar',
    badgeClass: 'bg-slate-700/40 text-slate-300 border-slate-600/30',
    borderClass: 'border-l-slate-600',
  },
};

export const TermCard: React.FC<TermCardProps> = ({
  term,
  isBookmarked,
  hasNote,
  onToggleBookmark,
  onSelectTerm,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const categoryMeta = CATEGORIES.find((c) => c.id === term.category) || CATEGORIES[0];
  const importanceMeta = IMPORTANCE_CONFIG[term.importance] || IMPORTANCE_CONFIG.importante;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert('A síntese de voz não é suportada neste navegador.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${term.term}. ${term.definition}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-PT';
    utterance.rate = 0.95;

    // Pick Portuguese voice if available
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(term.id);
  };

  return (
    <article
      onClick={() => onSelectTerm(term)}
      className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer border-l-4 ${importanceMeta.borderClass}`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Category badge */}
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
              {categoryMeta.name}
            </span>

            {/* Importance badge */}
            <span
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${importanceMeta.badgeClass}`}
            >
              {term.importance === 'essencial' && <Sparkles className="w-3 h-3 text-amber-400" />}
              {importanceMeta.label}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Text to Speech Button */}
            <button
              onClick={handleSpeak}
              className={`rounded-lg p-1.5 transition ${
                isSpeaking
                  ? 'bg-cyan-500/20 text-cyan-400 animate-pulse'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
              title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia e definição'}
              aria-label="Ouvir termo"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmarkClick}
              className={`rounded-lg p-1.5 transition ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-500 hover:text-amber-400 hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
              aria-label="Guardar nos favoritos"
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Term Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
          {term.term}
        </h3>

        {/* Synonyms / Abbreviations */}
        {term.synonyms && term.synonyms.length > 0 && (
          <p className="mt-0.5 text-[11px] text-slate-400 italic">
            Sinónimos: {term.synonyms.join(', ')}
          </p>
        )}

        {/* Short definition excerpt */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
          {term.definition}
        </p>
      </div>

      {/* Footer Indicators */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          {term.examTip && (
            <span className="inline-flex items-center gap-1 rounded bg-amber-950/40 text-amber-300/90 px-1.5 py-0.5 text-[10px] font-medium border border-amber-800/30">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              Dica de Exame
            </span>
          )}

          {hasNote && (
            <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400">
              <FileText className="w-3.5 h-3.5" />
              Nota guardada
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 font-medium text-cyan-400 group-hover:translate-x-0.5 transition-transform">
          <span>Ver mais</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};
