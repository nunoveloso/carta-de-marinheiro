import React, { useState } from 'react';
import { Compass, Ship, Navigation, Volume2, Layers, Flag, Ruler, Box } from 'lucide-react';
import { User } from 'firebase/auth';
import { NauticalTerm } from '../types/glossary';
import { DayShapesIllustration, DayShapeCombinationsBlock } from './DayShapesIllustration';
import { SignalFlagsIllustration } from './SignalFlagsIllustration';
import { BuoyIllustration } from './BuoyIllustration';
import { BoatAnatomyGuide } from './BoatAnatomyGuide';
import { BoatSideProfileGuide } from './BoatSideProfileGuide';
import { Boat3DViewer } from './Boat3DViewer';

export interface VisualGuideViewProps {
  terms?: NauticalTerm[];
  onSelectTerm?: (term: NauticalTerm) => void;
  currentUser?: User | null;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
  userNotes?: Record<string, string>;
  onSaveNote?: (id: string, note: string) => Promise<void>;
  onOpenAuth?: () => void;
}

export const VisualGuideView: React.FC<VisualGuideViewProps> = ({
  terms,
  onSelectTerm,
  currentUser,
  bookmarkedIds,
  onToggleBookmark,
  userNotes,
  onSaveNote,
  onOpenAuth,
}) => {
  const [activeSection, setActiveSection] = useState<'barco' | 'lateral' | 'modelo3d' | 'luzes' | 'iala' | 'sons' | 'baloes' | 'bandeiras'>('barco');

  // Web Audio ship horn beeper
  const playSoundSignal = (pattern: number[]) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      let startTime = ctx.currentTime + 0.05;

      pattern.forEach((duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.04);
        gain.gain.setValueAtTime(0.3, startTime + duration - 0.04);
        gain.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);

        startTime += duration + 0.25;
      });
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Editorial Hero Header matching Glossário page style */}
      <div className="relative rounded-none border border-border bg-muted/60 p-6 sm:p-8 mb-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-2.5">
            <Compass className="w-4 h-4 text-[#9a7413]" />
            <span>DGRM Portugal</span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>Manual do Marinheiro (2021)</span>
          </div>
          <h1 className="font-maritime text-3xl sm:text-5xl font-bold text-primary tracking-tight leading-tight">
            Guia Visual Náutico da Carta de Marinheiro
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Esquemas visuais interativos dos tópicos com maior taxa de perguntas no exame oficial da DGRM.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 border-b border-border pb-4">
        <button
          onClick={() => setActiveSection('barco')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'barco'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>Partes do Barco</span>
        </button>

        <button
          onClick={() => setActiveSection('lateral')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'lateral'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Ruler className="w-4 h-4" />
          <span>Vista Lateral do Casco</span>
        </button>

        <button
          onClick={() => setActiveSection('modelo3d')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'modelo3d'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Barco 3D (360°)</span>
        </button>

        <button
          onClick={() => setActiveSection('luzes')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'luzes'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Setores de Luzes (RIPAM)</span>
        </button>

        <button
          onClick={() => setActiveSection('iala')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'iala'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>Balizamento (IALA A)</span>
        </button>

        <button
          onClick={() => setActiveSection('sons')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'sons'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Sinais Sonoros com Áudio</span>
        </button>

        <button
          onClick={() => setActiveSection('baloes')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'baloes'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Balões (Marcas Diurnas)</span>
        </button>

        <button
          onClick={() => setActiveSection('bandeiras')}
          className={`flex items-center gap-2 rounded-none px-3.5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.06em] font-medium border transition whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'bandeiras'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>Bandeiras (CIS & Morse)</span>
        </button>
      </div>

      {/* SECTION 1: PARTES DO BARCO (MUSEUM INTERACTIVE EXHIBIT) */}
      {activeSection === 'barco' && (
        <BoatAnatomyGuide
          allTerms={terms}
          onSelectTerm={onSelectTerm}
          currentUser={currentUser}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={onToggleBookmark}
          userNotes={userNotes}
          onSaveNote={onSaveNote}
          onOpenAuth={onOpenAuth}
        />
      )}

      {/* SECTION 1B: VISTA LATERAL E CORTE ESTRUTURAL (MANUAL PP. 4-5) */}
      {activeSection === 'lateral' && (
        <BoatSideProfileGuide
          allTerms={terms}
          onSelectTerm={onSelectTerm}
          currentUser={currentUser}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={onToggleBookmark}
          userNotes={userNotes}
          onSaveNote={onSaveNote}
          onOpenAuth={onOpenAuth}
        />
      )}

      {/* SECTION 1C: MODELO 3D INTERATIVO (ROTAÇÃO 360°) */}
      {activeSection === 'modelo3d' && (
        <Boat3DViewer
          allTerms={terms}
          onSelectTerm={onSelectTerm}
          currentUser={currentUser}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={onToggleBookmark}
          userNotes={userNotes}
          onSaveNote={onSaveNote}
          onOpenAuth={onOpenAuth}
        />
      )}

      {/* SECTION 2: SETORES DE LUZES (RIPAM) */}
      {activeSection === 'luzes' && (
        <div className="rounded-none border border-border bg-card p-6 sm:p-8">
          <h3 className="font-maritime text-2xl font-bold text-primary mb-2">
            Setores Regulamentares das Luzes de Navegação
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6">
            Obrigatoriedade entre o pôr e o nascer do sol. A soma dos setores cobre exatamente 360º ao redor do barco:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-none border border-[#1e7d4f]/40 bg-[#dcebe1]/60 p-5">
              <div className="flex items-center gap-2 font-bold text-[#1e7d4f] mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-none bg-[#1e7d4f]" />
                Luz de Estibordo: Verde (112,5º)
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                Visível da proa até 22,5º para a ré do través de estibordo (total de 10 quartas da agulha).
              </p>
            </div>

            <div className="rounded-none border border-[#b3402f]/40 bg-[#f3ded9]/60 p-5">
              <div className="flex items-center gap-2 font-bold text-[#b3402f] mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-none bg-[#b3402f]" />
                Luz de Bombordo: Vermelha (112,5º)
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                Visível da proa até 22,5º para a ré do través de bombordo (total de 10 quartas da agulha).
              </p>
            </div>

            <div className="rounded-none border border-border bg-background p-5">
              <div className="flex items-center gap-2 font-bold text-primary mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-none bg-card border border-primary" />
                Luz de Alcance (Popa): Branca (135º)
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                Colocada o mais perto possível da popa. Visível num setor de 135 graus ininterrupto (67,5º para cada bordo a partir da ré).
              </p>
            </div>

            <div className="rounded-none border border-primary/30 bg-[#dce8ef]/60 p-5">
              <div className="flex items-center gap-2 font-bold text-primary mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-none bg-primary" />
                Luz de Mastro / Tope: Branca (225º)
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                Luz branca sobre a linha longitudinal, visível para a frente cobrindo a proa até 22,5º para a ré do través em ambos os bordos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BALIZAMENTO (IALA A) */}
      {activeSection === 'iala' && (
        <div className="space-y-6">
          <BuoyIllustration termId="sistema-de-balizagem-iala" variant="modal" />
        </div>
      )}

      {/* SECTION 4: SINAIS SONOROS */}
      {activeSection === 'sons' && (
        <div className="rounded-none border border-border bg-card p-6 sm:p-8">
          <h3 className="font-maritime text-2xl font-bold text-primary mb-2 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-[#9a7413]" />
            Sinais Sonoros de Manobra (RIPAM Regra 34)
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6">
            Ouça os apitos reais tocados pela buzina de bordo tocando no botão "Tocar Sinal":
          </p>

          <div className="space-y-3">
            {[
              {
                signal: '1 Apito Curto (1s)',
                meaning: 'Estou a guinar para Estibordo (EB)',
                pattern: [0.8],
                badge: 'bg-[#dcebe1] text-[#1e7d4f] border-[#1e7d4f]/30',
              },
              {
                signal: '2 Apitos Curtos',
                meaning: 'Estou a guinar para Bombordo (BB)',
                pattern: [0.8, 0.8],
                badge: 'bg-[#f3ded9] text-[#b3402f] border-[#b3402f]/30',
              },
              {
                signal: '3 Apitos Curtos',
                meaning: 'As minhas máquinas estão a fazer marcha à ré (travar / ciar)',
                pattern: [0.8, 0.8, 0.8],
                badge: 'bg-[#dce8ef] text-[#0b3a55] border-[#0b3a55]/30',
              },
              {
                signal: '5 Apitos Curtos Rápidos',
                meaning: 'Dúvida sobre a sua manobra / Perigo imediato!',
                pattern: [0.3, 0.3, 0.3, 0.3, 0.3],
                badge: 'bg-[#f0e8cf] text-[#9a7413] border-[#9a7413]/40',
              },
              {
                signal: '1 Apito Longo (4 a 6s)',
                meaning: 'Aproximação de curva cega de rio / aviso sob nevoeiro',
                pattern: [3.5],
                badge: 'bg-secondary text-primary border-border',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-none bg-background p-4 border border-border"
              >
                <div>
                  <span className={`inline-block rounded-none px-2 py-0.5 font-mono-naut text-[11px] uppercase tracking-wider font-semibold border mb-1.5 ${item.badge}`}>
                    {item.signal}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">{item.meaning}</p>
                </div>

                <button
                  onClick={() => playSoundSignal(item.pattern)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-none bg-primary px-4 py-2 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-primary-foreground hover:bg-[#082b3f] transition active:scale-95 whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#ca9e1c]" />
                  <span>Tocar Sinal</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: BALÕES E MARCAS DIURNAS */}
      {activeSection === 'baloes' && (
        <div className="space-y-6">
          <DayShapesIllustration
            termId="baloes-de-navegacao"
            variant="modal"
            allTerms={terms}
            onSelectTerm={onSelectTerm}
          />
          <DayShapeCombinationsBlock
            allTerms={terms}
            onSelectTerm={onSelectTerm}
          />
        </div>
      )}

      {/* SECTION 6: BANDEIRAS CIS E CÓDIGO MORSE */}
      {activeSection === 'bandeiras' && (
        <div className="space-y-6">
          <SignalFlagsIllustration termId="codigo-internacional-de-sinais" variant="modal" />
        </div>
      )}
    </div>
  );
};
