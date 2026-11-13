import React from 'react';
import { Check, X } from 'lucide-react';

interface InlineFillBlankRendererProps {
  statement: string;
  blankAnswers: string[];
  onChangeBlank: (blankIndex: number, value: string) => void;
  disabled?: boolean;
  reviewMode?: boolean;
  expectedBlanks?: string[];
  acceptedKeywordsPerBlank?: string[][];
  expectedAnswer?: string;
}

// Accent & case insensitive normalization
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export const InlineFillBlankRenderer: React.FC<InlineFillBlankRendererProps> = ({
  statement,
  blankAnswers,
  onChangeBlank,
  disabled = false,
  reviewMode = false,
  expectedBlanks,
  acceptedKeywordsPerBlank,
  expectedAnswer,
}) => {
  // Check if statement has at least one underline pattern of 2+ underscores
  const hasUnderlines = /_{2,}/.test(statement);

  // If no underscores found in text, render standard fallback
  if (!hasUnderlines) {
    const userVal = blankAnswers[0] || '';
    const expected = expectedBlanks?.[0] || expectedAnswer || '';
    const normUser = normalize(userVal);
    const keywords = acceptedKeywordsPerBlank?.[0] || (expected ? [normalize(expected)] : []);
    const isCorrect = normUser.length > 0 && keywords.some((kw) => normUser.includes(normalize(kw)));

    return (
      <div className="space-y-3 mt-4">
        <p className="text-base sm:text-lg font-bold text-[#0b3a55] leading-relaxed">
          {statement}
        </p>

        <div className="flex flex-col sm:flex-row items-baseline gap-2 pt-2">
          <span className="font-mono-naut text-[11px] font-semibold text-[#4f6e82] uppercase tracking-wider shrink-0">
            Resposta:
          </span>
          <div className="flex-1 w-full max-w-xl">
            <input
              type="text"
              value={userVal}
              disabled={disabled}
              onChange={(e) => onChangeBlank(0, e.target.value)}
              placeholder="Escreva a resposta aqui..."
              className={`w-full border-b-2 font-medium text-sm sm:text-base px-3 py-1.5 rounded-t-xs outline-none transition-all ${
                reviewMode
                  ? isCorrect
                    ? 'border-[#1e7d4f] bg-[#dcebe1] text-[#1e7d4f]'
                    : 'border-[#b3402f] bg-[#f3ded9] text-[#b3402f]'
                  : 'border-dashed border-[#0b3a55]/60 focus:border-solid focus:border-[#0b3a55] bg-[#faf7f0] focus:bg-[#fcfbf8] text-[#0b3a55]'
              }`}
            />
            {reviewMode && expected && (
              <div className="mt-1.5 font-mono-naut text-xs flex items-center gap-1.5">
                <span className="text-[#4f6e82]">Resposta oficial:</span>
                <span className="font-semibold text-[#1e7d4f] bg-[#dcebe1] px-2 py-0.5 rounded-xs border border-[#1e7d4f]/40">
                  {expected}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Split statement by lines to preserve bullet lists & paragraphs
  const lines = statement.split('\n');

  let runningBlankIndex = 0;

  return (
    <div className="space-y-2.5 my-3">
      {lines.map((line, lineIdx) => {
        // If line is empty
        if (!line.trim()) {
          return <div key={lineIdx} className="h-2" />;
        }

        const isBullet = line.trimStart().startsWith('- ') || line.trimStart().startsWith('• ');
        const displayLine = isBullet ? line.trimStart().substring(2) : line;

        // Split line by 2+ underscores
        const parts = displayLine.split(/_{2,}/);

        return (
          <div
            key={lineIdx}
            className={`flex flex-wrap items-baseline text-sm sm:text-base text-[#0b3a55] leading-loose ${
              isBullet ? 'pl-4 sm:pl-6 relative' : ''
            }`}
          >
            {isBullet && (
              <span className="absolute left-0 text-[#9a7413] font-black select-none text-base">
                •
              </span>
            )}

            {parts.map((part, partIdx) => {
              const isLastPart = partIdx === parts.length - 1;
              const currentBlank = runningBlankIndex;

              if (!isLastPart) {
                runningBlankIndex++;
              }

              const userVal = blankAnswers[currentBlank] || '';
              const expectedForBlank = expectedBlanks?.[currentBlank];
              const keywordsForBlank = acceptedKeywordsPerBlank?.[currentBlank];

              let isBlankCorrect = false;
              if (reviewMode) {
                const normUser = normalize(userVal);
                if (keywordsForBlank && keywordsForBlank.length > 0) {
                  isBlankCorrect = normUser.length > 0 && keywordsForBlank.some((kw) => normUser.includes(normalize(kw)));
                } else if (expectedForBlank) {
                  isBlankCorrect = normUser.length > 0 && normalize(expectedForBlank).includes(normUser);
                }
              }

              // Dynamic width based on expected answer length
              const approxLength = expectedForBlank ? expectedForBlank.length : 12;
              const inputWidth = Math.min(Math.max(approxLength * 11, 130), 320);

              return (
                <React.Fragment key={partIdx}>
                  {/* Text fragment preceding the blank */}
                  {part && (
                    <span className="font-medium text-[#0b3a55]">
                      {part}
                    </span>
                  )}

                  {/* The interactive in-line underline blank */}
                  {!isLastPart && (
                    <span className="inline-flex flex-col relative align-baseline mx-1 my-1">
                      <input
                        type="text"
                        value={userVal}
                        disabled={disabled}
                        onChange={(e) => onChangeBlank(currentBlank, e.target.value)}
                        placeholder="________"
                        aria-label={`Espaço ${currentBlank + 1} para preenchimento`}
                        className={`border-b-2 font-semibold text-sm sm:text-base px-2.5 py-0.5 rounded-t-xs transition-all outline-none text-[#0b3a55] ${
                          reviewMode
                            ? isBlankCorrect
                              ? 'border-solid border-[#1e7d4f] bg-[#dcebe1] text-[#1e7d4f]'
                              : 'border-solid border-[#b3402f] bg-[#f3ded9] text-[#b3402f]'
                            : 'border-dashed border-[#0b3a55]/60 focus:border-solid focus:border-[#0b3a55] bg-[#fcfbf8] focus:bg-[#fcfbf8] focus:ring-2 focus:ring-[#0b3a55]/15 hover:border-[#0b3a55]'
                        }`}
                        style={{
                          width: `${inputWidth}px`,
                        }}
                      />

                      {/* Review Mode Answer Helper Badge */}
                      {reviewMode && expectedForBlank && (
                        <div className="mt-1 flex items-center gap-1 font-mono-naut text-[11px]">
                          {isBlankCorrect ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-[#1e7d4f] bg-[#dcebe1] border border-[#1e7d4f]/40 rounded-xs px-1.5 py-0.5">
                              <Check className="w-3 h-3" />
                              {expectedForBlank}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-semibold text-[#b3402f] bg-[#f3ded9] border border-[#b3402f]/40 rounded-xs px-1.5 py-0.5">
                              <X className="w-3 h-3" />
                              <span className="text-[#4f6e82] font-normal">Oficial:</span>
                              <span className="text-[#1e7d4f] font-bold">{expectedForBlank}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
