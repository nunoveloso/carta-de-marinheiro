import React, { useState } from 'react';
import { Star, Volume2, VolumeX, FileText, ChevronRight, AlertCircle, Compass } from 'lucide-react';
import { NauticalTerm, TermImportance } from '../types/glossary';
import { speakNauticalTerm, stopSpeaking } from '../utils/speech';
import { GlossaryText } from './GlossaryText';
import { DayShapesIllustration } from './DayShapesIllustration';
import { SignalFlagsIllustration } from './SignalFlagsIllustration';
import { BuoyIllustration } from './BuoyIllustration';
import { BoatPartIllustration } from './BoatPartIllustration';
import { HighlightText } from './HighlightText';

interface TermCardProps {
  term: NauticalTerm;
  isBookmarked: boolean;
  hasNote: boolean;
  onToggleBookmark: (termId: string) => void;
  onSelectTerm: (term: NauticalTerm) => void;
  allTerms?: NauticalTerm[];
  highlightQuery?: string;
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
  allTerms,
  highlightQuery,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const importanceMeta = IMPORTANCE_CONFIG[term.importance] || IMPORTANCE_CONFIG.importante;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speakNauticalTerm(
      term.term,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
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
        {/* Top Metadata & Action Buttons */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Importance indicator */}
          <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
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
              title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia do termo'}
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
          <HighlightText text={term.term} query={highlightQuery} />
        </h3>

        {/* Category -> SubCategory tag below term */}
        <div className="text-[11px] font-semibold text-[#854d0e] tracking-wide mt-1.5 mb-1 flex items-center gap-1.5">
          <span className="font-bold text-[#112338]">{term.category}</span>
          <span aria-hidden="true" className="text-[#a16207]">→</span>
          <span className="text-[#854d0e]">{term.subCategory || term.subcategory || 'Geral'}</span>
        </div>

        {/* Synonyms / Abbreviations */}
        {term.synonyms && term.synonyms.length > 0 && (
          <p className="mt-0.5 text-xs text-[#64748b] italic">
            Outras designações: <HighlightText text={term.synonyms.join(', ')} query={highlightQuery} />
          </p>
        )}

        {/* Definition excerpt */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#334155] line-clamp-3 leading-relaxed">
          {highlightQuery ? (
            <HighlightText text={term.definition} query={highlightQuery} />
          ) : (
            <GlossaryText
              text={term.definition}
              allTerms={allTerms || []}
              currentTermId={term.id}
              onSelectTerm={onSelectTerm}
            />
          )}
        </p>

        {/* Day Shapes / Balões illustration if applicable */}
        <DayShapesIllustration
          termId={term.id}
          variant="card"
          allTerms={allTerms}
          onSelectTerm={onSelectTerm}
        />

        {/* Signal Flags / Bandeiras CIS illustration if applicable */}
        <SignalFlagsIllustration
          termId={term.id}
          variant="card"
          allTerms={allTerms}
          onSelectTerm={onSelectTerm}
        />

        {/* IALA Buoys / Bóias de Balizamento illustration if applicable */}
        <BuoyIllustration
          termId={term.id}
          variant="card"
          allTerms={allTerms}
          onSelectTerm={onSelectTerm}
        />

        {/* Boat Part / Regiões do Navio illustration if applicable */}
        <BoatPartIllustration
          termId={term.id}
          variant="card"
        />

        {/* Importante para o Exame Section */}
        {term.examTip && (
          <div className="mt-3 rounded-xl bg-[#fefce8] p-3 border border-[#fef08a] text-xs text-[#854d0e]">
            <div className="flex items-center gap-1.5 font-bold text-[#92400e] text-[11px] mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-[#b45309] shrink-0" />
              <span>Importante para o Exame:</span>
            </div>
            <p className="text-[12px] text-[#854d0e] leading-snug line-clamp-2">
              <HighlightText text={term.examTip} query={highlightQuery} />
            </p>
          </div>
        )}

        {/* Termos Relacionados Section */}
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-[#f0ebd9] flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-[11px] font-semibold text-[#64748b]">Termos Relacionados:</span>
            {term.relatedTerms.slice(0, 4).map((relId) => {
              const relTerm = allTerms?.find((t) => t.id === relId);
              const label = relTerm ? relTerm.term : relId.replace(/-/g, ' ');
              return (
                <span
                  key={relId}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (relTerm) onSelectTerm(relTerm);
                  }}
                  className="rounded-lg bg-[#f4efe4] border border-[#ded5c2] px-2 py-0.5 text-[11px] font-medium text-[#112338] hover:bg-[#eae3d2] hover:border-[#112338] transition cursor-pointer"
                  title="Ver termo relacionado"
                >
                  {label}
                </span>
              );
            })}
            {term.relatedTerms.length > 4 && (
              <span className="text-[10px] text-[#94a3b8] font-medium">+{term.relatedTerms.length - 4}</span>
            )}
          </div>
        )}
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
