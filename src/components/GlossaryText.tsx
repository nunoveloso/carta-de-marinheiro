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

    // Sort phrases in descending order of length so longest match wins at any start index
    // (e.g. "ré do través" matches before "través")
    phrases.sort((a, b) => b.length - a.length);

    // Escape special regex characters and tolerate flexible whitespace
    const escapedPhrases = phrases.map((p) =>
      p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')
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

    // Collect all candidate matches across the text so an earlier shorter term
    // never shadows a longer overlapping term starting slightly later
    interface CandidateMatch {
      start: number;
      end: number;
      matchedTerm: NauticalTerm;
    }

    const candidates: CandidateMatch[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const matchedString = match[0];
      if (!matchedString) {
        regex.lastIndex += 1;
        continue;
      }

      const matchedLower = matchedString.replace(/\s+/g, ' ').toLowerCase();
      const targetTerm = phraseMap.get(matchedLower);

      if (targetTerm) {
        candidates.push({
          start: match.index,
          end: match.index + matchedString.length,
          matchedTerm: targetTerm,
        });
      }

      regex.lastIndex = match.index + 1;
    }

    // Strictly prioritize longest complete phrase, breaking ties by earliest occurrence
    candidates.sort((a, b) => {
      const lenDiff = (b.end - b.start) - (a.end - a.start);
      if (lenDiff !== 0) return lenDiff;
      return a.start - b.start;
    });

    const chosen: CandidateMatch[] = [];
    for (const cand of candidates) {
      const overlaps = chosen.some(
        (c) => cand.start < c.end && cand.end > c.start
      );
      if (!overlaps) {
        chosen.push(cand);
      }
    }

    chosen.sort((a, b) => a.start - b.start);

    const result: TextSegment[] = [];
    let lastIdx = 0;

    for (const seg of chosen) {
      if (seg.start > lastIdx) {
        result.push({
          type: 'text',
          content: text.slice(lastIdx, seg.start),
        });
      }

      result.push({
        type: 'term',
        content: text.slice(seg.start, seg.end),
        matchedTerm: seg.matchedTerm,
      });

      lastIdx = seg.end;
    }

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
              className="cursor-pointer underline decoration-dotted decoration-1 underline-offset-3 decoration-[#0b3a55]/60 hover:decoration-[#1e7d4f] hover:text-[#1e7d4f] font-medium transition-colors"
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
