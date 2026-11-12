import React from 'react';
import { ExamAttempt, WeakTopicAnalysis, MainCategory } from '../../types/tests';
import { 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  Target
} from 'lucide-react';

interface PerformanceAnalyticsProps {
  attempts: ExamAttempt[];
  weakTopics: WeakTopicAnalysis[];
  onStartPracticeTopic: (category: MainCategory) => void;
  onStartExam: (testNum?: number) => void;
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  attempts,
  weakTopics,
  onStartPracticeTopic,
  onStartExam,
}) => {
  if (!attempts || attempts.length === 0) {
    return (
      <div className="rounded-3xl border border-[#ded5c2] bg-white p-8 sm:p-12 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#f4efe4] border border-[#ded5c2] flex items-center justify-center text-[#a16207] mx-auto">
          <TrendingUp className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-xl font-bold text-[#112338] font-maritime">
            Ainda não realizou nenhum exame
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
            Realize o seu primeiro exame de 60 minutos ou treine por matéria. O simulador guardará as suas tentativas e identificará automaticamente os tópicos onde tem mais dificuldades para orientar o seu estudo.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => onStartExam(1)}
            className="px-5 py-3 rounded-xl bg-[#112338] hover:bg-[#1c3858] text-white text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-[1.02]"
          >
            Começar pelo Teste 1 Oficial
          </button>
          <button
            type="button"
            onClick={() => onStartExam(9)}
            className="px-5 py-3 rounded-xl bg-[#f4efe4] hover:bg-[#eae3d2] text-[#112338] border border-[#ded5c2] text-xs sm:text-sm font-bold transition-all"
          >
            Fazer o Teste 9 Oficial
          </button>
        </div>
      </div>
    );
  }

  // Estatísticas globais
  const totalExams = attempts.length;
  const passedCount = attempts.filter((a) => a.isPassed).length;
  const passRate = Math.round((passedCount / totalExams) * 100);
  const averageScore = (attempts.reduce((sum, a) => sum + a.totalScore, 0) / totalExams).toFixed(1);

  // Média em RIEAM e Segurança
  const rieamPassCount = attempts.filter((a) => a.rieamPassed).length;
  const rieamPassRate = Math.round((rieamPassCount / totalExams) * 100);

  const safetyPassCount = attempts.filter((a) => a.safetyPassed).length;
  const safetyPassRate = Math.round((safetyPassCount / totalExams) * 100);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Global KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs">
          <div className="text-xs text-[#64748b] font-medium">Exames Realizados</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#112338] mt-1">{totalExams}</div>
          <div className="text-[11px] text-[#475569] mt-0.5">{passedCount} Aprovados</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs">
          <div className="text-xs text-[#64748b] font-medium">Taxa de Aprovação</div>
          <div className={`text-2xl sm:text-3xl font-bold mt-1 ${passRate >= 70 ? 'text-[#16a34a]' : 'text-[#d97706]'}`}>
            {passRate}%
          </div>
          <div className="text-[11px] text-[#475569] mt-0.5">Mínimo 12.0 val</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs">
          <div className="text-xs text-[#64748b] font-medium">Média Global</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#a16207] mt-1">
            {averageScore} <span className="text-xs text-[#64748b] font-normal">/ 20</span>
          </div>
          <div className="text-[11px] text-[#475569] mt-0.5">Em {totalExams} tentativas</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-2xs">
          <div className="text-xs text-[#64748b] font-medium">Critérios Eliminatórios</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#fef3c7] text-[#92400e]">
              RIEAM: {rieamPassRate}%
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#fee2e2] text-[#991b1b]">
              Seg: {safetyPassRate}%
            </span>
          </div>
          <div className="text-[11px] text-[#475569] mt-0.5">Mínimos 75% e 60%</div>
        </div>
      </div>

      {/* 2. Diagnóstico: Tópicos com Mais Dificuldades (Onde o utilizador deve focar o estudo) */}
      <div className="rounded-3xl border border-[#ded5c2] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ede6d8] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#fee2e2] border border-[#fca5a5] flex items-center justify-center text-[#991b1b]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#112338]">
                Tópicos com Mais Dificuldades (Diagnóstico de Erros)
              </h3>
              <p className="text-xs text-[#64748b]">
                Identificados a partir das perguntas falhadas nos seus testes para orientar o seu estudo
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#a16207] bg-[#fbf8f2] border border-[#ded5c2] px-3 py-1 rounded-full">
            {weakTopics.length} Matérias com Erros
          </span>
        </div>

        {weakTopics.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#166534] bg-[#dcfce7]/60 rounded-2xl border border-[#86efac]">
            Parabéns! Não tem tópicos críticos registados com falhas recorrentes.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {weakTopics.slice(0, 6).map((topic, idx) => (
              <div
                key={`${topic.category}-${topic.subcategory}-${idx}`}
                className="p-4 rounded-2xl bg-[#fdfcf9] border border-[#ded5c2] flex flex-col justify-between hover:border-[#112338]/40 transition-all shadow-2xs space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400e] px-2 py-0.5 rounded-md bg-[#fef3c7] border border-[#fde68a]">
                      {topic.category}
                    </span>
                    <span className="text-xs font-bold text-[#dc2626] bg-[#fee2e2] px-2.5 py-0.5 rounded-full border border-[#fca5a5]">
                      {topic.failedCount} {topic.failedCount === 1 ? 'erro' : 'erros'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#112338] mt-2">
                    {topic.subcategory}
                  </h4>

                  {topic.sampleStatements && topic.sampleStatements.length > 0 && (
                    <div className="mt-2 text-[11px] text-[#475569] bg-[#f4efe4] p-2 rounded-xl border border-[#ded5c2] line-clamp-2">
                      <span className="font-semibold text-[#112338]">Exemplo falhado: </span>
                      {topic.sampleStatements[0]}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onStartPracticeTopic(topic.category)}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#112338] text-[#112338] hover:text-white border border-[#ded5c2] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs group"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#a16207] group-hover:text-white" />
                  Praticar esta Matéria
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Histórico de Exames Realizados */}
      <div className="rounded-3xl border border-[#ded5c2] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#ede6d8] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#f4efe4] border border-[#ded5c2] flex items-center justify-center text-[#112338]">
              <Calendar className="w-5 h-5 text-[#a16207]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#112338]">
                Histórico de Tentativas Realizadas
              </h3>
              <p className="text-xs text-[#64748b]">
                Registo contínuo de pontuações, tempo e critérios eliminatórios
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="p-4 rounded-2xl bg-[#fdfcf9] border border-[#ded5c2] flex flex-wrap items-center justify-between gap-3 hover:border-[#112338]/40 transition-all shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#112338]">
                    {attempt.testTitle}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      attempt.isPassed
                        ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                        : 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                    }`}
                  >
                    {attempt.isPassed ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Aprovado
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        Reprovado
                      </>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748b]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(attempt.completedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDuration(attempt.timeSpentSeconds)}
                  </span>
                  {attempt.failedQuestions && (
                    <span className="text-[#b91c1c] font-medium">
                      {attempt.failedQuestions.length} questões com erro
                    </span>
                  )}
                </div>

                {attempt.failReasons && attempt.failReasons.length > 0 && (
                  <div className="text-[11px] text-[#991b1b] pt-0.5">
                    Motivo: {attempt.failReasons.join(' | ')}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-bold text-[#112338]">
                    {attempt.totalScore.toFixed(1)}{' '}
                    <span className="text-xs text-[#64748b] font-normal">/ 20.0</span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#64748b]">
                    {attempt.percentage}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
