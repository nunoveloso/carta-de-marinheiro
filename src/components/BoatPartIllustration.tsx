import React, { useId } from 'react';

export interface BoatPartIllustrationProps {
  termId: string;
  variant?: 'card' | 'modal';
}

interface HighlightConfig {
  proa?: boolean;
  popa?: boolean;
  eb?: boolean;
  bb?: boolean;
  'amura-eb'?: boolean;
  'amura-bb'?: boolean;
  'traves-eb'?: boolean;
  'traves-bb'?: boolean;
  'alheta-eb'?: boolean;
  'alheta-bb'?: boolean;
  'meia-nau'?: boolean;
  'meio-navio'?: boolean;
  isAftBeamAngles?: boolean;
  badgeLabel: string;
  badgeSide: string;
  summaryNote: string;
}

export const BOAT_PART_HIGHLIGHTS: Record<string, HighlightConfig> = {
  'proa-ou-vante': {
    proa: true,
    badgeLabel: 'Proa (Vante)',
    badgeSide: 'Extremidade Anterior',
    summaryNote: 'Secção frontal que corta as águas; exibe luz de mastro branca.',
  },
  'popa-ou-re': {
    popa: true,
    badgeLabel: 'Popa (Ré)',
    badgeSide: 'Extremidade Posterior',
    summaryNote: 'Secção traseira onde se situam o leme e a luz de alcance branca.',
  },
  'bombordo': {
    bb: true,
    'amura-bb': true,
    'traves-bb': true,
    'alheta-bb': true,
    badgeLabel: 'Bombordo (BB)',
    badgeSide: 'Bordo Esquerdo (Vermelho)',
    summaryNote: 'Bordo esquerdo olhando para a proa; sinalizado com luz vermelha.',
  },
  'estibordo': {
    eb: true,
    'amura-eb': true,
    'traves-eb': true,
    'alheta-eb': true,
    badgeLabel: 'Estibordo (EB)',
    badgeSide: 'Bordo Direito (Verde)',
    summaryNote: 'Bordo direito olhando para a proa; sinalizado com luz verde.',
  },
  'amuras': {
    'amura-eb': true,
    'amura-bb': true,
    badgeLabel: 'Amuras (BB & EB)',
    badgeSide: 'Costado de Vante',
    summaryNote: 'Regiões curvas à proa onde o costado afunila em direção à roda de proa.',
  },
  'traves': {
    'traves-eb': true,
    'traves-bb': true,
    badgeLabel: 'Través (BB & EB)',
    badgeSide: 'Região Média Lateral',
    summaryNote: 'Direção perpendicular à linha longitudinal, a meio comprimento da embarcação.',
  },
  'alheta': {
    'alheta-eb': true,
    'alheta-bb': true,
    badgeLabel: 'Alhetas (BB & EB)',
    badgeSide: 'Costado de Ré',
    summaryNote: 'Zonas curvas posteriores junto ao painel e espelho de popa.',
  },
  'meio-navio': {
    'meio-navio': true,
    badgeLabel: 'Meio-Navio',
    badgeSide: 'Secção Transversal Média (L/2)',
    summaryNote: 'Secção transversal a meia distância entre a proa e a popa.',
  },
  'meia-nau': {
    'meia-nau': true,
    badgeLabel: 'Meia-Nau',
    badgeSide: 'Plano Longitudinal Médio',
    summaryNote: 'Plano longitudinal vertical que divide o barco em Bombordo e Estibordo.',
  },
  're-do-traves': {
    'alheta-eb': true,
    'alheta-bb': true,
    popa: true,
    isAftBeamAngles: true,
    badgeLabel: 'Ré do Través (Ângulos R.I.E.A.M.)',
    badgeSide: '> 22,5° para ré do través (135°)',
    summaryNote: '90° (Través) + 22,5° = 112,5° da proa · Setor de Alcance: 135° (67,5° EB + 67,5° BB).',
  },
};

