import React, { useEffect } from 'react';
import { MainCategory, TestQuestion, UserAnswer } from '../../types/tests';
import { Award, AlertTriangle, CheckCircle, XCircle, RotateCcw, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamSummaryModalProps {
  questions: TestQuestion[];
  answers: Record<string, UserAnswer>;
  timeSpentSeconds: number;
  onReviewAnswers: () => void;
  onRetry: () => void;
  onBackToMenu: () => void;
}

export const ExamSummaryModal: React.FC<ExamSummaryModalProps> = ({
  questions,
  answers,
  timeSpentSeconds,
  onReviewAnswers,
  onRetry,
  onBackToMenu,
}) => {
  const categoryScores: Record<MainCategory, { earned: number; total: number; minRequiredPct?: number }> = {
    'RIEAM': { earned: 0, total: 0, minRequiredPct: 75 },
    'Segurança e Primeiros Socorros': { earned: 0, total: 0, minRequiredPct: 60 },
    'Marinharia': { earned: 0, total: 0 },
    'Outras Matérias': { earned: 0, total: 0 },
  };

  let totalEarned = 0;
  let totalPossible = 0;

  questions.forEach((q) => {
    const ans = answers[q.id];
    let isCorrect = false;

    if (q.type === 'multiple-choice') {
      isCorrect = ans?.selectedOption === q.correctOptionIndex;
    } else {
      isCorrect = ans?.selfEvaluatedCorrect ?? false;
    }

    const earned = isCorrect ? q.points : 0;
    categoryScores[q.category].earned += earned;
    categoryScores[q.category].total += q.points;
    totalEarned += earned;
    totalPossible += q.points;
  });

  const rieamPct = (categoryScores['RIEAM'].earned / (categoryScores['RIEAM'].total || 1)) * 100;
  const segPct = (categoryScores['Segurança e Primeiros Socorros'].earned / (categoryScores['Segurança e Primeiros Socorros'].total || 1)) * 100;

  const failReasons: string[] = [];
  if (totalEarned < 12.0) {
    failReasons.push(`Nota global inferior a 12 valores (${totalEarned.toFixed(1)} / 20.0).`);
  }
  if (rieamPct < 75) {
    failReasons.push(`Resultado no RIEAM inferior a 75% (${categoryScores['RIEAM'].earned.toFixed(1)} / ${categoryScores['RIEAM'].total.toFixed(1)} val - mín. exigido 4.5 val).`);
  }
  if (segPct < 60) {
    failReasons.push(`Resultado em Segurança e Primeiros Socorros inferior a 60% (${categoryScores['Segurança e Primeiros Socorros'].earned.toFixed(1)} / ${categoryScores['Segurança e Primeiros Socorros'].total.toFixed(1)} val - mín. exigido 2.4 val).`);
  }

  const isPassed = failReasons.length === 0;

  useEffect(() => {
    if (isPassed) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isPassed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b3a55]/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#fcfbf8] border border-[#0b3a55] rounded-xs shadow-[6px_6px_0_0_#0b3a55] max-w-2xl w-full p-6 sm:p-8 my-8 text-[#0b3a55]">
        {/* Header Banner */}
        <div className="text-center pb-6 border-b border-[#d7d0c1]">
          <div className="inline-flex mb-3">
            {isPassed ? (
              <div className="w-16 h-16 rounded-xs bg-[#dcebe1] border-2 border-[#1e7d4f] flex items-center justify-center text-[#1e7d4f]">
                <Award className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xs bg-[#f3ded9] border-2 border-[#b3402f] flex items-center justify-center text-[#b3402f]">
                <AlertTriangle className="w-8 h-8" />
              </div>
            )}
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-maritime ${
            isPassed ? 'text-[#1e7d4f]' : 'text-[#b3402f]'
          }`}>
            {isPassed ? 'APTO NO EXAME TEÓRICO DGRM' : 'NÃO APTO'}
          </h2>
          <p className="font-mono-naut text-xs text-[#4f6e82] mt-1 font-medium">
            Tempo despendido: <span className="text-[#0b3a55] font-bold">{formatTime(timeSpentSeconds)}</span>
          </p>

          <div className="mt-4 inline-flex items-baseline gap-2 px-6 py-2.5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1]">
            <span className="font-mono-naut text-3xl font-bold text-[#0b3a55]">{totalEarned.toFixed(1)}</span>
            <span className="font-mono-naut text-[#4f6e82] text-sm font-medium">/ 20.0 valores</span>
            <span className="font-mono-naut text-xs text-[#9a7413] font-bold ml-2">({((totalEarned / totalPossible) * 100).toFixed(0)}%)</span>
          </div>
        </div>

        {/* Fail Reasons (if any) */}
        {!isPassed && failReasons.length > 0 && (
          <div className="mt-5 p-4 rounded-xs bg-[#f3ded9] border border-[#b3402f]/50 text-xs sm:text-sm text-[#b3402f] space-y-1.5">
            <div className="font-mono-naut uppercase tracking-wider text-xs font-bold flex items-center gap-1.5">
              <XCircle className="w-4 h-4 shrink-0" />
              Critérios Oficiais Não Cumpridos:
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1 font-medium text-[#0b3a55]">
              {failReasons.map((reason, rIdx) => (
                <li key={rIdx}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Category Breakdown Cards */}
        <div className="mt-6 space-y-3">
          <h3 className="font-mono-naut text-[11px] font-semibold uppercase tracking-wider text-[#4f6e82]">
            Avaliação por Secção Oficial DGRM:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* RIEAM */}
            <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-mono-naut text-xs font-bold text-[#0b3a55]">1. RIEAM (Abalroamentos)</span>
                <span className={`font-mono-naut text-[11px] font-bold ${rieamPct >= 75 ? 'text-[#1e7d4f]' : 'text-[#b3402f]'}`}>
                  {rieamPct.toFixed(0)}% (mín. 75%)
                </span>
              </div>
              <div className="w-full bg-[#ede9de] h-2 rounded-xs overflow-hidden mb-1.5">
                <div
                  className={`h-full ${rieamPct >= 75 ? 'bg-[#1e7d4f]' : 'bg-[#b3402f]'}`}
                  style={{ width: `${Math.min(100, rieamPct)}%` }}
                />
              </div>
              <div className="font-mono-naut text-[11px] text-[#4f6e82] flex justify-between font-medium">
                <span>Obtido: {categoryScores['RIEAM'].earned.toFixed(1)} / {categoryScores['RIEAM'].total.toFixed(1)} val</span>
                <span className={rieamPct >= 75 ? 'text-[#1e7d4f] font-bold' : 'text-[#b3402f] font-bold'}>
                  {rieamPct >= 75 ? '✓ Aprovado' : '✕ Reprovado'}
                </span>
              </div>
            </div>

            {/* Segurança e Primeiros Socorros */}
            <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-mono-naut text-xs font-bold text-[#b3402f]">2. Segurança e 1º Socorros</span>
                <span className={`font-mono-naut text-[11px] font-bold ${segPct >= 60 ? 'text-[#1e7d4f]' : 'text-[#b3402f]'}`}>
                  {segPct.toFixed(0)}% (mín. 60%)
                </span>
              </div>
              <div className="w-full bg-[#ede9de] h-2 rounded-xs overflow-hidden mb-1.5">
                <div
                  className={`h-full ${segPct >= 60 ? 'bg-[#1e7d4f]' : 'bg-[#b3402f]'}`}
                  style={{ width: `${Math.min(100, segPct)}%` }}
                />
              </div>
              <div className="font-mono-naut text-[11px] text-[#4f6e82] flex justify-between font-medium">
                <span>Obtido: {categoryScores['Segurança e Primeiros Socorros'].earned.toFixed(1)} / {categoryScores['Segurança e Primeiros Socorros'].total.toFixed(1)} val</span>
                <span className={segPct >= 60 ? 'text-[#1e7d4f] font-bold' : 'text-[#b3402f] font-bold'}>
                  {segPct >= 60 ? '✓ Aprovado' : '✕ Reprovado'}
                </span>
              </div>
            </div>

            {/* Marinharia */}
            <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-mono-naut text-xs font-bold text-[#1e7d4f]">3. Marinharia & Manobras</span>
                <span className="font-mono-naut text-[11px] font-bold text-[#0b3a55]">
                  {((categoryScores['Marinharia'].earned / (categoryScores['Marinharia'].total || 1)) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-[#ede9de] h-2 rounded-xs overflow-hidden mb-1.5">
                <div
                  className="h-full bg-[#1e7d4f]"
                  style={{ width: `${Math.min(100, (categoryScores['Marinharia'].earned / (categoryScores['Marinharia'].total || 1)) * 100)}%` }}
                />
              </div>
              <div className="font-mono-naut text-[11px] text-[#4f6e82] font-medium">
                Obtido: {categoryScores['Marinharia'].earned.toFixed(1)} / {categoryScores['Marinharia'].total.toFixed(1)} val
              </div>
            </div>

            {/* Outras Matérias */}
            <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-mono-naut text-xs font-bold text-[#9a7413]">4. Outras Matérias</span>
                <span className="font-mono-naut text-[11px] font-bold text-[#0b3a55]">
                  {((categoryScores['Outras Matérias'].earned / (categoryScores['Outras Matérias'].total || 1)) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-[#ede9de] h-2 rounded-xs overflow-hidden mb-1.5">
                <div
                  className="h-full bg-[#9a7413]"
                  style={{ width: `${Math.min(100, (categoryScores['Outras Matérias'].earned / (categoryScores['Outras Matérias'].total || 1)) * 100)}%` }}
                />
              </div>
              <div className="font-mono-naut text-[11px] text-[#4f6e82] font-medium">
                Obtido: {categoryScores['Outras Matérias'].earned.toFixed(1)} / {categoryScores['Outras Matérias'].total.toFixed(1)} val
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-[#d7d0c1] flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBackToMenu}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xs border border-[#d7d0c1] bg-[#ede9de] hover:bg-[#d7d0c1]/70 text-[#0b3a55] font-mono-naut uppercase tracking-wider font-semibold text-xs transition-all whitespace-nowrap shrink-0"
          >
            Menu de Testes
          </button>

          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] hover:border-[#0b3a55] text-[#0b3a55] font-mono-naut uppercase tracking-wider font-semibold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            Repetir Exame
          </button>

          <button
            type="button"
            onClick={onReviewAnswers}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xs bg-[#0b3a55] hover:bg-[#082b3f] text-[#faf7f0] font-mono-naut uppercase tracking-wider font-semibold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0"
          >
            <Eye className="w-4 h-4 text-[#ca9e1c]" />
            Rever com Chave Oficial
          </button>
        </div>
      </div>
    </div>
  );
};
