import React, { useState } from 'react';
import { NauticalTerm } from '../types/glossary';
import { Volume2, AlertCircle, ArrowRight, Check, Compass, Radio } from 'lucide-react';
import { playMorseCode } from '../utils/morseAudio';

export interface SignalFlagData {
  letter: string;
  name: string;
  morse: string;
  morseDisplay: string;
  meaning: string;
  examHighlight?: string;
  termId?: string; // id in the glossary if directly linked
  isImportantForExam: boolean;
}

export const CIS_FLAGS: SignalFlagData[] = [
  {
    letter: 'A',
    name: 'Alfa',
    morse: '· —',
    morseDisplay: '· —',
    meaning: 'Tenho mergulhador na água; mantenha-se afastado e a baixa velocidade.',
    examHighlight: 'Mergulhador na água (pergunta garantida de exame)',
    termId: 'bandeira-alfa',
    isImportantForExam: true,
  },
  {
    letter: 'B',
    name: 'Bravo',
    morse: '— · · ·',
    morseDisplay: '— · · ·',
    meaning: 'Estou a carregar, a descarregar ou a transportar mercadorias perigosas.',
    examHighlight: 'Combustível ou carga perigosa',
    termId: 'bandeira-bravo',
    isImportantForExam: true,
  },
  {
    letter: 'C',
    name: 'Charlie',
    morse: '— · — ·',
    morseDisplay: '— · — ·',
    meaning: 'Afirmativo / Sim.',
    isImportantForExam: false,
  },
  {
    letter: 'D',
    name: 'Delta',
    morse: '— · ·',
    morseDisplay: '— · ·',
    meaning: 'Mantenha-se afastado de mim; estou a manobrar com dificuldade.',
    isImportantForExam: false,
  },
  {
    letter: 'E',
    name: 'Echo',
    morse: '·',
    morseDisplay: '·',
    meaning: 'Estou a guinar para estibordo.',
    isImportantForExam: false,
  },
  {
    letter: 'F',
    name: 'Foxtrot',
    morse: '· · — ·',
    morseDisplay: '· · — ·',
    meaning: 'Estou avariado; comunique comigo.',
    isImportantForExam: false,
  },
  {
    letter: 'G',
    name: 'Golf',
    morse: '— — ·',
    morseDisplay: '— — ·',
    meaning: 'Preciso de prático.',
    isImportantForExam: false,
  },
  {
    letter: 'H',
    name: 'Hotel',
    morse: '· · · ·',
    morseDisplay: '· · · ·',
    meaning: 'Tenho prático a bordo.',
    isImportantForExam: true,
  },
  {
    letter: 'I',
    name: 'India',
    morse: '· ·',
    morseDisplay: '· ·',
    meaning: 'Estou a guinar para bombordo.',
    isImportantForExam: false,
  },
  {
    letter: 'J',
    name: 'Juliet',
    morse: '· — — —',
    morseDisplay: '· — — —',
    meaning: 'Tenho incêndio a bordo e levo carga perigosa: mantenha-se afastado.',
    isImportantForExam: false,
  },
  {
    letter: 'K',
    name: 'Kilo',
    morse: '— · —',
    morseDisplay: '— · —',
    meaning: 'Desejo comunicar consigo.',
    isImportantForExam: false,
  },
  {
    letter: 'L',
    name: 'Lima',
    morse: '· — · ·',
    morseDisplay: '· — · ·',
    meaning: 'Pare imediatamente o seu navio.',
    isImportantForExam: false,
  },
  {
    letter: 'M',
    name: 'Mike',
    morse: '— —',
    morseDisplay: '— —',
    meaning: 'O meu navio está parado e sem seguimento.',
    isImportantForExam: false,
  },
  {
    letter: 'N',
    name: 'November',
    morse: '— ·',
    morseDisplay: '— ·',
    meaning: 'Negativo / Não.',
    isImportantForExam: false,
  },
  {
    letter: 'O',
    name: 'Oscar',
    morse: '— — —',
    morseDisplay: '— — —',
    meaning: 'Homem ao mar!',
    examHighlight: 'Homem ao mar (pergunta frequente)',
    termId: 'bandeira-oscar',
    isImportantForExam: true,
  },
  {
    letter: 'P',
    name: 'Papa',
    morse: '· — — ·',
    morseDisplay: '· — — ·',
    meaning: 'No porto: todo o pessoal deve recolher a bordo; o navio vai largar.',
    examHighlight: 'Chamada para largar amarras ("Blue Peter")',
    isImportantForExam: true,
  },
  {
    letter: 'Q',
    name: 'Quebec',
    morse: '— — · —',
    morseDisplay: '— — · —',
    meaning: 'O meu navio está são e peço livre prática sanitária.',
    examHighlight: 'Livre prática sanitária / Alfândega',
    termId: 'bandeira-quebec',
    isImportantForExam: true,
  },
  {
    letter: 'R',
    name: 'Romeo',
    morse: '· — ·',
    morseDisplay: '· — ·',
    meaning: 'Sinal de procedimento náutico.',
    isImportantForExam: false,
  },
  {
    letter: 'S',
    name: 'Sierra',
    morse: '· · ·',
    morseDisplay: '· · ·',
    meaning: 'As minhas máquinas estão a fazer marcha a ré.',
    isImportantForExam: false,
  },
  {
    letter: 'T',
    name: 'Tango',
    morse: '—',
    morseDisplay: '—',
    meaning: 'Mantenha-se afastado de mim; estou a pescar em arrasto de parelha.',
    isImportantForExam: false,
  },
  {
    letter: 'U',
    name: 'Uniform',
    morse: '· · —',
    morseDisplay: '· · —',
    meaning: 'Está a dirigir-se para um perigo.',
    isImportantForExam: false,
  },
  {
    letter: 'V',
    name: 'Victor',
    morse: '· · · —',
    morseDisplay: '· · · —',
    meaning: 'Preciso de socorro / assistência.',
    examHighlight: 'Pedido de socorro / assistência (Crucial para exame)',
    termId: 'bandeira-victor',
    isImportantForExam: true,
  },
  {
    letter: 'W',
    name: 'Whiskey',
    morse: '· — —',
    morseDisplay: '· — —',
    meaning: 'Preciso de assistência médica.',
    isImportantForExam: false,
  },
  {
    letter: 'X',
    name: 'X-ray',
    morse: '— · · —',
    morseDisplay: '— · · —',
    meaning: 'Interrompa o que está a fazer e preste atenção aos meus sinais.',
    isImportantForExam: false,
  },
  {
    letter: 'Y',
    name: 'Yankee',
    morse: '— · — —',
    morseDisplay: '— · — —',
    meaning: 'Estou a arrastar o meu ferro (a garrar).',
    isImportantForExam: false,
  },
  {
    letter: 'Z',
    name: 'Zulu',
    morse: '— — · ·',
    morseDisplay: '— — · ·',
    meaning: 'Preciso de rebocador.',
    isImportantForExam: false,
  },
];

