import React, { useState } from 'react';
import { Compass, Ship, Navigation, Volume2, Layers, Flag } from 'lucide-react';
import { User } from 'firebase/auth';
import { NauticalTerm } from '../types/glossary';
import { DayShapesIllustration } from './DayShapesIllustration';
import { SignalFlagsIllustration } from './SignalFlagsIllustration';
import { BuoyIllustration } from './BuoyIllustration';
import { BoatAnatomyGuide } from './BoatAnatomyGuide';

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
  const [activeSection, setActiveSection] = useState<'barco' | 'luzes' | 'iala' | 'sons' | 'baloes' | 'bandeiras'>('barco');

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
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-maritime text-2xl sm:text-3xl font-bold text-[#112338] flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#a16207]" />
          Guia Visual Náutico da Carta de Marinheiro
        </h2>
        <p className="text-xs sm:text-sm text-[#64748b]">
          Esquemas visuais interativos dos tópicos com maior taxa de perguntas no exame oficial da DGRM.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[#ded5c2] pb-4">
        <button
          onClick={() => setActiveSection('barco')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'barco'
              ? 'bg-[#112338] text-[#fbf8f2] shadow-sm'
              : 'border border-[#ded5c2] bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>Partes do Barco</span>
        </button>

        <button
          onClick={() => setActiveSection('luzes')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'luzes'
              ? 'bg-[#112338] text-[#fbf8f2] shadow-sm'
              : 'border border-[#ded5c2] bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Setores de Luzes (RIPAM)</span>
        </button>

        <button
          onClick={() => setActiveSection('iala')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'iala'
              ? 'bg-[#112338] text-[#fbf8f2] shadow-sm'
              : 'border border-[#ded5c2] bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>Balizamento (IALA A)</span>
        </button>

        <button
          onClick={() => setActiveSection('sons')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'sons'
              ? 'bg-[#112338] text-[#fbf8f2] shadow-sm'
              : 'border border-[#ded5c2] bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Sinais Sonoros com Áudio</span>
        </button>

        <button
          onClick={() => setActiveSection('baloes')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'baloes'
              ? 'bg-[#112338] text-[#fbf8f2] shadow-sm'
              : 'border border-[#ded5c2] bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Balões (Marcas Diurnas)</span>
        </button>

        <button
          onClick={() => setActiveSection('bandeiras')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'bandeiras'
              ? 'bg-[#112338] text-[#fbf8f2] shadow-sm'
              : 'border border-[#ded5c2] bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
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

      {/* SECTION 2: SETORES DE LUZES (RIPAM) */}
      {activeSection === 'luzes' && (
        <div className="rounded-3xl border border-[#ded5c2] bg-[#fdfcf9] p-6 sm:p-8 shadow-sm">
          <h3 className="font-maritime text-2xl font-bold text-[#112338] mb-2">
            Setores Regulamentares das Luzes de Navegação
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] mb-6">
            Obrigatoriedade entre o pôr e o nascer do sol. A soma dos setores cobre exatamente 360º ao redor do barco:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#a7f3d0] bg-[#ecfdf5] p-5">
              <div className="flex items-center gap-2 font-bold text-[#065f46] text-base mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-full bg-[#15803d]" />
                Luz de Estibordo: Verde (112,5º)
              </div>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Visível da proa até 22,5º para a ré do través de estibordo (total de 10 quartas da agulha).
              </p>
            </div>

            <div className="rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-5">
              <div className="flex items-center gap-2 font-bold text-[#991b1b] text-base mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-full bg-[#b91c1c]" />
                Luz de Bombordo: Vermelha (112,5º)
              </div>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Visível da proa até 22,5º para a ré do través de bombordo (total de 10 quartas da agulha).
              </p>
            </div>

            <div className="rounded-2xl border border-[#ded5c2] bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-[#112338] text-base mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-full bg-[#f1ebe0] border border-[#ded5c2]" />
                Luz de Alcance (Popa): Branca (135º)
              </div>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Colocada o mais perto possível da popa. Visível num setor de 135 graus ininterrupto (67,5º para cada bordo a partir da ré).
              </p>
            </div>

            <div className="rounded-2xl border border-[#d2deeb] bg-[#f0f4f8] p-5">
              <div className="flex items-center gap-2 font-bold text-[#1e3a5f] text-base mb-2 font-maritime text-xl">
                <span className="h-4 w-4 rounded-full bg-[#3b82f6]" />
                Luz de Mastro / Tope: Branca (225º)
              </div>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
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
        <div className="rounded-3xl border border-[#ded5c2] bg-[#fdfcf9] p-6 sm:p-8 shadow-sm">
          <h3 className="font-maritime text-2xl font-bold text-[#112338] mb-2 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-[#a16207]" />
            Sinais Sonoros de Manobra (RIPAM Regra 34)
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] mb-6">
            Ouça os apitos reais tocados pela buzina de bordo tocando no botão "Tocar Sinal":
          </p>

          <div className="space-y-3">
            {[
              {
                signal: '1 Apito Curto (1s)',
                meaning: 'Estou a guinar para Estibordo (EB)',
                pattern: [0.8],
                badge: 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]',
              },
              {
                signal: '2 Apitos Curtos',
                meaning: 'Estou a guinar para Bombordo (BB)',
                pattern: [0.8, 0.8],
                badge: 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]',
              },
              {
                signal: '3 Apitos Curtos',
                meaning: 'As minhas máquinas estão a fazer marcha à ré (travar / ciar)',
                pattern: [0.8, 0.8, 0.8],
                badge: 'bg-[#f0fdfa] text-[#0f766e] border-[#ccfbf1]',
              },
              {
                signal: '5 Apitos Curtos Rápidos',
                meaning: 'Dúvida sobre a sua manobra / Perigo imediato!',
                pattern: [0.3, 0.3, 0.3, 0.3, 0.3],
                badge: 'bg-[#fefce8] text-[#854d0e] border-[#fef08a]',
              },
              {
                signal: '1 Apito Longo (4 a 6s)',
                meaning: 'Aproximação de curva cega de rio / aviso sob nevoeiro',
                pattern: [3.5],
                badge: 'bg-[#f5f3ff] text-[#5b21b6] border-[#ddd6fe]',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white p-4.5 border border-[#ded5c2] shadow-2xs"
              >
                <div>
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold border mb-1 ${item.badge}`}>
                    {item.signal}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1e293b]">{item.meaning}</p>
                </div>

                <button
                  onClick={() => playSoundSignal(item.pattern)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#112338] px-4 py-2 text-xs font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition active:scale-95 shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
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
          <DayShapesIllustration termId="baloes-de-navegacao" variant="modal" />
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