export function isBoatPartTerm(termId: string): boolean {
  return Boolean(BOAT_PART_HIGHLIGHTS[termId]);
}

export const BoatPartIllustration: React.FC<BoatPartIllustrationProps> = ({
  termId,
  variant = 'card',
}) => {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const config = BOAT_PART_HIGHLIGHTS[termId];
  if (!config) {
    return null;
  }

  const isLit = (part: keyof HighlightConfig) => Boolean(config[part]);

  const seaBgId = `sea-bg-${safeId}`;
  const shadowId = `boat-water-shadow-${safeId}`;
  const glowGreenId = `glow-green-sm-${safeId}`;
  const glowRedId = `glow-red-sm-${safeId}`;
  const glowYellowId = `glow-yellow-sm-${safeId}`;
  const glowWhiteId = `glow-white-sm-${safeId}`;

  const isModal = variant === 'modal';

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-xs border border-[#0b3a55]/30 bg-gradient-to-b from-[#e0f2fe] via-[#d7effe] to-[#bae6fd] ${
        isModal ? 'my-4' : 'my-3'
      }`}
    >
      {isModal && (
        <div className="px-4 py-2 bg-[#fcfbf8]/95 border-b border-[#d7d0c1] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-xs bg-[#0b3a55]" />
            <span className="font-mono-naut text-[11px] font-medium text-[#0b3a55] uppercase tracking-wider">
              Esquema Náutico: {config.badgeLabel}
            </span>
          </div>
          <span className="font-mono-naut text-[10px] font-medium px-2 py-0.5 rounded-xs bg-[#dce8ef] text-[#0b3a55] border border-[#0b3a55]/30">
            {config.badgeSide}
          </span>
        </div>
      )}

      <svg
        viewBox="0 0 600 740"
        className={`w-full h-auto mx-auto select-none block drop-shadow-sm ${
          isModal
            ? config.isAftBeamAngles
              ? 'max-h-[360px]'
              : 'max-h-[290px]'
            : config.isAftBeamAngles
            ? 'max-h-[225px]'
            : 'max-h-[185px]'
        }`}
      >
        <defs>
          {/* Wave motion animations */}
          <style>{`
            @keyframes seaDriftA_${safeId} {
              0% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
              50% { transform: translateY(-7px) translateX(5px); opacity: 0.95; }
              100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
            }
            @keyframes seaDriftB_${safeId} {
              0% { transform: translateY(0px) translateX(0px); opacity: 0.55; }
              50% { transform: translateY(6px) translateX(-5px); opacity: 0.9; }
              100% { transform: translateY(0px) translateX(0px); opacity: 0.55; }
            }
            .wave-a_${safeId} {
              animation: seaDriftA_${safeId} 5.5s ease-in-out infinite;
            }
            .wave-b_${safeId} {
              animation: seaDriftB_${safeId} 6.5s ease-in-out infinite;
            }
          `}</style>

          {/* Sea Gradient */}
          <linearGradient id={seaBgId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="50%" stopColor="#d5effe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id={glowGreenId} filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={glowRedId} filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={glowYellowId} filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={glowWhiteId} filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={shadowId} x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0284c7" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Sea Background */}
        <rect width="600" height="740" fill={`url(#${seaBgId})`} />

        {/* Animated Sea Waves */}
        <g className={`wave-a_${safeId} pointer-events-none`}>
          <path
            d="M 45 95 C 85 85, 125 105, 165 95 M 435 95 C 475 85, 515 105, 555 95"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 50 160 C 95 150, 145 170, 190 160 M 410 160 C 455 150, 505 170, 550 160"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M 35 285 C 75 275, 115 295, 155 285 M 445 285 C 485 275, 525 295, 565 285"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M 45 490 C 85 480, 130 500, 170 490 M 430 490 C 470 480, 515 500, 555 490"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        <g className={`wave-b_${safeId} pointer-events-none`}>
          <path
            d="M 65 220 C 105 230, 140 210, 180 220 M 420 220 C 455 230, 495 210, 535 220"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 60 380 C 100 390, 130 370, 170 380 M 430 380 C 465 390, 495 370, 535 380"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 75 615 C 125 605, 175 625, 215 615 M 385 615 C 425 605, 475 625, 525 615"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 120 690 C 180 680, 240 700, 300 690 C 360 680, 420 700, 480 690"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>

        {/* Boundary Guide Circle */}
        <circle
          cx="300"
          cy="370"
          r="260"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.45"
          className="pointer-events-none"
        />

        {/* ================= RIEAM "RÉ DO TRAVÉS" ANGLE SECTORS ================= */}
        {config.isAftBeamAngles && (
          <g className="pointer-events-none">
            {/* Setor Luz de Estibordo (0° a 112,5° EB) */}
            <path
              d="M 300 370 L 300 110 A 260 260 0 0 1 540.2 469.5 Z"
              fill="#16a34a"
              fillOpacity="0.11"
            />
            {/* Setor Luz de Bombordo (0° a 112,5° BB) */}
            <path
              d="M 300 370 L 300 110 A 260 260 0 0 0 59.8 469.5 Z"
              fill="#dc2626"
              fillOpacity="0.11"
            />

            {/* Cunhas de transição 22,5° para ré do través (90° -> 112,5°) */}
            <path
              d="M 300 370 L 560 370 A 260 260 0 0 1 540.2 469.5 Z"
              fill="#0b3a55"
              fillOpacity="0.12"
            />
            <path
              d="M 300 370 L 40 370 A 260 260 0 0 0 59.8 469.5 Z"
              fill="#0b3a55"
              fillOpacity="0.12"
            />

            {/* Setor de Alcance / > 22,5° para ré do través (135° = 67,5° EB + 67,5° BB) */}
            <path
              d="M 300 370 L 540.2 469.5 A 260 260 0 0 1 59.8 469.5 Z"
              fill="#f59e0b"
              fillOpacity="0.24"
            />
            <path
              d="M 540.2 469.5 A 260 260 0 0 1 59.8 469.5"
              fill="none"
              stroke="#b45309"
              strokeWidth="3"
            />

            {/* Eixos de referência: Proa-Popa (0°-180°) e Través (90°) */}
            <line
              x1="300"
              y1="94"
              x2="300"
              y2="646"
              stroke="#0b3a55"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <line
              x1="36"
              y1="370"
              x2="564"
              y2="370"
              stroke="#0b3a55"
              strokeWidth="2.5"
              strokeDasharray="7 5"
            />

            {/* Semirretas limite a 22,5° para ré do través (112,5° da proa) */}
            <line
              x1="300"
              y1="370"
              x2="546"
              y2="472"
              stroke="#b45309"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="300"
              y1="370"
              x2="54"
              y2="472"
              stroke="#b45309"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Arcos internos de medição angular (r = 200) */}
            <path
              d="M 500 370 A 200 200 0 0 1 484.8 446.5"
              fill="none"
              stroke="#0b3a55"
              strokeWidth="2.2"
            />
            <path
              d="M 100 370 A 200 200 0 0 0 115.2 446.5"
              fill="none"
              stroke="#0b3a55"
              strokeWidth="2.2"
            />
            <path
              d="M 484.8 446.5 A 200 200 0 0 1 115.2 446.5"
              fill="none"
              stroke="#b45309"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* ================= WHITE HULL ASSEMBLY ================= */}
        <g transform={config.isAftBeamAngles ? 'translate(300, 370) scale(0.56) translate(-300, -370)' : undefined}>
        <g id="boat-hull-body">
          <path
            d="M 300 115
               C 345 155, 385 205, 408 260
               C 420 315, 420 425, 408 480
               C 398 535, 385 585, 370 625
               L 230 625
               C 215 585, 202 535, 192 480
               C 180 425, 180 315, 192 260
               C 215 205, 255 155, 300 115 Z"
            fill="#ffffff"
            filter={`url(#${shadowId})`}
          />

          <path
            d="M 300 130
               C 340 166, 376 210, 398 260
               C 409 315, 409 425, 398 480
               C 388 530, 376 575, 360 610
               L 240 610
               C 224 575, 212 530, 202 480
               C 191 425, 191 315, 202 260
               C 224 210, 260 166, 300 130 Z"
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />

          <path
            d="M 300 150
               C 330 185, 360 225, 380 270
               C 390 320, 390 420, 380 470
               C 370 515, 360 555, 345 585
               L 255 585
               C 240 555, 230 515, 220 470
               C 210 420, 210 320, 220 270
               C 240 225, 270 185, 300 150 Z"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </g>

        {/* ================= BORDER SEGMENTS & AXES ================= */}

        {/* ESTIBORDO (RIGHT RIM) - GREEN */}
        {/* Amura EB */}
        <path
          d="M 300 115 C 345 155, 385 205, 408 260"
          fill="none"
          stroke={isLit('amura-eb') || isLit('eb') ? '#15803d' : '#16a34a'}
          strokeWidth={isLit('amura-eb') || isLit('eb') ? '8' : '3.5'}
          strokeLinecap="round"
          filter={isLit('amura-eb') || isLit('eb') ? `url(#${glowGreenId})` : undefined}
        />

        {/* Través EB */}
        <path
          d="M 408 260 C 420 315, 420 425, 408 480"
          fill="none"
          stroke={isLit('traves-eb') || isLit('eb') ? '#15803d' : '#16a34a'}
          strokeWidth={isLit('traves-eb') || isLit('eb') ? '8' : '3.5'}
          strokeLinecap="round"
          filter={isLit('traves-eb') || isLit('eb') ? `url(#${glowGreenId})` : undefined}
        />

        {/* Alheta EB */}
        <path
          d="M 408 480 C 398 535, 385 585, 370 625"
          fill="none"
          stroke={isLit('alheta-eb') || isLit('eb') ? '#15803d' : '#16a34a'}
          strokeWidth={isLit('alheta-eb') || isLit('eb') ? '8' : '3.5'}
          strokeLinecap="round"
          filter={isLit('alheta-eb') || isLit('eb') ? `url(#${glowGreenId})` : undefined}
        />

        {/* BOMBORDO (LEFT RIM) - RED */}
        {/* Amura BB */}
        <path
          d="M 300 115 C 255 155, 215 205, 192 260"
          fill="none"
          stroke={isLit('amura-bb') || isLit('bb') ? '#dc2626' : '#b91c1c'}
          strokeWidth={isLit('amura-bb') || isLit('bb') ? '8' : '3.5'}
          strokeLinecap="round"
          filter={isLit('amura-bb') || isLit('bb') ? `url(#${glowRedId})` : undefined}
        />

        {/* Través BB */}
        <path
          d="M 192 260 C 180 315, 180 425, 192 480"
          fill="none"
          stroke={isLit('traves-bb') || isLit('bb') ? '#dc2626' : '#b91c1c'}
          strokeWidth={isLit('traves-bb') || isLit('bb') ? '8' : '3.5'}
          strokeLinecap="round"
          filter={isLit('traves-bb') || isLit('bb') ? `url(#${glowRedId})` : undefined}
        />

        {/* Alheta BB */}
        <path
          d="M 192 480 C 202 535, 215 585, 230 625"
          fill="none"
          stroke={isLit('alheta-bb') || isLit('bb') ? '#dc2626' : '#b91c1c'}
          strokeWidth={isLit('alheta-bb') || isLit('bb') ? '8' : '3.5'}
          strokeLinecap="round"
          filter={isLit('alheta-bb') || isLit('bb') ? `url(#${glowRedId})` : undefined}
        />

        {/* POPA (TRANSOM) */}
        <g>
          {isLit('popa') && (
            <path
              d="M 229 625 C 275 627, 325 627, 371 625"
              fill="none"
              stroke="#0f172a"
              strokeWidth="11"
              strokeLinecap="round"
            />
          )}
          <path
            d="M 230 625 C 275 627, 325 627, 370 625"
            fill="none"
            stroke={isLit('popa') ? '#ffffff' : '#64748b'}
            strokeWidth={isLit('popa') ? '8' : '4'}
            strokeLinecap="round"
            filter={isLit('popa') ? `url(#${glowWhiteId})` : undefined}
          />
          <circle
            cx="300"
            cy="626"
            r={isLit('popa') ? '6.5' : '4.5'}
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
        </g>

        {/* PROA (BOW STEM APEX) */}
        <g>
          {isLit('proa') && (
            <path
              d="M 288 126 L 300 115 L 312 126"
              fill="none"
              stroke="#0f172a"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <path
            d="M 288 126 L 300 115 L 312 126"
            fill="none"
            stroke={isLit('proa') ? '#ffffff' : '#475569'}
            strokeWidth={isLit('proa') ? '8' : '4'}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={isLit('proa') ? `url(#${glowWhiteId})` : undefined}
          />
          <circle
            cx="300"
            cy="115"
            r={isLit('proa') ? '6.5' : '4.5'}
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
        </g>

        {/* MEIA-NAU & MEIO-NAVIO (omit when showing clean RIEAM compass axes) */}
        {!config.isAftBeamAngles && (
          <>
            {/* MEIA-NAU (LONGITUDINAL AXIS) */}
            <g>
              <line
                x1="300"
                y1="85"
                x2="300"
                y2="645"
                stroke={isLit('meia-nau') ? '#f59e0b' : '#d97706'}
                strokeWidth={isLit('meia-nau') ? '8' : '2.5'}
                strokeDasharray={isLit('meia-nau') ? 'none' : '8 5'}
                strokeLinecap="round"
                filter={isLit('meia-nau') ? `url(#${glowYellowId})` : undefined}
              />
              <circle
                cx="300"
                cy="100"
                r={isLit('meia-nau') ? '8' : '4.5'}
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <circle
                cx="300"
                cy="635"
                r={isLit('meia-nau') ? '8' : '4.5'}
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </g>

            {/* MEIO-NAVIO (TRANSVERSAL AXIS) */}
            <g>
              <line
                x1="110"
                y1="370"
                x2="490"
                y2="370"
                stroke={isLit('meio-navio') ? '#d97706' : '#b45309'}
                strokeWidth={isLit('meio-navio') ? '8' : '2.5'}
                strokeDasharray={isLit('meio-navio') ? 'none' : '8 5'}
                strokeLinecap="round"
                filter={isLit('meio-navio') ? `url(#${glowYellowId})` : undefined}
              />
            </g>
          </>
        )}

        {/* Intersection Hub */}
        <circle
          cx="300"
          cy="370"
          r={isLit('meia-nau') || isLit('meio-navio') ? '11' : '7'}
          fill={isLit('meia-nau') || isLit('meio-navio') ? '#f59e0b' : '#d97706'}
          stroke="#ffffff"
          strokeWidth="2"
          filter={isLit('meia-nau') || isLit('meio-navio') ? `url(#${glowYellowId})` : undefined}
        />
        </g>

        {/* ================= RIEAM ANGLE LABELS ================= */}
        {config.isAftBeamAngles && (
          <g className="pointer-events-none" fontFamily="'IBM Plex Mono', monospace" fontWeight="700">
            {/* 0° Proa */}
            <rect x="242" y="54" width="116" height="28" rx="3" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="1.5" />
            <text x="300" y="73" textAnchor="middle" fill="#0b3a55" fontSize="14">0° PROA</text>

            {/* Setores de Bordo 112,5° */}
            <rect x="74" y="196" width="102" height="26" rx="3" fill="#fcfbf8" fillOpacity="0.92" stroke="#b91c1c" strokeWidth="1.2" />
            <text x="125" y="214" textAnchor="middle" fill="#b91c1c" fontSize="13">112,5° BB</text>

            <rect x="424" y="196" width="102" height="26" rx="3" fill="#fcfbf8" fillOpacity="0.92" stroke="#15803d" strokeWidth="1.2" />
            <text x="475" y="214" textAnchor="middle" fill="#15803d" fontSize="13">112,5° EB</text>

            {/* 90° Través BB e EB */}
            <rect x="14" y="330" width="120" height="26" rx="3" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="1.5" />
            <text x="74" y="348" textAnchor="middle" fill="#0b3a55" fontSize="12.5">90° TRAVÉS BB</text>

            <rect x="466" y="330" width="120" height="26" rx="3" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="1.5" />
            <text x="526" y="348" textAnchor="middle" fill="#0b3a55" fontSize="12.5">90° TRAVÉS EB</text>

            {/* Ângulo crítico 22,5° (entre 90° e 112,5°) */}
            <rect x="108" y="394" width="60" height="24" rx="3" fill="#0b3a55" />
            <text x="138" y="411" textAnchor="middle" fill="#faf7f0" fontSize="13">22,5°</text>

            <rect x="432" y="394" width="60" height="24" rx="3" fill="#0b3a55" />
            <text x="462" y="411" textAnchor="middle" fill="#faf7f0" fontSize="13">22,5°</text>

            {/* Limite 112,5° da Proa */}
            <rect x="14" y="478" width="128" height="24" rx="3" fill="#fcfbf8" stroke="#b45309" strokeWidth="1.5" />
            <text x="78" y="495" textAnchor="middle" fill="#92400e" fontSize="12">112,5° DA PROA</text>

            <rect x="458" y="478" width="128" height="24" rx="3" fill="#fcfbf8" stroke="#b45309" strokeWidth="1.5" />
            <text x="522" y="495" textAnchor="middle" fill="#92400e" fontSize="12">112,5° DA PROA</text>

            {/* 67,5° de cada bordo da Popa */}
            <rect x="168" y="514" width="62" height="24" rx="3" fill="#fcfbf8" fillOpacity="0.92" stroke="#b45309" strokeWidth="1.2" />
            <text x="199" y="531" textAnchor="middle" fill="#92400e" fontSize="13">67,5°</text>

            <rect x="370" y="514" width="62" height="24" rx="3" fill="#fcfbf8" fillOpacity="0.92" stroke="#b45309" strokeWidth="1.2" />
            <text x="401" y="531" textAnchor="middle" fill="#92400e" fontSize="13">67,5°</text>

            {/* Setor 135° + 180° Popa */}
            <rect x="128" y="652" width="344" height="32" rx="3" fill="#0b3a55" stroke="#ca9e1c" strokeWidth="1.5" />
            <text x="300" y="673" textAnchor="middle" fill="#faf7f0" fontSize="13">135° · &gt; 22,5° RÉ DO TRAVÉS (POPA 180°)</text>
          </g>
        )}
      </svg>

      {/* Clean Unboxed Caption Strip - NO LABELS on the SVG, simple clean card banner */}
      <div className="px-3.5 py-1.5 bg-[#fcfbf8]/95 border-t border-[#d7d0c1] flex items-center justify-between text-[11px] text-[#4f6e82] font-medium gap-2 flex-wrap">
        <span>
          Destaque: <strong className="text-[#0b3a55]">{config.badgeLabel}</strong>
        </span>
        <span className="font-mono-naut text-[10px] text-[#9a7413] uppercase tracking-wider">{config.badgeSide}</span>
      </div>
    </div>
  );
};
