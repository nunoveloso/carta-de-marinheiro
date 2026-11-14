import React, { useId, useState } from 'react';
import { Ship, Ruler, Volume2, VolumeX, AlertCircle, ArrowRight, Layers, Compass } from 'lucide-react';
import { User } from 'firebase/auth';
import { NauticalTerm } from '../types/glossary';
import { GlossaryText } from './GlossaryText';
import { TermDetailModal } from './TermDetailModal';
import { speakNauticalTerm, stopSpeaking } from '../utils/speech';

export type SidePartId =
  | 'quilha'
  | 'roda-de-proa'
  | 'cadaste'
  | 'painel-de-popa'
  | 'balizas'
  | 'linha-de-agua'
  | 'querena'
  | 'costado'
  | 'conves'
  | 'balaustres'
  | 'vergueiros'
  | 'verdugo'
  | 'escovem'
  | 'leme'
  | 'robaletes'
  | 'comprimento'
  | 'pontal'
  | 'calado'
  | 'boca';

type SideGroup = 'estrutura' | 'aparelho' | 'dimensoes';

interface SidePartMeta {
  id: SidePartId;
  termId: string;
  name: string;
  group: SideGroup;
  pageRef: string;
  zoneLabel: string;
  definition: string;
  examRule: string;
}

const SIDE_PARTS: Record<SidePartId, SidePartMeta> = {
  quilha: {
    id: 'quilha',
    termId: 'quilha',
    name: 'Quilha',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Eixo Inferior Longitudinal',
    definition:
      'Peça que constitui o primeiro elemento de construção de uma embarcação. Considerada a sua "coluna vertebral", nela encaixam as cavernas ou balizas.',
    examRule:
      'Pergunta clássica DGRM: "Qual é a peça considerada a coluna vertebral da embarcação?" → Quilha.',
  },
  'roda-de-proa': {
    id: 'roda-de-proa',
    termId: 'roda-de-proa',
    name: 'Roda de Proa',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Extremidade de Vante',
    definition:
      'Seguimento da quilha no sentido da proa, curvando para cima para formar o talha-mar que corta as águas.',
    examRule:
      'É a partir da face exterior da Roda de Proa até ao exterior do Cadaste que se mede o Comprimento.',
  },
  cadaste: {
    id: 'cadaste',
    termId: 'cadaste',
    name: 'Cadaste',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Extremidade de Ré',
    definition:
      'Seguimento da quilha no sentido da popa, servindo de suporte estrutural traseiro onde apoia a madre do leme.',
    examRule:
      'Não confundir com Roda de Proa (à frente) nem com Painel de Popa (espelho transversal superior).',
  },
  'painel-de-popa': {
    id: 'painel-de-popa',
    termId: 'painel-de-popa',
    name: 'Painel de Popa',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Espelho Traseiro',
    definition:
      'Painel transversal em relação à quilha colocado na extremidade oposta à roda de proa.',
    examRule:
      'O Bote e a Chata têm painel de popa; a Baleeira e o Salva-vidas NÃO têm painel de popa.',
  },
  balizas: {
    id: 'balizas',
    termId: 'balizas',
    name: 'Balizas (Cavernas)',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Ossatura Transversal Interna',
    definition:
      'Estruturas transversais em relação à quilha que dão forma ao casco. São também conhecidas por braços ou "costelas" da embarcação.',
    examRule:
      'A Boca máxima mede-se precisamente no sentido da baliza mais larga.',
  },
  'linha-de-agua': {
    id: 'linha-de-agua',
    termId: 'linha-de-agua',
    name: 'Linha de Água',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Plano de Flutuação',
    definition:
      'Linha de interseção da superfície da água com o exterior do casco que separa as obras vivas (abaixo) das obras mortas (acima).',
    examRule:
      'Serve também de referência superior para medir o Calado até ao ponto mais baixo da quilha.',
  },
  querena: {
    id: 'querena',
    termId: 'querena',
    name: 'Querena (Obras Vivas)',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Casco Submerso',
    definition:
      'Forma exterior do navio abaixo da linha de água (obras vivas / carena), em contacto permanente com a água.',
    examRule:
      'Sinónimos frequentes em exame: Obras vivas ou Carena. É na querena que se fixam os robaletes.',
  },
  costado: {
    id: 'costado',
    termId: 'costado',
    name: 'Costado (Obras Mortas)',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Casco Acima da Água',
    definition:
      'Forro exterior do casco situado acima da linha de água (obras mortas), exposto ao vento e agentes atmosféricos até à borda ou convés.',
    examRule:
      'Obras mortas = Costado (acima da linha de água). Obras vivas = Querena (abaixo da linha de água).',
  },
  conves: {
    id: 'conves',
    termId: 'conves',
    name: 'Convés',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Pavimento Superior',
    definition: 'Fecho superior do casco com função estrutural e de pavimento para circulação e manobra.',
    examRule:
      'No convés acondiciona-se equipamento de segurança como a balsa de salvação.',
  },
  balaustres: {
    id: 'balaustres',
    termId: 'balaustres',
    name: 'Balaústres',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Prumos Verticais da Borda',
    definition:
      'Peças normalmente em metal fixadas verticalmente à borda da embarcação, que recebem e sustentam os vergueiros (cabos de segurança).',
    examRule:
      'Conjunto de balaústres + vergueiros protege a tripulação de quedas ao mar ao circular no convés.',
  },
  vergueiros: {
    id: 'vergueiros',
    termId: 'vergueiros',
    name: 'Vergueiros',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Cabos da Guarda da Borda (Proa ↔ Popa)',
    definition:
      'Cabos (ou varões metálicos) que passam da proa à popa pelos olhais dos balaústres, formando a guarda de segurança ao longo das bordas da embarcação.',
    examRule:
      'Os vergueiros ligam os balaústres entre si ao longo da borda para evitar que a tripulação caia à água.',
  },
  verdugo: {
    id: 'verdugo',
    termId: 'verdugo',
    name: 'Verdugo',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Friso Exterior da Borda',
    definition:
      'Peça protetora colocada nas bordas exteriores, da proa à popa, destinada a proteger a embarcação dos choques nas atracagens.',
    examRule:
      'Funciona como uma cinta de proteção permanente no costado junto à borda.',
  },
  escovem: {
    id: 'escovem',
    termId: 'escovem',
    name: 'Escovém',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Abertura no Costado à Proa',
    definition: 'Abertura reforçada no costado onde passam os cabos de amarração ou a amarra do ferro.',
    examRule:
      'Evita que o atrito dos cabos ou da amarra danifique o forro do costado à proa.',
  },
  leme: {
    id: 'leme',
    termId: 'leme',
    name: 'Leme',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Aparelho de Governo à Popa',
    definition:
      'Aparelho que permite orientar a embarcação. É formado por madre (junto ao cadaste), porta (mergulhada na água) e cachola (onde encaixa a cana do leme).',
    examRule:
      'Memorizar as 3 partes do leme: Madre · Porta · Cachola.',
  },
  robaletes: {
    id: 'robaletes',
    termId: 'robaletes',
    name: 'Robaletes (Quilhas de Balanço)',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Lados da Querena',
    definition:
      'Peças exteriores colocadas longitudinalmente na parte mais larga da querena, destinadas a amortecer o balanço transversal.',
    examRule:
      'Também designados por "quilhas de balanço"; reduzem o adornamento lateral com mar de través.',
  },
  comprimento: {
    id: 'comprimento',
    termId: 'comprimento',
    name: 'Comprimento',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Dimensão Longitudinal',
    definition:
      'Distância entre a proa e a popa medida na direção Proa–Popa, desde a parte exterior da Roda de Proa até à face exterior do Cadaste.',
    examRule:
      'É a maior dimensão da embarcação; define limites legais das Embarcações de Recreio (2,5 m a 24 m).',
  },
  pontal: {
    id: 'pontal',
    termId: 'pontal',
    name: 'Pontal',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Altura Estrutural Total',
    definition:
      'Distância vertical da quilha à borda, medida desde a quilha até à parte superior do alcatrate, aproximadamente a meio da embarcação.',
    examRule:
      'Não confundir Pontal (quilha até à borda) com Calado (linha de água até ao fundo da quilha).',
  },
  calado: {
    id: 'calado',
    termId: 'calado',
    name: 'Calado',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Profundidade Submersa',
    definition:
      'Distância vertical entre a linha de água e o ponto mais baixo da quilha.',
    examRule:
      'Quanto maior a carga, maior o calado (imersão). Crucial para verificar sondas e evitar encalhes.',
  },
  boca: {
    id: 'boca',
    termId: 'boca',
    name: 'Boca',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Largura Máxima (Corte Transversal)',
    definition:
      'Largura máxima da embarcação, medida no alcatrate desde a face externa do forro de um bordo à do bordo contrário, no sentido da baliza mais larga.',
    examRule:
      'Embora visível em corte transversal/planta (e não em perfil lateral puro), faz parte das 3 dimensões principais (Comprimento · Boca · Pontal).',
  },
};

