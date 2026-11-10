import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, AlertCircle, RotateCcw, Trophy, Award, ArrowRight, HelpCircle } from 'lucide-react';
import { SAMPLE_QUIZ_QUESTIONS } from '../data/initialTerms';
import { QuizQuestion } from '../types/glossary';

export const QuizView: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(SAMPLE_QUIZ_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: idx,
    });
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === undefined) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSubmitted(selectedAnswers[currentQuestionIndex + 1] !== undefined);
    } else {
      setIsQuizCompleted(true);
      const score = calculateScore();
      if (score >= 7) {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
        });
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) {
        correct += 1;
      }
    });
    return correct;
  };

  const handleRestart = () => {
    const shuffled = [...SAMPLE_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsQuizCompleted(false);
  };

  if (isQuizCompleted) {
    const score = calculateScore();
    const passed = score >= 7;

    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center">
        <div className="rounded-3xl border border-[#ded5c2] bg-[#fdfcf9] p-8 shadow-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#112338] shadow-sm">
            {passed ? <Trophy className="h-10 w-10 text-[#d4af37]" /> : <Award className="h-10 w-10 text-[#d4af37]" />}
          </div>

          <h3 className="mt-5 font-maritime text-3xl font-bold text-[#112338]">
            {passed ? 'Aprovado com Distinção!' : 'Resultado do Teste'}
          </h3>

          <p className="mt-2 text-sm text-[#475569]">
            {passed
              ? 'Parabéns! Demonstrou os conhecimentos náuticos essenciais exigidos para a Carta de Marinheiro.'
              : 'Ainda necessita de rever alguns conceitos regulamentares. O exame oficial da DGRM exige pelo menos 70% de respostas certas.'}
          </p>

          <div className="my-6 inline-flex items-center gap-6 rounded-2xl bg-[#f4efe4] px-7 py-4 border border-[#ded5c2]">
            <div>
              <div className="font-maritime text-3xl font-bold text-[#112338]">
                {score} / {questions.length}
              </div>
              <div className="text-xs text-[#64748b] font-medium">Pontuação Final</div>
            </div>
            <div className="h-10 w-px bg-[#ded5c2]" />
            <div>
              <div
                className={`font-maritime text-3xl font-bold ${
                  passed ? 'text-[#15803d]' : 'text-[#b45309]'
                }`}
              >
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="text-xs text-[#64748b] font-medium">
                {passed ? 'Apto para Navegar' : 'Não Apto (Rever)'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#112338] py-3 text-xs sm:text-sm font-semibold text-[#fbf8f2] shadow-sm hover:bg-[#1c3858] transition"
            >
              <RotateCcw className="w-4 h-4 text-[#d4af37]" />
              <span>Realizar Novo Teste</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Quiz Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-[#64748b] mb-2 font-medium">
          <span className="font-semibold text-[#112338]">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span>Progresso: {progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#eae3d2] overflow-hidden">
          <div
            className="h-full bg-[#112338] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-[#ded5c2] bg-[#fdfcf9] p-6 sm:p-8 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">
          Simulador Exame Oficial DGRM
        </div>

        <h3 className="font-maritime text-2xl sm:text-3xl font-bold text-[#112338] leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = currentQ.correctIndex === idx;

            let optionStyle =
              'border-[#ded5c2] bg-white text-[#1e293b] hover:border-[#112338] hover:bg-[#f7f3e8] shadow-2xs';

            if (isSelected) {
              optionStyle = 'border-[#112338] bg-[#f4efe4] text-[#112338] ring-1 ring-[#112338] shadow-2xs';
            }

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyle = 'border-[#10b981] bg-[#ecfdf5] text-[#065f46] ring-1 ring-[#10b981]';
              } else if (isSelected) {
                optionStyle = 'border-[#ef4444] bg-[#fef2f2] text-[#991b1b] ring-1 ring-[#ef4444]';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left rounded-2xl border p-4 text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${optionStyle}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#ded5c2] bg-[#f4efe4] text-xs font-bold text-[#112338]">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 pt-0.5">{option}</span>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-[#10b981] shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-[#ef4444] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card after submission */}
        {isAnswerSubmitted && (
          <div className="mt-6 rounded-2xl border border-[#ded5c2] bg-[#f7f4ea] p-4 text-xs sm:text-sm text-[#334155]">
            <div className="flex items-center gap-1.5 font-bold text-[#112338] mb-1">
              <HelpCircle className="w-4 h-4 text-[#a16207]" />
              <span>Explicação Oficial:</span>
            </div>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-6 pt-5 border-t border-[#ede6d8] flex items-center justify-between">
          <div className="text-xs text-[#64748b]">
            {selectedOption === undefined
              ? 'Selecione uma opção para continuar'
              : !isAnswerSubmitted
              ? 'Confirme a resposta para ver a explicação'
              : 'Avance para a pergunta seguinte'}
          </div>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedOption === undefined}
              className="rounded-xl bg-[#112338] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition disabled:opacity-40"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-1.5 rounded-xl bg-[#112338] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition"
            >
              <span>{currentQuestionIndex === questions.length - 1 ? 'Ver Resultado' : 'Seguinte'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
