import React, { useRef } from 'react';
import { NauticalTerm } from '../types/glossary';
import { TermCard } from './TermCard';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

interface DirectMatchesRowProps {
  terms: NauticalTerm[];
  searchQuery: string;
  bookmarkedIds: Set<string>;
  userNotes: Record<string, string>;
  onToggleBookmark: (termId: string) => void;
  onSelectTerm: (term: NauticalTerm) => void;
  allTerms: NauticalTerm[];
}

export const DirectMatchesRow: React.FC<DirectMatchesRowProps> = ({
  terms,
  searchQuery,
  bookmarkedIds,
  userNotes,
  onToggleBookmark,
  onSelectTerm,
  allTerms,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (terms.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="rounded-3xl border border-[#ded5c2] bg-[#fbf9f4] p-4 sm:p-6 shadow-xs mb-8">
      {/* Header of Section 1 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-[#f4efe4] p-2 border border-[#ded5c2] text-[#a16207]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#112338] tracking-tight">
              Correspondências Diretas no Nome do Termo
            </h4>
            <p className="text-xs text-[#64748b]">
              {terms.length} {terms.length === 1 ? 'termo com nome coincidente' : 'termos com nomes coincidentes'} com "{searchQuery}"
            </p>
          </div>
        </div>

        {/* Scroll Controls (Desktop) */}
        {terms.length > 1 && (
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[11px] text-[#94a3b8] mr-1">
              Deslize para ver todos
            </span>
            <button
              onClick={() => scroll('left')}
              className="rounded-xl border border-[#ded5c2] bg-white p-2 text-[#64748b] hover:text-[#112338] hover:bg-[#f4efe4] transition shadow-2xs"
              title="Recuar"
              aria-label="Recuar na lista de termos diretos"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="rounded-xl border border-[#ded5c2] bg-white p-2 text-[#64748b] hover:text-[#112338] hover:bg-[#f4efe4] transition shadow-2xs"
              title="Avançar"
              aria-label="Avançar na lista de termos diretos"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal 1-Line Row with exact same TermCard style */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-[#ded5c2] scrollbar-track-transparent scroll-smooth snap-x snap-mandatory"
      >
        {terms.map((term) => (
          <div
            key={term.id}
            className="shrink-0 w-[300px] sm:w-[350px] snap-start flex flex-col"
          >
            <TermCard
              term={term}
              isBookmarked={bookmarkedIds.has(term.id)}
              hasNote={Boolean(userNotes[term.id])}
              onToggleBookmark={onToggleBookmark}
              onSelectTerm={onSelectTerm}
              allTerms={allTerms}
              highlightQuery={searchQuery}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
