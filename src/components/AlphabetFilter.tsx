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
        <span className="font-mono-naut text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Navegar por Letra Inicial
        </span>
        {selectedLetter !== 'all' && (
          <button
            onClick={() => onSelectLetter('all')}
            className="font-mono-naut text-[11px] font-medium text-[#9a7413] hover:text-primary transition underline underline-offset-2 cursor-pointer"
          >
            Limpar filtro (A-Z)
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {/* 'Todos' Button */}
        <button
          onClick={() => onSelectLetter('all')}
          className={`shrink-0 whitespace-nowrap rounded-none px-3 py-1.5 font-mono-naut text-xs font-medium transition cursor-pointer ${
            selectedLetter === 'all'
              ? 'bg-primary text-primary-foreground border border-primary'
              : 'border border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
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
              className={`shrink-0 min-w-[34px] sm:min-w-[38px] h-8 rounded-none flex items-center justify-center font-mono-naut text-xs font-medium transition ${
                isSelected
                  ? 'bg-primary text-primary-foreground border border-primary cursor-pointer'
                  : hasTerms
                  ? 'border border-border bg-card text-primary hover:bg-secondary hover:border-primary cursor-pointer'
                  : 'border border-border/50 bg-background text-muted-foreground/40 opacity-50 cursor-not-allowed'
              }`}
              title={hasTerms ? `${letter}: ${count} ${count === 1 ? 'termo' : 'termos'}` : `${letter}: sem termos`}
            >
              <span>{letter}</span>
              {hasTerms && (
                <span className={`ml-1 text-[9px] font-semibold ${isSelected ? 'text-[#ca9e1c]' : 'text-muted-foreground'}`}>
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
