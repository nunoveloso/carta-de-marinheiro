export type TermImportance = 'essencial' | 'importante' | 'complementar';

export type TermCategory =
  | 'nomenclatura-geral'
  | 'seguranca-salvamento'
  | 'navegacao-agulhas'
  | 'regras-ripam'
  | 'balizamento-iala'
  | 'amarras-fundear'
  | 'comunicacoes-vhf'
  | 'manobras-propulsao'
  | 'meteorologia-mares';

export interface CategoryMeta {
  id: TermCategory;
  name: string;
  description: string;
  iconName: string;
  color: string;
}

export interface NauticalTerm {
  id: string;
  term: string;
  category: TermCategory;
  section: string;
  subsection?: string;
  page?: number;
  definition: string;
  example?: string;
  examTip?: string;
  importance: TermImportance;
  synonyms?: string[];
  relatedTerms?: string[];
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserBookmark {
  termId: string;
  userId: string;
  createdAt?: string;
}

export interface UserNote {
  termId: string;
  userId: string;
  note: string;
  updatedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: TermCategory;
}
