import React from 'react';

interface HighlightTextProps {
  text: string;
  query?: string;
  className?: string;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildNormalizedHighlightPattern(query: string): string | null {
  const charMap: Record<string, string> = {
    a: '[aáàãâä]',
    e: '[eéèêë]',
    i: '[iíìîï]',
    o: '[oóòõôö]',
    u: '[uúùûü]',
    c: '[cç]',
  };

  const alphaNumChars = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .split('');

  if (alphaNumChars.length < 2) {
    return null;
  }

  return alphaNumChars
    .map((char) => charMap[char] || escapeRegex(char))
    .join('[^\\p{L}\\p{N}]*');
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  query,
  className = '',
}) => {
  if (!text) return null;
  if (!query || !query.trim()) {
    return <span className={className}>{text}</span>;
  }

  const innerPattern = buildNormalizedHighlightPattern(query);
  if (!innerPattern) {
    return <span className={className}>{text}</span>;
  }

  try {
    const normalizedText = text.normalize('NFC');
    const pattern = new RegExp(`(${innerPattern})`, 'giu');
    const parts = normalizedText.split(pattern);

    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            return (
              <mark
                key={index}
                className="bg-[#e3b505]/40 text-primary font-semibold px-0.5 rounded-none"
              >
                {part}
              </mark>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </span>
    );
  } catch {
    return <span className={className}>{text}</span>;
  }
};
