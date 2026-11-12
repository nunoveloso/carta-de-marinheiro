export type QuestionType = 'multiple-choice' | 'fill-blank' | 'open-answer';

export type MainCategory = 
  | 'RIEAM'
  | 'Segurança e Primeiros Socorros'
  | 'Marinharia'
  | 'Outras Matérias';

export type SubCategory = string;

export interface DiagramConfig {
  type: 
    | 'vessel-crossing' 
    | 'day-shapes' 
    | 'anchor-parts' 
    | 'knots' 
    | 'buoy' 
    | 'mooring' 
    | 'boat-regions';
  title?: string;
  variant?: string;
  labels?: Record<string, string>;
  details?: Record<string, any>;
}

export interface TestQuestion {
  id: string;
  testNumber: number;
  questionNumber: number;
  sourceTests: number[];
  category: MainCategory;
  subcategory: SubCategory;
  type: QuestionType;
  points: number;
  statement: string;
  options?: string[];
  correctOptionIndex?: number;
  expectedAnswer: string;
  expectedBlanks?: string[];
  acceptedKeywords?: string[];
  acceptedKeywordsPerBlank?: string[][];
  explanation: string;
  diagram?: DiagramConfig;
}

export interface UserAnswer {
  questionId: string;
  selectedOption?: number;
  textAnswer?: string;
  blankAnswers?: string[];
  selfEvaluatedCorrect?: boolean;
}

export interface ExamAttempt {
  id: string;
  userId?: string;
  userEmail?: string;
  testNumber?: number;
  testTitle: string;
  mode: 'exam' | 'practice';
  startedAt: string;
  completedAt: string;
  timeSpentSeconds: number;
  totalScore: number; // 0 to 20
  totalPossiblePoints: number;
  percentage: number;
  isPassed: boolean;
  rieamPassed: boolean;
  safetyPassed: boolean;
  globalPassed: boolean;
  failReasons: string[];
  categoryBreakdown: Record<MainCategory, {
    earned: number;
    total: number;
    percentage: number;
    isPassed: boolean;
  }>;
  failedQuestions: {
    questionId: string;
    questionNumber: number;
    statement: string;
    category: MainCategory;
    subcategory: string;
    userAnswer?: string;
    expectedAnswer: string;
    explanation?: string;
  }[];
  answers: Record<string, UserAnswer>;
}

export interface WeakTopicAnalysis {
  subcategory: string;
  category: MainCategory;
  totalEncountered: number;
  failedCount: number;
  failureRate: number; // 0 to 100
  sampleStatements: string[];
}

export interface ExamSession {
  id: string;
  mode: 'official-exam' | 'topic-practice';
  selectedCategory?: MainCategory;
  selectedSubcategory?: SubCategory;
  questions: TestQuestion[];
  answers: Record<string, UserAnswer>;
  startTime: number;
  durationSeconds: number;
  completed: boolean;
  score?: number;
  categoryScores?: Record<MainCategory, { earned: number; total: number; percentage: number }>;
  passed?: boolean;
  failReasons?: string[];
}
