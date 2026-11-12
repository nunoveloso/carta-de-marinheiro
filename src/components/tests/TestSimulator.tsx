import React, { useState, useEffect, useMemo } from 'react';
import { TestQuestion, UserAnswer, MainCategory, ExamAttempt, WeakTopicAnalysis } from '../../types/tests';
import { testsPT, generateOfficialExam } from '../../data/testsPT';
import { saveExamAttempt, getAllExamAttempts, analyzeWeakTopics } from '../../services/examAttemptsService';
import { ExamCard } from './ExamCard';
import { ExamSummaryModal } from './ExamSummaryModal';
import { PerformanceAnalytics } from './PerformanceAnalytics';
import { 
  Clock, 
  Compass, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Bookmark,
  ChevronRight,
  Send,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface TestSimulatorProps {
  onOpenGlossaryTerm?: (termTitle: string) => void;
}

export const TestSimulator: React.FC<TestSimulatorProps> = () => {
  const [currentView, setCurrentView] = useState<'hub' | 'exam' | 'practice'>('hub');
  const [hubTab, setHubTab] = useState<'tests' | 'analytics'>('tests');
  
  const [selectedExamNumber, setSelectedExamNumber] = useState<number | undefined>(undefined);
  const [activeQuestions, setActiveQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Attempts and Weak topics history
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [weakTopics, setWeakTopics] = useState<WeakTopicAnalysis[]>([]);

  // Timer state for official exam (60 minutes = 3600 seconds)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Modals & Submissions
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showConfirmSubmitDialog, setShowConfirmSubmitDialog] = useState(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);

  // Practice Filters
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<MainCategory | 'ALL'>('ALL');

  // Load past attempts on mount and view switch
  useEffect(() => {
    getAllExamAttempts().then((attempts) => {
      setExamAttempts(attempts);
      setWeakTopics(analyzeWeakTopics(attempts));
    });
  }, [currentView]);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timeLeftSeconds > 0 && !isExamSubmitted) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpentSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeftSeconds, isExamSubmitted]);

  // Start an Official Exam
  const handleStartOfficialExam = (testNum?: number) => {
    const questions = generateOfficialExam(testNum);
    setSelectedExamNumber(testNum);
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setUserAnswers({});
    setBookmarkedIds(new Set());
    setTimeLeftSeconds(3600);
    setTimeSpentSeconds(0);
    setTimerRunning(true);
    setIsExamSubmitted(false);
    setShowSummaryModal(false);
    setShowConfirmSubmitDialog(false);
    setCurrentView('exam');
  };

  // Start Practice Mode
  const handleStartPractice = (category: MainCategory | 'ALL' = 'ALL') => {
    setSelectedCategoryFilter(category);
    let pool = [...testsPT];
    if (category !== 'ALL') {
      pool = pool.filter((q) => q.category === category);
    }
    setActiveQuestions(pool);
    setCurrentIndex(0);
    setUserAnswers({});
    setBookmarkedIds(new Set());
    setTimerRunning(false);
    setIsExamSubmitted(false);
    setShowSummaryModal(false);
    setShowConfirmSubmitDialog(false);
    setCurrentView('practice');
  };

  // Option selection
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        selectedOption: optionIndex,
      },
    }));
  };

  // Text changes
  const handleChangeText = (questionId: string, text: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        textAnswer: text,
      },
    }));
  };

  // Self evaluate for open/fill questions
  const handleSelfEvaluate = (questionId: string, isCorrect: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        selfEvaluatedCorrect: isCorrect,
      },
    }));
  };

  // Bookmark toggle
  const handleToggleBookmark = (questionId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  // Submit Exam (allows submission anytime even without completing all questions)
  const handleSubmitExam = async () => {
    setTimerRunning(false);
    setIsExamSubmitted(true);
    setShowConfirmSubmitDialog(false);
    setShowSummaryModal(true);

    try {
      const categoryScores: Record<MainCategory, { earned: number; total: number; minRequiredPct?: number }> = {
        'RIEAM': { earned: 0, total: 0, minRequiredPct: 75 },
        'Segurança e Primeiros Socorros': { earned: 0, total: 0, minRequiredPct: 60 },
        'Marinharia': { earned: 0, total: 0 },
        'Outras Matérias': { earned: 0, total: 0 },
      };

      let totalEarned = 0;
      let totalPossible = 0;
      const failedQuestions: ExamAttempt['failedQuestions'] = [];

      activeQuestions.forEach((q) => {
        const ans = userAnswers[q.id];
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

        if (!isCorrect) {
          failedQuestions.push({
            questionId: q.id,
            questionNumber: q.questionNumber,
            statement: q.statement,
            category: q.category,
            subcategory: q.subcategory,
            userAnswer: q.type === 'multiple-choice' ? q.options?.[ans?.selectedOption ?? -1] : ans?.textAnswer,
            expectedAnswer: q.expectedAnswer,
            explanation: q.explanation,
          });
        }
      });

      const rieamPct = (categoryScores['RIEAM'].earned / (categoryScores['RIEAM'].total || 1)) * 100;
      const segPct = (categoryScores['Segurança e Primeiros Socorros'].earned / (categoryScores['Segurança e Primeiros Socorros'].total || 1)) * 100;

      const failReasons: string[] = [];
      if (totalEarned < 12.0) {
        failReasons.push(`Nota global inferior a 12.0 valores (${totalEarned.toFixed(1)} / 20.0).`);
      }
      if (rieamPct < 75) {
        failReasons.push(`RIEAM inferior a 75% (${categoryScores['RIEAM'].earned.toFixed(1)} / ${categoryScores['RIEAM'].total.toFixed(1)} val).`);
      }
      if (segPct < 60) {
        failReasons.push(`Segurança inferior a 60% (${categoryScores['Segurança e Primeiros Socorros'].earned.toFixed(1)} / ${categoryScores['Segurança e Primeiros Socorros'].total.toFixed(1)} val).`);
      }

      const isPassed = failReasons.length === 0;

      const attempt: ExamAttempt = {
        id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        testNumber: selectedExamNumber,
        testTitle: selectedExamNumber
          ? `Exame Oficial DGRM - Teste ${selectedExamNumber}`
          : (currentView === 'exam' ? 'Exame Oficial DGRM (Ponderado)' : `Treino Livre - ${selectedCategoryFilter}`),
        mode: currentView === 'exam' ? 'exam' : 'practice',
        startedAt: new Date(Date.now() - timeSpentSeconds * 1000).toISOString(),
        completedAt: new Date().toISOString(),
        timeSpentSeconds,
        totalScore: Number(totalEarned.toFixed(1)),
        totalPossiblePoints: Number(totalPossible.toFixed(1)),
        percentage: Math.round((totalEarned / (totalPossible || 1)) * 100),
        isPassed,
        rieamPassed: rieamPct >= 75,
        safetyPassed: segPct >= 60,
        globalPassed: totalEarned >= 12.0,
        failReasons,
        categoryBreakdown: {
          'RIEAM': {
            earned: Number(categoryScores['RIEAM'].earned.toFixed(1)),
            total: Number(categoryScores['RIEAM'].total.toFixed(1)),
            percentage: Math.round(rieamPct),
            isPassed: rieamPct >= 75
          },
          'Segurança e Primeiros Socorros': {
            earned: Number(categoryScores['Segurança e Primeiros Socorros'].earned.toFixed(1)),
            total: Number(categoryScores['Segurança e Primeiros Socorros'].total.toFixed(1)),
            percentage: Math.round(segPct),
            isPassed: segPct >= 60
          },
          'Marinharia': {
            earned: Number(categoryScores['Marinharia'].earned.toFixed(1)),
            total: Number(categoryScores['Marinharia'].total.toFixed(1)),
            percentage: Math.round((categoryScores['Marinharia'].earned / (categoryScores['Marinharia'].total || 1)) * 100),
            isPassed: true
          },
          'Outras Matérias': {
            earned: Number(categoryScores['Outras Matérias'].earned.toFixed(1)),
            total: Number(categoryScores['Outras Matérias'].total.toFixed(1)),
            percentage: Math.round((categoryScores['Outras Matérias'].earned / (categoryScores['Outras Matérias'].total || 1)) * 100),
            isPassed: true
          },
        },
        failedQuestions,
        answers: userAnswers,
      };

      await saveExamAttempt(attempt);
      const updated = await getAllExamAttempts();
      setExamAttempts(updated);
      setWeakTopics(analyzeWeakTopics(updated));
    } catch (err) {
      console.error('Erro ao registar tentativa de exame:', err);
    }
  };

  const currentQuestion = activeQuestions[currentIndex];

  const unansweredCount = useMemo(() => {
    return activeQuestions.filter((q) => {
      const ans = userAnswers[q.id];
      if (q.type === 'multiple-choice') {
        return ans?.selectedOption === undefined;
      }
      return !ans?.textAnswer || ans.textAnswer.trim().length === 0;
    }).length;
  }, [activeQuestions, userAnswers]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#1e293b] pb-16 font-sans">
      {/* ==================================================================== */}
      {/* 1. HUB / MENU PRINCIPAL                                              */}
      {/* ==================================================================== */}
      {currentView === 'hub' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
          
          {/* Header Banner - Papyrus & Admiralty Navy */}
          <div className="relative rounded-3xl border border-[#ded5c2] bg-[#f4efe4] p-6 sm:p-10 shadow-xs">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#64748b] font-medium">
                <Compass className="w-4 h-4 text-[#a16207]" />
                <span>DGRM Portugal</span>
                <span className="text-[#cbd5e1]">·</span>
                <span>Simulador de Exame Oficial</span>
              </div>
              <h1 className="font-maritime text-3xl sm:text-5xl font-bold text-[#112338] tracking-tight leading-tight">
                Simulador de Testes
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Pratique com as perguntas oficiais extraídas dos 13 testes da DGRM/IPTM. Teste os seus conhecimentos com a duração regulamentar de 60 minutos, esquemas técnicos sem legendas reveladoras e as regras eliminatórias reais (mínimo de 75% em RIEAM e 60% em Segurança).
              </p>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs text-center">
              <div className="text-2xl font-bold text-[#112338]">{testsPT.length}</div>
              <div className="text-xs text-[#64748b] font-medium mt-0.5">Perguntas Oficiais</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs text-center">
              <div className="text-2xl font-bold text-[#a16207]">13</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Testes DGRM Extraídos</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs text-center">
              <div className="text-2xl font-bold text-[#16a34a]">75%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Mínimo RIEAM (4.5 v)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs text-center">
              <div className="text-2xl font-bold text-[#dc2626]">60%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Mínimo Seg. (2.4 v)</div>
            </div>
          </div>

          {/* Tab Switcher: Exames & Treino VS Desempenho & Tópicos a Melhorar */}
          <div className="flex border-b border-[#ded5c2] gap-2 pt-2">
            <button
              type="button"
              onClick={() => setHubTab('tests')}
              className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${
                hubTab === 'tests'
                  ? 'border-[#112338] text-[#112338]'
                  : 'border-transparent text-[#64748b] hover:text-[#112338]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#a16207]" />
              Simulador de Exames
            </button>
            <button
              type="button"
              onClick={() => setHubTab('analytics')}
              className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${
                hubTab === 'analytics'
                  ? 'border-[#112338] text-[#112338]'
                  : 'border-transparent text-[#64748b] hover:text-[#112338]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#a16207]" />
              <span>Desempenho & Tópicos a Melhorar</span>
              {examAttempts.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#112338] text-white font-semibold">
                  {examAttempts.length}
                </span>
              )}
              {weakTopics.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" title="Existem tópicos com erros para rever" />
              )}
            </button>
          </div>

          {/* Tab 1: Exames & Treino */}
          {hubTab === 'tests' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
              
              {/* CARD 1: Exame Oficial DGRM */}
              <div className="rounded-3xl border border-[#ded5c2] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#112338]/40 transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f4efe4] border border-[#ded5c2] flex items-center justify-center text-[#112338]">
                    <Clock className="w-6 h-6 text-[#a16207]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#112338] font-maritime">
                      Exame Oficial DGRM
                    </h2>
                    <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                      30 perguntas oficiais rigorosamente sequenciadas de acordo com o enunciado, cronómetro de 60 minutos e ponderação oficial de 20 valores.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#fbf8f2] border border-[#ded5c2] text-xs text-[#475569] space-y-1.5 font-medium">
                    <div className="font-bold text-[#112338]">Critérios Oficiais de Aprovação:</div>
                    <div className="flex items-center gap-1.5 text-[#92400e]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                      RIEAM: Mínimo 75% (4.5 valores)
                    </div>
                    <div className="flex items-center gap-1.5 text-[#9f1239]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
                      Segurança e 1º Socorros: Mínimo 60% (2.4 valores)
                    </div>
                    <div className="flex items-center gap-1.5 text-[#166534]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                      Global: Mínimo 12.0 valores (sem reprovar em RIEAM ou Segurança)
                    </div>
                  </div>

                  {/* Specific Test Selector dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#64748b]">
                      Selecionar Teste Específico (ou Aleatório):
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdfcf9] border border-[#ded5c2] text-xs sm:text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#112338] font-medium shadow-2xs"
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedExamNumber(val ? parseInt(val) : undefined);
                      }}
                      defaultValue=""
                    >
                      <option value="">Exame Aleatório Ponderado (Recomendado)</option>
                      <option value="1">Teste 1 Oficial (Enunciado com Respostas Modelo)</option>
                      <option value="2">Teste 2 Oficial (Enunciado com Respostas Modelo)</option>
                      <option value="3">Teste 3 Oficial</option>
                      <option value="4">Teste 4 Oficial</option>
                      <option value="5">Teste 5 Oficial</option>
                      <option value="6">Teste 6 Oficial</option>
                      <option value="7">Teste 7 Oficial</option>
                      <option value="8">Teste 8 Oficial</option>
                      <option value="9">Teste 9 Oficial (Revisto e Fiel ao PDF)</option>
                      <option value="10">Teste 10 Oficial</option>
                      <option value="11">Teste 11 Oficial</option>
                      <option value="12">Teste 12 Oficial</option>
                      <option value="13">Teste 13 Oficial (Chave de Correção Oficial)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ede6d8]">
                  <button
                    type="button"
                    onClick={() => handleStartOfficialExam(selectedExamNumber)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#112338] hover:bg-[#1c3858] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    Iniciar Exame Oficial (60 min)
                  </button>
                </div>
              </div>

              {/* CARD 2: Treino Livre por Matéria */}
              <div className="rounded-3xl border border-[#ded5c2] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#112338]/40 transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f4efe4] border border-[#ded5c2] flex items-center justify-center text-[#112338]">
                    <BookOpen className="w-6 h-6 text-[#a16207]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#112338] font-maritime">
                      Treino Livre por Matéria
                    </h2>
                    <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                      Estudo flexível sem limite de tempo. Pratique por tópicos específicos com acesso imediato às soluções e dicas de exame.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleStartPractice('RIEAM')}
                      className="p-3 rounded-xl bg-[#fbf8f2] border border-[#ded5c2] hover:border-[#112338] text-left transition-all"
                    >
                      <div className="text-xs font-bold text-[#92400e]">1. RIEAM</div>
                      <div className="text-[11px] text-[#64748b] mt-0.5">Abalroamentos, Balões e Apitos</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartPractice('Segurança e Primeiros Socorros')}
                      className="p-3 rounded-xl bg-[#fbf8f2] border border-[#ded5c2] hover:border-[#112338] text-left transition-all"
                    >
                      <div className="text-xs font-bold text-[#9f1239]">2. Segurança</div>
                      <div className="text-[11px] text-[#64748b] mt-0.5">Homem ao Mar, Fogos e Socorros</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartPractice('Marinharia')}
                      className="p-3 rounded-xl bg-[#fbf8f2] border border-[#ded5c2] hover:border-[#112338] text-left transition-all"
                    >
                      <div className="text-xs font-bold text-[#0369a1]">3. Marinharia</div>
                      <div className="text-[11px] text-[#64748b] mt-0.5">Âncoras, Manobras e Nós</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartPractice('Outras Matérias')}
                      className="p-3 rounded-xl bg-[#fbf8f2] border border-[#ded5c2] hover:border-[#112338] text-left transition-all"
                    >
                      <div className="text-xs font-bold text-[#5b21b6]">4. Outras Matérias</div>
                      <div className="text-[11px] text-[#64748b] mt-0.5">Legislação, Marés, Motores e Balizagem</div>
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ede6d8]">
                  <button
                    type="button"
                    onClick={() => handleStartPractice('ALL')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#f4efe4] hover:bg-[#eae3d2] text-[#112338] font-bold text-xs sm:text-sm border border-[#ded5c2] shadow-2xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <BookOpen className="w-4 h-4 text-[#a16207]" />
                    Praticar Todas as Perguntas
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Desempenho & Tópicos a Melhorar */}
          {hubTab === 'analytics' && (
            <PerformanceAnalytics
              attempts={examAttempts}
              weakTopics={weakTopics}
              onStartPracticeTopic={(cat) => handleStartPractice(cat)}
              onStartExam={(num) => handleStartOfficialExam(num)}
            />
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. AMBIENTE DE EXAME / TREINO ATIVO (Fundo Claro Náutico)             */}
      {/* ==================================================================== */}
      {(currentView === 'exam' || currentView === 'practice') && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-200">
          
          {/* Top Bar Navigation & Timer */}
          <div className="sticky top-16 z-30 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#ded5c2] shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!isExamSubmitted && currentView === 'exam') {
                    setShowConfirmSubmitDialog(true);
                  } else {
                    setCurrentView('hub');
                  }
                }}
                className="p-2 rounded-xl border border-[#ded5c2] bg-[#fdfcf9] hover:bg-[#f4efe4] text-[#112338] transition-all shadow-2xs"
                title="Voltar ao Menu"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="text-xs font-semibold text-[#64748b]">
                  {currentView === 'exam' ? (
                    selectedExamNumber ? `Exame DGRM - Teste ${selectedExamNumber}` : 'Exame Oficial DGRM'
                  ) : (
                    `Treino Livre: ${selectedCategoryFilter === 'ALL' ? 'Todas as Matérias' : selectedCategoryFilter}`
                  )}
                </div>
                <div className="text-sm font-bold text-[#112338] flex items-center gap-2">
                  <span>Questão {currentIndex + 1} de {activeQuestions.length}</span>
                  {unansweredCount > 0 && !isExamSubmitted && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] font-semibold">
                      {unansweredCount} por responder
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Timer and Action Buttons */}
            <div className="flex items-center gap-3">
              {currentView === 'exam' && (
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                  timeLeftSeconds < 600
                    ? 'bg-[#fee2e2] border-[#ef4444] text-[#b91c1c] animate-pulse'
                    : 'bg-[#f4efe4] border-[#ded5c2] text-[#112338]'
                }`}>
                  <Clock className="w-4 h-4 text-[#a16207]" />
                  <span>{formatTimer(timeLeftSeconds)}</span>
                </div>
              )}

              {isExamSubmitted ? (
                <button
                  type="button"
                  onClick={() => setShowSummaryModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#112338] hover:bg-[#1c3858] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs"
                >
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  Ver Pauta
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    // Always allows submitting, asking a non-blocking confirmation if questions are unanswered
                    if (unansweredCount > 0) {
                      setShowConfirmSubmitDialog(true);
                    } else {
                      handleSubmitExam();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submeter Exame
                </button>
              )}
            </div>
          </div>

          {/* Quick Question Jump Palette (1 to 30) */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#64748b] mb-2 font-medium">
              <span className="font-bold uppercase tracking-wider text-[#112338]">Grelha de Perguntas:</span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#112338]" /> Respondida
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" /> Marcada
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e2d9c8]" /> Pendente
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {activeQuestions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isAnswered = q.type === 'multiple-choice'
                  ? ans?.selectedOption !== undefined
                  : !!ans?.textAnswer && ans.textAnswer.trim().length > 0;
                const isBookmarked = bookmarkedIds.has(q.id);
                const isCurrent = idx === currentIndex;

                let btnBg = 'bg-[#fdfcf9] border-[#ded5c2] text-[#64748b] hover:border-[#112338]/40';

                if (isExamSubmitted) {
                  let isCorrect = false;
                  if (q.type === 'multiple-choice') {
                    isCorrect = ans?.selectedOption === q.correctOptionIndex;
                  } else {
                    isCorrect = !!ans?.selfEvaluatedCorrect;
                  }
                  btnBg = isCorrect
                    ? 'bg-[#dcfce7] border-[#86efac] text-[#166534] font-bold'
                    : 'bg-[#fee2e2] border-[#fca5a5] text-[#991b1b] font-bold';
                } else if (isAnswered) {
                  btnBg = 'bg-[#112338] border-[#0a1827] text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-8 h-8 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${btnBg} ${
                      isCurrent ? 'ring-2 ring-[#a16207] ring-offset-2 ring-offset-[#fbf8f2] scale-105 shadow-2xs' : ''
                    }`}
                  >
                    {idx + 1}
                    {isBookmarked && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#f59e0b] ring-1 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Card */}
          {currentQuestion && (
            <ExamCard
              question={currentQuestion}
              questionIndex={currentIndex}
              totalQuestions={activeQuestions.length}
              userAnswer={userAnswers[currentQuestion.id]}
              isBookmarked={bookmarkedIds.has(currentQuestion.id)}
              onToggleBookmark={() => handleToggleBookmark(currentQuestion.id)}
              onSelectOption={(optIdx) => handleSelectOption(currentQuestion.id, optIdx)}
              onChangeTextAnswer={(txt) => handleChangeText(currentQuestion.id, txt)}
              onSelfEvaluate={(isCorrect) => handleSelfEvaluate(currentQuestion.id, isCorrect)}
              reviewMode={isExamSubmitted}
            />
          )}

          {/* Bottom Pagination Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2.5 rounded-xl border border-[#ded5c2] bg-white hover:bg-[#fcfaf5] disabled:opacity-40 disabled:pointer-events-none text-[#112338] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Pergunta Anterior
            </button>

            <span className="text-xs text-[#64748b] font-medium hidden sm:inline">
              Utilize os botões ou a grelha superior para navegar
            </span>

            <button
              type="button"
              disabled={currentIndex === activeQuestions.length - 1}
              onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
              className="px-4 py-2.5 rounded-xl border border-[#ded5c2] bg-white hover:bg-[#fcfaf5] disabled:opacity-40 disabled:pointer-events-none text-[#112338] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-2xs"
            >
              Próxima Pergunta
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* In-App Confirmation Modal to Submit Exam even with unanswered questions */}
      {showConfirmSubmitDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112338]/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#ded5c2] shadow-2xl max-w-md w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#b45309] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="font-maritime text-xl font-bold text-[#112338]">
              Submeter Exame Agora?
            </h3>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {unansweredCount > 0 ? (
                <>
                  Ainda tem <strong>{unansweredCount} perguntas</strong> por responder. Pode submeter de imediato: as perguntas em branco serão cotadas com <strong>0 valores</strong>.
                </>
              ) : (
                'Respondeu a todas as perguntas. Deseja finalizar e ver a sua avaliação oficial DGRM?'
              )}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowConfirmSubmitDialog(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#ded5c2] bg-[#f4efe4] hover:bg-[#eae3d2] text-[#475569] font-bold text-xs transition"
              >
                Continuar a Responder
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs shadow-xs transition"
              >
                Sim, Submeter Agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Scorecard Modal */}
      {showSummaryModal && (
        <ExamSummaryModal
          questions={activeQuestions}
          answers={userAnswers}
          timeSpentSeconds={timeSpentSeconds}
          onReviewAnswers={() => setShowSummaryModal(false)}
          onRetry={() => handleStartOfficialExam(selectedExamNumber)}
          onBackToMenu={() => {
            setShowSummaryModal(false);
            setCurrentView('hub');
          }}
        />
      )}
    </div>
  );
};
