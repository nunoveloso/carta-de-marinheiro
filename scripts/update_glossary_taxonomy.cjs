const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../src/data/initialTerms.ts');
let content = fs.readFileSync(targetPath, 'utf8');

// The 4 main categories metadata
const newCategories = `export const CATEGORIES: CategoryMeta[] = [
  {
    "id": "R.I.E.A.M.",
    "name": "R.I.E.A.M.",
    "description": "Sinais Sonoros, Balões e Abalroamentos.",
    "iconName": "ShieldAlert",
    "color": "from-emerald-600 to-teal-600"
  },
  {
    "id": "Segurança e Primeiros Socorros",
    "name": "Segurança e Primeiros Socorros",
    "description": "Incêndios, Segurança e Primeiros Socorros.",
    "iconName": "LifeBuoy",
    "color": "from-orange-500 to-amber-600"
  },
  {
    "id": "Marinharia",
    "name": "Marinharia",
    "description": "Cabos, Voltas e Nós, Âncoras e Amarras, Nomenclatura e Manobras.",
    "iconName": "Anchor",
    "color": "from-indigo-600 to-blue-700"
  },
  {
    "id": "Outras Matérias",
    "name": "Outras Matérias",
    "description": "Marés, Balizagem, Meteorologia, Motores, Legislação, Navegação e Siglas.",
    "iconName": "Compass",
    "color": "from-cyan-600 to-sky-700"
  }
];`;

content = content.replace(/export const CATEGORIES: CategoryMeta\[\] = \[[\s\S]*?\n\];/, newCategories);

const subToMain = {
  'Sinais Sonoros': 'R.I.E.A.M.',
  'Balões': 'R.I.E.A.M.',
  'Abalroamentos': 'R.I.E.A.M.',
  'Incêndios': 'Segurança e Primeiros Socorros',
  'Segurança': 'Segurança e Primeiros Socorros',
  'Primeiros Socorros': 'Segurança e Primeiros Socorros',
  'Cabos, Voltas e Nós': 'Marinharia',
  'Âncoras e Amarras': 'Marinharia',
  'Nomenclatura': 'Marinharia',
  'Manobras': 'Marinharia',
  'Marés': 'Outras Matérias',
  'Balizagem': 'Outras Matérias',
  'Meteorologia': 'Outras Matérias',
  'Motores': 'Outras Matérias',
  'Legislação': 'Outras Matérias',
  'Navegação': 'Outras Matérias',
  'Siglas': 'Outras Matérias'
};

