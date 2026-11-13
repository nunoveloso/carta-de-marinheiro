import React, { useState } from 'react';
import { NauticalTerm } from '../types/glossary';
import { Anchor, AlertCircle, ArrowRight, Eye, Info } from 'lucide-react';

interface DayShapesIllustrationProps {
  termId: string;
  variant?: 'card' | 'modal';
  onSelectTerm?: (term: NauticalTerm) => void;
  allTerms?: NauticalTerm[];
}

export const DayShapesIllustration: React.FC<DayShapesIllustrationProps> = ({
  termId,
  variant = 'card',
  onSelectTerm,
  allTerms = [],
}) => {
  const [selectedSubView, setSelectedSubView] = useState<'default' | 'config'>('default');

  // Map of the 4 day shapes
  const shapes = [
    {
      id: 'balao-esferico',
      name: 'Balão Esférico',
      shortName: 'Esférico',
      symbol: 'Esfera',
      rule: 'Fundeado / Desgovernado / Encalhado',
      desc: '1 balão = Fundeado; 2 balões = Desgovernado; 3 balões = Encalhado',
      examHighlight: '1 esfera a vante = navio fundeado',
    },
    {
      id: 'balao-conico',
      name: 'Balão Cónico',
      shortName: 'Cónico',
      symbol: 'Cone (Vértice ↓)',
      rule: 'Vela e Motor em simultâneo',
      desc: 'Cone com vértice para baixo içado a vante quando navega à vela e a motor',
      examHighlight: 'Vértice para baixo = Vela + Motor',
    },
    {
      id: 'balao-cilindrico',
      name: 'Balão Cilíndrico',
      shortName: 'Cilíndrico',
      symbol: 'Cilindro',
      rule: 'Condicionado pelo Calado',
      desc: 'Exibido onde melhor possa ser visto por navio com calado restrito (Regra 28)',
      examHighlight: 'Cilindro preto = Calado condicionado',
    },
    {
      id: 'balao-biconico',
      name: 'Balão Bicónico',
      shortName: 'Bicónico',
      symbol: 'Bicone / Losango',
      rule: 'Reboque > 200 metros',
      desc: 'Dois cones unidos pela base exibidos quando o reboque excede 200m',
      examHighlight: 'Dois cones unidos pela base = Reboque > 200m',
    },
  ];

  // Helper to render the SVG of a specific shape
  const renderShapeSVG = (
    type: 'esferico' | 'conico' | 'cilindrico' | 'biconico',
    size = 70
  ) => {
    switch (type) {
      case 'esferico':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="overflow-visible drop-shadow-md"
            aria-label="Balão esférico preto"
          >
            {/* Rigging stay line */}
            <line x1="50" y1="0" x2="50" y2="100" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" />
            {/* Top shackle ring */}
            <circle cx="50" cy="22" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
            {/* Sphere gradient definition */}
            <defs>
              <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </radialGradient>
            </defs>
            {/* Sphere */}
            <circle cx="50" cy="52" r="26" fill="url(#sphereGrad)" stroke="#090d16" strokeWidth="1" />
            {/* Subtle 3D shadow highlight */}
            <ellipse cx="44" cy="42" rx="10" ry="7" fill="#ffffff" fillOpacity="0.12" />
            {/* Bottom shackle ring */}
            <circle cx="50" cy="80" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
          </svg>
        );

      case 'conico':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="overflow-visible drop-shadow-md"
            aria-label="Balão cónico preto com vértice para baixo"
          >
            {/* Rigging stay line */}
            <line x1="50" y1="0" x2="50" y2="100" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" />
            {/* Top shackle */}
            <circle cx="50" cy="18" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
            <defs>
              <linearGradient id="coneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="35%" stopColor="#475569" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
            </defs>
            {/* Cone pointing DOWN */}
            <polygon points="20,26 80,26 50,80" fill="url(#coneGrad)" stroke="#090d16" strokeWidth="1" />
            {/* Top base ellipse */}
            <ellipse cx="50" cy="26" rx="30" ry="5.5" fill="#334155" stroke="#090d16" strokeWidth="1" />
            {/* Bottom shackle ring */}
            <circle cx="50" cy="84" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
          </svg>
        );

      case 'cilindrico':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="overflow-visible drop-shadow-md"
            aria-label="Balão cilíndrico preto"
          >
            {/* Rigging stay line */}
            <line x1="50" y1="0" x2="50" y2="100" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" />
            {/* Top shackle */}
            <circle cx="50" cy="14" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
            <defs>
              <linearGradient id="cylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="30%" stopColor="#475569" />
                <stop offset="75%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
            </defs>
            {/* Cylinder body */}
            <rect x="30" y="22" width="40" height="56" fill="url(#cylinderGrad)" stroke="#090d16" strokeWidth="1" />
            {/* Bottom rounded base */}
            <ellipse cx="50" cy="78" rx="20" ry="6" fill="#1e293b" stroke="#090d16" strokeWidth="1" />
            {/* Top rim ellipse */}
            <ellipse cx="50" cy="22" rx="20" ry="6" fill="#334155" stroke="#090d16" strokeWidth="1" />
            {/* Bottom shackle */}
            <circle cx="50" cy="88" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
          </svg>
        );

      case 'biconico':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="overflow-visible drop-shadow-md"
            aria-label="Balão bicónico preto / losango"
          >
            {/* Rigging stay line */}
            <line x1="50" y1="0" x2="50" y2="100" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" />
            {/* Top shackle */}
            <circle cx="50" cy="14" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
            <defs>
              <linearGradient id="biconeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="35%" stopColor="#475569" />
                <stop offset="75%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
            </defs>
            {/* Diamond / Two Cones Base-to-Base */}
            <polygon points="50,18 80,50 50,82 20,50" fill="url(#biconeGrad)" stroke="#090d16" strokeWidth="1" />
            {/* Equator junction seam */}
            <line x1="20" y1="50" x2="80" y2="50" stroke="#090d16" strokeWidth="1.5" strokeOpacity="0.8" />
            <ellipse cx="50" cy="50" rx="30" ry="4" fill="none" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2 2" />
            {/* Highlight facet */}
            <polygon points="50,18 50,82 20,50" fill="#ffffff" fillOpacity="0.08" />
            {/* Bottom shackle */}
            <circle cx="50" cy="88" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
          </svg>
        );
    }
  };

  // ----------------------------------------------------
  // CASE 1: THE MAIN "BALÕES" (ALL 4 SHAPES)
  // ----------------------------------------------------
  if (termId === 'baloes-de-navegacao') {
    if (variant === 'card') {
      return (
        <div className="mt-3.5 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-3 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono-naut font-medium text-[#0b3a55] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-xs bg-[#0b3a55]"></span>
              As 4 Marcas Diurnas Oficiais (RIEAM)
            </span>
            <span className="font-mono-naut text-[10px] text-[#4f6e82]">Toque para ver</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            {shapes.map((s) => {
              const svgType =
                s.id === 'balao-esferico'
                  ? 'esferico'
                  : s.id === 'balao-conico'
                  ? 'conico'
                  : s.id === 'balao-cilindrico'
                  ? 'cilindrico'
                  : 'biconico';

              return (
                <div
                  key={s.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    const target = allTerms.find((t) => t.id === s.id);
                    if (target && onSelectTerm) onSelectTerm(target);
                  }}
                  className="group/shape flex flex-col items-center justify-between rounded-xs bg-[#fcfbf8] p-2 border border-[#d7d0c1] hover:border-[#0b3a55] hover:bg-[#ede9de]/50 transition cursor-pointer"
                  title={`${s.name} - ${s.rule}`}
                >
                  <div className="h-14 flex items-center justify-center scale-90 group-hover/shape:scale-95 transition-transform">
                    {renderShapeSVG(svgType, 48)}
                  </div>
                  <span className="mt-1 font-bold text-[10px] text-[#0b3a55] leading-tight">
                    {s.shortName}
                  </span>
                  <span className="font-mono-naut text-[9px] text-[#4f6e82] leading-tight line-clamp-1 mt-0.5">
                    {s.symbol}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-2 text-[11px] text-[#0b3a55] bg-[#f0e8cf]/65 px-2.5 py-1.5 rounded-xs border border-[#ca9e1c]/40 leading-tight">
            <strong className="text-[#9a7413]">Exame:</strong> De cor preta, içadas de dia no mastro onde melhor possam ser vistas.
          </p>
        </div>
      );
    }

    // Modal detailed view for all 4 shapes
    return (
      <div className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1]">
          <div>
            <h4 className="text-sm font-bold text-[#0b3a55] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]"></span>
              As 4 Formas Geométricas dos Balões (Marcas Diurnas / RIEAM)
            </h4>
            <p className="text-xs text-[#4f6e82] mt-0.5">
              Todas as marcas são de cor preta mate, içadas durante o dia no aparelho onde melhor possam ser vistas.
            </p>
          </div>
          <span className="hidden sm:inline-block rounded-xs bg-[#0b3a55] px-2.5 py-1 font-mono-naut text-[11px] font-medium text-[#faf7f0] uppercase tracking-wider">
            4 Formas
          </span>
        </div>

        {/* 4 Shapes Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {shapes.map((s, index) => {
            const svgType =
              s.id === 'balao-esferico'
                ? 'esferico'
                : s.id === 'balao-conico'
                ? 'conico'
                : s.id === 'balao-cilindrico'
                ? 'cilindrico'
                : 'biconico';

            return (
              <div
                key={s.id}
                onClick={() => {
                  const target = allTerms.find((t) => t.id === s.id);
                  if (target && onSelectTerm) onSelectTerm(target);
                }}
                className="group relative flex flex-col justify-between rounded-xs bg-[#fcfbf8] p-3.5 border border-[#d7d0c1] hover:border-[#0b3a55] hover:shadow-[3px_3px_0_0_#0b3a55] transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px] text-[#4f6e82]">
                  <span className="font-mono-naut font-semibold text-[#9a7413]">0{index + 1}</span>
                  <span className="font-mono-naut text-[10px] text-[#0b3a55] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-medium">
                    Ver carta <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>

                <div className="my-2.5 flex justify-center items-center py-2 bg-[#faf7f0] rounded-xs border border-[#d7d0c1] group-hover:bg-[#ede9de]/60 transition">
                  <div className="group-hover:scale-105 transition-transform">
                    {renderShapeSVG(svgType, 72)}
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#0b3a55] group-hover:text-[#082b3f] transition-colors">
                    {s.name}
                  </h5>
                  <p className="mt-1 text-[11px] font-medium text-[#9a7413] leading-snug">
                    {s.rule}
                  </p>
                  <p className="mt-1 text-[10px] text-[#4f6e82] leading-relaxed line-clamp-2">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Reference Table for Exam */}
        <div className="mt-4 rounded-xs bg-[#f0e8cf]/65 p-3.5 border border-[#ca9e1c]/40 text-xs text-[#0b3a55]">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#9a7413] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#9a7413]">Regras Essenciais de Exame (RIEAM):</span>
              <ul className="mt-1.5 space-y-1 list-disc list-inside text-[11px] leading-relaxed">
                <li>
                  <strong>1 Esfera:</strong> Embarcação fundeada (exibida na parte de vante).
                </li>
                <li>
                  <strong>2 Esferas na vertical:</strong> Embarcação sem governo (desgovernada).
                </li>
                <li>
                  <strong>3 Esferas na vertical:</strong> Embarcação encalhada.
                </li>
                <li>
                  <strong>Cone com vértice para baixo:</strong> Barco a navegar à vela e com motor em simultâneo.
                </li>
                <li>
                  <strong>Cilindro:</strong> Embarcação condicionada pelo seu calado.
                </li>
                <li>
                  <strong>Bicónico (losango):</strong> Reboque de comprimento superior a 200 metros.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // CASE 2: INDIVIDUAL SHAPES
  // ----------------------------------------------------
  if (termId === 'balao-esferico') {
    if (variant === 'card') {
      return (
        <div className="mt-3 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-[#fcfbf8] p-1.5 rounded-xs border border-[#d7d0c1]">
              {renderShapeSVG('esferico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-[#0b3a55] block">Forma: Esfera Preta</span>
              <span className="text-[10px] text-[#4f6e82] block mt-0.5">
                • 1 Esfera = Fundeado<br />
                • 2 Esferas = Desgovernado<br />
                • 3 Esferas = Encalhado
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1]">
          <h4 className="text-sm font-bold text-[#0b3a55] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]"></span>
            Ilustração: Balão Esférico e Configurações RIEAM
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#9a7413] bg-[#f0e8cf] px-2.5 py-1 rounded-xs border border-[#ca9e1c]/40">
            Mais Frequente em Exame
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1 Ball: Anchored */}
          <div className="rounded-xs bg-[#fcfbf8] p-3.5 border border-[#d7d0c1] flex flex-col items-center text-center">
            <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#1e7d4f] bg-[#dcebe1] px-2 py-0.5 rounded-xs border border-[#1e7d4f]/30">
              1 Balão
            </span>
            <div className="my-2.5 h-24 flex items-center justify-center">
              {renderShapeSVG('esferico', 65)}
            </div>
            <h5 className="font-bold text-xs text-[#0b3a55]">Embarcação Fundeada</h5>
            <p className="text-[11px] text-[#4f6e82] mt-1 leading-snug">
              Exibido na parte de vante da embarcação.
            </p>
          </div>

          {/* 2 Balls: Not under command */}
          <div className="rounded-xs bg-[#fcfbf8] p-3.5 border border-[#d7d0c1] flex flex-col items-center text-center">
            <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#9a7413] bg-[#f0e8cf] px-2 py-0.5 rounded-xs border border-[#ca9e1c]/40">
              2 Balões na Vertical
            </span>
            <div className="my-2.5 h-24 flex flex-col items-center justify-center -space-y-4">
              <div className="scale-75">{renderShapeSVG('esferico', 48)}</div>
              <div className="scale-75">{renderShapeSVG('esferico', 48)}</div>
            </div>
            <h5 className="font-bold text-xs text-[#0b3a55]">Embarcação Desgovernada</h5>
            <p className="text-[11px] text-[#4f6e82] mt-1 leading-snug">
              Sem governo, incapaz de manobrar para ceder passagem.
            </p>
          </div>

          {/* 3 Balls: Aground */}
          <div className="rounded-xs bg-[#fcfbf8] p-3.5 border border-[#d7d0c1] flex flex-col items-center text-center">
            <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#b3402f] bg-[#f3ded9] px-2 py-0.5 rounded-xs border border-[#b3402f]/30">
              3 Balões na Vertical
            </span>
            <div className="my-2.5 h-24 flex flex-col items-center justify-center -space-y-6">
              <div className="scale-60">{renderShapeSVG('esferico', 44)}</div>
              <div className="scale-60">{renderShapeSVG('esferico', 44)}</div>
              <div className="scale-60">{renderShapeSVG('esferico', 44)}</div>
            </div>
            <h5 className="font-bold text-xs text-[#0b3a55]">Embarcação Encalhada</h5>
            <p className="text-[11px] text-[#4f6e82] mt-1 leading-snug">
              3 esferas pretas em linha vertical no mastro.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (termId === 'balao-conico') {
    if (variant === 'card') {
      return (
        <div className="mt-3 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-[#fcfbf8] p-1.5 rounded-xs border border-[#d7d0c1]">
              {renderShapeSVG('conico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-[#0b3a55] block">Forma: Cone Preto (Vértice ↓)</span>
              <span className="text-[10px] text-[#9a7413] font-semibold block mt-0.5">
                Vela + Motor em simultâneo
              </span>
              <span className="text-[10px] text-[#4f6e82] block">
                Considerada embarcação de propulsão mecânica.
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1]">
          <h4 className="text-sm font-bold text-[#0b3a55] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]"></span>
            Ilustração: Balão Cónico (Regra 25)
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#9a7413] bg-[#f0e8cf] px-2.5 py-1 rounded-xs border border-[#ca9e1c]/40">
            Vértice para Baixo
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xs bg-[#fcfbf8] p-4 border border-[#d7d0c1] flex flex-col items-center text-center">
            <div className="my-2">{renderShapeSVG('conico', 90)}</div>
            <h5 className="font-bold text-xs text-[#0b3a55]">Cone com Vértice para Baixo</h5>
            <p className="text-[11px] text-[#4f6e82] mt-1 leading-relaxed">
              Içado na parte de vante de uma embarcação à vela quando estiver simultaneamente a ser impulsionada pelo motor.
            </p>
          </div>

          <div className="rounded-xs bg-[#fcfbf8] p-4 border border-[#d7d0c1] flex flex-col justify-center">
            <h5 className="font-bold text-xs text-[#9a7413] flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-[#9a7413]" />
              Conceito Fundamental de Exame:
            </h5>
            <p className="text-xs text-[#0b3a55]/90 leading-relaxed">
              Mesmo que as velas estejam desfraldadas, a partir do momento em que o motor está em funcionamento, a embarcação perde os privilégios de veleiro e <strong>passa a ser considerada embarcação de propulsão mecânica</strong> para efeitos de ceder passagem.
            </p>
            <div className="mt-3 text-[11px] bg-[#ede9de]/60 p-2.5 rounded-xs border border-[#d7d0c1] text-[#0b3a55]">
              <strong>Dois cones vértice contra vértice (ampulheta):</strong> Usado por embarcações em faina de pesca (Regra 26).
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (termId === 'balao-cilindrico') {
    if (variant === 'card') {
      return (
        <div className="mt-3 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-[#fcfbf8] p-1.5 rounded-xs border border-[#d7d0c1]">
              {renderShapeSVG('cilindrico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-[#0b3a55] block">Forma: Cilindro Preto</span>
              <span className="text-[10px] text-[#9a7413] font-semibold block mt-0.5">
                Navio Condicionado pelo Calado
              </span>
              <span className="text-[10px] text-[#4f6e82] block">
                Restrito pela profundidade da água em relação ao calado.
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1]">
          <h4 className="text-sm font-bold text-[#0b3a55] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]"></span>
            Ilustração: Balão Cilíndrico (Regra 28)
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#0b3a55] bg-[#ede9de] px-2.5 py-1 rounded-xs border border-[#d7d0c1]">
            Calado Restrito
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xs bg-[#fcfbf8] p-4 border border-[#d7d0c1] flex flex-col items-center text-center">
            <div className="my-2">{renderShapeSVG('cilindrico', 90)}</div>
            <h5 className="font-bold text-xs text-[#0b3a55]">Cilindro Preto</h5>
            <p className="text-[11px] text-[#4f6e82] mt-1 leading-relaxed">
              Exibido onde melhor possa ser visto em navios cuja manobrabilidade está seriamente condicionada pela reduzida profundidade do canal em relação ao calado.
            </p>
          </div>

          <div className="rounded-xs bg-[#fcfbf8] p-4 border border-[#d7d0c1] flex flex-col justify-center">
            <h5 className="font-bold text-xs text-[#9a7413] flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-[#9a7413]" />
              Equivalente Noturno no Exame:
            </h5>
            <p className="text-xs text-[#0b3a55]/90 leading-relaxed">
              De dia exibe o <strong>cilindro preto</strong>. À noite exibe <strong>três luzes vermelhas em linha vertical</strong> visíveis em todo o horizonte, além das luzes de navegação normais de propulsão mecânica.
            </p>
            <div className="mt-3 text-[11px] bg-[#f0e8cf]/65 p-2.5 rounded-xs border border-[#ca9e1c]/40 text-[#0b3a55]">
              <strong className="text-[#9a7413]">Dever dos outros navios:</strong> Qualquer outra embarcação que não esteja desgovernada ou com manobra reduzida deve evitar estorvar a passagem do navio condicionado pelo seu calado.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (termId === 'balao-biconico') {
    if (variant === 'card') {
      return (
        <div className="mt-3 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-[#fcfbf8] p-1.5 rounded-xs border border-[#d7d0c1]">
              {renderShapeSVG('biconico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-[#0b3a55] block">Forma: Bicónico / Losango</span>
              <span className="text-[10px] text-[#9a7413] font-semibold block mt-0.5">
                Reboque Superior a 200 Metros
              </span>
              <span className="text-[10px] text-[#4f6e82] block">
                Dois cones unidos pelas suas bases.
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1]">
          <h4 className="text-sm font-bold text-[#0b3a55] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]"></span>
            Ilustração: Balão Bicónico (Regra 24)
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#0b3a55] bg-[#ede9de] px-2.5 py-1 rounded-xs border border-[#d7d0c1]">
            Reboque &gt; 200m
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xs bg-[#fcfbf8] p-4 border border-[#d7d0c1] flex flex-col items-center text-center">
            <div className="my-2">{renderShapeSVG('biconico', 90)}</div>
            <h5 className="font-bold text-xs text-[#0b3a55]">Dois Cones Unidos pela Base (Losango)</h5>
            <p className="text-[11px] text-[#4f6e82] mt-1 leading-relaxed">
              Exibido na embarcação rebocadora e na rebocada quando o comprimento do reboque (medido da popa do rebocador à popa do rebocado) for superior a 200 metros.
            </p>
          </div>

          <div className="rounded-xs bg-[#fcfbf8] p-4 border border-[#d7d0c1] flex flex-col justify-center">
            <h5 className="font-bold text-xs text-[#9a7413] flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-[#9a7413]" />
              Pontos-Chave para o Exame:
            </h5>
            <p className="text-xs text-[#0b3a55]/90 leading-relaxed">
              O sinal bicónico alerta os outros navegantes para a grande extensão do cabo de reboque, perigo de passagem entre as duas embarcações e limitações de manobra.
            </p>
            <div className="mt-3 text-[11px] bg-[#ede9de]/60 p-2.5 rounded-xs border border-[#d7d0c1] text-[#0b3a55]">
              <strong>Capacidade de Manobra Reduzida:</strong> Também é usado em conjunto com duas esferas na marca vertical: <em>Esfera + Bicónico + Esfera</em>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
