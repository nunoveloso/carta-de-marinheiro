import React from 'react';

interface HighlightTextProps {
  text: string;
  query?: string;
  className?: string;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildAccentInsensitivePattern(query: string): string {
  const charMap: Record<string, string> = {
    a: '[aáàãâä]',
    e: '[eéèêë]',
    i: '[iíìîï]',
    o: '[oóòõôö]',
    u: '[uúùûü]',
    c: '[cç]',
  };
  return query
    .split('')
    .map((char) => {
      const lower = char.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return charMap[lower] || escapeRegex(char);
    })
    .join('');
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

  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return <span className={className}>{text}</span>;
  }

  try {
    const pattern = new RegExp(`(${buildAccentInsensitivePattern(trimmed)})`, 'gi');
    const parts = text.split(pattern);

    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (pattern.test(part)) {
            return (
              <mark
                key={index}
                className="bg-[#fef08a] text-[#854d0e] font-bold px-0.5 py-0.2 rounded-xs"
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
