import React, { useState, useEffect, useMemo } from 'react';
import { TestQuestion, UserAnswer, MainCategory, ExamAttempt, WeakTopicAnalysis } from '../../types/tests';
import { getCategoryStyle } from '../../types/glossary';
import { testsPT, generateOfficialExam } from '../../data/testsPT';
import { saveExamAttempt, getAllExamAttempts, analyzeWeakTopics } from '../../services/examAttemptsService';
import { ExamCard } from './ExamCard';
import { ExamSummaryModal } from './ExamSummaryModal';
import { PerformanceAnalytics } from './PerformanceAnalytics';
import { CategoryIcon } from '../CategoryIcon';
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

  // In-line blank changes
  const handleChangeBlankAnswer = (questionId: string, blankIndex: number, text: string) => {
    setUserAnswers((prev) => {
      const prevAnswer = prev[questionId];
      const prevBlanks = prevAnswer?.blankAnswers ? [...prevAnswer.blankAnswers] : [];
      while (prevBlanks.length <= blankIndex) {
        prevBlanks.push('');
      }
      prevBlanks[blankIndex] = text;

      return {
        ...prev,
        [questionId]: {
          ...prevAnswer,
          questionId,
          blankAnswers: prevBlanks,
          textAnswer: prevBlanks.filter((b) => b.trim().length > 0).join(' | '),
        },
      };
    });
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
      if (ans?.blankAnswers && ans.blankAnswers.length > 0) {
        return !ans.blankAnswers.some((b) => b.trim().length > 0);
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
    <div className="min-h-screen bg-[#faf7f0] text-[#0b3a55] pb-16">
      {/* ==================================================================== */}
      {/* 1. HUB / MENU PRINCIPAL                                              */}
      {/* ==================================================================== */}
      {currentView === 'hub' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
          
          {/* Header Banner - Chart Paper & Admiralty Blue */}
          <div className="relative rounded-xs border border-[#d7d0c1] bg-[#ede9de]/45 p-6 sm:p-10">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-[#4f6e82]">
                <Compass className="w-4 h-4 text-[#9a7413]" />
                <span>DGRM Portugal</span>
                <span className="text-[#d7d0c1]">·</span>
                <span>Simulador de Exame Oficial</span>
              </div>
              <h1 className="font-maritime text-3xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight leading-tight">
                Simulador de Testes
              </h1>
              <p className="text-xs sm:text-sm text-[#4f6e82] leading-relaxed">
                Pratique com as perguntas oficiais extraídas dos 13 testes da DGRM/IPTM. Teste os seus conhecimentos com a duração regulamentar de 60 minutos, esquemas técnicos sem legendas reveladoras e as regras eliminatórias reais (mínimo de 75% em RIEAM e 60% em Segurança).
              </p>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xs bg-[#fcfbf8] border border-[#d7d0c1] text-center">
              <div className="font-mono-naut text-2xl font-bold text-[#0b3a55]">{testsPT.length}</div>
              <div className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82] mt-0.5">Perguntas Oficiais</div>
            </div>
            <div className="p-4 rounded-xs bg-[#fcfbf8] border border-[#d7d0c1] text-center">
              <div className="font-mono-naut text-2xl font-bold text-[#9a7413]">13</div>
              <div className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82] mt-0.5">Testes DGRM Extraídos</div>
            </div>
            <div className="p-4 rounded-xs bg-[#fcfbf8] border border-[#d7d0c1] text-center">
              <div className="font-mono-naut text-2xl font-bold text-[#1e7d4f]">75%</div>
              <div className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82] mt-0.5">Mínimo RIEAM (4.5 v)</div>
            </div>
            <div className="p-4 rounded-xs bg-[#fcfbf8] border border-[#d7d0c1] text-center">
              <div className="font-mono-naut text-2xl font-bold text-[#b3402f]">60%</div>
              <div className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82] mt-0.5">Mínimo Seg. (2.4 v)</div>
            </div>
          </div>

          {/* Tab Switcher: Exames & Treino VS Desempenho & Tópicos a Melhorar */}
          <div className="flex border-b border-[#d7d0c1] gap-4 pt-2 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setHubTab('tests')}
              className={`pb-3 px-2 font-mono-naut text-xs uppercase tracking-wider font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                hubTab === 'tests'
                  ? 'border-[#0b3a55] text-[#0b3a55]'
                  : 'border-transparent text-[#4f6e82] hover:text-[#0b3a55]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#9a7413]" />
              Simulador de Exames
            </button>
            <button
              type="button"
              onClick={() => setHubTab('analytics')}
              className={`pb-3 px-2 font-mono-naut text-xs uppercase tracking-wider font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                hubTab === 'analytics'
                  ? 'border-[#0b3a55] text-[#0b3a55]'
                  : 'border-transparent text-[#4f6e82] hover:text-[#0b3a55]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#9a7413]" />
              <span>Desempenho & Tópicos a Melhorar</span>
              {examAttempts.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-xs text-[10px] bg-[#0b3a55] text-[#faf7f0] font-semibold">
                  {examAttempts.length}
                </span>
              )}
              {weakTopics.length > 0 && (
                <span className="w-2 h-2 rounded-xs bg-[#b3402f]" title="Existem tópicos com erros para rever" />
              )}
            </button>
          </div>

          {/* Tab 1: Exames & Treino */}
          {hubTab === 'tests' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
              
              {/* CARD 1: Exame Oficial DGRM */}
              <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 sm:p-8 flex flex-col justify-between hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xs bg-[#ede9de] border border-[#d7d0c1] flex items-center justify-center text-[#0b3a55]">
                    <Clock className="w-6 h-6 text-[#9a7413]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0b3a55] font-maritime">
                      Exame Oficial DGRM
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4f6e82] mt-2 leading-relaxed">
                      30 perguntas oficiais rigorosamente sequenciadas de acordo com o enunciado, cronómetro de 60 minutos e ponderação oficial de 20 valores.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#d7d0c1] text-xs text-[#4f6e82] space-y-1.5 font-medium">
                    <div className="font-mono-naut text-[11px] uppercase tracking-wider font-semibold text-[#0b3a55]">Critérios Oficiais de Aprovação:</div>
                    <div className="flex items-center gap-2 text-[#0b3a55]">
                      <CategoryIcon category="R.I.E.A.M." className="w-3.5 h-3.5 shrink-0 text-[#0b3a55]" />
                      RIEAM: Mínimo 75% (4.5 valores)
                    </div>
                    <div className="flex items-center gap-2 text-[#b3402f]">
                      <CategoryIcon category="Segurança e Primeiros Socorros" className="w-3.5 h-3.5 shrink-0 text-[#b3402f]" />
                      Segurança e 1º Socorros: Mínimo 60% (2.4 valores)
                    </div>
                    <div className="flex items-center gap-2 text-[#1e7d4f]">
                      <span className="w-2 h-2 rounded-xs bg-[#1e7d4f] shrink-0" />
                      Global: Mínimo 12.0 valores (sem reprovar em RIEAM ou Segurança)
                    </div>
                  </div>

                  {/* Specific Test Selector dropdown */}
                  <div className="space-y-1.5">
                    <label className="font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#4f6e82] block">
                      Selecionar Teste Específico (ou Aleatório):
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 rounded-xs bg-[#faf7f0] border border-[#d3ccbb] text-xs sm:text-sm text-[#0b3a55] focus:outline-none focus:border-[#0b3a55] focus:bg-[#fcfbf8] font-medium"
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

                <div className="mt-6 pt-4 border-t border-[#d7d0c1]">
                  <button
                    type="button"
                    onClick={() => handleStartOfficialExam(selectedExamNumber)}
                    className="w-full py-3.5 px-6 rounded-xs bg-[#0b3a55] hover:bg-[#082b3f] text-[#faf7f0] font-mono-naut uppercase tracking-wider font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Clock className="w-4 h-4 text-[#ca9e1c]" />
                    Iniciar Exame Oficial (60 min)
                  </button>
                </div>
              </div>

              {/* CARD 2: Treino Livre por Matéria */}
              <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 sm:p-8 flex flex-col justify-between hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xs bg-[#ede9de] border border-[#d7d0c1] flex items-center justify-center text-[#0b3a55]">
                    <BookOpen className="w-6 h-6 text-[#9a7413]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0b3a55] font-maritime">
                      Treino Livre por Matéria
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4f6e82] mt-2 leading-relaxed">
                      Estudo flexível sem limite de tempo. Pratique por tópicos específicos com acesso imediato às soluções e dicas de exame.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => handleStartPractice('RIEAM')}
                      className="p-3 rounded-xs bg-[#faf7f0] border border-[#d7d0c1] hover:border-[#0b3a55] text-left transition-all"
                    >
                      <div className="flex items-center gap-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-semibold text-[#0b3a55]">
                        <CategoryIcon category="R.I.E.A.M." className="w-3.5 h-3.5 shrink-0" />
                        <span>1. RIEAM</span>
                      </div>
                      <div className="text-[11px] text-[#4f6e82] mt-1">Abalroamentos, Balões e Apitos</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartPractice('Segurança e Primeiros Socorros')}
                      className="p-3 rounded-xs bg-[#faf7f0] border border-[#d7d0c1] hover:border-[#b3402f] text-left transition-all"
                    >
                      <div className="flex items-center gap-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-semibold text-[#b3402f]">
                        <CategoryIcon category="Segurança e Primeiros Socorros" className="w-3.5 h-3.5 shrink-0" />
                        <span>2. Segurança</span>
                      </div>
                      <div className="text-[11px] text-[#4f6e82] mt-1">Homem ao Mar, Fogos e Socorros</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartPractice('Marinharia')}
                      className="p-3 rounded-xs bg-[#faf7f0] border border-[#d7d0c1] hover:border-[#1e7d4f] text-left transition-all"
                    >
                      <div className="flex items-center gap-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-semibold text-[#1e7d4f]">
                        <CategoryIcon category="Marinharia" className="w-3.5 h-3.5 shrink-0" />
                        <span>3. Marinharia</span>
                      </div>
                      <div className="text-[11px] text-[#4f6e82] mt-1">Âncoras, Manobras e Nós</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartPractice('Outras Matérias')}
                      className="p-3 rounded-xs bg-[#faf7f0] border border-[#d7d0c1] hover:border-[#9a7413] text-left transition-all"
                    >
                      <div className="flex items-center gap-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-semibold text-[#9a7413]">
                        <CategoryIcon category="Outras Matérias" className="w-3.5 h-3.5 shrink-0" />
                        <span>4. Outras Matérias</span>
                      </div>
                      <div className="text-[11px] text-[#4f6e82] mt-1">Legislação, Marés, Motores e Balizagem</div>
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#d7d0c1]">
                  <button
                    type="button"
                    onClick={() => handleStartPractice('ALL')}
                    className="w-full py-3.5 px-6 rounded-xs bg-[#ede9de] hover:bg-[#d7d0c1]/70 text-[#0b3a55] font-mono-naut uppercase tracking-wider font-semibold text-xs border border-[#d7d0c1] flex items-center justify-center gap-2 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-[#9a7413]" />
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
      {/* 2. AMBIENTE DE EXAME / TREINO ATIVO                                  */}
      {/* ==================================================================== */}
      {(currentView === 'exam' || currentView === 'practice') && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-200">
          
          {/* Top Bar Navigation & Timer */}
          <div className="sticky top-16 z-30 p-4 rounded-xs bg-[#fcfbf8]/95 backdrop-blur-md border border-[#d7d0c1] flex flex-wrap items-center justify-between gap-3">
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
                className="p-2 rounded-xs border border-[#d7d0c1] bg-[#faf7f0] hover:border-[#0b3a55] text-[#0b3a55] transition-all"
                title="Voltar ao Menu"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#4f6e82]">
                  {currentView === 'exam' ? (
                    selectedExamNumber ? `Exame DGRM - Teste ${selectedExamNumber}` : 'Exame Oficial DGRM'
                  ) : (
                    `Treino Livre: ${selectedCategoryFilter === 'ALL' ? 'Todas as Matérias' : selectedCategoryFilter}`
                  )}
                </div>
                <div className="text-sm font-bold text-[#0b3a55] flex items-center gap-2 flex-wrap">
                  <span className="font-mono-naut">Questão {currentIndex + 1} de {activeQuestions.length}</span>
                  {unansweredCount > 0 && !isExamSubmitted && (
                    <span className="font-mono-naut text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#f0e8cf] text-[#9a7413] border border-[#9a7413]/40 font-semibold">
                      {unansweredCount} por responder
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Timer and Action Buttons */}
            <div className="flex items-center gap-3">
              {currentView === 'exam' && (
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xs border font-mono-naut font-bold text-sm ${
                  timeLeftSeconds < 600
                    ? 'bg-[#f3ded9] border-[#b3402f] text-[#b3402f] animate-pulse'
                    : 'bg-[#ede9de]/70 border-[#d7d0c1] text-[#0b3a55]'
                }`}>
                  <Clock className={`w-4 h-4 ${timeLeftSeconds < 600 ? 'text-[#b3402f]' : 'text-[#9a7413]'}`} />
                  <span>{formatTimer(timeLeftSeconds)}</span>
                </div>
              )}

              {isExamSubmitted ? (
                <button
                  type="button"
                  onClick={() => setShowSummaryModal(true)}
                  className="px-4 py-2 rounded-xs bg-[#0b3a55] hover:bg-[#082b3f] text-[#faf7f0] font-mono-naut uppercase tracking-wider font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Award className="w-4 h-4 text-[#ca9e1c]" />
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
                  className="px-4 py-2 rounded-xs bg-[#1e7d4f] hover:bg-[#17633e] text-[#faf7f0] font-mono-naut uppercase tracking-wider font-semibold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submeter Exame
                </button>
              )}
            </div>
          </div>

          {/* Quick Question Jump Palette (1 to 30) */}
          <div className="p-3.5 rounded-xs bg-[#fcfbf8] border border-[#d7d0c1]">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#4f6e82] mb-2.5 font-medium">
              <span className="font-mono-naut text-[11px] font-semibold uppercase tracking-wider text-[#0b3a55]">Grelha de Perguntas:</span>
              <div className="flex items-center gap-3 font-mono-naut text-[10px] uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0b3a55]" /> Respondida
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#ca9e1c]" /> Marcada
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#ede9de] border border-[#d7d0c1]" /> Pendente
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {activeQuestions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isAnswered = q.type === 'multiple-choice'
                  ? ans?.selectedOption !== undefined
                  : (ans?.blankAnswers && ans.blankAnswers.length > 0)
                    ? ans.blankAnswers.some((b) => b.trim().length > 0)
                    : !!ans?.textAnswer && ans.textAnswer.trim().length > 0;
                const isBookmarked = bookmarkedIds.has(q.id);
                const isCurrent = idx === currentIndex;

                let btnBg = 'bg-[#faf7f0] border-[#d7d0c1] text-[#4f6e82] hover:border-[#0b3a55]';

                if (isExamSubmitted) {
                  let isCorrect = false;
                  if (q.type === 'multiple-choice') {
                    isCorrect = ans?.selectedOption === q.correctOptionIndex;
                  } else {
                    isCorrect = !!ans?.selfEvaluatedCorrect;
                  }
                  btnBg = isCorrect
                    ? 'bg-[#dcebe1] border-[#1e7d4f] text-[#1e7d4f] font-bold'
                    : 'bg-[#f3ded9] border-[#b3402f] text-[#b3402f] font-bold';
                } else if (isAnswered) {
                  btnBg = 'bg-[#0b3a55] border-[#0b3a55] text-[#faf7f0] font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-8 h-8 rounded-xs border font-mono-naut text-xs flex items-center justify-center transition-all ${btnBg} ${
                      isCurrent ? 'ring-2 ring-[#ca9e1c] ring-offset-2 ring-offset-[#faf7f0] scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                    {isBookmarked && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-xs bg-[#ca9e1c] ring-1 ring-[#fcfbf8]" />
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
              onChangeBlankAnswer={(blankIdx, txt) => handleChangeBlankAnswer(currentQuestion.id, blankIdx, txt)}
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
              className="px-4 py-2.5 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] hover:border-[#0b3a55] disabled:opacity-40 disabled:pointer-events-none text-[#0b3a55] font-mono-naut uppercase tracking-wider font-semibold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Pergunta Anterior
            </button>

            <span className="font-mono-naut text-[11px] text-[#4f6e82] hidden sm:inline">
              Utilize os botões ou a grelha superior para navegar
            </span>

            <button
              type="button"
              disabled={currentIndex === activeQuestions.length - 1}
              onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
              className="px-4 py-2.5 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] hover:border-[#0b3a55] disabled:opacity-40 disabled:pointer-events-none text-[#0b3a55] font-mono-naut uppercase tracking-wider font-semibold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
            >
              Próxima Pergunta
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* In-App Confirmation Modal to Submit Exam even with unanswered questions */}
      {showConfirmSubmitDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b3a55]/60 backdrop-blur-xs">
          <div className="bg-[#fcfbf8] rounded-xs border border-[#0b3a55] shadow-[6px_6px_0_0_#0b3a55] max-w-md w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-xs bg-[#f0e8cf] border border-[#9a7413]/40 text-[#9a7413] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="font-maritime text-xl font-bold text-[#0b3a55]">
              Submeter Exame Agora?
            </h3>

            <p className="text-xs sm:text-sm text-[#4f6e82] leading-relaxed">
              {unansweredCount > 0 ? (
                <>
                  Ainda tem <strong className="text-[#0b3a55]">{unansweredCount} perguntas</strong> por responder. Pode submeter de imediato: as perguntas em branco serão cotadas com <strong className="text-[#0b3a55]">0 valores</strong>.
                </>
              ) : (
                'Respondeu a todas as perguntas. Deseja finalizar e ver a sua avaliação oficial DGRM?'
              )}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowConfirmSubmitDialog(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xs border border-[#d7d0c1] bg-[#ede9de] hover:bg-[#d7d0c1]/70 text-[#0b3a55] font-mono-naut uppercase tracking-wider font-semibold text-xs transition"
              >
                Continuar a Responder
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xs bg-[#1e7d4f] hover:bg-[#17633e] text-[#faf7f0] font-mono-naut uppercase tracking-wider font-semibold text-xs transition"
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