// Helper to render the precise SVG for any letter flag
export const renderFlagSVG = (letter: string, width = 80, height = 56) => {
  const l = letter.toUpperCase();
  const w = 100;
  const h = 70;

  // Colors
  const blue = '#1e3a8a';
  const red = '#dc2626';
  const yellow = '#eab308';
  const white = '#ffffff';
  const black = '#0f172a';

  let flagContent = null;

  switch (l) {
    case 'A': // Alfa: swallow-tail, white hoist half, blue fly half
      flagContent = (
        <g>
          {/* White hoist section */}
          <polygon points="0,0 50,0 50,70 0,70" fill={white} />
          {/* Blue fly swallow-tail section */}
          <polygon points="50,0 100,0 75,35 100,70 50,70" fill={blue} />
          {/* Swallow-tail outline */}
          <polygon points="0,0 100,0 75,35 100,70 0,70" fill="none" stroke="#94a3b8" strokeWidth="1" />
        </g>
      );
      break;

    case 'B': // Bravo: swallow-tail, fully red
      flagContent = (
        <polygon points="0,0 100,0 75,35 100,70 0,70" fill={red} stroke="#94a3b8" strokeWidth="1" />
      );
      break;

    case 'C': // Charlie: 5 horizontal stripes: blue, white, red, white, blue
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={blue} />
          <rect x="0" y="14" width={w} height="42" fill={white} />
          <rect x="0" y="28" width={w} height="14" fill={red} />
        </g>
      );
      break;

    case 'D': // Delta: 3 horizontal stripes: yellow, blue, yellow
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={yellow} />
          <rect x="0" y="18" width={w} height="34" fill={blue} />
        </g>
      );
      break;

    case 'E': // Echo: 2 horizontal stripes: blue top, red bottom
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height="35" fill={blue} />
          <rect x="0" y="35" width={w} height="35" fill={red} />
        </g>
      );
      break;

    case 'F': // Foxtrot: white with red diamond
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={white} />
          <polygon points="50,10 90,35 50,60 10,35" fill={red} />
        </g>
      );
      break;

    case 'G': // Golf: 6 vertical stripes alternating yellow & blue
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={yellow} />
          <rect x="16.6" y="0" width="16.6" height={h} fill={blue} />
          <rect x="50" y="0" width="16.6" height={h} fill={blue} />
          <rect x="83.3" y="0" width="16.7" height={h} fill={blue} />
        </g>
      );
      break;

    case 'H': // Hotel: vertical halves, white at hoist, red at fly
      flagContent = (
        <g>
          <rect x="0" y="0" width="50" height={h} fill={white} />
          <rect x="50" y="0" width="50" height={h} fill={red} />
        </g>
      );
      break;

    case 'I': // India: yellow with black circle
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={yellow} />
          <circle cx="50" cy="35" r="16" fill={black} />
        </g>
      );
      break;

    case 'J': // Juliet: 3 horizontal stripes: blue, white, blue
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={blue} />
          <rect x="0" y="23" width={w} height="24" fill={white} />
        </g>
      );
      break;

    case 'K': // Kilo: 2 vertical halves, yellow at hoist, blue at fly
      flagContent = (
        <g>
          <rect x="0" y="0" width="50" height={h} fill={yellow} />
          <rect x="50" y="0" width="50" height={h} fill={blue} />
        </g>
      );
      break;

    case 'L': // Lima: 4 quarters: yellow and black
      flagContent = (
        <g>
          <rect x="0" y="0" width="50" height="35" fill={yellow} />
          <rect x="50" y="0" width="50" height="35" fill={black} />
          <rect x="0" y="35" width="50" height="35" fill={black} />
          <rect x="50" y="35" width="50" height="35" fill={yellow} />
        </g>
      );
      break;

    case 'M': // Mike: blue with white saltire
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={blue} />
          <polygon points="0,0 12,0 100,61 100,70 88,70 0,9" fill={white} />
          <polygon points="100,0 88,0 0,61 0,70 12,70 100,9" fill={white} />
        </g>
      );
      break;

    case 'N': // November: 4x4 checkerboard blue & white
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={white} />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => {
              if ((r + c) % 2 === 0) {
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * 25}
                    y={r * 17.5}
                    width="25"
                    height="17.5"
                    fill={blue}
                  />
                );
              }
              return null;
            })
          )}
        </g>
      );
      break;

    case 'O': // Oscar: diagonal split top-hoist yellow, bottom-fly red
      flagContent = (
        <g>
          <polygon points="0,0 100,0 0,70" fill={yellow} />
          <polygon points="100,0 100,70 0,70" fill={red} />
        </g>
      );
      break;

    case 'P': // Papa: blue with white square
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={blue} />
          <rect x="30" y="20" width="40" height="30" fill={white} />
        </g>
      );
      break;

    case 'Q': // Quebec: completely yellow
      flagContent = <rect x="0" y="0" width={w} height={h} fill={yellow} />;
      break;

    case 'R': // Romeo: red with yellow cross
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={red} />
          <rect x="42" y="0" width="16" height={h} fill={yellow} />
          <rect x="0" y="27" width={w} height="16" fill={yellow} />
        </g>
      );
      break;

    case 'S': // Sierra: white with blue square
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={white} />
          <rect x="30" y="20" width="40" height="30" fill={blue} />
        </g>
      );
      break;

    case 'T': // Tango: 3 vertical stripes: red, white, blue
      flagContent = (
        <g>
          <rect x="0" y="0" width="33.3" height={h} fill={red} />
          <rect x="33.3" y="0" width="33.4" height={h} fill={white} />
          <rect x="66.7" y="0" width="33.3" height={h} fill={blue} />
        </g>
      );
      break;

    case 'U': // Uniform: 4 quarters: red and white
      flagContent = (
        <g>
          <rect x="0" y="0" width="50" height="35" fill={red} />
          <rect x="50" y="0" width="50" height="35" fill={white} />
          <rect x="0" y="35" width="50" height="35" fill={white} />
          <rect x="50" y="35" width="50" height="35" fill={red} />
        </g>
      );
      break;

    case 'V': // Victor: white with red saltire
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={white} />
          <polygon points="0,0 12,0 100,61 100,70 88,70 0,9" fill={red} />
          <polygon points="100,0 88,0 0,61 0,70 12,70 100,9" fill={red} />
        </g>
      );
      break;

    case 'W': // Whiskey: 3 concentric rectangles: blue, white, red
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={blue} />
          <rect x="18" y="12" width="64" height="46" fill={white} />
          <rect x="34" y="23" width="32" height="24" fill={red} />
        </g>
      );
      break;

    case 'X': // X-ray: white with blue cross
      flagContent = (
        <g>
          <rect x="0" y="0" width={w} height={h} fill={white} />
          <rect x="42" y="0" width="16" height={h} fill={blue} />
          <rect x="0" y="27" width={w} height="16" fill={blue} />
        </g>
      );
      break;

    case 'Y': // Yankee: diagonal stripes yellow & red
      flagContent = (
        <g>
          <defs>
            <pattern
              id="yankeeStripe"
              width="25"
              height="25"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="25" stroke={yellow} strokeWidth="13" />
              <line x1="12.5" y1="0" x2="12.5" y2="25" stroke={red} strokeWidth="13" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={w} height={h} fill="url(#yankeeStripe)" />
        </g>
      );
      break;

    case 'Z': // Zulu: 4 triangles: black top, yellow bottom, red left, blue right
      flagContent = (
        <g>
          <polygon points="0,0 100,0 50,35" fill={black} />
          <polygon points="0,70 100,70 50,35" fill={yellow} />
          <polygon points="0,0 0,70 50,35" fill={red} />
          <polygon points="100,0 100,70 50,35" fill={blue} />
        </g>
      );
      break;

    default:
      flagContent = <rect x="0" y="0" width={w} height={h} fill="#94a3b8" />;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`-6 -4 ${w + 12} ${h + 8}`}
      className="overflow-visible drop-shadow-sm select-none"
      aria-label={`Bandeira de Sinais ${l}`}
    >
      {/* Mast / Halyard line */}
      <line x1="-3" y1="-4" x2="-3" y2={h + 4} stroke="#64748b" strokeWidth="2.5" />
      {/* Top ring/shackle */}
      <circle cx="-3" cy="2" r="2.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      {/* Bottom ring/shackle */}
      <circle cx="-3" cy={h - 2} r="2.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      {/* Connecting short lanyards */}
      <line x1="-3" y1="2" x2="0" y2="2" stroke="#475569" strokeWidth="1.5" />
      <line x1="-3" y1={h - 2} x2="0" y2={h - 2} stroke="#475569" strokeWidth="1.5" />

      {/* Flag border / shadow container */}
      <g>
        {flagContent}
        {/* Subtle fabric border stroke */}
        {l !== 'A' && l !== 'B' && (
          <rect
            x="0"
            y="0"
            width={w}
            height={h}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="0.8"
            strokeOpacity="0.8"
          />
        )}
      </g>
    </svg>
  );
};

