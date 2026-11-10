import { CategoryMeta, NauticalTerm, QuizQuestion } from '../types/glossary';

export const CATEGORIES: CategoryMeta[] = [
  {
    "id": "nomenclatura-geral",
    "name": "Nomenclatura do Barco",
    "description": "Partes do casco, dimensões, conveses e elementos estruturais do manual.",
    "iconName": "Ship",
    "color": "from-blue-600 to-cyan-600"
  },
  {
    "id": "seguranca-salvamento",
    "name": "Segurança & Salvamento",
    "description": "Meios de salvação, combate a incêndios e socorrismo.",
    "iconName": "LifeBuoy",
    "color": "from-orange-500 to-amber-600"
  },
  {
    "id": "manobras-propulsao",
    "name": "Manobras & Cabos",
    "description": "Manobras de cabos, nós, atracação, homem ao mar e hélices.",
    "iconName": "Anchor",
    "color": "from-indigo-600 to-blue-700"
  },
  {
    "id": "amarras-fundear",
    "name": "Âncoras & Amarras",
    "description": "Constituição do ferro, manobra de fundear, tença e amarras.",
    "iconName": "Weight",
    "color": "from-slate-600 to-zinc-700"
  },
  {
    "id": "meteorologia-mares",
    "name": "Meteorologia & Marés",
    "description": "Marés, zero hidrográfico, nuvens, escalas e ventos.",
    "iconName": "CloudRain",
    "color": "from-teal-600 to-cyan-700"
  },
  {
    "id": "regras-ripam",
    "name": "R.I.E.A.M. & Balões",
    "description": "Regras de manobra, risco de abalroamento, balões e faróis.",
    "iconName": "ShieldAlert",
    "color": "from-emerald-600 to-teal-600"
  },
  {
    "id": "balizamento-iala",
    "name": "Balizamento (IALA A)",
    "description": "Marcas laterais, cardeais, perigo isolado e águas limpas.",
    "iconName": "Navigation",
    "color": "from-rose-600 to-red-600"
  },
  {
    "id": "navegacao-agulhas",
    "name": "Velocidade & Distância",
    "description": "Nó, milha marítima, odómetros e instrumentos de navegação.",
    "iconName": "Compass",
    "color": "from-amber-500 to-yellow-600"
  },
  {
    "id": "comunicacoes-vhf",
    "name": "Comunicações & Sinais",
    "description": "Navtex, Código Internacional de Sinais e radiotelefonia.",
    "iconName": "Radio",
    "color": "from-cyan-600 to-sky-700"
  }
];

export const MANUAL_SECTIONS = [
  "Meios de Salvação",
  "Definições de Embarcação de Recreio",
  "Palamenta",
  "Manobras de Cabos",
  "Âncoras e Amarras",
  "Generalidades sobre Manobras",
  "Manobra de Homem ao Mar",
  "Determinação de Velocidade e Distância",
  "Marés",
  "Segurança no Mar",
  "Navegação com Mau Tempo",
  "Meteorologia",
  "Cuidados com a Unidade Propulsora",
  "Prevenção e Combate a Incêndios",
  "Socorrismo",
  "Planeamento de Viagem",
  "Motores",
  "Preservação do Meio Ambiente Marinho",
  "R.I.E.A.M. (Regras de Navegação)",
  "Balões e Sinais Diurnos",
  "Sistema de Balizagem Marítima",
  "Código Internacional de Sinais",
  "Navtex"
] as const;

