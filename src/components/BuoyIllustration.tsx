import React, { useState, useEffect } from 'react';
import { NauticalTerm } from '../types/glossary';
import { AlertCircle, ArrowRight, Compass, Eye, Info, Lightbulb, Moon, Sun, Zap } from 'lucide-react';

export type BuoyCategory = 'cardeais' | 'laterais' | 'outras' | 'todas';

export interface BuoyData {
  id: string;
  name: string;
  category: 'cardeais' | 'laterais' | 'outras';
  bodyType: 'conica' | 'cilindrica' | 'pilar' | 'esferica';
  topmark: string;
  topmarkDescription: string;
  colorPattern: string;
  colorsDescription: string;
  lightColor: 'branco' | 'verde' | 'vermelho' | 'amarelo';
  lightColorHex: string;
  lightRhythm: string;
  lightDescription: string;
  meaning: string;
  examTip: string;
  termId: string; // Links directly to glossary card
  // Rhythm flash sequence in milliseconds [flashDuration, pauseDuration, ...]
  lightTimingPattern: number[];
}

export const BUOYS_DATA: BuoyData[] = [
  // ---------------- MARCAS LATERAIS (REGIÃO A - PÁG. 65) ----------------
  {
    id: 'lateral-bombordo',
    name: 'Marca Lateral de Bombordo (BB)',
    category: 'laterais',
    bodyType: 'cilindrica',
    topmark: 'cilindro',
    topmarkDescription: 'Um cilindro vermelho',
    colorPattern: 'vermelho',
    colorsDescription: 'Totalmente vermelha. Numeração sempre PAR (2, 4, 6...)',
    lightColor: 'vermelho',
    lightColorHex: '#ef4444',
    lightRhythm: 'Fl R (Clarão vermelho)',
    lightDescription: 'Luz vermelha com qualquer ritmo (exceto grupo composto 2+1)',
    meaning: 'Ao entrar num porto, subir um canal ou rio: dê bombordo a estas bóias (deixar a bóia pelo bordo de bombordo / à esquerda da embarcação).',
    examTip: 'Entrada de barra em Portugal (Região A): Bombordo = Boia vermelha, formato cilíndrico, numeração PAR (2, 4, 6...), luz vermelha.',
    termId: 'lateral-bombordo',
    lightTimingPattern: [800, 1200], // 1 flash every 2s
  },
  {
    id: 'lateral-estibordo',
    name: 'Marca Lateral de Estibordo (EB)',
    category: 'laterais',
    bodyType: 'conica',
    topmark: 'cone-cima',
    topmarkDescription: 'Um cone verde com o vértice para cima (▲)',
    colorPattern: 'verde',
    colorsDescription: 'Totalmente verde. Numeração sempre ÍMPAR (1, 3, 5...)',
    lightColor: 'verde',
    lightColorHex: '#22c55e',
    lightRhythm: 'Fl G (Clarão verde)',
    lightDescription: 'Luz verde com qualquer ritmo (exceto grupo composto 2+1)',
    meaning: 'Ao entrar num porto, subir um canal ou rio: dê estibordo a estas bóias (deixar a bóia pelo bordo de estibordo / à direita da embarcação).',
    examTip: 'Entrada de barra em Portugal (Região A): Estibordo = Boia verde, formato cónico, numeração ÍMPAR (1, 3, 5...), luz verde.',
    termId: 'lateral-estibordo',
    lightTimingPattern: [800, 1200],
  },
  {
    id: 'bifurcacao-canal-bombordo',
    name: 'Canal Principal a Bombordo',
    category: 'laterais',
    bodyType: 'cilindrica',
    topmark: 'cilindro',
    topmarkDescription: 'Um cilindro vermelho',
    colorPattern: 'vermelho-faixa-verde',
    colorsDescription: 'Vermelha com uma larga faixa horizontal verde ao meio',
    lightColor: 'vermelho',
    lightColorHex: '#ef4444',
    lightRhythm: 'Fl(2+1) R',
    lightDescription: 'Grupo composto de 2 + 1 clarões vermelhos',
    meaning: 'Bóia de bifurcação de canal. Estas bóias são de preferência, ou seja, podemos dar qualquer dos bordos sendo preferível o Bombordo.',
    examTip: 'Faixa verde ao meio da boia vermelha = canal principal a Bombordo. Ritmo da luz: grupo composto Fl(2+1).',
    termId: 'canal-principal-bombordo',
    lightTimingPattern: [400, 300, 400, 800, 400, 2000],
  },
  {
    id: 'bifurcacao-canal-estibordo',
    name: 'Canal Principal a Estibordo',
    category: 'laterais',
    bodyType: 'conica',
    topmark: 'cone-cima',
    topmarkDescription: 'Um cone verde com vértice para cima (▲)',
    colorPattern: 'verde-faixa-vermelha',
    colorsDescription: 'Verde com uma larga faixa horizontal vermelha ao meio',
    lightColor: 'verde',
    lightColorHex: '#22c55e',
    lightRhythm: 'Fl(2+1) G',
    lightDescription: 'Grupo composto de 2 + 1 clarões verdes',
    meaning: 'Bóia de bifurcação de canal. Estas bóias são de preferência, ou seja, podemos dar qualquer dos bordos sendo preferível o Estibordo.',
    examTip: 'Faixa vermelha ao meio da boia verde = canal principal a Estibordo. Ritmo da luz: grupo composto Fl(2+1).',
    termId: 'canal-principal-estibordo',
    lightTimingPattern: [400, 300, 400, 800, 400, 2000],
  },

  // ---------------- MARCAS CARDEAIS (REGRA DO RELÓGIO - PÁG. 66) ----------------
  {
    id: 'cardeal-norte',
    name: 'Marca Cardeal Norte',
    category: 'cardeais',
    bodyType: 'pilar',
    topmark: 'dois-cones-cima',
    topmarkDescription: 'Dois cones pretos com vértices para CIMA (▲ ▲)',
    colorPattern: 'preto-amarelo',
    colorsDescription: 'Preto acima, Amarelo abaixo (o preto indica para onde apontam os cones)',
    lightColor: 'branco',
    lightColorHex: '#ffffff',
    lightRhythm: 'Q W ou VQ W (Contínua)',
    lightDescription: 'Cintilante contínua rápida branca (sem interrupções)',
    meaning: 'Devemos passar a Norte desta bóia de modo a evitar o perigo situado a Sul.',
    examTip: 'Norte = 12h no relógio (luz rápida contínua). Cones apontam para cima (▲▲), metade superior preta.',
    termId: 'cardeal-norte',
    lightTimingPattern: [200, 200, 200, 200, 200, 200], // continuous fast blinking
  },
  {
    id: 'cardeal-este',
    name: 'Marca Cardeal Este (Leste)',
    category: 'cardeais',
    bodyType: 'pilar',
    topmark: 'dois-cones-bases',
    topmarkDescription: 'Dois cones pretos unidos pelas BASES em losango (▲ ▼)',
    colorPattern: 'preto-amarelo-preto',
    colorsDescription: 'Preto com larga faixa amarela ao meio (apontam para as pontas pretas)',
    lightColor: 'branco',
    lightColorHex: '#ffffff',
    lightRhythm: 'Q(3) W 10s (3 Clarões)',
    lightDescription: 'Grupo de 3 clarões rápidos brancos a cada 10 segundos',
    meaning: 'Devemos passar a Este desta bóia de modo a evitar o perigo situado a Oeste.',
    examTip: 'Este = 3h no relógio = grupo de 3 clarões rápidos. Cones unidos pelas bases (losango).',
    termId: 'cardeal-este',
    lightTimingPattern: [250, 250, 250, 250, 250, 2000], // 3 flashes, pause
  },
  {
    id: 'cardeal-sul',
    name: 'Marca Cardeal Sul',
    category: 'cardeais',
    bodyType: 'pilar',
    topmark: 'dois-cones-baixo',
    topmarkDescription: 'Dois cones pretos com vértices para BAIXO (▼ ▼)',
    colorPattern: 'amarelo-preto',
    colorsDescription: 'Amarelo acima, Preto abaixo (o preto indica para onde apontam os cones)',
    lightColor: 'branco',
    lightColorHex: '#ffffff',
    lightRhythm: 'Q(6) + LFl W 15s',
    lightDescription: '6 clarões rápidos seguidos de 1 clarão longo (>2s) a cada 15s',
    meaning: 'Devemos passar a Sul desta bóia de modo a evitar o perigo situado a Norte.',
    examTip: 'Sul = 6h no relógio = 6 clarões rápidos + 1 clarão longo (para não confundir). Cones para baixo (▼▼).',
    termId: 'cardeal-sul',
    lightTimingPattern: [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 400, 1500, 2000], // 6 fast + 1 long
  },
  {
    id: 'cardeal-oeste',
    name: 'Marca Cardeal Oeste',
    category: 'cardeais',
    bodyType: 'pilar',
    topmark: 'dois-cones-vertices',
    topmarkDescription: 'Dois cones unidos pelos VÉRTICES em ampulheta (▼ ▲)',
    colorPattern: 'amarelo-preto-amarelo',
    colorsDescription: 'Amarelo com larga faixa preta ao meio (cones apontam para o centro preto)',
    lightColor: 'branco',
    lightColorHex: '#ffffff',
    lightRhythm: 'Q(9) W 15s (9 Clarões)',
    lightDescription: 'Grupo de 9 clarões rápidos brancos a cada 15 segundos',
    meaning: 'Devemos passar a Oeste desta bóia de modo a evitar o perigo situado a Este.',
    examTip: 'Oeste = 9h no relógio = grupo de 9 clarões rápidos. Cones em ampulheta (cintura estreita como o W).',
    termId: 'cardeal-oeste',
    lightTimingPattern: [
      250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 2000,
    ], // 9 flashes
  },

  // ---------------- OUTRAS MARCAS (PÁG. 67) ----------------
  {
    id: 'perigo-isolado',
    name: 'Marca de Perigo Isolado',
    category: 'outras',
    bodyType: 'pilar',
    topmark: 'duas-esferas-pretas',
    topmarkDescription: 'Duas esferas pretas no tope (● ●)',
    colorPattern: 'preto-faixas-vermelhas',
    colorsDescription: 'Corpo preto com faixas horizontais vermelhas',
    lightColor: 'branco',
    lightColorHex: '#ffffff',
    lightRhythm: 'Fl(2) W 5s (Grupo de 2 clarões)',
    lightDescription: 'Luz branca em grupo de 2 clarões a cada 5 segundos',
    meaning: 'Destinado a assinalar um perigo isolado com fundos navegáveis em todo o redor.',
    examTip: 'Mnemónica: 2 esferas pretas no tope = grupo de 2 clarões brancos Fl(2). Fundos navegáveis à volta!',
    termId: 'perigo-isolado',
    lightTimingPattern: [400, 400, 400, 2000], // 2 flashes then pause
  },
  {
    id: 'aguas-limpas',
    name: 'Marca de Águas Limpas',
    category: 'outras',
    bodyType: 'esferica',
    topmark: 'uma-esfera-vermelha',
    topmarkDescription: 'Uma esfera vermelha no tope (●)',
    colorPattern: 'listras-verticais-vermelho-branco',
    colorsDescription: 'Faixas verticais alternadas vermelhas e brancas',
    lightColor: 'branco',
    lightColorHex: '#ffffff',
    lightRhythm: 'Iso W / Oc W / Mo(A) W',
    lightDescription: 'Luz branca isofásica, ocultações, 1 clarão longo 10s ou Código Morse "A" (· —)',
    meaning: 'Eixo do canal ou águas navegáveis em todo o redor. Devemos dar sempre bombordo.',
    examTip: 'Eixo do canal: riscas verticais vermelhas/brancas com 1 esfera vermelha. Dar sempre bombordo!',
    termId: 'marcas-de-aguas-limpas',
    lightTimingPattern: [400, 300, 1200, 2000], // Morse A: dot, dash, pause
  },
  {
    id: 'marca-especial',
    name: 'Marca Especial',
    category: 'outras',
    bodyType: 'pilar',
    topmark: 'cruz-x-amarela',
    topmarkDescription: 'Uma cruz amarela em "X"',
    colorPattern: 'amarelo',
    colorsDescription: 'Corpo totalmente amarelo',
    lightColor: 'amarelo',
    lightColorHex: '#eab308',
    lightRhythm: 'Fl Y (Luz amarela)',
    lightDescription: 'Luz amarela se usada, com qualquer ritmo diferente das marcas brancas',
    meaning: 'Não tem por fim ajudar a navegação. Pode indicar zonas de fundear, exercícios militares, zonas de despejos, bóias meteorológicas (ODAS), etc.',
    examTip: 'Marca Especial = Totalmente amarela com tope em "X". Não orienta rumos de navegação.',
    termId: 'marcas-especiais',
    lightTimingPattern: [600, 1400],
  },
];

