import React, { useId, useState } from 'react';
import { NauticalTerm, getCategoryStyle } from '../types/glossary';
import { GlossaryText } from './GlossaryText';
import { CategoryIcon } from './CategoryIcon';
import { AlertCircle, ChevronRight, Moon, Sun, Anchor } from 'lucide-react';

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
  const uid = useId().replace(/:/g, '');
  const sphereGradId = `sphereGrad-${uid}`;
  const coneGradId = `coneGrad-${uid}`;
  const cylinderGradId = `cylinderGrad-${uid}`;
  const biconeGradId = `biconeGrad-${uid}`;

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
              <radialGradient id={sphereGradId} cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </radialGradient>
            </defs>
            {/* Sphere */}
            <circle cx="50" cy="52" r="26" fill={`url(#${sphereGradId})`} stroke="#090d16" strokeWidth="1" />
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
              <linearGradient id={coneGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="35%" stopColor="#475569" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
            </defs>
            {/* Cone pointing DOWN */}
            <polygon points="20,26 80,26 50,80" fill={`url(#${coneGradId})`} stroke="#090d16" strokeWidth="1" />
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
              <linearGradient id={cylinderGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="30%" stopColor="#475569" />
                <stop offset="75%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
            </defs>
            {/* Cylinder body */}
            <rect x="30" y="22" width="40" height="56" fill={`url(#${cylinderGradId})`} stroke="#090d16" strokeWidth="1" />
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
              <linearGradient id={biconeGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="35%" stopColor="#475569" />
                <stop offset="75%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
            </defs>
            {/* Diamond / Two Cones Base-to-Base */}
            <polygon points="50,18 80,50 50,82 20,50" fill={`url(#${biconeGradId})`} stroke="#090d16" strokeWidth="1" />
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
        <div className="mt-3.5 rounded-none border border-border bg-muted p-3 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono-naut font-medium text-primary text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-none bg-primary"></span>
              As 4 Marcas Diurnas Oficiais (RIEAM)
            </span>
            <span className="font-mono-naut text-[10px] text-muted-foreground">Toque para ver</span>
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
                  className="group/shape flex flex-col items-center justify-between rounded-none bg-card p-2 border border-border hover:border-primary hover:bg-secondary/50 transition cursor-pointer"
                  title={`${s.name} - ${s.rule}`}
                >
                  <div className="h-14 flex items-center justify-center scale-90 group-hover/shape:scale-95 transition-transform">
                    {renderShapeSVG(svgType, 48)}
                  </div>
                  <span className="mt-1 font-bold text-[10px] text-primary leading-tight">
                    {s.shortName}
                  </span>
                  <span className="font-mono-naut text-[9px] text-muted-foreground leading-tight line-clamp-1 mt-0.5">
                    {s.symbol}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-2 text-[11px] text-primary bg-[#f0e8cf]/65 px-2.5 py-1.5 rounded-none border border-[#ca9e1c]/40 leading-tight">
            <strong className="text-[#9a7413]">Exame:</strong> De cor preta, içadas de dia no mastro onde melhor possam ser vistas.
          </p>
        </div>
      );
    }

    // Modal / Guia Visual detailed view for all 4 shapes matching Glossary TermCard style
    const rieamStyle = getCategoryStyle('R.I.E.A.M.');

    return (
      <section className="rounded-none border border-border bg-secondary/35 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 font-mono-naut text-[10px] uppercase tracking-[0.12em] text-[#9a7413] mb-1">
              <span>R.I.E.A.M. · Manual pp. 60–63</span>
            </div>
            <h4 className="font-maritime text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              As 4 Formas Geométricas dos Balões
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              <GlossaryText
                text="Todas as marcas diurnas são de cor preta mate, içadas durante o dia no aparelho onde melhor possam ser vistas."
                allTerms={allTerms}
                onSelectTerm={onSelectTerm || (() => {})}
              />
            </p>
          </div>
          <span className="font-mono-naut text-[11px] font-medium text-muted-foreground uppercase tracking-wider shrink-0">
            4 Formas Oficiais
          </span>
        </div>

        {/* 4 Shapes Grid (Glossary TermCard aesthetic) */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {shapes.map((s, index) => {
            const svgType =
              s.id === 'balao-esferico'
                ? 'esferico'
                : s.id === 'balao-conico'
                ? 'conico'
                : s.id === 'balao-cilindrico'
                ? 'cilindrico'
                : 'biconico';
            const target = allTerms.find((t) => t.id === s.id);

            return (
              <article
                key={s.id}
                onClick={() => {
                  if (target && onSelectTerm) onSelectTerm(target);
                }}
                className={`group relative flex flex-col justify-between rounded-none border border-border bg-card p-5 transition-all duration-150 ${
                  target
                    ? 'hover:-translate-y-0.5 hover:border-primary hover:shadow-[4px_4px_0_0_#0b3a55] cursor-pointer'
                    : ''
                }`}
              >
                <div>
                  {/* Top Metadata Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 font-mono-naut text-[10px] uppercase tracking-[0.1em]">
                      <span
                        className="w-1.5 h-1.5 rounded-none shrink-0"
                        style={{ backgroundColor: rieamStyle.dotColor }}
                      />
                      <span className="text-[#9a7413] font-semibold">Exame Obrigatório</span>
                    </div>
                    <span className="font-mono-naut text-[10px] text-muted-foreground tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title in Fraunces Editorial Serif */}
                  <h5 className="font-maritime text-2xl font-bold text-primary tracking-tight group-hover:text-[#082b3f] transition-colors leading-tight">
                    {s.name}
                  </h5>

                  {/* Category -> SubCategory Tag */}
                  <div className="font-mono-naut text-[10px] uppercase tracking-[0.08em] mt-1.5 mb-2 flex items-center gap-1.5 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded-none border"
                      style={{
                        backgroundColor: rieamStyle.soft,
                        color: rieamStyle.solid,
                        borderColor: `${rieamStyle.solid}33`,
                      }}
                    >
                      <CategoryIcon category="R.I.E.A.M." className="w-3 h-3 shrink-0" />
                      <span>R.I.E.A.M.</span>
                    </span>
                    <span aria-hidden="true" className="text-muted-foreground">→</span>
                    <span className="text-muted-foreground font-medium">{s.symbol}</span>
                  </div>

                  {/* Visual Stage */}
                  <div className="my-3 flex justify-center items-center py-3 bg-muted rounded-none border border-border">
                    <div className="group-hover:scale-105 transition-transform">
                      {renderShapeSVG(svgType, 72)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    <GlossaryText
                      text={s.desc}
                      allTerms={allTerms}
                      onSelectTerm={onSelectTerm || (() => {})}
                    />
                  </p>

                  {/* Exam Tip Box */}
                  <div className="mt-3 rounded-none bg-[#f0e8cf]/65 p-3 border border-[#9a7413]/30 text-xs text-primary">
                    <div className="flex items-center gap-1.5 font-mono-naut font-semibold text-[#9a7413] text-[10px] uppercase tracking-[0.08em] mb-1">
                      <AlertCircle className="w-3.5 h-3.5 text-[#9a7413] shrink-0" />
                      <span>Aplicação Principal</span>
                    </div>
                    <p className="text-[12px] text-foreground leading-snug">{s.rule}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono-naut text-[10px] uppercase tracking-[0.06em] text-[#9a7413] font-medium">
                    Marca Diurna
                  </span>
                  {target && (
                    <div className="flex items-center gap-1 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-primary group-hover:translate-x-0.5 transition-transform">
                      <span>Ver carta</span>
                      <ChevronRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Quick Reference Box */}
        <div className="mt-5 rounded-none bg-[#f0e8cf]/65 p-4 border border-[#9a7413]/30 text-xs text-primary">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#9a7413] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono-naut font-semibold text-[#9a7413] text-[10px] uppercase tracking-[0.08em] block mb-1">
                Resumo Rápido de Exame (RIEAM)
              </span>
              <ul className="space-y-1 list-disc list-inside text-xs text-foreground leading-relaxed">
                <li>
                  <strong>1 Esfera:</strong>{' '}
                  <GlossaryText text="Embarcação fundeada (exibida na parte de vante)." allTerms={allTerms} onSelectTerm={onSelectTerm || (() => {})} />
                </li>
                <li>
                  <strong>2 Esferas na vertical:</strong>{' '}
                  <GlossaryText text="Embarcação sem governo (desgovernada)." allTerms={allTerms} onSelectTerm={onSelectTerm || (() => {})} />
                </li>
                <li>
                  <strong>3 Esferas na vertical:</strong>{' '}
                  <GlossaryText text="Embarcação encalhada." allTerms={allTerms} onSelectTerm={onSelectTerm || (() => {})} />
                </li>
                <li>
                  <strong>Cone com vértice para baixo:</strong>{' '}
                  <GlossaryText text="Barco a navegar à vela e com motor em simultâneo." allTerms={allTerms} onSelectTerm={onSelectTerm || (() => {})} />
                </li>
                <li>
                  <strong>Cilindro:</strong>{' '}
                  <GlossaryText text="Embarcação condicionada pelo seu calado." allTerms={allTerms} onSelectTerm={onSelectTerm || (() => {})} />
                </li>
                <li>
                  <strong>Bicónico (losango):</strong>{' '}
                  <GlossaryText text="Reboque de comprimento superior a 200 metros." allTerms={allTerms} onSelectTerm={onSelectTerm || (() => {})} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ----------------------------------------------------
  // CASE 2: INDIVIDUAL SHAPES
  // ----------------------------------------------------
  if (termId === 'balao-esferico') {
    if (variant === 'card') {
      return (
        <div className="mt-3 rounded-none border border-border bg-muted p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-card p-1.5 rounded-none border border-border">
              {renderShapeSVG('esferico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-primary block">Forma: Esfera Preta</span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
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
      <div className="rounded-none border border-border bg-muted p-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-none bg-primary"></span>
            Ilustração: Balão Esférico e Configurações RIEAM
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#9a7413] bg-[#f0e8cf] px-2.5 py-1 rounded-none border border-[#ca9e1c]/40">
            Mais Frequente em Exame
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1 Ball: Anchored */}
          <div className="rounded-none bg-card p-3.5 border border-border flex flex-col items-center text-center">
            <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#1e7d4f] bg-[#dcebe1] px-2 py-0.5 rounded-none border border-[#1e7d4f]/30">
              1 Balão
            </span>
            <div className="my-2.5 h-24 flex items-center justify-center">
              {renderShapeSVG('esferico', 65)}
            </div>
            <h5 className="font-bold text-xs text-primary">Embarcação Fundeada</h5>
            <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
              Exibido na parte de vante da embarcação.
            </p>
          </div>

          {/* 2 Balls: Not under command */}
          <div className="rounded-none bg-card p-3.5 border border-border flex flex-col items-center text-center">
            <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#9a7413] bg-[#f0e8cf] px-2 py-0.5 rounded-none border border-[#ca9e1c]/40">
              2 Balões na Vertical
            </span>
            <div className="my-2.5 h-24 flex flex-col items-center justify-center -space-y-4">
              <div className="scale-75">{renderShapeSVG('esferico', 48)}</div>
              <div className="scale-75">{renderShapeSVG('esferico', 48)}</div>
            </div>
            <h5 className="font-bold text-xs text-primary">Embarcação Desgovernada</h5>
            <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
              Sem governo, incapaz de manobrar para ceder passagem.
            </p>
          </div>

          {/* 3 Balls: Aground */}
          <div className="rounded-none bg-card p-3.5 border border-border flex flex-col items-center text-center">
            <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#b3402f] bg-[#f3ded9] px-2 py-0.5 rounded-none border border-[#b3402f]/30">
              3 Balões na Vertical
            </span>
            <div className="my-2.5 h-24 flex flex-col items-center justify-center -space-y-6">
              <div className="scale-60">{renderShapeSVG('esferico', 44)}</div>
              <div className="scale-60">{renderShapeSVG('esferico', 44)}</div>
              <div className="scale-60">{renderShapeSVG('esferico', 44)}</div>
            </div>
            <h5 className="font-bold text-xs text-primary">Embarcação Encalhada</h5>
            <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
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
        <div className="mt-3 rounded-none border border-border bg-muted p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-card p-1.5 rounded-none border border-border">
              {renderShapeSVG('conico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-primary block">Forma: Cone Preto (Vértice ↓)</span>
              <span className="text-[10px] text-[#9a7413] font-semibold block mt-0.5">
                Vela + Motor em simultâneo
              </span>
              <span className="text-[10px] text-muted-foreground block">
                Considerada embarcação de propulsão mecânica.
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-none border border-border bg-muted p-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-none bg-primary"></span>
            Ilustração: Balão Cónico (Regra 25)
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-[#9a7413] bg-[#f0e8cf] px-2.5 py-1 rounded-none border border-[#ca9e1c]/40">
            Vértice para Baixo
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-none bg-card p-4 border border-border flex flex-col items-center text-center">
            <div className="my-2">{renderShapeSVG('conico', 90)}</div>
            <h5 className="font-bold text-xs text-primary">Cone com Vértice para Baixo</h5>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Içado na parte de vante de uma embarcação à vela quando estiver simultaneamente a ser impulsionada pelo motor.
            </p>
          </div>

          <div className="rounded-none bg-card p-4 border border-border flex flex-col justify-center">
            <h5 className="font-bold text-xs text-[#9a7413] flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-[#9a7413]" />
              Conceito Fundamental de Exame:
            </h5>
            <p className="text-xs text-foreground leading-relaxed">
              Mesmo que as velas estejam desfraldadas, a partir do momento em que o motor está em funcionamento, a embarcação perde os privilégios de veleiro e <strong>passa a ser considerada embarcação de propulsão mecânica</strong> para efeitos de ceder passagem.
            </p>
            <div className="mt-3 text-[11px] bg-secondary/60 p-2.5 rounded-none border border-border text-primary">
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
        <div className="mt-3 rounded-none border border-border bg-muted p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-card p-1.5 rounded-none border border-border">
              {renderShapeSVG('cilindrico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-primary block">Forma: Cilindro Preto</span>
              <span className="text-[10px] text-[#9a7413] font-semibold block mt-0.5">
                Navio Condicionado pelo Calado
              </span>
              <span className="text-[10px] text-muted-foreground block">
                Restrito pela profundidade da água em relação ao calado.
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-none border border-border bg-muted p-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-none bg-primary"></span>
            Ilustração: Balão Cilíndrico (Regra 28)
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-primary bg-secondary px-2.5 py-1 rounded-none border border-border">
            Calado Restrito
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-none bg-card p-4 border border-border flex flex-col items-center text-center">
            <div className="my-2">{renderShapeSVG('cilindrico', 90)}</div>
            <h5 className="font-bold text-xs text-primary">Cilindro Preto</h5>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Exibido onde melhor possa ser visto em navios cuja manobrabilidade está seriamente condicionada pela reduzida profundidade do canal em relação ao calado.
            </p>
          </div>

          <div className="rounded-none bg-card p-4 border border-border flex flex-col justify-center">
            <h5 className="font-bold text-xs text-[#9a7413] flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-[#9a7413]" />
              Equivalente Noturno no Exame:
            </h5>
            <p className="text-xs text-foreground leading-relaxed">
              De dia exibe o <strong>cilindro preto</strong>. À noite exibe <strong>três luzes vermelhas em linha vertical</strong> visíveis em todo o horizonte, além das luzes de navegação normais de propulsão mecânica.
            </p>
            <div className="mt-3 text-[11px] bg-[#f0e8cf]/65 p-2.5 rounded-none border border-[#ca9e1c]/40 text-primary">
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
        <div className="mt-3 rounded-none border border-border bg-muted p-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-card p-1.5 rounded-none border border-border">
              {renderShapeSVG('biconico', 50)}
            </div>
            <div className="flex-1">
              <span className="font-bold text-[11px] text-primary block">Forma: Bicónico / Losango</span>
              <span className="text-[10px] text-[#9a7413] font-semibold block mt-0.5">
                Reboque Superior a 200 Metros
              </span>
              <span className="text-[10px] text-muted-foreground block">
                Dois cones unidos pelas suas bases.
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-none border border-border bg-muted p-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-none bg-primary"></span>
            Ilustração: Balão Bicónico (Regra 24)
          </h4>
          <span className="font-mono-naut text-[10px] font-medium uppercase tracking-wider text-primary bg-secondary px-2.5 py-1 rounded-none border border-border">
            Reboque &gt; 200m
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-none bg-card p-4 border border-border flex flex-col items-center text-center">
            <div className="my-2">{renderShapeSVG('biconico', 90)}</div>
            <h5 className="font-bold text-xs text-primary">Dois Cones Unidos pela Base (Losango)</h5>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Exibido na embarcação rebocadora e na rebocada quando o comprimento do reboque (medido da popa do rebocador à popa do rebocado) for superior a 200 metros.
            </p>
          </div>

          <div className="rounded-none bg-card p-4 border border-border flex flex-col justify-center">
            <h5 className="font-bold text-xs text-[#9a7413] flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-[#9a7413]" />
              Pontos-Chave para o Exame:
            </h5>
            <p className="text-xs text-foreground leading-relaxed">
              O sinal bicónico alerta os outros navegantes para a grande extensão do cabo de reboque, perigo de passagem entre as duas embarcações e limitações de manobra.
            </p>
            <div className="mt-3 text-[11px] bg-secondary/60 p-2.5 rounded-none border border-border text-primary">
              <strong>Capacidade de Manobra Reduzida:</strong> Também é usado em conjunto com duas esferas na marca vertical: <em>Esfera + Bicónico + Esfera</em>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ------------------------------------------------------------------
// COMBINATIONS OF DAY SHAPES & MEANINGS (Manual do Marinheiro pp. 60-63 / RIEAM)
// ------------------------------------------------------------------
type CombinationKind =
  | 'one-sphere'
  | 'two-spheres'
  | 'three-spheres'
  | 'sphere-bicone-sphere'
  | 'one-cylinder'
  | 'one-cone-down'
  | 'two-cones-apex'
  | 'two-cones-apex-plus-cone-up'
  | 'towing-tug'
  | 'towing-towed';

type CombinationFilter = 'todas' | 'esferas' | 'cones' | 'cilindro-biconico';

interface DayShapeCombinationItem {
  id: CombinationKind;
  filterGroup: Exclude<CombinationFilter, 'todas'>;
  number: string;
  composition: string;
  meaning: string;
  viewpoint: string;
  ruleRef: string;
  positionNote: string;
  description: string;
  nightLights: string;
}

const DAY_SHAPE_COMBINATIONS: DayShapeCombinationItem[] = [
  {
    id: 'one-sphere',
    filterGroup: 'esferas',
    number: '01',
    composition: '1 Balão Esférico',
    meaning: 'Embarcação Fundeada',
    viewpoint: 'Embarcação vista de EB',
    ruleRef: 'Regra 30 (a) / (b)',
    positionNote: 'À vante (proa)',
    description:
      'Exibida na parte de vante da embarcação, onde melhor possa ser vista, enquanto estiver segura ao ferro.',
    nightLights:
      '1 luz branca em todo o horizonte (< 50 m); se ≥ 50 m, exibe 2 luzes brancas (uma mais alta à proa e outra mais baixa à popa).',
  },
  {
    id: 'two-spheres',
    filterGroup: 'esferas',
    number: '02',
    composition: '2 Balões Esféricos na Vertical',
    meaning: 'Embarcação Sem Governo (Desgovernada)',
    viewpoint: 'Embarcação vista de BB',
    ruleRef: 'Regra 27 (a)',
    positionNote: 'Onde melhor se veja',
    description:
      'Por circunstância excecional (avaria no leme, máquina, etc.), não consegue manobrar nem se desviar do caminho de outra.',
    nightLights:
      '2 luzes vermelhas na vertical em todo o horizonte (+ luzes de bordo e de alcance apenas se tiver seguimento; nunca exibe luz de mastro).',
  },
  {
    id: 'three-spheres',
    filterGroup: 'esferas',
    number: '03',
    composition: '3 Balões Esféricos na Vertical',
    meaning: 'Embarcação Encalhada',
    viewpoint: 'Embarcação vista de EB',
    ruleRef: 'Regra 30 (d)',
    positionNote: 'Em linha vertical',
    description:
      'Embarcação assente no fundo sem capacidade de navegar livremente (dispensada em embarcações < 12 m).',
    nightLights:
      '2 luzes vermelhas na vertical + luz(es) branca(s) de fundeado (de dia são 3 esferas, mas à noite são apenas 2 luzes vermelhas).',
  },
  {
    id: 'sphere-bicone-sphere',
    filterGroup: 'esferas',
    number: '04',
    composition: 'Esfera · Bicónico · Esfera',
    meaning: 'Capacidade de Manobra Reduzida',
    viewpoint: 'Embarcação vista de BB',
    ruleRef: 'Regra 27 (b)',
    positionNote: 'Em linha vertical',
    description:
      'A natureza do trabalho (dragagem, cabos submarinos, mergulho, reabastecimento) limita a capacidade de manobra.',
    nightLights:
      '3 luzes verticais (Vermelha · Branca · Vermelha) em todo o horizonte (+ mastro, bordos e alcance se com seguimento; ou fundeado se fundeada).',
  },
  {
    id: 'one-cylinder',
    filterGroup: 'cilindro-biconico',
    number: '05',
    composition: '1 Balão Cilíndrico',
    meaning: 'Condicionada pelo seu Calado',
    viewpoint: 'Embarcação vista de EB',
    ruleRef: 'Regra 28',
    positionNote: 'Onde melhor se veja',
    description:
      'Devido ao calado em relação à profundidade e largura da água disponível, não se pode desviar em segurança da rota.',
    nightLights:
      '3 luzes vermelhas na vertical em todo o horizonte + luzes normais de propulsão mecânica (mastro, bordos e alcance).',
  },
  {
    id: 'one-cone-down',
    filterGroup: 'cones',
    number: '06',
    composition: '1 Cone (Vértice para Baixo)',
    meaning: 'À Vela e a Motor em Simultâneo',
    viewpoint: 'Embarcação vista de EB',
    ruleRef: 'Regra 25 (e)',
    positionNote: 'Na parte de vante',
    description:
      'Veleiro com velas içadas e motor em marcha. Para o R.I.E.A.M., conta como embarcação de propulsão mecânica.',
    nightLights:
      'Luzes de propulsão mecânica: luz(es) de mastro branca(s), luzes de bordo e luz de alcance.',
  },
  {
    id: 'two-cones-apex',
    filterGroup: 'cones',
    number: '07',
    composition: '2 Cones Unidos pelo Vértice',
    meaning: 'Embarcação na Faina da Pesca',
    viewpoint: 'Embarcação vista de EB',
    ruleRef: 'Regra 26 (b) / (c)',
    positionNote: 'Ampulheta vertical',
    description:
      'Em pesca de arrasto ou outra faina da pesca que restrinja a manobra (dispensada se ≤ 20 m em certos casos locais, substituível por cesto).',
    nightLights:
      'Verde sobre Branca (arrasto) ou Vermelha sobre Branca (outra pesca), em linha vertical (+ bordos e alcance se com seguimento; arrasto ≥ 50 m junta mastro à ré).',
  },
  {
    id: 'two-cones-apex-plus-cone-up',
    filterGroup: 'cones',
    number: '08',
    composition: 'Ampulheta + 1 Cone (Vértice ↑)',
    meaning: 'Pesca com Aparelho > 150 Metros',
    viewpoint: 'Embarcação vista de vante',
    ruleRef: 'Regra 26 (c) (ii)',
    positionNote: 'Cone ↑ na direção do aparelho',
    description:
      'Embarcação na faina da pesca (não de arrasto) cujo aparelho ou redes se estendem horizontalmente a mais de 150 m. O cone extra aponta para cima na direção do aparelho.',
    nightLights:
      'Vermelha sobre Branca na vertical (+ bordos e alcance se tiver seguimento) + 1 luz branca em todo o horizonte na direção do aparelho.',
  },
  {
    id: 'towing-tug',
    filterGroup: 'cilindro-biconico',
    number: '09',
    composition: '1 Balão Bicónico (Rebocador)',
    meaning: 'Rebocador com Reboque > 200 Metros',
    viewpoint: 'Embarcação vista de EB',
    ruleRef: 'Regra 24 (a)',
    positionNote: 'No mastro do rebocador',
    description:
      'Exibido pelo rebocador quando o comprimento total do reboque (da popa do rebocador à extremidade de ré da embarcação rebocada) ultrapassa 200 metros.',
    nightLights:
      '3 luzes brancas de mastro na vertical + luzes de bordo, luz de alcance e 1 luz amarela de reboque acima da luz de alcance.',
  },
  {
    id: 'towing-towed',
    filterGroup: 'cilindro-biconico',
    number: '10',
    composition: '1 Balão Bicónico (Rebocado)',
    meaning: 'Embarcação Rebocada (> 200 Metros)',
    viewpoint: 'Embarcação vista de EB',
    ruleRef: 'Regra 24 (e)',
    positionNote: 'Onde melhor se veja',
    description:
      'Exibido também pela embarcação ou objeto rebocado sempre que o comprimento do reboque for superior a 200 metros, alertando para o cabo submerso entre ambos.',
    nightLights:
      'Apenas luzes de bordo e luz de alcance (nunca exibe luzes brancas de mastro nem luz amarela de reboque).',
  },
];

type LightingMode = 'dia' | 'noite';

interface DayNightPillToggleProps {
  mode: LightingMode;
  onChange: (next: LightingMode) => void;
}

const DayNightPillToggle: React.FC<DayNightPillToggleProps> = ({ mode, onChange }) => {
  const isNight = mode === 'noite';
  return (
    <div className="inline-flex items-center gap-2 select-none shrink-0">
      <button
        type="button"
        onClick={() => onChange('dia')}
        className={`font-mono-naut text-[10px] uppercase tracking-[0.08em] transition-colors cursor-pointer ${
          !isNight ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'
        }`}
      >
        Dia
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={isNight}
        aria-label="Alternar vista entre dia e noite"
        onClick={() => onChange(isNight ? 'dia' : 'noite')}
        className={`relative inline-flex h-6 w-12 items-center justify-between rounded-none border px-1 transition-colors duration-200 cursor-pointer ${
          isNight
            ? 'bg-primary border-primary'
            : 'bg-secondary border-border'
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-none shadow-xs transition-transform duration-200 ${
            isNight
              ? 'translate-x-6 bg-[#175173]'
              : 'translate-x-0 bg-card'
          }`}
        />
        <Sun
          className={`relative z-10 w-3 h-3 transition-colors ${
            !isNight ? 'text-[#ca9e1c]' : 'text-[#94a3b8]'
          }`}
        />
        <Moon
          className={`relative z-10 w-3 h-3 transition-colors ${
            isNight ? 'text-[#fde68a]' : 'text-[#64748b]'
          }`}
        />
      </button>

      <button
        type="button"
        onClick={() => onChange('noite')}
        className={`font-mono-naut text-[10px] uppercase tracking-[0.08em] transition-colors cursor-pointer ${
          isNight ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'
        }`}
      >
        Noite
      </button>
    </div>
  );
};

interface CombinationVesselSVGProps {
  kind: CombinationKind;
  viewpoint: string;
  mode: LightingMode;
}

const CombinationVesselSVG: React.FC<CombinationVesselSVGProps> = ({ kind, viewpoint, mode }) => {
  const uid = useId().replace(/:/g, '');
  const skyId = `vsky-${uid}`;
  const seaId = `vsea-${uid}`;
  const hullId = `vhull-${uid}`;
  const houseId = `vhouse-${uid}`;
  const shapeGrad = `vshape-${uid}`;
  const isNight = mode === 'noite';

  // Day shape helpers
  const drawSphere = (cx: number, cy: number, r: number) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${shapeGrad})`} stroke="#090d16" strokeWidth="0.9" />
      <ellipse cx={cx - r * 0.28} cy={cy - r * 0.28} rx={r * 0.34} ry={r * 0.22} fill="#ffffff" fillOpacity="0.16" />
    </g>
  );

  const drawBicone = (cx: number, cy: number, hw: number, hh: number) => (
    <g>
      <polygon
        points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
        fill={`url(#${shapeGrad})`}
        stroke="#090d16"
        strokeWidth="0.9"
      />
      <line x1={cx - hw} y1={cy} x2={cx + hw} y2={cy} stroke="#090d16" strokeWidth="0.9" strokeOpacity="0.7" />
      <polygon points={`${cx},${cy - hh} ${cx},${cy + hh} ${cx - hw},${cy}`} fill="#ffffff" fillOpacity="0.1" />
    </g>
  );

  const drawConeDown = (cx: number, topY: number, hw: number, h: number) => (
    <g>
      <polygon
        points={`${cx - hw},${topY} ${cx + hw},${topY} ${cx},${topY + h}`}
        fill={`url(#${shapeGrad})`}
        stroke="#090d16"
        strokeWidth="0.9"
      />
      <ellipse cx={cx} cy={topY} rx={hw} ry={Math.max(1.8, hw * 0.22)} fill="#334155" stroke="#090d16" strokeWidth="0.8" />
    </g>
  );

  const drawConeUp = (cx: number, tipY: number, hw: number, h: number) => (
    <g>
      <polygon
        points={`${cx},${tipY} ${cx + hw},${tipY + h} ${cx - hw},${tipY + h}`}
        fill={`url(#${shapeGrad})`}
        stroke="#090d16"
        strokeWidth="0.9"
      />
      <ellipse
        cx={cx}
        cy={tipY + h}
        rx={hw}
        ry={Math.max(1.8, hw * 0.22)}
        fill="#1e293b"
        stroke="#090d16"
        strokeWidth="0.8"
      />
    </g>
  );

  const drawHourglass = (cx: number, midY: number, hw: number, halfH: number) => (
    <g>
      {drawConeDown(cx, midY - halfH, hw, halfH)}
      {drawConeUp(cx, midY, hw, halfH)}
      <circle cx={cx} cy={midY} r="1.2" fill="#090d16" />
    </g>
  );

  const drawCylinder = (cx: number, topY: number, hw: number, h: number) => (
    <g>
      <rect
        x={cx - hw}
        y={topY}
        width={hw * 2}
        height={h}
        fill={`url(#${shapeGrad})`}
        stroke="#090d16"
        strokeWidth="0.9"
      />
      <ellipse cx={cx} cy={topY + h} rx={hw} ry={2.2} fill="#1e293b" stroke="#090d16" strokeWidth="0.8" />
      <ellipse cx={cx} cy={topY} rx={hw} ry={2.2} fill="#334155" stroke="#090d16" strokeWidth="0.8" />
    </g>
  );

  // Night navigation light helper
  const drawNavLight = (
    cx: number,
    cy: number,
    color: 'red' | 'green' | 'white' | 'yellow',
    r = 4.6
  ) => {
    const palette = {
      red: { fill: '#ef4444', stroke: '#fecaca' },
      green: { fill: '#22c55e', stroke: '#bbf7d0' },
      white: { fill: '#ffffff', stroke: '#e2e8f0' },
      yellow: { fill: '#facc15', stroke: '#fef08a' },
    }[color];

    return (
      <g>
        <circle cx={cx} cy={cy} r={r * 2.1} fill={palette.fill} fillOpacity="0.28" />
        <circle cx={cx} cy={cy} r={r * 1.45} fill={palette.fill} fillOpacity="0.42" />
        <circle cx={cx} cy={cy} r={r} fill={palette.fill} stroke={palette.stroke} strokeWidth="0.9" />
      </g>
    );
  };

  const hullStroke = isNight ? '#94a3b8' : '#0b3a55';
  const mastStroke = isNight ? '#cbd5e1' : '#0b3a55';
  const houseFill = isNight ? '#2a3c50' : '#f7f3e8';
  const glassFill = isNight ? '#fde047' : '#1e3a5f';
  const labelColor = isNight ? '#e2e8f0' : '#0b3a55';
  const goldLabelColor = isNight ? '#fde68a' : '#9a7413';

  return (
    <svg
      viewBox="0 0 260 155"
      className="w-full h-auto block select-none overflow-hidden"
      role="img"
      aria-label={`${viewpoint}: ilustração ${isNight ? 'noturna (luzes)' : 'diurna (balões)'}`}
    >
      <defs>
        <linearGradient id={skyId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isNight ? '#071422' : '#f8fafc'} />
          <stop offset="100%" stopColor={isNight ? '#0e2740' : '#dceef9'} />
        </linearGradient>
        <linearGradient id={seaId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isNight ? '#0b253d' : '#8ed1f2'} stopOpacity="0.94" />
          <stop offset="100%" stopColor={isNight ? '#04101c' : '#3595cb'} stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id={hullId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isNight ? '#475569' : '#fcfbf8'} />
          <stop offset="100%" stopColor={isNight ? '#243447' : '#e5decb'} />
        </linearGradient>
        <linearGradient id={houseId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={houseFill} />
          <stop offset="100%" stopColor={isNight ? '#1e2c3b' : '#ebe4d3'} />
        </linearGradient>
        <linearGradient id={shapeGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="55%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="260" height="114" fill={`url(#${skyId})`} />

      {/* Night stars & crescent */}
      {isNight && (
        <g>
          <g fill="#f8fafc" opacity="0.58">
            <circle cx="24" cy="18" r="1" />
            <circle cx="58" cy="34" r="0.8" />
            <circle cx="195" cy="20" r="1" />
            <circle cx="226" cy="40" r="0.9" />
            <circle cx="88" cy="14" r="0.8" />
          </g>
          <path d="M 234 15 A 6.5 6.5 0 1 0 241 24 A 5 5 0 1 1 234 15 Z" fill="#fde68a" opacity="0.82" />
        </g>
      )}

      {/* Animated Sea Body */}
      <g className="animate-wave-slow">
        <path
          d="M -28 114 Q -10 110, 8 114 T 44 114 T 80 114 T 116 114 T 152 114 T 188 114 T 224 114 T 260 114 T 296 114 L 296 164 L -28 164 Z"
          fill={`url(#${seaId})`}
        />
        <path
          d="M -28 114 Q -10 110, 8 114 T 44 114 T 80 114 T 116 114 T 152 114 T 188 114 T 224 114 T 260 114 T 296 114"
          fill="none"
          stroke={isNight ? '#38bdf8' : '#0284c7'}
          strokeWidth="1.6"
        />
      </g>

      {/* Secondary Foreground Wave Crest */}
      <g className="animate-wave-reverse" opacity={isNight ? '0.35' : '0.55'}>
        <path
          d="M -28 128 Q -6 125, 16 128 T 60 128 T 104 128 T 148 128 T 192 128 T 236 128 T 280 128"
          fill="none"
          stroke={isNight ? '#7dd3fc' : '#e0f2fe'}
          strokeWidth="1.2"
        />
      </g>

      {/* =========================================================
          01 · EMBARCAÇÃO FUNDEADA (Vista de EB · Bow Right)
         ========================================================= */}
      {kind === 'one-sphere' && (
        <g>
          {/* Fixed seabed */}
          <path d="M 0 144 Q 80 139, 170 145 T 260 143 L 260 155 L 0 155 Z" fill={isNight ? '#020617' : '#0b3a55'} fillOpacity="0.28" />
          <g transform="translate(226, 141)">
            <line x1="0" y1="-5" x2="0" y2="5" stroke={isNight ? '#94a3b8' : '#090d16'} strokeWidth="1.8" />
            <path d="M -5 2 Q 0 7, 5 2" fill="none" stroke={isNight ? '#94a3b8' : '#090d16'} strokeWidth="1.8" />
          </g>

          <g className="animate-boat-bob" style={{ transformOrigin: '130px 114px' }}>
            <path d="M 201 106 Q 214 126, 226 141" fill="none" stroke={isNight ? '#cbd5e1' : '#1e293b'} strokeWidth="1.8" strokeDasharray="3 2" />
            <path d="M 48 114 L 194 114 C 190 121, 178 123, 162 124 L 58 124 C 50 123, 48 119, 48 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 42 96 C 92 99, 158 98, 212 92 C 206 104, 200 110, 194 114 L 48 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <path d="M 70 97 L 76 78 L 138 78 L 146 96 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="86" y="83" width="38" height="7" rx="1" fill={glassFill} opacity="0.88" />
            <line x1="110" y1="78" x2="110" y2="48" stroke={mastStroke} strokeWidth="2.2" strokeLinecap="round" />

            {/* Bow Jackstaff at Vante */}
            <line x1="188" y1="95" x2="188" y2="30" stroke={mastStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="188" y1="30" x2="110" y2="50" stroke="#94a3b8" strokeWidth="1" />
            <line x1="188" y1="30" x2="210" y2="92" stroke="#94a3b8" strokeWidth="1" />
            <line x1="188" y1="34" x2="188" y2="92" stroke="#64748b" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              <>
                {drawSphere(188, 52, 9.5)}
                <text x="188" y="21" textAnchor="middle" fill={labelColor} fontSize="8" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  À VANTE
                </text>
              </>
            ) : (
              <>
                {drawNavLight(188, 44, 'white', 5.5)}
                <text x="188" y="21" textAnchor="middle" fill={labelColor} fontSize="7.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  LUZ BRANCA (&lt; 50 m)
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          02 · SEM GOVERNO / DESGOVERNADA (Vista de BB · Bow Left)
         ========================================================= */}
      {kind === 'two-spheres' && (
        <g>
          <path d="M 192 122 C 210 120, 224 125, 240 122" fill="none" stroke={isNight ? '#38bdf8' : '#e0f2fe'} strokeWidth="1.4" strokeDasharray="4 3" opacity="0.65" />

          <g className="animate-boat-bob" style={{ transformOrigin: '130px 114px' }}>
            <path d="M 52 114 L 194 114 C 192 121, 184 123, 174 124 L 78 124 C 62 123, 56 120, 52 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 38 92 C 92 98, 152 99, 200 96 L 194 114 L 52 114 C 46 108, 42 100, 38 92 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />

            <path d="M 96 97 L 106 76 L 166 76 L 172 97 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="110" y="81" width="38" height="7" rx="1" fill={glassFill} opacity="0.88" />
            <rect x="114" y="71" width="6" height="4" rx="0.5" fill="#b3402f" />

            <line x1="138" y1="76" x2="138" y2="12" stroke={mastStroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="126" y1="18" x2="150" y2="18" stroke={mastStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="126" y1="18" x2="126" y2="76" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              <>
                {drawSphere(126, 33, 8.5)}
                {drawSphere(126, 56, 8.5)}
              </>
            ) : (
              <>
                {drawNavLight(126, 33, 'red', 5)}
                {drawNavLight(126, 56, 'red', 5)}
                <text x="195" y="34" textAnchor="middle" fill="#fca5a5" fontSize="7.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  2 VERMELHAS
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          03 · ENCALHADA (Vista de EB · Grounded steadily on Shoal)
         ========================================================= */}
      {kind === 'three-spheres' && (
        <g>
          {/* Shallow shoal / sandbank contacting keel — vessel grounded so it does NOT bob */}
          <path
            d="M 10 155 C 55 128, 118 118, 178 121 C 215 123, 240 138, 260 148 L 260 155 Z"
            fill="#ca9e1c"
            fillOpacity={isNight ? '0.32' : '0.45'}
            stroke="#9a7413"
            strokeWidth="1.2"
          />
          <text x="155" y="143" textAnchor="middle" fill={isNight ? '#fde68a' : '#0b3a55'} fontSize="8" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
            BAIXIO / FUNDO
          </text>

          <g transform="rotate(-3, 128, 110)">
            <path d="M 48 114 L 194 114 C 190 121, 178 123, 162 124 L 62 124 C 52 123, 49 119, 48 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 42 96 C 92 99, 158 98, 210 92 C 204 104, 199 110, 194 114 L 48 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <path d="M 74 97 L 80 78 L 136 78 L 144 97 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="92" y="83" width="34" height="7" rx="1" fill={glassFill} opacity="0.88" />
            {/* Bow jackstaff for anchor light at night */}
            <line x1="188" y1="95" x2="188" y2="54" stroke={mastStroke} strokeWidth="1.6" strokeLinecap="round" />

            <line x1="115" y1="78" x2="115" y2="8" stroke={mastStroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="104" y1="13" x2="126" y2="13" stroke={mastStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="126" y1="13" x2="126" y2="78" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              <>
                {drawSphere(126, 24, 7)}
                {drawSphere(126, 42, 7)}
                {drawSphere(126, 60, 7)}
              </>
            ) : (
              <>
                {drawNavLight(126, 26, 'red', 4.6)}
                {drawNavLight(126, 48, 'red', 4.6)}
                {drawNavLight(188, 56, 'white', 4.6)}
                <text x="195" y="26" textAnchor="middle" fill="#fca5a5" fontSize="7" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  2 VERM + FUNDEADO
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          04 · CAPACIDADE DE MANOBRA REDUZIDA (Vista de BB)
         ========================================================= */}
      {kind === 'sphere-bicone-sphere' && (
        <g>
          <g className="animate-boat-bob" style={{ transformOrigin: '130px 114px' }}>
            <path d="M 44 114 L 198 114 C 196 121, 188 123, 178 124 L 68 124 C 54 123, 47 120, 44 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 30 91 C 88 97, 152 98, 206 95 L 198 114 L 44 114 C 38 107, 34 99, 30 91 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <path d="M 68 96 L 76 75 L 122 75 L 128 96 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="78" y="80" width="28" height="7" rx="1" fill={glassFill} opacity="0.88" />
            <path d="M 152 96 L 176 72 L 188 96" fill="none" stroke={isNight ? '#94a3b8' : '#475569'} strokeWidth="2.6" strokeLinejoin="round" />
            <line x1="176" y1="72" x2="196" y2="112" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2.5 2" />

            <line x1="106" y1="75" x2="106" y2="8" stroke={mastStroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="94" y1="12" x2="118" y2="12" stroke={mastStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="118" y1="12" x2="118" y2="75" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              <>
                {drawSphere(118, 23, 6.5)}
                {drawBicone(118, 42, 8.5, 8.5)}
                {drawSphere(118, 61, 6.5)}
              </>
            ) : (
              <>
                {drawNavLight(118, 22, 'red', 4.5)}
                {drawNavLight(118, 42, 'white', 4.5)}
                {drawNavLight(118, 62, 'red', 4.5)}
                {/* Port red sidelight when making way */}
                {drawNavLight(86, 72, 'red', 3.4)}
                <text x="190" y="34" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  VERM · BRANCA · VERM
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          05 · CONDICIONADA PELO SEU CALADO (Vista de EB)
         ========================================================= */}
      {kind === 'one-cylinder' && (
        <g>
          <path d="M 0 137 Q 70 134, 145 138 T 260 136 L 260 155 L 0 155 Z" fill={isNight ? '#020617' : '#0b3a55'} fillOpacity="0.28" />
          <text x="124" y="148" textAnchor="middle" fill={isNight ? '#cbd5e1' : '#0b3a55'} fontSize="8" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
            FOLGA MÍNIMA DE CALADO
          </text>

          <g className="animate-boat-bob-subtle" style={{ transformOrigin: '130px 114px' }}>
            <path d="M 28 114 L 218 114 C 216 127, 206 132, 192 133 L 40 133 C 30 131, 28 123, 28 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <line x1="122" y1="133" x2="122" y2="137" stroke="#b3402f" strokeWidth="1.5" />
            <path d="M 24 96 L 228 91 C 224 102, 221 109, 218 114 L 28 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <rect x="116" y="90" width="28" height="5" fill="#94a3b8" stroke={hullStroke} strokeWidth="1" />
            <rect x="152" y="89" width="28" height="5" fill="#94a3b8" stroke={hullStroke} strokeWidth="1" />
            <path d="M 38 96 L 42 72 L 82 72 L 86 95 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="52" y="76" width="24" height="6" rx="1" fill={glassFill} opacity="0.88" />
            <path d="M 42 72 L 45 61 L 54 61 L 56 72 Z" fill="#0b3a55" />

            {/* Aft Signal Mast + Forward Masthead Post */}
            <line x1="74" y1="72" x2="74" y2="14" stroke={mastStroke} strokeWidth="2.3" strokeLinecap="round" />
            <line x1="74" y1="18" x2="90" y2="18" stroke={mastStroke} strokeWidth="1.6" strokeLinecap="round" />
            <line x1="90" y1="18" x2="90" y2="72" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />
            <line x1="196" y1="91" x2="196" y2="54" stroke={mastStroke} strokeWidth="1.8" strokeLinecap="round" />

            {!isNight ? (
              drawCylinder(90, 26, 6.5, 22)
            ) : (
              <>
                {drawNavLight(90, 23, 'red', 4.3)}
                {drawNavLight(90, 39, 'red', 4.3)}
                {drawNavLight(90, 55, 'red', 4.3)}
                {/* Masthead white lights + starboard green sidelight */}
                {drawNavLight(196, 56, 'white', 4.2)}
                {drawNavLight(74, 15, 'white', 4.2)}
                {drawNavLight(78, 70, 'green', 3.4)}
                <text x="164" y="25" textAnchor="middle" fill="#fca5a5" fontSize="7.2" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  3 VERM + MASTRO + EB
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          06 · À VELA E A MOTOR EM SIMULTÂNEO (Vista de EB)
         ========================================================= */}
      {kind === 'one-cone-down' && (
        <g>
          <path d="M 16 119 Q 30 116, 44 119" fill="none" stroke={isNight ? '#7dd3fc' : '#ffffff'} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 22 124 Q 36 121, 48 124" fill="none" stroke={isNight ? '#38bdf8' : '#e0f2fe'} strokeWidth="1.3" strokeLinecap="round" />

          <g className="animate-boat-bob" style={{ transformOrigin: '130px 114px' }}>
            <path d="M 52 114 L 196 114 C 186 122, 168 123, 148 123 L 64 123 C 54 122, 52 118, 52 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 118 123 L 128 123 L 123 136 L 114 136 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1" />
            <line x1="66" y1="122" x2="54" y2="127" stroke={isNight ? '#94a3b8' : '#090d16'} strokeWidth="1.6" />
            <circle cx="53" cy="127" r="2.2" fill="#ca9e1c" stroke="#090d16" strokeWidth="0.8" />

            <path d="M 48 103 C 96 105, 152 103, 212 96 C 204 106, 199 110, 196 114 L 52 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <path d="M 88 103 C 96 97, 134 97, 146 102 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.2" />

            <line x1="126" y1="101" x2="126" y2="12" stroke={mastStroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="126" y1="92" x2="64" y2="94" stroke={mastStroke} strokeWidth="2" strokeLinecap="round" />
            <polygon
              points="124,16 124,90 66,92"
              fill={isNight ? '#334155' : '#fcfbf8'}
              fillOpacity={isNight ? '0.85' : '0.92'}
              stroke={hullStroke}
              strokeWidth="1.2"
            />
            <polygon
              points="128,22 204,95 148,97"
              fill={isNight ? '#475569' : '#f7f3e8'}
              fillOpacity={isNight ? '0.85' : '0.9'}
              stroke={hullStroke}
              strokeWidth="1.2"
            />
            <line x1="126" y1="15" x2="210" y2="96" stroke="#64748b" strokeWidth="1.1" />

            {!isNight ? (
              <>
                <line x1="184" y1="71" x2="184" y2="98" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                {drawConeDown(184, 52, 8.5, 16)}
                <text x="184" y="45" textAnchor="middle" fill={labelColor} fontSize="7.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  VÉRTICE ↓
                </text>
              </>
            ) : (
              <>
                {/* Power-driven masthead white light + starboard green sidelight */}
                {drawNavLight(126, 16, 'white', 4.8)}
                {drawNavLight(142, 96, 'green', 3.8)}
                <text x="195" y="25" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  MASTRO + BORDO EB
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          07 · EMBARCAÇÃO NA FAINA DA PESCA (Vista de EB)
         ========================================================= */}
      {kind === 'two-cones-apex' && (
        <g>
          <g className="animate-boat-bob" style={{ transformOrigin: '130px 114px' }}>
            <path d="M 52 94 L 18 134" stroke={isNight ? '#64748b' : '#1e293b'} strokeWidth="1.4" strokeDasharray="3 2" />
            <path d="M 56 96 L 26 142" stroke={isNight ? '#64748b' : '#1e293b'} strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M 6 142 Q 16 129, 28 138 Q 16 149, 6 142 Z" fill="#1b4b65" fillOpacity="0.45" stroke={hullStroke} strokeWidth="1" />

            <path d="M 54 114 L 194 114 C 190 121, 178 123, 162 124 L 64 124 C 56 123, 54 119, 54 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 48 97 C 98 99, 156 97, 208 89 C 202 103, 198 109, 194 114 L 54 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <path d="M 52 97 L 58 80 L 66 97" fill="none" stroke={isNight ? '#94a3b8' : '#475569'} strokeWidth="2.2" />
            <path d="M 118 96 L 124 74 L 166 74 L 172 95 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="136" y="79" width="26" height="7" rx="1" fill={glassFill} opacity="0.88" />

            <line x1="138" y1="74" x2="138" y2="10" stroke={mastStroke} strokeWidth="2.3" strokeLinecap="round" />
            <line x1="126" y1="15" x2="150" y2="15" stroke={mastStroke} strokeWidth="1.7" strokeLinecap="round" />
            <line x1="126" y1="15" x2="126" y2="74" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              drawHourglass(126, 40, 8.5, 16)
            ) : (
              <>
                {/* Trawler: Green over White + starboard sidelight when making way */}
                {drawNavLight(126, 27, 'green', 4.8)}
                {drawNavLight(126, 51, 'white', 4.8)}
                {drawNavLight(152, 72, 'green', 3.4)}
                <text x="194" y="34" textAnchor="middle" fill="#86efac" fontSize="7" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  VERDE s/ BRANCA
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          08 · PESCA COM APARELHO > 150 m (Vista de Vante · Bow Head-On)
         ========================================================= */}
      {kind === 'two-cones-apex-plus-cone-up' && (
        <g>
          {/* Floating net / gear buoys extending > 150m to the right */}
          <g className="animate-wave-slow">
            <path d="M 102 114 C 138 118, 185 117, 242 115" fill="none" stroke={goldLabelColor} strokeWidth="1.6" strokeDasharray="4 2.5" />
            {[142, 168, 194, 220, 242].map((bx) => (
              <circle key={bx} cx={bx} cy="115" r="3" fill="#ca9e1c" stroke={hullStroke} strokeWidth="0.9" />
            ))}
          </g>
          <text x="192" y="133" textAnchor="middle" fill={labelColor} fontSize="8" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
            APARELHO &gt; 150 m →
          </text>

          <g className="animate-boat-bob" style={{ transformOrigin: '82px 114px' }}>
            <path d="M 54 114 L 110 114 C 106 124, 96 128, 82 128 C 68 128, 58 124, 54 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 46 92 C 62 96, 102 96, 118 92 L 110 114 L 54 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <line x1="82" y1="95" x2="82" y2="128" stroke={hullStroke} strokeWidth="1.2" />
            <rect x="64" y="75" width="36" height="19" rx="1.5" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="69" y="79" width="26" height="7" rx="1" fill={glassFill} opacity="0.88" />

            <line x1="82" y1="75" x2="82" y2="10" stroke={mastStroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="60" y1="17" x2="148" y2="17" stroke={mastStroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="82" y1="17" x2="82" y2="75" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />
            <line x1="142" y1="17" x2="142" y2="76" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              <>
                {drawHourglass(82, 42, 8.5, 15)}
                {drawConeUp(142, 34, 9.5, 17)}
                <text x="142" y="65" textAnchor="middle" fill={goldLabelColor} fontSize="7.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  CONE ↑
                </text>
              </>
            ) : (
              <>
                {/* Red over White + 1 white all-round light towards outlying gear */}
                {drawNavLight(82, 30, 'red', 4.6)}
                {drawNavLight(82, 54, 'white', 4.6)}
                {drawNavLight(142, 42, 'white', 4.6)}
                <text x="188" y="42" textAnchor="middle" fill={goldLabelColor} fontSize="7" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  BRANCA → APARELHO
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          09 · REBOCADOR COM REBOQUE > 200 m (Vista de EB)
         ========================================================= */}
      {kind === 'towing-tug' && (
        <g>
          <text x="58" y="138" textAnchor="middle" fill={labelColor} fontSize="8" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
            ← CABO DE REBOQUE &gt; 200 m
          </text>

          <g className="animate-boat-bob" style={{ transformOrigin: '138px 114px' }}>
            <path d="M 60 98 Q 30 109, 0 112" fill="none" stroke={goldLabelColor} strokeWidth="2.2" />
            <path d="M 66 114 L 208 114 C 204 122, 192 124, 178 124 L 78 124 C 69 123, 66 119, 66 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 62 96 C 110 99, 168 97, 222 90 C 216 103, 212 109, 208 114 L 66 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <path d="M 216 92 C 221 98, 220 106, 212 113" fill="none" stroke="#090d16" strokeWidth="3" strokeLinecap="round" />
            <rect x="59" y="92" width="4" height="6" fill={hullStroke} />

            <path d="M 102 97 L 108 72 L 160 72 L 168 96 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="128" y="77" width="24" height="7" rx="1" fill={glassFill} opacity="0.88" />
            <path d="M 108 72 L 111 58 L 122 58 L 124 72 Z" fill="#0b3a55" />
            <rect x="110" y="62" width="12" height="3" fill="#ca9e1c" />

            <line x1="142" y1="72" x2="142" y2="12" stroke={mastStroke} strokeWidth="2.3" strokeLinecap="round" />
            <line x1="130" y1="16" x2="154" y2="16" stroke={mastStroke} strokeWidth="1.7" strokeLinecap="round" />
            <line x1="154" y1="16" x2="154" y2="72" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              drawBicone(154, 41, 10.5, 13.5)
            ) : (
              <>
                {/* Tug > 200m: 3 vertical white masthead lights + starboard green + stern yellow towing light over white sternlight */}
                {drawNavLight(154, 21, 'white', 4.1)}
                {drawNavLight(154, 37, 'white', 4.1)}
                {drawNavLight(154, 53, 'white', 4.1)}
                {drawNavLight(152, 70, 'green', 3.4)}
                {drawNavLight(63, 86, 'yellow', 3.4)}
                <text x="58" y="25" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  3 BRANCAS + AMARELA RÉ
                </text>
              </>
            )}
          </g>
        </g>
      )}

      {/* =========================================================
          10 · EMBARCAÇÃO REBOCADA > 200 m (Vista de EB)
         ========================================================= */}
      {kind === 'towing-towed' && (
        <g>
          <text x="198" y="138" textAnchor="middle" fill={labelColor} fontSize="8" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
            CABO AO REBOCADOR (&gt; 200 m) →
          </text>

          <g className="animate-boat-bob" style={{ transformOrigin: '115px 114px' }}>
            <path d="M 192 94 Q 226 105, 260 109" fill="none" stroke={goldLabelColor} strokeWidth="2.2" />
            <path d="M 42 114 L 184 114 C 180 122, 168 124, 154 124 L 54 124 C 46 123, 43 119, 42 114 Z" fill="#1b4b65" stroke={hullStroke} strokeWidth="1.2" />
            <path d="M 38 94 C 86 98, 144 97, 194 92 L 184 114 L 42 114 Z" fill={`url(#${hullId})`} stroke={hullStroke} strokeWidth="1.5" />
            <circle cx="192" cy="94" r="2.2" fill="#090d16" />

            <rect x="108" y="90" width="44" height="5" fill="#cbd5e1" stroke={hullStroke} strokeWidth="1" />
            <path d="M 52 95 L 56 76 L 90 76 L 94 96 Z" fill={`url(#${houseId})`} stroke={hullStroke} strokeWidth="1.3" />
            <rect x="64" y="80" width="18" height="6" rx="1" fill={glassFill} opacity="0.72" />

            <line x1="126" y1="90" x2="126" y2="12" stroke={mastStroke} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="114" y1="16" x2="138" y2="16" stroke={mastStroke} strokeWidth="1.7" strokeLinecap="round" />
            <line x1="114" y1="16" x2="114" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5 2" />

            {!isNight ? (
              drawBicone(114, 41, 10.5, 13.5)
            ) : (
              <>
                {/* Towed vessel: NO masthead lights! ONLY sidelights (EB green here) + sternlight */}
                {drawNavLight(86, 75, 'green', 3.8)}
                <text x="150" y="34" textAnchor="middle" fill="#86efac" fontSize="7" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                  SEM MASTRO · SÓ BORDO/ALCANCE
                </text>
              </>
            )}
          </g>
        </g>
      )}
    </svg>
  );
};

interface DayShapeCombinationsBlockProps {
  allTerms?: NauticalTerm[];
  onSelectTerm?: (term: NauticalTerm) => void;
}

export const DayShapeCombinationsBlock: React.FC<DayShapeCombinationsBlockProps> = ({
  allTerms = [],
  onSelectTerm,
}) => {
  const uid = useId().replace(/:/g, '');
  const [filter, setFilter] = useState<CombinationFilter>('todas');
  const [cardModes, setCardModes] = useState<Partial<Record<CombinationKind, LightingMode>>>({});
  const [dredgeMode, setDredgeMode] = useState<LightingMode>('dia');

  const handleTermClick = onSelectTerm || (() => {});
  const rieamStyle = getCategoryStyle('R.I.E.A.M.');

  const getCardMode = (id: CombinationKind): LightingMode => cardModes[id] ?? 'dia';
  const setCardMode = (id: CombinationKind, next: LightingMode) => {
    setCardModes((prev) => ({ ...prev, [id]: next }));
  };

  const filteredCombinations =
    filter === 'todas'
      ? DAY_SHAPE_COMBINATIONS
      : DAY_SHAPE_COMBINATIONS.filter((item) => item.filterGroup === filter);

  return (
    <section className="rounded-none border border-border bg-secondary/35 p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 font-mono-naut text-[10px] uppercase tracking-[0.12em] text-[#9a7413] mb-1">
            <span>Manual do Marinheiro · Páginas 60–63</span>
          </div>
          <h4 className="font-maritime text-2xl sm:text-3xl font-bold text-primary tracking-tight">
            Combinações de Balões e Significado (R.I.E.A.M.)
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            <GlossaryText
              text="Marcas diurnas regulamentares aplicadas nas respetivas embarcações (com equivalente noturno). Clique em qualquer termo sublinhado a pontilhado para consultar a definição no glossário."
              allTerms={allTerms}
              onSelectTerm={handleTermClick}
            />
          </p>
        </div>

        <span className="font-mono-naut text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
          {filteredCombinations.length} {filteredCombinations.length === 1 ? 'aplicação' : 'aplicações'}
        </span>
      </div>

      {/* Interactive Filter Tabs (matching Glossário category filter buttons) */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {(
          [
            { key: 'todas', label: 'Todas (10)' },
            { key: 'esferas', label: 'Com Esferas (4)' },
            { key: 'cones', label: 'Com Cones (3)' },
            { key: 'cilindro-biconico', label: 'Cilindro & Bicónico (3)' },
          ] as { key: CombinationFilter; label: string }[]
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`rounded-none px-3.5 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium whitespace-nowrap shrink-0 border transition cursor-pointer ${
              filter === tab.key
                ? 'bg-primary text-[#fbf9f0] border-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Combinations Grid (Identical Styling & Rhythm to Glossário TermCards) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCombinations.map((item) => {
          const mode = getCardMode(item.id);
          return (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between rounded-none border border-border bg-card p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary hover:shadow-[4px_4px_0_0_#0b3a55]"
            >
              <div>
                {/* Top Metadata Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 font-mono-naut text-[10px] uppercase tracking-[0.1em]">
                    <span
                      className="w-1.5 h-1.5 rounded-none shrink-0"
                      style={{ backgroundColor: rieamStyle.dotColor }}
                    />
                    <span className="text-[#9a7413] font-semibold">{item.ruleRef}</span>
                  </div>
                  <span className="font-mono-naut text-[10px] text-muted-foreground tabular-nums">
                    {item.number}
                  </span>
                </div>

                {/* Card Title in Editorial Fraunces Serif (plain text — no glossary links in titles) */}
                <h5 className="font-maritime text-2xl font-bold text-primary tracking-tight leading-tight">
                  {item.meaning}
                </h5>

                {/* Category -> Geometry Tag (identical to TermCard) */}
                <div className="font-mono-naut text-[10px] uppercase tracking-[0.08em] mt-1.5 mb-2 flex items-center gap-1.5 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded-none border"
                    style={{
                      backgroundColor: rieamStyle.soft,
                      color: rieamStyle.solid,
                      borderColor: `${rieamStyle.solid}33`,
                    }}
                  >
                    <CategoryIcon category="R.I.E.A.M." className="w-3 h-3 shrink-0" />
                    <span>R.I.E.A.M.</span>
                  </span>
                  <span aria-hidden="true" className="text-muted-foreground">→</span>
                  <span className="text-muted-foreground font-medium">
                    <GlossaryText
                      text={`${item.composition} · ${item.positionNote}`}
                      allTerms={allTerms}
                      onSelectTerm={handleTermClick}
                    />
                  </span>
                </div>

                {/* Vessel Visual Stage + Dia/Noite Pill Toggle + Viewpoint Legend */}
                <div className="my-3 rounded-none border border-border bg-muted overflow-hidden">
                  <div className="flex items-center justify-between gap-2 border-b border-border/80 bg-secondary/45 px-2.5 py-1.5">
                    <span className="font-mono-naut text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                      {mode === 'dia' ? 'Marcas Diurnas' : 'Luzes Noturnas'}
                    </span>
                    <DayNightPillToggle
                      mode={mode}
                      onChange={(next) => setCardMode(item.id, next)}
                    />
                  </div>
                  <CombinationVesselSVG kind={item.id} viewpoint={item.viewpoint} mode={mode} />
                  <div className="border-t border-border/80 bg-secondary/45 px-2.5 py-1 text-center font-mono-naut text-[10px] text-muted-foreground">
                    {item.viewpoint}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  <GlossaryText
                    text={item.description}
                    allTerms={allTerms}
                    onSelectTerm={handleTermClick}
                  />
                </p>

                {/* Night Equivalent Callout (matches TermCard Exam Tip box styling) */}
                <div className="mt-3 rounded-none bg-[#f0e8cf]/65 p-3 border border-[#9a7413]/30 text-xs text-primary">
                  <div className="flex items-center gap-1.5 font-mono-naut font-semibold text-[#9a7413] text-[10px] uppercase tracking-[0.08em] mb-1">
                    <Moon className="w-3.5 h-3.5 text-[#9a7413] shrink-0" />
                    <span>À Noite (Luzes)</span>
                  </div>
                  <p className="text-[12px] text-foreground leading-snug">
                    <GlossaryText
                      text={item.nightLights}
                      allTerms={allTerms}
                      onSelectTerm={handleTermClick}
                    />
                  </p>
                </div>
              </div>

              {/* Glossary-Style Card Footer */}
              <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono-naut text-[10px] uppercase tracking-[0.06em] text-[#9a7413] font-medium">
                  {mode === 'dia' ? 'Sinal Diurno' : 'Sinal Noturno'}
                </span>
                <span className="font-mono-naut text-[10px] uppercase tracking-[0.06em]">
                  Manual pp. 60–63
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* FULL-WIDTH ILLUSTRATED SCHEMATIC: DREDGING WITH OBSTRUCTION (Regra 27 d · Vista de Ré / Popa) */}
      <article className="mt-6 rounded-none border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-1.5 font-mono-naut text-[10px] uppercase tracking-[0.1em] mb-1">
              <span
                className="w-1.5 h-1.5 rounded-none shrink-0"
                style={{ backgroundColor: rieamStyle.dotColor }}
              />
              <span className="text-[#9a7413] font-semibold">Esquema Especial · Regra 27 (d)</span>
            </div>
            <h5 className="font-maritime text-2xl font-bold text-primary tracking-tight leading-tight">
              Dragagem ou Operações Submarinas com Obstrução
            </h5>
          </div>

          {/* Unified Pill Toggle (Dia [Sun|Moon] Noite) */}
          <div className="rounded-none border border-border bg-muted px-3 py-1.5 self-start sm:self-auto shrink-0">
            <DayNightPillToggle mode={dredgeMode} onChange={setDredgeMode} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Detailed Naval Dredger Schematic (Vista de Ré / Popa) */}
          <div className="lg:col-span-7 rounded-none border border-primary/25 overflow-hidden bg-[#dceef9]">
            <svg
              viewBox="0 0 760 370"
              className="w-full h-auto block select-none"
              role="img"
              aria-label="Esquema ilustrativo da Regra 27 d: draga vista de ré (popa) com lado obstruído a bombordo e canal livre a estibordo"
            >
              <defs>
                <linearGradient id={`sky-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={dredgeMode === 'dia' ? '#f8fafc' : '#081523'} />
                  <stop offset="100%" stopColor={dredgeMode === 'dia' ? '#dceef9' : '#0f2840'} />
                </linearGradient>
                <linearGradient id={`sea-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={dredgeMode === 'dia' ? '#93d5f5' : '#0a2238'} stopOpacity="0.92" />
                  <stop offset="100%" stopColor={dredgeMode === 'dia' ? '#3898ce' : '#05121f'} stopOpacity="0.97" />
                </linearGradient>
                <linearGradient id={`hull-white-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={dredgeMode === 'dia' ? '#fcfbf8' : '#475569'} />
                  <stop offset="100%" stopColor={dredgeMode === 'dia' ? '#e5decb' : '#283548'} />
                </linearGradient>
                <linearGradient id={`ball-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="55%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#090d16" />
                </linearGradient>
              </defs>

              {/* Sky */}
              <rect x="0" y="0" width="760" height="270" fill={`url(#sky-${uid})`} />

              {/* Animated Sea Body */}
              <g className="animate-wave-slow">
                <path
                  d="M -32 270 Q 16 265, 64 270 T 160 270 T 256 270 T 352 270 T 448 270 T 544 270 T 640 270 T 736 270 T 792 270 L 792 380 L -32 380 Z"
                  fill={`url(#sea-${uid})`}
                />
              </g>

              {/* Night atmosphere stars + moon crescent */}
              {dredgeMode === 'noite' && (
                <g>
                  <g fill="#f8fafc" opacity="0.65">
                    <circle cx="54" cy="40" r="1.4" />
                    <circle cx="145" cy="24" r="1.1" />
                    <circle cx="242" cy="54" r="1.3" />
                    <circle cx="520" cy="30" r="1.4" />
                    <circle cx="628" cy="48" r="1.2" />
                    <circle cx="715" cy="28" r="1.6" />
                  </g>
                  <path
                    d="M 692 34 A 14 14 0 1 0 706 52 A 11 11 0 1 1 692 34 Z"
                    fill="#fde68a"
                    opacity="0.85"
                  />
                </g>
              )}

              {/* Subtle sea floor bed */}
              <path
                d="M 0 348 Q 140 340, 290 350 T 580 346 T 760 352 L 760 370 L 0 370 Z"
                fill={dredgeMode === 'dia' ? '#0b3a55' : '#020617'}
                fillOpacity="0.22"
              />

              {/* LEFT HIGHLIGHT COLUMN: OBSTRUCTED PORT SIDE (BB) */}
              <rect
                x="16"
                y="16"
                width="196"
                height="242"
                rx="3"
                fill="#b3402f"
                fillOpacity={dredgeMode === 'dia' ? '0.07' : '0.16'}
                stroke="#b3402f"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text
                x="114"
                y="36"
                textAnchor="middle"
                fill={dredgeMode === 'dia' ? '#b3402f' : '#fca5a5'}
                fontSize="11"
                fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace"
              >
                LADO OBSTRUÍDO (BB)
              </text>
              <text
                x="114"
                y="51"
                textAnchor="middle"
                fill={dredgeMode === 'dia' ? '#991b1b' : '#fecaca'}
                fontSize="9.5"
                fontFamily="'IBM Plex Mono', monospace"
              >
                (PROIBIDO PASSAR)
              </text>

              {/* RIGHT HIGHLIGHT COLUMN: FREE STARBOARD CHANNEL SIDE (EB) */}
              <rect
                x="548"
                y="16"
                width="196"
                height="242"
                rx="3"
                fill="#1e7d4f"
                fillOpacity={dredgeMode === 'dia' ? '0.07' : '0.16'}
                stroke="#1e7d4f"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text
                x="646"
                y="36"
                textAnchor="middle"
                fill={dredgeMode === 'dia' ? '#1e7d4f' : '#86efac'}
                fontSize="11"
                fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace"
              >
                LADO LIVRE (EB)
              </text>
              <text
                x="646"
                y="51"
                textAnchor="middle"
                fill={dredgeMode === 'dia' ? '#166534' : '#bbf7d0'}
                fontSize="9.5"
                fontFamily="'IBM Plex Mono', monospace"
              >
                (PASSAGEM SEGURA)
              </text>

              {/* ============ SAFE PASSAGE DIMENSION SPAN (RIGHT CLEAR WATER — NO MINI BOAT, NO ARROW) ============ */}
              <g>
                <line x1="566" y1="304" x2="726" y2="304" stroke={dredgeMode === 'dia' ? '#1e7d4f' : '#4ade80'} strokeWidth="2.2" />
                <line x1="566" y1="296" x2="566" y2="312" stroke={dredgeMode === 'dia' ? '#1e7d4f' : '#4ade80'} strokeWidth="2.2" />
                <line x1="726" y1="296" x2="726" y2="312" stroke={dredgeMode === 'dia' ? '#1e7d4f' : '#4ade80'} strokeWidth="2.2" />
                <text
                  x="646"
                  y="328"
                  textAnchor="middle"
                  fill={dredgeMode === 'dia' ? '#166534' : '#86efac'}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="'IBM Plex Mono', monospace"
                >
                  Canal Livre para Navegação
                </text>
              </g>

              {/* ============ FLOATING DREDGER STERN VIEW (VISTA DE RÉ · POPA) ============ */}
              <g className="animate-boat-bob-subtle" style={{ transformOrigin: '380px 270px' }}>
                {/* Articulated Dredger Gantry & Subsea Suction Pipe on BB (Left) */}
                <line x1="258" y1="224" x2="188" y2="176" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="286" y1="218" x2="188" y2="176" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="188" y1="176" x2="132" y2="296" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="3 2" />
                <path
                  d="M 255 244 C 216 250, 178 264, 152 292 L 108 338"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 255 244 C 216 250, 178 264, 152 292 L 108 338"
                  fill="none"
                  stroke="#b3402f"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                />
                <ellipse cx="104" cy="342" rx="16" ry="9" fill="#1e293b" stroke="#b3402f" strokeWidth="2" />
                <ellipse cx="94" cy="348" rx="34" ry="8" fill="#ca9e1c" fillOpacity="0.28" />
                <text
                  x="116"
                  y="324"
                  textAnchor="middle"
                  fill={dredgeMode === 'dia' ? '#991b1b' : '#fca5a5'}
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="'IBM Plex Mono', monospace"
                >
                  Tubo / Cabo Submerso
                </text>

                {/* Submerged Stern Querena + Twin Rudders (Lemes) & Twin Propellers (Hélices) */}
                <path
                  d="M 244 270 L 516 270 C 510 293, 494 303, 466 305 L 294 305 C 266 303, 250 293, 244 270 Z"
                  fill="#1b4b65"
                  stroke={dredgeMode === 'dia' ? '#0b3a55' : '#475569'}
                  strokeWidth="1.8"
                />
                {/* Center skeg */}
                <rect x="374" y="303" width="12" height="8" fill="#0f293a" />

                {/* Twin Rudders (Port & Starboard stern rudders facing viewer) */}
                {[322, 438].map((rx) => (
                  <g key={rx}>
                    {/* Propeller shaft boss & 4 brass blades behind stern */}
                    <circle cx={rx} cy="291" r="11" fill="#ca9e1c" fillOpacity="0.72" stroke="#090d16" strokeWidth="1.1" />
                    <line x1={rx - 10} y1="291" x2={rx + 10} y2="291" stroke="#9a7413" strokeWidth="3.2" strokeLinecap="round" />
                    <line x1={rx} y1="281" x2={rx} y2="301" stroke="#9a7413" strokeWidth="3.2" strokeLinecap="round" />
                    <circle cx={rx} cy="291" r="3.2" fill="#0f172a" />
                    {/* Vertical rudder blade */}
                    <rect
                      x={rx - 4}
                      y="274"
                      width="8"
                      height="37"
                      rx="1.5"
                      fill="#334155"
                      stroke={dredgeMode === 'dia' ? '#0b3a55' : '#cbd5e1'}
                      strokeWidth="1.2"
                    />
                  </g>
                ))}

                {/* Squared-Off Painel de Popa (Broad Flat Transom Stern Face) */}
                <path
                  d="M 234 218 L 526 218 L 516 270 L 244 270 Z"
                  fill={`url(#hull-white-${uid})`}
                  stroke={dredgeMode === 'dia' ? '#0b3a55' : '#94a3b8'}
                  strokeWidth="2.2"
                />
                {/* Corner Stern Quarters & Heavy Stern Push-Fenders */}
                <rect x="260" y="228" width="10" height="36" rx="2" fill="#334155" stroke="#090d16" strokeWidth="1" />
                <rect x="490" y="228" width="10" height="36" rx="2" fill="#334155" stroke="#090d16" strokeWidth="1" />
                {/* Horizontal Stern Rub-Rail / Verdugo across Transom */}
                <line
                  x1="234"
                  y1="224"
                  x2="526"
                  y2="224"
                  stroke="#64748b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Transom Center Gate + Nameplate clarifying "POPA" */}
                <rect
                  x="338"
                  y="234"
                  width="84"
                  height="22"
                  rx="2"
                  fill={dredgeMode === 'dia' ? '#f0e8cf' : '#1e293b'}
                  stroke={dredgeMode === 'dia' ? '#9a7413' : '#64748b'}
                  strokeWidth="1.2"
                />
                <text
                  x="380"
                  y="249"
                  textAnchor="middle"
                  fill={dredgeMode === 'dia' ? '#0b3a55' : '#fde68a'}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="'IBM Plex Mono', monospace"
                >
                  POPA · DRAGA
                </text>

                {/* Stern Mooring Bitts (Cabeços de Popa) & Aft Bulwark Stanchions */}
                {[246, 510].map((bx) => (
                  <g key={bx} transform={`translate(${bx}, 207)`}>
                    <rect x="-4" y="4" width="8" height="7" fill="#475569" stroke="#090d16" strokeWidth="0.9" />
                    <rect x="-6" y="2" width="12" height="3" fill="#334155" />
                  </g>
                ))}
                <line x1="238" y1="210" x2="522" y2="210" stroke="#64748b" strokeWidth="1.2" />
                {[278, 304, 456, 482].map((sx) => (
                  <line
                    key={sx}
                    x1={sx}
                    y1="210"
                    x2={sx}
                    y2="218"
                    stroke={dredgeMode === 'dia' ? '#0b3a55' : '#94a3b8'}
                    strokeWidth="2"
                  />
                ))}

                {/* Aft Superstructure Bulkhead + Twin Symmetrical Exhaust Funnels */}
                <path
                  d="M 304 218 L 310 184 L 450 184 L 456 218 Z"
                  fill={dredgeMode === 'dia' ? '#fcfbf8' : '#334155'}
                  stroke={dredgeMode === 'dia' ? '#0b3a55' : '#94a3b8'}
                  strokeWidth="1.8"
                />
                {/* Aft bulkhead doors + orange lifebuoy on aft wall */}
                <rect x="322" y="191" width="14" height="24" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <rect x="424" y="191" width="14" height="24" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="380" cy="202" r="7" fill="none" stroke="#ea580c" strokeWidth="3.5" />

                {/* Aft Bridge Deckhouse & Twin Port/Starboard Stacks */}
                <path
                  d="M 328 184 L 334 158 L 426 158 L 432 184 Z"
                  fill={dredgeMode === 'dia' ? '#f7f3e8' : '#1e293b'}
                  stroke={dredgeMode === 'dia' ? '#0b3a55' : '#94a3b8'}
                  strokeWidth="1.8"
                />
                <rect
                  x="342"
                  y="165"
                  width="76"
                  height="10"
                  rx="1"
                  fill={dredgeMode === 'dia' ? '#1e3a5f' : '#fde047'}
                  fillOpacity={dredgeMode === 'dia' ? '0.88' : '0.78'}
                />
                {/* Twin aft funnels */}
                <path d="M 332 158 L 335 140 L 347 140 L 349 158 Z" fill="#0b3a55" stroke="#94a3b8" strokeWidth="1.1" />
                <rect x="334" y="144" width="12" height="3.5" fill="#ca9e1c" />
                <path d="M 411 158 L 413 140 L 425 140 L 428 158 Z" fill="#0b3a55" stroke="#94a3b8" strokeWidth="1.1" />
                <rect x="413" y="144" width="12" height="3.5" fill="#ca9e1c" />

                {/* Main Signal Mast & Wide Yardarm */}
                <line
                  x1="380"
                  y1="26"
                  x2="380"
                  y2="158"
                  stroke={dredgeMode === 'dia' ? '#0b3a55' : '#cbd5e1'}
                  strokeWidth="3.6"
                  strokeLinecap="round"
                />
                <line x1="380" y1="42" x2="328" y2="158" stroke="#94a3b8" strokeWidth="1.2" />
                <line x1="380" y1="42" x2="432" y2="158" stroke="#94a3b8" strokeWidth="1.2" />
                <line
                  x1="212"
                  y1="62"
                  x2="548"
                  y2="62"
                  stroke={dredgeMode === 'dia' ? '#0b3a55' : '#cbd5e1'}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <line x1="220" y1="62" x2="220" y2="162" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="3 2" />
                <line x1="540" y1="62" x2="540" y2="162" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="3 2" />

                {/* Signals on Center Mast & Yardarms */}
                {dredgeMode === 'dia' ? (
                  <>
                    <circle cx="380" cy="44" r="10.5" fill={`url(#ball-${uid})`} stroke="#090d16" strokeWidth="1.2" />
                    <polygon points="380,67 394,83 380,99 366,83" fill={`url(#ball-${uid})`} stroke="#090d16" strokeWidth="1.2" />
                    <circle cx="380" cy="121" r="10.5" fill={`url(#ball-${uid})`} stroke="#090d16" strokeWidth="1.2" />
                    <text
                      x="380"
                      y="148"
                      textAnchor="middle"
                      fill="#0b3a55"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      MANOBRA REDUZIDA
                    </text>

                    <circle cx="220" cy="88" r="12" fill={`url(#ball-${uid})`} stroke="#090d16" strokeWidth="1.2" />
                    <circle cx="220" cy="128" r="12" fill={`url(#ball-${uid})`} stroke="#090d16" strokeWidth="1.2" />
                    <text
                      x="114"
                      y="206"
                      textAnchor="middle"
                      fill="#b3402f"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      2 Esferas Pretas
                    </text>

                    <polygon points="540,72 554,88 540,104 526,88" fill={`url(#ball-${uid})`} stroke="#090d16" strokeWidth="1.2" />
                    <polygon points="540,112 554,128 540,144 526,128" fill={`url(#ball-${uid})`} stroke="#090d16" strokeWidth="1.2" />
                    <text
                      x="646"
                      y="206"
                      textAnchor="middle"
                      fill="#1e7d4f"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      2 Bicónicos Pretos
                    </text>
                  </>
                ) : (
                  <>
                    <circle cx="380" cy="44" r="13" fill="#ef4444" fillOpacity="0.32" />
                    <circle cx="380" cy="44" r="7.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="380" cy="83" r="13" fill="#ffffff" fillOpacity="0.32" />
                    <circle cx="380" cy="83" r="7.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                    <circle cx="380" cy="121" r="13" fill="#ef4444" fillOpacity="0.32" />
                    <circle cx="380" cy="121" r="7.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    <text
                      x="380"
                      y="148"
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      VERM · BRANCA · VERM
                    </text>

                    <circle cx="220" cy="88" r="15" fill="#ef4444" fillOpacity="0.34" />
                    <circle cx="220" cy="88" r="8.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="220" cy="128" r="15" fill="#ef4444" fillOpacity="0.34" />
                    <circle cx="220" cy="128" r="8.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    <text
                      x="114"
                      y="206"
                      textAnchor="middle"
                      fill="#fca5a5"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      2 Luzes Vermelhas
                    </text>

                    <circle cx="540" cy="88" r="15" fill="#22c55e" fillOpacity="0.34" />
                    <circle cx="540" cy="88" r="8.5" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="540" cy="128" r="15" fill="#22c55e" fillOpacity="0.34" />
                    <circle cx="540" cy="128" r="8.5" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />
                    <text
                      x="646"
                      y="206"
                      textAnchor="middle"
                      fill="#86efac"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      2 Luzes Verdes
                    </text>
                  </>
                )}
              </g>

              {/* Animated foreground wave crests */}
              <g className="animate-wave-slow">
                <path
                  d="M -32 270 Q 16 265, 64 270 T 160 270 T 256 270 T 352 270 T 448 270 T 544 270 T 640 270 T 736 270 T 792 270"
                  fill="none"
                  stroke={dredgeMode === 'dia' ? '#0284c7' : '#38bdf8'}
                  strokeWidth="2.2"
                />
              </g>
              <g className="animate-wave-reverse" opacity="0.45">
                <path
                  d="M -32 288 Q 24 284, 80 288 T 192 288 T 304 288 T 416 288 T 528 288 T 640 288 T 792 288"
                  fill="none"
                  stroke={dredgeMode === 'dia' ? '#e0f2fe' : '#38bdf8'}
                  strokeWidth="1.5"
                />
              </g>
            </svg>
            <div className="border-t border-border bg-secondary/55 px-3 py-1.5 text-center font-mono-naut text-[10px] text-muted-foreground">
              Embarcação vista de ré (popa da draga · obstrução a Bombordo e canal livre a Estibordo)
            </div>
          </div>

          {/* Explanation Column matching Glossary Card style */}
          <div className="lg:col-span-5 space-y-3 text-xs text-primary">
            <div className="rounded-none border border-[#b3402f]/35 bg-[#f3ded9]/45 p-3.5">
              <div className="font-mono-naut text-[10px] font-semibold uppercase tracking-[0.08em] text-[#b3402f] mb-1">
                Lado da Obstrução · Proibido Passar
              </div>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                <GlossaryText
                  text="De dia exibe 2 balões esféricos pretos na vertical; à noite exibe 2 luzes vermelhas em linha vertical."
                  allTerms={allTerms}
                  onSelectTerm={handleTermClick}
                />
              </p>
            </div>

            <div className="rounded-none border border-[#1e7d4f]/35 bg-[#dcebe1]/55 p-3.5">
              <div className="font-mono-naut text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1e7d4f] mb-1">
                Lado Livre · Passagem Segura
              </div>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                <GlossaryText
                  text="De dia exibe 2 balões bicónicos (losangos) na vertical; à noite exibe 2 luzes verdes em linha vertical."
                  allTerms={allTerms}
                  onSelectTerm={handleTermClick}
                />
              </p>
            </div>

            <div className="rounded-none bg-[#f0e8cf]/65 p-3.5 border border-[#9a7413]/30">
              <div className="flex items-center gap-1.5 font-mono-naut font-semibold text-[#9a7413] text-[10px] uppercase tracking-[0.08em] mb-1">
                <Anchor className="w-3.5 h-3.5 shrink-0" />
                <span>Importante para o Exame</span>
              </div>
              <p className="text-[12px] text-foreground leading-relaxed">
                <GlossaryText
                  text="Mesmo quando estiver fundeada a trabalhar, uma draga ou navio em operações submarinas com obstrução NÃO exibe luzes nem balão de fundeado — mantém apenas as marcas da Regra 27 (d)."
                  allTerms={allTerms}
                  onSelectTerm={handleTermClick}
                />
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Supplementary Manual pp. 60–63 Exam Rules (Matching Glossary Card Style) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-none border border-[#9a7413]/30 bg-[#f0e8cf]/65 p-5 text-xs text-primary">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#9a7413] shrink-0 mt-0.5" />
            <div>
              <h6 className="font-mono-naut text-[10px] uppercase tracking-[0.08em] font-semibold text-[#9a7413]">
                Atenção às Formas Parecidas no Exame
              </h6>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-foreground">
                <GlossaryText
                  text="Bicónico (losango) são 2 cones unidos pelas bases (Reboque > 200 m e centro de Capacidade de Manobra Reduzida). Ampulheta são 2 cones unidos pelos vértices (Faina da Pesca)."
                  allTerms={allTerms}
                  onSelectTerm={handleTermClick}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-none border border-border bg-card p-5 text-xs text-primary">
          <h6 className="font-mono-naut text-[10px] uppercase tracking-[0.08em] font-semibold text-primary">
            Outras Regras das Páginas 60–63 (Mergulhadores e Pequenas Embarcações)
          </h6>
          <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed list-disc list-inside">
            <li>
              <GlossaryText
                text="Operações de mergulho em embarcação de pequenas dimensões (Regra 27 e): pode exibir uma réplica rígida da bandeira Alfa (branca e azul, Código Internacional de Sinais) com ≥ 1 m de altura."
                allTerms={allTerms}
                onSelectTerm={handleTermClick}
              />
            </li>
            <li>
              <GlossaryText
                text="Dispensas (< 12 m): Embarcações de comprimento inferior a 12 m (exceto mergulhadores) estão dispensadas de exibir as marcas diurnas da Regra 27 e as 3 esferas de encalhada."
                allTerms={allTerms}
                onSelectTerm={handleTermClick}
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

