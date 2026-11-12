import React from 'react';

interface AlphabetFilterProps {
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
  letterCounts: Record<string, number>;
  totalCount: number;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const AlphabetFilter: React.FC<AlphabetFilterProps> = ({
  selectedLetter,
  onSelectLetter,
  letterCounts,
  totalCount,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
          Navegar por Letra Inicial
        </span>
        {selectedLetter !== 'all' && (
          <button
            onClick={() => onSelectLetter('all')}
            className="text-[11px] font-semibold text-[#a16207] hover:text-[#854d0e] transition underline underline-offset-2 cursor-pointer"
          >
            Limpar filtro (A-Z)
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {/* 'Todos' Button */}
        <button
          onClick={() => onSelectLetter('all')}
          className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-2xs ${
            selectedLetter === 'all'
              ? 'bg-[#112338] text-[#fbf8f2]'
              : 'border border-[#ded5c2] bg-white text-[#475569] hover:bg-[#eae3d2] hover:text-[#112338]'
          }`}
          title="Ver todos os termos"
        >
          A-Z ({totalCount})
        </button>

        {/* Individual Alphabet Buttons */}
        {ALPHABET.map((letter) => {
          const count = letterCounts[letter] || 0;
          const isSelected = selectedLetter === letter;
          const hasTerms = count > 0;

          return (
            <button
              key={letter}
              onClick={() => hasTerms && onSelectLetter(letter)}
              disabled={!hasTerms}
              className={`shrink-0 min-w-[34px] sm:min-w-[38px] h-9 rounded-xl flex items-center justify-center text-xs font-bold transition shadow-2xs ${
                isSelected
                  ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                  : hasTerms
                  ? 'border border-[#ded5c2] bg-white text-[#112338] hover:bg-[#eae3d2] hover:border-[#112338]/40'
                  : 'border border-[#e8e2d4] bg-[#fbf9f4] text-[#cbd5e1] opacity-50 cursor-not-allowed'
              }`}
              title={hasTerms ? `${letter}: ${count} ${count === 1 ? 'termo' : 'termos'}` : `${letter}: sem termos`}
            >
              <span>{letter}</span>
              {hasTerms && (
                <span className={`ml-1 text-[9px] font-semibold opacity-75 ${isSelected ? 'text-[#fbf8f2]' : 'text-[#854d0e]'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
