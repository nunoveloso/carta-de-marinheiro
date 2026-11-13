import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Box,
  Eye,
  EyeOff,
  Ruler,
  RotateCcw,
  Volume2,
  VolumeX,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Waves,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { NauticalTerm } from '../types/glossary';
import { GlossaryText } from './GlossaryText';
import { TermDetailModal } from './TermDetailModal';
import { speakNauticalTerm, stopSpeaking } from '../utils/speech';

export type Boat3DPartId =
  | 'quilha'
  | 'roda-de-proa'
  | 'cadaste'
  | 'painel-de-popa'
  | 'balizas'
  | 'querena'
  | 'costado'
  | 'linha-de-agua'
  | 'conves'
  | 'verdugo'
  | 'balaustres'
  | 'escovem'
  | 'leme'
  | 'robaletes'
  | 'comprimento'
  | 'boca'
  | 'pontal'
  | 'calado';

type PartGroup3D = 'estrutura' | 'aparelho' | 'dimensoes';

interface Boat3DPartMeta {
  id: Boat3DPartId;
  termId: string;
  altTermIds?: string[];
  matchNames: string[];
  name: string;
  group: PartGroup3D;
  pageRef: string;
  zoneLabel: string;
  definition: string;
  examRule: string;
}

const BOAT_3D_PARTS: Record<Boat3DPartId, Boat3DPartMeta> = {
  quilha: {
    id: 'quilha',
    termId: 'quilha',
    matchNames: ['quilha'],
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
    matchNames: ['roda de proa'],
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
    matchNames: ['cadaste'],
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
    matchNames: ['painel de popa'],
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
    matchNames: ['balizas', 'baliza'],
    name: 'Balizas (Cavernas)',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Ossatura Transversal Interna',
    definition:
      'Estruturas transversais em relação à quilha que dão forma ao casco. São também conhecidas por braços ou "costelas" da embarcação.',
    examRule:
      'Ative o modo "Corte (Balizas)" no visualizador 3D para observar a ossatura interna. A Boca máxima mede-se na baliza mais larga.',
  },
  querena: {
    id: 'querena',
    termId: 'querena',
    matchNames: ['querena', 'obras vivas', 'carena'],
    name: 'Querena (Obras Vivas)',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Casco Submerso (Abaixo da Linha de Água)',
    definition:
      'Forma exterior do navio abaixo da linha de água (obras vivas / carena), em contacto permanente com a água.',
    examRule:
      'Sinónimos frequentes em exame: Obras vivas ou Carena. É na querena que se fixam os robaletes.',
  },
  costado: {
    id: 'costado',
    termId: 'costado',
    matchNames: ['costado', 'obras mortas'],
    name: 'Costado (Obras Mortas)',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Casco Acima da Água',
    definition:
      'Forro exterior do casco situado acima da linha de água (obras mortas), exposto ao vento e agentes atmosféricos até à borda ou convés.',
    examRule:
      'Obras mortas = Costado (acima da linha de água). Obras vivas = Querena (abaixo da linha de água).',
  },
  'linha-de-agua': {
    id: 'linha-de-agua',
    termId: 'linha-de-agua',
    matchNames: ['linha de agua'],
    name: 'Linha de Água',
    group: 'estrutura',
    pageRef: 'Pág. 4',
    zoneLabel: 'Plano de Flutuação',
    definition:
      'Linha de interseção da superfície da água com o exterior do casco que separa as obras vivas (abaixo) das obras mortas (acima).',
    examRule:
      'Serve também de referência superior para medir o Calado até ao ponto mais baixo da quilha.',
  },
  conves: {
    id: 'conves',
    termId: 'conves',
    matchNames: ['conves'],
    name: 'Convés',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Pavimento Superior',
    definition:
      'Fecho superior do casco com função estrutural e de pavimento para circulação e manobra.',
    examRule:
      'No convés acondiciona-se equipamento de segurança como a balsa de salvação.',
  },
  verdugo: {
    id: 'verdugo',
    termId: 'verdugo',
    matchNames: ['verdugo'],
    name: 'Verdugo',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Friso Exterior da Borda',
    definition:
      'Peça protetora colocada nas bordas exteriores, da proa à popa, destinada a proteger a embarcação dos choques nas atracagens.',
    examRule:
      'Funciona como uma cinta de proteção permanente no costado junto à borda.',
  },
  balaustres: {
    id: 'balaustres',
    termId: 'balaustres',
    matchNames: ['balaustres', 'balaustre'],
    name: 'Balaústres',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Guarda da Borda',
    definition:
      'Peças normalmente em metal fixadas verticalmente à borda da embarcação, que recebem os vergueiros (cabos de segurança).',
    examRule:
      'Conjunto de balaústres + vergueiros protege a tripulação de quedas ao mar ao circular no convés.',
  },
  escovem: {
    id: 'escovem',
    termId: 'escovem',
    matchNames: ['escovem'],
    name: 'Escovém',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Abertura no Costado à Proa',
    definition:
      'Abertura reforçada no costado onde passam os cabos de amarração ou a amarra do ferro.',
    examRule:
      'Evita que o atrito dos cabos ou da amarra danifique o forro do costado à proa.',
  },
  leme: {
    id: 'leme',
    termId: 'leme',
    matchNames: ['leme'],
    name: 'Leme',
    group: 'aparelho',
    pageRef: 'Pág. 5',
    zoneLabel: 'Aparelho de Governo à Popa',
    definition:
      'Aparelho que permite orientar a embarcação. É formado por madre (junto ao cadaste), porta (mergulhada na água) e cachola (onde encaixa a cana do leme).',
    examRule: 'Memorizar as 3 partes do leme: Madre · Porta · Cachola.',
  },
  robaletes: {
    id: 'robaletes',
    termId: 'robaletes',
    matchNames: ['robaletes', 'quilhas de balanco'],
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
    matchNames: ['comprimento'],
    name: 'Comprimento',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Dimensão Longitudinal (Roda de Proa ↔ Cadaste)',
    definition:
      'Distância entre a proa e a popa medida na direção Proa–Popa, desde a parte exterior da Roda de Proa até à face exterior do Cadaste.',
    examRule:
      'É a maior dimensão da embarcação; define limites legais das Embarcações de Recreio (2,5 m a 24 m).',
  },
  boca: {
    id: 'boca',
    termId: 'boca',
    matchNames: ['boca'],
    name: 'Boca',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Largura Máxima (Baliza Mestra)',
    definition:
      'Largura máxima da embarcação, medida no alcatrate desde a face externa do forro de um bordo à do bordo contrário, no sentido da baliza mais larga.',
    examRule:
      'Faz parte das 3 dimensões principais (Comprimento · Boca · Pontal). Em 3D vê-se claramente em vista de Topo.',
  },
  pontal: {
    id: 'pontal',
    termId: 'pontal',
    matchNames: ['pontal'],
    name: 'Pontal',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Altura Estrutural (Quilha ↔ Borda)',
    definition:
      'Distância vertical da quilha à borda, medida desde a quilha até à parte superior do alcatrate, aproximadamente a meio da embarcação.',
    examRule:
      'Não confundir Pontal (quilha até à borda) com Calado (linha de água até ao fundo da quilha).',
  },
  calado: {
    id: 'calado',
    termId: 'calado',
    matchNames: ['calado'],
    name: 'Calado',
    group: 'dimensoes',
    pageRef: 'Pág. 5',
    zoneLabel: 'Profundidade Submersa (Linha de Água ↔ Quilha)',
    definition:
      'Distância vertical entre a linha de água e o ponto mais baixo da quilha.',
    examRule:
      'Quanto maior a carga, maior o calado (imersão). Crucial para verificar sondas e evitar encalhes.',
  },
};

const BOAT_3D_PART_LIST = Object.values(BOAT_3D_PARTS);

type CameraPresetKey = 'iso' | 'lateral' | 'frente' | 'tras' | 'topo';

