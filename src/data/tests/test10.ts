import { TestQuestion } from "../../types/tests";

/**
 * TESTE 10 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_10_QUESTIONS: TestQuestion[] = [
  {
    "id": "t10-q01",
    "testNumber": 10,
    "questionNumber": 1,
    "sourceTests": [
      10
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica a navegar deve desviar-se de:",
    "options": [
      "Um navio com capacidade de manobra reduzida.",
      "Um navio na faina da pesca.",
      "Um navio desgovernado.",
      "Todas as alíneas anteriores estão certas."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Todas as alíneas anteriores estão certas.",
    "acceptedKeywords": [
      "todas",
      "certas"
    ],
    "explanation": "Regra 18 do RIEAM."
  },
  {
    "id": "t10-q02",
    "testNumber": 10,
    "questionNumber": 2,
    "sourceTests": [
      10
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "open-answer",
    "points": 1,
    "statement": "Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:",
    "expectedAnswer": "A embarcação A tem direito a rumo porque está com capacidade de manobra reduzida.",
    "acceptedKeywords": [
      "capacidade de manobra reduzida",
      "manobra reduzida"
    ],
    "explanation": "Regra 18 do RIEAM.",
    "diagram": {
      "type": "vessel-crossing",
      "variant": "crossing-a-standon"
    }
  },
  {
    "id": "t10-q03",
    "testNumber": 10,
    "questionNumber": 3,
    "sourceTests": [
      10
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio condicionado pelo seu calado deve apresentar durante o dia:",
    "options": [
      "Um balão cilíndrico de cor preta.",
      "Três balões esféricos pretos.",
      "Dois balões bicónicos.",
      "Um balão cónico."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Um balão cilíndrico de cor preta.",
    "acceptedKeywords": [
      "cilíndrico",
      "cilindro preto"
    ],
    "explanation": "Regra 28 do RIEAM: Marca cilíndrica preta."
  },
  {
    "id": "t10-q04",
    "testNumber": 10,
    "questionNumber": 4,
    "sourceTests": [
      10
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Desenhe na figura ao lado os balões correspondentes a um navio com capacidade de manobra reduzida:",
    "expectedAnswer": "Três marcas verticais: esfera preta superior, losango (bicónico) preto no meio e esfera preta inferior.",
    "acceptedKeywords": [
      "esfera",
      "losango",
      "bicónico"
    ],
    "explanation": "Regra 27(b) do RIEAM.",
    "diagram": {
      "type": "day-shapes",
      "variant": "mast-unmarked"
    }
  },
  {
    "id": "t10-q05",
    "testNumber": 10,
    "questionNumber": 5,
    "sourceTests": [
      10
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "A embarcação A pretende atracar por Bombordo no cais. Para isso tem que guinar para Estibordo. Que sinal sonoro tem que emitir?",
    "options": [
      "Um som curto.",
      "Dois sons curtos.",
      "Três sons curtos.",
      "Dois sons longos."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Um som curto.",
    "acceptedKeywords": [
      "um som curto",
      "um curto"
    ],
    "explanation": "Regra 34(a) do RIEAM: \"Estou a guinar para estibordo\"."
  },
  {
    "id": "t10-q06",
    "testNumber": 10,
    "questionNumber": 6,
    "sourceTests": [
      10
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Uma embarcação de propulsão mecânica com as máquinas a trabalhar a ré deve sinalizar a manobra emitindo:",
    "options": [
      "Um som curto.",
      "Dois sons longos.",
      "Um som longo.",
      "Três sons curtos."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Três sons curtos.",
    "acceptedKeywords": [
      "três sons curtos",
      "três curtos"
    ],
    "explanation": "Regra 34(a) do RIEAM."
  },
  {
    "id": "t10-q07",
    "testNumber": 10,
    "questionNumber": 7,
    "sourceTests": [
      10
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Indique o que deve fazer no caso de um tripulante cair ao mar:",
    "expectedAnswer": "Gritar \"Homem ao mar!\", lançar imediatamente boia salva-vidas com retenida/luz, guinar o leme para o bordo da queda para desviar o hélice e manter vigilância visual contínua sobre a vítima.",
    "acceptedKeywords": [
      "homem ao mar",
      "boia",
      "bordo da queda",
      "desviar o hélice",
      "vigilância"
    ],
    "explanation": "Protocolo de salvamento imediato."
  },
  {
    "id": "t10-q08",
    "testNumber": 10,
    "questionNumber": 8,
    "sourceTests": [
      10
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Qual o sinal pirotécnico que produz um fumo denso cor-de-laranja altamente visível durante o dia?",
    "options": [
      "Sinal fumígeno flutuante.",
      "Facho de mão de luz vermelha.",
      "Foguete com paraquedas.",
      "Lanterna estroboscópica."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Sinal fumígeno flutuante.",
    "acceptedKeywords": [
      "sinal fumígeno",
      "fumígeno"
    ],
    "explanation": "Equipamento pirotécnico de socorro diurno."
  },
  {
    "id": "t10-q09",
    "testNumber": 10,
    "questionNumber": 9,
    "sourceTests": [
      10
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Qual o extintor que devemos usar para combater um incêndio com origem elétrica em equipamentos sob tensão?",
    "options": [
      "Extintor de água pressurizada.",
      "Extintor de dióxido de carbono (CO2) ou pó químico seco.",
      "Balde de água salgada.",
      "Espuma química simples."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Extintor de dióxido de carbono (CO2) ou pó químico seco.",
    "acceptedKeywords": [
      "co2",
      "pó químico"
    ],
    "explanation": "Agentes não condutores de eletricidade."
  },
  {
    "id": "t10-q10",
    "testNumber": 10,
    "questionNumber": 10,
    "sourceTests": [
      10
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Numa hemorragia externa deve-se:",
    "options": [
      "Fazer o tamponamento com uma compressa, envolvendo-a com uma ligadura apertada.",
      "Lavar abundantemente com álcool puro.",
      "Aplicar garrote apertado no pescoço.",
      "Deixar sangrar para purificar a ferida."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Fazer o tamponamento com uma compressa, envolvendo-a com uma ligadura apertada.",
    "acceptedKeywords": [
      "tamponamento",
      "compressa"
    ],
    "explanation": "Controlo primário de hemorragias."
  },
  {
    "id": "t10-q11",
    "testNumber": 10,
    "questionNumber": 11,
    "sourceTests": [
      10
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Num adulto saudável considera-se como normal uma frequência respiratória de:",
    "options": [
      "30 a 35 por minuto.",
      "60 a 65 por minuto.",
      "16 a 18 por minuto.",
      "08 a 10 por minuto."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "16 a 18 por minuto.",
    "acceptedKeywords": [
      "16 a 18"
    ],
    "explanation": "Constantes vitais normais."
  },
  {
    "id": "t10-q12",
    "testNumber": 10,
    "questionNumber": 12,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A corrente constituída por elos de ferro ou aço que prende a âncora à embarcação chama-se:",
    "expectedAnswer": "Amarra.",
    "acceptedKeywords": [
      "amarra"
    ],
    "explanation": "Linha de fundeio de elos metálicos."
  },
  {
    "id": "t10-q13",
    "testNumber": 10,
    "questionNumber": 13,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de deixar correr a amarra para que o ferro chegue ao fundo dá-se o nome de:",
    "expectedAnswer": "Largar amarra (ou filar amarra).",
    "acceptedKeywords": [
      "largar amarra",
      "filar amarra",
      "filar",
      "largar"
    ],
    "explanation": "Filar a amarra."
  },
  {
    "id": "t10-q14",
    "testNumber": 10,
    "questionNumber": 14,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de recolha da amarra e levantamento da âncora do fundo dá-se o nome de:",
    "expectedAnswer": "Suspender (ou virar amarra / alar).",
    "acceptedKeywords": [
      "suspender",
      "virar amarra"
    ],
    "explanation": "Suspender ferro."
  },
  {
    "id": "t10-q15",
    "testNumber": 10,
    "questionNumber": 15,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Partindo do repouso, numa embarcação com hélice de passo direito em marcha à vante e leme a meio:",
    "options": [
      "A popa tende a descair para estibordo e a proa guina ligeiramente para bombordo.",
      "A popa tende a descair para bombordo e a proa guina para estibordo.",
      "O barco avança rigorosamente a direito sem desvio.",
      "O barco anda para trás."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "A popa tende a descair para estibordo e a proa guina ligeiramente para bombordo.",
    "acceptedKeywords": [
      "popa para estibordo",
      "proa para bombordo"
    ],
    "explanation": "Efeito de rotação das pás do hélice de passo direito."
  },
  {
    "id": "t10-q16",
    "testNumber": 10,
    "questionNumber": 16,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A força exercida sobre a porta do leme é tanto maior:",
    "options": [
      "Quanto maior for a velocidade.",
      "Quanto menor for a velocidade.",
      "Quanto menor for a área do leme.",
      "Quanto menor for o calado."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Quanto maior for a velocidade.",
    "acceptedKeywords": [
      "maior for a velocidade",
      "velocidade"
    ],
    "explanation": "Efeito hidrodinâmico do leme."
  },
  {
    "id": "t10-q17",
    "testNumber": 10,
    "questionNumber": 17,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Ao reduzir a velocidade da embarcação em marcha à vante, o efeito lateral do hélice:",
    "options": [
      "Não tem qualquer efeito.",
      "Começa a sentir-se menos.",
      "Começa a sentir-se mais.",
      "Anula o governo."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Começa a sentir-se mais.",
    "acceptedKeywords": [
      "sentir-se mais",
      "mais"
    ],
    "explanation": "Prevalência do binário do hélice a baixas velocidades."
  },
  {
    "id": "t10-q18",
    "testNumber": 10,
    "questionNumber": 18,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Ao cabo fixo num arganéu de proa que serve para amarrar a embarcação ao cais dá-se o nome de:",
    "options": [
      "Regeira.",
      "Boça.",
      "Cabo de adriça.",
      "Defensa."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Boça.",
    "acceptedKeywords": [
      "boça"
    ],
    "explanation": "Cabo de amarração fixa da proa."
  },
  {
    "id": "t10-q19",
    "testNumber": 10,
    "questionNumber": 19,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O dispositivo mecânico dotado de pás que assegura a impulsão da embarcação através de movimento rotativo chama-se:",
    "expectedAnswer": "Hélice.",
    "acceptedKeywords": [
      "hélice",
      "helice"
    ],
    "explanation": "Propulsor."
  },
  {
    "id": "t10-q20",
    "testNumber": 10,
    "questionNumber": 20,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O calado de uma embarcação define-se como:",
    "options": [
      "A altura total desde o mastro até ao fundo do mar.",
      "A distância na perpendicular entre o plano da linha de água e o ponto mais baixo da quilha.",
      "O comprimento entre a proa e a popa.",
      "A largura máxima a meio-navio."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "A distância na perpendicular entre o plano da linha de água e o ponto mais baixo da quilha.",
    "acceptedKeywords": [
      "distância na perpendicular",
      "linha de água",
      "quilha"
    ],
    "explanation": "Calado imerso da embarcação."
  },
  {
    "id": "t10-q21",
    "testNumber": 10,
    "questionNumber": 21,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Pretende unir rapidamente dois cabos de bitolas diferentes. Que nó deve utilizar?",
    "expectedAnswer": "Nó de escota.",
    "acceptedKeywords": [
      "nó de escota",
      "escota"
    ],
    "explanation": "Nó específico para bitolas diferentes."
  },
  {
    "id": "t10-q22",
    "testNumber": 10,
    "questionNumber": 22,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A ação de enrolar um cabo em voltas regulares sucessivas de modo a ficar pronto a usar chama-se:",
    "options": [
      "Alar um cabo.",
      "Colher um cabo (em aduchas).",
      "Amarrar um cabo.",
      "Aguentar um cabo."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Colher um cabo (em aduchas).",
    "acceptedKeywords": [
      "colher",
      "aduchas"
    ],
    "explanation": "Arrumação de cabos em aduchas."
  },
  {
    "id": "t10-q23",
    "testNumber": 10,
    "questionNumber": 23,
    "sourceTests": [
      10
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Para fixar um cabo num cunho utilizam-se:",
    "options": [
      "Voltas redondas e cruzadas em oito.",
      "Nó de pescador.",
      "Apenas voltas falcas.",
      "Laço simples."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Voltas redondas e cruzadas em oito.",
    "acceptedKeywords": [
      "voltas redondas e cruzadas",
      "oito"
    ],
    "explanation": "Amarração em cunho."
  },
  {
    "id": "t10-q24",
    "testNumber": 10,
    "questionNumber": 24,
    "sourceTests": [
      10
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "A carta de navegador de recreio que habilita o titular ao comando de embarcações de recreio em navegação sem limite de área é:",
    "options": [
      "Patrão de Alto Mar.",
      "Patrão de Costa.",
      "Patrão Local.",
      "Marinheiro."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Patrão de Alto Mar.",
    "acceptedKeywords": [
      "patrão de alto mar"
    ],
    "explanation": "Grau máximo da náutica de recreio."
  },
  {
    "id": "t10-q25",
    "testNumber": 10,
    "questionNumber": 25,
    "sourceTests": [
      10
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "A carta de navegador de recreio que habilita o titular a navegar até 25 milhas da linha de costa é:",
    "options": [
      "Patrão de Alto Mar.",
      "Patrão de Costa.",
      "Patrão Local.",
      "Marinheiro."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Patrão de Costa.",
    "acceptedKeywords": [
      "patrão de costa"
    ],
    "explanation": "Carta de Patrão de Costa."
  },
  {
    "id": "t10-q26",
    "testNumber": 10,
    "questionNumber": 26,
    "sourceTests": [
      10
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "O plano horizontal a que são referidas as sondas cartográficas indicadas na carta náutica chama-se:",
    "options": [
      "Sonda Reduzida.",
      "Altura da maré.",
      "Zero Hidrográfico.",
      "Nível médio do mar."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Zero Hidrográfico.",
    "acceptedKeywords": [
      "zero hidrográfico",
      "zh"
    ],
    "explanation": "Zero Hidrográfico."
  },
  {
    "id": "t10-q27",
    "testNumber": 10,
    "questionNumber": 27,
    "sourceTests": [
      10
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Quando ocorrem as Marés Mortas em relação às fases da Lua?",
    "expectedAnswer": "Nas fases de Quarto Crescente e Quarto Minguante.",
    "acceptedKeywords": [
      "quarto crescente",
      "quarto minguante",
      "crescente",
      "minguante"
    ],
    "explanation": "Quadratura astronómica."
  },
  {
    "id": "t10-q28",
    "testNumber": 10,
    "questionNumber": 28,
    "sourceTests": [
      10
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Complete a frase: O circuito de refrigeração de um motor fora de borda após funcionamento em água salgada deve ser lavado/adoçado com:",
    "expectedAnswer": "Água doce limpa.",
    "acceptedKeywords": [
      "água doce",
      "doce"
    ],
    "explanation": "Adoçamento do motor marítimo."
  },
  {
    "id": "t10-q29",
    "testNumber": 10,
    "questionNumber": 29,
    "sourceTests": [
      10
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "As marcas cardinais em que o cone superior aponta para cima e o inferior para baixo (opostos pelas bases) indicam que o rumo seguro e águas profundas ficam a:",
    "options": [
      "Norte.",
      "Sul.",
      "Este.",
      "Oeste."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Este.",
    "acceptedKeywords": [
      "este",
      "leste"
    ],
    "explanation": "Marca cardinal Este."
  },
  {
    "id": "t10-q30",
    "testNumber": 10,
    "questionNumber": 30,
    "sourceTests": [
      10
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O NAVTEX é um equipamento de radiocomunicações marítimas que permite receber a bordo:",
    "options": [
      "Cartas de tempo e previsões meteorológicas.",
      "Informação de segurança marítima e avisos de barras.",
      "As duas alíneas anteriores estão corretas.",
      "Chamadas privadas de voz."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "As duas alíneas anteriores estão corretas.",
    "acceptedKeywords": [
      "duas",
      "corretas"
    ],
    "explanation": "Sistema internacional MSI NAVTEX."
  }
];