const SIDE_PART_LIST = Object.values(SIDE_PARTS);

interface VesselTypeItem {
  termId: string;
  title: string;
  pageRef: string;
  summary: string;
  keyTrait: string;
  silhouette: 'baleeira' | 'salva-vidas' | 'bote' | 'chata';
}

const VESSEL_TYPES_P4: VesselTypeItem[] = [
  {
    termId: 'baleeira',
    title: 'Baleeira',
    pageRef: 'Pág. 4',
    summary: 'Proa e popa mais elevadas que o meio da embarcação.',
    keyTrait: 'Sem painel de popa',
    silhouette: 'baleeira',
  },
  {
    termId: 'salva-vidas-embarcacao',
    title: 'Salva-vidas (Embarcação)',
    pageRef: 'Pág. 4',
    summary: 'Baleeira com caixas-de-ar (proa, ré e bancos) e cabo de socorros na borda.',
    keyTrait: 'Elevada flutuabilidade',
    silhouette: 'salva-vidas',
  },
  {
    termId: 'bote',
    title: 'Bote',
    pageRef: 'Pág. 4',
    summary: 'Roda de proa e painel de popa; desproporção aparente entre boca e comprimento.',
    keyTrait: 'Boca larga / curto',
    silhouette: 'bote',
  },
  {
    termId: 'chata',
    title: 'Chata',
    pageRef: 'Pág. 4',
    summary: 'Fundo chato, painel de popa e frequentemente pequeno painel à proa.',
    keyTrait: 'Auxiliar de pesca',
    silhouette: 'chata',
  },
];

export interface BoatSideProfileGuideProps {
  allTerms?: NauticalTerm[];
  onSelectTerm?: (term: NauticalTerm) => void;
  currentUser?: User | null;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
  userNotes?: Record<string, string>;
  onSaveNote?: (id: string, note: string) => Promise<void>;
  onOpenAuth?: () => void;
}

