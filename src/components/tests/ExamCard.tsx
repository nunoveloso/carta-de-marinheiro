import React from 'react';
import { TestQuestion, UserAnswer } from '../../types/tests';
import { TestDiagram } from './TestDiagram';
import { Bookmark, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface ExamCardProps {
  question: TestQuestion;
  questionIndex: number;
  totalQuestions: number;
  userAnswer?: UserAnswer;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onSelectOption?: (optionIndex: number) => void;
  onChangeTextAnswer?: (text: string) => void;
  onSelfEvaluate?: (isCorrect: boolean) => void;
  reviewMode?: boolean;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  isBookmarked = false,
  onToggleBookmark,
  onSelectOption,
  onChangeTextAnswer,
  onSelfEvaluate,
  reviewMode = false,
}) => {
  const { category, subcategory, points, statement, type, options, correctOptionIndex, expectedAnswer, acceptedKeywords, explanation, diagram } = question;

  // Determine correctness in review mode
  let isCorrect = false;
  if (reviewMode) {
    if (type === 'multiple-choice') {
      isCorrect = userAnswer?.selectedOption === correctOptionIndex;
    } else {
      isCorrect = !!userAnswer?.selfEvaluatedCorrect;
    }
  }

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'RIEAM':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'Segurança e Primeiros Socorros':
        return 'bg-[#ffe4e6] text-[#9f1239] border-[#fecdd3]';
      case 'Marinharia':
        return 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]';
      default:
        return 'bg-[#ede9fe] text-[#5b21b6] border-[#ddd6fe]';
    }
  };

  return (
    <div className={`rounded-2xl border p-5 sm:p-7 transition-all shadow-xs bg-white ${
      reviewMode
        ? isCorrect
          ? 'border-[#86efac] bg-[#f0fdf4]'
          : 'border-[#fca5a5] bg-[#fef2f2]'
        : isBookmarked
          ? 'border-[#f59e0b] bg-[#fffbeb]/40'
          : 'border-[#ded5c2] hover:border-[#112338]/30'
    }`}>
      {/* Top Bar: Question Index, Category Badges & Bookmark */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#ede6d8]">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#112338] text-white font-bold text-sm shadow-2xs">
            {questionIndex + 1}
          </span>
          <span className="text-xs text-[#64748b] font-medium">
            de {totalQuestions}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border bg-[#f4efe4] text-[#475569] border-[#ded5c2]">
            {points.toFixed(1)} {points === 1 ? 'valor' : 'valores'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* 1. Main Category Badge */}
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getCategoryBadgeClass(category)}`}>
            {category}
          </span>

          {/* 2. Subcategory Badge */}
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border bg-[#f4efe4] text-[#475569] border-[#ded5c2]">
            {subcategory}
          </span>

          {/* 3. DB fields: Test# and Question# */}
          {question.testNumber && (
            <span className="text-[11px] px-2 py-0.5 rounded-lg font-medium text-[#64748b] bg-[#fdfcf9] border border-[#ded5c2] shadow-2xs">
              Teste {question.testNumber} • P.{question.questionNumber}
            </span>
          )}

          {!reviewMode && onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Remover marcação' : 'Marcar para rever mais tarde'}
              className={`p-1.5 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-[#fef3c7] border-[#f59e0b] text-[#d97706]'
                  : 'bg-white border-[#ded5c2] text-[#64748b] hover:text-[#d97706] hover:bg-[#fcfaf5]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#d97706]' : ''}`} />
            </button>
          )}

          {reviewMode && (
            <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
              isCorrect
                ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                : 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Correto (+{points.toFixed(1)} val)
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  Incorreto (0.0 val)
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Statement */}
      <h3 className="text-base sm:text-lg font-bold text-[#112338] leading-relaxed mb-4">
        {statement}
      </h3>

      {/* Diagram (only present if official exam PDF includes a diagram) */}
      {diagram && <TestDiagram diagram={diagram} />}

      {/* Inputs according to question type */}
      {/* 1. Multiple Choice */}
      {type === 'multiple-choice' && options && (
        <div className="space-y-2.5 mt-4">
          {options.map((opt, idx) => {
            const isSelected = userAnswer?.selectedOption === idx;
            const isOfficialCorrect = idx === correctOptionIndex;

            let optionBorder = 'border-[#ded5c2] bg-white hover:bg-[#fcfaf5] hover:border-[#112338]/40';
            let optionText = 'text-[#1e293b]';

            if (reviewMode) {
              if (isOfficialCorrect) {
                optionBorder = 'border-[#22c55e] bg-[#f0fdf4] text-[#14532d] shadow-xs';
                optionText = 'text-[#14532d] font-semibold';
              } else if (isSelected && !isOfficialCorrect) {
                optionBorder = 'border-[#ef4444] bg-[#fef2f2] text-[#7f1d1d]';
                optionText = 'text-[#7f1d1d]';
              } else {
                optionBorder = 'border-[#e2d9c8]/60 bg-white/50 opacity-60 text-[#64748b]';
              }
            } else if (isSelected) {
              optionBorder = 'border-[#112338] bg-[#f0f4f8] shadow-2xs ring-1 ring-[#112338]';
              optionText = 'text-[#112338] font-bold';
            }

            return (
              <label
                key={idx}
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${optionBorder}`}
              >
                <div className="mt-0.5 shrink-0">
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    checked={isSelected}
                    disabled={reviewMode}
                    onChange={() => onSelectOption && onSelectOption(idx)}
                    className="w-4 h-4 text-[#112338] bg-white border-[#ded5c2] focus:ring-[#112338]"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold mr-2 text-[#475569]">
                    {String.fromCharCode(97 + idx)})
                  </span>
                  <span className={`text-sm sm:text-base leading-snug ${optionText}`}>
                    {opt}
                  </span>
                  {reviewMode && isOfficialCorrect && (
                    <span className="ml-2 inline-flex items-center text-xs font-bold text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded border border-[#86efac]">
                      ✓ Resposta Oficial DGRM
                    </span>
                  )}
                  {reviewMode && isSelected && !isOfficialCorrect && (
                    <span className="ml-2 inline-flex items-center text-xs font-bold text-[#991b1b] bg-[#fee2e2] px-2 py-0.5 rounded border border-[#fca5a5]">
                      ✕ A sua escolha
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}

      {/* 2. Fill-in-the-blank (Preencher o vazio) */}
      {type === 'fill-blank' && (
        <div className="mt-4 space-y-2">
          <label className="block text-xs font-semibold text-[#475569]">
            Preencha a lacuna com a sua resposta:
          </label>
          <input
            type="text"
            value={userAnswer?.textAnswer || ''}
            disabled={reviewMode}
            onChange={(e) => onChangeTextAnswer && onChangeTextAnswer(e.target.value)}
            placeholder="Escreva a resposta aqui..."
            className="w-full px-4 py-3 rounded-xl border border-[#ded5c2] bg-[#fdfcf9] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#112338] focus:border-transparent text-sm sm:text-base transition-all shadow-2xs"
          />
        </div>
      )}

      {/* 3. Open Answer (Pergunta Aberta) */}
      {type === 'open-answer' && (
        <div className="mt-4 space-y-2">
          <label className="block text-xs font-semibold text-[#475569]">
            Responda por extenso:
          </label>
          <textarea
            rows={3}
            value={userAnswer?.textAnswer || ''}
            disabled={reviewMode}
            onChange={(e) => onChangeTextAnswer && onChangeTextAnswer(e.target.value)}
            placeholder="Escreva a resposta detalhada com as suas palavras..."
            className="w-full px-4 py-3 rounded-xl border border-[#ded5c2] bg-[#fdfcf9] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#112338] focus:border-transparent text-sm sm:text-base transition-all resize-y shadow-2xs"
          />
        </div>
      )}

      {/* Review Mode: Detailed Feedback & Official Model Answer */}
      {reviewMode && (
        <div className="mt-5 pt-4 border-t border-[#ede6d8] space-y-3">
          {/* Official Expected Answer Box */}
          <div className="p-4 rounded-xl bg-[#fbf8f2] border border-[#ded5c2]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#a16207] mb-1.5 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
              Resposta Oficial Modelo (Manual do Marinheiro / DGRM):
            </div>
            <p className="text-sm font-semibold text-[#112338] leading-relaxed pl-6">
              {expectedAnswer}
            </p>

            {acceptedKeywords && acceptedKeywords.length > 0 && (
              <div className="mt-2.5 pl-6 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[#64748b]">Palavras-chave esperadas:</span>
                {acceptedKeywords.map((kw, kIdx) => (
                  <span key={kIdx} className="text-xs px-2 py-0.5 rounded bg-white text-[#112338] font-medium border border-[#ded5c2]">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Explanation / DGRM Trap Tip */}
          {explanation && (
            <div className="p-3.5 rounded-xl bg-[#f0f4f8] border border-[#cbd5e1] text-xs sm:text-sm text-[#1e293b] flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-[#a16207] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#a16207] font-bold mr-1">Rasteira / Explicação DGRM:</strong>
                {explanation}
              </div>
            </div>
          )}

          {/* Self-evaluation controls for open/fill questions in review mode */}
          {(type === 'open-answer' || type === 'fill-blank') && onSelfEvaluate && (
            <div className="p-3.5 rounded-xl bg-white border border-[#ded5c2] flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <span className="text-xs font-semibold text-[#334155]">
                A sua resposta escrita corresponde à chave oficial?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelfEvaluate(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    userAnswer?.selfEvaluatedCorrect === true
                      ? 'bg-[#16a34a] text-white border-[#15803d] shadow-xs'
                      : 'bg-white text-[#15803d] border-[#86efac] hover:bg-[#f0fdf4]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Correto (+{points.toFixed(1)} val)
                </button>
                <button
                  type="button"
                  onClick={() => onSelfEvaluate(false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    userAnswer?.selfEvaluatedCorrect === false
                      ? 'bg-[#dc2626] text-white border-[#b91c1c] shadow-xs'
                      : 'bg-white text-[#b91c1c] border-[#fca5a5] hover:bg-[#fef2f2]'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Incorreto (0.0 val)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
