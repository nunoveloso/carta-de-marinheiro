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
      // Calculate score and complete
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
    // Shuffle questions order and restart
    const shuffled = [...SAMPLE_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsQuizCompleted(false);
  };

  if (isQuizCompleted) {
    const score = calculateScore();
    const passed = score >= 7; // In Portugal, typically 70% required to pass Carta de Marinheiro

    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-900/40">
            {passed ? <Trophy className="h-10 w-10 text-white" /> : <Award className="h-10 w-10 text-white" />}
          </div>

          <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-white">
            {passed ? 'Aprovado com Distinção!' : 'Resultado do Teste'}
          </h3>

          <p className="mt-2 text-sm text-slate-300">
            {passed
              ? 'Parabéns! Demonstrou os conhecimentos náuticos essenciais exigidos para a Carta de Marinheiro.'
              : 'Ainda necessita de rever alguns conceitos regulamentares. O exame oficial exige pelo menos 70% de respostas certas.'}
          </p>

          <div className="my-6 inline-flex items-center gap-4 rounded-2xl bg-slate-950/80 px-6 py-4 border border-slate-800">
            <div>
              <div className="text-3xl font-black text-cyan-400">
                {score} / {questions.length}
              </div>
              <div className="text-xs text-slate-400 font-medium">Pontuação Final</div>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div>
              <div
                className={`text-2xl font-bold ${
                  passed ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {passed ? 'Apto para Navegar' : 'Não Apto (Rever)'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-3 text-sm font-bold text-white shadow-lg hover:from-cyan-500 hover:to-blue-500 transition"
            >
              <RotateCcw className="w-4 h-4" />
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
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold text-cyan-400">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span>Progresso do Teste: {progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        <div className="inline-block rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20 mb-3">
          Simulador Exame Oficial DGRM
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = currentQ.correctIndex === idx;

            let optionStyle =
              'border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700 hover:bg-slate-950';

            if (isSelected) {
              optionStyle = 'border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500';
            }

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
              } else if (isSelected) {
                optionStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left rounded-2xl border p-4 text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${optionStyle}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 pt-0.5">{option}</span>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card after submission */}
        {isAnswerSubmitted && (
          <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Explicação Oficial:</span>
            </div>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
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
              className="rounded-xl bg-cyan-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-cyan-500 transition disabled:opacity-40"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:from-cyan-500 hover:to-blue-500 transition"
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