export const BoatSideProfileGuide: React.FC<BoatSideProfileGuideProps> = ({
  allTerms = [],
  onSelectTerm,
  currentUser = null,
  bookmarkedIds = new Set(),
  onToggleBookmark = () => {},
  userNotes = {},
  onSaveNote,
  onOpenAuth = () => {},
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [selectedPart, setSelectedPart] = useState<SidePartId>('quilha');
  const [hoveredPart, setHoveredPart] = useState<SidePartId | null>(null);
  const [activeGroup, setActiveGroup] = useState<'todos' | SideGroup>('todos');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [localModalTerm, setLocalModalTerm] = useState<NauticalTerm | null>(null);

  const currentInfo = SIDE_PARTS[selectedPart];
  const normalizeLookup = (val: string) =>
    val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const matchedGlossaryTerm =
    allTerms.find((t) => t.id === currentInfo.termId) ||
    allTerms.find((t) => {
      const n = normalizeLookup(t.term);
      const target = normalizeLookup(currentInfo.termId);
      return n === target || n === target.replace(/s$/, '');
    });

  const handleOpenTermModal = (term: NauticalTerm) => {
    if (onSelectTerm) {
      onSelectTerm(term);
    } else {
      setLocalModalTerm(term);
    }
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakNauticalTerm(
      text,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const isLit = (part: SidePartId) => selectedPart === part || hoveredPart === part;
  const partEvents = (part: SidePartId) => ({
    onClick: () => setSelectedPart(part),
    onMouseEnter: () => setHoveredPart(part),
    onMouseLeave: () => setHoveredPart((prev) => (prev === part ? null : prev)),
  });

  const skyGradId = `side-sky-${uid}`;
  const seaGradId = `side-sea-${uid}`;
  const glowAmberId = `side-glow-amber-${uid}`;
  const hullClipId = `side-hull-clip-${uid}`;

  const visibleButtons =
    activeGroup === 'todos' ? SIDE_PART_LIST : SIDE_PART_LIST.filter((p) => p.group === activeGroup);

  return (
    <div className="space-y-6">
      {/* Main Side-Profile Interactive Blueprint */}
      <section className="rounded-none border border-border bg-card p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 font-mono-naut text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a7413]">
              <Ship className="w-4 h-4 text-[#9a7413]" />
              <span>Manual do Marinheiro · Páginas 4 e 5</span>
            </div>
            <h3 className="font-maritime text-2xl sm:text-3xl font-bold text-primary mt-1">
              Vista Lateral e Corte Estrutural da Embarcação
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Toque diretamente nas peças do casco, no corte interior, nas cotas ou na lista abaixo para explorar a nomenclatura.
            </p>
          </div>

          <span className="font-mono-naut text-[11px] uppercase tracking-wider text-muted-foreground whitespace-nowrap shrink-0">
            ← Popa (Ré) · Proa (Vante) →
          </span>
        </div>

        {/* Group Filter Tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {(
            [
              { key: 'todos', label: 'Todos (19)' },
              { key: 'estrutura', label: 'Casco & Estrutura (8)' },
              { key: 'aparelho', label: 'Convés & Aparelho (7)' },
              { key: 'dimensoes', label: 'Dimensões Principais (4)' },
            ] as { key: 'todos' | SideGroup; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveGroup(tab.key)}
              className={`rounded-none border px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium transition whitespace-nowrap shrink-0 cursor-pointer ${
                activeGroup === tab.key
                  ? 'bg-primary text-[#fbf9f0] border-primary'
                  : 'bg-muted text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Side-View SVG */}
        <div className="mt-4 rounded-none border border-primary/30 overflow-hidden bg-[#e0f2fe]">
          <svg
            viewBox="0 0 880 440"
            className="w-full h-auto select-none block"
            role="img"
            aria-label="Vista lateral em corte estrutural de uma embarcação mostrando quilha, roda de proa, cadaste, leme, balizas e dimensões"
          >
            <defs>
              <linearGradient id={skyGradId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <linearGradient id={seaGradId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.95" />
              </linearGradient>
              <filter id={glowAmberId} filterUnits="userSpaceOnUse" x="0" y="0" width="880" height="440">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id={hullClipId}>
                <path d="M 162 186 C 340 205, 540 202, 725 174 C 698 242, 668 296, 628 334 L 210 334 C 202 292, 192 256, 184 242 L 162 186 Z" />
              </clipPath>
            </defs>

            {/* Sky and Translucent Sea Cross-Section */}
            <rect x="0" y="0" width="880" height="268" fill={`url(#${skyGradId})`} />
            <rect x="0" y="268" width="880" height="172" fill={`url(#${seaGradId})`} />

            {/* Orientation Watermark Strip Header */}
            <text x="26" y="28" fill="#0b3a55" fontSize="11" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace" opacity="0.75">
              ← POPA (RÉ)
            </text>
            <text x="854" y="28" textAnchor="end" fill="#0b3a55" fontSize="11" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace" opacity="0.75">
              PROA (VANTE) →
            </text>

            {/* ================= HULL BASE: COSTADO (ABOVE WATER) & QUERENA (BELOW WATER) ================= */}
            {/* Full hull silhouette for costado (above y=268) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('costado')}>
              <path
                d="M 162 186 C 340 205, 540 202, 725 174 L 668 268 L 194 268 L 184 242 L 162 186 Z"
                fill={isLit('costado') ? '#fef3c7' : '#fcfbf8'}
                stroke={isLit('costado') ? '#b45309' : '#94a3b8'}
                strokeWidth={isLit('costado') ? '3' : '1.5'}
              />
            </g>

            {/* Querena / Obras Vivas (below y=268) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('querena')}>
              <path
                d="M 194 268 L 668 268 C 655 292, 642 316, 628 334 L 210 334 C 204 304, 198 282, 194 268 Z"
                fill={isLit('querena') ? '#fde68a' : '#dbeafe'}
                fillOpacity={isLit('querena') ? '0.88' : '0.78'}
                stroke={isLit('querena') ? '#b45309' : '#0b3a55'}
                strokeWidth={isLit('querena') ? '3' : '1.2'}
              />
            </g>

            {/* ================= CUTAWAY WINDOW SHOWING INTERIOR RIBS (BALIZAS) ================= */}
            <g clipPath={`url(#${hullClipId})`}>
              {/* Soft interior cutaway frame */}
              <rect
                x="265"
                y="196"
                width="315"
                height="136"
                rx="8"
                fill="#faf7f0"
                fillOpacity="0.92"
                stroke="#cbd5e1"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              {/* BALIZAS (Transverse structural ribs stepping from keel) */}
              <g className="cursor-pointer" onClick={() => setSelectedPart('balizas')}>
                {[290, 335, 380, 425, 465, 505, 550].map((bx) => (
                  <path
                    key={bx}
                    d={`M ${bx} 198 C ${bx - 8} 245, ${bx - 5} 298, ${bx} 334`}
                    fill="none"
                    stroke={isLit('balizas') ? '#b45309' : '#78716c'}
                    strokeWidth={isLit('balizas') ? '5.5' : '3.2'}
                    strokeLinecap="round"
                    filter={isLit('balizas') ? `url(#${glowAmberId})` : undefined}
                  />
                ))}
                {/* Wide hit area */}
                <rect x="275" y="210" width="290" height="115" fill="transparent" />
              </g>
            </g>

            {/* ================= ROBALETES (BILGE KEEL ON QUERENA) ================= */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('robaletes')}>
              <path
                d="M 325 304 Q 430 310, 538 304 L 532 315 Q 430 321, 330 315 Z"
                fill={isLit('robaletes') ? '#d97706' : '#0b3a55'}
                stroke="#090d16"
                strokeWidth="1.2"
                filter={isLit('robaletes') ? `url(#${glowAmberId})` : undefined}
              />
              <rect x="320" y="294" width="225" height="28" fill="transparent" />
            </g>

            {/* ================= QUILHA, RODA DE PROA, CADASTE ================= */}
            {/* QUILHA (Keel spine along bottom) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('quilha')}>
              <path
                d="M 205 332 L 630 332 L 622 344 L 205 344 Z"
                fill={isLit('quilha') ? '#d97706' : '#1e293b'}
                stroke={isLit('quilha') ? '#92400e' : '#090d16'}
                strokeWidth={isLit('quilha') ? '2.5' : '1.4'}
                filter={isLit('quilha') ? `url(#${glowAmberId})` : undefined}
              />
              <rect x="205" y="324" width="425" height="26" fill="transparent" />
            </g>

            {/* RODA DE PROA (Bow stem curving forward & upward) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('roda-de-proa')}>
              <path
                d="M 626 340 C 668 298, 704 240, 728 174 L 716 175 C 694 238, 660 294, 620 334 Z"
                fill={isLit('roda-de-proa') ? '#d97706' : '#1e293b'}
                stroke={isLit('roda-de-proa') ? '#92400e' : '#090d16'}
                strokeWidth="1.6"
                filter={isLit('roda-de-proa') ? `url(#${glowAmberId})` : undefined}
              />
              <path
                d="M 624 338 C 666 296, 700 238, 724 174"
                fill="none"
                stroke="transparent"
                strokeWidth="22"
              />
            </g>

            {/* CADASTE (Sternpost aft) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('cadaste')}>
              <path
                d="M 200 344 L 212 344 L 194 240 L 182 242 Z"
                fill={isLit('cadaste') ? '#d97706' : '#1e293b'}
                stroke={isLit('cadaste') ? '#92400e' : '#090d16'}
                strokeWidth="1.5"
                filter={isLit('cadaste') ? `url(#${glowAmberId})` : undefined}
              />
              <line x1="188" y1="240" x2="206" y2="344" stroke="transparent" strokeWidth="20" />
            </g>

            {/* PAINEL DE POPA (Transom plate) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('painel-de-popa')}>
              <path
                d="M 157 185 L 167 185 L 190 242 L 180 244 Z"
                fill={isLit('painel-de-popa') ? '#d97706' : '#334155'}
                stroke={isLit('painel-de-popa') ? '#92400e' : '#0b3a55'}
                strokeWidth="1.6"
                filter={isLit('painel-de-popa') ? `url(#${glowAmberId})` : undefined}
              />
              <line x1="162" y1="185" x2="185" y2="242" stroke="transparent" strokeWidth="22" />
            </g>

            {/* ================= LEME (RUDDER: CACHOLA + MADRE + PORTA) ================= */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('leme')}>
              {/* Porta do leme (submerged blade) */}
              <path
                d="M 183 248 L 198 338 L 154 334 C 145 314, 148 274, 166 250 Z"
                fill={isLit('leme') ? '#f59e0b' : '#475569'}
                stroke={isLit('leme') ? '#92400e' : '#0b3a55'}
                strokeWidth="2"
                filter={isLit('leme') ? `url(#${glowAmberId})` : undefined}
              />
              {/* Madre (shaft along cadaste) */}
              <line
                x1="178"
                y1="176"
                x2="186"
                y2="252"
                stroke={isLit('leme') ? '#d97706' : '#0b3a55'}
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Cachola & Cana do leme (tiller) */}
              <rect x="172" y="168" width="12" height="12" rx="1.5" fill={isLit('leme') ? '#d97706' : '#0b3a55'} />
              <line x1="178" y1="174" x2="232" y2="167" stroke="#9a7413" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* ================= CONVÉS, VERDUGO, BALAUSTRES, ESCOVÉM ================= */}
            {/* CONVÉS (Deck line) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('conves')}>
              <path
                d="M 162 186 C 340 205, 540 202, 725 174"
                fill="none"
                stroke={isLit('conves') ? '#d97706' : '#0b3a55'}
                strokeWidth={isLit('conves') ? '7' : '4.5'}
                strokeLinecap="round"
                filter={isLit('conves') ? `url(#${glowAmberId})` : undefined}
              />
              <path
                d="M 162 186 C 340 205, 540 202, 725 174"
                fill="none"
                stroke="transparent"
                strokeWidth="18"
              />
            </g>

            {/* VERDUGO (Rubbing strake just below deck edge) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('verdugo')}>
              <path
                d="M 166 196 C 342 214, 538 211, 718 184"
                fill="none"
                stroke={isLit('verdugo') ? '#d97706' : '#64748b'}
                strokeWidth={isLit('verdugo') ? '6.5' : '4'}
                strokeLinecap="round"
                filter={isLit('verdugo') ? `url(#${glowAmberId})` : undefined}
              />
              <path
                d="M 166 196 C 342 214, 538 211, 718 184"
                fill="none"
                stroke="transparent"
                strokeWidth="14"
              />
            </g>

            {/* VERGUEIROS (Guardrail cables running from stern to bow) */}
            <g className="cursor-pointer" {...partEvents('vergueiros')}>
              <path
                d="M 176 158 C 345 175, 540 172, 708 147"
                fill="none"
                stroke={isLit('vergueiros') ? '#d97706' : '#475569'}
                strokeWidth={isLit('vergueiros') ? '3' : '1.7'}
                filter={isLit('vergueiros') ? `url(#${glowAmberId})` : undefined}
              />
              <path
                d="M 176 172 C 345 189, 540 186, 708 161"
                fill="none"
                stroke={isLit('vergueiros') ? '#d97706' : '#475569'}
                strokeWidth={isLit('vergueiros') ? '3' : '1.7'}
                filter={isLit('vergueiros') ? `url(#${glowAmberId})` : undefined}
              />
              {/* Wide invisible hit stroke strictly along the cables */}
              <path
                d="M 176 158 C 345 175, 540 172, 708 147"
                fill="none"
                stroke="transparent"
                strokeWidth="10"
              />
              <path
                d="M 176 172 C 345 189, 540 186, 708 161"
                fill="none"
                stroke="transparent"
                strokeWidth="10"
              />
            </g>

            {/* BALAÚSTRES (Vertical metallic stanchions — layered above cables with individual hit targets) */}
            <g className="cursor-pointer" {...partEvents('balaustres')}>
              {[
                { x: 176, yTop: 155, yBot: 187 },
                { x: 256, yTop: 162, yBot: 194 },
                { x: 356, yTop: 166, yBot: 198 },
                { x: 526, yTop: 162, yBot: 194 },
                { x: 627, yTop: 153, yBot: 185 },
                { x: 708, yTop: 144, yBot: 176 },
              ].map((b) => (
                <g key={b.x}>
                  <line
                    x1={b.x}
                    y1={b.yTop}
                    x2={b.x}
                    y2={b.yBot}
                    stroke={isLit('balaustres') ? '#d97706' : '#0b3a55'}
                    strokeWidth={isLit('balaustres') ? '4.8' : '3'}
                    strokeLinecap="round"
                    filter={isLit('balaustres') ? `url(#${glowAmberId})` : undefined}
                  />
                  <circle
                    cx={b.x}
                    cy={b.yTop}
                    r={isLit('balaustres') ? '3.4' : '2.4'}
                    fill={isLit('balaustres') ? '#d97706' : '#0b3a55'}
                  />
                  {/* Individual vertical hit zone per stanchion so hovering between posts hits Vergueiros */}
                  <rect x={b.x - 8} y={b.yTop - 5} width="16" height={b.yBot - b.yTop + 8} fill="transparent" />
                </g>
              ))}
            </g>

            {/* ESCOVÉM (Hawsehole opening near bow) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('escovem')}>
              <ellipse
                cx="668"
                cy="214"
                rx="9"
                ry="6"
                fill="#0b3a55"
                stroke={isLit('escovem') ? '#d97706' : '#94a3b8'}
                strokeWidth={isLit('escovem') ? '3.5' : '2'}
                filter={isLit('escovem') ? `url(#${glowAmberId})` : undefined}
              />
              {/* Mooring line passing out of escovém */}
              <path d="M 672 214 Q 698 225, 720 264" fill="none" stroke="#9a7413" strokeWidth="2.2" strokeDasharray="3 2" />
              <circle cx="668" cy="214" r="18" fill="transparent" />
            </g>

            {/* ================= LINHA DE ÁGUA (WATERLINE) ================= */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('linha-de-agua')}>
              <path
                d="M 24 268 Q 75 263, 126 268 T 228 268 T 330 268 T 432 268 T 534 268 T 636 268 T 738 268 T 840 268"
                fill="none"
                stroke={isLit('linha-de-agua') ? '#d97706' : '#0284c7'}
                strokeWidth={isLit('linha-de-agua') ? '4.5' : '2.4'}
                filter={isLit('linha-de-agua') ? `url(#${glowAmberId})` : undefined}
              />
              <line x1="24" y1="268" x2="840" y2="268" stroke="transparent" strokeWidth="14" />
            </g>

            {/* ================= MEASUREMENT DIMENSION GUIDES ================= */}
            {/* 1. COMPRIMENTO (Cadaste outer face x=188 to Roda de Proa outer face x=728) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('comprimento')}>
              <line x1="188" y1="344" x2="188" y2="412" stroke={isLit('comprimento') ? '#d97706' : '#64748b'} strokeWidth="1.2" strokeDasharray="4 3" />
              <line x1="728" y1="176" x2="728" y2="412" stroke={isLit('comprimento') ? '#d97706' : '#64748b'} strokeWidth="1.2" strokeDasharray="4 3" />
              <line
                x1="191"
                y1="402"
                x2="725"
                y2="402"
                stroke={isLit('comprimento') ? '#b45309' : '#0b3a55'}
                strokeWidth={isLit('comprimento') ? '3.5' : '2'}
              />
              {/* Arrowheads */}
              <polygon points="188,402 198,397 198,407" fill={isLit('comprimento') ? '#b45309' : '#0b3a55'} />
              <polygon points="728,402 718,397 718,407" fill={isLit('comprimento') ? '#b45309' : '#0b3a55'} />
              <rect
                x="398"
                y="389"
                width="120"
                height="24"
                rx="2"
                fill={isLit('comprimento') ? '#0b3a55' : '#fcfbf8'}
                stroke={isLit('comprimento') ? '#ca9e1c' : '#0b3a55'}
                strokeWidth="1.5"
              />
              <text
                x="458"
                y="405"
                textAnchor="middle"
                fill={isLit('comprimento') ? '#faf7f0' : '#0b3a55'}
                fontSize="11"
                fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace"
              >
                COMPRIMENTO
              </text>
            </g>

            {/* 2. CALADO (Linha de água y=268 to bottom of Quilha y=344) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('calado')}>
              <line x1="630" y1="344" x2="816" y2="344" stroke={isLit('calado') ? '#d97706' : '#64748b'} strokeWidth="1.2" strokeDasharray="4 3" />
              <line
                x1="806"
                y1="271"
                x2="806"
                y2="341"
                stroke={isLit('calado') ? '#b45309' : '#0b3a55'}
                strokeWidth={isLit('calado') ? '3.5' : '2'}
              />
              <polygon points="806,268 801,277 811,277" fill={isLit('calado') ? '#b45309' : '#0b3a55'} />
              <polygon points="806,344 801,335 811,335" fill={isLit('calado') ? '#b45309' : '#0b3a55'} />
              <rect
                x="758"
                y="294"
                width="96"
                height="22"
                rx="2"
                fill={isLit('calado') ? '#0b3a55' : '#fcfbf8'}
                stroke={isLit('calado') ? '#ca9e1c' : '#0b3a55'}
                strokeWidth="1.5"
              />
              <text
                x="806"
                y="309"
                textAnchor="middle"
                fill={isLit('calado') ? '#faf7f0' : '#0b3a55'}
                fontSize="10.5"
                fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace"
              >
                CALADO
              </text>
            </g>

            {/* 3. PONTAL (At midships from Quilha y=344 up to gunwale y=198) */}
            <g className="cursor-pointer" onClick={() => setSelectedPart('pontal')}>
              <line
                x1="402"
                y1="201"
                x2="402"
                y2="341"
                stroke={isLit('pontal') ? '#b45309' : '#0b3a55'}
                strokeWidth={isLit('pontal') ? '3.5' : '2'}
                strokeDasharray={isLit('pontal') ? 'none' : '4 2'}
              />
              <polygon points="402,198 397,207 407,207" fill={isLit('pontal') ? '#b45309' : '#0b3a55'} />
              <polygon points="402,344 397,335 407,335" fill={isLit('pontal') ? '#b45309' : '#0b3a55'} />
              <rect
                x="358"
                y="246"
                width="86"
                height="22"
                rx="2"
                fill={isLit('pontal') ? '#0b3a55' : '#fcfbf8'}
                stroke={isLit('pontal') ? '#ca9e1c' : '#0b3a55'}
                strokeWidth="1.5"
              />
              <text
                x="401"
                y="261"
                textAnchor="middle"
                fill={isLit('pontal') ? '#faf7f0' : '#0b3a55'}
                fontSize="10.5"
                fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace"
              >
                PONTAL
              </text>
            </g>

            {/* ================= CRISP INTERACTIVE CALLOUT LABELS ================= */}
            {(
              [
                { id: 'balaustres', label: 'Balaústres', x: 256, y: 118, tx: 256, ty: 170, w: 92 },
                { id: 'vergueiros', label: 'Vergueiros', x: 432, y: 118, tx: 440, ty: 168, w: 92 },
                { id: 'conves', label: 'Convés', x: 540, y: 118, tx: 525, ty: 192, w: 70 },
                { id: 'verdugo', label: 'Verdugo', x: 660, y: 118, tx: 635, ty: 194, w: 76 },
                { id: 'roda-de-proa', label: 'Roda de Proa', x: 786, y: 162, tx: 724, ty: 190, w: 108 },
                { id: 'escovem', label: 'Escovém', x: 786, y: 208, tx: 677, ty: 214, w: 80 },
                { id: 'costado', label: 'Costado', x: 786, y: 244, tx: 642, ty: 240, w: 78 },
                { id: 'painel-de-popa', label: 'Painel Popa', x: 96, y: 186, tx: 165, ty: 205, w: 98 },
                { id: 'leme', label: 'Leme', x: 86, y: 288, tx: 158, ty: 295, w: 60 },
                { id: 'cadaste', label: 'Cadaste', x: 96, y: 344, tx: 195, ty: 315, w: 76 },
                { id: 'linha-de-agua', label: 'Linha de Água', x: 88, y: 244, tx: 60, ty: 268, w: 108 },
                { id: 'balizas', label: 'Balizas', x: 320, y: 282, tx: 334, ty: 294, w: 70 },
                { id: 'robaletes', label: 'Robaletes', x: 550, y: 300, tx: 515, ty: 310, w: 82 },
                { id: 'querena', label: 'Querena', x: 650, y: 356, tx: 605, ty: 312, w: 76 },
                { id: 'quilha', label: 'Quilha', x: 295, y: 372, tx: 310, ty: 344, w: 68 },
              ] as { id: SidePartId; label: string; x: number; y: number; tx: number; ty: number; w: number }[]
            ).map((tag) => {
              const active = isLit(tag.id);
              return (
                <g
                  key={tag.id}
                  className="cursor-pointer"
                  {...partEvents(tag.id)}
                >
                  <line
                    x1={tag.x}
                    y1={tag.y}
                    x2={tag.tx}
                    y2={tag.ty}
                    stroke={active ? '#b45309' : '#0b3a55'}
                    strokeWidth={active ? '2' : '1.1'}
                    opacity={active ? '1' : '0.65'}
                  />
                  <circle cx={tag.tx} cy={tag.ty} r={active ? '4' : '2.8'} fill={active ? '#d97706' : '#0b3a55'} />
                  <rect
                    x={tag.x - tag.w / 2}
                    y={tag.y - 11}
                    width={tag.w}
                    height="22"
                    rx="2"
                    fill={active ? '#0b3a55' : '#fcfbf8'}
                    stroke={active ? '#ca9e1c' : '#94a3b8'}
                    strokeWidth={active ? '1.8' : '1.2'}
                  />
                  <text
                    x={tag.x}
                    y={tag.y + 4}
                    textAnchor="middle"
                    fill={active ? '#faf7f0' : '#0b3a55'}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="'IBM Plex Mono', monospace"
                  >
                    {tag.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Interactive Quick-Select Grid of All Terms (pp. 4-5) */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleButtons.map((part) => {
            const active = selectedPart === part.id;
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => setSelectedPart(part.id)}
                className={`rounded-none border px-2.5 py-1.5 font-mono-naut text-[11px] font-medium transition cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-primary text-[#fbf9f0] border-primary'
                    : 'bg-muted text-primary border-border hover:border-primary hover:bg-secondary'
                }`}
              >
                {part.name}
              </button>
            );
          })}
        </div>

        {/* Selected Part Plaque */}
        <div className="mt-5 rounded-none bg-muted p-5 sm:p-6 border border-border">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-border">
            <div>
              <div className="flex items-center gap-2 font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413]">
                <span>{currentInfo.pageRef}</span>
                <span aria-hidden="true">·</span>
                <span>{currentInfo.zoneLabel}</span>
              </div>
              <h4 className="font-maritime text-2xl font-bold text-primary mt-0.5">
                {currentInfo.name}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSpeak(currentInfo.name)}
                className={`rounded-none p-2 border transition cursor-pointer ${
                  isSpeaking
                    ? 'bg-primary border-primary text-[#fbf9f0]'
                    : 'bg-card border-border text-muted-foreground hover:text-primary hover:border-primary'
                }`}
                title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia do termo'}
                aria-label="Ouvir termo"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {matchedGlossaryTerm && (
                <button
                  type="button"
                  onClick={() => handleOpenTermModal(matchedGlossaryTerm)}
                  className="inline-flex items-center gap-1.5 rounded-none border border-primary bg-primary px-3 py-2 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#fbf9f0] hover:bg-[#082b3f] transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Abrir Carta</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ca9e1c]" />
                </button>
              )}
            </div>
          </div>

          <div className={currentInfo.id === 'boca' ? 'mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center' : 'mt-4'}>
            <div className={currentInfo.id === 'boca' ? 'md:col-span-2 space-y-3' : 'space-y-3'}>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                <GlossaryText
                  text={currentInfo.definition}
                  allTerms={allTerms}
                  onSelectTerm={handleOpenTermModal}
                />
              </p>

              <div className="flex items-start gap-2.5 p-3.5 rounded-none bg-[#f0e8cf]/65 border border-[#ca9e1c]/40 text-xs text-primary">
                <AlertCircle className="w-4 h-4 text-[#9a7413] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#9a7413]">Importante para o Exame:</strong>{' '}
                  <GlossaryText
                    text={currentInfo.examRule}
                    allTerms={allTerms}
                    onSelectTerm={handleOpenTermModal}
                  />
                </div>
              </div>
            </div>

            {/* Auxiliary Cross-Section Diagram when "Boca" is selected */}
            {currentInfo.id === 'boca' && (
              <div className="rounded-none border border-border bg-card p-3 flex flex-col items-center">
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <Ruler className="w-3 h-3 text-[#9a7413]" />
                  Corte Transversal (Baliza Mestra)
                </span>
                <svg viewBox="0 0 220 150" className="w-full max-w-[220px] h-auto" role="img" aria-label="Corte transversal mostrando Boca, Pontal e Calado">
                  <rect x="8" y="88" width="204" height="54" fill="#bae6fd" fillOpacity="0.6" />
                  <line x1="8" y1="88" x2="212" y2="88" stroke="#0284c7" strokeWidth="1.5" />
                  {/* Hull U-section */}
                  <path d="M 38 42 C 42 98, 72 118, 110 124 C 148 118, 178 98, 182 42 Z" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="2.5" />
                  {/* Keel bottom */}
                  <rect x="106" y="122" width="8" height="10" fill="#0b3a55" />
                  {/* Boca horizontal dimension */}
                  <line x1="38" y1="24" x2="182" y2="24" stroke="#b45309" strokeWidth="2.5" />
                  <polygon points="38,24 46,20 46,28" fill="#b45309" />
                  <polygon points="182,24 174,20 174,28" fill="#b45309" />
                  <text x="110" y="17" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">BOCA</text>
                  {/* Pontal vertical */}
                  <line x1="110" y1="44" x2="110" y2="122" stroke="#0b3a55" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="116" y="75" fill="#0b3a55" fontSize="9" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">Pontal</text>
                  {/* Calado */}
                  <line x1="194" y1="88" x2="194" y2="132" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="190" y="114" textAnchor="end" fill="#0369a1" fontSize="9" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">Calado</text>
                </svg>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Secondary Section: Tipos de Embarcações em Perfil Lateral (Manual p. 4) */}
      <section className="rounded-none border border-border bg-muted p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
          <div>
            <h4 className="font-maritime text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#9a7413]" />
              Tipos de Embarcações em Perfil Lateral (Manual p. 4)
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Compare o perfil da proa, popa e fundo que distingue cada embarcação clássica no exame.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VESSEL_TYPES_P4.map((item) => {
            const termObj = allTerms.find((t) => t.id === item.termId);
            return (
              <div
                key={item.termId}
                onClick={() => termObj && handleOpenTermModal(termObj)}
                className={`rounded-none border border-border bg-card p-4 flex flex-col justify-between transition ${
                  termObj ? 'hover:border-primary cursor-pointer' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono-naut text-[10px] text-muted-foreground uppercase tracking-wider">
                    <span>{item.pageRef}</span>
                    <span className="text-[#9a7413] font-semibold">{item.keyTrait}</span>
                  </div>

                  {/* Mini Side-Profile Silhouette */}
                  <div className="my-3 rounded-none border border-border bg-[#e0f2fe]/60 py-2 px-2 flex justify-center">
                    <svg viewBox="0 0 180 78" className="w-full h-16" role="img" aria-label={`Perfil lateral de ${item.title}`}>
                      <rect x="0" y="52" width="180" height="26" fill="#bae6fd" fillOpacity="0.65" />
                      <line x1="0" y1="52" x2="180" y2="52" stroke="#0284c7" strokeWidth="1.2" />

                      {item.silhouette === 'baleeira' && (
                        <g>
                          {/* Double-ended raised bow & stern */}
                          <path d="M 18 22 C 58 38, 122 38, 162 22 C 154 48, 134 62, 90 62 C 46 62, 26 48, 18 22 Z" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="2" />
                          <text x="90" y="48" textAnchor="middle" fill="#4f6e82" fontSize="8" fontFamily="'IBM Plex Mono', monospace">Sem painel</text>
                        </g>
                      )}

                      {item.silhouette === 'salva-vidas' && (
                        <g>
                          <path d="M 18 22 C 58 38, 122 38, 162 22 C 154 48, 134 62, 90 62 C 46 62, 26 48, 18 22 Z" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="2" />
                          {/* Air tanks (caixas-de-ar) */}
                          <path d="M 24 27 L 48 34 L 46 47 L 31 44 Z" fill="#ea580c" fillOpacity="0.85" />
                          <path d="M 156 27 L 132 34 L 134 47 L 149 44 Z" fill="#ea580c" fillOpacity="0.85" />
                          {/* Grab-line */}
                          <path d="M 26 32 Q 55 44 90 40 Q 125 44 154 32" fill="none" stroke="#9a7413" strokeWidth="1.8" />
                        </g>
                      )}

                      {item.silhouette === 'bote' && (
                        <g>
                          {/* Square stern transom (painel de popa) + curved stem */}
                          <path d="M 32 30 L 146 24 C 142 46, 126 62, 90 62 C 58 62, 42 52, 38 42 L 32 30 Z" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="2" />
                          <line x1="32" y1="30" x2="39" y2="44" stroke="#b3402f" strokeWidth="3.5" strokeLinecap="round" />
                          <text x="90" y="49" textAnchor="middle" fill="#4f6e82" fontSize="8" fontFamily="'IBM Plex Mono', monospace">Painel de popa</text>
                        </g>
                      )}

                      {item.silhouette === 'chata' && (
                        <g>
                          {/* Flat bottom, stern transom & smaller bow transom */}
                          <path d="M 24 28 L 154 32 L 144 58 L 32 58 Z" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="2" />
                          <line x1="24" y1="28" x2="32" y2="58" stroke="#b3402f" strokeWidth="3" />
                          <line x1="154" y1="32" x2="144" y2="58" stroke="#0b3a55" strokeWidth="2.5" />
                          <text x="90" y="48" textAnchor="middle" fill="#4f6e82" fontSize="8" fontFamily="'IBM Plex Mono', monospace">Fundo chato</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <h5 className="font-maritime text-lg font-bold text-primary">{item.title}</h5>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.summary}</p>
                </div>

                {termObj && (
                  <span className="mt-3 inline-flex items-center gap-1 font-mono-naut text-[10px] uppercase tracking-wider font-medium text-primary">
                    <span>Ver carta</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Supplementary p. 4 classification cards (Embarcações Miúdas & E.R.) */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              termId: 'embarcacoes-miudas',
              title: 'Embarcações Miúdas (Pág. 4)',
              desc: 'Embarcações de pequenas dimensões usadas em serviços auxiliares (navio–terra, salva-vidas ou lançar/alar redes na pesca).',
            },
            {
              termId: 'embarcacao-de-recreio',
              title: 'Embarcação de Recreio – E.R. (Pág. 4)',
              desc: 'Engenho ou aparelho com comprimento entre 2,5 m e 24 m para desporto náutico ou lazer sem fins lucrativos (inclui motas de água).',
            },
          ].map((extra) => {
            const termObj = allTerms.find((t) => t.id === extra.termId);
            return (
              <div
                key={extra.termId}
                onClick={() => termObj && handleOpenTermModal(termObj)}
                className={`rounded-none border border-border bg-card p-4 flex items-start justify-between gap-3 transition ${
                  termObj ? 'hover:border-primary cursor-pointer' : ''
                }`}
              >
                <div>
                  <h6 className="font-bold text-xs text-primary flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#9a7413]" />
                    <span>{extra.title}</span>
                  </h6>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{extra.desc}</p>
                </div>
                {termObj && <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />}
              </div>
            );
          })}
        </div>
      </section>

      {/* Fallback Modal if parent didn't pass onSelectTerm */}
      {localModalTerm && (
        <TermDetailModal
          term={localModalTerm}
          allTerms={allTerms}
          onClose={() => setLocalModalTerm(null)}
          isBookmarked={bookmarkedIds?.has(localModalTerm.id) || false}
          onToggleBookmark={onToggleBookmark}
          currentUser={currentUser}
          savedNote={userNotes?.[localModalTerm.id] || ''}
          onSaveNote={onSaveNote || (async () => {})}
          onSelectTerm={(t) => setLocalModalTerm(t)}
          onOpenAuth={onOpenAuth}
        />
      )}
    </div>
  );
};
