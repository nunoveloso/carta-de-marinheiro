import { CategoryMeta, NauticalTerm, QuizQuestion } from '../types/glossary';

export const CATEGORIES: CategoryMeta[] = [
  {
    "id": "R.I.E.A.M.",
    "name": "R.I.E.A.M.",
    "description": "Sinais Sonoros, Balões e Abalroamentos.",
    "iconName": "Ship",
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
    "iconName": "Map",
    "color": "from-cyan-600 to-sky-700"
  }
];

// Os 225 termos náuticos residem na coleção 'terms' da Cloud Firestore (fonte única de verdade).
export const INITIAL_TERMS: NauticalTerm[] = [];

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    "id": "q1",
    "question": "Segundo o Manual, em caso de naufrágio e utilização da balsa de salvação, quando se deve beber água doce?",
    "options": [
      "Imediatamente após embarcar na balsa.",
      "Apenas 24 horas após o naufrágio.",
      "Sempre que se sinta sede, em pequenos goles.",
      "Nas primeiras 6 horas."
    ],
    "correctIndex": 1,
    "explanation": "No manual (pág. 2, Meios de Salvação): \"Em caso de sua utilização só devemos beber água doce 24h após o naufrágio.\"",
    "category": "seguranca-salvamento"
  },
  {
    "id": "q2",
    "question": "Qual é o comprimento que define legalmente uma Embarcação de Recreio (E.R.)?",
    "options": [
      "Entre 1m e 12m.",
      "Entre 2,5m e 24m.",
      "Entre 5m e 50m.",
      "Qualquer embarcação com menos de 30m."
    ],
    "correctIndex": 1,
    "explanation": "Definições de Embarcação de Recreio (pág. 4): É todo o engenho com comprimento entre 2,5m e 24m, utilizado nos desportos náuticos ou no simples lazer, sem fins lucrativos.",
    "category": "nomenclatura-geral"
  },
  {
    "id": "q3",
    "question": "Qual é a peça que constitui o primeiro elemento de construção da embarcação, considerada a sua \"coluna vertebral\"?",
    "options": [
      "O Cadaste.",
      "A Roda de Proa.",
      "A Quilha.",
      "O Verdugo."
    ],
    "correctIndex": 2,
    "explanation": "Nomenclatura (pág. 4): \"Quilha: É a peça que constitui o primeiro elemento de construção de uma embarcação. É considerada como a coluna vertebral da mesma\".",
    "category": "nomenclatura-geral"
  },
  {
    "id": "q4",
    "question": "Como se define \"Barlavento\" no Manual do Marinheiro?",
    "options": [
      "O lado para onde sopra o vento.",
      "O lado de onde sopra o vento.",
      "Aproximar a proa do vento.",
      "Afastar a proa do vento."
    ],
    "correctIndex": 1,
    "explanation": "Pág. 7: \"Barlavento: O lado de onde sopra o vento. Sotavento: O lado para onde sopra o vento.\"",
    "category": "nomenclatura-geral"
  },
  {
    "id": "q5",
    "question": "Qual é o nó indicado no Manual para ligar dois cabos da MESMA bitola pelos chicotes?",
    "options": [
      "Nó de escota.",
      "Lais de guia.",
      "Nó direito.",
      "Volta de fiel."
    ],
    "correctIndex": 2,
    "explanation": "Pág. 14: \"Nó direito: Usado para ligar dois cabos normalmente da mesma bitola, pelos chicotes.\" (Para bitolas diferentes usa-se o nó de escota).",
    "category": "manobras-propulsao"
  },
  {
    "id": "q6",
    "question": "Em termos de fundeadouro, quais são considerados geralmente \"bons fundos\" (boa tença)?",
    "options": [
      "Pedra e lodo mole.",
      "Areia e lodo duro.",
      "Cascalho solto e rocha.",
      "Apenas algas densas."
    ],
    "correctIndex": 1,
    "explanation": "Pág. 18: \"Areia e lodo duro são, geralmente, bons fundos (boa tença), uma vez que o ferro, logo que lançado, unha com facilidade.\"",
    "category": "amarras-fundear"
  },
  {
    "id": "q7",
    "question": "Na manobra de Homem ao Mar, qual é a manobra recomendada quando se perde o náufrago de vista?",
    "options": [
      "Manobra de rotação de 360 graus.",
      "Manobra de Butakow.",
      "Marcha à ré imediata a toda a força.",
      "Largar o ferro de emergência."
    ],
    "correctIndex": 1,
    "explanation": "Pág. 23: \"Sendo a manobra de Butakow mais morosa que a de rotação, ela apresenta vantagens quando se perde o náufrago de vista, uma vez que a embarcação seguirá sobre o caminho inverso inicial.\"",
    "category": "seguranca-salvamento"
  },
  {
    "id": "q8",
    "question": "Ao entrar num porto em Portugal (Sistema de Balizamento IALA Região A), que marcas encontramos a Bombordo e a Estibordo?",
    "options": [
      "Bombordo: verdes cónicas / Estibordo: vermelhas cilíndricas.",
      "Bombordo: boias vermelhas (numeração par) / Estibordo: boias verdes (numeração ímpar).",
      "Bombordo: amarelas com X / Estibordo: pretas e vermelhas.",
      "Bombordo e Estibordo têm ambas a mesma cor branca."
    ],
    "correctIndex": 1,
    "explanation": "Pág. 65: \"Ao entrar num porto, subir um canal ou rio dê bombordo a estas bóias [vermelhas, numeração sempre par]. Dê estibordo a estas bóias [verdes, numeração sempre ímpar].\"",
    "category": "balizamento-iala"
  },
  {
    "id": "q9",
    "question": "Qual é a fórmula da \"Sonda à hora\" apresentada no Manual?",
    "options": [
      "Sh = Am - Sr",
      "Sh = Am + Sr (Altura da maré + Sonda reduzida)",
      "Sh = Pontal - Calado",
      "Sh = Amplitude / 2"
    ],
    "correctIndex": 1,
    "explanation": "Pág. 28: \"Sonda à hora: É a altura da maré mais a sonda reduzida. (Sh = Am + Sr)\".",
    "category": "meteorologia-mares"
  },
  {
    "id": "q10",
    "question": "Que sinal transmite a Bandeira Alfa (A) do Código Internacional de Sinais?",
    "options": [
      "Homem ao mar.",
      "Tenho mergulhador na água; mantenha-se afastado e navegue a baixa velocidade.",
      "Estou a transportar carga perigosa.",
      "O meu navio está parado e sem seguimento."
    ],
    "correctIndex": 1,
    "explanation": "Pág. 69: \"Bandeira A (ALFA): Mergulhador na água; mantenha-se afastado e navegue a baixa velocidade\".",
    "category": "comunicacoes-vhf"
  }
];