const CAMERA_PRESETS: Record<
  CameraPresetKey,
  { label: string; pos: [number, number, number]; target: [number, number, number] }
> = {
  iso: { label: 'Perspetiva', pos: [4.8, 2.55, 5.2], target: [0.1, 0.05, 0] },
  lateral: { label: 'Lateral', pos: [0.15, 0.55, 7.1], target: [0.15, 0.0, 0] },
  frente: { label: 'Frente', pos: [6.8, 1.85, 0.01], target: [0.2, 0.1, 0] },
  tras: { label: 'Trás', pos: [-6.4, 1.85, 0.01], target: [0.1, 0.1, 0] },
  topo: { label: 'Topo (Planta)', pos: [0.15, 7.6, 0.25], target: [0.15, 0.0, 0] },
};

function normalizeMatch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return true;
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '') : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(renderer);
  } catch {
    return true;
  }
}

// ---------- Parametric Hull Equations (X = +3.35 Proa, -2.85 Popa; Y = 0 Waterline; Z = +EB / -BB) ----------
const X_STERN = -2.85;
const X_BOW = 3.35;
const HULL_LEN = X_BOW - X_STERN; // 6.20

function hullX(u: number): number {
  return X_STERN + HULL_LEN * u;
}

function getHalfBeam(u: number): number {
  if (u <= 0) return 0.84;
  if (u >= 1) return 0.004;
  if (u < 0.44) {
    const k = u / 0.44;
    return 0.84 + 0.34 * Math.sin(k * Math.PI * 0.5);
  }
  const k = (u - 0.44) / 0.56;
  return 1.18 * Math.pow(Math.cos(k * Math.PI * 0.5), 0.72);
}

function getSheerY(u: number): number {
  return 0.58 - 0.05 * Math.sin(Math.min(1, u / 0.65) * Math.PI) + 0.34 * Math.pow(u, 2.2);
}

function getKeelY(u: number): number {
  if (u <= 0.78) {
    const k = 1 - u / 0.78;
    return -0.68 + 0.07 * k * k;
  }
  const t = (u - 0.78) / 0.22;
  return -0.68 + (getSheerY(1) + 0.68) * Math.pow(t, 1.85);
}

function hullPoint(u: number, v: number, side: 1 | -1): THREE.Vector3 {
  const x = hullX(u);
  const halfW = getHalfBeam(u);
  const yTop = getSheerY(u);
  const yBot = getKeelY(u);
  const p = THREE.MathUtils.lerp(0.88, 1.15, u);
  const sharpness = THREE.MathUtils.lerp(0.32, 0.95, Math.pow(u, 1.35));
  const wNorm = Math.pow(Math.sin(v * Math.PI * 0.5), sharpness);
  const yNorm = Math.pow(v, p);
  const y = THREE.MathUtils.lerp(yBot, yTop, yNorm);
  const z = side * halfW * wNorm;
  return new THREE.Vector3(x, y, z);
}

function waterlineVAtStation(u: number): number {
  const yTop = getSheerY(u);
  const yBot = getKeelY(u);
  if (yBot >= 0) return 0;
  if (yTop <= 0) return 1;
  const p = THREE.MathUtils.lerp(0.88, 1.15, u);
  return Math.pow(-yBot / (yTop - yBot), 1 / p);
}

