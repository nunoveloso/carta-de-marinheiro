import React, { useState } from 'react';
import { Compass, Ship, Navigation, Volume2, ShieldCheck, Info } from 'lucide-react';

export const VisualGuideView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'barco' | 'luzes' | 'iala' | 'sons'>('barco');
  const [selectedBoatPart, setSelectedBoatPart] = useState<string>('eb');

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
        osc.frequency.setValueAtTime(320, startTime); // Deep maritime horn pitch

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.04);
        gain.gain.setValueAtTime(0.3, startTime + duration - 0.04);
        gain.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);

        startTime += duration + 0.25; // Gap between blasts
      });
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-cyan-400" />
          Guia Visual Náutico da Carta de Marinheiro
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Esquemas visuais interativos dos tópicos com maior taxa de perguntas no exame oficial da DGRM.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveSection('barco')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'barco'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>Partes do Barco</span>
        </button>

        <button
          onClick={() => setActiveSection('luzes')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'luzes'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Setores de Luzes (RIPAM)</span>
        </button>

        <button
          onClick={() => setActiveSection('iala')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'iala'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>Balizamento (IALA A)</span>
        </button>

        <button
          onClick={() => setActiveSection('sons')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeSection === 'sons'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Sinais Sonoros com Áudio</span>
        </button>
      </div>

      {/* SECTION 1: PARTES DO BARCO */}
      {activeSection === 'barco' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Ship className="w-5 h-5 text-cyan-400" />
              Esquema Interativo da Embarcação
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Toque nas diferentes zonas do casco para ver a definição e a regra para o exame:
            </p>

            {/* Interactive SVG Diagram */}
            <div className="relative mx-auto max-w-lg rounded-2xl bg-slate-950 p-6 border border-slate-800 text-center">
              <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-lg">
                {/* Hull shape */}
                <path
                  d="M 60 120 C 60 70, 160 50, 320 80 C 370 120, 370 120, 320 160 C 160 190, 60 170, 60 120 Z"
                  fill="#1e293b"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Centerline */}
                <line x1="60" y1="120" x2="350" y2="120" stroke="#475569" strokeDasharray="4 4" strokeWidth="2" />

                {/* Bow / Proa Button (Right) */}
                <circle
                  cx="330"
                  cy="120"
                  r="20"
                  className="cursor-pointer transition hover:scale-110"
                  fill={selectedBoatPart === 'proa' ? '#0ea5e9' : '#0284c7'}
                  onClick={() => setSelectedBoatPart('proa')}
                />
                <text x="330" y="124" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                  PROA
                </text>

                {/* Stern / Popa Button (Left) */}
                <circle
                  cx="80"
                  cy="120"
                  r="20"
                  className="cursor-pointer transition hover:scale-110"
                  fill={selectedBoatPart === 'popa' ? '#0ea5e9' : '#0284c7'}
                  onClick={() => setSelectedBoatPart('popa')}
                />
                <text x="80" y="124" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                  POPA
                </text>

                {/* Starboard / Estibordo (Top, looking to bow right) */}
                <g className="cursor-pointer" onClick={() => setSelectedBoatPart('eb')}>
                  <rect
                    x="180"
                    y="50"
                    width="70"
                    height="26"
                    rx="8"
                    fill={selectedBoatPart === 'eb' ? '#22c55e' : '#15803d'}
                  />
                  <text x="215" y="67" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ESTIBORDO (EB)
                  </text>
                </g>

                {/* Port / Bombordo (Bottom, looking to bow left) */}
                <g className="cursor-pointer" onClick={() => setSelectedBoatPart('bb')}>
                  <rect
                    x="180"
                    y="164"
                    width="70"
                    height="26"
                    rx="8"
                    fill={selectedBoatPart === 'bb' ? '#ef4444' : '#b91c1c'}
                  />
                  <text x="215" y="181" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    BOMBORDO (BB)
                  </text>
                </g>

                {/* Midships / Meia-nau */}
                <circle
                  cx="215"
                  cy="120"
                  r="14"
                  className="cursor-pointer"
                  fill={selectedBoatPart === 'meia' ? '#f59e0b' : '#b45309'}
                  onClick={() => setSelectedBoatPart('meia')}
                />
                <text x="215" y="124" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                  1/2
                </text>
              </svg>
            </div>

            {/* Selected boat part explanation card */}
            <div className="mt-6 rounded-2xl bg-slate-950/80 p-5 border border-slate-800">
              {selectedBoatPart === 'eb' && (
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-1">
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    Estibordo (EB) — Bordo Direito
                  </div>
                  <p className="text-sm text-slate-300">
                    O lado direito da embarcação para quem olha para a proa. À noite é assinalado pela luz verde com setor de 112,5 graus.
                  </p>
                  <p className="mt-2 text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30">
                    <strong>Regra RIPAM de Exame:</strong> Em rumos cruzados, a embarcação que avista a outra pelo seu estibordo DEVE ceder a passagem!
                  </p>
                </div>
              )}

              {selectedBoatPart === 'bb' && (
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-1">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    Bombordo (BB) — Bordo Esquerdo
                  </div>
                  <p className="text-sm text-slate-300">
                    O lado esquerdo da embarcação para quem olha para a proa. À noite é assinalado pela luz vermelha com setor de 112,5 graus.
                  </p>
                  <p className="mt-2 text-xs text-cyan-300 bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-500/30">
                    <strong>Mnemónica de Exame:</strong> "Bom-bor-do" tem R (veRmelho). Ao entrar na barra em Portugal, bóias vermelhas ficam a Bombordo!
                  </p>
                </div>
              )}

              {selectedBoatPart === 'proa' && (
                <div>
                  <div className="text-cyan-400 font-bold text-base mb-1">Proa (Vante)</div>
                  <p className="text-sm text-slate-300">
                    Extremidade anterior do barco. A navegação orienta-se pela proa. Em situação de colisão com proa com proa (roda a roda), ambas as embarcações guinam para estibordo.
                  </p>
                </div>
              )}

              {selectedBoatPart === 'popa' && (
                <div>
                  <div className="text-cyan-400 font-bold text-base mb-1">Popa (Ré)</div>
                  <p className="text-sm text-slate-300">
                    Extremidade posterior do barco. Aqui exibe-se a luz de alcance (luz branca fixa de 135 graus) e o pavilhão nacional.
                  </p>
                </div>
              )}

              {selectedBoatPart === 'meia' && (
                <div>
                  <div className="text-amber-400 font-bold text-base mb-1">Meia-Nau</div>
                  <p className="text-sm text-slate-300">
                    A secção média equidistante da proa e da popa. É a meia-nau que se mede a Boca máxima, o Calado e o Bordo Livre da embarcação.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SETORES DE LUZES (RIPAM) */}
      {activeSection === 'luzes' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-2">
            Setores Regulamentares das Luzes de Navegação
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Obrigatoriedade entre o pôr e o nascer do sol. A soma dos setores cobre exatamente 360º ao redor do barco:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
              <div className="flex items-center gap-2 font-bold text-emerald-300 text-base mb-2">
                <span className="h-4 w-4 rounded-full bg-emerald-500" />
                Luz de Estibordo: Verde (112,5º)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Visível da proa até 22,5º para a ré do través de estibordo (total de 10 quartas da agulha).
              </p>
            </div>

            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5">
              <div className="flex items-center gap-2 font-bold text-rose-300 text-base mb-2">
                <span className="h-4 w-4 rounded-full bg-rose-500" />
                Luz de Bombordo: Vermelha (112,5º)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Visível da proa até 22,5º para a ré do través de bombordo (total de 10 quartas da agulha).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
                Luz de Alcance (Popa): Branca (135º)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Colocada o mais perto possível da popa. Visível num setor de 135 graus ininterrupto (67,5º para cada bordo a partir da ré).
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5">
              <div className="flex items-center gap-2 font-bold text-cyan-300 text-base mb-2">
                <span className="h-4 w-4 rounded-full bg-cyan-200" />
                Luz de Mastro / Tope: Branca (225º)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Luz branca sobre a linha longitudinal, visível para a frente cobrindo a proa até 22,5º para a ré do través em ambos os bordos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BALIZAMENTO (IALA A) */}
      {activeSection === 'iala' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-2">
              Sistema de Balizamento Marítimo IALA Região A (Portugal)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Em Portugal e na Europa aplica-se a Região A. A regra fundamental ao entrar do mar para o porto:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl bg-emerald-950/30 p-5 border border-emerald-500/40">
                <div className="text-emerald-400 font-bold text-base mb-1">
                  Entrada de Barra: Estibordo
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p><strong>Cor:</strong> Verde</p>
                  <p><strong>Formato:</strong> Cónica (com topo cónico)</p>
                  <p><strong>Luz:</strong> Verde</p>
                  <p><strong>Regra:</strong> Fica à direita da embarcação que entra no canal.</p>
                </div>
              </div>

              <div className="rounded-2xl bg-rose-950/30 p-5 border border-rose-500/40">
                <div className="text-rose-400 font-bold text-base mb-1">
                  Entrada de Barra: Bombordo
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p><strong>Cor:</strong> Vermelha</p>
                  <p><strong>Formato:</strong> Cilíndrica (com topo cilíndrico)</p>
                  <p><strong>Luz:</strong> Vermelha</p>
                  <p><strong>Regra:</strong> Fica à esquerda da embarcação que entra no canal.</p>
                </div>
              </div>
            </div>

            <h4 className="text-base font-bold text-white mb-3">Marcas Cardinais (Regra do Relógio)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="font-bold text-amber-400 text-sm block mb-1">Cardinal Norte</span>
                <p>2 cones para CIMA. Cores: Preto acima / Amarelo abaixo. Luz branca cintilante contínua.</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="font-bold text-amber-400 text-sm block mb-1">Cardinal Sul</span>
                <p>2 cones para BAIXO. Cores: Amarelo acima / Preto abaixo. Luz: 6 cintilações + 1 clarão longo (posição 6h).</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="font-bold text-amber-400 text-sm block mb-1">Cardinal Este</span>
                <p>Cones unidos pelas BASES. Preto com faixa amarela ao meio. Luz: 3 cintilações (posição 3h).</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="font-bold text-amber-400 text-sm block mb-1">Cardinal Oeste</span>
                <p>Cones unidos pelos VÉRTICES (ampulheta). Amarelo com faixa preta ao meio. Luz: 9 cintilações (posição 9h).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SINAIS SONOROS */}
      {activeSection === 'sons' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-cyan-400" />
            Sinais Sonoros de Manobra (RIPAM Regra 34)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Ouça os apitos reais tocados pela buzina de bordo tocando no botão "Tocar Sinal":
          </p>

          <div className="space-y-3">
            {[
              {
                signal: '1 Apito Curto (1s)',
                meaning: 'Estou a guinar para Estibordo (EB)',
                pattern: [0.8],
                badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
              },
              {
                signal: '2 Apitos Curtos',
                meaning: 'Estou a guinar para Bombordo (BB)',
                pattern: [0.8, 0.8],
                badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
              },
              {
                signal: '3 Apitos Curtos',
                meaning: 'As minhas máquinas estão a fazer marcha à ré (travar / ciar)',
                pattern: [0.8, 0.8, 0.8],
                badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
              },
              {
                signal: '5 Apitos Curtos Rápidos',
                meaning: 'Dúvida sobre a sua manobra / Perigo imediato!',
                pattern: [0.3, 0.3, 0.3, 0.3, 0.3],
                badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
              },
              {
                signal: '1 Apito Longo (4 a 6s)',
                meaning: 'Aproximação de curva cega de rio / aviso sob nevoeiro',
                pattern: [3.5],
                badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-slate-950/70 p-4 border border-slate-800"
              >
                <div>
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold border mb-1 ${item.badge}`}>
                    {item.signal}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">{item.meaning}</p>
                </div>

                <button
                  onClick={() => playSoundSignal(item.pattern)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-600 hover:text-white transition active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Tocar Sinal</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
