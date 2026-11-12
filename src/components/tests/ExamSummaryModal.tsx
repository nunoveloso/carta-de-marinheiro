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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112338]/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white border border-[#ded5c2] rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 text-[#1e293b]">
        {/* Header Banner */}
        <div className="text-center pb-6 border-b border-[#ede6d8]">
          <div className="inline-flex p-3 rounded-full mb-3 shadow-xs">
            {isPassed ? (
              <div className="w-16 h-16 rounded-full bg-[#dcfce7] border-2 border-[#22c55e] flex items-center justify-center text-[#15803d]">
                <Award className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#fee2e2] border-2 border-[#ef4444] flex items-center justify-center text-[#b91c1c]">
                <AlertTriangle className="w-8 h-8" />
              </div>
            )}
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-maritime ${
            isPassed ? 'text-[#166534]' : 'text-[#991b1b]'
          }`}>
            {isPassed ? 'APTO NO EXAME TEÓRICO DGRM' : 'NÃO APTO'}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-medium">
            Tempo despendido: <span className="text-[#112338] font-bold">{formatTime(timeSpentSeconds)}</span>
          </p>

          <div className="mt-4 inline-flex items-baseline gap-2 px-6 py-2.5 rounded-2xl bg-[#fbf8f2] border border-[#ded5c2] shadow-2xs">
            <span className="text-3xl font-black text-[#112338]">{totalEarned.toFixed(1)}</span>
            <span className="text-[#64748b] text-sm font-bold">/ 20.0 valores</span>
            <span className="text-xs text-[#a16207] font-bold ml-2">({((totalEarned / totalPossible) * 100).toFixed(0)}%)</span>
          </div>
        </div>

        {/* Fail Reasons (if any) */}
        {!isPassed && failReasons.length > 0 && (
          <div className="mt-5 p-4 rounded-2xl bg-[#fef2f2] border border-[#fca5a5] text-xs sm:text-sm text-[#991b1b] space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-[#b91c1c]">
              <XCircle className="w-4 h-4 shrink-0" />
              Critérios Oficiais Não Cumpridos:
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1 font-medium">
              {failReasons.map((reason, rIdx) => (
                <li key={rIdx}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Category Breakdown Cards */}
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
            Avaliação por Secção Oficial DGRM:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* RIEAM */}
            <div className="p-3.5 rounded-2xl bg-[#fbf8f2] border border-[#ded5c2]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#92400e]">1. RIEAM (Abalroamentos)</span>
                <span className={`text-xs font-bold ${rieamPct >= 75 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                  {rieamPct.toFixed(0)}% (mín. 75%)
                </span>
              </div>
              <div className="w-full bg-[#e2d9c8] h-2 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full ${rieamPct >= 75 ? 'bg-[#16a34a]' : 'bg-[#dc2626]'}`}
                  style={{ width: `${Math.min(100, rieamPct)}%` }}
                />
              </div>
              <div className="text-xs text-[#64748b] flex justify-between font-medium">
                <span>Obtido: {categoryScores['RIEAM'].earned.toFixed(1)} / {categoryScores['RIEAM'].total.toFixed(1)} val</span>
                <span className={rieamPct >= 75 ? 'text-[#16a34a] font-bold' : 'text-[#dc2626] font-bold'}>
                  {rieamPct >= 75 ? '✓ Aprovado' : '✕ Reprovado'}
                </span>
              </div>
            </div>

            {/* Segurança e Primeiros Socorros */}
            <div className="p-3.5 rounded-2xl bg-[#fbf8f2] border border-[#ded5c2]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#9f1239]">2. Segurança e 1º Socorros</span>
                <span className={`text-xs font-bold ${segPct >= 60 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                  {segPct.toFixed(0)}% (mín. 60%)
                </span>
              </div>
              <div className="w-full bg-[#e2d9c8] h-2 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full ${segPct >= 60 ? 'bg-[#16a34a]' : 'bg-[#dc2626]'}`}
                  style={{ width: `${Math.min(100, segPct)}%` }}
                />
              </div>
              <div className="text-xs text-[#64748b] flex justify-between font-medium">
                <span>Obtido: {categoryScores['Segurança e Primeiros Socorros'].earned.toFixed(1)} / {categoryScores['Segurança e Primeiros Socorros'].total.toFixed(1)} val</span>
                <span className={segPct >= 60 ? 'text-[#16a34a] font-bold' : 'text-[#dc2626] font-bold'}>
                  {segPct >= 60 ? '✓ Aprovado' : '✕ Reprovado'}
                </span>
              </div>
            </div>

            {/* Marinharia */}
            <div className="p-3.5 rounded-2xl bg-[#fbf8f2] border border-[#ded5c2]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#0369a1]">3. Marinharia & Manobras</span>
                <span className="text-xs font-bold text-[#112338]">
                  {((categoryScores['Marinharia'].earned / (categoryScores['Marinharia'].total || 1)) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-[#e2d9c8] h-2 rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full bg-[#0284c7]"
                  style={{ width: `${Math.min(100, (categoryScores['Marinharia'].earned / (categoryScores['Marinharia'].total || 1)) * 100)}%` }}
                />
              </div>
              <div className="text-xs text-[#64748b] font-medium">
                Obtido: {categoryScores['Marinharia'].earned.toFixed(1)} / {categoryScores['Marinharia'].total.toFixed(1)} val
              </div>
            </div>

            {/* Outras Matérias */}
            <div className="p-3.5 rounded-2xl bg-[#fbf8f2] border border-[#ded5c2]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#5b21b6]">4. Outras Matérias</span>
                <span className="text-xs font-bold text-[#112338]">
                  {((categoryScores['Outras Matérias'].earned / (categoryScores['Outras Matérias'].total || 1)) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-[#e2d9c8] h-2 rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full bg-[#7c3aed]"
                  style={{ width: `${Math.min(100, (categoryScores['Outras Matérias'].earned / (categoryScores['Outras Matérias'].total || 1)) * 100)}%` }}
                />
              </div>
              <div className="text-xs text-[#64748b] font-medium">
                Obtido: {categoryScores['Outras Matérias'].earned.toFixed(1)} / {categoryScores['Outras Matérias'].total.toFixed(1)} val
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-[#ede6d8] flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBackToMenu}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#ded5c2] bg-[#f4efe4] hover:bg-[#eae3d2] text-[#475569] font-bold text-xs sm:text-sm transition-all"
          >
            Menu de Testes
          </button>

          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#ded5c2] bg-white hover:bg-[#fcfaf5] text-[#112338] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" />
            Repetir Exame
          </button>

          <button
            type="button"
            onClick={onReviewAnswers}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#112338] hover:bg-[#1c3858] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <Eye className="w-4 h-4 text-[#d4af37]" />
            Rever com Chave Oficial
          </button>
        </div>
      </div>
    </div>
  );
};
