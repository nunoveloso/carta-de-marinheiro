export type TermImportance = 'essencial' | 'importante' | 'complementar';

export type MainCategory =
  | 'R.I.E.A.M.'
  | 'Segurança e Primeiros Socorros'
  | 'Marinharia'
  | 'Outras Matérias';

export type SubCategory =
  // R.I.E.A.M.
  | 'Sinais Sonoros'
  | 'Balões'
  | 'Abalroamentos'
  // Segurança e Primeiros Socorros
  | 'Incêndios'
  | 'Segurança'
  | 'Primeiros Socorros'
  // Marinharia
  | 'Cabos, Voltas e Nós'
  | 'Âncoras e Amarras'
  | 'Nomenclatura'
  | 'Manobras'
  // Outras Matérias
  | 'Marés'
  | 'Balizagem'
  | 'Meteorologia'
  | 'Motores'
  | 'Legislação'
  | 'Navegação'
  | 'Siglas';

export const TAXONOMY_TREE: Record<MainCategory, SubCategory[]> = {
  'R.I.E.A.M.': ['Sinais Sonoros', 'Balões', 'Abalroamentos'],
  'Segurança e Primeiros Socorros': ['Incêndios', 'Segurança', 'Primeiros Socorros'],
  'Marinharia': ['Cabos, Voltas e Nós', 'Âncoras e Amarras', 'Nomenclatura', 'Manobras'],
  'Outras Matérias': ['Marés', 'Balizagem', 'Meteorologia', 'Motores', 'Legislação', 'Navegação', 'Siglas'],
};

export const ALL_SUB_CATEGORIES: SubCategory[] = [
  'Sinais Sonoros',
  'Balões',
  'Abalroamentos',
  'Incêndios',
  'Segurança',
  'Primeiros Socorros',
  'Cabos, Voltas e Nós',
  'Âncoras e Amarras',
  'Nomenclatura',
  'Manobras',
  'Marés',
  'Balizagem',
  'Meteorologia',
  'Motores',
  'Legislação',
  'Navegação',
  'Siglas',
];

export function getMainCategoryForSubCategory(sub: SubCategory): MainCategory {
  for (const [main, subs] of Object.entries(TAXONOMY_TREE)) {
    if ((subs as SubCategory[]).includes(sub)) {
      return main as MainCategory;
    }
  }
  return 'Outras Matérias';
}

export type TermCategory = MainCategory | string;

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
  subCategory?: SubCategory;
  subcategory?: SubCategory;
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
