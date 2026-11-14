import { CategoryMeta } from '../types/glossary';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'R.I.E.A.M.',
    name: 'R.I.E.A.M.',
    description: 'Sinais Sonoros, Balões e Abalroamentos.',
    iconName: 'Ship',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'Segurança e Primeiros Socorros',
    name: 'Segurança e Primeiros Socorros',
    description: 'Incêndios, Segurança e Primeiros Socorros.',
    iconName: 'LifeBuoy',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'Marinharia',
    name: 'Marinharia',
    description: 'Cabos, Voltas e Nós, Âncoras e Amarras, Nomenclatura e Manobras.',
    iconName: 'Anchor',
    color: 'from-indigo-600 to-blue-700',
  },
  {
    id: 'Outras Matérias',
    name: 'Outras Matérias',
    description: 'Marés, Balizagem, Meteorologia, Motores, Legislação, Navegação e Siglas.',
    iconName: 'Map',
    color: 'from-cyan-600 to-sky-700',
  },
];
