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

export interface CategoryColorStyle {
  solid: string;
  soft: string;
  border: string;
  badgeClass: string;
  accentTextClass: string;
  dotColor: string;
}

export function getCategoryStyle(category: string): CategoryColorStyle {
  const normalized = category.replace(/\./g, '').toLowerCase();
  if (normalized === 'rieam') {
    return {
      solid: '#0b3a55',
      soft: '#dce8ef',
      border: '#0b3a55',
      badgeClass: 'bg-[#dce8ef] text-[#0b3a55] border-[#0b3a55]/30',
      accentTextClass: 'text-[#0b3a55]',
      dotColor: '#0b3a55',
    };
  }
  if (normalized.includes('seguranca') || normalized.includes('segurança')) {
    return {
      solid: '#b3402f',
      soft: '#f3ded9',
      border: '#b3402f',
      badgeClass: 'bg-[#f3ded9] text-[#b3402f] border-[#b3402f]/30',
      accentTextClass: 'text-[#b3402f]',
      dotColor: '#b3402f',
    };
  }
  if (normalized.includes('marinharia')) {
    return {
      solid: '#1e7d4f',
      soft: '#dcebe1',
      border: '#1e7d4f',
      badgeClass: 'bg-[#dcebe1] text-[#1e7d4f] border-[#1e7d4f]/30',
      accentTextClass: 'text-[#1e7d4f]',
      dotColor: '#1e7d4f',
    };
  }
  return {
    solid: '#9a7413',
    soft: '#f0e8cf',
    border: '#9a7413',
    badgeClass: 'bg-[#f0e8cf] text-[#9a7413] border-[#9a7413]/30',
    accentTextClass: 'text-[#9a7413]',
    dotColor: '#9a7413',
  };
}