function assignSubcategory(t) {
  const id = t.id;
  const sec = t.section || '';

  // 1. R.I.E.A.M.
  if (id === 'sinais-sonoros-manobra') return 'Sinais Sonoros';
  if (id.startsWith('balao-') || id === 'baloes-de-navegacao') return 'Balões';
  if (['rieam', 'risco-de-abalroamento', 'situacao-de-roda-a-roda', 'situacao-de-rumos-cruzados', 'navio-que-alcanca'].includes(id)) return 'Abalroamentos';

  // 2. Segurança e Primeiros Socorros
  if (sec.includes('Incêndios') || ['triangulo-do-fogo', 'combustivel', 'comburente', 'temperatura-de-ignicao', 'extintores-po-quimico', 'asfixia', 'abafamento', 'arrefecimento', 'inibicao'].includes(id)) {
    return 'Incêndios';
  }
  if (sec.includes('Socorrismo') || ['hipotermia', 'insolacao', 'golpe-de-calor', 'hidrocussao', 'paragem-da-digestao', 'hemorragia', 'pls', 'rcp'].includes(id)) {
    return 'Primeiros Socorros';
  }
  if (['balsa-salvacao', 'coletes-salvacao', 'boias-salvacao', 'boia-com-retenida', 'boia-com-luz', 'salva-vidas-embarcacao',
       'manobra-de-homem-ao-mar', 'manobra-de-rotacao', 'manobra-de-butakow',
       'navegar-aproado-ao-tempo', 'correr-com-o-tempo', 'afocinhar', 'rizar-a-vela-grande', 'planeamento-de-viagem'].includes(id)) {
    return 'Segurança';
  }

  // 3. Marinharia
  // Cabos, Voltas e Nós
  if (['cabos', 'massame', 'chicotes', 'seio-do-cabo', 'cabos-solteiros', 'cabos-fixos', 'sarilho', 'cocas',
       'alar-um-cabo', 'folgar-um-cabo', 'aguentar-o-cabo', 'largar-o-cabo-por-mao', 'dar-a-volta-a-um-cabo', 'colher-um-cabo',
       'retenida', 'espia', 'bitola', 'vergueiros', 'boca-cabo', 'adrica',
       'nos-e-voltas', 'no-direito', 'no-de-escota', 'lais-de-guia', 'volta-de-fiel', 'voltas-falidas', 'volta-de-cunho', 'volta-de-anete'].includes(id)) {
    return 'Cabos, Voltas e Nós';
  }
  // Âncoras e Amarras
  if (['ancorete', 'drogue', 'arinque', 'ancora-ou-ferro', 'amarra', 'quarteladas', 'anete-do-ferro', 'haste-do-ferro', 'cruz-do-ferro',
       'bracos-do-ferro', 'unha-do-ferro', 'cepo-do-ferro', 'ancora-flutuante', 'boia-de-arinque', 'manobra-de-fundear', 'tenca', 'garrar',
       'colocar-o-ferro-a-pique', 'suspender-o-ferro', 'unhar-o-ferro'].includes(id)) {
    return 'Âncoras e Amarras';
  }
  // Manobras
  if (['orcar', 'arribar', 'virando-em-roda', 'virando-por-devante', 'lancantes', 'regeiras', 'traveses-atracacao', 'atracagem', 'desatracar',
       'efeito-lateral-dos-helices', 'helice-de-passo-direito', 'helice-de-passo-esquerdo'].includes(id)) {
    return 'Manobras';
  }
  // Nomenclatura (estruturas, partes do barco, palamenta)
  if (['embarcacoes-miudas', 'baleeira', 'chata', 'bote', 'quilha', 'balizas', 'roda-de-proa', 'cadaste', 'painel-de-popa', 'costado', 'querena',
       'linha-de-agua', 'verdugo', 'robaletes', 'conves', 'enora', 'carlinga', 'escovem', 'comprimento', 'boca', 'pontal', 'calado', 'leme', 'balaustres',
       'proa-ou-vante', 'popa-ou-re', 'bombordo', 'estibordo', 'alheta', 'amuras', 'traves', 'meio-navio', 'meia-nau', 'barlavento', 'sotavento',
       'punho-da-pena', 'punho-da-escota', 'punho-da-amura', 'testa-da-vela', 'esteira-da-vela', 'valuma-da-vela',
       'habitabilidade', 'manobrabilidade', 'navegabilidade', 'estabilidade', 'flutuabilidade', 'poder-giratorio', 'solidez', 'estanquicidade',
       'palamenta', 'defensa', 'vertedouro-bartedouro', 'croque', 'remo', 'pagaia', 'forqueta-tolete'].includes(id)) {
    return 'Nomenclatura';
  }

  // 4. Outras Matérias
  // Marés
  if (sec.includes('Marés') || ['mares', 'mes-lunar', 'idade-da-lua', 'mares-vivas', 'mares-mortas', 'zero-hidrografico',
       'sonda-reduzida', 'sonda-a-hora', 'preia-mar', 'baixa-mar', 'amplitude-da-mare', 'altura-da-mare', 'estofo-da-mare', 'tabela-de-mares'].includes(id)) {
    return 'Marés';
  }
  // Balizagem
  if (sec.includes('Balizagem') || id.startsWith('cardeal-') || id.startsWith('lateral-') || id.startsWith('canal-principal') ||
      ['sistema-de-balizagem-iala', 'marcas-laterais', 'marcas-cardeais', 'perigo-isolado', 'marcas-de-aguas-limpas', 'marcas-especiais'].includes(id)) {
    return 'Balizagem';
  }
  // Meteorologia
  if (sec.includes('Meteorologia') || id.startsWith('nuvem-') ||
      ['escala-beaufort', 'escala-douglas', 'meteorologia', 'troposfera', 'pressao-atmosferica', 'isobaras', 'anticiclones', 'depressoes', 'brisa-maritima', 'brisa-terrestre'].includes(id)) {
    return 'Meteorologia';
  }
  // Motores
  if (sec.includes('Motores') || ['unidade-propulsora', 'macho-de-fundo', 'motor-fora-de-borda'].includes(id)) {
    return 'Motores';
  }
  // Legislação
  if (['embarcacao-de-recreio', 'preservacao-do-meio-ambiente-marinho'].includes(id)) {
    return 'Legislação';
  }
  // Navegação
  if (sec.includes('Velocidade') || ['no', 'milha-maritima', 'odometro', 'barquinha', 'tabela-de-rotacoes'].includes(id)) {
    return 'Navegação';
  }
  // Siglas
  if (id.startsWith('bandeira-') || ['codigo-internacional-de-sinais', 'navtex', 'mayday-socorro'].includes(id)) {
    return 'Siglas';
  }

  return 'Nomenclatura';
}

const startMarker = 'export const INITIAL_TERMS: NauticalTerm[] = ';
const endMarker = ';\n\nexport const SAMPLE_QUIZ_QUESTIONS';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not locate INITIAL_TERMS boundaries", { startIndex, endIndex });
  process.exit(1);
}

const termsJsonStr = content.substring(startIndex + startMarker.length, endIndex);
const terms = JSON.parse(termsJsonStr);
const report = [];

for (const t of terms) {
  const oldCategory = t.category;
  const newSub = assignSubcategory(t);
  const newMain = subToMain[newSub];

  t.category = newMain;
  t.subCategory = newSub;
  t.subcategory = newSub;

  report.push({
    term: t.term,
    id: t.id,
    oldCategory,
    newCategory: newMain,
    newSubCategory: newSub
  });
}

const formattedTerms = JSON.stringify(terms, null, 2);
const updatedContent = content.substring(0, startIndex + startMarker.length) +
  formattedTerms +
  content.substring(endIndex);

fs.writeFileSync(targetPath, updatedContent, 'utf8');

fs.writeFileSync(
  path.resolve(__dirname, 'glossary_update_report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(`Successfully updated ${report.length} terms in initialTerms.ts`);
