import React, { useMemo } from 'react';
import { NauticalTerm } from '../types/glossary';

interface GlossaryTextProps {
  text: string;
  allTerms: NauticalTerm[];
  currentTermId?: string;
  onSelectTerm: (term: NauticalTerm) => void;
  className?: string;
}

interface TextSegment {
  type: 'text' | 'term';
  content: string;
  matchedTerm?: NauticalTerm;
}

// Stopwords or generic words to avoid accidental false-positive matching
const STOPWORDS = new Set([
  'de', 'do', 'da', 'dos', 'das',
  'em', 'no', 'na', 'nos', 'nas',
  'por', 'para', 'com', 'sem',
  'um', 'uma', 'uns', 'umas',
  'que', 'qual', 'como',
  'este', 'esta', 'isto',
  'muito', 'pouco', 'mais', 'menos',
  'não', 'sim', 'ser', 'ter', 'estar',
  'ou', 'se', 'ja', 'já', 'ao', 'aos', 'à', 'às',
]);

export const GlossaryText: React.FC<GlossaryTextProps> = ({
  text,
  allTerms,
  currentTermId,
  onSelectTerm,
  className = '',
}) => {
  const segments = useMemo(() => {
    if (!text || !allTerms || allTerms.length === 0) {
      return [{ type: 'text', content: text }] as TextSegment[];
    }

    // Build phrase-to-term lookup table
    const phraseMap = new Map<string, NauticalTerm>();
    const phrases: string[] = [];

    // Helper to register a candidate keyword phrase
    const addPhrase = (phrase: string, term: NauticalTerm) => {
      const clean = phrase.trim().replace(/\s+/g, ' ');
      const lower = clean.toLowerCase();
      if (lower.length < 3 && !['nó', 'e.r.', 'z.h.'].includes(lower)) return;
      if (STOPWORDS.has(lower)) return;

      if (!phraseMap.has(lower)) {
        phraseMap.set(lower, term);
        phrases.push(clean);
      }
    };

    for (const t of allTerms) {
      // Do not self-link
      if (currentTermId && t.id === currentTermId) continue;

      // 1. Process primary term name
      const rawName = t.term;
      // Extract variations:
      // e.g. "Âncora (ou Ferro)" -> ["Âncora", "Ferro"]
      // e.g. "Proa ou Vante" -> ["Proa", "Vante"]
      // e.g. "Embarcação de Recreio (E.R.)" -> ["Embarcação de Recreio", "E.R."]
      // e.g. "P.L.S. (Posição Lateral de Segurança)" -> ["P.L.S.", "Posição Lateral de Segurança"]

      const parenMatch = rawName.match(/^(.*?)\s*\((.*?)\)$/);
      if (parenMatch) {
        const mainPart = parenMatch[1].trim();
        const insidePart = parenMatch[2].trim();

        if (mainPart) addPhrase(mainPart, t);

        // Handle "ou Ferro", "ou Ré", "Posição Lateral de Segurança"
        const strippedInside = insidePart.replace(/^ou\s+/i, '').trim();
        if (strippedInside && strippedInside.length >= 2) {
          addPhrase(strippedInside, t);
        }
      } else if (rawName.includes(' ou ')) {
        const parts = rawName.split(' ou ');
        for (const p of parts) {
          if (p.trim()) addPhrase(p.trim(), t);
        }
      } else {
        addPhrase(rawName, t);
      }

      // 2. Process synonyms if present
      if (t.synonyms && t.synonyms.length > 0) {
        for (const syn of t.synonyms) {
          addPhrase(syn, t);
        }
      }
    }

    if (phrases.length === 0) {
      return [{ type: 'text', content: text }] as TextSegment[];
    }

    // Sort phrases in descending order of length so longest match wins
    // (e.g. "embarcação de recreio" matches before "embarcação")
    phrases.sort((a, b) => b.length - a.length);

    // Escape special regex characters
    const escapedPhrases = phrases.map((p) =>
      p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    // Match with Unicode word boundaries so accented Portuguese letters (ã, é, ó, etc.) are respected
    const pattern = `(?<![\\p{L}\\p{N}])(${escapedPhrases.join('|')})(?![\\p{L}\\p{N}])`;
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, 'giu');
    } catch {
      // Fallback if environment doesn't support unicode property escapes
      regex = new RegExp(`\\b(${escapedPhrases.join('|')})\\b`, 'gi');
    }

    const result: TextSegment[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const matchStart = match.index;
      const matchedString = match[0];
      const matchEnd = matchStart + matchedString.length;

      // Add preceding plain text
      if (matchStart > lastIdx) {
        result.push({
          type: 'text',
          content: text.slice(lastIdx, matchStart),
        });
      }

      // Lookup target term
      const matchedLower = matchedString.toLowerCase();
      const targetTerm = phraseMap.get(matchedLower);

      if (targetTerm) {
        result.push({
          type: 'term',
          content: matchedString,
          matchedTerm: targetTerm,
        });
      } else {
        result.push({
          type: 'text',
          content: matchedString,
        });
      }

      lastIdx = matchEnd;
    }

    // Add trailing plain text
    if (lastIdx < text.length) {
      result.push({
        type: 'text',
        content: text.slice(lastIdx),
      });
    }

    return result;
  }, [text, allTerms, currentTermId]);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'term' && seg.matchedTerm) {
          const matched = seg.matchedTerm;
          return (
            <span
              key={`${matched.id}-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTerm(matched);
              }}
              title={`Ver termo: ${matched.term}`}
              className="cursor-pointer underline decoration-dotted decoration-1 underline-offset-3 decoration-[#112338]/70 hover:decoration-[#0f766e] hover:text-[#0f766e] font-medium transition-colors"
            >
              {seg.content}
            </span>
          );
        }
        return <React.Fragment key={idx}>{seg.content}</React.Fragment>;
      })}
    </span>
  );
};