interface SignalFlagsIllustrationProps {
  termId: string;
  variant?: 'card' | 'modal';
  onSelectTerm?: (term: NauticalTerm) => void;
  allTerms?: NauticalTerm[];
}

export const SignalFlagsIllustration: React.FC<SignalFlagsIllustrationProps> = ({
  termId,
  variant = 'card',
  onSelectTerm,
  allTerms = [],
}) => {
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'essenciais' | 'todos'>('essenciais');

  const handlePlayMorse = (e: React.MouseEvent, morse: string, letter: string) => {
    e.stopPropagation();
    setPlayingLetter(letter);
    playMorseCode(morse);
    setTimeout(() => {
      setPlayingLetter((curr) => (curr === letter ? null : curr));
    }, 1500);
  };

  // Identify specific flag if termId corresponds to an individual flag
  const singleFlagMatch: Record<string, string> = {
    'bandeira-alfa': 'A',
    'bandeira-bravo': 'B',
    'bandeira-oscar': 'O',
    'bandeira-quebec': 'Q',
    'bandeira-victor': 'V',
  };

  const specificLetter = singleFlagMatch[termId];
  const specificFlagData = specificLetter
    ? CIS_FLAGS.find((f) => f.letter === specificLetter)
    : null;

  // ------------------------------------------------------------------
  // CASE 1: INDIVIDUAL FLAG CARD (Alfa, Bravo, Oscar, Quebec)
  // ------------------------------------------------------------------
  if (specificFlagData) {
    if (variant === 'card') {
      return (
        <div className="mt-3 rounded-none border border-border bg-muted p-3 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Flag SVG */}
              <div className="shrink-0 bg-card p-1 rounded-none border border-border">
                {renderFlagSVG(specificFlagData.letter, 60, 42)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary text-xs">
                    {specificFlagData.letter} — {specificFlagData.name}
                  </span>
                </div>
                {/* Morse code representation */}
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] font-mono-naut font-bold tracking-widest text-primary bg-[#dce8ef]/60 px-2 py-0.5 rounded-none border border-primary/30">
                    Morse: {specificFlagData.morseDisplay}
                  </span>
                  <button
                    onClick={(e) =>
                      handlePlayMorse(e, specificFlagData.morse, specificFlagData.letter)
                    }
                    className="p-1 rounded-none bg-secondary hover:bg-border/60 text-primary border border-border transition cursor-pointer"
                    title="Ouvir som do Código Morse"
                    aria-label={`Ouvir morse da letra ${specificFlagData.letter}`}
                  >
                    <Volume2
                      className={`w-3.5 h-3.5 ${
                        playingLetter === specificFlagData.letter
                          ? 'text-[#9a7413] animate-pulse'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Modal view for individual flag
    return (
      <div className="rounded-none border border-border bg-muted p-5">
        <div className="flex items-center justify-between pb-3 border-b border-border gap-2">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-none bg-primary"></span>
            Ilustração Oficial: Bandeira {specificFlagData.name} ({specificFlagData.letter}) & Código Morse
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#9a7413] bg-[#f0e8cf] px-2.5 py-1 rounded-none border border-[#ca9e1c]/40 shrink-0">
            Código Internacional de Sinais
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Flag Preview Box */}
          <div className="rounded-none bg-card p-5 border border-border flex flex-col items-center justify-center text-center">
            <div className="my-2">{renderFlagSVG(specificFlagData.letter, 120, 84)}</div>
            <div className="mt-3">
              <span className="text-lg font-bold text-primary">
                Bandeira {specificFlagData.name} ({specificFlagData.letter})
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">Sinal alfabético internacional de 1 letra</p>
            </div>
          </div>

          {/* Morse Code and Meaning Box */}
          <div className="rounded-none bg-card p-5 border border-border flex flex-col justify-between">
            <div>
              <span className="font-mono-naut text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                Código Morse Correspondente:
              </span>
              <div className="mt-1.5 flex items-center gap-3">
                <span className="font-mono-naut text-2xl font-bold tracking-widest text-primary bg-[#dce8ef]/60 px-4 py-2 rounded-none border border-primary/30">
                  {specificFlagData.morseDisplay}
                </span>
                <button
                  onClick={(e) =>
                    handlePlayMorse(e, specificFlagData.morse, specificFlagData.letter)
                  }
                  className="flex items-center gap-1.5 rounded-none bg-primary px-3.5 py-2.5 font-mono-naut text-xs font-medium uppercase tracking-wider text-[#fbf9f0] hover:bg-[#082b3f] transition cursor-pointer whitespace-nowrap"
                >
                  <Volume2
                    className={`w-4 h-4 ${
                      playingLetter === specificFlagData.letter ? 'text-[#e3b505] animate-pulse' : ''
                    }`}
                  />
                  <span>Ouvir Morse</span>
                </button>
              </div>

              <div className="mt-4">
                <span className="font-mono-naut text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                  Significado Náutico Oficial:
                </span>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-primary leading-relaxed">
                  "{specificFlagData.meaning}"
                </p>
              </div>
            </div>

            {specificFlagData.examHighlight && (
              <div className="mt-4 rounded-none bg-[#f0e8cf]/65 p-3 border border-[#ca9e1c]/40 text-xs text-primary">
                <strong className="block text-[#9a7413] mb-0.5">Importante para o Exame da DGRM:</strong>
                {specificFlagData.examHighlight}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // CASE 2: MAIN "CÓDIGO INTERNACIONAL DE SINAIS" CARD
  // ------------------------------------------------------------------
  if (termId === 'codigo-internacional-de-sinais') {
    const importantFlags = CIS_FLAGS.filter((f) => f.isImportantForExam);

    if (variant === 'card') {
      return (
        <div className="mt-3.5 rounded-none border border-border bg-muted p-3 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono-naut font-medium text-primary text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-none bg-primary"></span>
              Bandeiras Mais Relevantes de Exame (CIS)
            </span>
            <span className="font-mono-naut text-[10px] text-muted-foreground">Com Código Morse</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
            {importantFlags.slice(0, 6).map((flag) => (
              <div
                key={flag.letter}
                onClick={(e) => {
                  e.stopPropagation();
                  if (flag.termId) {
                    const match = allTerms.find((t) => t.id === flag.termId);
                    if (match && onSelectTerm) onSelectTerm(match);
                  }
                }}
                className="group/flag flex flex-col items-center justify-between rounded-none bg-card p-2 border border-border hover:border-primary hover:bg-secondary/50 transition cursor-pointer"
                title={`${flag.name} (${flag.letter}): ${flag.meaning}`}
              >
                <div className="h-10 flex items-center justify-center scale-90 group-hover/flag:scale-95 transition-transform">
                  {renderFlagSVG(flag.letter, 42, 30)}
                </div>
                <span className="mt-1 font-bold text-[11px] text-primary">{flag.letter}</span>
                <span className="font-mono-naut text-[9px] font-bold text-primary/80 tracking-tight">
                  {flag.morseDisplay}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-2 text-[11px] text-primary bg-[#f0e8cf]/65 px-2.5 py-1.5 rounded-none border border-[#ca9e1c]/40 leading-tight flex items-center justify-between">
            <span><strong className="text-[#9a7413]">Regra DGRM:</strong> Letras de 1 sinal de perigo e socorro (A, B, O, Q, V).</span>
          </p>
        </div>
      );
    }

    // Modal detailed alphabet view for CIS
    const displayedFlags = activeTab === 'essenciais' ? importantFlags : CIS_FLAGS;

    return (
      <div className="rounded-none border border-border bg-muted p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div>
            <h4 className="text-sm font-bold text-primary flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-none bg-primary"></span>
              Tabela de Bandeiras e Código Morse (CIS - Regulamento Oficial)
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Cada bandeira alfabética tem a sua correspondência em Código Morse e um significado quando içada isolada.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 rounded-none bg-secondary p-1 border border-border shrink-0">
            <button
              onClick={() => setActiveTab('essenciais')}
              className={`rounded-none px-3 py-1 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                activeTab === 'essenciais'
                  ? 'bg-card text-primary border border-border'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Exame Obrigatório ({importantFlags.length})
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`rounded-none px-3 py-1 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                activeTab === 'todos'
                  ? 'bg-card text-primary border border-border'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Alfabeto Completo A–Z (26)
            </button>
          </div>
        </div>

        {/* Flag Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedFlags.map((flag) => (
            <div
              key={flag.letter}
              onClick={() => {
                if (flag.termId) {
                  const match = allTerms.find((t) => t.id === flag.termId);
                  if (match && onSelectTerm) onSelectTerm(match);
                }
              }}
              className={`group flex items-start gap-3 rounded-none bg-card p-3.5 border border-border transition ${
                flag.termId ? 'hover:border-primary hover:shadow-[3px_3px_0_0_#0b3a55] cursor-pointer' : ''
              }`}
            >
              {/* Flag SVG */}
              <div className="shrink-0 bg-muted p-1.5 rounded-none border border-border group-hover:scale-105 transition-transform">
                {renderFlagSVG(flag.letter, 54, 38)}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-primary">
                      {flag.letter} — {flag.name}
                    </span>
                    {flag.isImportantForExam && (
                      <span className="rounded-none bg-[#f0e8cf] px-1.5 py-0.5 font-mono-naut text-[9px] font-medium uppercase text-[#9a7413] border border-[#ca9e1c]/40">
                        Exame
                      </span>
                    )}
                  </div>

                  {/* Audio Morse Button */}
                  <button
                    onClick={(e) => handlePlayMorse(e, flag.morse, flag.letter)}
                    className="p-1 rounded-none text-muted-foreground hover:text-primary hover:bg-secondary transition cursor-pointer"
                    title="Ouvir som do código Morse"
                    aria-label={`Ouvir código morse da letra ${flag.letter}`}
                  >
                    <Volume2
                      className={`w-3.5 h-3.5 ${
                        playingLetter === flag.letter ? 'text-[#9a7413] animate-pulse' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Morse representation */}
                <div className="mt-0.5">
                  <span className="font-mono-naut text-xs font-bold tracking-widest text-primary bg-[#dce8ef]/60 px-1.5 py-0.5 rounded-none border border-primary/30">
                    {flag.morseDisplay}
                  </span>
                </div>

                {/* Meaning */}
                <p className="mt-1.5 text-[11px] text-muted-foreground leading-snug line-clamp-2">
                  {flag.meaning}
                </p>

                {flag.termId && (
                  <span className="mt-1 inline-flex items-center gap-1 font-mono-naut text-[10px] font-medium text-primary group-hover:translate-x-0.5 transition-transform">
                    Ver carta de estudo <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Exam Quick Notes Box */}
        <div className="mt-4 rounded-none bg-[#f0e8cf]/65 p-3.5 border border-[#ca9e1c]/40 text-xs text-primary">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#9a7413] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#9a7413]">
                As Bandeiras Mais Avaliadas no Exame de Carta de Marinheiro:
              </span>
              <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-[11px]">
                <li>
                  <strong>Alfa (A, · —):</strong> Mergulhador na água, velocidade reduzida.
                </li>
                <li>
                  <strong>Bravo (B, — · · ·):</strong> Transporte de combustível / carga perigosa.
                </li>
                <li>
                  <strong>Oscar (O, — — —):</strong> Homem ao mar!
                </li>
                <li>
                  <strong>Quebec (Q, — — · —):</strong> Pedido de livre prática sanitária.
                </li>
                <li>
                  <strong>Victor (V, · · · —):</strong> Pedido de socorro / assistência urgente.
                </li>
                <li>
                  <strong>Papa (P, · — — ·):</strong> Chamada geral a bordo ("Blue Peter"), vai largar.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
