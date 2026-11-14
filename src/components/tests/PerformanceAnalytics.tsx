import React from 'react';
import { ExamAttempt, WeakTopicAnalysis, MainCategory } from '../../types/tests';
import { getCategoryStyle } from '../../types/glossary';
import { CategoryIcon } from '../CategoryIcon';
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
      <div className="rounded-none border border-border bg-card p-8 sm:p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-none bg-secondary border border-border flex items-center justify-center text-[#9a7413] mx-auto">
          <TrendingUp className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-xl font-bold text-primary font-maritime">
            Ainda não realizou nenhum exame
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Realize o seu primeiro exame de 60 minutos ou treine por matéria. O simulador guardará as suas tentativas e identificará automaticamente os tópicos onde tem mais dificuldades para orientar o seu estudo.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => onStartExam(1)}
            className="px-5 py-3 rounded-none bg-primary hover:bg-[#082b3f] text-[#fbf9f0] font-mono-naut uppercase tracking-wider text-xs font-semibold transition-all cursor-pointer"
          >
            Começar pelo Teste 1 Oficial
          </button>
          <button
            type="button"
            onClick={() => onStartExam(9)}
            className="px-5 py-3 rounded-none bg-secondary hover:bg-border/70 text-primary border border-border font-mono-naut uppercase tracking-wider text-xs font-semibold transition-all cursor-pointer"
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
        <div className="p-4 rounded-none bg-card border border-border">
          <div className="font-mono-naut text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Exames Realizados</div>
          <div className="font-mono-naut text-2xl sm:text-3xl font-bold text-primary mt-1">{totalExams}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{passedCount} Aprovados</div>
        </div>

        <div className="p-4 rounded-none bg-card border border-border">
          <div className="font-mono-naut text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Taxa de Aprovação</div>
          <div className={`font-mono-naut text-2xl sm:text-3xl font-bold mt-1 ${passRate >= 70 ? 'text-[#1e7d4f]' : 'text-[#9a7413]'}`}>
            {passRate}%
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Mínimo 12.0 val</div>
        </div>

        <div className="p-4 rounded-none bg-card border border-border">
          <div className="font-mono-naut text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Média Global</div>
          <div className="font-mono-naut text-2xl sm:text-3xl font-bold text-[#9a7413] mt-1">
            {averageScore} <span className="text-xs text-muted-foreground font-normal">/ 20</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Em {totalExams} tentativas</div>
        </div>

        <div className="p-4 rounded-none bg-card border border-border">
          <div className="font-mono-naut text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Critérios Eliminatórios</div>
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1 font-mono-naut text-[11px] font-semibold px-2 py-0.5 rounded-none bg-[#dce8ef] text-primary border border-primary/30">
              <CategoryIcon category="R.I.E.A.M." className="w-3 h-3 shrink-0" />
              <span>RIEAM: {rieamPassRate}%</span>
            </span>
            <span className="inline-flex items-center gap-1 font-mono-naut text-[11px] font-semibold px-2 py-0.5 rounded-none bg-[#f3ded9] text-[#b3402f] border border-[#b3402f]/30">
              <CategoryIcon category="Segurança e Primeiros Socorros" className="w-3 h-3 shrink-0" />
              <span>Seg: {safetyPassRate}%</span>
            </span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">Mínimos 75% e 60%</div>
        </div>
      </div>

      {/* 2. Diagnóstico: Tópicos com Mais Dificuldades */}
      <div className="rounded-none border border-border bg-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-none bg-[#f3ded9] border border-[#b3402f]/40 flex items-center justify-center text-[#b3402f]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-maritime text-base sm:text-lg font-bold text-primary">
                Tópicos com Mais Dificuldades (Diagnóstico de Erros)
              </h3>
              <p className="text-xs text-muted-foreground">
                Identificados a partir das perguntas falhadas nos seus testes para orientar o seu estudo
              </p>
            </div>
          </div>
          <span className="font-mono-naut text-[11px] font-semibold text-[#9a7413] bg-muted border border-border px-3 py-1 rounded-none">
            {weakTopics.length} Matérias com Erros
          </span>
        </div>

        {weakTopics.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#1e7d4f] bg-[#dcebe1]/60 rounded-none border border-[#1e7d4f]/40">
            Parabéns! Não tem tópicos críticos registados com falhas recorrentes.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {weakTopics.slice(0, 6).map((topic, idx) => {
              const catStyle = getCategoryStyle(topic.category);
              return (
                <div
                  key={`${topic.category}-${topic.subcategory}-${idx}`}
                  className="p-4 rounded-none bg-muted border border-border flex flex-col justify-between hover:border-primary transition-all space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 font-mono-naut text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-none border"
                        style={{
                          backgroundColor: catStyle.soft,
                          color: catStyle.solid,
                          borderColor: `${catStyle.solid}40`,
                        }}
                      >
                        <CategoryIcon category={topic.category} className="w-3 h-3 shrink-0" />
                        <span>{topic.category}</span>
                      </span>
                      <span className="font-mono-naut text-[11px] font-semibold text-[#b3402f] bg-[#f3ded9] px-2 py-0.5 rounded-none border border-[#b3402f]/40">
                        {topic.failedCount} {topic.failedCount === 1 ? 'erro' : 'erros'}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-primary mt-2">
                      {topic.subcategory}
                    </h4>

                    {topic.sampleStatements && topic.sampleStatements.length > 0 && (
                      <div className="mt-2 text-[11px] text-muted-foreground bg-secondary/70 p-2.5 rounded-none border border-border line-clamp-2">
                        <span className="font-semibold text-primary">Exemplo falhado: </span>
                        {topic.sampleStatements[0]}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartPracticeTopic(topic.category)}
                    className="w-full py-2 px-3 rounded-none bg-card hover:bg-primary text-primary hover:text-[#fbf9f0] border border-border hover:border-primary font-mono-naut uppercase tracking-wider text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all group cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#9a7413] group-hover:text-[#ca9e1c]" />
                    Praticar esta Matéria
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Histórico de Exames Realizados */}
      <div className="rounded-none border border-border bg-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-none bg-secondary border border-border flex items-center justify-center text-primary">
              <Calendar className="w-5 h-5 text-[#9a7413]" />
            </div>
            <div>
              <h3 className="font-maritime text-base sm:text-lg font-bold text-primary">
                Histórico de Tentativas Realizadas
              </h3>
              <p className="text-xs text-muted-foreground">
                Registo contínuo de pontuações, tempo e critérios eliminatórios
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="p-4 rounded-none bg-muted border border-border flex flex-wrap items-center justify-between gap-3 hover:border-primary transition-all"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-primary">
                    {attempt.testTitle}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-mono-naut text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-none border ${
                      attempt.isPassed
                        ? 'bg-[#dcebe1] text-[#1e7d4f] border-[#1e7d4f]/40'
                        : 'bg-[#f3ded9] text-[#b3402f] border-[#b3402f]/40'
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

                <div className="flex flex-wrap items-center gap-3 font-mono-naut text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(attempt.completedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDuration(attempt.timeSpentSeconds)}
                  </span>
                  {attempt.failedQuestions && (
                    <span className="text-[#b3402f] font-medium">
                      {attempt.failedQuestions.length} questões com erro
                    </span>
                  )}
                </div>

                {attempt.failReasons && attempt.failReasons.length > 0 && (
                  <div className="text-[11px] text-[#b3402f] pt-0.5">
                    Motivo: {attempt.failReasons.join(' | ')}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-mono-naut text-lg sm:text-xl font-bold text-primary">
                    {attempt.totalScore.toFixed(1)}{' '}
                    <span className="text-xs text-muted-foreground font-normal">/ 20.0</span>
                  </div>
                  <div className="font-mono-naut text-[11px] font-semibold text-muted-foreground">
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
