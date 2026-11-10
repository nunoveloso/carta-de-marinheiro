import React, { useState } from 'react';
import { Star, Volume2, VolumeX, FileText, ChevronRight, AlertCircle, Compass } from 'lucide-react';
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
  { label: string; textClass: string }
> = {
  essencial: {
    label: 'Exame Obrigatório',
    textClass: 'text-[#92400e] font-semibold',
  },
  importante: {
    label: 'Muito Importante',
    textClass: 'text-[#0f766e] font-semibold',
  },
  complementar: {
    label: 'Complementar',
    textClass: 'text-[#64748b] font-medium',
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
      className="group relative flex flex-col justify-between rounded-2xl border border-[#e5decb] bg-[#fdfcf9] p-5.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#112338]/40 hover:bg-white hover:shadow-md cursor-pointer shadow-2xs"
    >
      <div>
        {/* Top Unboxed Metadata & Action Buttons */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Zero-Pill Unboxed Metadata separated by middot */}
          <div className="flex items-center gap-1.5 text-xs text-[#64748b] flex-wrap">
            <span className="font-medium text-[#112338]">{categoryMeta.name}</span>
            <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
            <span className={importanceMeta.textClass}>{importanceMeta.label}</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Audio Button */}
            <button
              onClick={handleSpeak}
              className={`rounded-lg p-1.5 transition ${
                isSpeaking
                  ? 'bg-[#f4efe4] text-[#112338]'
                  : 'text-[#94a3b8] hover:text-[#112338] hover:bg-[#f4efe4]'
              }`}
              title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia e definição'}
              aria-label="Ouvir termo"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bookmark Star Button */}
            <button
              onClick={handleBookmarkClick}
              className={`rounded-lg p-1.5 transition ${
                isBookmarked
                  ? 'text-[#d97706]'
                  : 'text-[#cbd5e1] hover:text-[#d97706] hover:bg-[#f4efe4]'
              }`}
              title={isBookmarked ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
              aria-label="Guardar nos favoritos"
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-[#d97706]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Term Title in Classic Maritime Serif */}
        <h3 className="font-maritime text-2xl font-bold text-[#112338] tracking-tight group-hover:text-[#1d4e6d] transition-colors leading-tight">
          {term.term}
        </h3>

        {/* Synonyms / Abbreviations */}
        {term.synonyms && term.synonyms.length > 0 && (
          <p className="mt-0.5 text-xs text-[#64748b] italic">
            Outras designações: {term.synonyms.join(', ')}
          </p>
        )}

        {/* Definition excerpt */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#334155] line-clamp-3 leading-relaxed">
          {term.definition}
        </p>
      </div>

      {/* Footer Area */}
      <div className="mt-4 pt-3.5 border-t border-[#f0ebd9] flex items-center justify-between text-xs text-[#64748b]">
        <div className="flex items-center gap-3">
          {term.examTip && (
            <span className="inline-flex items-center gap-1 font-semibold text-[#b45309] text-[11px]">
              <AlertCircle className="w-3.5 h-3.5 text-[#b45309]" />
              Dica de Exame
            </span>
          )}

          {hasNote && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0f766e]">
              <FileText className="w-3.5 h-3.5" />
              Com anotação
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 font-semibold text-[#112338] group-hover:translate-x-0.5 transition-transform text-[11px]">
          <span>Ver mais</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#112338]" />
        </div>
      </div>
    </article>
  );
};
