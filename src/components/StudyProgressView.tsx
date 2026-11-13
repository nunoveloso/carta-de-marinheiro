import React, { useState, useEffect, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';
import {
  Compass,
  Award,
  BookOpen,
  Edit3,
  Star,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Target,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';
import { NauticalTerm, MainCategory, getCategoryStyle } from '../types/glossary';
import { ExamAttempt } from '../types/tests';
import { getAllExamAttempts } from '../services/examAttemptsService';
import { CategoryIcon } from './CategoryIcon';

interface StudyProgressViewProps {
  terms: NauticalTerm[];
  userNotes: Record<string, string>;
  bookmarkedIds: Set<string>;
  onSelectTerm?: (term: NauticalTerm) => void;
  onNavigateToTab?: (tab: 'glossario' | 'flashcards' | 'quiz' | 'guia') => void;
}

// 4 official syllabus categories
const SYLLABUS_CATEGORIES: {
  id: MainCategory;
  shortName: string;
  minPassingPercent: number;
  officialPoints: number;
  color: string;
  subcategories: string[];
}[] = [
  {
    id: 'R.I.E.A.M.',
    shortName: 'R.I.E.A.M.',
    minPassingPercent: 75, // DGRM mandate: 75% (4.5 / 6.0 val)
    officialPoints: 6.0,
    color: '#0b3a55',
    subcategories: ['Sinais Sonoros', 'Balões', 'Abalroamentos'],
  },
  {
    id: 'Segurança e Primeiros Socorros',
    shortName: 'Segurança & 1º Socorros',
    minPassingPercent: 60, // DGRM mandate: 60% (2.4 / 4.0 val)
    officialPoints: 4.0,
    color: '#b3402f',
    subcategories: ['Incêndios', 'Segurança', 'Primeiros Socorros'],
  },
  {
    id: 'Marinharia',
    shortName: 'Marinharia',
    minPassingPercent: 60,
    officialPoints: 6.0,
    color: '#1e7d4f',
    subcategories: ['Cabos, Voltas e Nós', 'Âncoras e Amarras', 'Nomenclatura', 'Manobras'],
  },
  {
    id: 'Outras Matérias',
    shortName: 'Outras Matérias',
    minPassingPercent: 60,
    officialPoints: 4.0,
    color: '#9a7413',
    subcategories: ['Marés', 'Balizagem', 'Meteorologia', 'Motores', 'Legislação', 'Navegação', 'Siglas'],
  },
];

export const StudyProgressView: React.FC<StudyProgressViewProps> = ({
  terms,
  userNotes,
  bookmarkedIds,
  onSelectTerm,
  onNavigateToTab,
}) => {
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [isLoadingAttempts, setIsLoadingAttempts] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [notesSearch, setNotesSearch] = useState('');

  // Load exam attempts from storage
  useEffect(() => {
    let isMounted = true;
    getAllExamAttempts()
      .then((attempts) => {
        if (isMounted) {
          setExamAttempts(attempts);
          setIsLoadingAttempts(false);
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar exames para progresso de estudo:', err);
        if (isMounted) setIsLoadingAttempts(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute stats per category and subcategory
  const progressStats = useMemo(() => {
    // 1. Group terms by category and subcategory
    const categoryTermsMap: Record<string, NauticalTerm[]> = {};
    const subcategoryTermsMap: Record<string, NauticalTerm[]> = {};

    for (const cat of SYLLABUS_CATEGORIES) {
      categoryTermsMap[cat.id] = [];
      for (const sub of cat.subcategories) {
        subcategoryTermsMap[sub] = [];
      }
    }

    for (const term of terms) {
      const cat = term.category as MainCategory;
      const sub = term.subCategory || term.subcategory || '';
      if (categoryTermsMap[cat]) {
        categoryTermsMap[cat].push(term);
      }
      if (sub && subcategoryTermsMap[sub]) {
        subcategoryTermsMap[sub].push(term);
      }
    }

    // 2. Aggregate exam answers by category and subcategory
    const categoryExamStats: Record<string, { correct: number; total: number; pointsEarned: number; pointsPossible: number }> = {};
    const subcategoryExamStats: Record<string, { correct: number; total: number }> = {};

    for (const cat of SYLLABUS_CATEGORIES) {
      categoryExamStats[cat.id] = { correct: 0, total: 0, pointsEarned: 0, pointsPossible: 0 };
      for (const sub of cat.subcategories) {
        subcategoryExamStats[sub] = { correct: 0, total: 0 };
      }
    }

    for (const attempt of examAttempts) {
      if (attempt.categoryBreakdown) {
        for (const [catName, brk] of Object.entries(attempt.categoryBreakdown)) {
          // Normalize 'RIEAM' vs 'R.I.E.A.M.'
          const normalizedCat = catName.replace(/\./g, '') === 'RIEAM' ? 'R.I.E.A.M.' : catName;
          if (categoryExamStats[normalizedCat]) {
            categoryExamStats[normalizedCat].total += brk.total || 1;
            categoryExamStats[normalizedCat].correct += brk.earned || 0;
            categoryExamStats[normalizedCat].pointsPossible += brk.total || 1;
            categoryExamStats[normalizedCat].pointsEarned += brk.earned || 0;
          }
        }
      }

      if (attempt.failedQuestions && Array.isArray(attempt.failedQuestions)) {
        for (const f of attempt.failedQuestions) {
          const sub = f.subcategory || '';
          if (sub && subcategoryExamStats[sub]) {
            subcategoryExamStats[sub].total += 1;
          }
        }
      }
    }

    // 3. Aggregate notes and bookmarks
    const categoryNotesStats: Record<string, { notesCount: number; bookmarksCount: number }> = {};
    const subcategoryNotesStats: Record<string, { notesCount: number; bookmarksCount: number }> = {};

    for (const cat of SYLLABUS_CATEGORIES) {
      categoryNotesStats[cat.id] = { notesCount: 0, bookmarksCount: 0 };
      for (const sub of cat.subcategories) {
        subcategoryNotesStats[sub] = { notesCount: 0, bookmarksCount: 0 };
      }
    }

    for (const term of terms) {
      const cat = term.category as MainCategory;
      const sub = term.subCategory || term.subcategory || '';
      const hasNote = Boolean(userNotes[term.id]);
      const isBookmarked = bookmarkedIds.has(term.id);

      if (categoryNotesStats[cat]) {
        if (hasNote) categoryNotesStats[cat].notesCount += 1;
        if (isBookmarked) categoryNotesStats[cat].bookmarksCount += 1;
      }

      if (sub && subcategoryNotesStats[sub]) {
        if (hasNote) subcategoryNotesStats[sub].notesCount += 1;
        if (isBookmarked) subcategoryNotesStats[sub].bookmarksCount += 1;
      }
    }

    // 4. Build Radar data and Bar data for Recharts
    const radarData = SYLLABUS_CATEGORIES.map((cat) => {
      const catTerms = categoryTermsMap[cat.id] || [];
      const totalTerms = catTerms.length || 1;
      const examStat = categoryExamStats[cat.id];
      const notesStat = categoryNotesStats[cat.id];

      // Accuracy % (default to 0 if no exams taken yet)
      const examAccuracy = examStat.total > 0
        ? Math.round((examStat.correct / examStat.total) * 100)
        : 0;

      // Notes coverage %
      const notesCoverage = Math.round((notesStat.notesCount / totalTerms) * 100);

      // Bookmarks coverage %
      const bookmarksCoverage = Math.round((notesStat.bookmarksCount / totalTerms) * 100);

      // Overall readiness for this category (60% exam + 40% notes/study)
      const categoryReadiness = examStat.total > 0
        ? Math.round(examAccuracy * 0.65 + notesCoverage * 0.35)
        : Math.round(notesCoverage * 0.6 + bookmarksCoverage * 0.4);

      return {
        subject: cat.shortName,
        fullName: cat.id,
        examAccuracy,
        notesCoverage,
        bookmarksCoverage,
        categoryReadiness,
        minPassing: cat.minPassingPercent,
        totalQuestions: examStat.total,
        totalTerms,
        notesCount: notesStat.notesCount,
        bookmarksCount: notesStat.bookmarksCount,
      };
    });

    // 5. Global Readiness Score
    const hasExams = examAttempts.length > 0;
    const avgExamAccuracy = hasExams
      ? Math.round(
          radarData.reduce((acc, curr) => acc + curr.examAccuracy, 0) / radarData.length
        )
      : 0;

    const totalNotesCount = Object.keys(userNotes).length;
    const totalBookmarkedCount = bookmarkedIds.size;
    const globalNotesCoverage = Math.round((totalNotesCount / (terms.length || 1)) * 100);

    const overallReadinessScore = hasExams
      ? Math.round(avgExamAccuracy * 0.6 + Math.min(100, globalNotesCoverage * 3) * 0.4)
      : Math.min(100, Math.round(globalNotesCoverage * 2.5 + totalBookmarkedCount * 1.5));

    // Check DGRM minimum compliance
    const rieamStat = radarData.find((r) => r.fullName === 'R.I.E.A.M.');
    const segStat = radarData.find((r) => r.fullName === 'Segurança e Primeiros Socorros');
    const isRieamPassing = rieamStat ? rieamStat.examAccuracy >= 75 : false;
    const isSegPassing = segStat ? segStat.examAccuracy >= 60 : false;
    const isGlobalPassing = avgExamAccuracy >= 60;
    const isFullyPrepared = hasExams && isRieamPassing && isSegPassing && isGlobalPassing;

    return {
      categoryTermsMap,
      subcategoryTermsMap,
      categoryExamStats,
      subcategoryExamStats,
      categoryNotesStats,
      subcategoryNotesStats,
      radarData,
      overallReadinessScore,
      hasExams,
      avgExamAccuracy,
      totalNotesCount,
      totalBookmarkedCount,
      isFullyPrepared,
      isRieamPassing,
      isSegPassing,
    };
  }, [terms, userNotes, bookmarkedIds, examAttempts]);

  // Filtered notes list for the explorer section
  const annotatedTerms = useMemo(() => {
    return terms
      .filter((t) => Boolean(userNotes[t.id]))
      .filter((t) => {
        if (selectedCategoryFilter !== 'all' && t.category !== selectedCategoryFilter) {
          return false;
        }
        const normalizeStr = (s: string) =>
          s
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '');
        const q = normalizeStr(notesSearch);
        if (q) {
          const noteText = normalizeStr(userNotes[t.id] || '');
          return (
            normalizeStr(t.term).includes(q) ||
            Boolean(t.synonyms?.some((s) => normalizeStr(s).includes(q))) ||
            noteText.includes(q)
          );
        }
        return true;
      });
  }, [terms, userNotes, selectedCategoryFilter, notesSearch]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-xs border border-[#d7d0c1] bg-[#ede9de]/45 p-6 sm:p-8 mb-8 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-[#4f6e82] mb-2.5">
              <Compass className="w-4 h-4 text-[#9a7413]" />
              <span>Painel de Desempenho & Cobertura</span>
              <span aria-hidden="true" className="text-[#d7d0c1]">·</span>
              <span>DGRM / Manual do Marinheiro</span>
            </div>

            <h2 className="font-maritime text-3xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight leading-tight">
              Progresso de Estudo
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-[#4f6e82] leading-relaxed">
              Visualização analítica da sua preparação para o exame oficial de Carta de Marinheiro, integrando o aproveitamento nos testes, o volume de notas redigidas e os termos náuticos consolidados.
            </p>
          </div>

          {/* Overall Readiness Box */}
          <div className="shrink-0 flex items-center gap-4 bg-[#fcfbf8] border border-[#d7d0c1] rounded-xs p-4 sm:p-5">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#ede9de]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={
                    progressStats.overallReadinessScore >= 75
                      ? 'text-[#1e7d4f]'
                      : progressStats.overallReadinessScore >= 50
                      ? 'text-[#9a7413]'
                      : 'text-[#0b3a55]'
                  }
                  strokeDasharray={`${progressStats.overallReadinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="square"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-mono-naut text-lg sm:text-xl font-bold text-[#0b3a55]">
                  {progressStats.overallReadinessScore}%
                </span>
                <span className="font-mono-naut text-[9px] uppercase font-semibold text-[#4f6e82] tracking-wider">
                  Prontidão
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-mono-naut text-[10px] uppercase tracking-wider font-medium text-[#4f6e82]">Estado Geral:</span>
              <span className="text-sm sm:text-base font-bold text-[#0b3a55] font-maritime">
                {progressStats.isFullyPrepared
                  ? 'Apto para Exame DGRM'
                  : progressStats.overallReadinessScore >= 50
                  ? 'Em Bom Progresso'
                  : 'Fase Inicial de Estudo'}
              </span>
              <span className="font-mono-naut text-[11px] text-[#4f6e82] mt-0.5">
                {examAttempts.length} exame(s) · {progressStats.totalNotesCount} apontamento(s)
              </span>
            </div>
          </div>
        </div>

        {/* Quick KPI stats row */}
        <div className="mt-6 pt-6 border-t border-[#d7d0c1] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#fcfbf8] rounded-xs p-3.5 border border-[#d7d0c1]">
            <div className="font-mono-naut text-[10px] uppercase tracking-wider font-medium text-[#4f6e82] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#0b3a55]" />
              <span>Acurácia nos Testes</span>
            </div>
            <div className="font-mono-naut text-xl font-bold text-[#0b3a55] mt-1">
              {progressStats.hasExams ? `${progressStats.avgExamAccuracy}%` : 'Sem testes'}
            </div>
            <div className="text-[11px] text-[#4f6e82] mt-0.5">
              {progressStats.hasExams ? 'Média ponderada oficial' : 'Faça um simulador para medir'}
            </div>
          </div>

          <div className="bg-[#fcfbf8] rounded-xs p-3.5 border border-[#d7d0c1]">
            <div className="font-mono-naut text-[10px] uppercase tracking-wider font-medium text-[#4f6e82] flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-[#9a7413]" />
              <span>Notas e Apontamentos</span>
            </div>
            <div className="font-mono-naut text-xl font-bold text-[#0b3a55] mt-1">
              {progressStats.totalNotesCount}
            </div>
            <div className="text-[11px] text-[#4f6e82] mt-0.5">
              Termos anotados no caderno
            </div>
          </div>

          <div className="bg-[#fcfbf8] rounded-xs p-3.5 border border-[#d7d0c1]">
            <div className="font-mono-naut text-[10px] uppercase tracking-wider font-medium text-[#4f6e82] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#ca9e1c]" />
              <span>Termos Favoritados</span>
            </div>
            <div className="font-mono-naut text-xl font-bold text-[#0b3a55] mt-1">
              {progressStats.totalBookmarkedCount}
            </div>
            <div className="text-[11px] text-[#4f6e82] mt-0.5">
              Sinalizados para revisão rápida
            </div>
          </div>

          <div className="bg-[#fcfbf8] rounded-xs p-3.5 border border-[#d7d0c1]">
            <div className="font-mono-naut text-[10px] uppercase tracking-wider font-medium text-[#4f6e82] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#1e7d4f]" />
              <span>Universo do Programa</span>
            </div>
            <div className="font-mono-naut text-xl font-bold text-[#0b3a55] mt-1">
              {terms.length}
            </div>
            <div className="text-[11px] text-[#4f6e82] mt-0.5">
              Conceitos e termos oficiais
            </div>
          </div>
        </div>
      </div>

      {/* 2. Charts Section: Radar 360° + Bar Chart Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Radar Chart: 360° Syllabus Coverage */}
        <div className="lg:col-span-6 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-maritime text-xl font-bold text-[#0b3a55]">
                Cobertura Global 360° do Programa
              </h3>
              <span className="font-mono-naut text-[10px] uppercase tracking-wider font-semibold text-[#0b3a55] bg-[#dce8ef] px-2.5 py-0.5 rounded-xs border border-[#0b3a55]/30">
                Radar 360°
              </span>
            </div>
            <p className="text-xs text-[#4f6e82] leading-relaxed mb-4">
              Comparação multidimensional das 4 matérias-chave da DGRM: acerto em simuladores, índice de anotações no caderno e termos favoritados.
            </p>
          </div>

          <div className="w-full h-[320px] sm:h-[360px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={progressStats.radarData}>
                <PolarGrid stroke="#d7d0c1" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#0b3a55', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4f6e82" fontSize={10} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xs border border-[#0b3a55] bg-[#fcfbf8] p-3 text-xs shadow-[3px_3px_0_0_#0b3a55]">
                          <p className="font-maritime font-bold text-[#0b3a55] mb-1">{data.fullName}</p>
                          <p className="text-[#0b3a55]">
                            Acerto em Testes: <strong>{data.examAccuracy}%</strong>
                          </p>
                          <p className="text-[#9a7413]">
                            Termos c/ Notas: <strong>{data.notesCoverage}%</strong> ({data.notesCount} termos)
                          </p>
                          <p className="text-[#1e7d4f]">
                            Favoritos: <strong>{data.bookmarksCoverage}%</strong> ({data.bookmarksCount} termos)
                          </p>
                          <p className="font-mono-naut text-[#4f6e82] mt-1 pt-1 border-t border-[#d7d0c1] text-[10px]">
                            Mínimo DGRM: <strong>{data.minPassing}%</strong>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Radar
                  name="Acerto nos Testes (%)"
                  dataKey="examAccuracy"
                  stroke="#0b3a55"
                  fill="#0b3a55"
                  fillOpacity={0.35}
                />
                <Radar
                  name="Termos c/ Notas (%)"
                  dataKey="notesCoverage"
                  stroke="#ca9e1c"
                  fill="#ca9e1c"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Termos Favoritos (%)"
                  dataKey="bookmarksCoverage"
                  stroke="#1e7d4f"
                  fill="#1e7d4f"
                  fillOpacity={0.22}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="square"
                  wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-[#4f6e82] mt-2 pt-3 border-t border-[#d7d0c1] flex items-center justify-between">
            <span>Dica: Matérias equilibradas aumentam a probabilidade de aprovação à 1ª tentativa.</span>
          </div>
        </div>

        {/* Bar Chart: Category Mastery vs. DGRM Passing Threshold */}
        <div className="lg:col-span-6 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-maritime text-xl font-bold text-[#0b3a55]">
                Aproveitamento vs. Mínimo DGRM
              </h3>
              <span className="font-mono-naut text-[10px] uppercase tracking-wider font-semibold text-[#b3402f] bg-[#f3ded9] px-2.5 py-0.5 rounded-xs border border-[#b3402f]/30">
                Requisitos Oficiais
              </span>
            </div>
            <p className="text-xs text-[#4f6e82] leading-relaxed mb-4">
              Cada barra compara a sua percentagem de acerto atual com o limiar eliminatório exigido por lei (75% em R.I.E.A.M. e 60% em Segurança).
            </p>
          </div>

          <div className="w-full h-[320px] sm:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={progressStats.radarData}
                margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7d0c1" />
                <XAxis
                  dataKey="subject"
                  tick={{ fill: '#0b3a55', fontSize: 11, fontWeight: 600 }}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#4f6e82', fontSize: 10 }}
                  unit="%"
                />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val}%`, name]}
                  contentStyle={{
                    backgroundColor: '#fcfbf8',
                    borderColor: '#0b3a55',
                    borderRadius: '2px',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
                />
                <Bar
                  name="Aproveitamento Atual"
                  dataKey="examAccuracy"
                  radius={[2, 2, 0, 0]}
                  barSize={28}
                >
                  {progressStats.radarData.map((entry, index) => {
                    const isPassing = entry.examAccuracy >= entry.minPassing;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.examAccuracy === 0 ? '#d7d0c1' : isPassing ? '#1e7d4f' : '#b3402f'}
                      />
                    );
                  })}
                </Bar>
                <Bar
                  name="Mínimo DGRM Obrigatório"
                  dataKey="minPassing"
                  fill="#4f6e82"
                  radius={[2, 2, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono-naut text-[11px] text-[#4f6e82] mt-2 pt-3 border-t border-[#d7d0c1]">
            <span className="flex items-center gap-1.5 text-[#1e7d4f] font-medium">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#1e7d4f]"></span> Acima do Limiar
            </span>
            <span className="flex items-center gap-1.5 text-[#b3402f] font-medium">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#b3402f]"></span> Abaixo do Limiar
            </span>
            <span className="flex items-center gap-1.5 text-[#4f6e82]">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#4f6e82]"></span> Mínimo Obrigatório
            </span>
          </div>
        </div>
      </div>

      {/* 3. Detailed Matrix: 17 Subcategories Breakdown */}
      <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-maritime text-2xl font-bold text-[#0b3a55]">
              Desagregação por Subcategorias do Programa
            </h3>
            <p className="text-xs text-[#4f6e82] mt-1">
              Acompanhamento minucioso de cada ramo temático avaliado no exame oficial e coberto pelo manual.
            </p>
          </div>

          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('quiz')}
              className="inline-flex items-center gap-1.5 rounded-xs bg-[#0b3a55] px-4 py-2 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition self-start sm:self-auto whitespace-nowrap shrink-0"
            >
              <span>Fazer Simulador Oficial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SYLLABUS_CATEGORIES.map((cat) => {
            return (
              <div
                key={cat.id}
                className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#d7d0c1]">
                    <div className="flex items-center gap-2">
                      <CategoryIcon
                        category={cat.id}
                        className="w-4 h-4 shrink-0"
                        style={{ color: cat.color }}
                      />
                      <span className="font-maritime text-base font-bold text-[#0b3a55]">
                        {cat.shortName}
                      </span>
                    </div>
                    <span className="font-mono-naut text-[10px] font-semibold px-2 py-0.5 rounded-xs bg-[#fcfbf8] border border-[#d7d0c1] text-[#4f6e82]">
                      Min. {cat.minPassingPercent}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    {cat.subcategories.map((sub) => {
                      const examStat = progressStats.subcategoryExamStats[sub] || { correct: 0, total: 0 };
                      const notesStat = progressStats.subcategoryNotesStats[sub] || { notesCount: 0, bookmarksCount: 0 };
                      const totalTerms = (progressStats.subcategoryTermsMap[sub] || []).length;
                      const accuracy = examStat.total > 0
                        ? Math.round((examStat.correct / examStat.total) * 100)
                        : null;

                      return (
                        <div key={sub} className="bg-[#fcfbf8] rounded-xs p-3 border border-[#d7d0c1]">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-semibold text-[#0b3a55] truncate max-w-[150px]" title={sub}>
                              {sub}
                            </span>
                            <span className="font-mono-naut font-semibold text-[11px] text-[#4f6e82]">
                              {accuracy !== null ? `${accuracy}%` : 'Sem testes'}
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-[#ede9de] h-1.5 rounded-xs overflow-hidden mb-2">
                            <div
                              className={`h-full rounded-xs transition-all duration-500 ${
                                accuracy === null
                                  ? 'bg-[#d7d0c1]'
                                  : accuracy >= 75
                                  ? 'bg-[#1e7d4f]'
                                  : accuracy >= 60
                                  ? 'bg-[#ca9e1c]'
                                  : 'bg-[#b3402f]'
                              }`}
                              style={{ width: `${accuracy !== null ? accuracy : 0}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between font-mono-naut text-[10px] text-[#4f6e82]">
                            <span className="flex items-center gap-1">
                              <Edit3 className="w-3 h-3 text-[#9a7413]" />
                              {notesStat.notesCount} / {totalTerms} termos
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-[#ca9e1c]" />
                              {notesStat.bookmarksCount} favs
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Notes & Annotations Explorer */}
      <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#d7d0c1]">
          <div>
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#9a7413]" />
              <h3 className="font-maritime text-2xl font-bold text-[#0b3a55]">
                Caderno de Apontamentos Pessoais
              </h3>
            </div>
            <p className="text-xs text-[#4f6e82] mt-1">
              Todos os termos do glossário anotados por si ({annotatedTerms.length} de {progressStats.totalNotesCount}), organizados pelas matérias do exame.
            </p>
          </div>

          {/* Category Filter Buttons for Notes */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium border whitespace-nowrap shrink-0 transition ${
                selectedCategoryFilter === 'all'
                  ? 'bg-[#0b3a55] text-[#faf7f0] border-[#0b3a55]'
                  : 'border-[#d7d0c1] bg-[#faf7f0] text-[#4f6e82] hover:border-[#0b3a55] hover:text-[#0b3a55]'
              }`}
            >
              Todas ({progressStats.totalNotesCount})
            </button>
            {SYLLABUS_CATEGORIES.map((c) => {
              const isSelected = selectedCategoryFilter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategoryFilter(c.id)}
                  style={
                    isSelected
                      ? { backgroundColor: c.color, borderColor: c.color, color: '#faf7f0' }
                      : undefined
                  }
                  className={`inline-flex items-center gap-1.5 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-wider font-medium border whitespace-nowrap shrink-0 transition ${
                    isSelected
                      ? 'shadow-xs'
                      : 'border-[#d7d0c1] bg-[#faf7f0] text-[#4f6e82] hover:border-[#0b3a55] hover:text-[#0b3a55]'
                  }`}
                >
                  <CategoryIcon
                    category={c.id}
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: isSelected ? '#faf7f0' : c.color }}
                  />
                  <span>{c.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes Search bar */}
        <div className="mb-6 max-w-md">
          <input
            type="text"
            value={notesSearch}
            onChange={(e) => setNotesSearch(e.target.value)}
            placeholder="Filtrar notas por palavra-chave ou termo..."
            className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] px-3.5 py-2 text-xs text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:bg-[#fcfbf8] focus:outline-none"
          />
        </div>

        {/* List of Annotated Terms */}
        {annotatedTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {annotatedTerms.map((t) => {
              const noteContent = userNotes[t.id];
              const catStyle = getCategoryStyle(t.category);
              return (
                <div
                  key={t.id}
                  onClick={() => onSelectTerm && onSelectTerm(t)}
                  className="rounded-xs border border-[#d7d0c1] bg-[#faf7f0] p-4.5 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82] mb-1.5">
                      <span className="inline-flex items-center gap-1 font-semibold truncate max-w-[175px]" style={{ color: catStyle.solid }}>
                        <CategoryIcon category={t.category} className="w-3 h-3 shrink-0" />
                        <span className="truncate">{t.category}</span>
                      </span>
                      {t.subCategory && (
                        <span className="text-[#9a7413] bg-[#f0e8cf] px-2 py-0.5 rounded-xs border border-[#9a7413]/30 font-medium truncate">
                          {t.subCategory}
                        </span>
                      )}
                    </div>

                    <h4 className="font-maritime text-lg font-bold text-[#0b3a55] group-hover:underline transition">
                      {t.term}
                    </h4>

                    <div className="mt-2.5 rounded-xs bg-[#fcfbf8] p-3 border border-[#d7d0c1] text-xs text-[#0b3a55]/90 leading-relaxed">
                      <div className="flex items-center gap-1 font-mono-naut text-[10px] font-semibold text-[#9a7413] uppercase tracking-wider mb-1">
                        <Edit3 className="w-3 h-3" />
                        <span>A sua anotação:</span>
                      </div>
                      <p className="line-clamp-4 italic text-[#0b3a55]">
                        "{noteContent}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#d7d0c1] flex items-center justify-between font-mono-naut text-[11px] uppercase tracking-wider text-[#0b3a55] font-medium">
                    <span>Ver termo completo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#ede9de]/40 rounded-xs border border-dashed border-[#d7d0c1] p-8">
            <Edit3 className="w-10 h-10 text-[#9a7413] mx-auto mb-3 opacity-60" />
            <h4 className="font-maritime text-lg font-bold text-[#0b3a55]">
              {progressStats.totalNotesCount === 0
                ? 'Ainda não adicionou notas pessoais'
                : 'Nenhuma anotação encontrada para este filtro'}
            </h4>
            <p className="text-xs text-[#4f6e82] max-w-md mx-auto mt-1 mb-4 leading-relaxed">
              Ao consultar qualquer termo no Glossário, pode clicar no botão <strong>«Adicionar Apontamento»</strong> para registar fórmulas, mnemónicas ou dicas para o exame oficial.
            </p>
            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('glossario')}
                className="inline-flex items-center gap-2 rounded-xs bg-[#0b3a55] px-4 py-2 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Glossário e Fazer Apontamentos</span>
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
