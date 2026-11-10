import React, { useState } from 'react';
import { Ship, Compass, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { speakNauticalTerm, stopSpeaking } from '../utils/speech';

export type BoatPartId =
  | 'proa'
  | 'popa'
  | 'eb'
  | 'bb'
  | 'amura-eb'
  | 'amura-bb'
  | 'traves-eb'
  | 'traves-bb'
  | 'alheta-eb'
  | 'alheta-bb'
  | 'meia-nau'
  | 'meio-navio';

interface BoatPartInfo {
  id: BoatPartId;
  name: string;
  abbreviation?: string;
  side: 'eb' | 'bb' | 'centro' | 'extremidade';
  colorType: 'verde' | 'vermelha' | 'amarela' | 'branca';
  colorHex: string;
  glowHex: string;
  location: string;
  definition: string;
  examRule: string;
  nightLight: string;
}

const BOAT_PARTS: Record<BoatPartId, BoatPartInfo> = {
  'eb': {
    id: 'eb',
    name: 'Estibordo',
    abbreviation: 'EB',
    side: 'eb',
    colorType: 'verde',
    colorHex: '#16a34a',
    glowHex: '#22c55e',
    location: 'Bordo Direito da Embarcação (Sempre Verde)',
    definition: 'O bordo ou lado direito da embarcação quando o observador está voltado para a proa.',
    examRule: 'Regra RIPAM: Em rumos cruzados de embarcações a motor, quem avistar outra embarcação pelo seu lado de Estibordo DEVE ceder a passagem!',
    nightLight: 'Luz Verde contínua de navegação (cobre da proa até para a ré do través de EB).',
  },
  'bb': {
    id: 'bb',
    name: 'Bombordo',
    abbreviation: 'BB',
    side: 'bb',
    colorType: 'vermelha',
    colorHex: '#dc2626',
    glowHex: '#ef4444',
    location: 'Bordo Esquerdo da Embarcação (Sempre Vermelho)',
    definition: 'O bordo ou lado esquerdo da embarcação quando o observador está voltado para a proa.',
    examRule: 'Mnemónica DGRM: "Bom-boR-do" tem R de veRmelho. Ao entrar num canal ou porto em Portugal (IALA Região A), as marcas laterais vermelhas ficam a Bombordo!',
    nightLight: 'Luz Vermelha contínua de navegação (cobre da proa até para a ré do través de BB).',
  },
  'amura-eb': {
    id: 'amura-eb',
    name: 'Amura de Estibordo',
    abbreviation: 'Amura EB',
    side: 'eb',
    colorType: 'verde',
    colorHex: '#16a34a',
    glowHex: '#22c55e',
    location: 'Costado de Vante a Estibordo (à Proa)',
    definition: 'Parte curva das obras mortas do costado, à proa, pelo bordo de estibordo, onde o casco começa a afilar em direção à roda de proa.',
    examRule: 'Embarcação à vela que recebe o vento pela amura de estibordo tem prioridade sobre a que recebe o vento por bombordo ("amurado por estibordo").',
    nightLight: 'Setor iluminado pela luz verde de navegação de estibordo.',
  },
  'amura-bb': {
    id: 'amura-bb',
    name: 'Amura de Bombordo',
    abbreviation: 'Amura BB',
    side: 'bb',
    colorType: 'vermelha',
    colorHex: '#dc2626',
    glowHex: '#ef4444',
    location: 'Costado de Vante a Bombordo (à Proa)',
    definition: 'Parte curva das obras mortas do costado, à proa, pelo bordo de bombordo, onde o casco começa a afilar em direção à roda de proa.',
    examRule: 'Em navegação com mar agitado, governar reduzindo a velocidade e recebendo as vagas pela amura de modo a aproar com segurança sem alagar a proa.',
    nightLight: 'Setor iluminado pela luz vermelha de navegação de bombordo.',
  },
  'traves-eb': {
    id: 'traves-eb',
    name: 'Través de Estibordo',
    abbreviation: 'Través EB',
    side: 'eb',
    colorType: 'verde',
    colorHex: '#16a34a',
    glowHex: '#22c55e',
    location: 'Região Média Lateral a Estibordo (Meio-Navio)',
    definition: 'Direção perpendicular à linha média longitudinal (plano diametral) pelo bordo de estibordo, abrangendo a região central do costado.',
    examRule: 'A luz de navegação verde de estibordo é visível desde a proa até para a ré do Través de Estibordo.',
    nightLight: 'Linha perpendicular de estibordo; setor da luz verde ultrapassa esta linha em direção à ré.',
  },
  'traves-bb': {
    id: 'traves-bb',
    name: 'Través de Bombordo',
    abbreviation: 'Través BB',
    side: 'bb',
    colorType: 'vermelha',
    colorHex: '#dc2626',
    glowHex: '#ef4444',
    location: 'Região Média Lateral a Bombordo (Meio-Navio)',
    definition: 'Direção perpendicular à linha média longitudinal (plano diametral) pelo bordo de bombordo, abrangendo a região central do costado.',
    examRule: 'A luz de navegação vermelha de bombordo é visível desde a proa até para a ré do Través de Bombordo.',
    nightLight: 'Linha perpendicular de bombordo; setor da luz vermelha ultrapassa esta linha em direção à ré.',
  },
  'alheta-eb': {
    id: 'alheta-eb',
    name: 'Alheta de Estibordo',
    abbreviation: 'Alheta EB',
    side: 'eb',
    colorType: 'verde',
    colorHex: '#16a34a',
    glowHex: '#22c55e',
    location: 'Costado de Ré a Estibordo (à Popa)',
    definition: 'Zona do canto curvo da carena e costado junto ao painel de popa, pelo bordo de estibordo.',
    examRule: 'Regra 13 RIPAM (Embarcação que Alcança): Qualquer embarcação que venha pelo setor da alheta ou popa de outra é considerada embarcação que alcança e DEVE desviar-se.',
    nightLight: 'Transição entre a luz verde de estibordo e a luz branca de alcance de popa.',
  },
  'alheta-bb': {
    id: 'alheta-bb',
    name: 'Alheta de Bombordo',
    abbreviation: 'Alheta BB',
    side: 'bb',
    colorType: 'vermelha',
    colorHex: '#dc2626',
    glowHex: '#ef4444',
    location: 'Costado de Ré a Bombordo (à Popa)',
    definition: 'Zona do canto curvo da carena e costado junto ao painel de popa, pelo bordo de bombordo.',
    examRule: 'Embarcação que se aproxima pela alheta de bombordo avista a luz branca de alcance de popa e não a luz vermelha de bordo.',
    nightLight: 'Transição entre a luz vermelha de bombordo e a luz branca de alcance de popa.',
  },
  'meia-nau': {
    id: 'meia-nau',
    name: 'Meia-Nau',
    abbreviation: 'Plano Diametral',
    side: 'centro',
    colorType: 'amarela',
    colorHex: '#eab308',
    glowHex: '#fde047',
    location: 'Plano Longitudinal Médio (Proa a Popa)',
    definition: 'Plano longitudinal vertical que passa pela Proa e pela Popa, dividindo o navio em duas regiões simétricas que se denominam Bordos (Bombordo e Estibordo).',
    examRule: 'Comando de governo "Leme a Meia-Nau": alinhar a pá do leme no centro exato com a linha longitudinal (sem guinada).',
    nightLight: 'Linha média central onde se situam a luz de tope e a luz de alcance.',
  },
  'meio-navio': {
    id: 'meio-navio',
    name: 'Meio-Navio',
    abbreviation: 'Secção Transversal Média',
    side: 'centro',
    colorType: 'amarela',
    colorHex: '#d97706',
    glowHex: '#fbbf24',
    location: 'Secção a Meio Comprimento (Meia Distância L/2)',
    definition: 'Região que fica situada a meia distância entre a proa e a popa. Secção transversal média onde se medem as dimensões principais do navio.',
    examRule: 'É ao Meio-Navio que se afere a Boca Máxima (largura do barco), o Calado Médio e o Bordo Livre.',
    nightLight: 'Linha divisória média entre a metade de vante (proa) e a metade de ré (popa).',
  },
  'proa': {
    id: 'proa',
    name: 'Proa (Vante)',
    abbreviation: 'Vante',
    side: 'extremidade',
    colorType: 'branca',
    colorHex: '#f8fafc',
    glowHex: '#ffffff',
    location: 'Extremidade Anterior da Embarcação (Vante - Sempre Branco)',
    definition: 'Parte anterior da embarcação que corta as águas, terminando na roda de proa.',
    examRule: 'Em situação de colisão Proa com Proa (Roda a Roda, Regra 14 RIPAM), ambas as embarcações a motor DEVEM guinar para estibordo.',
    nightLight: 'Luz de mastro/tope branca para embarcações de propulsão mecânica.',
  },
  'popa': {
    id: 'popa',
    name: 'Popa (Ré)',
    abbreviation: 'Ré',
    side: 'extremidade',
    colorType: 'branca',
    colorHex: '#f8fafc',
    glowHex: '#ffffff',
    location: 'Extremidade Posterior da Embarcação (Ré - Sempre Branco)',
    definition: 'Parte posterior ou traseira da embarcação, onde geralmente se situam o painel de popa, o leme e o motor.',
    examRule: 'Local onde se iça o Pavilhão Nacional (Bandeira Portuguesa) a navegar e no porto.',
    nightLight: 'Luz de Alcance de cor Branca contínua dirigida para a ré.',
  },
};

export const BoatAnatomyGuide: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<BoatPartId | null>('eb');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentInfo = selectedPart ? BOAT_PARTS[selectedPart] : null;

  const handleSelectPart = (id: BoatPartId, e?: React.MouseEvent) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    setSelectedPart(id);
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

  const isLit = (part: BoatPartId) => selectedPart === part;

  return (
    <div className="space-y-6">
      {/* Museum Exhibit Card */}
      <div className="rounded-3xl border border-[#ded5c2] bg-[#fdfcf9] p-6 sm:p-8 shadow-sm">
        
        {/* Header */}
        <div className="mb-4 pb-4 border-b border-[#e5decb]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a16207]">
            <Ship className="w-4 h-4 text-[#a16207]" />
            <span>Guia Náutico Interativo</span>
          </div>
          <h3 className="font-maritime text-2xl sm:text-3xl font-bold text-[#112338] mt-1">
            Partes e Regiões da Embarcação
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] mt-1">
            Manual do Marinheiro DGRM. Toque nas diferentes partes ou rótulos da embarcação para explorar cada região.
          </p>
        </div>

        {/* Vessel Interactive Canvas with Light Sea Blue Ocean & Hydrodynamic White Vessel */}
        <div
          onClick={() => setSelectedPart(null)}
          className="relative mx-auto max-w-xl rounded-3xl bg-gradient-to-b from-[#e0f2fe] via-[#d7effe] to-[#bae6fd] p-0 border-2 border-[#7dd3fc] shadow-xl overflow-hidden cursor-pointer"
          title="Toque no mar para desmarcar a seleção"
        >
          
          <svg
            viewBox="0 0 600 740"
            className="w-full h-auto max-h-[640px] mx-auto select-none block drop-shadow-sm"
          >
            <defs>
              {/* CSS Animation Keyframes for Living Sea Waves */}
              <style>{`
                @keyframes seaDriftA {
                  0% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
                  50% { transform: translateY(-9px) translateX(6px); opacity: 0.95; }
                  100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
                }
                @keyframes seaDriftB {
                  0% { transform: translateY(0px) translateX(0px); opacity: 0.55; }
                  50% { transform: translateY(8px) translateX(-7px); opacity: 0.9; }
                  100% { transform: translateY(0px) translateX(0px); opacity: 0.55; }
                }
                @keyframes seaDriftC {
                  0% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
                  50% { transform: translateY(-7px) translateX(-5px); opacity: 0.85; }
                  100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
                }
                @keyframes bowWavePulse {
                  0% { transform: scale(0.98); opacity: 0.55; }
                  50% { transform: scale(1.03); opacity: 0.9; }
                  100% { transform: scale(0.98); opacity: 0.55; }
                }
                .sea-wave-a {
                  animation: seaDriftA 5.5s ease-in-out infinite;
                }
                .sea-wave-b {
                  animation: seaDriftB 6.5s ease-in-out infinite;
                }
                .sea-wave-c {
                  animation: seaDriftC 6s ease-in-out infinite;
                }
                .bow-wave {
                  transform-origin: 300px 115px;
                  animation: bowWavePulse 3.5s ease-in-out infinite;
                }
              `}</style>

              {/* Sea Water Gradient Background */}
              <linearGradient id="sea-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="50%" stopColor="#d5effe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>

              {/* Robust Glow Filters using userSpaceOnUse so horizontal/vertical lines never collapse into black artifacts */}
              <filter id="glow-green-sm" filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-red-sm" filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-yellow-sm" filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-white-sm" filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="740">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Drop Shadow for the White Vessel on Blue Water */}
              <filter id="boat-water-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0284c7" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Sea Background Rectangle - Single frame, clicking deselects */}
            <rect
              width="600"
              height="740"
              fill="url(#sea-bg)"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPart(null);
              }}
            />

            {/* ================= ANIMATED SEA WAVES (VAGAS DO MAR) ================= */}
            {/* Wave Layer A: Crisp Undulations */}
            <g className="sea-wave-a pointer-events-none">
              <path
                d="M 45 95 C 85 85, 125 105, 165 95"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 435 95 C 475 85, 515 105, 555 95"
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

            {/* Wave Layer B: Deep Oceanic Swells */}
            <g className="sea-wave-b pointer-events-none">
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

            {/* Wave Layer C: Gentle Marine Ripples */}
            <g className="sea-wave-c pointer-events-none">
              <path
                d="M 70 330 C 105 320, 140 335, 170 325 M 430 330 C 460 320, 495 335, 530 325"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M 50 440 C 90 450, 125 435, 165 445 M 435 440 C 475 450, 510 435, 550 445"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 85 570 C 120 560, 155 575, 190 565 M 410 570 C 445 560, 480 575, 515 565"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M 170 720 C 230 710, 300 725, 360 715 C 400 710, 430 720, 460 715"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* Subtle Bow Wake */}
            <g className="bow-wave pointer-events-none">
              <path
                d="M 280 140 C 230 175, 170 225, 120 285"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M 320 140 C 370 175, 430 225, 480 285"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeLinecap="round"
                opacity="0.7"
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
              opacity="0.5"
              className="pointer-events-none"
            />

            {/* Assembly grouping all boat paths, borders, axes, and labels (prevents sea deselect) */}
            <g id="boat-vessel-assembly" onClick={(e) => e.stopPropagation()}>
              {/* ================= PERFECT HYDRODYNAMIC WHITE HULL ================= */}
            {/* Seamless, continuous C1 curve for the white hull */}
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
              filter="url(#boat-water-shadow)"
            />

            {/* Clean Inner Deck (Off-white / Soft Silver) */}
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

            {/* Minimalist Deck Line Accent */}
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

            {/* ================= INDIVIDUAL BORDER SEGMENTS (SEPARATE COLORS) ================= */}

            {/* --- ESTIBORDO (RIGHT RIM) - ALWAYS GREEN --- */}
            {/* 1. Amura EB Border Segment (Y: 115 to 260) */}
            <path
              d="M 300 115 C 345 155, 385 205, 408 260"
              fill="none"
              stroke={isLit('amura-eb') || isLit('eb') ? '#15803d' : '#16a34a'}
              strokeWidth={isLit('amura-eb') || isLit('eb') ? '8' : '3.5'}
              strokeLinecap="round"
              filter={isLit('amura-eb') || isLit('eb') ? 'url(#glow-green-sm)' : undefined}
              className="transition-all duration-200 cursor-pointer"
              onClick={() => handleSelectPart('amura-eb')}
            />

            {/* 2. Través EB Border Segment (Broadened, Y: 260 to 480) */}
            <path
              d="M 408 260 C 420 315, 420 425, 408 480"
              fill="none"
              stroke={isLit('traves-eb') || isLit('eb') ? '#15803d' : '#16a34a'}
              strokeWidth={isLit('traves-eb') || isLit('eb') ? '8' : '3.5'}
              strokeLinecap="round"
              filter={isLit('traves-eb') || isLit('eb') ? 'url(#glow-green-sm)' : undefined}
              className="transition-all duration-200 cursor-pointer"
              onClick={() => handleSelectPart('traves-eb')}
            />

            {/* 3. Alheta EB Border Segment (Y: 480 to 625) */}
            <path
              d="M 408 480 C 398 535, 385 585, 370 625"
              fill="none"
              stroke={isLit('alheta-eb') || isLit('eb') ? '#15803d' : '#16a34a'}
              strokeWidth={isLit('alheta-eb') || isLit('eb') ? '8' : '3.5'}
              strokeLinecap="round"
              filter={isLit('alheta-eb') || isLit('eb') ? 'url(#glow-green-sm)' : undefined}
              className="transition-all duration-200 cursor-pointer"
              onClick={() => handleSelectPart('alheta-eb')}
            />

            {/* --- BOMBORDO (LEFT RIM) - ALWAYS RED --- */}
            {/* 4. Amura BB Border Segment (Y: 115 to 260) */}
            <path
              d="M 300 115 C 255 155, 215 205, 192 260"
              fill="none"
              stroke={isLit('amura-bb') || isLit('bb') ? '#dc2626' : '#b91c1c'}
              strokeWidth={isLit('amura-bb') || isLit('bb') ? '8' : '3.5'}
              strokeLinecap="round"
              filter={isLit('amura-bb') || isLit('bb') ? 'url(#glow-red-sm)' : undefined}
              className="transition-all duration-200 cursor-pointer"
              onClick={() => handleSelectPart('amura-bb')}
            />

            {/* 5. Través BB Border Segment (Broadened, Y: 260 to 480) */}
            <path
              d="M 192 260 C 180 315, 180 425, 192 480"
              fill="none"
              stroke={isLit('traves-bb') || isLit('bb') ? '#dc2626' : '#b91c1c'}
              strokeWidth={isLit('traves-bb') || isLit('bb') ? '8' : '3.5'}
              strokeLinecap="round"
              filter={isLit('traves-bb') || isLit('bb') ? 'url(#glow-red-sm)' : undefined}
              className="transition-all duration-200 cursor-pointer"
              onClick={() => handleSelectPart('traves-bb')}
            />

            {/* 6. Alheta BB Border Segment (Y: 480 to 625) */}
            <path
              d="M 192 480 C 202 535, 215 585, 230 625"
              fill="none"
              stroke={isLit('alheta-bb') || isLit('bb') ? '#dc2626' : '#b91c1c'}
              strokeWidth={isLit('alheta-bb') || isLit('bb') ? '8' : '3.5'}
              strokeLinecap="round"
              filter={isLit('alheta-bb') || isLit('bb') ? 'url(#glow-red-sm)' : undefined}
              className="transition-all duration-200 cursor-pointer"
              onClick={() => handleSelectPart('alheta-bb')}
            />

            {/* --- POPA (TRANSOM) - ALWAYS WHITE WITH CRISP BLACK CONTOUR WHEN ACTIVE --- */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('popa')}
            >
              {/* Thin black contour outline when active (matching Proa's style) */}
              {isLit('popa') && (
                <path
                  d="M 229 625 C 275 627, 325 627, 371 625"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
              )}
              {/* Main Popa Transom stroke in pure brilliant WHITE */}
              <path
                d="M 230 625 C 275 627, 325 627, 370 625"
                fill="none"
                stroke={isLit('popa') ? '#ffffff' : '#64748b'}
                strokeWidth={isLit('popa') ? '8' : '4'}
                strokeLinecap="round"
                filter={isLit('popa') ? 'url(#glow-white-sm)' : undefined}
                className="transition-all duration-200"
              />
              {/* Popa center marker */}
              <circle
                cx="300"
                cy="626"
                r={isLit('popa') ? '6.5' : '4.5'}
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
            </g>

            {/* --- PROA (BOW STEM APEX) - ALWAYS WHITE WITH CRISP BLACK CONTOUR WHEN ACTIVE --- */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('proa')}
            >
              {/* Thin black contour outline when active */}
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
              {/* Main Proa V-stroke in pure brilliant WHITE */}
              <path
                d="M 288 126 L 300 115 L 312 126"
                fill="none"
                stroke={isLit('proa') ? '#ffffff' : '#475569'}
                strokeWidth={isLit('proa') ? '8' : '4'}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={isLit('proa') ? 'url(#glow-white-sm)' : undefined}
                className="transition-all duration-200"
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

            {/* ================= MEIA-NAU (EXACT SAME THICKNESS 8 AND MATCHING HALO AS BORDERS) ================= */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('meia-nau')}
            >
              {/* Main Meia-Nau Line (matching border thickness 8 and identical glow spread) */}
              <line
                x1="300"
                y1="85"
                x2="300"
                y2="645"
                stroke={isLit('meia-nau') ? '#f59e0b' : '#d97706'}
                strokeWidth={isLit('meia-nau') ? '8' : '2.5'}
                strokeDasharray={isLit('meia-nau') ? 'none' : '8 5'}
                strokeLinecap="round"
                filter={isLit('meia-nau') ? 'url(#glow-yellow-sm)' : undefined}
                className="transition-all duration-200"
              />

              {/* Wide click target */}
              <line x1="300" y1="85" x2="300" y2="645" stroke="transparent" strokeWidth="40" />

              {/* Anchor nodes */}
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

            {/* ================= MEIO-NAVIO (EXACT SAME THICKNESS 8 AND MATCHING HALO AS BORDERS) ================= */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('meio-navio')}
            >
              {/* Main Meio-Navio Line (matching border thickness 8 and identical glow spread) */}
              <line
                x1="110"
                y1="370"
                x2="490"
                y2="370"
                stroke={isLit('meio-navio') ? '#d97706' : '#b45309'}
                strokeWidth={isLit('meio-navio') ? '8' : '2.5'}
                strokeDasharray={isLit('meio-navio') ? 'none' : '8 5'}
                strokeLinecap="round"
                filter={isLit('meio-navio') ? 'url(#glow-yellow-sm)' : undefined}
                className="transition-all duration-200"
              />

              {/* Wide click target */}
              <line x1="110" y1="370" x2="490" y2="370" stroke="transparent" strokeWidth="40" />
            </g>

            {/* Intersection Hub of Axes */}
            <circle
              cx="300"
              cy="370"
              r={isLit('meia-nau') || isLit('meio-navio') ? '11' : '7'}
              fill={isLit('meia-nau') || isLit('meio-navio') ? '#f59e0b' : '#d97706'}
              stroke="#ffffff"
              strokeWidth="2"
              filter={isLit('meia-nau') || isLit('meio-navio') ? 'url(#glow-yellow-sm)' : undefined}
              className="cursor-pointer transition-all"
              onClick={() => handleSelectPart('meia-nau')}
            />

            {/* ================= LIGHT-GREY SCHEME LABELS (ELEGANT & CLEAN) ================= */}

            {/* 1. PROA (Vante) - Positioned at top (Y: 52 to 80) */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('proa')}
            >
              <rect
                x="235"
                y="52"
                width="130"
                height="28"
                rx="6"
                fill={isLit('proa') ? '#ffffff' : '#f1f5f9'}
                stroke={isLit('proa') ? '#0f172a' : '#94a3b8'}
                strokeWidth={isLit('proa') ? '2' : '1.5'}
                filter={isLit('proa') ? 'url(#glow-white-sm)' : undefined}
              />
              <text
                x="300"
                y="70"
                fill="#0f172a"
                fontSize="10.5"
                fontWeight="bold"
                textAnchor="middle"
              >
                PROA (Vante)
              </text>
            </g>

            {/* 2. POPA (Ré) - Positioned at bottom (Y: 654 to 682, text at 672) */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('popa')}
            >
              <rect
                x="235"
                y="654"
                width="130"
                height="28"
                rx="6"
                fill={isLit('popa') ? '#ffffff' : '#f1f5f9'}
                stroke={isLit('popa') ? '#0f172a' : '#94a3b8'}
                strokeWidth={isLit('popa') ? '2' : '1.5'}
                filter={isLit('popa') ? 'url(#glow-white-sm)' : undefined}
              />
              <text
                x="300"
                y="672"
                fill="#0f172a"
                fontSize="10.5"
                fontWeight="bold"
                textAnchor="middle"
              >
                POPA (Ré)
              </text>
            </g>

            {/* 3. AMURA EB */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('amura-eb')}
            >
              <circle
                cx="375"
                cy="195"
                r={isLit('amura-eb') ? '10' : '6.5'}
                fill="#16a34a"
                stroke="#ffffff"
                strokeWidth="2"
                filter={isLit('amura-eb') ? 'url(#glow-green-sm)' : undefined}
              />
              <line x1="375" y1="195" x2="445" y2="175" stroke="#16a34a" strokeWidth="1.5" />
              <rect
                x="440"
                y="160"
                width="125"
                height="28"
                rx="6"
                fill={isLit('amura-eb') ? '#15803d' : '#f1f5f9'}
                stroke={isLit('amura-eb') ? '#16a34a' : '#86efac'}
                strokeWidth={isLit('amura-eb') ? '2' : '1.5'}
                filter={isLit('amura-eb') ? 'url(#glow-green-sm)' : undefined}
              />
              <text
                x="502"
                y="178"
                fill={isLit('amura-eb') ? '#ffffff' : '#166534'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                AMURA EB
              </text>
            </g>

            {/* 4. TRAVÉS EB */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('traves-eb')}
            >
              <circle
                cx="420"
                cy="370"
                r={isLit('traves-eb') ? '10' : '6.5'}
                fill="#16a34a"
                stroke="#ffffff"
                strokeWidth="2"
                filter={isLit('traves-eb') ? 'url(#glow-green-sm)' : undefined}
              />
              <line x1="420" y1="370" x2="455" y2="370" stroke="#16a34a" strokeWidth="2" />
              <rect
                x="450"
                y="356"
                width="125"
                height="28"
                rx="6"
                fill={isLit('traves-eb') ? '#15803d' : '#f1f5f9'}
                stroke={isLit('traves-eb') ? '#16a34a' : '#86efac'}
                strokeWidth={isLit('traves-eb') ? '2' : '1.5'}
                filter={isLit('traves-eb') ? 'url(#glow-green-sm)' : undefined}
              />
              <text
                x="512"
                y="374"
                fill={isLit('traves-eb') ? '#ffffff' : '#166534'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                TRAVÉS EB
              </text>
            </g>

            {/* 5. ALHETA EB */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('alheta-eb')}
            >
              <circle
                cx="395"
                cy="545"
                r={isLit('alheta-eb') ? '10' : '6.5'}
                fill="#16a34a"
                stroke="#ffffff"
                strokeWidth="2"
                filter={isLit('alheta-eb') ? 'url(#glow-green-sm)' : undefined}
              />
              <line x1="395" y1="545" x2="445" y2="565" stroke="#16a34a" strokeWidth="1.5" />
              <rect
                x="440"
                y="550"
                width="125"
                height="28"
                rx="6"
                fill={isLit('alheta-eb') ? '#15803d' : '#f1f5f9'}
                stroke={isLit('alheta-eb') ? '#16a34a' : '#86efac'}
                strokeWidth={isLit('alheta-eb') ? '2' : '1.5'}
                filter={isLit('alheta-eb') ? 'url(#glow-green-sm)' : undefined}
              />
              <text
                x="502"
                y="568"
                fill={isLit('alheta-eb') ? '#ffffff' : '#166534'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                ALHETA EB
              </text>
            </g>

            {/* 6. AMURA BB */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('amura-bb')}
            >
              <circle
                cx="225"
                cy="195"
                r={isLit('amura-bb') ? '10' : '6.5'}
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
                filter={isLit('amura-bb') ? 'url(#glow-red-sm)' : undefined}
              />
              <line x1="225" y1="195" x2="155" y2="175" stroke="#dc2626" strokeWidth="1.5" />
              <rect
                x="35"
                y="160"
                width="125"
                height="28"
                rx="6"
                fill={isLit('amura-bb') ? '#b91c1c' : '#f1f5f9'}
                stroke={isLit('amura-bb') ? '#dc2626' : '#fca5a5'}
                strokeWidth={isLit('amura-bb') ? '2' : '1.5'}
                filter={isLit('amura-bb') ? 'url(#glow-red-sm)' : undefined}
              />
              <text
                x="97"
                y="178"
                fill={isLit('amura-bb') ? '#ffffff' : '#991b1b'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                AMURA BB
              </text>
            </g>

            {/* 7. TRAVÉS BB */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('traves-bb')}
            >
              <circle
                cx="180"
                cy="370"
                r={isLit('traves-bb') ? '10' : '6.5'}
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
                filter={isLit('traves-bb') ? 'url(#glow-red-sm)' : undefined}
              />
              <line x1="180" y1="370" x2="145" y2="370" stroke="#dc2626" strokeWidth="2" />
              <rect
                x="25"
                y="356"
                width="125"
                height="28"
                rx="6"
                fill={isLit('traves-bb') ? '#b91c1c' : '#f1f5f9'}
                stroke={isLit('traves-bb') ? '#dc2626' : '#fca5a5'}
                strokeWidth={isLit('traves-bb') ? '2' : '1.5'}
                filter={isLit('traves-bb') ? 'url(#glow-red-sm)' : undefined}
              />
              <text
                x="87"
                y="374"
                fill={isLit('traves-bb') ? '#ffffff' : '#991b1b'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                TRAVÉS BB
              </text>
            </g>

            {/* 8. ALHETA BB */}
            <g
              className="cursor-pointer group"
              onClick={() => handleSelectPart('alheta-bb')}
            >
              <circle
                cx="205"
                cy="545"
                r={isLit('alheta-bb') ? '10' : '6.5'}
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
                filter={isLit('alheta-bb') ? 'url(#glow-red-sm)' : undefined}
              />
              <line x1="205" y1="545" x2="155" y2="565" stroke="#dc2626" strokeWidth="1.5" />
              <rect
                x="35"
                y="550"
                width="125"
                height="28"
                rx="6"
                fill={isLit('alheta-bb') ? '#b91c1c' : '#f1f5f9'}
                stroke={isLit('alheta-bb') ? '#dc2626' : '#fca5a5'}
                strokeWidth={isLit('alheta-bb') ? '2' : '1.5'}
                filter={isLit('alheta-bb') ? 'url(#glow-red-sm)' : undefined}
              />
              <text
                x="97"
                y="568"
                fill={isLit('alheta-bb') ? '#ffffff' : '#991b1b'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                ALHETA BB
              </text>
            </g>

            {/* 9. MEIA-NAU CALLOUT */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('meia-nau')}
            >
              <rect
                x="235"
                y="245"
                width="130"
                height="26"
                rx="6"
                fill={isLit('meia-nau') ? '#f59e0b' : '#f1f5f9'}
                stroke={isLit('meia-nau') ? '#d97706' : '#fde047'}
                strokeWidth={isLit('meia-nau') ? '2' : '1.5'}
                filter={isLit('meia-nau') ? 'url(#glow-yellow-sm)' : undefined}
              />
              <text
                x="300"
                y="262"
                fill={isLit('meia-nau') ? '#ffffff' : '#854d0e'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                MEIA-NAU
              </text>
            </g>

            {/* 10. MEIO-NAVIO CALLOUT */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('meio-navio')}
            >
              <rect
                x="240"
                y="395"
                width="120"
                height="26"
                rx="6"
                fill={isLit('meio-navio') ? '#d97706' : '#f1f5f9'}
                stroke={isLit('meio-navio') ? '#b45309' : '#fde047'}
                strokeWidth={isLit('meio-navio') ? '2' : '1.5'}
                filter={isLit('meio-navio') ? 'url(#glow-yellow-sm)' : undefined}
              />
              <text
                x="300"
                y="412"
                fill={isLit('meio-navio') ? '#ffffff' : '#854d0e'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                MEIO-NAVIO
              </text>
            </g>

            {/* 11. BORDO ESTIBORDO GERAL TAG */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('eb')}
            >
              <rect
                x="410"
                y="450"
                width="135"
                height="28"
                rx="6"
                fill={isLit('eb') ? '#15803d' : '#f1f5f9'}
                stroke={isLit('eb') ? '#16a34a' : '#86efac'}
                strokeWidth={isLit('eb') ? '2' : '1.5'}
                filter={isLit('eb') ? 'url(#glow-green-sm)' : undefined}
              />
              <text
                x="477"
                y="468"
                fill={isLit('eb') ? '#ffffff' : '#166534'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                ESTIBORDO (EB)
              </text>
            </g>

            {/* 12. BORDO BOMBORDO GERAL TAG */}
            <g
              className="cursor-pointer"
              onClick={() => handleSelectPart('bb')}
            >
              <rect
                x="55"
                y="450"
                width="135"
                height="28"
                rx="6"
                fill={isLit('bb') ? '#b91c1c' : '#f1f5f9'}
                stroke={isLit('bb') ? '#dc2626' : '#fca5a5'}
                strokeWidth={isLit('bb') ? '2' : '1.5'}
                filter={isLit('bb') ? 'url(#glow-red-sm)' : undefined}
              />
              <text
                x="122"
                y="468"
                fill={isLit('bb') ? '#ffffff' : '#991b1b'}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                BOMBORDO (BB)
              </text>
            </g>
          </g>
        </svg>
      </div>

        {/* ================= EXHIBIT DETAIL PLAQUE ================= */}
        <div className="mt-6 rounded-3xl bg-white p-6 sm:p-7 border-2 border-[#ded5c2] shadow-md transition-all">
          {currentInfo ? (
            <>
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#e5decb]">
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full shadow-md shrink-0"
                    style={{
                      backgroundColor: currentInfo.colorHex,
                      boxShadow: `0 0 12px ${currentInfo.glowHex}`,
                    }}
                  />
                  <div>
                    <h4 className="font-maritime text-2xl font-bold text-[#112338]">
                      {currentInfo.name}
                    </h4>
                    <div className="text-xs text-[#64748b] font-medium mt-0.5">
                      Região: {currentInfo.location}
                    </div>
                  </div>
                </div>

                {/* Audio Button - Minimalist icon button like glossary */}
                <button
                  onClick={() => handleSpeak(currentInfo.name)}
                  className={`rounded-xl p-2 transition ${
                    isSpeaking
                      ? 'bg-[#112338] text-[#fbf8f2]'
                      : 'text-[#64748b] hover:text-[#112338] hover:bg-[#f4efe4]'
                  }`}
                  title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia do termo'}
                  aria-label="Ouvir termo"
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Definition */}
              <div className="mt-4">
                <p className="text-sm sm:text-base text-[#1e293b] leading-relaxed">
                  {currentInfo.definition}
                </p>
              </div>

              {/* Night light / visual signal */}
              <div className="mt-3.5 flex items-start gap-2.5 p-3 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#334155]">
                <Compass className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0369a1]">Sinalização Noturna & Setor:</strong>{' '}
                  {currentInfo.nightLight}
                </div>
              </div>

              {/* Exam Rule Tip */}
              <div className="mt-3.5 flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#fefce8] border border-[#fef08a] text-xs text-[#854d0e]">
                <AlertCircle className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#92400e]">Regra de Exame DGRM / RIPAM:</strong>{' '}
                  {currentInfo.examRule}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 py-2">
              <div className="w-11 h-11 rounded-2xl bg-[#f4efe4] flex items-center justify-center border border-[#ded5c2] shrink-0">
                <Ship className="w-5 h-5 text-[#a16207]" />
              </div>
              <div>
                <h4 className="font-maritime text-xl font-bold text-[#112338]">
                  Nenhuma Região Selecionada
                </h4>
                <p className="text-xs sm:text-sm text-[#64748b] mt-0.5">
                  Toque numa parte do barco ou nos rótulos para consultar as regras da DGRM e iluminação noturna.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