// Mapping to identify if a termId is a specific buoy
const SPECIFIC_BUOY_MAP: Record<string, string> = {
  'lateral-bombordo': 'lateral-bombordo',
  'lateral-estibordo': 'lateral-estibordo',
  'canal-principal-bombordo': 'bifurcacao-canal-bombordo',
  'canal-principal-estibordo': 'bifurcacao-canal-estibordo',
  'cardeal-norte': 'cardeal-norte',
  'cardeal-este': 'cardeal-este',
  'cardeal-sul': 'cardeal-sul',
  'cardeal-oeste': 'cardeal-oeste',
  'perigo-isolado': 'perigo-isolado',
  'marcas-de-aguas-limpas': 'aguas-limpas',
  'marcas-especiais': 'marca-especial',
};

// Mapping to identify if a termId is a buoy category card
const CATEGORY_BUOY_MAP: Record<string, 'laterais' | 'cardeais' | 'outras' | 'todas'> = {
  'sistema-de-balizagem-iala': 'todas',
  'marcas-laterais': 'laterais',
  'canal-principal': 'laterais',
  'marcas-cardeais': 'cardeais',
};

// Helper component that renders an authentic maritime buoy SVG
export const renderBuoySVG = (buoy: BuoyData, isLightOn = true, scale = 1) => {
  const width = 110 * scale;
  const height = 150 * scale;

  // Colors
  const black = '#0f172a';
  const red = '#dc2626';
  const green = '#15803d';
  const yellow = '#eab308';
  const white = '#f8fafc';
  const grayWater = '#38bdf8';

  // Light glow style
  const glowFilterId = `glow-${buoy.id}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 150"
      className="overflow-visible select-none drop-shadow-sm"
      aria-label={`Boia ${buoy.name}`}
    >
      <defs>
        {/* Glow filter for flashing beacon */}
        <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Vertical stripes pattern for Safe Water */}
        <pattern
          id="safeWaterPattern"
          width="20"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="10" height="100" fill={red} />
          <rect x="10" y="0" width="10" height="100" fill={white} />
        </pattern>
      </defs>

      {/* ---------------- WATERLINE & RIPPLES ---------------- */}
      <g opacity="0.85">
        <ellipse cx="55" cy="138" rx="42" ry="7" fill={grayWater} fillOpacity="0.35" />
        <ellipse cx="55" cy="138" rx="28" ry="4" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="4 2" />
      </g>

      {/* ---------------- BUOY FLOAT / HULL ---------------- */}
      <g>
        {/* Underbody counterweight shadow */}
        <ellipse cx="55" cy="134" rx="26" ry="6" fill="#090d16" fillOpacity="0.4" />

        {/* HULL SHAPES BASED ON COLOR PATTERN */}
        {buoy.colorPattern === 'vermelho' && (
          // Cylindrical / Can hull
          <g>
            <rect x="32" y="90" width="46" height="42" rx="3" fill={red} stroke="#991b1b" strokeWidth="1" />
            <ellipse cx="55" cy="90" rx="23" ry="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
            {/* Numeral label (Even number 2) */}
            <rect x="47" y="103" width="16" height="14" rx="3" fill="#ffffff" fillOpacity="0.2" />
            <text x="55" y="114" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
          </g>
        )}

        {buoy.colorPattern === 'verde' && (
          // Conical hull
          <g>
            <polygon points="55,84 78,132 32,132" fill={green} stroke="#166534" strokeWidth="1" />
            <ellipse cx="55" cy="132" rx="23" ry="5" fill="#14532d" stroke="#166534" strokeWidth="1" />
            {/* Numeral label (Odd number 1) */}
            <rect x="47" y="106" width="16" height="14" rx="3" fill="#ffffff" fillOpacity="0.2" />
            <text x="55" y="117" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
          </g>
        )}

        {buoy.colorPattern === 'vermelho-faixa-verde' && (
          // Bifurcation: Red with broad green horizontal band
          <g>
            <rect x="32" y="90" width="46" height="42" rx="3" fill={red} stroke="#991b1b" strokeWidth="1" />
            <rect x="32" y="103" width="46" height="16" fill={green} stroke="#166534" strokeWidth="1" />
            <ellipse cx="55" cy="90" rx="23" ry="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          </g>
        )}

        {buoy.colorPattern === 'verde-faixa-vermelha' && (
          // Bifurcation: Green with broad red horizontal band
          <g>
            <polygon points="55,84 78,132 32,132" fill={green} stroke="#166534" strokeWidth="1" />
            <polygon points="45,104 65,104 70,118 40,118" fill={red} stroke="#991b1b" strokeWidth="1" />
            <ellipse cx="55" cy="132" rx="23" ry="5" fill="#14532d" stroke="#166534" strokeWidth="1" />
          </g>
        )}

        {buoy.colorPattern === 'preto-amarelo' && (
          // North Cardinal: Black top, Yellow bottom
          <g>
            <polygon points="40,86 70,86 76,132 34,132" fill={yellow} stroke="#ca8a04" strokeWidth="1" />
            <polygon points="40,86 70,86 73,109 37,109" fill={black} stroke="#0f172a" strokeWidth="1" />
            <ellipse cx="55" cy="86" rx="15" ry="4" fill="#334155" />
          </g>
        )}

        {buoy.colorPattern === 'preto-amarelo-preto' && (
          // East Cardinal: Black with yellow band
          <g>
            <polygon points="40,86 70,86 76,132 34,132" fill={black} stroke="#0f172a" strokeWidth="1" />
            <polygon points="38,100 72,100 74,118 36,118" fill={yellow} stroke="#ca8a04" strokeWidth="1" />
            <ellipse cx="55" cy="86" rx="15" ry="4" fill="#334155" />
          </g>
        )}

        {buoy.colorPattern === 'amarelo-preto' && (
          // South Cardinal: Yellow top, Black bottom
          <g>
            <polygon points="40,86 70,86 76,132 34,132" fill={black} stroke="#0f172a" strokeWidth="1" />
            <polygon points="40,86 70,86 73,109 37,109" fill={yellow} stroke="#ca8a04" strokeWidth="1" />
            <ellipse cx="55" cy="86" rx="15" ry="4" fill="#facc15" />
          </g>
        )}

        {buoy.colorPattern === 'amarelo-preto-amarelo' && (
          // West Cardinal: Yellow with black band
          <g>
            <polygon points="40,86 70,86 76,132 34,132" fill={yellow} stroke="#ca8a04" strokeWidth="1" />
            <polygon points="38,100 72,100 74,118 36,118" fill={black} stroke="#0f172a" strokeWidth="1" />
            <ellipse cx="55" cy="86" rx="15" ry="4" fill="#fde047" />
          </g>
        )}

        {buoy.colorPattern === 'preto-faixas-vermelhas' && (
          // Isolated Danger: Black with red bands
          <g>
            <polygon points="38,86 72,86 76,132 34,132" fill={black} stroke="#0f172a" strokeWidth="1" />
            <polygon points="39,98 71,98 73,108 37,108" fill={red} stroke="#991b1b" strokeWidth="1" />
            <polygon points="36,116 74,116 75,124 35,124" fill={red} stroke="#991b1b" strokeWidth="1" />
            <ellipse cx="55" cy="86" rx="17" ry="4" fill="#334155" />
          </g>
        )}

        {buoy.colorPattern === 'listras-verticais-vermelho-branco' && (
          // Safe Water: Spherical/Pillar with vertical red/white stripes
          <g>
            <circle cx="55" cy="110" r="23" fill="url(#safeWaterPattern)" stroke="#991b1b" strokeWidth="1.2" />
            {/* 3D shading */}
            <circle cx="55" cy="110" r="23" fill="none" stroke="#090d16" strokeWidth="1" opacity="0.3" />
          </g>
        )}

        {buoy.colorPattern === 'amarelo' && (
          // Special Mark: Solid Yellow
          <g>
            <polygon points="38,86 72,86 76,132 34,132" fill={yellow} stroke="#ca8a04" strokeWidth="1" />
            <ellipse cx="55" cy="86" rx="17" ry="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            {/* Small X marking on hull */}
            <text x="55" y="114" fill="#854d0e" fontSize="12" fontWeight="bold" textAnchor="middle">×</text>
          </g>
        )}
      </g>

      {/* ---------------- TOWER / LATTICE MAST ---------------- */}
      <g stroke="#334155" strokeWidth="1.8">
        <line x1="48" y1="86" x2="52" y2="52" />
        <line x1="62" y1="86" x2="58" y2="52" />
        <line x1="47" y1="70" x2="63" y2="70" strokeWidth="1.2" />
        <line x1="49" y1="58" x2="61" y2="58" strokeWidth="1.2" />
      </g>

      {/* ---------------- LIGHT BEACON / LANTERN ---------------- */}
      <g>
        {/* Lantern base cage */}
        <rect x="50" y="44" width="10" height="8" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        
        {/* Lantern Glass bulb */}
        <circle
          cx="55"
          cy="48"
          r="4.5"
          fill={isLightOn ? buoy.lightColorHex : '#64748b'}
          stroke="#0f172a"
          strokeWidth="1"
          filter={isLightOn ? `url(#${glowFilterId})` : undefined}
        />

        {/* Light beam halo rays when light is on */}
        {isLightOn && (
          <g opacity="0.8">
            <line x1="55" y1="38" x2="55" y2="33" stroke={buoy.lightColorHex} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="47" y1="41" x2="43" y2="37" stroke={buoy.lightColorHex} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="63" y1="41" x2="67" y2="37" stroke={buoy.lightColorHex} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="44" y1="48" x2="39" y2="48" stroke={buoy.lightColorHex} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="66" y1="48" x2="71" y2="48" stroke={buoy.lightColorHex} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* ---------------- TOPMARKS (SINAIS DE TOPE) ---------------- */}
      <g>
        {buoy.topmark === 'cilindro' && (
          // Red cylinder
          <g>
            <line x1="55" y1="44" x2="55" y2="34" stroke="#1e293b" strokeWidth="2" />
            <rect x="46" y="16" width="18" height="18" rx="2" fill={red} stroke="#991b1b" strokeWidth="1" />
            <ellipse cx="55" cy="16" rx="9" ry="2.5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
          </g>
        )}

        {buoy.topmark === 'cone-cima' && (
          // Green cone pointing UP
          <g>
            <line x1="55" y1="44" x2="55" y2="36" stroke="#1e293b" strokeWidth="2" />
            <polygon points="55,14 66,35 44,35" fill={green} stroke="#166534" strokeWidth="1" />
            <ellipse cx="55" cy="35" rx="11" ry="2.5" fill="#14532d" stroke="#166534" strokeWidth="0.8" />
          </g>
        )}

        {buoy.topmark === 'dois-cones-cima' && (
          // North: Two black cones pointing UP (▲ ▲)
          <g>
            <line x1="55" y1="44" x2="55" y2="28" stroke="#1e293b" strokeWidth="2" />
            {/* Lower cone */}
            <polygon points="55,20 65,34 45,34" fill={black} stroke="#090d16" strokeWidth="1" />
            {/* Upper cone */}
            <polygon points="55,5 65,18 45,18" fill={black} stroke="#090d16" strokeWidth="1" />
          </g>
        )}

        {buoy.topmark === 'dois-cones-bases' && (
          // East: Cones joined at bases (▲ ▼ - Diamond)
          <g>
            <line x1="55" y1="44" x2="55" y2="36" stroke="#1e293b" strokeWidth="2" />
            {/* Top cone pointing UP */}
            <polygon points="55,7 65,20 45,20" fill={black} stroke="#090d16" strokeWidth="1" />
            {/* Bottom cone pointing DOWN */}
            <polygon points="45,22 65,22 55,35" fill={black} stroke="#090d16" strokeWidth="1" />
          </g>
        )}

        {buoy.topmark === 'dois-cones-baixo' && (
          // South: Two black cones pointing DOWN (▼ ▼)
          <g>
            <line x1="55" y1="44" x2="55" y2="22" stroke="#1e293b" strokeWidth="2" />
            {/* Upper cone pointing DOWN */}
            <polygon points="45,7 65,7 55,20" fill={black} stroke="#090d16" strokeWidth="1" />
            {/* Lower cone pointing DOWN */}
            <polygon points="45,22 65,22 55,35" fill={black} stroke="#090d16" strokeWidth="1" />
          </g>
        )}

        {buoy.topmark === 'dois-cones-vertices' && (
          // West: Cones joined at vertices (▼ ▲ - Hourglass)
          <g>
            <line x1="55" y1="44" x2="55" y2="36" stroke="#1e293b" strokeWidth="2" />
            {/* Upper cone pointing DOWN */}
            <polygon points="45,7 65,7 55,20" fill={black} stroke="#090d16" strokeWidth="1" />
            {/* Lower cone pointing UP */}
            <polygon points="55,22 65,35 45,35" fill={black} stroke="#090d16" strokeWidth="1" />
          </g>
        )}

        {buoy.topmark === 'duas-esferas-pretas' && (
          // Isolated Danger: Two black balls (● ●)
          <g>
            <line x1="55" y1="44" x2="55" y2="28" stroke="#1e293b" strokeWidth="2" />
            <circle cx="55" cy="12" r="7.5" fill={black} stroke="#090d16" strokeWidth="1" />
            <circle cx="55" cy="27" r="7.5" fill={black} stroke="#090d16" strokeWidth="1" />
            {/* Specular highlight */}
            <circle cx="53" cy="10" r="2" fill="#ffffff" fillOpacity="0.2" />
            <circle cx="53" cy="25" r="2" fill="#ffffff" fillOpacity="0.2" />
          </g>
        )}

        {buoy.topmark === 'uma-esfera-vermelha' && (
          // Safe Water: One red ball (●)
          <g>
            <line x1="55" y1="44" x2="55" y2="25" stroke="#1e293b" strokeWidth="2" />
            <circle cx="55" cy="18" r="9" fill={red} stroke="#991b1b" strokeWidth="1" />
            <circle cx="52" cy="15" r="2.5" fill="#ffffff" fillOpacity="0.3" />
          </g>
        )}

        {buoy.topmark === 'cruz-x-amarela' && (
          // Special Mark: Yellow St. Andrew's cross (X)
          <g stroke={yellow} strokeWidth="4" strokeLinecap="round">
            <line x1="55" y1="44" x2="55" y2="32" stroke="#1e293b" strokeWidth="2" />
            <line x1="45" y1="12" x2="65" y2="30" stroke="#ca8a04" strokeWidth="4.5" />
            <line x1="45" y1="12" x2="65" y2="30" />
            <line x1="65" y1="12" x2="45" y2="30" stroke="#ca8a04" strokeWidth="4.5" />
            <line x1="65" y1="12" x2="45" y2="30" />
          </g>
        )}
      </g>
    </svg>
  );
};

// Buoy item with independent animated light blink timer
const AnimatedBuoyItem: React.FC<{
  buoy: BuoyData;
  isSimulatingLights: boolean;
  onSelectTerm?: (term: NauticalTerm) => void;
  allTerms?: NauticalTerm[];
}> = ({ buoy, isSimulatingLights, onSelectTerm, allTerms = [] }) => {
  const [isLightOn, setIsLightOn] = useState(true);

  // Light flashing interval runner based on buoy.lightTimingPattern
  useEffect(() => {
    if (!isSimulatingLights) {
      setIsLightOn(true);
      return;
    }

    let currentIndex = 0;
    let timerId: NodeJS.Timeout;

    const runStep = () => {
      const isFlash = currentIndex % 2 === 0;
      setIsLightOn(isFlash);

      const delay = buoy.lightTimingPattern[currentIndex % buoy.lightTimingPattern.length] || 1000;
      currentIndex++;
      timerId = setTimeout(runStep, delay);
    };

    runStep();

    return () => {
      clearTimeout(timerId);
    };
  }, [isSimulatingLights, buoy.id]);

  const targetTerm = buoy.termId ? allTerms.find((t) => t.id === buoy.termId) : null;

  return (
    <div
      onClick={() => {
        if (targetTerm && onSelectTerm) onSelectTerm(targetTerm);
      }}
      className={`group relative flex flex-col justify-between rounded-xs bg-[#fcfbf8] p-4 border border-[#d7d0c1] transition ${
        targetTerm ? 'hover:border-[#0b3a55] hover:shadow-[3px_3px_0_0_#0b3a55] cursor-pointer' : ''
      }`}
    >
      {/* Top Header info */}
      <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-[#d7d0c1] text-xs">
        <span className="font-bold text-[#0b3a55] text-[12px] truncate">{buoy.name}</span>
        {targetTerm && (
          <span className="font-mono-naut text-[10px] text-[#0b3a55] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-medium shrink-0">
            Ver carta <ArrowRight className="w-2.5 h-2.5" />
          </span>
        )}
      </div>

      {/* SVG Buoy Illustration with Waterline */}
      <div className="my-3 flex flex-col items-center justify-center rounded-xs bg-[#faf7f0] py-3 border border-[#d7d0c1] group-hover:scale-102 transition-transform">
        {renderBuoySVG(buoy, isLightOn, 1)}
      </div>

      {/* Specs / Light & Topmark badge */}
      <div className="space-y-2">
        {/* Night Light Spec Badge */}
        <div className="rounded-xs bg-[#0b3a55] p-2.5 text-[#faf7f0]">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#dce8ef] flex items-center gap-1">
              <Moon className="w-3 h-3 text-[#e3b505]" />
              Luz Noturna:
            </span>
            <span className="font-mono-naut font-bold text-xs" style={{ color: buoy.lightColorHex }}>
              {buoy.lightRhythm}
            </span>
          </div>
          <p className="text-[11px] text-[#dce8ef] leading-tight">
            {buoy.lightDescription}
          </p>
        </div>

        {/* Daytime Characteristics */}
        <div className="rounded-xs bg-[#faf7f0] p-2.5 border border-[#d7d0c1] text-xs text-[#0b3a55]/90 space-y-1">
          <p className="text-[11px] leading-tight">
            <strong className="text-[#0b3a55]">Tope Diurno:</strong> {buoy.topmarkDescription}
          </p>
          <p className="text-[11px] leading-tight">
            <strong className="text-[#0b3a55]">Corpo:</strong> {buoy.colorsDescription}
          </p>
        </div>

        {/* Exam Tip */}
        <p className="text-[11px] text-[#0b3a55] bg-[#f0e8cf]/65 p-2 rounded-xs border border-[#ca9e1c]/40 leading-tight">
          <strong className="text-[#9a7413]">Regra de Exame:</strong> {buoy.examTip}
        </p>
      </div>
    </div>
  );
};

interface BuoyIllustrationProps {
  termId: string;
  variant?: 'card' | 'modal';
  onSelectTerm?: (term: NauticalTerm) => void;
  allTerms?: NauticalTerm[];
}

export const BuoyIllustration: React.FC<BuoyIllustrationProps> = ({
  termId,
  variant = 'card',
  onSelectTerm,
  allTerms = [],
}) => {
  const [activeTab, setActiveTab] = useState<BuoyCategory>('todas');
  const [isSimulatingLights, setIsSimulatingLights] = useState(true);

  // CRITICAL CHECK: If this is not a buoy term, return NULL immediately!
  const specificBuoyId = SPECIFIC_BUOY_MAP[termId];
  const categoryType = CATEGORY_BUOY_MAP[termId];

  if (!specificBuoyId && !categoryType) {
    return null;
  }

  // ----------------------------------------------------
  // CASE 1: SPECIFIC INDIVIDUAL BUOY (e.g. Cardeal Norte, Lateral Bombordo, etc.)
  // ----------------------------------------------------
  if (specificBuoyId) {
    const specificBuoy = BUOYS_DATA.find((b) => b.id === specificBuoyId);
    if (!specificBuoy) return null;

    if (variant === 'card') {
      return (
        <div className="mt-3.5 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-[#fcfbf8] p-1 rounded-xs border border-[#d7d0c1]">
              {renderBuoySVG(specificBuoy, true, 0.75)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0b3a55] text-[11px] block truncate">
                  {specificBuoy.name}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                <span
                  className="font-mono-naut font-bold text-[10px] px-1.5 py-0.5 rounded-xs bg-[#0b3a55] text-[#faf7f0]"
                  style={{ color: specificBuoy.lightColor === 'branco' ? '#facc15' : specificBuoy.lightColorHex }}
                >
                  Luz: {specificBuoy.lightRhythm}
                </span>
                <span className="text-[10px] text-[#9a7413] font-medium bg-[#f0e8cf] px-1.5 py-0.5 rounded-xs border border-[#ca9e1c]/40">
                  Tope: {specificBuoy.topmarkDescription}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-[#4f6e82] line-clamp-2 leading-tight">
                {specificBuoy.meaning}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Modal detailed view for single specific buoy
    return (
      <div className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1] gap-2">
          <h4 className="text-sm font-bold text-[#0b3a55] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]"></span>
            Ilustração Oficial: {specificBuoy.name}
          </h4>
          <button
            onClick={() => setIsSimulatingLights(!isSimulatingLights)}
            className={`inline-flex items-center gap-1.5 rounded-xs px-2.5 py-1 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition shrink-0 whitespace-nowrap cursor-pointer ${
              isSimulatingLights
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:text-[#0b3a55]'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isSimulatingLights ? 'text-[#e3b505] fill-[#e3b505]' : ''}`} />
            <span>{isSimulatingLights ? 'Luz a Piscar' : 'Luz Fixa'}</span>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Big Buoy Preview Box */}
          <div className="rounded-xs bg-[#fcfbf8] p-5 border border-[#d7d0c1] flex flex-col items-center justify-center text-center">
            <div className="my-2">{renderBuoySVG(specificBuoy, isSimulatingLights, 1.25)}</div>
            <div className="mt-3">
              <span className="text-base font-bold text-[#0b3a55] block">{specificBuoy.name}</span>
              <span className="text-xs text-[#4f6e82]">{specificBuoy.colorsDescription}</span>
            </div>
          </div>

          {/* Details & Specs Box */}
          <div className="rounded-xs bg-[#fcfbf8] p-5 border border-[#d7d0c1] flex flex-col justify-between space-y-3">
            <div>
              <span className="font-mono-naut text-[10px] font-medium text-[#4f6e82] uppercase tracking-wider block">
                Sinalização Noturna (Luz & Ritmo):
              </span>
              <div className="mt-1.5 rounded-xs bg-[#0b3a55] p-3 text-[#faf7f0]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#dce8ef] flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-[#e3b505]" />
                    Ritmo Regulamentar:
                  </span>
                  <span
                    className="font-mono-naut text-sm font-bold"
                    style={{ color: specificBuoy.lightColor === 'branco' ? '#facc15' : specificBuoy.lightColorHex }}
                  >
                    {specificBuoy.lightRhythm}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#dce8ef] leading-relaxed">
                  {specificBuoy.lightDescription}
                </p>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-[#0b3a55]/90">
                <p>
                  <strong className="text-[#0b3a55]">Tope Diurno:</strong> {specificBuoy.topmarkDescription}
                </p>
                <p>
                  <strong className="text-[#0b3a55]">Cor do Corpo:</strong> {specificBuoy.colorsDescription}
                </p>
                <p>
                  <strong className="text-[#0b3a55]">Regra de Passagem:</strong> {specificBuoy.meaning}
                </p>
              </div>
            </div>

            <div className="rounded-xs bg-[#f0e8cf]/65 p-3 border border-[#ca9e1c]/40 text-xs text-[#0b3a55]">
              <strong className="text-[#9a7413] block mb-0.5">Pergunta Frequente no Exame da DGRM:</strong>
              {specificBuoy.examTip}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // CASE 2: CATEGORY BUOYS (Marcas Cardeais, Marcas Laterais, IALA Geral)
  // ----------------------------------------------------
  const buoysToDisplay =
    categoryType && categoryType !== 'todas'
      ? BUOYS_DATA.filter((b) => b.category === categoryType)
      : activeTab === 'todas'
      ? BUOYS_DATA
      : BUOYS_DATA.filter((b) => b.category === activeTab);

  if (variant === 'card') {
    return (
      <div className="mt-3.5 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-3 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono-naut font-medium text-[#0b3a55] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-xs bg-[#0b3a55]"></span>
            Bóias & Luzes ({categoryType === 'cardeais' ? 'Marcas Cardeais' : categoryType === 'laterais' ? 'Marcas Laterais' : 'Sistema IALA A'})
          </span>
          <span className="font-mono-naut text-[10px] text-[#4f6e82]">Toque para ver</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {buoysToDisplay.slice(0, 4).map((b) => (
            <div
              key={b.id}
              onClick={(e) => {
                e.stopPropagation();
                if (b.termId) {
                  const target = allTerms.find((t) => t.id === b.termId);
                  if (target && onSelectTerm) onSelectTerm(target);
                }
              }}
              className="group/b flex flex-col items-center justify-between rounded-xs bg-[#fcfbf8] p-2 border border-[#d7d0c1] hover:border-[#0b3a55] hover:bg-[#ede9de]/50 transition cursor-pointer"
            >
              <div className="h-16 flex items-center justify-center scale-75 group-hover/b:scale-80 transition-transform">
                {renderBuoySVG(b, true, 0.75)}
              </div>
              <span className="font-bold text-[10px] text-[#0b3a55] leading-tight truncate w-full">
                {b.name.replace('Marca ', '').replace('Lateral de ', '')}
              </span>
              <span
                className="text-[9px] font-mono-naut font-bold leading-tight mt-0.5"
                style={{ color: b.lightColor === 'branco' ? '#0b3a55' : b.lightColorHex }}
              >
                {b.lightRhythm}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-2 text-[11px] text-[#0b3a55] bg-[#f0e8cf]/65 px-2.5 py-1.5 rounded-xs border border-[#ca9e1c]/40 leading-tight">
          <strong className="text-[#9a7413]">Regra IALA Região A (Manual pág. 65-67):</strong> Cores e marcas de tope de dia, ritmo e cor da luz à noite.
        </p>
      </div>
    );
  }

  // Category Detailed Modal View
  return (
    <div className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d7d0c1]">
        <div>
          <h4 className="text-sm font-bold text-[#0b3a55] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]"></span>
            Esquema Oficial das Bóias, Sinais de Tope e Ritmos de Luz (Manual pág. 65, 66 e 67)
          </h4>
          <p className="text-xs text-[#4f6e82] mt-0.5">
            Forma da boia, marcas de tope diurnas, cor da luz e ritmo característico dos clarões para exame da DGRM.
          </p>
        </div>

        <button
          onClick={() => setIsSimulatingLights(!isSimulatingLights)}
          className={`inline-flex items-center gap-1.5 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition shrink-0 whitespace-nowrap cursor-pointer ${
            isSimulatingLights
              ? 'bg-[#0b3a55] text-[#faf7f0] hover:bg-[#082b3f]'
              : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#4f6e82] hover:text-[#0b3a55]'
          }`}
          title="Ativar/desativar animação do ritmo dos clarões da luz"
        >
          <Zap className={`w-3.5 h-3.5 ${isSimulatingLights ? 'text-[#e3b505] fill-[#e3b505]' : ''}`} />
          <span>{isSimulatingLights ? 'Luzes a Piscar (Ativo)' : 'Luzes Fixas'}</span>
        </button>
      </div>

      {categoryType === 'todas' && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-b border-[#d7d0c1] pb-2.5">
          <button
            onClick={() => setActiveTab('todas')}
            className={`rounded-xs px-3 py-1.5 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'todas'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'bg-[#fcfbf8] border border-[#d7d0c1] text-[#4f6e82] hover:text-[#0b3a55]'
            }`}
          >
            Todas ({BUOYS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('laterais')}
            className={`rounded-xs px-3 py-1.5 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'laterais'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'bg-[#fcfbf8] border border-[#d7d0c1] text-[#4f6e82] hover:text-[#0b3a55]'
            }`}
          >
            Marcas Laterais & Canais (4)
          </button>
          <button
            onClick={() => setActiveTab('cardeais')}
            className={`rounded-xs px-3 py-1.5 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'cardeais'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'bg-[#fcfbf8] border border-[#d7d0c1] text-[#4f6e82] hover:text-[#0b3a55]'
            }`}
          >
            Marcas Cardeais (4)
          </button>
          <button
            onClick={() => setActiveTab('outras')}
            className={`rounded-xs px-3 py-1.5 font-mono-naut text-[11px] font-medium uppercase tracking-wider transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'outras'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'bg-[#fcfbf8] border border-[#d7d0c1] text-[#4f6e82] hover:text-[#0b3a55]'
            }`}
          >
            Perigo Isolado, Águas Limpas e Especiais (3)
          </button>
        </div>
      )}

      {/* Buoys Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {buoysToDisplay.map((buoy) => (
          <AnimatedBuoyItem
            key={buoy.id}
            buoy={buoy}
            isSimulatingLights={isSimulatingLights}
            onSelectTerm={onSelectTerm}
            allTerms={allTerms}
          />
        ))}
      </div>

      {/* Summary Reference Table */}
      <div className="mt-5 rounded-xs bg-[#f0e8cf]/65 p-4 border border-[#ca9e1c]/40 text-xs text-[#0b3a55]">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#9a7413] shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <span className="font-bold text-[#9a7413] text-sm">
              Mnemónicas do Manual do Marinheiro 2021 (pág. 65, 66 e 67):
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside text-[11px] leading-relaxed">
              <li>
                <strong>Pág. 65:</strong> Entrada de barra — Bombordo = Boia vermelha (nº PAR) / Estibordo = Boia verde (nº ÍMPAR).
              </li>
              <li>
                <strong>Pág. 65:</strong> Canal Principal — Fl(2+1) com faixa central verde (canal BB) ou vermelha (canal EB).
              </li>
              <li>
                <strong>Pág. 66:</strong> Marcas Cardinais — Norte (12h, contínuo), Este (3h, 3 clarões), Sul (6h, 6 clarões + 1 longo), Oeste (9h, 9 clarões).
              </li>
              <li>
                <strong>Pág. 67:</strong> Perigo Isolado — 2 esferas pretas no tope = Fl(2) W (2 clarões brancos).
              </li>
              <li>
                <strong>Pág. 67:</strong> Águas Limpas — 1 esfera vermelha, riscas verticais vermelhas/brancas, luz Morse "A" (· —). Dar sempre bombordo!
              </li>
              <li>
                <strong>Pág. 67:</strong> Marcas Especiais — Totalmente amarela, tope em X, luz amarela se usada.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
