import React from 'react';
import { TestQuestion, UserAnswer } from '../../types/tests';
import { getCategoryStyle } from '../../types/glossary';
import { TestDiagram } from './TestDiagram';
import { InlineFillBlankRenderer } from './InlineFillBlankRenderer';
import { Bookmark, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { CategoryIcon } from '../CategoryIcon';

interface ExamCardProps {
  question: TestQuestion;
  questionIndex: number;
  totalQuestions: number;
  userAnswer?: UserAnswer;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onSelectOption?: (optionIndex: number) => void;
  onChangeTextAnswer?: (text: string) => void;
  onChangeBlankAnswer?: (blankIndex: number, text: string) => void;
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
  onChangeBlankAnswer,
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

  const catStyle = getCategoryStyle(category);

  const hasInlineBlanks = type === 'fill-blank' || /_{2,}/.test(statement);
  const currentBlankAnswers = userAnswer?.blankAnswers || (userAnswer?.textAnswer ? userAnswer.textAnswer.split(' | ') : []);

  const handleBlankChange = (blankIndex: number, text: string) => {
    if (onChangeBlankAnswer) {
      onChangeBlankAnswer(blankIndex, text);
    } else if (onChangeTextAnswer) {
      const updated = [...currentBlankAnswers];
      while (updated.length <= blankIndex) updated.push('');
      updated[blankIndex] = text;
      onChangeTextAnswer(updated.join(' | '));
    }
  };

  return (
    <div className={`rounded-xs border p-5 sm:p-7 transition-all bg-[#fcfbf8] ${
      reviewMode
        ? isCorrect
          ? 'border-[#1e7d4f] bg-[#dcebe1]/30'
          : 'border-[#b3402f] bg-[#f3ded9]/30'
        : isBookmarked
          ? 'border-[#ca9e1c] bg-[#f0e8cf]/35'
          : 'border-[#d7d0c1]'
    }`}>
      {/* Top Bar: Question Index, Category Metadata & Bookmark */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#d7d0c1]">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-xs bg-[#0b3a55] text-[#faf7f0] font-mono-naut font-bold text-sm">
            {questionIndex + 1}
          </span>
          <span className="font-mono-naut text-xs text-[#4f6e82] font-medium">
            de {totalQuestions}
          </span>
          <span className="font-mono-naut text-[11px] px-2 py-0.5 rounded-xs font-medium border bg-[#faf7f0] text-[#4f6e82] border-[#d7d0c1]">
            {points.toFixed(1)} {points === 1 ? 'valor' : 'valores'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* 1. Main Category Label */}
          <span
            className="inline-flex items-center gap-1.5 font-mono-naut text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-xs font-semibold border"
            style={{
              backgroundColor: catStyle.soft,
              color: catStyle.solid,
              borderColor: `${catStyle.solid}40`,
            }}
          >
            <CategoryIcon category={category} className="w-3 h-3 shrink-0" />
            <span>{category}</span>
          </span>

          {/* 2. Subcategory Label */}
          <span className="font-mono-naut text-[11px] px-2.5 py-0.5 rounded-xs font-medium border bg-[#faf7f0] text-[#4f6e82] border-[#d7d0c1]">
            {subcategory}
          </span>

          {/* 3. DB fields: Test# and Question# */}
          {question.testNumber && (
            <span className="font-mono-naut text-[11px] px-2 py-0.5 rounded-xs font-medium text-[#4f6e82] bg-[#faf7f0] border border-[#d7d0c1]">
              Teste {question.testNumber} • P.{question.questionNumber}
            </span>
          )}

          {!reviewMode && onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Remover marcação' : 'Marcar para rever mais tarde'}
              className={`p-1.5 rounded-xs border transition-all ${
                isBookmarked
                  ? 'bg-[#f0e8cf] border-[#ca9e1c] text-[#9a7413]'
                  : 'bg-[#faf7f0] border-[#d7d0c1] text-[#4f6e82] hover:border-[#0b3a55] hover:text-[#9a7413]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#ca9e1c]' : ''}`} />
            </button>
          )}

          {reviewMode && (
            <span className={`flex items-center gap-1 font-mono-naut text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs border ${
              isCorrect
                ? 'bg-[#dcebe1] text-[#1e7d4f] border-[#1e7d4f]/40'
                : 'bg-[#f3ded9] text-[#b3402f] border-[#b3402f]/40'
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

      {/* Statement & In-line Fill-blank inputs */}
      {hasInlineBlanks ? (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 font-mono-naut text-[11px] font-semibold text-[#9a7413] uppercase tracking-wider">
            <span>Preencha as lacunas no enunciado (conforme a folha de exame):</span>
          </div>
          <div className="p-4 sm:p-5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1]">
            <InlineFillBlankRenderer
              statement={statement}
              blankAnswers={currentBlankAnswers}
              onChangeBlank={handleBlankChange}
              disabled={reviewMode}
              reviewMode={reviewMode}
              expectedBlanks={question.expectedBlanks}
              acceptedKeywordsPerBlank={question.acceptedKeywordsPerBlank}
              expectedAnswer={expectedAnswer}
            />
          </div>
        </div>
      ) : (
        <h3 className="text-base sm:text-lg font-bold text-[#0b3a55] leading-relaxed mb-4">
          {statement}
        </h3>
      )}

      {/* Diagram (only present if official exam PDF includes a diagram) */}
      {diagram && <TestDiagram diagram={diagram} />}

      {/* Inputs according to question type */}
      {/* 1. Multiple Choice */}
      {type === 'multiple-choice' && options && (
        <div className="space-y-2.5 mt-4">
          {options.map((opt, idx) => {
            const isSelected = userAnswer?.selectedOption === idx;
            const isOfficialCorrect = idx === correctOptionIndex;

            let optionBorder = 'border-[#d7d0c1] bg-[#faf7f0] hover:bg-[#fcfbf8] hover:border-[#0b3a55]';
            let optionText = 'text-[#0b3a55]';

            if (reviewMode) {
              if (isOfficialCorrect) {
                optionBorder = 'border-[#1e7d4f] bg-[#dcebe1]/70 text-[#1e7d4f]';
                optionText = 'text-[#1e7d4f] font-semibold';
              } else if (isSelected && !isOfficialCorrect) {
                optionBorder = 'border-[#b3402f] bg-[#f3ded9]/70 text-[#b3402f]';
                optionText = 'text-[#b3402f]';
              } else {
                optionBorder = 'border-[#d7d0c1]/70 bg-[#faf7f0]/50 opacity-60 text-[#4f6e82]';
              }
            } else if (isSelected) {
              optionBorder = 'border-[#0b3a55] bg-[#dce8ef]/40 ring-1 ring-[#0b3a55]';
              optionText = 'text-[#0b3a55] font-bold';
            }

            return (
              <label
                key={idx}
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xs border transition-all cursor-pointer ${optionBorder}`}
              >
                <div className="mt-0.5 shrink-0">
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    checked={isSelected}
                    disabled={reviewMode}
                    onChange={() => onSelectOption && onSelectOption(idx)}
                    className="w-4 h-4 accent-[#0b3a55] bg-[#fcfbf8] border-[#d3ccbb] focus:ring-[#0b3a55]"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-mono-naut text-xs font-bold mr-2 text-[#4f6e82]">
                    {String.fromCharCode(97 + idx)})
                  </span>
                  <span className={`text-sm sm:text-base leading-snug ${optionText}`}>
                    {opt}
                  </span>
                  {reviewMode && isOfficialCorrect && (
                    <span className="ml-2 inline-flex items-center font-mono-naut text-[11px] font-semibold text-[#1e7d4f] bg-[#dcebe1] px-2 py-0.5 rounded-xs border border-[#1e7d4f]/40">
                      ✓ Resposta Oficial DGRM
                    </span>
                  )}
                  {reviewMode && isSelected && !isOfficialCorrect && (
                    <span className="ml-2 inline-flex items-center font-mono-naut text-[11px] font-semibold text-[#b3402f] bg-[#f3ded9] px-2 py-0.5 rounded-xs border border-[#b3402f]/40">
                      ✕ A sua escolha
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}

      {/* 2. Open Answer (Pergunta Aberta SEM lacunas no enunciado) */}
      {!hasInlineBlanks && type === 'open-answer' && (
        <div className="mt-4 space-y-2">
          <label className="block font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#4f6e82]">
            Responda por extenso:
          </label>
          <textarea
            rows={3}
            value={userAnswer?.textAnswer || ''}
            disabled={reviewMode}
            onChange={(e) => onChangeTextAnswer && onChangeTextAnswer(e.target.value)}
            placeholder="Escreva a resposta detalhada com as suas palavras..."
            className="w-full px-4 py-3 rounded-xs border border-[#d3ccbb] bg-[#faf7f0] text-[#0b3a55] placeholder-[#4f6e82]/60 focus:outline-none focus:border-[#0b3a55] focus:bg-[#fcfbf8] text-sm sm:text-base transition-all resize-y"
          />
        </div>
      )}

      {/* Review Mode: Detailed Feedback & Official Model Answer */}
      {reviewMode && (
        <div className="mt-5 pt-4 border-t border-[#d7d0c1] space-y-3">
          {/* Official Expected Answer Box */}
          <div className="p-4 rounded-xs bg-[#faf7f0] border border-[#d7d0c1]">
            <div className="flex items-center gap-2 font-mono-naut text-[11px] font-semibold text-[#9a7413] mb-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#1e7d4f]" />
              Resposta Oficial Modelo (Manual do Marinheiro / DGRM):
            </div>
            <p className="text-sm font-semibold text-[#0b3a55] leading-relaxed pl-6">
              {expectedAnswer}
            </p>

            {acceptedKeywords && acceptedKeywords.length > 0 && (
              <div className="mt-2.5 pl-6 flex flex-wrap items-center gap-1.5">
                <span className="font-mono-naut text-[11px] text-[#4f6e82]">Palavras-chave esperadas:</span>
                {acceptedKeywords.map((kw, kIdx) => (
                  <span key={kIdx} className="font-mono-naut text-xs px-2 py-0.5 rounded-xs bg-[#fcfbf8] text-[#0b3a55] font-medium border border-[#d7d0c1]">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Explanation / DGRM Trap Tip */}
          {explanation && (
            <div className="p-3.5 rounded-xs bg-[#dce8ef]/50 border border-[#0b3a55]/25 text-xs sm:text-sm text-[#0b3a55] flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-[#9a7413] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#9a7413] font-bold mr-1">Rasteira / Explicação DGRM:</strong>
                {explanation}
              </div>
            </div>
          )}

          {/* Self-evaluation controls for open/fill questions in review mode */}
          {(type === 'open-answer' || type === 'fill-blank') && onSelfEvaluate && (
            <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#0b3a55]">
                A sua resposta escrita corresponde à chave oficial?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelfEvaluate(true)}
                  className={`px-3 py-1.5 rounded-xs font-mono-naut text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 border transition-all ${
                    userAnswer?.selfEvaluatedCorrect === true
                      ? 'bg-[#1e7d4f] text-[#faf7f0] border-[#1e7d4f]'
                      : 'bg-[#fcfbf8] text-[#1e7d4f] border-[#1e7d4f]/50 hover:bg-[#dcebe1]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Correto (+{points.toFixed(1)} val)
                </button>
                <button
                  type="button"
                  onClick={() => onSelfEvaluate(false)}
                  className={`px-3 py-1.5 rounded-xs font-mono-naut text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 border transition-all ${
                    userAnswer?.selfEvaluatedCorrect === false
                      ? 'bg-[#b3402f] text-[#faf7f0] border-[#b3402f]'
                      : 'bg-[#fcfbf8] text-[#b3402f] border-[#b3402f]/50 hover:bg-[#f3ded9]'
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
