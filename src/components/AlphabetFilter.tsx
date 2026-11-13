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
        <span className="font-mono-naut text-[10px] font-medium uppercase tracking-[0.14em] text-[#4f6e82]">
          Navegar por Letra Inicial
        </span>
        {selectedLetter !== 'all' && (
          <button
            onClick={() => onSelectLetter('all')}
            className="font-mono-naut text-[11px] font-medium text-[#9a7413] hover:text-[#0b3a55] transition underline underline-offset-2 cursor-pointer"
          >
            Limpar filtro (A-Z)
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {/* 'Todos' Button */}
        <button
          onClick={() => onSelectLetter('all')}
          className={`shrink-0 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-xs font-medium transition cursor-pointer ${
            selectedLetter === 'all'
              ? 'bg-[#0b3a55] text-[#faf7f0] border border-[#0b3a55]'
              : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:border-[#0b3a55] hover:bg-[#ede9de] hover:text-[#0b3a55]'
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
              className={`shrink-0 min-w-[34px] sm:min-w-[38px] h-8 rounded-xs flex items-center justify-center font-mono-naut text-xs font-medium transition ${
                isSelected
                  ? 'bg-[#0b3a55] text-[#faf7f0] border border-[#0b3a55] cursor-pointer'
                  : hasTerms
                  ? 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de] hover:border-[#0b3a55] cursor-pointer'
                  : 'border border-[#d7d0c1]/50 bg-[#faf7f0] text-[#4f6e82]/40 opacity-50 cursor-not-allowed'
              }`}
              title={hasTerms ? `${letter}: ${count} ${count === 1 ? 'termo' : 'termos'}` : `${letter}: sem termos`}
            >
              <span>{letter}</span>
              {hasTerms && (
                <span className={`ml-1 text-[9px] font-semibold ${isSelected ? 'text-[#ca9e1c]' : 'text-[#4f6e82]'}`}>
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
