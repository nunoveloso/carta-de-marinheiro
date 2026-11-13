import React, { useState } from 'react';
import { Star, Volume2, VolumeX, FileText, ChevronRight, AlertCircle } from 'lucide-react';
import { NauticalTerm, TermImportance, getCategoryStyle } from '../types/glossary';
import { speakNauticalTerm, stopSpeaking } from '../utils/speech';
import { GlossaryText } from './GlossaryText';
import { CategoryIcon } from './CategoryIcon';
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
    textClass: 'text-[#9a7413] font-semibold',
  },
  importante: {
    label: 'Muito Importante',
    textClass: 'text-[#1e7d4f] font-semibold',
  },
  complementar: {
    label: 'Complementar',
    textClass: 'text-[#4f6e82] font-medium',
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
  const catStyle = getCategoryStyle(term.category);

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
      className="group relative flex flex-col justify-between rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] cursor-pointer"
    >
      <div>
        {/* Top Metadata & Action Buttons */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Importance indicator */}
          <div className="flex items-center gap-1.5 font-mono-naut text-[10px] uppercase tracking-[0.1em]">
            <span
              className="w-1.5 h-1.5 rounded-none shrink-0"
              style={{ backgroundColor: catStyle.dotColor }}
            />
            <span className={importanceMeta.textClass}>{importanceMeta.label}</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Audio Button */}
            <button
              onClick={handleSpeak}
              className={`rounded-xs p-1.5 transition cursor-pointer ${
                isSpeaking
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#4f6e82] hover:text-[#0b3a55] hover:bg-[#ede9de]'
              }`}
              title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia do termo'}
              aria-label="Ouvir termo"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bookmark Star Button */}
            <button
              onClick={handleBookmarkClick}
              className={`rounded-xs p-1.5 transition cursor-pointer ${
                isBookmarked
                  ? 'text-[#ca9e1c]'
                  : 'text-[#4f6e82]/40 hover:text-[#ca9e1c] hover:bg-[#ede9de]'
              }`}
              title={isBookmarked ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
              aria-label="Guardar nos favoritos"
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-[#ca9e1c]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Term Title in Editorial Fraunces Serif */}
        <h3 className="font-maritime text-2xl font-bold text-[#0b3a55] tracking-tight group-hover:text-[#082b3f] transition-colors leading-tight">
          <HighlightText text={term.term} query={highlightQuery} />
        </h3>

        {/* Category -> SubCategory tag below term */}
        <div className="font-mono-naut text-[10px] uppercase tracking-[0.08em] mt-1.5 mb-1 flex items-center gap-1.5 flex-wrap">
          <span
            className="inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded-xs border"
            style={{
              backgroundColor: catStyle.soft,
              color: catStyle.solid,
              borderColor: `${catStyle.solid}33`,
            }}
          >
            <CategoryIcon category={term.category} className="w-3 h-3 shrink-0" />
            <span>{term.category}</span>
          </span>
          <span aria-hidden="true" className="text-[#4f6e82]">→</span>
          <span className="text-[#4f6e82] font-medium">{term.subCategory || term.subcategory || 'Geral'}</span>
        </div>

        {/* Synonyms / Abbreviations */}
        {term.synonyms && term.synonyms.length > 0 && (
          <p className="mt-1 text-xs text-[#4f6e82] italic">
            Outras designações: <HighlightText text={term.synonyms.join(', ')} query={highlightQuery} />
          </p>
        )}

        {/* Definition excerpt */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#0b3a55]/85 line-clamp-3 leading-relaxed">
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
          <div className="mt-3 rounded-xs bg-[#f0e8cf]/65 p-3 border border-[#9a7413]/30 text-xs text-[#0b3a55]">
            <div className="flex items-center gap-1.5 font-mono-naut font-semibold text-[#9a7413] text-[10px] uppercase tracking-[0.08em] mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-[#9a7413] shrink-0" />
              <span>Importante para o Exame</span>
            </div>
            <p className="text-[12px] text-[#0b3a55]/90 leading-snug line-clamp-2">
              <HighlightText text={term.examTip} query={highlightQuery} />
            </p>
          </div>
        )}

        {/* Termos Relacionados Section */}
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-[#d7d0c1]/70 flex items-center gap-1.5 flex-wrap text-xs">
            <span className="font-mono-naut text-[10px] uppercase tracking-[0.06em] text-[#4f6e82]">Relacionados:</span>
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
                  className="rounded-xs bg-[#ede9de] border border-[#d7d0c1] px-2 py-0.5 font-mono-naut text-[10px] font-medium text-[#0b3a55] hover:bg-[#0b3a55] hover:text-[#faf7f0] hover:border-[#0b3a55] transition cursor-pointer"
                  title="Ver termo relacionado"
                >
                  {label}
                </span>
              );
            })}
            {term.relatedTerms.length > 4 && (
              <span className="font-mono-naut text-[10px] text-[#4f6e82]">+{term.relatedTerms.length - 4}</span>
            )}
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="mt-4 pt-3 border-t border-[#d7d0c1]/70 flex items-center justify-between text-xs text-[#4f6e82]">
        <div className="flex items-center gap-3">
          {term.examTip && (
            <span className="inline-flex items-center gap-1 font-mono-naut font-medium text-[#9a7413] text-[10px] uppercase tracking-[0.06em]">
              <AlertCircle className="w-3 h-3 text-[#9a7413]" />
              Dica Exame
            </span>
          )}

          {hasNote && (
            <span className="inline-flex items-center gap-1 font-mono-naut text-[10px] uppercase tracking-[0.06em] font-medium text-[#1e7d4f]">
              <FileText className="w-3 h-3" />
              Anotação
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-[#0b3a55] group-hover:translate-x-0.5 transition-transform">
          <span>Ver carta</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#0b3a55]" />
        </div>
      </div>
    </article>
  );
};