export const INITIAL_TERMS: NauticalTerm[] = [
  {
    "id": "balsa-salvacao",
    "term": "Balsa",
    "category": "seguranca-salvamento",
    "section": "Meios de Salvação",
    "subsection": "Meios Coletivos de Salvação",
    "page": 2,
    "definition": "Deve estar colocada no convés e presa à embarcação, assim como, o cabo que faz disparar a garrafa de ar comprimido deve estar fixado a bordo. Em caso de sua utilização só devemos beber água doce 24h após o naufrágio.",
    "synonyms": [
      "Balsa salva-vidas",
      "Jangada pneumática"
    ],
    "importance": "essencial",
    "examTip": "Pergunta clássica de exame: Em caso de naufrágio e utilização da balsa, só se deve beber água doce decorridas 24 horas.",
    "relatedTerms": [
      "coletes-salvacao",
      "boias-salvacao",
      "manobra-de-homem-ao-mar",
      "mayday-socorro"
    ]
  },
  {
    "id": "coletes-salvacao",
    "term": "Coletes de salvação",
    "category": "seguranca-salvamento",
    "section": "Meios de Salvação",
    "subsection": "Meios Individuais de Salvação",
    "page": 2,
    "definition": "Devem estar devidamente arrumados em local de fácil acesso e deve ser adequado para quem o traz vestido. As crianças deverão usar sempre os seus coletes.",
    "synonyms": [
      "Coletes salva-vidas"
    ],
    "importance": "essencial",
    "examTip": "As crianças a bordo têm de usar sempre o seu colete salva-vidas.",
    "relatedTerms": [
      "balsa-salvacao",
      "boias-salvacao",
      "boia-com-retenida",
      "hipotermia"
    ]
  },
  {
    "id": "boias-salvacao",
    "term": "Boias de salvação",
    "category": "seguranca-salvamento",
    "section": "Meios de Salvação",
    "subsection": "Meios Individuais de Salvação",
    "page": 3,
    "definition": "Aparelhos de flutuação individual prontos para lançamento imediato a náufragos na água.",
    "synonyms": [
      "Boias circulares"
    ],
    "importance": "essencial",
    "examTip": "Equipamento de segurança obrigatório a bordo; deve estar pronto para lançamento imediato e desimpedido.",
    "relatedTerms": [
      "boia-com-retenida",
      "boia-com-luz",
      "coletes-salvacao",
      "manobra-de-homem-ao-mar"
    ]
  },
  {
    "id": "boia-com-retenida",
    "term": "Boia de salvação com retenida",
    "category": "seguranca-salvamento",
    "section": "Meios de Salvação",
    "subsection": "Meios Individuais de Salvação",
    "page": 3,
    "definition": "Boia de salvação dotada de um cabo leve de retenida para permitir recuperar o náufrago ou manter a sua ligação segura à embarcação.",
    "synonyms": [
      "Boia com linha de retenida"
    ],
    "importance": "essencial",
    "examTip": "Equipamento de segurança obrigatório a bordo; deve estar pronto para lançamento imediato e desimpedido.",
    "relatedTerms": [
      "boias-salvacao",
      "boia-com-luz",
      "manobra-de-homem-ao-mar",
      "coletes-salvacao"
    ]
  },
  {
    "id": "boia-com-luz",
    "term": "Boia de salvação com luz",
    "category": "seguranca-salvamento",
    "section": "Meios de Salvação",
    "subsection": "Meios Individuais de Salvação",
    "page": 3,
    "definition": "Boia de salvação equipada com aparelho luminoso de acendimento automático na água para localização do náufrago durante a noite.",
    "synonyms": [
      "Boia com sinalizador luminoso"
    ],
    "importance": "essencial",
    "examTip": "Equipamento de segurança obrigatório a bordo; deve estar pronto para lançamento imediato e desimpedido.",
    "relatedTerms": [
      "boias-salvacao",
      "boia-com-retenida",
      "manobra-de-homem-ao-mar",
      "coletes-salvacao"
    ]
  },
  {
    "id": "embarcacao-de-recreio",
    "term": "Embarcação de Recreio (E.R.)",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Definições de E.R.",
    "page": 4,
    "definition": "É todo o engenho ou aparelho de qualquer natureza com comprimento entre 2,5m e 24m, utilizado ou susceptível de ser utilizado como meio de deslocação na água, utilizado nos desportos náuticos ou no simples lazer, sem fins lucrativos. As motas de água são consideradas E.R.",
    "synonyms": [
      "E.R."
    ],
    "importance": "essencial",
    "examTip": "Limites oficiais: comprimento entre 2,5 m e 24 m, para desporto ou lazer sem fins lucrativos. Motas de água são consideradas E.R.",
    "relatedTerms": [
      "embarcacoes-miudas",
      "baleeira",
      "bote",
      "chata",
      "comprimento"
    ]
  },
  {
    "id": "embarcacoes-miudas",
    "term": "Embarcações miúdas",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcações miúdas",
    "page": 4,
    "definition": "São embarcações de pequenas dimensões, normalmente são usadas por navios como embarcações auxiliares em serviços de transporte de e para terra ou entre navios, em caso de sinistro podem ser usadas como salva-vidas e na faina de pesca podem ser usadas para as manobras de lançar e alar as redes.",
    "synonyms": [
      "Embarcações auxiliares"
    ],
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "embarcacao-de-recreio",
      "baleeira",
      "bote",
      "chata",
      "salva-vidas-embarcacao"
    ]
  },
  {
    "id": "baleeira",
    "term": "Baleeira",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcações miúdas mais usadas atualmente",
    "page": 4,
    "definition": "A principal característica da baleeira é ter a proa e a popa mais elevadas que o meio da embarcação e não tem painel de popa.",
    "importance": "essencial",
    "examTip": "Atenção ao detalhe de identificação: proa e popa elevadas e NÃO tem painel de popa.",
    "relatedTerms": [
      "salva-vidas-embarcacao",
      "embarcacoes-miudas",
      "bote",
      "chata"
    ]
  },
  {
    "id": "salva-vidas-embarcacao",
    "term": "Salva-vidas (Embarcação)",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcações miúdas mais usadas atualmente",
    "page": 4,
    "definition": "É uma baleeira dotada de um elevado poder de flutuação à custa de caixas-de-ar montadas à proa, à ré e debaixo dos bancos. Tem à volta da borda um cabo de socorros a náufragos.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "baleeira",
      "balsa-salvacao",
      "embarcacoes-miudas",
      "coletes-salvacao"
    ]
  },
  {
    "id": "chata",
    "term": "Chata",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcações miúdas mais usadas atualmente",
    "page": 4,
    "definition": "É uma embarcação de fundo chato, tem painel de popa, e a proa, por vezes, também tem painel saído mas de dimensões muito mais pequenas. É característica como embarcação auxiliar nos barcos de pesca.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "bote",
      "embarcacoes-miudas",
      "baleeira"
    ]
  },
  {
    "id": "bote",
    "term": "Bote",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcações miúdas mais usadas atualmente",
    "page": 4,
    "definition": "É uma embarcação que tem painel de popa e roda de proa. A sua principal característica é a aparente desproporção entre a boca e o comprimento.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "chata",
      "baleeira",
      "embarcacoes-miudas"
    ]
  },
  {
    "id": "quilha",
    "term": "Quilha",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "É a peça que constitui o primeiro elemento de construção de uma embarcação. É considerada como a coluna vertebral da mesma, e nela encaixam as cavernas ou balizas, ou seja, as \"costelas\" da embarcação.",
    "synonyms": [
      "Coluna vertebral do navio"
    ],
    "importance": "essencial",
    "examTip": "A quilha é a peça central e primeiro elemento de construção na qual encaixam as balizas.",
    "relatedTerms": [
      "balizas",
      "roda-de-proa",
      "cadaste",
      "robaletes",
      "costado"
    ]
  },
  {
    "id": "balizas",
    "term": "Balizas",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "São estruturas transversais em relação à quilha que dão forma ao casco. São também conhecidas por braços.",
    "synonyms": [
      "Braços",
      "Cavernas"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "quilha",
      "costado",
      "conves",
      "roda-de-proa"
    ]
  },
  {
    "id": "roda-de-proa",
    "term": "Roda de Proa",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "Seguimento da quilha no sentido da proa.",
    "importance": "essencial",
    "examTip": "Parte anterior da embarcação que corta a água em marcha avante.",
    "relatedTerms": [
      "quilha",
      "cadaste",
      "proa-ou-vante",
      "escovem"
    ]
  },
  {
    "id": "cadaste",
    "term": "Cadaste",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "Seguimento da quilha no sentido da popa.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "quilha",
      "roda-de-proa",
      "popa-ou-re",
      "painel-de-popa",
      "leme"
    ]
  },
  {
    "id": "painel-de-popa",
    "term": "Painel de Popa",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "Painel transversal em relação à quilha colocado na extremidade oposta à roda de proa.",
    "synonyms": [
      "Espelho de popa"
    ],
    "importance": "essencial",
    "examTip": "Parte posterior da embarcação onde habitualmente se instala o leme e o propulsor.",
    "relatedTerms": [
      "popa-ou-re",
      "cadaste",
      "alheta",
      "costado"
    ]
  },
  {
    "id": "costado",
    "term": "Costado",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "Forro exterior do navio acima da linha de água (obras mortas).",
    "synonyms": [
      "Obras mortas"
    ],
    "importance": "essencial",
    "examTip": "Parte do casco acima da linha de água até à borda falsa ou convés (obra morta).",
    "relatedTerms": [
      "querena",
      "linha-de-agua",
      "verdugo",
      "balizas"
    ]
  },
  {
    "id": "querena",
    "term": "Querena",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "Forma exterior do navio abaixo da linha de água (obras vivas).",
    "synonyms": [
      "Obras vivas",
      "Carena"
    ],
    "importance": "essencial",
    "examTip": "Parte do casco que fica submersa na água, também designada por obra viva.",
    "relatedTerms": [
      "costado",
      "linha-de-agua",
      "calado",
      "quilha"
    ]
  },
  {
    "id": "linha-de-agua",
    "term": "Linha de água",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 4,
    "definition": "Linha que separa as obras vivas das obras mortas.",
    "importance": "essencial",
    "examTip": "Separa a obra viva (querena) da obra morta (costado).",
    "relatedTerms": [
      "querena",
      "costado",
      "calado",
      "pontal"
    ]
  },
  {
    "id": "verdugo",
    "term": "Verdugo",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "Peça destinada a proteger a embarcação dos choques nas atracagens. É colocada nas bordas da proa à popa.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "costado",
      "defensa",
      "atracagem"
    ]
  },
  {
    "id": "robaletes",
    "term": "Robaletes",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "Peças exteriores colocadas longitudinalmente na parte mais larga da querena, destinadas a amortecer o balanço transversal.",
    "synonyms": [
      "Quilhas de balanço"
    ],
    "importance": "essencial",
    "examTip": "Função no exame: os robaletes destinam-se a amortecer o balanço transversal da embarcação.",
    "relatedTerms": [
      "quilha",
      "estabilidade",
      "costado"
    ]
  },
  {
    "id": "conves",
    "term": "Convés",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "Fecho superior do casco com função de pavimento.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "balaustres",
      "costado",
      "enora",
      "escovem"
    ]
  },
  {
    "id": "enora",
    "term": "Enora",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "Abertura no convés por onde passa o mastro.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "carlinga",
      "conves"
    ]
  },
  {
    "id": "carlinga",
    "term": "Carlinga",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "Peça ligada à quilha onde se fixa o pé de mastro.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "enora",
      "quilha"
    ]
  },
  {
    "id": "escovem",
    "term": "Escovém",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "Abertura no costado onde passam os cabos de amarração.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "amarra",
      "ancora-ou-ferro",
      "roda-de-proa",
      "quarteladas"
    ]
  },
  {
    "id": "comprimento",
    "term": "Comprimento",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Dimensões de uma Embarcação",
    "page": 5,
    "definition": "É a distância entre a proa e a popa. Mede-se na direcção da linha de Proa – Popa da Embarcação, desde a parte exterior da Roda de Proa até à face exterior do cadaste sendo esta a sua maior dimensão em comprimento.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "boca",
      "pontal",
      "calado",
      "embarcacao-de-recreio"
    ]
  },
  {
    "id": "boca",
    "term": "Boca",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Dimensões de uma Embarcação",
    "page": 5,
    "definition": "Largura máxima de uma embarcação. Mede-se no alcatrate desde a face externa do forro de um dos bordos, até à face externa do forro do bordo contrário. Fica no sentido da Baliza mais larga.",
    "importance": "essencial",
    "examTip": "A boca máxima é a largura máxima da embarcação medida entre os bordos exteriores.",
    "relatedTerms": [
      "comprimento",
      "pontal",
      "meio-navio",
      "estabilidade"
    ]
  },
  {
    "id": "pontal",
    "term": "Pontal",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Dimensões de uma Embarcação",
    "page": 5,
    "definition": "É a distância da quilha à borda. Medida tirada desde a quilha até à altura da borda, ou seja à parte superior do alcatrate, aproximadamente ao meio da embarcação.",
    "importance": "essencial",
    "examTip": "Distância vertical medida a meio navio entre a quilha e a linha reta do convés principal.",
    "relatedTerms": [
      "calado",
      "boca",
      "comprimento",
      "conves"
    ]
  },
  {
    "id": "calado",
    "term": "Calado",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Dimensões de uma Embarcação",
    "page": 5,
    "definition": "É a distância entre a linha de água ao ponto mais baixo da quilha.",
    "importance": "essencial",
    "examTip": "Distância vertical entre a linha de água e a quilha; essencial para calcular a folga abaixo da quilha.",
    "relatedTerms": [
      "pontal",
      "linha-de-agua",
      "querena",
      "sonda-a-hora",
      "zero-hidrografico"
    ]
  },
  {
    "id": "leme",
    "term": "Leme",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "É o aparelho que permite orientar a embarcação. É formado por uma madre (junto ao cadaste), porta (mergulhada na água) e cachola (parte superior onde encaixa a cana do leme).",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cadaste",
      "manobrabilidade",
      "poder-giratorio",
      "helice-de-passo-direito"
    ]
  },
  {
    "id": "balaustres",
    "term": "Balaustres",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Nomenclatura e definições",
    "page": 5,
    "definition": "São peças normalmente em metal fixadas à borda da embarcação, que recebem os vergueiros.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "conves",
      "costado",
      "defensa"
    ]
  },
  {
    "id": "proa-ou-vante",
    "term": "Proa ou Vante",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "A parte da frente da embarcação.",
    "synonyms": [
      "Vante"
    ],
    "importance": "essencial",
    "examTip": "Parte anterior da embarcação que corta a água em marcha avante.",
    "relatedTerms": [
      "popa-ou-re",
      "bombordo",
      "estibordo",
      "amuras",
      "roda-de-proa"
    ]
  },
  {
    "id": "popa-ou-re",
    "term": "Popa ou Ré",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "A parte de trás da embarcação.",
    "synonyms": [
      "Ré"
    ],
    "importance": "essencial",
    "examTip": "Parte posterior da embarcação onde habitualmente se instala o leme e o propulsor.",
    "relatedTerms": [
      "proa-ou-vante",
      "bombordo",
      "estibordo",
      "alheta",
      "cadaste"
    ]
  },
  {
    "id": "bombordo",
    "term": "Bombordo",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "Lado esquerdo da embarcação para quem olha no sentido da Proa.",
    "synonyms": [
      "BB"
    ],
    "importance": "essencial",
    "examTip": "Lado esquerdo da embarcação olhando da popa para a proa. Luz de navegação: Vermelha.",
    "relatedTerms": [
      "estibordo",
      "proa-ou-vante",
      "popa-ou-re",
      "amuras",
      "alheta"
    ]
  },
  {
    "id": "estibordo",
    "term": "Estibordo",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "Lado direito da embarcação para quem olha no sentido da Proa.",
    "synonyms": [
      "EB"
    ],
    "importance": "essencial",
    "examTip": "Lado direito da embarcação olhando da popa para a proa. Luz de navegação: Verde.",
    "relatedTerms": [
      "bombordo",
      "proa-ou-vante",
      "popa-ou-re",
      "amuras",
      "alheta"
    ]
  },
  {
    "id": "alheta",
    "term": "Alheta",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "Zona do canto junto ao painel de popa. Conforme fica a um bordo ou a outro, distinguem-se por alheta de Bombordo ou de Estibordo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "amuras",
      "popa-ou-re",
      "traves",
      "bombordo",
      "estibordo"
    ]
  },
  {
    "id": "amuras",
    "term": "Amuras",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "Parte curva das obras mortas do costado de um e do outro lado da roda de proa. Há as Amuras de Bombordo e de Estibordo.",
    "importance": "essencial",
    "examTip": "Região do costado à proa, uma a bombordo e outra a estibordo, onde o casco começa a afilar.",
    "relatedTerms": [
      "alheta",
      "proa-ou-vante",
      "traves",
      "barlavento",
      "sotavento"
    ]
  },
  {
    "id": "traves",
    "term": "Través",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "Direção perpendicular à mediana do navio. Fica situado entre a Amura e a Alheta. Há os traveses de Bombordo e de Estibordo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "amuras",
      "alheta",
      "meio-navio",
      "meia-nau"
    ]
  },
  {
    "id": "meio-navio",
    "term": "Meio Navio",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "Região que fica situada a meia distância entre a proa e a popa.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "meia-nau",
      "traves",
      "boca",
      "proa-ou-vante",
      "popa-ou-re"
    ]
  },
  {
    "id": "meia-nau",
    "term": "Meia Nau",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Regiões do navio – Definições",
    "page": 6,
    "definition": "Plano longitudinal que passa pela Proa e pela Popa, dividindo o navio em duas regiões simétricas que se denominam de bordos.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "meio-navio",
      "traves",
      "boca",
      "estabilidade"
    ]
  },
  {
    "id": "barlavento",
    "term": "Barlavento",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Outras definições",
    "page": 7,
    "definition": "O lado de onde sopra o vento.",
    "importance": "essencial",
    "examTip": "Barlavento = de onde sopra o vento; Sotavento = para onde sopra o vento.",
    "relatedTerms": [
      "sotavento",
      "orcar",
      "arribar",
      "amuras",
      "brisa-maritima"
    ]
  },
  {
    "id": "sotavento",
    "term": "Sotavento",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Outras definições",
    "page": 7,
    "definition": "O lado para onde sopra o vento.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "barlavento",
      "arribar",
      "orcar",
      "alheta",
      "manobra-de-homem-ao-mar"
    ]
  },
  {
    "id": "orcar",
    "term": "Orçar",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Outras definições",
    "page": 7,
    "definition": "Aproximar a Proa da direcção do vento.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "arribar",
      "barlavento",
      "sotavento",
      "virando-por-devante"
    ]
  },
  {
    "id": "arribar",
    "term": "Arribar",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Outras definições",
    "page": 7,
    "definition": "Afastar a Proa da direcção do vento.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "orcar",
      "sotavento",
      "barlavento",
      "virando-em-roda"
    ]
  },
  {
    "id": "punho-da-pena",
    "term": "Punho da pena",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcação à vela",
    "page": 9,
    "definition": "Vértice ou punho superior da vela grande onde se fixa a adriça.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "punho-da-escota",
      "punho-da-amura",
      "testa-da-vela",
      "valuma-da-vela"
    ]
  },
  {
    "id": "punho-da-escota",
    "term": "Punho da escota",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcação à vela",
    "page": 9,
    "definition": "Vértice inferior de ré da vela grande onde se fixa a escota.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "punho-da-pena",
      "punho-da-amura",
      "esteira-da-vela",
      "valuma-da-vela"
    ]
  },
  {
    "id": "punho-da-amura",
    "term": "Punho da amura",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcação à vela",
    "page": 9,
    "definition": "Vértice inferior de vante da vela grande junto ao mastro e retranca.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "punho-da-pena",
      "punho-da-escota",
      "testa-da-vela",
      "esteira-da-vela"
    ]
  },
  {
    "id": "testa-da-vela",
    "term": "Testa",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcação à vela",
    "page": 9,
    "definition": "Bordo anterior da vela que fica junto ao mastro.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "esteira-da-vela",
      "valuma-da-vela",
      "punho-da-pena",
      "punho-da-amura"
    ]
  },
  {
    "id": "esteira-da-vela",
    "term": "Esteira",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcação à vela",
    "page": 9,
    "definition": "Bordo inferior da vela que fica junto à retranca.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "testa-da-vela",
      "valuma-da-vela",
      "punho-da-escota",
      "punho-da-amura"
    ]
  },
  {
    "id": "valuma-da-vela",
    "term": "Valuma",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Embarcação à vela",
    "page": 9,
    "definition": "Bordo posterior e livre da vela, que vai da pena ao punho da escota.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "testa-da-vela",
      "esteira-da-vela",
      "punho-da-pena",
      "punho-da-escota"
    ]
  },
  {
    "id": "habitabilidade",
    "term": "Habitabilidade",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "Capacidade para alojar em condições normais e satisfatórias para quem embarca.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "navegabilidade",
      "solidez",
      "conves"
    ]
  },
  {
    "id": "manobrabilidade",
    "term": "Manobrabilidade",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "É a capacidade de evoluir, relacionadas com a forma do casco, potência, características do leme e dos hélices.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "poder-giratorio",
      "leme",
      "navegabilidade",
      "estabilidade"
    ]
  },
  {
    "id": "navegabilidade",
    "term": "Navegabilidade",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "É a aptidão para enfrentar o mar em todas as condições para que foi concebida.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "estabilidade",
      "flutuabilidade",
      "estanquicidade",
      "solidez"
    ]
  },
  {
    "id": "estabilidade",
    "term": "Estabilidade",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "É a capacidade que a Embarcação revela, ao voltar com mais facilidade à sua posição de equilíbrio.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "flutuabilidade",
      "estanquicidade",
      "robaletes",
      "boca"
    ]
  },
  {
    "id": "flutuabilidade",
    "term": "Flutuabilidade",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "É a qualidade que permite à Embarcação de se manter à superfície, numa relação directa com a carga que estiver embarcada.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "estabilidade",
      "estanquicidade",
      "linha-de-agua",
      "querena"
    ]
  },
  {
    "id": "poder-giratorio",
    "term": "Poder Giratório",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "É a maior ou menor facilidade com que uma Embarcação descreve curvas de raios distintos.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "manobrabilidade",
      "leme",
      "efeito-lateral-dos-helices"
    ]
  },
  {
    "id": "solidez",
    "term": "Solidez",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "É a maior ou menor resistência da Embarcação às acções da vaga e do vento.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "quilha",
      "balizas",
      "navegabilidade",
      "estabilidade"
    ]
  },
  {
    "id": "estanquicidade",
    "term": "Estanquicidade",
    "category": "nomenclatura-geral",
    "section": "Definições de Embarcação de Recreio",
    "subsection": "Qualidades Náuticas",
    "page": 10,
    "definition": "Grau de permeabilidade à infiltração e embarque de água.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "flutuabilidade",
      "navegabilidade",
      "conves",
      "costado"
    ]
  },
  {
    "id": "palamenta",
    "term": "Palamenta",
    "category": "nomenclatura-geral",
    "section": "Palamenta",
    "subsection": "Apetrechos gerais",
    "page": 11,
    "definition": "É a designação dada ao conjunto de apetrechos e peças soltas ou desmontáveis da Embarcação.",
    "importance": "essencial",
    "examTip": "Definição clássica: conjunto de apetrechos e peças soltas ou desmontáveis da embarcação.",
    "relatedTerms": [
      "ancorete",
      "defensa",
      "vertedouro-bartedouro",
      "croque",
      "remo"
    ]
  },
  {
    "id": "ancorete",
    "term": "Ancorete",
    "category": "amarras-fundear",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "Pequeno ferro de fundear.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "palamenta",
      "ancora-ou-ferro",
      "amarra",
      "manobra-de-fundear"
    ]
  },
  {
    "id": "defensa",
    "term": "Defensa",
    "category": "manobras-propulsao",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "É um balão esférico ou cilíndrico, geralmente pneumático, que protege o Costado na atracagem a um cais ou a outra Embarcação.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "palamenta",
      "verdugo",
      "atracagem",
      "volta-de-fiel"
    ]
  },
  {
    "id": "vertedouro-bartedouro",
    "term": "Vertedouro ou Bartedouro",
    "category": "nomenclatura-geral",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "Peça em madeira ou plástico, que serve para esgotar a água a bordo.",
    "synonyms": [
      "Bartedouro"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "palamenta",
      "estanquicidade",
      "bote",
      "chata"
    ]
  },
  {
    "id": "croque",
    "term": "Croque",
    "category": "manobras-propulsao",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "Vara em madeira ou metal, com um gancho na extremidade e por vezes extensível, usado na manobra de atracar, desatracar, ou para apanhar um cabo ou uma boia.",
    "synonyms": [
      "Bicheiro"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "palamenta",
      "atracagem",
      "desatracar",
      "manobra-de-homem-ao-mar"
    ]
  },
  {
    "id": "drogue",
    "term": "Drogue",
    "category": "amarras-fundear",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "Âncora flutuante.",
    "synonyms": [
      "Âncora flutuante"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "ancora-flutuante",
      "palamenta",
      "correr-com-o-tempo",
      "navegar-aproado-ao-tempo"
    ]
  },
  {
    "id": "remo",
    "term": "Remo",
    "category": "nomenclatura-geral",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "É o elemento propulsor em algumas Embarcações miúdas, é constituído pelo punho, corpo e pá.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "pagaia",
      "forqueta-tolete",
      "palamenta",
      "embarcacoes-miudas"
    ]
  },
  {
    "id": "pagaia",
    "term": "Pagaia",
    "category": "nomenclatura-geral",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "Remo com duas pás.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "remo",
      "palamenta",
      "bote",
      "chata"
    ]
  },
  {
    "id": "forqueta-tolete",
    "term": "Forqueta – Tolete",
    "category": "nomenclatura-geral",
    "section": "Palamenta",
    "subsection": "Apetrechos e peças",
    "page": 11,
    "definition": "Peça onde trabalha o remo e que serve de apoio ao mesmo.",
    "synonyms": [
      "Tolete",
      "Forqueta"
    ],
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "remo",
      "palamenta",
      "bote"
    ]
  },
  {
    "id": "cabos",
    "term": "Cabos",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Classificação geral de cabos",
    "page": 12,
    "definition": "As \"cordas\" usadas a bordo para os diversos serviços recebem a designação de Cabos, podendo ser de fibras sintéticas, algodão, arame, etc.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "massame",
      "chicotes",
      "seio-do-cabo",
      "bitola",
      "espia"
    ]
  },
  {
    "id": "massame",
    "term": "Massame",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Classificação geral de cabos",
    "page": 12,
    "definition": "O conjunto de cabos a bordo designam-se por Massame.",
    "importance": "essencial",
    "examTip": "Pergunta direta de exame: Como se designa o conjunto de todos os cabos a bordo? Massame.",
    "relatedTerms": [
      "cabos",
      "cabos-fixos",
      "cabos-solteiros",
      "adrica"
    ]
  },
  {
    "id": "chicotes",
    "term": "Chicotes",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Partes do cabo",
    "page": 12,
    "definition": "As extremidades de um cabo denominam-se Chicotes.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "seio-do-cabo",
      "cabos",
      "no-direito",
      "no-de-escota"
    ]
  },
  {
    "id": "seio-do-cabo",
    "term": "Seio",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Partes do cabo",
    "page": 12,
    "definition": "A região do cabo compreendida entre os dois chicotes designa-se por Seio.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "chicotes",
      "cabos",
      "voltas-falidas",
      "volta-de-fiel"
    ]
  },
  {
    "id": "cabos-solteiros",
    "term": "Cabos solteiros",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Classificação geral de cabos",
    "page": 12,
    "definition": "São aqueles que, estando completamente livres, estão prontos a trabalharem em qualquer local onde necessários.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cabos-fixos",
      "massame",
      "adrica",
      "espia"
    ]
  },
  {
    "id": "cabos-fixos",
    "term": "Cabos fixos",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Classificação geral de cabos",
    "page": 12,
    "definition": "São aqueles que fazem parte do aparelho fixo do navio. Por exemplo, os cabos que sustentam o mastro.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cabos-solteiros",
      "massame",
      "vergueiros"
    ]
  },
  {
    "id": "sarilho",
    "term": "Sarilho",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Arrumação de cabos",
    "page": 12,
    "definition": "É um tambor rotativo onde estão enrolados os cabos solteiros que não estão a ser utilizados.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cabos",
      "colher-um-cabo",
      "cocas"
    ]
  },
  {
    "id": "cocas",
    "term": "Cocas",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Cuidados com cabos",
    "page": 12,
    "definition": "São pequenas voltas que o Cabo dá sobre si mesmo, devido a torções normais, prejudicando a sua vida útil.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "sarilho",
      "colher-um-cabo",
      "alar-um-cabo",
      "cabos"
    ]
  },
  {
    "id": "alar-um-cabo",
    "term": "Alar um Cabo",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Manobras com cabos",
    "page": 12,
    "definition": "Puxar um Cabo para bordo ou para o Cais.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "folgar-um-cabo",
      "aguentar-o-cabo",
      "largar-o-cabo-por-mao",
      "colher-um-cabo"
    ]
  },
  {
    "id": "folgar-um-cabo",
    "term": "Folgar um cabo",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Manobras com cabos",
    "page": 12,
    "definition": "Deixar correr um Cabo sem largar o seu Chicote.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "alar-um-cabo",
      "aguentar-o-cabo",
      "largar-o-cabo-por-mao"
    ]
  },
  {
    "id": "aguentar-o-cabo",
    "term": "Aguentar o Cabo",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Manobras com cabos",
    "page": 13,
    "definition": "Travar o folgar do Cabo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "alar-um-cabo",
      "folgar-um-cabo",
      "dar-a-volta-a-um-cabo"
    ]
  },
  {
    "id": "largar-o-cabo-por-mao",
    "term": "Largar o Cabo por mão",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Manobras com cabos",
    "page": 13,
    "definition": "Largar completamente o cabo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "aguentar-o-cabo",
      "folgar-um-cabo",
      "alar-um-cabo"
    ]
  },
  {
    "id": "dar-a-volta-a-um-cabo",
    "term": "Dar a volta a um Cabo",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Manobras com cabos",
    "page": 13,
    "definition": "Prender o Cabo a um Cabeço, Cunho, etc.",
    "importance": "essencial",
    "examTip": "Elemento fundamental nas provas práticas; deve ser executado com rapidez e facilidade de desfazer.",
    "relatedTerms": [
      "volta-de-cunho",
      "aguentar-o-cabo",
      "volta-de-fiel"
    ]
  },
  {
    "id": "colher-um-cabo",
    "term": "Colher um Cabo",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Manobras com cabos",
    "page": 13,
    "definition": "Enrolar o Cabo em voltas largas de modo a não adquirir Cocas, e a ficar claro (não embaraçado). Um Cabo pode ser colhido pelo redondo formando um padeiro ou em aduchas ficando estendido no Convés com os cordões colocados lateralmente uns aos outros.",
    "synonyms": [
      "Aduchar"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cocas",
      "sarilho",
      "alar-um-cabo",
      "cabos"
    ]
  },
  {
    "id": "retenida",
    "term": "Retenida",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Tipos de cabos",
    "page": 13,
    "definition": "Cabo de massa, de pequena bitola e leve, com um peso numa das pontas para facilitar o seu arremesso para longe. Este Cabo serve para puxar um cabo mais pesado, como por exemplo, um Cabo de amarração para terra na manobra de atracagem.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "espia",
      "boia-com-retenida",
      "atracagem",
      "cabos"
    ]
  },
  {
    "id": "espia",
    "term": "Espia",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Tipos de cabos",
    "page": 13,
    "definition": "Cabo de boa bitola, destinado à amarração do navio ao cais, a outros navios ou utilizado para reboques.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "retenida",
      "lancantes",
      "regeiras",
      "atracagem",
      "traveses-atracacao"
    ]
  },
  {
    "id": "bitola",
    "term": "Bitola",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Características de cabos",
    "page": 14,
    "definition": "É a medida do perímetro da sua secção transversal. Associada ao tipo de material é uma das características que identifica um cabo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cabos",
      "no-direito",
      "no-de-escota"
    ]
  },
  {
    "id": "vergueiros",
    "term": "Vergueiros",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Tipos de cabos",
    "page": 14,
    "definition": "Cabos que de um e outro bordo vão de proa à popa passando por peças verticais fixadas à borda (vergueiros/balaustres).",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cabos-fixos",
      "massame",
      "conves"
    ]
  },
  {
    "id": "boca-cabo",
    "term": "Boça",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Tipos de cabos",
    "page": 14,
    "definition": "Cabo fixo num arganéu de proa, serve para amarrar ou rebocar a embarcação.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "cabos",
      "amarra",
      "ancora-ou-ferro"
    ]
  },
  {
    "id": "adrica",
    "term": "Adriça",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Tipos de cabos",
    "page": 14,
    "definition": "Cabo que serve para içar as velas.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "massame",
      "cabos-solteiros",
      "punho-da-pena"
    ]
  },
  {
    "id": "arinque",
    "term": "Arinque",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Tipos de cabos",
    "page": 14,
    "definition": "Cabo que une a boia de arinque ao ferro de fundear.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "boia-de-arinque",
      "ancora-ou-ferro",
      "manobra-de-fundear"
    ]
  },
  {
    "id": "nos-e-voltas",
    "term": "Nós e Voltas",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 14,
    "definition": "Os nós são um trabalho da arte de marinheiro praticado nos cabos, quer para unir entre si dois cabos, quer para unir entre si os chicotes de um só cabo, ou ainda para fixar um cabo a um dado lugar.",
    "importance": "essencial",
    "examTip": "Elemento fundamental nas provas práticas; deve ser executado com rapidez e facilidade de desfazer.",
    "relatedTerms": [
      "no-direito",
      "no-de-escota",
      "lais-de-guia",
      "volta-de-fiel",
      "volta-de-cunho"
    ]
  },
  {
    "id": "no-direito",
    "term": "Nó direito",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 14,
    "definition": "Usado para ligar dois cabos normalmente da mesma bitola, pelos chicotes.",
    "importance": "essencial",
    "examTip": "Lembre-se: Nó direito = ligar dois cabos da MESMA bitola.",
    "relatedTerms": [
      "no-de-escota",
      "lais-de-guia",
      "volta-de-fiel",
      "chicotes",
      "bitola"
    ]
  },
  {
    "id": "no-de-escota",
    "term": "Nó de escota",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 15,
    "definition": "Usado para unir cabos de bitolas diferentes.",
    "importance": "essencial",
    "examTip": "Lembre-se: Nó de escota = unir cabos de bitolas DIFERENTES.",
    "relatedTerms": [
      "no-direito",
      "lais-de-guia",
      "chicotes",
      "bitola"
    ]
  },
  {
    "id": "lais-de-guia",
    "term": "Lais de guia",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 15,
    "definition": "Usado para encapelar num cabeço e de utilização genérica. É um dos nós mais usados e seguros.",
    "importance": "essencial",
    "examTip": "É o \"rei dos nós\" náuticos: faz uma laçada fixa que não aperta sob tensão e desfaz-se com facilidade.",
    "relatedTerms": [
      "no-direito",
      "no-de-escota",
      "volta-de-fiel",
      "volta-de-cunho",
      "chicotes"
    ]
  },
  {
    "id": "volta-de-fiel",
    "term": "Volta de fiel",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 15,
    "definition": "Usado para amarrar um cabo a um pau, a um cabo mais grosso ou para prender as defensas aos varandins.",
    "importance": "essencial",
    "examTip": "Elemento fundamental nas provas práticas; deve ser executado com rapidez e facilidade de desfazer.",
    "relatedTerms": [
      "volta-de-cunho",
      "defensa",
      "volta-de-anete",
      "no-direito"
    ]
  },
  {
    "id": "voltas-falidas",
    "term": "Voltas falidas",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 15,
    "definition": "Utilizado para fixar um cabo num cabeço duplo.",
    "importance": "importante",
    "examTip": "Elemento fundamental nas provas práticas; deve ser executado com rapidez e facilidade de desfazer.",
    "relatedTerms": [
      "cocas",
      "colher-um-cabo",
      "seio-do-cabo",
      "dar-a-volta-a-um-cabo"
    ]
  },
  {
    "id": "volta-de-cunho",
    "term": "Volta de cunho",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 16,
    "definition": "Usado para fixar um cabo a um cunho.",
    "importance": "essencial",
    "examTip": "Peça metálica ou de madeira fixada ao convés destinada a dar volta aos cabos de amarração.",
    "relatedTerms": [
      "volta-de-fiel",
      "espia",
      "atracagem",
      "dar-a-volta-a-um-cabo"
    ]
  },
  {
    "id": "volta-de-anete",
    "term": "Volta de Anete",
    "category": "manobras-propulsao",
    "section": "Manobras de Cabos",
    "subsection": "Nós e Voltas",
    "page": 16,
    "definition": "Usada para ligar o chicote de um cabo ao anete de uma âncora ou de uma boia.",
    "importance": "essencial",
    "examTip": "Elemento fundamental nas provas práticas; deve ser executado com rapidez e facilidade de desfazer.",
    "relatedTerms": [
      "anete-do-ferro",
      "volta-de-fiel",
      "ancora-ou-ferro",
      "amarra"
    ]
  },
  {
    "id": "ancora-ou-ferro",
    "term": "Âncora (ou Ferro)",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "A âncora, também designada por ferro, é a peça que prende a embarcação ao fundo. O facto de ser o símbolo que normalmente se associa à marinha, demonstra a antiguidade e importância de que é alvo ao longo dos tempos.",
    "synonyms": [
      "Ferro"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "amarra",
      "quarteladas",
      "anete-do-ferro",
      "manobra-de-fundear",
      "tenca",
      "garrar"
    ]
  },
  {
    "id": "amarra",
    "term": "Amarra",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "O cabo ou corrente de ferro que se prende à âncora designa-se por amarra.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "ancora-ou-ferro",
      "quarteladas",
      "escovem",
      "manobra-de-fundear",
      "colocar-o-ferro-a-pique"
    ]
  },
  {
    "id": "quarteladas",
    "term": "Quarteladas",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "Denomina-se por quarteladas os espaçamentos da amarra que são normalmente sinalizados com tinta.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "amarra",
      "ancora-ou-ferro",
      "escovem"
    ]
  },
  {
    "id": "anete-do-ferro",
    "term": "Anete",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "Olhal por onde passa a amarra.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "haste-do-ferro",
      "volta-de-anete",
      "ancora-ou-ferro",
      "amarra"
    ]
  },
  {
    "id": "haste-do-ferro",
    "term": "Haste",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "Corpo do ferro que vai desde o anete até à cruz.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "anete-do-ferro",
      "cruz-do-ferro",
      "bracos-do-ferro",
      "cepo-do-ferro"
    ]
  },
  {
    "id": "cruz-do-ferro",
    "term": "Cruz",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "Zona de união da haste com os braços.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "haste-do-ferro",
      "bracos-do-ferro",
      "unha-do-ferro"
    ]
  },
  {
    "id": "bracos-do-ferro",
    "term": "Braços",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "Peças que têm na ponta unhas para facilitar o unhar do ferro.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "unha-do-ferro",
      "cruz-do-ferro",
      "haste-do-ferro"
    ]
  },
  {
    "id": "unha-do-ferro",
    "term": "Unha",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "Pontas do ferro cuja função é unhar o ferro ao fundo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "unhar-o-ferro",
      "bracos-do-ferro",
      "cruz-do-ferro",
      "tenca"
    ]
  },
  {
    "id": "cepo-do-ferro",
    "term": "Cepo",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Nomenclatura do ferro",
    "page": 17,
    "definition": "Peça de ferro transversal à haste e que obriga o ferro a prender ao fundo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "haste-do-ferro",
      "anete-do-ferro",
      "ancora-ou-ferro"
    ]
  },
  {
    "id": "ancora-flutuante",
    "term": "Âncora Flutuante",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Aparelhos especiais",
    "page": 18,
    "definition": "É um aparelho usado apenas com mau tempo, para ajudar a embarcação a manter-se aproada ao vento e ao mar, devido ao atrito que tem ao deslocar-se na água. A âncora flutuante ou drogue assume diversas formas, sendo a mais usual a tronco-cónica.",
    "synonyms": [
      "Drogue"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "drogue",
      "correr-com-o-tempo",
      "navegar-aproado-ao-tempo",
      "ancora-ou-ferro"
    ]
  },
  {
    "id": "boia-de-arinque",
    "term": "Boia de arinque",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Manobra de fundear",
    "page": 18,
    "definition": "Embarcação fundeada a pique de estai utilizando a boia de arinque. Diz-se pique de estai pelo facto do cabo de fundear seguir o ângulo do estai. A boia assinala a posição do ferro.",
    "importance": "essencial",
    "examTip": "Equipamento de segurança obrigatório a bordo; deve estar pronto para lançamento imediato e desimpedido.",
    "relatedTerms": [
      "arinque",
      "ancora-ou-ferro",
      "manobra-de-fundear"
    ]
  },
  {
    "id": "manobra-de-fundear",
    "term": "Manobra de fundear",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Manobra de fundear",
    "page": 18,
    "definition": "O largar do ferro deve ser executado com a proa ao vento ou à corrente ou à resultante de ambos. O ferro é largado com a embarcação a andar ligeiramente à ré.",
    "importance": "essencial",
    "examTip": "A proa deve estar ao vento/corrente e a embarcação a andar ligeiramente à ré.",
    "relatedTerms": [
      "tenca",
      "garrar",
      "unhar-o-ferro",
      "colocar-o-ferro-a-pique",
      "suspender-o-ferro",
      "ancora-ou-ferro"
    ]
  },
  {
    "id": "tenca",
    "term": "Tença (Boa tença e Má tença)",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Manobra de largar e suspender o ferro",
    "page": 18,
    "definition": "O tipo de fundo é fundamental para se escolher o local de fundear. Areia e lodo duro são, geralmente, bons fundos (boa tença), uma vez que o ferro unha com facilidade. O lodo mole e a pedra são maus fundos (má tença), uma vez que o ferro não unha e a embarcação garra.",
    "synonyms": [
      "Qualidade do fundo"
    ],
    "importance": "essencial",
    "examTip": "Boa tença = Areia e Lodo duro. Má tença = Pedra e Lodo mole.",
    "relatedTerms": [
      "manobra-de-fundear",
      "garrar",
      "unhar-o-ferro",
      "ancora-ou-ferro"
    ]
  },
  {
    "id": "garrar",
    "term": "Garrar",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Manobra de largar e suspender o ferro",
    "page": 18,
    "definition": "Quando o ferro não unha convenientemente ou se solta do fundo e a embarcação é arrastada pelo vento ou corrente.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "tenca",
      "unhar-o-ferro",
      "manobra-de-fundear",
      "ancora-ou-ferro"
    ]
  },
  {
    "id": "colocar-o-ferro-a-pique",
    "term": "Colocar o ferro a pique",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Manobra de largar e suspender o ferro",
    "page": 18,
    "definition": "Manobra de aproximação vertical ao ferro antes de o suspender: deve-se colocá-lo a pique e só depois içá-lo para bordo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "suspender-o-ferro",
      "manobra-de-fundear",
      "unhar-o-ferro",
      "amarra"
    ]
  },
  {
    "id": "suspender-o-ferro",
    "term": "Suspender o ferro",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Manobra de largar e suspender o ferro",
    "page": 18,
    "definition": "Içar o ferro para bordo após colocá-lo a pique.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "colocar-o-ferro-a-pique",
      "manobra-de-fundear",
      "unhar-o-ferro",
      "amarra"
    ]
  },
  {
    "id": "unhar-o-ferro",
    "term": "Unhar o ferro",
    "category": "amarras-fundear",
    "section": "Âncoras e Amarras",
    "subsection": "Unhar o ferro",
    "page": 19,
    "definition": "Tendo em vista facilitar o unhar do ferro, é prática corrente intercalar entre o anete do ferro e a amarra 2 a 5 metros de corrente. Com este artifício, a haste é obrigada a trabalhar na horizontal o que faz com que o ferro unhe mais facilmente. O comprimento do cabo deverá ser três ou quatro vezes a profundidade.",
    "importance": "essencial",
    "examTip": "O comprimento do cabo de fundear deve ser três a quatro vezes a profundidade (tendo em conta a amplitude da maré).",
    "relatedTerms": [
      "garrar",
      "tenca",
      "unha-do-ferro",
      "manobra-de-fundear"
    ]
  },
  {
    "id": "lancantes",
    "term": "Lançantes",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Atracar",
    "page": 20,
    "definition": "Cabos usados na atracação (de proa e de popa) que têm como função impedir que o barco se afaste do cais, evitando também o movimento do navio para vante e para ré.",
    "importance": "essencial",
    "examTip": "Os lançantes impedem que o barco se afaste do cais.",
    "relatedTerms": [
      "regeiras",
      "traveses-atracacao",
      "atracagem",
      "desatracar",
      "espia"
    ]
  },
  {
    "id": "regeiras",
    "term": "Regeiras",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Atracar",
    "page": 20,
    "definition": "Cabos usados na atracação (de proa e de popa cruzados) que impedem que o barco ande para trás e para a frente ao longo do cais.",
    "importance": "essencial",
    "examTip": "As regeiras impedem que o barco ande para trás e para a frente.",
    "relatedTerms": [
      "lancantes",
      "traveses-atracacao",
      "atracagem",
      "desatracar",
      "espia"
    ]
  },
  {
    "id": "traveses-atracacao",
    "term": "Traveses de amarração",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Atracar",
    "page": 20,
    "definition": "Cabos de amarração perpendiculares ao cais (travezes de proa e de popa) que têm apenas como função apertar o navio para o cais.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "lancantes",
      "regeiras",
      "atracagem",
      "desatracar",
      "espia"
    ]
  },
  {
    "id": "atracagem",
    "term": "Atracagem ou atracação",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Efeitos dos cabos ao atracar",
    "page": 21,
    "definition": "Ao atracar o navio deverá fazer-se ao cais a uma velocidade baixa e com um ângulo de inclinação entre os 10 e 20 graus, de modo a parar paralelo (por través) e o mais perto possível do cais. Não deve encostar a popa à muralha em primeiro lugar para evitar avarias nos hélices.",
    "synonyms": [
      "Atracação"
    ],
    "importance": "essencial",
    "examTip": "Ângulo de aproximação ao cais: entre 10 e 20 graus a velocidade reduzida.",
    "relatedTerms": [
      "desatracar",
      "lancantes",
      "regeiras",
      "traveses-atracacao",
      "defensa",
      "efeito-lateral-dos-helices"
    ]
  },
  {
    "id": "desatracar",
    "term": "Desatracar",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Desatracar",
    "page": 23,
    "definition": "Manobra de largar do cais. Com vento contra o cais, conserva-se a regeira de vante sobre o cabeço e, logo que a embarcação faça um ângulo de 70 a 80 graus, dá-se à ré e larga-se o cabo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "atracagem",
      "lancantes",
      "regeiras",
      "efeito-lateral-dos-helices",
      "croque"
    ]
  },
  {
    "id": "efeito-lateral-dos-helices",
    "term": "Efeito lateral dos Hélices",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Efeito lateral dos Hélices",
    "page": 22,
    "definition": "Adicionalmente à força de propulsão, força devida ao movimento dos hélices conhecida como pressão lateral, motivada pela diferença de pressão sentida pelas pás (maior nas pás mais submersas), tendo o efeito de deslocar a popa do navio no sentido da rotação.",
    "synonyms": [
      "Pressão lateral"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "helice-de-passo-direito",
      "helice-de-passo-esquerdo",
      "atracagem",
      "desatracar",
      "leme"
    ]
  },
  {
    "id": "helice-de-passo-direito",
    "term": "Hélice de passo direito",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Efeito lateral dos Hélices",
    "page": 22,
    "definition": "No caso de navio de um só hélice, este rodando para a direita (passo direito) faz a popa deslocar-se para Estibordo, ou seja, a proa para Bombordo. É o passo normal quando um navio possui um só hélice.",
    "importance": "essencial",
    "examTip": "Hélice de passo direito: ao dar atrás, a popa vai para Bombordo e a proa guina para Estibordo.",
    "relatedTerms": [
      "helice-de-passo-esquerdo",
      "efeito-lateral-dos-helices",
      "atracagem",
      "desatracar"
    ]
  },
  {
    "id": "helice-de-passo-esquerdo",
    "term": "Hélice de passo esquerdo",
    "category": "manobras-propulsao",
    "section": "Generalidades sobre Manobras",
    "subsection": "Efeito lateral dos Hélices",
    "page": 22,
    "definition": "Hélice que roda para a esquerda, fazendo com que a proa guine para Estibordo.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "helice-de-passo-direito",
      "efeito-lateral-dos-helices",
      "atracagem",
      "desatracar"
    ]
  },
  {
    "id": "manobra-de-homem-ao-mar",
    "term": "Manobra de Homem ao Mar",
    "category": "seguranca-salvamento",
    "section": "Manobra de Homem ao Mar",
    "subsection": "Procedimentos gerais",
    "page": 23,
    "definition": "Manobra executada para recolher alguém que caia à água. A mais importante regra é não perder o homem de vista, lançar de imediato uma boia ou colete, virar o leme ao bordo onde o homem caiu, e recolhê-lo deixando-o a sotavento da embarcação.",
    "importance": "essencial",
    "examTip": "Regra vital: recolher o homem deixando-o sempre a SOTAVENTO da nossa embarcação, abrigado do vento e do mar.",
    "relatedTerms": [
      "manobra-de-rotacao",
      "manobra-de-butakow",
      "virando-em-roda",
      "virando-por-devante",
      "boias-salvacao",
      "bandeira-oscar",
      "hipotermia"
    ]
  },
  {
    "id": "manobra-de-rotacao",
    "term": "Manobra de rotação",
    "category": "manobras-propulsao",
    "section": "Manobra de Homem ao Mar",
    "subsection": "Com uma embarcação a motor",
    "page": 23,
    "definition": "Consiste em guinar a embarcação virando todo o leme para o bordo em que o homem caiu, fazendo uma rotação de 360 graus até voltar ao local do náufrago. Devemos colocar-nos a barlavento deste, recolhendo-o por sotavento da nossa embarcação.",
    "synonyms": [
      "Curva de 360 graus"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "manobra-de-butakow",
      "manobra-de-homem-ao-mar",
      "boias-salvacao"
    ]
  },
  {
    "id": "manobra-de-butakow",
    "term": "Manobra de Butakow",
    "category": "manobras-propulsao",
    "section": "Manobra de Homem ao Mar",
    "subsection": "Com uma embarcação a motor",
    "page": 23,
    "definition": "Consiste em virar o leme a um dos bordos até que a proa da embarcação se afaste 60 graus da direcção em que seguia. Mete-se todo o leme sobre o bordo contrário e, quando faltarem 30 graus para o rumo inverso, coloca-se o leme a meio. Muito vantajosa quando se perde o náufrago de vista, pois conduz ao caminho inverso inicial.",
    "synonyms": [
      "Curva de Williamson / Butakow"
    ],
    "importance": "essencial",
    "examTip": "Quando se perde o náufrago de vista, a manobra recomendada é a de Butakow (afasta 60º, inverte tudo até faltarem 30º para o rumo oposto).",
    "relatedTerms": [
      "manobra-de-rotacao",
      "manobra-de-homem-ao-mar",
      "bandeira-oscar",
      "boias-salvacao"
    ]
  },
  {
    "id": "virando-em-roda",
    "term": "Virando em roda (Cambar)",
    "category": "manobras-propulsao",
    "section": "Manobra de Homem ao Mar",
    "subsection": "Manobra com uma embarcação à vela",
    "page": 24,
    "definition": "Virar de bordo, afastando a proa da linha do vento (cambar) até estar amurado no bordo oposto.",
    "synonyms": [
      "Cambar"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "virando-por-devante",
      "manobra-de-homem-ao-mar",
      "arribar",
      "orcar"
    ]
  },
  {
    "id": "virando-por-devante",
    "term": "Virando por devante",
    "category": "manobras-propulsao",
    "section": "Manobra de Homem ao Mar",
    "subsection": "Manobra com uma embarcação à vela",
    "page": 24,
    "definition": "Virar de bordo, aproximando a proa da linha do vento até estar amurado no bordo oposto.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "virando-em-roda",
      "manobra-de-homem-ao-mar",
      "orcar",
      "arribar"
    ]
  },
  {
    "id": "no",
    "term": "Nó",
    "category": "navegacao-agulhas",
    "section": "Determinação de Velocidade e Distância",
    "subsection": "Unidade de velocidade e distância",
    "page": 26,
    "definition": "Em navegação, a unidade de velocidade é o Nó, ou seja, uma milha marítima por hora.",
    "importance": "essencial",
    "examTip": "1 Nó = 1 Milha Marítima por hora. Nunca dizer \"nós por hora\".",
    "relatedTerms": [
      "milha-maritima",
      "odometro",
      "barquinha",
      "tabela-de-rotacoes"
    ]
  },
  {
    "id": "milha-maritima",
    "term": "Milha marítima",
    "category": "navegacao-agulhas",
    "section": "Determinação de Velocidade e Distância",
    "subsection": "Unidade de velocidade e distância",
    "page": 26,
    "definition": "A unidade de distância é a Milha marítima, que representa 1852 metros.",
    "synonyms": [
      "Milha náutica"
    ],
    "importance": "essencial",
    "examTip": "Valor exato obrigatório em exame: 1852 metros.",
    "relatedTerms": [
      "no",
      "odometro",
      "barquinha",
      "tabela-de-rotacoes"
    ]
  },
  {
    "id": "odometro",
    "term": "Odómetro",
    "category": "navegacao-agulhas",
    "section": "Determinação de Velocidade e Distância",
    "subsection": "Unidade de velocidade e distância",
    "page": 26,
    "definition": "Aparelho para medir a velocidade e distância percorrida.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "barquinha",
      "no",
      "milha-maritima",
      "tabela-de-rotacoes"
    ]
  },
  {
    "id": "barquinha",
    "term": "Barquinha (ou Baroa)",
    "category": "navegacao-agulhas",
    "section": "Determinação de Velocidade e Distância",
    "subsection": "Unidade de velocidade e distância",
    "page": 26,
    "definition": "Aparelho clássico e obsoleto de medir a velocidade por meio de uma tábua (baroa ou barquinha) e linha com nós.",
    "synonyms": [
      "Baroa"
    ],
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "odometro",
      "no",
      "milha-maritima"
    ]
  },
  {
    "id": "tabela-de-rotacoes",
    "term": "Tabela de rotações",
    "category": "navegacao-agulhas",
    "section": "Determinação de Velocidade e Distância",
    "subsection": "Unidade de velocidade e distância",
    "page": 26,
    "definition": "Tabela em cada navio que indica a velocidade correspondente aos vários regimes de rotações das máquinas de propulsão.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "no",
      "milha-maritima",
      "odometro"
    ]
  },
  {
    "id": "mares",
    "term": "Marés",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Ciclo de marés",
    "page": 27,
    "definition": "As águas do mar têm movimentos oscilatórios verticais denominados marés, que se produzem em Portugal duas vezes por cada período de 24 horas e 48 minutos. As marés são causadas pela atracção exercida sobre os mares pela Lua e pelo Sol.",
    "importance": "essencial",
    "examTip": "Período completo de marés em Portugal: 24 horas e 48 minutos (2 preia-mares e 2 baixa-mares).",
    "relatedTerms": [
      "mes-lunar",
      "idade-da-lua",
      "mares-vivas",
      "mares-mortas",
      "preia-mar",
      "baixa-mar"
    ]
  },
  {
    "id": "mes-lunar",
    "term": "Mês lunar (ou Lunação)",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Ciclo de marés",
    "page": 27,
    "definition": "A Lua passa pelas quatro fases durante o mês lunar ou lunação, que tem cerca de 29,5 dias e define-se como um intervalo de tempo entre duas Luas Novas consecutivas.",
    "synonyms": [
      "Lunação"
    ],
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "idade-da-lua",
      "mares",
      "mares-vivas",
      "mares-mortas"
    ]
  },
  {
    "id": "idade-da-lua",
    "term": "Idade da Lua",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Ciclo de marés",
    "page": 27,
    "definition": "Chama-se idade da Lua num dado momento, ao número de dias decorrido desde a última Lua Nova até esse momento.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "mes-lunar",
      "mares-vivas",
      "mares-mortas",
      "mares"
    ]
  },
  {
    "id": "mares-vivas",
    "term": "Marés Vivas",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Marés Vivas e Marés Mortas",
    "page": 27,
    "definition": "Em ocasião de Lua Nova ou Lua Cheia, quando o Sol, a Lua e a Terra se encontram situadas sobre uma linha recta, somam-se as acções da Lua e do Sol, causando marés maiores, que se denominam Marés Vivas.",
    "synonyms": [
      "Marés de sizígia"
    ],
    "importance": "essencial",
    "examTip": "Marés Vivas ocorrem na Lua Nova e Lua Cheia (forças do Sol e da Lua somam-se em linha reta).",
    "relatedTerms": [
      "mares-mortas",
      "amplitude-da-mare",
      "preia-mar",
      "baixa-mar",
      "mes-lunar"
    ]
  },
  {
    "id": "mares-mortas",
    "term": "Marés Mortas",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Marés Vivas e Marés Mortas",
    "page": 27,
    "definition": "Quando no Quarto Crescente ou Quarto Minguante, estando a Lua em posição tal que as forças da Terra, Sol e Lua são opostas, dão-se as menores marés denominando-se Marés Mortas.",
    "synonyms": [
      "Marés de quadratura"
    ],
    "importance": "essencial",
    "examTip": "Marés Mortas ocorrem no Quarto Crescente e Quarto Minguante.",
    "relatedTerms": [
      "mares-vivas",
      "amplitude-da-mare",
      "preia-mar",
      "baixa-mar",
      "mes-lunar"
    ]
  },
  {
    "id": "zero-hidrografico",
    "term": "Zero Hidrográfico (Z.H.)",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Zero Hidrográfico",
    "page": 27,
    "definition": "Dá-se o nome de Zero Hidrográfico ao plano a que são referidas as sondas indicadas nas cartas hidrográficas e as alturas de água que figuram na tabela de marés. Corresponde ao nível dos máximos baixa-mares.",
    "synonyms": [
      "Z.H."
    ],
    "importance": "essencial",
    "examTip": "As cartas de navegação portuguesas referem as suas sondas ao Zero Hidrográfico (nível das maiores baixa-mares).",
    "relatedTerms": [
      "sonda-reduzida",
      "sonda-a-hora",
      "baixa-mar",
      "preia-mar",
      "altura-da-mare"
    ]
  },
  {
    "id": "sonda-reduzida",
    "term": "Sonda reduzida",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Elementos da maré",
    "page": 28,
    "definition": "É a profundidade anotada, expressa por um número que indica a altura da água do fundo do mar até ao zero hidrográfico e por uma ou mais letras que indicam a natureza desse mesmo fundo. Expressa em metros nas cartas portuguesas.",
    "synonyms": [
      "Sr"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "sonda-a-hora",
      "zero-hidrografico",
      "altura-da-mare",
      "baixa-mar"
    ]
  },
  {
    "id": "sonda-a-hora",
    "term": "Sonda à hora",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Elementos da maré",
    "page": 28,
    "definition": "É a altura da maré mais a sonda reduzida. Fórmula: Sh = Am + Sr.",
    "synonyms": [
      "Sh"
    ],
    "importance": "essencial",
    "examTip": "Fórmula fundamental no exame: Sh = Am + Sr (Sonda à hora = Altura da maré + Sonda reduzida).",
    "relatedTerms": [
      "sonda-reduzida",
      "altura-da-mare",
      "zero-hidrografico",
      "calado"
    ]
  },
  {
    "id": "preia-mar",
    "term": "Preia-mar",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Elementos da maré",
    "page": 28,
    "definition": "Quando o nível da água se eleva, diz-se que a maré sobe ou enche, a maior altura da maré denomina-se maré cheia ou preia-mar.",
    "synonyms": [
      "Maré cheia",
      "PM"
    ],
    "importance": "essencial",
    "examTip": "Conceito chave nas cartas náuticas portuguesas: as sondas da carta são referidas ao Zero Hidrográfico.",
    "relatedTerms": [
      "baixa-mar",
      "amplitude-da-mare",
      "altura-da-mare",
      "estofo-da-mare",
      "sonda-a-hora"
    ]
  },
  {
    "id": "baixa-mar",
    "term": "Baixa-mar",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Elementos da maré",
    "page": 28,
    "definition": "Quando o nível da água baixa, a maré desce ou vaza, ao nível mais baixo da maré dá-se o nome de maré vazia ou baixa-mar.",
    "synonyms": [
      "Maré vazia",
      "BM"
    ],
    "importance": "essencial",
    "examTip": "Conceito chave nas cartas náuticas portuguesas: as sondas da carta são referidas ao Zero Hidrográfico.",
    "relatedTerms": [
      "preia-mar",
      "zero-hidrografico",
      "amplitude-da-mare",
      "sonda-reduzida",
      "estofo-da-mare"
    ]
  },
  {
    "id": "amplitude-da-mare",
    "term": "Amplitude da maré",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Elementos da maré",
    "page": 28,
    "definition": "É a diferença entre os níveis da água da preia-mar (ou baixa-mar) e uma baixa-mar (ou preia-mar) antecedente ou seguinte.",
    "importance": "essencial",
    "examTip": "Conceito chave nas cartas náuticas portuguesas: as sondas da carta são referidas ao Zero Hidrográfico.",
    "relatedTerms": [
      "altura-da-mare",
      "preia-mar",
      "baixa-mar",
      "mares-vivas",
      "mares-mortas"
    ]
  },
  {
    "id": "altura-da-mare",
    "term": "Altura da maré",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Elementos da maré",
    "page": 28,
    "definition": "É a altura da água em determinado momento, sobre o plano do zero hidrográfico.",
    "synonyms": [
      "Am"
    ],
    "importance": "essencial",
    "examTip": "Conceito chave nas cartas náuticas portuguesas: as sondas da carta são referidas ao Zero Hidrográfico.",
    "relatedTerms": [
      "amplitude-da-mare",
      "sonda-a-hora",
      "preia-mar",
      "tabela-de-mares"
    ]
  },
  {
    "id": "estofo-da-mare",
    "term": "Estofo da maré",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Elementos da maré",
    "page": 28,
    "definition": "É o momento em que o nível da superfície da água está imobilizado na Preia-mar e na Baixa-mar.",
    "synonyms": [
      "Repouso da maré"
    ],
    "importance": "essencial",
    "examTip": "Estofo da maré é o momento em que a água para de subir ou descer.",
    "relatedTerms": [
      "preia-mar",
      "baixa-mar",
      "mares",
      "altura-da-mare"
    ]
  },
  {
    "id": "tabela-de-mares",
    "term": "Tabela de marés",
    "category": "meteorologia-mares",
    "section": "Marés",
    "subsection": "Tabela de marés",
    "page": 28,
    "definition": "Editada todos os anos pelo Instituto Hidrográfico onde constam as horas do nascimento e ocaso do sol, preia-mares, baixa-mares, altura da água e amplitude para os principais portos.",
    "importance": "importante",
    "examTip": "As horas da tabela são referidas ao Tempo Universal (fuso zero). No horário de verão em Portugal deve somar-se 1 hora!",
    "relatedTerms": [
      "altura-da-mare",
      "preia-mar",
      "baixa-mar",
      "zero-hidrografico",
      "mes-lunar"
    ]
  },
  {
    "id": "escala-beaufort",
    "term": "Escala Beaufort",
    "category": "meteorologia-mares",
    "section": "Segurança no Mar",
    "subsection": "Previsão meteorológica",
    "page": 30,
    "definition": "Escala empírica para avaliar a força e velocidade do vento e os seus efeitos observados no mar e em terra (de 0 a 12).",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "escala-douglas",
      "correr-com-o-tempo",
      "navegar-aproado-ao-tempo",
      "afocinhar",
      "pressao-atmosferica"
    ]
  },
  {
    "id": "escala-douglas",
    "term": "Escala de Douglas",
    "category": "meteorologia-mares",
    "section": "Segurança no Mar",
    "subsection": "Previsão meteorológica",
    "page": 30,
    "definition": "Escala que classifica o estado de agitação da superfície do mar em função da altura das vagas.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "escala-beaufort",
      "afocinhar",
      "correr-com-o-tempo",
      "navegar-aproado-ao-tempo"
    ]
  },
  {
    "id": "navegar-aproado-ao-tempo",
    "term": "Navegar aproado ao tempo",
    "category": "seguranca-salvamento",
    "section": "Navegação com Mau Tempo",
    "subsection": "Conselhos úteis de navegação com mau tempo",
    "page": 31,
    "definition": "Navegar aproado significa apontar a proa, ou as amuras, na direcção de onde vêm as vagas e o vento durante a tempestade. A velocidade deve ser reduzida de maneira que a embarcação não bata com violência na vaga e mantenha o governo.",
    "importance": "essencial",
    "examTip": "Em caso de mau tempo: correr com o tempo ou colocar as amuras à vaga com velocidade reduzida ao mínimo de segurança para governar.",
    "relatedTerms": [
      "correr-com-o-tempo",
      "afocinhar",
      "rizar-a-vela-grande",
      "escala-douglas",
      "escala-beaufort"
    ]
  },
  {
    "id": "correr-com-o-tempo",
    "term": "Correr com o tempo",
    "category": "seguranca-salvamento",
    "section": "Navegação com Mau Tempo",
    "subsection": "Conselhos úteis de navegação com mau tempo",
    "page": 31,
    "definition": "Navegar na direcção da vaga e do vento. Devem ser tomados cuidados redobrados: velocidade muito lenta desgoverna a embarcação e mete água pela popa; velocidade exagerada pode fazê-la afocinhar.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "navegar-aproado-ao-tempo",
      "afocinhar",
      "rizar-a-vela-grande",
      "escala-douglas",
      "ancora-flutuante"
    ]
  },
  {
    "id": "afocinhar",
    "term": "Afocinhar",
    "category": "seguranca-salvamento",
    "section": "Navegação com Mau Tempo",
    "subsection": "Conselhos úteis de navegação com mau tempo",
    "page": 31,
    "definition": "Mergulho perigoso da proa na vaga quando a velocidade é exagerada a correr com o tempo, desgovernando e podendo capotar a embarcação.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "navegar-aproado-ao-tempo",
      "correr-com-o-tempo",
      "estabilidade",
      "escala-douglas"
    ]
  },
  {
    "id": "rizar-a-vela-grande",
    "term": "Rizar a vela grande",
    "category": "seguranca-salvamento",
    "section": "Navegação com Mau Tempo",
    "subsection": "Conselhos úteis de navegação com mau tempo",
    "page": 31,
    "definition": "Reduzir a área de pano da vela grande e recolher o restante pano para diminuir a força exercida pelo vento forte.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "navegar-aproado-ao-tempo",
      "correr-com-o-tempo",
      "escala-beaufort",
      "testa-da-vela"
    ]
  },
  {
    "id": "meteorologia",
    "term": "Meteorologia",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Conceitos gerais",
    "page": 32,
    "definition": "A meteorologia é uma das ciências que estudam a atmosfera terrestre, que tem como objecto o estudo dos fenómenos atmosféricos e a previsão do tempo.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "troposfera",
      "pressao-atmosferica",
      "isobaras",
      "anticiclones",
      "depressoes",
      "escala-beaufort"
    ]
  },
  {
    "id": "troposfera",
    "term": "Troposfera",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Atmosfera",
    "page": 32,
    "definition": "Camada da atmosfera onde ocorrem os fenómenos atmosféricos.",
    "importance": "essencial",
    "examTip": "Os fenómenos atmosféricos ocorrem na troposfera.",
    "relatedTerms": [
      "meteorologia",
      "pressao-atmosferica",
      "depressoes",
      "anticiclones"
    ]
  },
  {
    "id": "pressao-atmosferica",
    "term": "Pressão atmosférica",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Pressão atmosférica",
    "page": 32,
    "definition": "O ar exerce uma força descendente por influência da gravidade (pressão atmosférica), que é medida em Hectopascal (hPa). A pressão média ao nível do mar é de 1013 hectopascais.",
    "importance": "essencial",
    "examTip": "Pressão média normal ao nível do mar: 1013 hPa.",
    "relatedTerms": [
      "isobaras",
      "anticiclones",
      "depressoes",
      "meteorologia"
    ]
  },
  {
    "id": "isobaras",
    "term": "Isóbaras",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Cartas meteorológicas",
    "page": 32,
    "definition": "Linhas nas Cartas Meteorológicas ao longo das quais a pressão é sempre igual. Quanto mais próximas estão as isóbaras, mais fortes são os ventos.",
    "importance": "essencial",
    "examTip": "Isóbaras muito juntas = vento forte / gradiente elevado.",
    "relatedTerms": [
      "pressao-atmosferica",
      "anticiclones",
      "depressoes",
      "meteorologia"
    ]
  },
  {
    "id": "anticiclones",
    "term": "Anticiclones",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Sistemas de pressão",
    "page": 32,
    "definition": "Zonas de Altas Pressões (A ou H) cercadas por isóbaras onde o ar frio desce, associadas geralmente a bom tempo.",
    "synonyms": [
      "Altas Pressões"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "depressoes",
      "isobaras",
      "pressao-atmosferica",
      "brisa-maritima"
    ]
  },
  {
    "id": "depressoes",
    "term": "Depressões",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Sistemas de pressão",
    "page": 32,
    "definition": "Zonas de Baixas Pressões (L ou B) onde o ar quente sobe, provocando condensação, nuvens e vento.",
    "synonyms": [
      "Baixas Pressões"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "anticiclones",
      "isobaras",
      "pressao-atmosferica",
      "nuvem-cumulonimbus",
      "escala-beaufort"
    ]
  },
  {
    "id": "brisa-maritima",
    "term": "Brisa Marítima",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Ventos locais",
    "page": 32,
    "definition": "Vento de pouca intensidade causado pelo desigual aquecimento da terra e do mar, que sopra do mar para terra durante o dia.",
    "importance": "essencial",
    "examTip": "Brisa marítima sopra do mar para terra durante o dia.",
    "relatedTerms": [
      "brisa-terrestre",
      "barlavento",
      "sotavento",
      "anticiclones"
    ]
  },
  {
    "id": "brisa-terrestre",
    "term": "Brisa Terrestre",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Ventos locais",
    "page": 32,
    "definition": "Vento que sopra de terra para o mar durante a noite devido ao arrefecimento da terra.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "brisa-maritima",
      "barlavento",
      "sotavento",
      "anticiclones"
    ]
  },
  {
    "id": "nuvem-cirrus",
    "term": "Cirrus (Ci)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens altas",
    "page": 35,
    "definition": "São as nuvens altas mais comuns. São finas e compridas e formam-se no topo da troposfera. Formam estruturas alongadas e a sua presença é normalmente indicadora de bom tempo.",
    "importance": "importante",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-cirrocumulus",
      "nuvem-cirrostratus",
      "depressoes"
    ]
  },
  {
    "id": "nuvem-cirrocumulus",
    "term": "Cirrocumulus (Cc)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens altas",
    "page": 35,
    "definition": "Nuvens altas que aparecem como pequenos puffs, redondos e brancos, individualmente ou em longas fileiras.",
    "importance": "importante",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-cirrus",
      "nuvem-cirrostratus",
      "nuvem-altocumulus"
    ]
  },
  {
    "id": "nuvem-cirrostratus",
    "term": "Cirrostratus (Cs)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens altas",
    "page": 35,
    "definition": "Nuvens finas que cobrem a totalidade do céu dando origem a halos solares/lunares. Na aproximação de tempestade surgem muito frequentemente, dando uma pista para previsão de chuva em 12-24h.",
    "importance": "essencial",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-cirrus",
      "nuvem-cirrocumulus",
      "nuvem-altostratus"
    ]
  },
  {
    "id": "nuvem-altocumulus",
    "term": "Altocumulus (Ac)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens médias",
    "page": 36,
    "definition": "Nuvens médias compostas na maioria por gotículas de água em forma de pequenos tufos de algodão com um dos lados mais escuro; numa manhã quente de verão podem ser sinal de trovoada à tarde.",
    "importance": "importante",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-altostratus",
      "nuvem-cirrocumulus",
      "nuvem-stratocumulus"
    ]
  },
  {
    "id": "nuvem-altostratus",
    "term": "Altostratus (As)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens médias",
    "page": 36,
    "definition": "Nuvens médias espessas cobrindo todo o céu, tornando o Sol muito ténue sem formação de halos e sem produzir sombras no chão.",
    "importance": "importante",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-altocumulus",
      "nuvem-cirrostratus",
      "nuvem-nimbostratus"
    ]
  },
  {
    "id": "nuvem-nimbostratus",
    "term": "Nimbostratus (Ns)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens baixas",
    "page": 37,
    "definition": "Nuvens baixas, escuras. Estão associados aos períodos de chuva contínua (de intensidade fraca a moderada), nunca se vendo o Sol através delas.",
    "importance": "essencial",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-stratus",
      "nuvem-cumulonimbus",
      "nuvem-altostratus",
      "depressoes"
    ]
  },
  {
    "id": "nuvem-stratocumulus",
    "term": "Stratocumulus (Sc)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens baixas",
    "page": 37,
    "definition": "Nuvens baixas em filas ou agrupadas, com céu azul visível nos intervalos entre elas; raramente provocam precipitação.",
    "importance": "importante",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-stratus",
      "nuvem-altocumulus",
      "nuvem-cumulus"
    ]
  },
  {
    "id": "nuvem-stratus",
    "term": "Stratus (St)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens baixas",
    "page": 37,
    "definition": "Camada uniforme de nuvens que habitualmente cobre todo o céu e lembra um nevoeiro que não chega a tocar no chão; precipitação se ocorrer é sob a forma de chuvisco.",
    "importance": "importante",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-nimbostratus",
      "nuvem-stratocumulus",
      "depressoes"
    ]
  },
  {
    "id": "nuvem-cumulus",
    "term": "Cumulus (Cu)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens com desenvolvimento vertical",
    "page": 38,
    "definition": "Nuvens vulgares em forma de bocado de algodão com topo arredondado; normalmente chamadas cumulus de bom tempo por surgirem associadas a dias soalheiros.",
    "importance": "essencial",
    "examTip": "A identificação do tipo de nuvens permite antecipar frentes frias, frentes quentes e trovoadas.",
    "relatedTerms": [
      "nuvem-cumulonimbus",
      "nuvem-stratocumulus",
      "brisa-maritima"
    ]
  },
  {
    "id": "nuvem-cumulonimbus",
    "term": "Cumulonimbus (Cb)",
    "category": "meteorologia-mares",
    "section": "Meteorologia",
    "subsection": "Nuvens com desenvolvimento vertical",
    "page": 38,
    "definition": "Nuvens de tempestade com topo em forma de bigorna que se estendem desde os 600m até 12 000m, onde ocorrem trovoadas, aguaceiros fortes, granizo e ventanias.",
    "importance": "essencial",
    "examTip": "Cumulonimbus = nuvem de trovoada e tempestade em forma de bigorna.",
    "relatedTerms": [
      "nuvem-cumulus",
      "nuvem-nimbostratus",
      "depressoes",
      "escala-beaufort"
    ]
  },
  {
    "id": "unidade-propulsora",
    "term": "Unidade Propulsora",
    "category": "nomenclatura-geral",
    "section": "Cuidados com a Unidade Propulsora",
    "subsection": "Propulsão",
    "page": 39,
    "definition": "Unidade que permite que a embarcação se desloque na água: remos, motor ou velas.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "macho-de-fundo",
      "motor-fora-de-borda",
      "efeito-lateral-dos-helices",
      "helice-de-passo-direito"
    ]
  },
  {
    "id": "triangulo-do-fogo",
    "term": "Triângulo do fogo",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Teoria do fogo",
    "page": 39,
    "definition": "Representação dos três elementos necessários para iniciar uma combustão: combustível, comburente e calor (temperatura de ignição). Eliminando um destes componentes consegue-se eliminar o fogo.",
    "importance": "essencial",
    "examTip": "Os 3 lados do triângulo do fogo: Combustível, Comburente (oxigénio) e Calor.",
    "relatedTerms": [
      "combustivel",
      "comburente",
      "temperatura-de-ignicao",
      "extintores-po-quimico"
    ]
  },
  {
    "id": "combustivel",
    "term": "Combustível",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Teoria do fogo",
    "page": 39,
    "definition": "É tudo o que é suscetível de entrar em combustão (madeira, papel, pano, estopa, tinta, gasolina, gasóleo, gás, etc.).",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "comburente",
      "temperatura-de-ignicao",
      "triangulo-do-fogo",
      "abafamento"
    ]
  },
  {
    "id": "comburente",
    "term": "Comburente",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Teoria do fogo",
    "page": 39,
    "definition": "É todo o elemento que, associando-se quimicamente ao combustível, é capaz de fazê-lo entrar em combustão (o oxigénio é o principal comburente).",
    "importance": "essencial",
    "examTip": "O oxigénio é o principal comburente.",
    "relatedTerms": [
      "combustivel",
      "temperatura-de-ignicao",
      "triangulo-do-fogo",
      "asfixia"
    ]
  },
  {
    "id": "temperatura-de-ignicao",
    "term": "Temperatura de Ignição",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Teoria do fogo",
    "page": 39,
    "definition": "É a temperatura acima da qual um combustível pode queimar.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "triangulo-do-fogo",
      "combustivel",
      "comburente",
      "arrefecimento"
    ]
  },
  {
    "id": "extintores-po-quimico",
    "term": "Extintores de pó seco ou químico",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Meios de Extinção",
    "page": 42,
    "definition": "Meio de combate a incêndios recomendado para embarcações de recreio, eficiente em todos os tipos de incêndio. Aponte para a base das chamas em disparos curtos.",
    "synonyms": [
      "Extintor de pó seco"
    ],
    "importance": "essencial",
    "examTip": "Combate ao fogo: atuar na base da chama e saber que a água nunca se utiliza em fogos elétricos ou de combustível líquido.",
    "relatedTerms": [
      "triangulo-do-fogo",
      "abafamento",
      "arrefecimento",
      "inibicao"
    ]
  },
  {
    "id": "asfixia",
    "term": "Asfixia",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Métodos de extinção",
    "page": 43,
    "definition": "Impedir a renovação de ar pelo consumo do comburente.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "abafamento",
      "comburente",
      "triangulo-do-fogo",
      "extintores-po-quimico"
    ]
  },
  {
    "id": "abafamento",
    "term": "Abafamento",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Métodos de extinção",
    "page": 43,
    "definition": "Impedir a renovação de ar por acção exterior (ex.: cobertores, tampas, espumas).",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "asfixia",
      "arrefecimento",
      "inibicao",
      "triangulo-do-fogo"
    ]
  },
  {
    "id": "arrefecimento",
    "term": "Arrefecimento",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Métodos de extinção",
    "page": 43,
    "definition": "Eliminação da energia libertada em forma de calor por abaixamento de temperatura.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "temperatura-de-ignicao",
      "abafamento",
      "triangulo-do-fogo"
    ]
  },
  {
    "id": "inibicao",
    "term": "Inibição",
    "category": "seguranca-salvamento",
    "section": "Prevenção e Combate a Incêndios",
    "subsection": "Métodos de extinção",
    "page": 43,
    "definition": "É a ruptura da reacção em cadeia dos elementos da combustão.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "abafamento",
      "arrefecimento",
      "extintores-po-quimico",
      "temperatura-de-ignicao"
    ]
  },
  {
    "id": "hipotermia",
    "term": "Hipotermia",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "Hipotermia",
    "page": 44,
    "definition": "Descida de temperatura para menos de 35 graus centígrados. Provoca sonolência, diminuição do ritmo respiratório e cardíaco e pode causar perda de consciência e morte. Deve-se cobrir a cabeça e corpo, pois perde-se até 20% de calor pela cabeça.",
    "importance": "essencial",
    "examTip": "Hipotermia = temperatura corporal abaixo de 35 ºC. Até 20% do calor perde-se pela cabeça.",
    "relatedTerms": [
      "manobra-de-homem-ao-mar",
      "pls",
      "rcp",
      "hidrocussao",
      "balsa-salvacao"
    ]
  },
  {
    "id": "insolacao",
    "term": "Insolação",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "Insolação",
    "page": 44,
    "definition": "Exposição prolongada do crânio ao sol (inverso de hipotermia). Provoca dores de cabeça, face vermelha, vómitos, delírio e temperatura até aos 42 graus. Tratamento: sombra, desapertar roupa, pensos frios na testa, não dar nada a beber.",
    "importance": "essencial",
    "examTip": "Prioridade de socorro: garantir suporte básico de vida, aquecimento da vítima e alertar as autoridades marítimas.",
    "relatedTerms": [
      "golpe-de-calor",
      "hidrocussao",
      "hipotermia"
    ]
  },
  {
    "id": "golpe-de-calor",
    "term": "Golpe de calor",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "Golpe de calor",
    "page": 44,
    "definition": "Sobreaquecimento causado pela dificuldade de evaporação, por ventilação inadequada do local ou roupas não porosas em ambiente quente e húmido.",
    "importance": "importante",
    "examTip": "Prioridade de socorro: garantir suporte básico de vida, aquecimento da vítima e alertar as autoridades marítimas.",
    "relatedTerms": [
      "insolacao",
      "hidrocussao",
      "paragem-da-digestao"
    ]
  },
  {
    "id": "hidrocussao",
    "term": "Hidrocussão",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "Hidrocussão",
    "page": 45,
    "definition": "Estado de síncope ou paragem das funções vitais devido à alteração brusca da temperatura que o corpo sofre em consequência da imersão súbita na água fria. Também se denomina choque termo-diferencial ou asfixia por inibição.",
    "synonyms": [
      "Choque termo-diferencial"
    ],
    "importance": "essencial",
    "examTip": "Prioridade de socorro: garantir suporte básico de vida, aquecimento da vítima e alertar as autoridades marítimas.",
    "relatedTerms": [
      "hipotermia",
      "paragem-da-digestao",
      "manobra-de-homem-ao-mar",
      "golpe-de-calor"
    ]
  },
  {
    "id": "paragem-da-digestao",
    "term": "Paragem da digestão",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "Paragem da digestão",
    "page": 45,
    "definition": "Interrupção no processo digestivo com rigidez abdominal, palidez, pulso fraco, vómitos, desmaios e câimbras. Primeiros socorros: colocar a vítima em P.L.S.",
    "synonyms": [
      "Congestão"
    ],
    "importance": "importante",
    "examTip": "Prioridade de socorro: garantir suporte básico de vida, aquecimento da vítima e alertar as autoridades marítimas.",
    "relatedTerms": [
      "hidrocussao",
      "hipotermia",
      "pls"
    ]
  },
  {
    "id": "hemorragia",
    "term": "Hemorragia",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "Hemorragia",
    "page": 45,
    "definition": "Perda de sangue externa visível ou interna. Primeiros socorros para externa: compressão manual directa com penso. Nunca limpar ferida com água oxigenada, mas sim com soro fisiológico ou água.",
    "importance": "essencial",
    "examTip": "Prioridade de socorro: garantir suporte básico de vida, aquecimento da vítima e alertar as autoridades marítimas.",
    "relatedTerms": [
      "pls",
      "rcp",
      "hipotermia"
    ]
  },
  {
    "id": "pls",
    "term": "P.L.S. (Posição Lateral de Segurança)",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "P.l.s.",
    "page": 46,
    "definition": "Posição lateral de segurança, aplica-se a sinistrados que respirem e estejam inconscientes para garantir estabilidade, permeabilidade da via aérea e drenagem de fluidos.",
    "synonyms": [
      "Posição lateral de segurança"
    ],
    "importance": "essencial",
    "examTip": "A P.L.S. aplica-se a vítimas inconscientes MAS QUE RESPIRAM.",
    "relatedTerms": [
      "rcp",
      "hipotermia",
      "manobra-de-homem-ao-mar",
      "mayday-socorro",
      "paragem-da-digestao"
    ]
  },
  {
    "id": "rcp",
    "term": "R.C.P. (Ressuscitação cardiopulmonar)",
    "category": "seguranca-salvamento",
    "section": "Socorrismo",
    "subsection": "R.c.p.",
    "page": 46,
    "definition": "Ressuscitação cardiopulmonar, aplica-se a sinistrados que NÃO respirem e estejam inconscientes, com compressões cardíacas no esterno e insuflações.",
    "synonyms": [
      "Ressuscitação cardiopulmonar"
    ],
    "importance": "essencial",
    "examTip": "A R.C.P. só se aplica se a vítima NÃO respira e não tem sinais de circulação.",
    "relatedTerms": [
      "pls",
      "hipotermia",
      "mayday-socorro"
    ]
  },
  {
    "id": "mayday-socorro",
    "term": "Mayday",
    "category": "comunicacoes-vhf",
    "section": "Socorrismo",
    "subsection": "Cuidados a ter com o náufrago e como efectuar o salvamento",
    "page": 48,
    "definition": "Pedido radiotelefónico internacional de socorro emitido em canal 16 VHF três vezes seguidas (\"MAYDAY MAYDAY MAYDAY\") com localização, nome do barco e situação de perigo.",
    "importance": "essencial",
    "examTip": "Prioridade de socorro: garantir suporte básico de vida, aquecimento da vítima e alertar as autoridades marítimas.",
    "relatedTerms": [
      "navtex",
      "manobra-de-homem-ao-mar",
      "balsa-salvacao",
      "pls"
    ]
  },
  {
    "id": "planeamento-de-viagem",
    "term": "Planeamento de viagem",
    "category": "nomenclatura-geral",
    "section": "Planeamento de Viagem",
    "subsection": "Factores de planeamento",
    "page": 49,
    "definition": "Dure a viagem quinze dias ou trinta minutos, tem de ser feito previamente tendo em conta porto de destino, portos de escala, condições meteorológicas, marés, ajudas à navegação e saúde pessoal.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "meteorologia",
      "mares",
      "tabela-de-mares",
      "escala-beaufort",
      "navtex"
    ]
  },
  {
    "id": "macho-de-fundo",
    "term": "Macho de fundo",
    "category": "manobras-propulsao",
    "section": "Motores",
    "subsection": "Procedimentos de motores a gasóleo",
    "page": 50,
    "definition": "Válvula no casco da embarcação para abrir a entrada de água do sistema de arrefecimento do motor.",
    "importance": "essencial",
    "examTip": "Antes de ligar o motor marítimo, é obrigatório verificar se o macho de fundo está aberto para circulação da água de refrigeração.",
    "relatedTerms": [
      "unidade-propulsora",
      "motor-fora-de-borda",
      "estanquicidade"
    ]
  },
  {
    "id": "motor-fora-de-borda",
    "term": "Motor fora de borda",
    "category": "manobras-propulsao",
    "section": "Motores",
    "subsection": "Motores a gasolina",
    "page": 50,
    "definition": "Unidade propulsora autónoma instalada no painel de popa da embarcação. Causas quando não arranca: falta de combustível, tubo desapertado, filtro obstruído e velas em mau estado.",
    "importance": "essencial",
    "examTip": "Antes de arrancar com o motor, verificar sempre água de refrigeração (macho de fundo), nível de óleo e combustível.",
    "relatedTerms": [
      "macho-de-fundo",
      "unidade-propulsora",
      "combustivel",
      "embarcacao-de-recreio"
    ]
  },
  {
    "id": "preservacao-do-meio-ambiente-marinho",
    "term": "Preservação do meio ambiente marinho",
    "category": "nomenclatura-geral",
    "section": "Preservação do Meio Ambiente Marinho",
    "subsection": "Proteção ambiental",
    "page": 50,
    "definition": "Proibição de despejos pela borda fora de detritos, plásticos, produtos químicos, óleos ou águas residuais poluídas. Devem ser guardados em sacos e contentores estanques para colocação em terra.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "combustivel",
      "motor-fora-de-borda",
      "embarcacao-de-recreio"
    ]
  },
  {
    "id": "rieam",
    "term": "R.I.E.A.M.",
    "category": "regras-ripam",
    "section": "R.I.E.A.M. (Regras de Navegação)",
    "subsection": "Regulamento e regras gerais",
    "page": 51,
    "definition": "Regulamento Internacional para Evitar Abalroamentos no Mar. Todas as manobras decididas pela aplicação das regras devem ser executadas francamente e com suficiente antecedência.",
    "synonyms": [
      "RIPAM",
      "RIPEAM"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "risco-de-abalroamento",
      "situacao-de-roda-a-roda",
      "situacao-de-rumos-cruzados",
      "navio-que-alcanca",
      "sinais-sonoros-manobra"
    ]
  },
  {
    "id": "risco-de-abalroamento",
    "term": "Risco de abalroamento",
    "category": "regras-ripam",
    "section": "R.I.E.A.M. (Regras de Navegação)",
    "subsection": "Regras de Manobras e navegação",
    "page": 54,
    "definition": "Há risco de abalroamento quando a marcação de um navio que se aproxima se mantém e a distância diminui.",
    "importance": "essencial",
    "examTip": "REGRA FUNDAMENTAL: Se a marcação se mantém constante e a distância diminui, há risco de abalroamento!",
    "relatedTerms": [
      "situacao-de-roda-a-roda",
      "situacao-de-rumos-cruzados",
      "navio-que-alcanca",
      "rieam",
      "sinais-sonoros-manobra"
    ]
  },
  {
    "id": "situacao-de-roda-a-roda",
    "term": "Situação de roda a roda",
    "category": "regras-ripam",
    "section": "R.I.E.A.M. (Regras de Navegação)",
    "subsection": "Regra 14",
    "page": 52,
    "definition": "Navios de propulsão mecânica que se aproximam de roda a roda, ou quase de roda a roda, com risco de abalroamento. Ambos os navios deverão guinar para estibordo, indicando a manobra com um som curto.",
    "synonyms": [
      "Proa com proa"
    ],
    "importance": "essencial",
    "examTip": "Em roda a roda: AMBOS guinam para Estibordo com 1 apito curto.",
    "relatedTerms": [
      "situacao-de-rumos-cruzados",
      "navio-que-alcanca",
      "risco-de-abalroamento",
      "sinais-sonoros-manobra",
      "estibordo"
    ]
  },
  {
    "id": "situacao-de-rumos-cruzados",
    "term": "Situação de rumos cruzados",
    "category": "regras-ripam",
    "section": "R.I.E.A.M. (Regras de Navegação)",
    "subsection": "Regra 15",
    "page": 52,
    "definition": "O navio que vê outro navio por estibordo deve afastar-se do caminho deste e evitar cortar-lhe a proa.",
    "importance": "essencial",
    "examTip": "Regra de ouro: Quem vê o outro por Estibordo cede a passagem.",
    "relatedTerms": [
      "situacao-de-roda-a-roda",
      "navio-que-alcanca",
      "risco-de-abalroamento",
      "estibordo",
      "bombordo"
    ]
  },
  {
    "id": "navio-que-alcanca",
    "term": "Navio que alcança",
    "category": "regras-ripam",
    "section": "R.I.E.A.M. (Regras de Navegação)",
    "subsection": "Regras 13 e 16",
    "page": 54,
    "definition": "O navio vindo de uma direcção que fique mais de 22,5 graus para ré do través do navio alcançado deve desviar-se francamente do caminho deste. À noite considera-se navio que alcança se vê o farol de popa sem ver os faróis de borda.",
    "synonyms": [
      "Ultrapassagem"
    ],
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "situacao-de-rumos-cruzados",
      "situacao-de-roda-a-roda",
      "risco-de-abalroamento",
      "rieam"
    ]
  },
  {
    "id": "sinais-sonoros-manobra",
    "term": "Sinais sonoros para navios à vista",
    "category": "regras-ripam",
    "section": "R.I.E.A.M. (Regras de Navegação)",
    "subsection": "Regra 34",
    "page": 57,
    "definition": "1 som curto: estou a guinar para Estibordo; 2 sons curtos: estou a guinar para Bombordo; 3 sons curtos: as minhas máquinas estão trabalhando a ré; 5 ou mais sons curtos: não compreendo as intenções ou as manobras do outro navio para evitar o abalroamento.",
    "importance": "essencial",
    "examTip": "5 apitos curtos = sinal de dúvida / perigo (\"não compreendo as suas intenções\").",
    "relatedTerms": [
      "situacao-de-roda-a-roda",
      "situacao-de-rumos-cruzados",
      "risco-de-abalroamento",
      "rieam"
    ]
  },
  {
    "id": "baloes-de-navegacao",
    "term": "Balões",
    "category": "regras-ripam",
    "section": "Balões e Sinais Diurnos",
    "subsection": "Características dos balões nas embarcações",
    "page": 60,
    "definition": "Marcas geométricas de cor preta exibidas durante o dia pelas embarcações: balão esférico, balão cónico, balão cilíndrico e balão bicónico.",
    "importance": "essencial",
    "examTip": "As regras relativas a balões devem ser cumpridas de dia.",
    "relatedTerms": [
      "balao-esferico",
      "balao-conico",
      "balao-cilindrico",
      "balao-biconico",
      "rieam"
    ]
  },
  {
    "id": "balao-esferico",
    "term": "Balão esférico",
    "category": "regras-ripam",
    "section": "Balões e Sinais Diurnos",
    "subsection": "Características dos balões nas embarcações",
    "page": 60,
    "definition": "Balão preto esférico. 1 balão esférico = navio fundeado; 2 balões esféricos na vertical = navio desgovernado; 3 balões esféricos na vertical = navio encalhado.",
    "importance": "essencial",
    "examTip": "1 esfera = fundeado; 2 esferas = desgovernado; 3 esferas = encalhado.",
    "relatedTerms": [
      "balao-conico",
      "balao-cilindrico",
      "balao-biconico",
      "manobra-de-fundear",
      "baloes-de-navegacao"
    ]
  },
  {
    "id": "balao-conico",
    "term": "Balão cónico",
    "category": "regras-ripam",
    "section": "Balões e Sinais Diurnos",
    "subsection": "Regra 25",
    "page": 61,
    "definition": "Um navio a navegar à vela, quando seja propulsionado mecanicamente (a motor), deve mostrar a vante, onde melhor possa ser visto, um balão cónico com vértice para baixo.",
    "importance": "essencial",
    "examTip": "Cone com vértice para baixo = barco a navegar à vela e a motor.",
    "relatedTerms": [
      "balao-esferico",
      "balao-biconico",
      "balao-cilindrico",
      "baloes-de-navegacao"
    ]
  },
  {
    "id": "balao-cilindrico",
    "term": "Balão cilíndrico",
    "category": "regras-ripam",
    "section": "Balões e Sinais Diurnos",
    "subsection": "Regra 28",
    "page": 62,
    "definition": "Um navio condicionado pelo seu calado pode mostrar, onde melhor possa ser visto, um balão cilíndrico preto.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "balao-esferico",
      "balao-conico",
      "balao-biconico",
      "baloes-de-navegacao"
    ]
  },
  {
    "id": "balao-biconico",
    "term": "Balão bicónico",
    "category": "regras-ripam",
    "section": "Balões e Sinais Diurnos",
    "subsection": "Regra 24",
    "page": 60,
    "definition": "Dois cones pretos unidos pela base, exibido quando o comprimento do reboque for superior a 200 metros.",
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "balao-esferico",
      "balao-conico",
      "balao-cilindrico",
      "baloes-de-navegacao"
    ]
  },
  {
    "id": "sistema-de-balizagem-iala",
    "term": "Sistema de Balizagem AISM / IALA Região A",
    "category": "balizamento-iala",
    "section": "Sistema de Balizagem Marítima",
    "subsection": "AISM / IALA Região A",
    "page": 64,
    "definition": "Sistema internacional com 5 tipos de marcas. As marcas laterais referem-se à entrada dos portos, canais e rios. Portugal integra a Região A.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "marcas-laterais",
      "canal-principal",
      "marcas-cardeais",
      "perigo-isolado",
      "marcas-de-aguas-limpas",
      "marcas-especiais"
    ]
  },
  {
    "id": "marcas-laterais",
    "term": "Marcas Laterais",
    "category": "balizamento-iala",
    "section": "Sistema de Balizagem Marítima",
    "subsection": "Marcas Laterais",
    "page": 65,
    "definition": "Ao entrar num porto, subir um canal ou rio: dê bombordo às boias vermelhas (a sua numeração é sempre par, luz vermelha); dê estibordo às boias verdes (a sua numeração é sempre ímpar, luz verde).",
    "importance": "essencial",
    "examTip": "A entrar num porto em Portugal: Bombordo = Boia vermelha, número PAR; Estibordo = Boia verde, número ÍMPAR.",
    "relatedTerms": [
      "canal-principal",
      "sistema-de-balizagem-iala",
      "marcas-cardeais",
      "bombordo",
      "estibordo"
    ]
  },
  {
    "id": "canal-principal",
    "term": "Canal Principal",
    "category": "balizamento-iala",
    "section": "Sistema de Balizagem Marítima",
    "subsection": "Canal Principal",
    "page": 65,
    "definition": "Boias de bifurcação: boia vermelha com faixa verde indica canal preferencial a bombordo; boia verde com faixa vermelha indica canal preferencial a estibordo.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "marcas-laterais",
      "sistema-de-balizagem-iala",
      "marcas-cardeais"
    ]
  },
  {
    "id": "marcas-cardeais",
    "term": "Marcas Cardeais",
    "category": "balizamento-iala",
    "section": "Sistema de Balizagem Marítima",
    "subsection": "Marcas Cardeais",
    "page": 66,
    "definition": "Devemos passar a (N, S, W, E) segundo a respectiva boia cardinal de modo a evitar o perigo. Norte: cones para cima; Sul: cones para baixo; Este: cones unidos pelas bases; Oeste: cones unidos pelos vértices.",
    "importance": "essencial",
    "examTip": "Norte (cones para cima, luz contínua); Sul (cones para baixo, 6 relâmpagos + 1 longo); Este (cones pelas bases, 3 relâmpagos); Oeste (cones pelos vértices, 9 relâmpagos).",
    "relatedTerms": [
      "sistema-de-balizagem-iala",
      "perigo-isolado",
      "marcas-de-aguas-limpas",
      "marcas-laterais"
    ]
  },
  {
    "id": "perigo-isolado",
    "term": "Perigo Isolado",
    "category": "balizamento-iala",
    "section": "Sistema de Balizagem Marítima",
    "subsection": "Perigo Isolado",
    "page": 67,
    "definition": "Destinado a assinalar um perigo isolado com fundos navegáveis à volta. Cores preta e vermelha com duas esferas pretas no tope e ritmo de luz em grupo de 2 clarões.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "marcas-de-aguas-limpas",
      "marcas-cardeais",
      "marcas-laterais",
      "sistema-de-balizagem-iala"
    ]
  },
  {
    "id": "marcas-de-aguas-limpas",
    "term": "Marcas de Águas Limpas",
    "category": "balizamento-iala",
    "section": "Sistema de Balizagem Marítima",
    "subsection": "Marcas de Águas Limpas",
    "page": 67,
    "definition": "Assinala o eixo do canal ou águas navegáveis em todo o redor. Apresenta faixas verticais vermelhas e brancas com uma esfera vermelha no tope.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "perigo-isolado",
      "marcas-laterais",
      "marcas-cardeais",
      "sistema-de-balizagem-iala"
    ]
  },
  {
    "id": "marcas-especiais",
    "term": "Marcas Especiais",
    "category": "balizamento-iala",
    "section": "Sistema de Balizagem Marítima",
    "subsection": "Marcas Especiais",
    "page": 67,
    "definition": "Não têm por fim ajudar a navegação. Podem indicar zonas de fundear, exercícios militares, zonas de despejos, boias meteorológicas (ODAS), etc. Cor amarela com tope em X.",
    "importance": "essencial",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "sistema-de-balizagem-iala",
      "marcas-laterais",
      "marcas-de-aguas-limpas"
    ]
  },
  {
    "id": "codigo-internacional-de-sinais",
    "term": "Código Internacional de Sinais",
    "category": "comunicacoes-vhf",
    "section": "Código Internacional de Sinais",
    "subsection": "Sinalização por bandeiras",
    "page": 69,
    "definition": "Sinalização por bandeiras alfabéticas, numéricas, substitutas e símbolos Morse para comunicação entre navios.",
    "synonyms": [
      "C.I.S."
    ],
    "importance": "importante",
    "examTip": "Termo náutico oficial avaliado no âmbito do exame de Carta de Marinheiro e nomenclatura da DGRM.",
    "relatedTerms": [
      "bandeira-alfa",
      "bandeira-bravo",
      "bandeira-oscar",
      "bandeira-quebec",
      "bandeira-victor",
      "navtex"
    ]
  },
  {
    "id": "bandeira-alfa",
    "term": "Bandeira Alfa (A)",
    "category": "comunicacoes-vhf",
    "section": "Código Internacional de Sinais",
    "subsection": "Bandeiras alfabéticas",
    "page": 69,
    "definition": "Significado: \"Mergulhador na água; mantenha-se afastado e navegue a baixa velocidade\".",
    "importance": "essencial",
    "examTip": "Bandeira Alfa = Mergulhador na água, velocidade reduzida.",
    "relatedTerms": [
      "bandeira-bravo",
      "bandeira-oscar",
      "codigo-internacional-de-sinais"
    ]
  },
  {
    "id": "bandeira-bravo",
    "term": "Bandeira Bravo (B)",
    "category": "comunicacoes-vhf",
    "section": "Código Internacional de Sinais",
    "subsection": "Bandeiras alfabéticas",
    "page": 69,
    "definition": "Bandeira vermelha com o significado: \"Estou a carregar, ou a descarregar, ou a transportar carga perigosa\".",
    "importance": "importante",
    "examTip": "Código Internacional de Sinais: decore as letras de maior relevância de segurança (A, B, O, V).",
    "relatedTerms": [
      "bandeira-alfa",
      "bandeira-quebec",
      "codigo-internacional-de-sinais",
      "combustivel"
    ]
  },
  {
    "id": "bandeira-oscar",
    "term": "Bandeira Oscar (O)",
    "category": "comunicacoes-vhf",
    "section": "Código Internacional de Sinais",
    "subsection": "Bandeiras alfabéticas",
    "page": 69,
    "definition": "Bandeira amarela e vermelha dividida diagonalmente. Significado: \"Homem ao mar\".",
    "importance": "essencial",
    "examTip": "Bandeira Oscar = Homem ao mar.",
    "relatedTerms": [
      "manobra-de-homem-ao-mar",
      "manobra-de-butakow",
      "bandeira-alfa",
      "codigo-internacional-de-sinais"
    ]
  },
  {
    "id": "bandeira-quebec",
    "term": "Bandeira Quebec (Q)",
    "category": "comunicacoes-vhf",
    "section": "Código Internacional de Sinais",
    "subsection": "Bandeiras alfabéticas",
    "page": 69,
    "definition": "Bandeira amarela. Significado: \"O estado sanitário do meu navio é bom, peço livre prática\".",
    "importance": "importante",
    "examTip": "Código Internacional de Sinais: decore as letras de maior relevância de segurança (A, B, O, V).",
    "relatedTerms": [
      "bandeira-bravo",
      "bandeira-victor",
      "codigo-internacional-de-sinais"
    ]
  },
  {
    "id": "bandeira-victor",
    "term": "Bandeira Victor (V)",
    "category": "comunicacoes-vhf",
    "section": "Código Internacional de Sinais",
    "subsection": "Bandeiras alfabéticas",
    "page": 69,
    "definition": "Bandeira branca com uma aspa (cruz diagonal) vermelha. Significado de sinal isolado: \"Preciso de assistência / socorro\". Código Morse: · · · —.",
    "importance": "essencial",
    "examTip": "Bandeira Victor (V, · · · —) = Preciso de assistência/socorro. Pergunta frequente de exame da DGRM!",
    "relatedTerms": [
      "bandeira-alfa",
      "bandeira-bravo",
      "bandeira-oscar",
      "codigo-internacional-de-sinais"
    ]
  },
  {
    "id": "navtex",
    "term": "Navtex",
    "category": "comunicacoes-vhf",
    "section": "Navtex",
    "subsection": "Avisos aos Navegantes",
    "page": 70,
    "definition": "Parte do sistema global de segurança marítima (GMDSS). Transmite avisos de tempo e de navegação (AVISOS AOS NAVEGANTES) em inglês na frequência 518 kHz a cada 4 horas e na língua local em 490 kHz. A escala do serviço é de 200 a 400 milhas náuticas.",
    "importance": "essencial",
    "examTip": "Frequências Navtex: 518 kHz (internacional em inglês) e 490 kHz (língua local/nacional). Alcance: 200-400 milhas.",
    "relatedTerms": [
      "codigo-internacional-de-sinais",
      "mayday-socorro",
      "escala-beaufort",
      "meteorologia",
      "planeamento-de-viagem"
    ]
  }
];

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