function buildLoftedHullSection(
  uStart: number,
  uEnd: number,
  uSteps: number,
  vSteps: number,
  vRangeFn: (u: number) => [number, number]
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (const side of [1, -1] as const) {
    const baseOffset = positions.length / 3;
    for (let iu = 0; iu <= uSteps; iu++) {
      const u = THREE.MathUtils.lerp(uStart, uEnd, iu / uSteps);
      const [v0, v1] = vRangeFn(u);
      for (let iv = 0; iv <= vSteps; iv++) {
        const vf = THREE.MathUtils.lerp(v0, v1, iv / vSteps);
        const pt = hullPoint(u, vf, side);
        positions.push(pt.x, pt.y, pt.z);
        uvs.push(iu / uSteps, iv / vSteps);
      }
    }

    const rowStride = vSteps + 1;
    for (let iu = 0; iu < uSteps; iu++) {
      for (let iv = 0; iv < vSteps; iv++) {
        const a = baseOffset + iu * rowStride + iv;
        const b = baseOffset + (iu + 1) * rowStride + iv;
        const c = baseOffset + (iu + 1) * rowStride + (iv + 1);
        const d = baseOffset + iu * rowStride + (iv + 1);
        if (side === 1) {
          indices.push(a, b, c, a, c, d);
        } else {
          indices.push(a, c, b, a, d, c);
        }
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildDeckGeometry(uSteps: number, wSteps: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let iu = 0; iu <= uSteps; iu++) {
    const u = iu / uSteps;
    const x = hullX(u);
    const halfW = getHalfBeam(u);
    const sheerY = getSheerY(u);
    for (let iw = 0; iw <= wSteps; iw++) {
      const wf = -1 + (2 * iw) / wSteps; // -1 (BB) to +1 (EB)
      const z = wf * halfW;
      // Gentle cambered crown along centerline
      const camber = 0.055 * (1 - wf * wf) * Math.min(1, halfW / 0.6);
      positions.push(x, sheerY + camber - 0.015, z);
      uvs.push(u * 4, (wf + 1) * 0.5);
    }
  }

  const rowStride = wSteps + 1;
  for (let iu = 0; iu < uSteps; iu++) {
    for (let iw = 0; iw < wSteps; iw++) {
      const a = iu * rowStride + iw;
      const b = (iu + 1) * rowStride + iw;
      const c = (iu + 1) * rowStride + (iw + 1);
      const d = iu * rowStride + (iw + 1);
      indices.push(a, d, c, a, c, b);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildSubdividedSeaDisc(radius = 20, radialSegments = 44, angularSegments = 72): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let ir = 0; ir <= radialSegments; ir++) {
    // Slightly denser concentric rings near the boat for smooth small wave crests
    const t = ir / radialSegments;
    const r = radius * Math.pow(t, 1.28);
    for (let ia = 0; ia <= angularSegments; ia++) {
      const theta = (ia / angularSegments) * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      positions.push(x, 0, z);
      normals.push(0, 1, 0);
      uvs.push(x * 0.1 + 0.5, z * 0.1 + 0.5);
    }
  }

  const stride = angularSegments + 1;
  for (let ir = 0; ir < radialSegments; ir++) {
    for (let ia = 0; ia < angularSegments; ia++) {
      const a = ir * stride + ia;
      const b = (ir + 1) * stride + ia;
      const c = (ir + 1) * stride + (ia + 1);
      const d = ir * stride + (ia + 1);
      indices.push(a, d, c, a, c, b);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

function buildTransomGeometry(): THREE.BufferGeometry {
  const vSteps = 16;
  const wSteps = 14;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let iv = 0; iv <= vSteps; iv++) {
    const vf = iv / vSteps;
    const edgePt = hullPoint(0, vf, 1);
    for (let iw = 0; iw <= wSteps; iw++) {
      const wf = -1 + (2 * iw) / wSteps;
      const camber = vf > 0.92 ? 0.055 * (1 - wf * wf) * ((vf - 0.92) / 0.08) : 0;
      // Slight aft rake on transom
      const xRake = -2.85 - 0.06 * vf;
      positions.push(xRake, edgePt.y + camber, wf * edgePt.z);
      uvs.push((wf + 1) * 0.5, vf);
    }
  }

  const rowStride = wSteps + 1;
  for (let iv = 0; iv < vSteps; iv++) {
    for (let iw = 0; iw < wSteps; iw++) {
      const a = iv * rowStride + iw;
      const b = (iv + 1) * rowStride + iw;
      const c = (iv + 1) * rowStride + (iw + 1);
      const d = iv * rowStride + (iw + 1);
      indices.push(a, d, c, a, c, b);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createTeakDeckTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#c89d66';
    ctx.fillRect(0, 0, 512, 512);

    const plankCount = 24;
    const plankH = 512 / plankCount;
    for (let i = 0; i < plankCount; i++) {
      const shade = ((i * 37) % 18) - 9;
      ctx.fillStyle = `rgb(${198 + shade}, ${152 + Math.round(shade * 0.8)}, ${100 + Math.round(shade * 0.5)})`;
      ctx.fillRect(0, i * plankH, 512, plankH - 2);
      // Dark caulking seam
      ctx.fillStyle = '#3c2d20';
      ctx.fillRect(0, (i + 1) * plankH - 2, 512, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createWaterRingLabelSprite(text: string, color: string, bgColor = '#faf7f0'): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 72;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(6, 6, 244, 60);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 244, 60);
    ctx.fillStyle = color;
    ctx.font = 'bold 28px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 37);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.25, 0.35, 1);
  return sprite;
}

function createSubtleCaptionSprite(text: string, color = '#0369a1'): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 64);
    ctx.font = '500 22px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(220, 238, 249, 0.95)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    ctx.fillText(text, 128, 32);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(0.95, 0.24, 1);
  return sprite;
}

export interface Boat3DViewerProps {
  allTerms?: NauticalTerm[];
  onSelectTerm?: (term: NauticalTerm) => void;
  currentUser?: User | null;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
  userNotes?: Record<string, string>;
  onSaveNote?: (id: string, note: string) => Promise<void>;
  onOpenAuth?: () => void;
}

export const Boat3DViewer: React.FC<Boat3DViewerProps> = ({
  allTerms = [],
  onSelectTerm,
  currentUser = null,
  bookmarkedIds = new Set(),
  onToggleBookmark = () => {},
  userNotes = {},
  onSaveNote,
  onOpenAuth = () => {},
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [selectedPart, setSelectedPart] = useState<Boat3DPartId>('quilha');
  const [hoveredPart, setHoveredPart] = useState<Boat3DPartId | null>(null);
  const [activeGroup, setActiveGroup] = useState<'todos' | PartGroup3D>('todos');
  const [showCutaway, setShowCutaway] = useState<boolean>(false);
  const [showWater, setShowWater] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(false);
  const [controlsCollapsed, setControlsCollapsed] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<CameraPresetKey>('iso');
  const [contextLost, setContextLost] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [localModalTerm, setLocalModalTerm] = useState<NauticalTerm | null>(null);

  // Refs synced into the WebGL loop cleanly without re-creating the Three.js scene
  const selectedPartRef = useRef<Boat3DPartId>(selectedPart);
  const hoveredPartRef = useRef<Boat3DPartId | null>(hoveredPart);
  const showCutawayRef = useRef<boolean>(showCutaway);
  const showWaterRef = useRef<boolean>(showWater);
  const showDimensionsRef = useRef<boolean>(showDimensions);

  const sceneApiRef = useRef<{
    requestRender: () => void;
    goToPreset: (preset: CameraPresetKey) => void;
    updatePartHighlight: () => void;
    updateVisibility: () => void;
  } | null>(null);

  selectedPartRef.current = selectedPart;
  hoveredPartRef.current = hoveredPart;
  showCutawayRef.current = showCutaway;
  showWaterRef.current = showWater;
  showDimensionsRef.current = showDimensions;

  const currentInfo = BOAT_3D_PARTS[selectedPart];

  const matchedGlossaryTerm = useMemo(() => {
    if (!allTerms.length) return undefined;
    const byId = allTerms.find(
      (t) => t.id === currentInfo.termId || currentInfo.altTermIds?.includes(t.id)
    );
    if (byId) return byId;
    const candidates = currentInfo.matchNames.map(normalizeMatch);
    return allTerms.find((t) => candidates.includes(normalizeMatch(t.term)));
  }, [allTerms, currentInfo]);

  const handleSelectPartUI = useCallback((partId: Boat3DPartId) => {
    setSelectedPart(partId);
    if (partId === 'balizas') {
      setShowCutaway(true);
    }
    if (partId === 'comprimento' || partId === 'boca' || partId === 'pontal' || partId === 'calado') {
      setShowDimensions(true);
    }
  }, []);

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

  // Sync state changes cleanly to 3D scene
  useEffect(() => {
    sceneApiRef.current?.updatePartHighlight();
    sceneApiRef.current?.requestRender();
  }, [selectedPart, hoveredPart]);

  useEffect(() => {
    sceneApiRef.current?.updateVisibility();
    sceneApiRef.current?.requestRender();
  }, [showCutaway, showWater, showDimensions]);

  // Main Three.js scene setup & lifecycle
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const disposables: Array<{ dispose: () => void }> = [];

    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 300);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    renderer.shadowMap.enabled = !isSoftwareGl;
    if (!isSoftwareGl) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'none';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#dceef9');
    scene.fog = new THREE.Fog('#dceef9', 15, 34);

    // RoomEnvironment reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();
    disposables.push(envRT);

    // Camera & OrbitControls (horizontal 360° orbit + comfortable elevation bounds)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(...CAMERA_PRESETS.iso.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.iso.target);
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.rotateSpeed = 0.78;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 4.2;
    controls.maxDistance = 14.5;
    controls.minPolarAngle = 0.14;
    controls.maxPolarAngle = Math.PI * 0.72;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.08;
    controls.update();

    // 3-Point Studio + Sky/Sea Lighting
    const hemiLight = new THREE.HemisphereLight('#f2f9ff', '#4b7b96', 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#fff5e6', 2.15);
    keyLight.position.set(7.5, 9.5, 6.5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 26;
      keyLight.shadow.camera.left = -5.5;
      keyLight.shadow.camera.right = 5.5;
      keyLight.shadow.camera.top = 4.5;
      keyLight.shadow.camera.bottom = -4.5;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#bfe0f5', 0.95);
    rimLight.position.set(-7.0, 4.0, -6.5);
    scene.add(rimLight);

    // Track clickable parts & material original emissives
    const clickableMeshes: THREE.Object3D[] = [];
    const partMaterials = new Map<
      Boat3DPartId,
      Array<{
        mat: THREE.MeshStandardMaterial;
        baseEmissive: THREE.Color;
        baseEmissiveIntensity: number;
      }>
    >();

    const registerPartMesh = (partId: Boat3DPartId, mesh: THREE.Mesh) => {
      mesh.userData.partId = partId;
      clickableMeshes.push(mesh);
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const bucket = partMaterials.get(partId) || [];
      mats.forEach((m) => {
        if (m instanceof THREE.MeshStandardMaterial) {
          if (!bucket.some((entry) => entry.mat === m)) {
            bucket.push({
              mat: m,
              baseEmissive: m.emissive.clone(),
              baseEmissiveIntensity: m.emissiveIntensity,
            });
          }
        }
      });
      partMaterials.set(partId, bucket);
    };

    const boatGroup = new THREE.Group();
    scene.add(boatGroup);

    // ================= 1. HULL: QUERENA (UNDERWATER) & COSTADO (TOPSIDES) =================
    const costadoMat = new THREE.MeshStandardMaterial({
      color: '#f5f0e4',
      roughness: 0.34,
      metalness: 0.06,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
    const querenaMat = new THREE.MeshStandardMaterial({
      color: '#1b4b65',
      roughness: 0.48,
      metalness: 0.08,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
    const transomMat = new THREE.MeshStandardMaterial({
      color: '#eae3d2',
      roughness: 0.4,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
    disposables.push(costadoMat, querenaMat, transomMat);

    const querenaGeo = buildLoftedHullSection(0, 0.94, 48, 12, (u) => {
      const vw = waterlineVAtStation(u);
      return [0, Math.max(0.001, vw)];
    });
    const costadoGeo = buildLoftedHullSection(0, 1.0, 52, 12, (u) => {
      const vw = waterlineVAtStation(u);
      return [vw, 1];
    });
    const transomGeo = buildTransomGeometry();
    disposables.push(querenaGeo, costadoGeo, transomGeo);

    const querenaMesh = new THREE.Mesh(querenaGeo, querenaMat);
    const costadoMesh = new THREE.Mesh(costadoGeo, costadoMat);
    const transomMesh = new THREE.Mesh(transomGeo, transomMat);
    querenaMesh.castShadow = !isSoftwareGl;
    costadoMesh.castShadow = !isSoftwareGl;
    costadoMesh.receiveShadow = !isSoftwareGl;
    transomMesh.castShadow = !isSoftwareGl;

    boatGroup.add(querenaMesh, costadoMesh, transomMesh);
    registerPartMesh('querena', querenaMesh);
    registerPartMesh('costado', costadoMesh);
    registerPartMesh('painel-de-popa', transomMesh);

    // ================= 2. QUILHA, RODA DE PROA, CADASTE =================
    const spineMat = new THREE.MeshStandardMaterial({
      color: '#162838',
      roughness: 0.5,
      metalness: 0.25,
    });
    const stemMat = new THREE.MeshStandardMaterial({
      color: '#20364a',
      roughness: 0.45,
      metalness: 0.25,
    });
    const sternPostMat = new THREE.MeshStandardMaterial({
      color: '#20364a',
      roughness: 0.45,
      metalness: 0.25,
    });
    disposables.push(spineMat, stemMat, sternPostMat);

    // Quilha longitudinal timber/skeg bar
    const keelPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 24; i++) {
      const u = (i / 24) * 0.79;
      keelPts.push(new THREE.Vector3(hullX(u), getKeelY(u) - 0.045, 0));
    }
    const keelCurve = new THREE.CatmullRomCurve3(keelPts);
    const keelGeo = new THREE.TubeGeometry(keelCurve, 32, 0.068, 10, false);
    disposables.push(keelGeo);
    const keelMesh = new THREE.Mesh(keelGeo, spineMat);
    keelMesh.castShadow = !isSoftwareGl;
    boatGroup.add(keelMesh);
    registerPartMesh('quilha', keelMesh);

    // Roda de Proa (sweeping stem post forward & upward)
    const stemPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 18; i++) {
      const u = THREE.MathUtils.lerp(0.76, 1.0, i / 18);
      stemPts.push(new THREE.Vector3(hullX(u) + 0.03, getKeelY(u) - 0.02, 0));
    }
    const stemCurve = new THREE.CatmullRomCurve3(stemPts);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 28, 0.056, 10, false);
    disposables.push(stemGeo);
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.castShadow = !isSoftwareGl;
    boatGroup.add(stemMesh);
    registerPartMesh('roda-de-proa', stemMesh);

    // Cadaste (aft structural sternpost)
    const cadasteCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.79, -0.68, 0),
      new THREE.Vector3(-2.83, -0.35, 0),
      new THREE.Vector3(-2.87, 0.06, 0),
    ]);
    const cadasteGeo = new THREE.TubeGeometry(cadasteCurve, 12, 0.058, 10, false);
    disposables.push(cadasteGeo);
    const cadasteMesh = new THREE.Mesh(cadasteGeo, sternPostMat);
    boatGroup.add(cadasteMesh);
    registerPartMesh('cadaste', cadasteMesh);

    // ================= 3. BALIZAS (INTERNAL TRANSVERSE RIBS) =================
    const ribMat = new THREE.MeshStandardMaterial({
      color: '#8e6233',
      roughness: 0.62,
      metalness: 0.08,
    });
    disposables.push(ribMat);

    const balizasGroup = new THREE.Group();
    boatGroup.add(balizasGroup);
    const ribStations = [0.12, 0.21, 0.30, 0.39, 0.48, 0.57, 0.66, 0.75, 0.84];
    ribStations.forEach((u) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 8; i++) {
        const vf = 1 - i / 8;
        const p = hullPoint(u, vf, -1);
        pts.push(new THREE.Vector3(p.x, p.y + 0.015, p.z * 0.94));
      }
      for (let i = 1; i <= 8; i++) {
        const vf = i / 8;
        const p = hullPoint(u, vf, 1);
        pts.push(new THREE.Vector3(p.x, p.y + 0.015, p.z * 0.94));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const ribGeo = new THREE.TubeGeometry(curve, 24, 0.032, 8, false);
      disposables.push(ribGeo);
      const ribMesh = new THREE.Mesh(ribGeo, ribMat);
      balizasGroup.add(ribMesh);
      registerPartMesh('balizas', ribMesh);
    });

    // ================= 4. LINHA DE ÁGUA HULL STRIPE (LIGHT BLUE) =================
    const wlStripeMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#0284c7',
      emissiveIntensity: 0.25,
      roughness: 0.24,
      metalness: 0.14,
    });
    disposables.push(wlStripeMat);

    for (const side of [1, -1] as const) {
      const wlPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 32; i++) {
        const u = (i / 32) * 0.94;
        const vw = waterlineVAtStation(u);
        const pt = hullPoint(u, vw, side);
        wlPts.push(new THREE.Vector3(pt.x, 0.01, pt.z * 1.012));
      }
      const wlCurve = new THREE.CatmullRomCurve3(wlPts);
      const wlGeo = new THREE.TubeGeometry(wlCurve, 36, 0.024, 8, false);
      disposables.push(wlGeo);
      const wlMesh = new THREE.Mesh(wlGeo, wlStripeMat);
      boatGroup.add(wlMesh);
      registerPartMesh('linha-de-agua', wlMesh);
    }

    // ================= 5. CONVÉS (TEAK DECK + LOW CABIN COAMING, NO SAILBOAT MAST) =================
    const teakTex = createTeakDeckTexture();
    const deckMat = new THREE.MeshStandardMaterial({
      map: teakTex,
      roughness: 0.65,
      metalness: 0.04,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
    const coamingMat = new THREE.MeshStandardMaterial({
      color: '#fcfbf8',
      roughness: 0.35,
      metalness: 0.08,
      transparent: true,
      opacity: 1,
    });
    disposables.push(teakTex, deckMat, coamingMat);

    const deckGeo = buildDeckGeometry(44, 16);
    disposables.push(deckGeo);
    const deckMesh = new THREE.Mesh(deckGeo, deckMat);
    deckMesh.receiveShadow = !isSoftwareGl;
    boatGroup.add(deckMesh);
    registerPartMesh('conves', deckMesh);

    // Subtle cruiser cabin trunk (purely general motor/cabin boat superstructure, zero mast!)
    const cabinGeo = new THREE.BoxGeometry(1.65, 0.28, 1.38);
    const cabinWindshieldGeo = new THREE.BoxGeometry(0.18, 0.22, 1.32);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: '#efeae0',
      roughness: 0.35,
      metalness: 0.05,
      transparent: true,
      opacity: 1,
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: '#1e3a5f',
      roughness: 0.12,
      metalness: 0.65,
      transparent: true,
      opacity: 0.85,
    });
    disposables.push(cabinGeo, cabinWindshieldGeo, cabinMat, glassMat);

    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.set(0.15, 0.70, 0);
    cabinMesh.castShadow = !isSoftwareGl;
    const windshieldMesh = new THREE.Mesh(cabinWindshieldGeo, glassMat);
    windshieldMesh.position.set(0.95, 0.74, 0);
    windshieldMesh.rotation.z = 0.35;
    boatGroup.add(cabinMesh, windshieldMesh);
    registerPartMesh('conves', cabinMesh);

    // ================= 6. VERDUGO (RUBBING STRAKE) =================
    const verdugoMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      roughness: 0.48,
      metalness: 0.35,
    });
    disposables.push(verdugoMat);

    for (const side of [1, -1] as const) {
      const verdPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 32; i++) {
        const u = i / 32;
        const pt = hullPoint(u, 0.995, side);
        verdPts.push(new THREE.Vector3(pt.x, pt.y - 0.02, pt.z * 1.028));
      }
      const verdCurve = new THREE.CatmullRomCurve3(verdPts);
      const verdGeo = new THREE.TubeGeometry(verdCurve, 40, 0.032, 8, false);
      disposables.push(verdGeo);
      const verdMesh = new THREE.Mesh(verdGeo, verdugoMat);
      boatGroup.add(verdMesh);
      registerPartMesh('verdugo', verdMesh);
    }

    // ================= 7. BALAÚSTRES & VERGUEIROS (STANCHIONS + LIFELINES) =================
    const stanchionMat = new THREE.MeshStandardMaterial({
      color: '#cbd5e1',
      roughness: 0.25,
      metalness: 0.85,
    });
    disposables.push(stanchionMat);

    const postGeo = new THREE.CylinderGeometry(0.018, 0.022, 0.34, 8);
    disposables.push(postGeo);
    const stanchionStations = [0.1, 0.24, 0.38, 0.52, 0.66, 0.8, 0.92];

    for (const side of [1, -1] as const) {
      const upperRailPts: THREE.Vector3[] = [];
      const lowerRailPts: THREE.Vector3[] = [];

      stanchionStations.forEach((u) => {
        const edge = hullPoint(u, 1, side);
        const post = new THREE.Mesh(postGeo, stanchionMat);
        post.position.set(edge.x, edge.y + 0.16, edge.z * 0.96);
        boatGroup.add(post);
        registerPartMesh('balaustres', post);

        upperRailPts.push(new THREE.Vector3(edge.x, edge.y + 0.31, edge.z * 0.96));
        lowerRailPts.push(new THREE.Vector3(edge.x, edge.y + 0.16, edge.z * 0.96));
      });

      [upperRailPts, lowerRailPts].forEach((pts) => {
        const rCurve = new THREE.CatmullRomCurve3(pts);
        const rGeo = new THREE.TubeGeometry(rCurve, 28, 0.012, 6, false);
        disposables.push(rGeo);
        const rMesh = new THREE.Mesh(rGeo, stanchionMat);
        boatGroup.add(rMesh);
        registerPartMesh('balaustres', rMesh);
      });
    }

    // ================= 8. ESCOVÉM (BOW HAWSEHOLES ON PORT & STARBOARD) =================
    const hawseMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.3,
      metalness: 0.8,
    });
    const hawseHoleMat = new THREE.MeshStandardMaterial({
      color: '#0f172a',
      roughness: 0.8,
      metalness: 0.1,
    });
    const hawseTorusGeo = new THREE.TorusGeometry(0.072, 0.022, 10, 20);
    const hawseDiscGeo = new THREE.CylinderGeometry(0.056, 0.056, 0.03, 16);
    disposables.push(hawseMat, hawseHoleMat, hawseTorusGeo, hawseDiscGeo);

    for (const side of [1, -1] as const) {
      const hp = hullPoint(0.84, 0.82, side);
      const escGroup = new THREE.Group();
      escGroup.position.set(hp.x, hp.y, hp.z * 1.015);
      // Align gently with forward bow curve
      escGroup.rotation.y = side * 0.42;

      const collar = new THREE.Mesh(hawseTorusGeo, hawseMat);
      const hole = new THREE.Mesh(hawseDiscGeo, hawseHoleMat);
      hole.rotation.x = Math.PI * 0.5;
      escGroup.add(collar, hole);
      boatGroup.add(escGroup);
      registerPartMesh('escovem', collar);
      registerPartMesh('escovem', hole);
    }

    // ================= 9. LEME (PORTA + MADRE + CACHOLA/CANA) =================
    const rudderBladeMat = new THREE.MeshStandardMaterial({
      color: '#334155',
      roughness: 0.42,
      metalness: 0.3,
    });
    const tillerMat = new THREE.MeshStandardMaterial({
      color: '#9a7413',
      roughness: 0.35,
      metalness: 0.45,
    });
    disposables.push(rudderBladeMat, tillerMat);

    const rudderShape = new THREE.Shape();
    rudderShape.moveTo(0, 0.04);
    rudderShape.lineTo(0.05, -0.70);
    rudderShape.lineTo(-0.34, -0.66);
    rudderShape.quadraticCurveTo(-0.42, -0.35, -0.22, 0.02);
    rudderShape.closePath();

    const rudderBladeGeo = new THREE.ExtrudeGeometry(rudderShape, {
      depth: 0.055,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
    });
    rudderBladeGeo.translate(0, 0, -0.0275);
    const rudderShaftGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.78, 12);
    const tillerGeo = new THREE.CylinderGeometry(0.022, 0.028, 0.82, 10);
    tillerGeo.rotateZ(Math.PI * 0.5);
    disposables.push(rudderBladeGeo, rudderShaftGeo, tillerGeo);

    const rudderGroup = new THREE.Group();
    rudderGroup.position.set(-2.90, 0.02, 0);
    const bladeMesh = new THREE.Mesh(rudderBladeGeo, rudderBladeMat);
    const shaftMesh = new THREE.Mesh(rudderShaftGeo, stanchionMat);
    shaftMesh.position.set(-0.02, 0.34, 0);
    const tillerMesh = new THREE.Mesh(tillerGeo, tillerMat);
    tillerMesh.position.set(0.36, 0.72, 0);
    tillerMesh.rotation.z = 0.06;
    rudderGroup.add(bladeMesh, shaftMesh, tillerMesh);
    boatGroup.add(rudderGroup);
    registerPartMesh('leme', bladeMesh);
    registerPartMesh('leme', shaftMesh);
    registerPartMesh('leme', tillerMesh);

    // ================= 10. ROBALETES (BILGE KEELS ON LOWER QUERENA) =================
    const robaleteMat = new THREE.MeshStandardMaterial({
      color: '#0f2f42',
      roughness: 0.45,
      metalness: 0.2,
    });
    const robaleteGeo = new THREE.BoxGeometry(2.15, 0.04, 0.14);
    disposables.push(robaleteMat, robaleteGeo);

    for (const side of [1, -1] as const) {
      const midBilge = hullPoint(0.42, 0.25, side);
      const robMesh = new THREE.Mesh(robaleteGeo, robaleteMat);
      robMesh.position.set(-0.2, midBilge.y - 0.01, midBilge.z + side * 0.04);
      robMesh.rotation.x = side * 0.65;
      boatGroup.add(robMesh);
      registerPartMesh('robaletes', robMesh);
    }

    // ================= 11. ANIMATED SEA WITH SMALL WAVES =================
    const waterGroup = new THREE.Group();
    scene.add(waterGroup);

    const waveUniforms = {
      uWaveTime: { value: 0 },
    };

    const seaGeo = buildSubdividedSeaDisc(20, 44, 72);
    const seaMat = new THREE.MeshStandardMaterial({
      color: '#5ba9d6',
      roughness: 0.16,
      metalness: 0.14,
      transparent: true,
      opacity: 0.50,
      depthWrite: false,
    });
    seaMat.onBeforeCompile = (shader) => {
      shader.uniforms.uWaveTime = waveUniforms.uWaveTime;
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
           uniform float uWaveTime;`
        )
        .replace(
          '#include <beginnormal_vertex>',
          `#include <beginnormal_vertex>
           float wDistN = length(position.xz);
           float wAttenN = 1.0 - smoothstep(10.0, 19.0, wDistN);
           float wDhDx = (
             1.45 * cos(position.x * 1.45 + position.z * 0.65 + uWaveTime * 1.15) * 0.019
             - 0.85 * sin(position.x * 0.85 - position.z * 1.35 + uWaveTime * 0.90) * 0.014
             + 2.25 * cos((position.x + position.z) * 2.25 - uWaveTime * 1.55) * 0.008
           ) * wAttenN;
           float wDhDz = (
             0.65 * cos(position.x * 1.45 + position.z * 0.65 + uWaveTime * 1.15) * 0.019
             + 1.35 * sin(position.x * 0.85 - position.z * 1.35 + uWaveTime * 0.90) * 0.014
             + 2.25 * cos((position.x + position.z) * 2.25 - uWaveTime * 1.55) * 0.008
           ) * wAttenN;
           objectNormal = normalize(vec3(-wDhDx, 1.0, -wDhDz));`
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           float wDist = length(position.xz);
           float wAtten = 1.0 - smoothstep(10.0, 19.0, wDist);
           float w1 = sin(position.x * 1.45 + position.z * 0.65 + uWaveTime * 1.15) * 0.019;
           float w2 = cos(position.x * 0.85 - position.z * 1.35 + uWaveTime * 0.90) * 0.014;
           float w3 = sin((position.x + position.z) * 2.25 - uWaveTime * 1.55) * 0.008;
           transformed.y += (w1 + w2 + w3) * wAtten;`
        );
    };
    disposables.push(seaGeo, seaMat);
    const seaMesh = new THREE.Mesh(seaGeo, seaMat);
    seaMesh.position.y = -0.042;
    seaMesh.renderOrder = 1;
    seaMesh.receiveShadow = !isSoftwareGl;
    waterGroup.add(seaMesh);

    // ================= 12. WATERLINE POINTER ARROWS (SHOWN WHEN WATER IS OFF) =================
    const waterlinePointerGroup = new THREE.Group();
    waterlinePointerGroup.visible = !showWaterRef.current;
    boatGroup.add(waterlinePointerGroup);

    const arrowMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#0284c7',
      emissiveIntensity: 0.25,
      roughness: 0.3,
      metalness: 0.15,
    });
    const arrowConeGeo = new THREE.ConeGeometry(0.048, 0.13, 14);
    const arrowShaftGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.32, 10);
    disposables.push(arrowMat, arrowConeGeo, arrowShaftGeo);

    const wlAnchorPt = hullPoint(0.54, waterlineVAtStation(0.54), 1);
    for (const side of [1, -1] as const) {
      const tipPos = new THREE.Vector3(wlAnchorPt.x, 0.015, side * (wlAnchorPt.z * 1.015 + 0.07));
      const tailPos = new THREE.Vector3(wlAnchorPt.x, 0.16, side * (wlAnchorPt.z * 1.015 + 0.48));
      const dir = new THREE.Vector3().subVectors(tipPos, tailPos).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

      const head = new THREE.Mesh(arrowConeGeo, arrowMat);
      head.position.copy(tipPos).addScaledVector(dir, -0.06);
      head.quaternion.copy(quat);

      const shaft = new THREE.Mesh(arrowShaftGeo, arrowMat);
      shaft.position.copy(tipPos).addScaledVector(dir, -0.27);
      shaft.quaternion.copy(quat);

      const ptrLabel = createSubtleCaptionSprite('Nível da água', '#0369a1');
      ptrLabel.position.set(wlAnchorPt.x, 0.25, side * (wlAnchorPt.z * 1.015 + 0.66));
      ptrLabel.renderOrder = 10;
      if (ptrLabel.material.map) disposables.push(ptrLabel.material.map);
      disposables.push(ptrLabel.material);

      waterlinePointerGroup.add(head, shaft, ptrLabel);
      registerPartMesh('linha-de-agua', head);
      registerPartMesh('linha-de-agua', shaft);
    }

    // ================= 13. 3D ARCHITECTURAL DIMENSIONS (COTAS 3D) =================
    const dimGroup = new THREE.Group();
    dimGroup.visible = showDimensionsRef.current;
    boatGroup.add(dimGroup);

    const addDimensionBracket = (
      partId: Boat3DPartId,
      pA: THREE.Vector3,
      pB: THREE.Vector3,
      colorHex: string,
      labelText: string,
      labelOffset: THREE.Vector3
    ) => {
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.2,
        roughness: 0.3,
      });
      disposables.push(mat);

      const dir = new THREE.Vector3().subVectors(pB, pA);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);

      const barGeo = new THREE.CylinderGeometry(0.022, 0.022, len, 8);
      const capGeo = new THREE.SphereGeometry(0.055, 10, 10);
      disposables.push(barGeo, capGeo);

      const bar = new THREE.Mesh(barGeo, mat);
      bar.position.copy(mid);
      bar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

      const capA = new THREE.Mesh(capGeo, mat);
      capA.position.copy(pA);
      const capB = new THREE.Mesh(capGeo, mat);
      capB.position.copy(pB);

      const labelSprite = createWaterRingLabelSprite(labelText, colorHex, '#fcfbf8');
      labelSprite.position.copy(mid).add(labelOffset);
      labelSprite.scale.set(1.15, 0.32, 1);
      labelSprite.renderOrder = 10;
      if (labelSprite.material.map) disposables.push(labelSprite.material.map);
      disposables.push(labelSprite.material);

      dimGroup.add(bar, capA, capB, labelSprite);
      registerPartMesh(partId, bar);
      registerPartMesh(partId, capA);
      registerPartMesh(partId, capB);
    };

    // Comprimento (Cadaste -2.85 to Roda de Proa +3.35 at lower side offset Z=+1.52)
    addDimensionBracket(
      'comprimento',
      new THREE.Vector3(-2.85, -0.82, 1.52),
      new THREE.Vector3(3.35, -0.82, 1.52),
      '#0b3a55',
      'COMPRIMENTO',
      new THREE.Vector3(0, -0.22, 0)
    );
    // Boca (-1.18 to +1.18 at midships above deck)
    addDimensionBracket(
      'boca',
      new THREE.Vector3(0.0, 1.28, -1.18),
      new THREE.Vector3(0.0, 1.28, 1.18),
      '#9a7413',
      'BOCA',
      new THREE.Vector3(0, 0.25, 0)
    );
    // Pontal (Keel -0.68 up to Gunwale +0.62 — label raised well above waterline!)
    addDimensionBracket(
      'pontal',
      new THREE.Vector3(-0.35, -0.68, 1.38),
      new THREE.Vector3(-0.35, 0.62, 1.38),
      '#0b3a55',
      'PONTAL',
      new THREE.Vector3(0, 0.47, 0.68)
    );
    // Calado (Waterline 0.0 down to Keel -0.74 near Proa)
    addDimensionBracket(
      'calado',
      new THREE.Vector3(1.55, 0.0, 1.28),
      new THREE.Vector3(1.55, -0.74, 1.28),
      '#0284c7',
      'CALADO',
      new THREE.Vector3(0, 0, 0.68)
    );

    // ================= HIGHLIGHT & VISIBILITY CONTROLLERS =================
    const updatePartHighlight = () => {
      const sel = selectedPartRef.current;
      const hov = hoveredPartRef.current;
      partMaterials.forEach((entries, partId) => {
        const isSel = partId === sel;
        const isHov = partId === hov && !isSel;
        entries.forEach(({ mat, baseEmissive, baseEmissiveIntensity }) => {
          if (isSel) {
            mat.emissive.set('#f59e0b');
            mat.emissiveIntensity = 0.72;
          } else if (isHov) {
            mat.emissive.set('#d97706');
            mat.emissiveIntensity = 0.42;
          } else {
            mat.emissive.copy(baseEmissive);
            mat.emissiveIntensity = baseEmissiveIntensity;
          }
        });
      });
    };

    let targetShellOpacity = showCutawayRef.current ? 0.22 : 1.0;
    let currentShellOpacity = targetShellOpacity;
    let targetDeckOpacity = showCutawayRef.current ? 0.16 : 1.0;
    let currentDeckOpacity = targetDeckOpacity;

    const applyShellOpacity = (hullOp: number, deckOp: number) => {
      costadoMat.opacity = hullOp;
      costadoMat.depthWrite = hullOp > 0.92;
      querenaMat.opacity = hullOp;
      querenaMat.depthWrite = hullOp > 0.92;
      transomMat.opacity = hullOp;
      transomMat.depthWrite = hullOp > 0.92;

      deckMat.opacity = deckOp;
      deckMat.depthWrite = deckOp > 0.92;
      cabinMat.opacity = deckOp;
      cabinMat.depthWrite = deckOp > 0.92;
    };

    const updateVisibility = () => {
      targetShellOpacity = showCutawayRef.current ? 0.22 : 1.0;
      targetDeckOpacity = showCutawayRef.current ? 0.16 : 1.0;
      waterGroup.visible = showWaterRef.current;
      waterlinePointerGroup.visible = !showWaterRef.current;
      dimGroup.visible = showDimensionsRef.current;
    };

    updatePartHighlight();
    updateVisibility();
    applyShellOpacity(currentShellOpacity, currentDeckOpacity);

    // ================= CAMERA TRANSITION + WAVE ANIMATION RENDER LOOP =================
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let cameraTransition: {
      pos: THREE.Vector3;
      target: THREE.Vector3;
    } | null = null;

    let rafId: number | null = null;
    let timeoutId: number | null = null;
    let renderScheduled = false;
    let lastTickTime = performance.now();
    let lastDrawCompleteAt = 0;
    const startTime = performance.now();

    const afterDraw = () => {
      const gl = renderer.getContext();
      if (isSoftwareGl && gl) {
        if ('fenceSync' in gl) {
          const gl2 = gl as WebGL2RenderingContext;
          const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
          if (sync) {
            gl2.flush();
            gl2.deleteSync(sync);
          }
        }
        lastDrawCompleteAt = performance.now();
      }
    };

    const renderTick = (now: number) => {
      rafId = null;
      renderScheduled = false;

      if (isSoftwareGl && now - lastDrawCompleteAt < 80) {
        timeoutId = window.setTimeout(() => {
          timeoutId = null;
          requestRender();
        }, 80);
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, (now - lastTickTime) / 1000));
      lastTickTime = now;

      let stillAnimating = false;

      // Gentle small sea waves animation while water is enabled
      if (showWaterRef.current && !prefersReducedMotion) {
        waveUniforms.uWaveTime.value = (now - startTime) * 0.001;
        stillAnimating = true;
      }

      if (cameraTransition) {
        const lambda = isSoftwareGl ? 18 : 7.5;
        camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraTransition.pos.x, lambda, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraTransition.pos.y, lambda, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTransition.pos.z, lambda, dt);

        controls.target.x = THREE.MathUtils.damp(controls.target.x, cameraTransition.target.x, lambda, dt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, cameraTransition.target.y, lambda, dt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, cameraTransition.target.z, lambda, dt);

        if (
          camera.position.distanceTo(cameraTransition.pos) < 0.015 &&
          controls.target.distanceTo(cameraTransition.target) < 0.01
        ) {
          camera.position.copy(cameraTransition.pos);
          controls.target.copy(cameraTransition.target);
          cameraTransition = null;
        } else {
          stillAnimating = true;
        }
      }

      if (
        Math.abs(currentShellOpacity - targetShellOpacity) > 0.005 ||
        Math.abs(currentDeckOpacity - targetDeckOpacity) > 0.005
      ) {
        const lambda = isSoftwareGl ? 24 : 9.0;
        currentShellOpacity = THREE.MathUtils.damp(currentShellOpacity, targetShellOpacity, lambda, dt);
        currentDeckOpacity = THREE.MathUtils.damp(currentDeckOpacity, targetDeckOpacity, lambda, dt);
        applyShellOpacity(currentShellOpacity, currentDeckOpacity);
        stillAnimating = true;
      } else if (
        currentShellOpacity !== targetShellOpacity ||
        currentDeckOpacity !== targetDeckOpacity
      ) {
        currentShellOpacity = targetShellOpacity;
        currentDeckOpacity = targetDeckOpacity;
        applyShellOpacity(currentShellOpacity, currentDeckOpacity);
      }

      const controlsMoved = controls.update();
      renderer.render(scene, camera);
      afterDraw();

      if (stillAnimating || (controlsMoved && !isSoftwareGl)) {
        requestRender();
      }
    };

    const requestRender = () => {
      if (renderScheduled || timeoutId !== null) return;
      renderScheduled = true;
      lastTickTime = performance.now();
      rafId = requestAnimationFrame(renderTick);
    };

    const goToPreset = (presetKey: CameraPresetKey) => {
      const cfg = CAMERA_PRESETS[presetKey];
      cameraTransition = {
        pos: new THREE.Vector3(...cfg.pos),
        target: new THREE.Vector3(...cfg.target),
      };
      requestRender();
    };

    sceneApiRef.current = {
      requestRender,
      goToPreset,
      updatePartHighlight,
      updateVisibility,
    };

    const onControlsStart = () => {
      cameraTransition = null;
      requestRender();
    };
    const onControlsChange = () => {
      requestRender();
    };
    controls.addEventListener('start', onControlsStart);
    controls.addEventListener('change', onControlsChange);

    // ================= POINTER CLICK/TAP VS HORIZONTAL DRAG RAYCASTING =================
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let downPos: { x: number; y: number } | null = null;
    let lastHoverCheck = 0;

    const pickPartAtClientPos = (clientX: number, clientY: number): Boat3DPartId | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(clickableMeshes, false);
      for (const hit of hits) {
        // Ignore hidden dimensions group when Cotas 3D are turned off
        if (!showDimensionsRef.current && dimGroup.children.includes(hit.object)) {
          continue;
        }
        // Ignore hidden waterline pointer arrow when water surface is visible
        if (showWaterRef.current && waterlinePointerGroup.children.includes(hit.object)) {
          continue;
        }
        // In cutaway mode, skip faded outer shell if a crisp internal baliza/keel lies behind it!
        const pid = hit.object.userData.partId as Boat3DPartId | undefined;
        if (
          showCutawayRef.current &&
          (pid === 'costado' || pid === 'querena' || pid === 'conves' || pid === 'painel-de-popa')
        ) {
          const deeperInterior = hits.find((h) => {
            const dPid = h.object.userData.partId as Boat3DPartId | undefined;
            return (
              dPid === 'balizas' ||
              dPid === 'quilha' ||
              dPid === 'roda-de-proa' ||
              dPid === 'cadaste'
            );
          });
          if (deeperInterior) {
            return deeperInterior.object.userData.partId as Boat3DPartId;
          }
        }
        if (pid) return pid;
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.buttons !== 0) return;
      const now = performance.now();
      if (now - lastHoverCheck < 55) return;
      lastHoverCheck = now;
      const hitId = pickPartAtClientPos(e.clientX, e.clientY);
      renderer.domElement.style.cursor = hitId ? 'pointer' : 'grab';
      if (hitId !== hoveredPartRef.current) {
        setHoveredPart(hitId);
      }
    };

    const onPointerLeave = () => {
      renderer.domElement.style.cursor = 'grab';
      if (hoveredPartRef.current !== null) {
        setHoveredPart(null);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!downPos) return;
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      downPos = null;
      if (dist < 6) {
        const hitId = pickPartAtClientPos(e.clientX, e.clientY);
        if (hitId) {
          setSelectedPart(hitId);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // ================= RESIZE & WEBGL CONTEXT HANDLING =================
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(Math.floor(entry.contentRect.width), 280);
      const h = Math.max(Math.floor(entry.contentRect.height), 280);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    });
    ro.observe(container);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
      requestRender();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    // Initial render
    requestRender();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      ro.disconnect();
      controls.removeEventListener('start', onControlsStart);
      controls.removeEventListener('change', onControlsChange);
      controls.dispose();

      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneApiRef.current = null;
    };
  }, []);

  const visibleButtons =
    activeGroup === 'todos'
      ? BOAT_3D_PART_LIST
      : BOAT_3D_PART_LIST.filter((p) => p.group === activeGroup);

  const activeBadgeLabel = hoveredPart
    ? BOAT_3D_PARTS[hoveredPart].name
    : BOAT_3D_PARTS[selectedPart].name;

  return (
    <div className="space-y-6">
      <section className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 sm:p-7 shadow-xs">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#d7d0c1]">
          <div>
            <div className="flex items-center gap-2 font-mono-naut text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a7413]">
              <Box className="w-4 h-4 text-[#9a7413]" />
              <span>Modelo 3D Interativo · Manual PP. 4–6</span>
            </div>
            <h3 className="font-maritime text-2xl sm:text-3xl font-bold text-[#0b3a55] mt-1">
              Embarcação 3D Interativa (360°)
            </h3>
            <p className="text-xs sm:text-sm text-[#4f6e82] mt-1">
              Arraste na horizontal para rodar 360°, faça zoom com dois dedos ou roda do rato e clique/toque em qualquer peça para explorar a nomenclatura.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActivePreset('iso');
              sceneApiRef.current?.goToPreset('iso');
            }}
            className="inline-flex items-center gap-1.5 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de] transition cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#9a7413]" />
            <span>Repor Vista</span>
          </button>
        </div>

        {/* 3D Viewport Container */}
        <div className="mt-4 relative rounded-xs border border-[#0b3a55]/30 overflow-hidden bg-[#dceef9] h-[420px] sm:h-[490px]">
          {/* Isolated WebGL canvas host */}
          <div ref={mountRef} className="w-full h-full" />

          {/* Context loss safeguard */}
          {contextLost && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#faf7f0]/95 p-6 text-center z-20">
              <div className="max-w-sm">
                <p className="font-maritime text-xl font-bold text-[#0b3a55]">
                  Contexto gráfico interrompido
                </p>
                <p className="mt-1 text-xs text-[#4f6e82]">
                  O navegador suspendeu temporariamente o renderizador WebGL 3D.
                </p>
              </div>
            </div>
          )}

          {/* Minimal Top-Left Part Indicator */}
          <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-xs border border-[#d7d0c1] bg-[#faf7f0]/95 px-3 py-1.5 shadow-xs">
            <div className="font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413]">
              {hoveredPart ? 'Sob o cursor' : 'Peça selecionada'}
            </div>
            <div className="font-maritime text-sm sm:text-base font-bold text-[#0b3a55] leading-tight">
              {activeBadgeLabel}
            </div>
          </div>

          {/* Single Collapsible Bottom Control Dock (Zero backdrop-blur over WebGL) */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col items-center pointer-events-none">
            <div className="pointer-events-auto max-w-full rounded-xs border border-[#d7d0c1] bg-[#faf7f0]/95 px-2.5 py-2 shadow-xs">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {!controlsCollapsed && (
                  <>
                    {/* Camera Presets */}
                    {(
                      Object.keys(CAMERA_PRESETS) as CameraPresetKey[]
                    ).map((key) => {
                      const active = activePreset === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setActivePreset(key);
                            sceneApiRef.current?.goToPreset(key);
                          }}
                          className={`rounded-xs border px-2.5 py-1 font-mono-naut text-[10px] uppercase tracking-wider font-medium transition cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                              : 'bg-[#fcfbf8] text-[#4f6e82] border-[#d7d0c1] hover:border-[#0b3a55] hover:text-[#0b3a55]'
                          }`}
                        >
                          {CAMERA_PRESETS[key].label}
                        </button>
                      );
                    })}

                    <span className="h-4 w-px bg-[#d7d0c1] mx-0.5 hidden sm:inline-block" aria-hidden="true" />

                    {/* Structural Cutaway Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowCutaway((prev) => !prev)}
                      className={`inline-flex items-center gap-1 rounded-xs border px-2.5 py-1 font-mono-naut text-[10px] uppercase tracking-wider font-medium transition cursor-pointer whitespace-nowrap ${
                        showCutaway
                          ? 'bg-[#9a7413] text-[#faf7f0] border-[#9a7413]'
                          : 'bg-[#fcfbf8] text-[#0b3a55] border-[#d7d0c1] hover:border-[#0b3a55]'
                      }`}
                    >
                      {showCutaway ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>Corte (Balizas)</span>
                    </button>

                    {/* Water Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowWater((prev) => !prev)}
                      className={`inline-flex items-center gap-1 rounded-xs border px-2.5 py-1 font-mono-naut text-[10px] uppercase tracking-wider font-medium transition cursor-pointer whitespace-nowrap ${
                        showWater
                          ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                          : 'bg-[#fcfbf8] text-[#4f6e82] border-[#d7d0c1] hover:border-[#0b3a55]'
                      }`}
                    >
                      <Waves className="w-3 h-3" />
                      <span>Água</span>
                    </button>

                    {/* 3D Dimensions Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowDimensions((prev) => !prev)}
                      className={`inline-flex items-center gap-1 rounded-xs border px-2.5 py-1 font-mono-naut text-[10px] uppercase tracking-wider font-medium transition cursor-pointer whitespace-nowrap ${
                        showDimensions
                          ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                          : 'bg-[#fcfbf8] text-[#4f6e82] border-[#d7d0c1] hover:border-[#0b3a55]'
                      }`}
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Cotas 3D</span>
                    </button>
                  </>
                )}

                {/* Collapse / Expand toggle */}
                <button
                  type="button"
                  onClick={() => setControlsCollapsed((prev) => !prev)}
                  className="inline-flex items-center gap-1 rounded-xs border border-[#d7d0c1] bg-[#ede9de] px-2 py-1 font-mono-naut text-[10px] uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] transition cursor-pointer whitespace-nowrap"
                  aria-label={controlsCollapsed ? 'Mostrar controlos 3D' : 'Ocultar controlos 3D'}
                >
                  {controlsCollapsed ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      <span>Controlos 3D</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      <span>Ocultar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Below 3D Canvas) */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {(
            [
              { key: 'todos', label: `Todos (${BOAT_3D_PART_LIST.length})` },
              { key: 'estrutura', label: 'Casco & Estrutura (8)' },
              { key: 'aparelho', label: 'Convés & Aparelho (6)' },
              { key: 'dimensoes', label: 'Dimensões Principais (4)' },
            ] as { key: 'todos' | PartGroup3D; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveGroup(tab.key)}
              className={`rounded-xs border px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium transition whitespace-nowrap shrink-0 cursor-pointer ${
                activeGroup === tab.key
                  ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                  : 'bg-[#faf7f0] text-[#4f6e82] border-[#d7d0c1] hover:border-[#0b3a55] hover:text-[#0b3a55] hover:bg-[#ede9de]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Quick-Select Grid */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleButtons.map((part) => {
            const active = selectedPart === part.id;
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => handleSelectPartUI(part.id)}
                className={`rounded-xs border px-2.5 py-1.5 font-mono-naut text-[11px] font-medium transition cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                    : 'bg-[#faf7f0] text-[#0b3a55] border-[#d7d0c1] hover:border-[#0b3a55] hover:bg-[#ede9de]'
                }`}
              >
                {part.name}
              </button>
            );
          })}
        </div>

        {/* Selected Part Exhibit Plaque */}
        <div className="mt-5 rounded-xs bg-[#faf7f0] p-5 sm:p-6 border border-[#d7d0c1]">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#d7d0c1]">
            <div>
              <div className="flex items-center gap-2 font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413]">
                <span>{currentInfo.pageRef}</span>
                <span aria-hidden="true">·</span>
                <span>{currentInfo.zoneLabel}</span>
              </div>
              <h4 className="font-maritime text-2xl font-bold text-[#0b3a55] mt-0.5">
                {currentInfo.name}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSpeak(currentInfo.name)}
                className={`rounded-xs p-2 border transition cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#0b3a55] border-[#0b3a55] text-[#faf7f0]'
                    : 'bg-[#fcfbf8] border-[#d7d0c1] text-[#4f6e82] hover:text-[#0b3a55] hover:border-[#0b3a55]'
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
                  className="inline-flex items-center gap-1.5 rounded-xs border border-[#0b3a55] bg-[#0b3a55] px-3 py-2 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Abrir Carta</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ca9e1c]" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm sm:text-base text-[#0b3a55]/90 leading-relaxed">
              <GlossaryText
                text={currentInfo.definition}
                allTerms={allTerms}
                onSelectTerm={handleOpenTermModal}
              />
            </p>

            <div className="flex items-start gap-2.5 p-3.5 rounded-xs bg-[#f0e8cf]/65 border border-[#ca9e1c]/40 text-xs text-[#0b3a55]">
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
