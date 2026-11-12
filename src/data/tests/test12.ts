import { TestQuestion } from "../../types/tests";

/**
 * TESTE 12 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_12_QUESTIONS: TestQuestion[] = [
  {
    "id": "t12-q01",
    "testNumber": 12,
    "questionNumber": 1,
    "sourceTests": [
      12
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Como é que um navio desgovernado sinaliza essa situação aos outros navios durante o dia?",
    "options": [
      "Colocando três balões esféricos no mastro.",
      "Colocando um balão cilíndrico no mastro.",
      "Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.",
      "Colocando um balão bicónico preto."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.",
    "acceptedKeywords": [
      "dois balões esféricos",
      "duas esferas pretas"
    ],
    "explanation": "Regra 27(a) do RIEAM."
  },
  {
    "id": "t12-q02",
    "testNumber": 12,
    "questionNumber": 2,
    "sourceTests": [
      12
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "open-answer",
    "points": 1,
    "statement": "Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:",
    "expectedAnswer": "A embarcação A tem direito a rumo porque está a navegar à vela.",
    "acceptedKeywords": [
      "vela",
      "à vela"
    ],
    "explanation": "Regra 18 do RIEAM.",
    "diagram": {
      "type": "vessel-crossing",
      "variant": "crossing-a-standon"
    }
  },
  {
    "id": "t12-q03",
    "testNumber": 12,
    "questionNumber": 3,
    "sourceTests": [
      12
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio com capacidade de manobra reduzida deve apresentar de dia:",
    "options": [
      "Dois balões bicónicos pretos.",
      "Três marcas dispostas verticalmente: a superior e inferior esféricas e a do meio bicónica (losango preto).",
      "Três esferas pretas verticais.",
      "Dois cones com os vértices para cima."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Três marcas dispostas verticalmente: a superior e inferior esféricas e a do meio bicónica (losango preto).",
    "acceptedKeywords": [
      "esféricas",
      "bicónica",
      "losango"
    ],
    "explanation": "Regra 27(b) do RIEAM."
  },
  {
    "id": "t12-q04",
    "testNumber": 12,
    "questionNumber": 4,
    "sourceTests": [
      12
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Avista um navio pelo seu bombordo (BB) com balão de navio condicionado pelo calado e verifica estar em rota de colisão. Tem que manobrar? Porquê?",
    "expectedAnswer": "Sim, tem que manobrar para se manter desimpedido do caminho do navio condicionado pelo seu calado, pois este não pode desviar-se dos limites seguros do canal.",
    "acceptedKeywords": [
      "sim",
      "condicionado pelo seu calado",
      "manobrar"
    ],
    "explanation": "Regra 18(d) do RIEAM."
  },
  {
    "id": "t12-q05",
    "testNumber": 12,
    "questionNumber": 5,
    "sourceTests": [
      12
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
    "id": "t12-q06",
    "testNumber": 12,
    "questionNumber": 6,
    "sourceTests": [
      12
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "A embarcação A pretende atracar por Estibordo no cais. Para isso tem que guinar para Bombordo. Que sinal sonoro tem que emitir?",
    "options": [
      "Um som curto.",
      "Dois sons curtos.",
      "Três sons curtos.",
      "Dois sons longos."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Dois sons curtos.",
    "acceptedKeywords": [
      "dois sons curtos",
      "dois curtos"
    ],
    "explanation": "Regra 34(a) do RIEAM: \"Estou a guinar para bombordo\"."
  },
  {
    "id": "t12-q07",
    "testNumber": 12,
    "questionNumber": 7,
    "sourceTests": [
      12
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Diga o nome dos 3 principais sinais pirotécnicos de socorro homologados regulamentares:",
    "expectedAnswer": "1. Foguetes com paraquedas de luz vermelha; 2. Fachos de mão de luz vermelha; 3. Sinal fumígeno flutuante cor-de-laranja.",
    "acceptedKeywords": [
      "foguete com paraquedas",
      "facho de mão",
      "sinal fumígeno"
    ],
    "explanation": "Pirotecnia padrão de bordo."
  },
  {
    "id": "t12-q08",
    "testNumber": 12,
    "questionNumber": 8,
    "sourceTests": [
      12
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Em caso de mau tempo com mar bravo, como deve navegar a embarcação em relação à vaga para evitar adornar ou capotar?",
    "expectedAnswer": "Navegar com a vaga pela amura (cerca de 30° a 45° com a vaga), reduzindo a velocidade, ou correr com o tempo pela alheta mantendo o governo firme.",
    "acceptedKeywords": [
      "vaga pela amura",
      "amura",
      "reduzir a velocidade",
      "alheta"
    ],
    "explanation": "Nunca se deve receber a vaga pelo través pois provoca adornamento crítico e viragem da embarcação."
  },
  {
    "id": "t12-q09",
    "testNumber": 12,
    "questionNumber": 9,
    "sourceTests": [
      12
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Qual o método de extinção que devemos usar num incêndio produzido por combustíveis líquidos (gasolina/gasóleo)?",
    "options": [
      "Abafamento com pó químico seco ou espuma mecânica (cortando o oxigénio).",
      "Inundação com jato potente de água salgada.",
      "Aumentar o fluxo de ventilação.",
      "Esperar que o combustível queime na totalidade."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Abafamento com pó químico seco ou espuma mecânica (cortando o oxigénio).",
    "acceptedKeywords": [
      "abafamento",
      "pó químico",
      "espuma"
    ],
    "explanation": "Extinção de fogos de Classe B."
  },
  {
    "id": "t12-q10",
    "testNumber": 12,
    "questionNumber": 10,
    "sourceTests": [
      12
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Complete a frase com uma das palavras (Respirem / Não respirem): A posição lateral de segurança deve ser utilizada em sinistrados inconscientes que ____ e com batimentos cardíacos.",
    "expectedAnswer": "Respirem.",
    "acceptedKeywords": [
      "respirem",
      "respira"
    ],
    "explanation": "PLS para náufragos e sinistrados inconscientes."
  },
  {
    "id": "t12-q11",
    "testNumber": 12,
    "questionNumber": 11,
    "sourceTests": [
      12
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A atuação adequada para estancar uma hemorragia externa abundante visível é:",
    "expectedAnswer": "Compressão direta firme sobre a ferida com uma compressa esterilizada (penso compressivo) e elevação do membro acima do coração.",
    "acceptedKeywords": [
      "compressão direta",
      "compressa",
      "elevação"
    ],
    "explanation": "Hemostase mecânica imediata."
  },
  {
    "id": "t12-q12",
    "testNumber": 12,
    "questionNumber": 12,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de recolha da amarra, isto é, de levantar a âncora do fundo, dá-se o nome de:",
    "expectedAnswer": "Suspender (ou virar amarra / alar o ferro).",
    "acceptedKeywords": [
      "suspender",
      "virar amarra"
    ],
    "explanation": "Suspender âncora."
  },
  {
    "id": "t12-q13",
    "testNumber": 12,
    "questionNumber": 13,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de \"içar o ferro\" pode-se também designar por:",
    "expectedAnswer": "Suspender.",
    "acceptedKeywords": [
      "suspender",
      "virar amarra"
    ],
    "explanation": "Suspender."
  },
  {
    "id": "t12-q14",
    "testNumber": 12,
    "questionNumber": 14,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Que nome se dá às marcas ou espaçamentos pintados na amarra que nos permitem controlar o comprimento de amarra largada?",
    "expectedAnswer": "Manilhas ou marcas da amarra (quartéis de amarra marcados em metros ou braças).",
    "acceptedKeywords": [
      "quartéis",
      "marcas da amarra",
      "manilhas"
    ],
    "explanation": "Marcações métricas de calibração da corrente de fundeio."
  },
  {
    "id": "t12-q15",
    "testNumber": 12,
    "questionNumber": 15,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O principal efeito provocado numa embarcação com corrente de través é:",
    "options": [
      "Abatimento e forte deriva lateral para sotacorrente.",
      "Aumento da velocidade de seguimento.",
      "Paragem do motor.",
      "Nenhum efeito."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Abatimento e forte deriva lateral para sotacorrente.",
    "acceptedKeywords": [
      "abatimento",
      "deriva lateral"
    ],
    "explanation": "A corrente lateral desloca o casco em bloco."
  },
  {
    "id": "t12-q16",
    "testNumber": 12,
    "questionNumber": 16,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Numa embarcação, ao meter leme a um bordo, o seu efeito é tanto maior quanto:",
    "options": [
      "Maior for a velocidade da embarcação.",
      "Maior for o ângulo de leme.",
      "Maior for a área da porta do leme.",
      "Todas as alíneas anteriores estão corretas."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Todas as alíneas anteriores estão corretas.",
    "acceptedKeywords": [
      "todas",
      "corretas"
    ],
    "explanation": "A força do leme depende de todos estes fatores combinados."
  },
  {
    "id": "t12-q17",
    "testNumber": 12,
    "questionNumber": 17,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Na manobra de largada do cais com corrente pela proa, o último cabo a largar deverá ser:",
    "options": [
      "O lançante de ré.",
      "O lançante de proa.",
      "A regeira de ré (para afastar a proa do cais com apoio da corrente).",
      "Nenhum dos anteriores."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "A regeira de ré (para afastar a proa do cais com apoio da corrente).",
    "acceptedKeywords": [
      "regeira de ré"
    ],
    "explanation": "Com corrente pela proa, a regeira de ré permite à corrente abrir a proa para o largo."
  },
  {
    "id": "t12-q18",
    "testNumber": 12,
    "questionNumber": 18,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A peça mecânica destinada ao governo da embarcação designa-se por:",
    "options": [
      "Roda de proa.",
      "Quilha.",
      "Painel de popa.",
      "Leme."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Leme.",
    "acceptedKeywords": [
      "leme"
    ],
    "explanation": "Órgão de governo."
  },
  {
    "id": "t12-q19",
    "testNumber": 12,
    "questionNumber": 19,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "As peças metálicas verticais fixadas ao convés que servem para dar volta aos cabos e espias de amarração designam-se por:",
    "expectedAnswer": "Cabeços (ou cunhos).",
    "acceptedKeywords": [
      "cabeços",
      "cunhos",
      "cabeço",
      "cunho"
    ],
    "explanation": "Elementos estruturais de amarração no convés."
  },
  {
    "id": "t12-q20",
    "testNumber": 12,
    "questionNumber": 20,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A distância teórica que o hélice percorreria em linha reta durante uma rotação completa caso a água fosse um meio sólido rígido dá-se o nome de:",
    "expectedAnswer": "Passo do hélice.",
    "acceptedKeywords": [
      "passo",
      "passo do hélice"
    ],
    "explanation": "Definição cinemática de passo do hélice."
  },
  {
    "id": "t12-q21",
    "testNumber": 12,
    "questionNumber": 21,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Às pequenas torções circulares que um cabo dá sobre si próprio dá-se o nome de:",
    "expectedAnswer": "Cocas.",
    "acceptedKeywords": [
      "cocas",
      "coca"
    ],
    "explanation": "Cocas em cabos."
  },
  {
    "id": "t12-q22",
    "testNumber": 12,
    "questionNumber": 22,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Bitola de um cabo marítimo é:",
    "options": [
      "O meio de um cabo.",
      "A extremidade de um cabo.",
      "O diâmetro (ou espessura transversal) de um cabo.",
      "O comprimento total do cabo."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "O diâmetro (ou espessura transversal) de um cabo.",
    "acceptedKeywords": [
      "diâmetro",
      "espessura"
    ],
    "explanation": "A bitola mede o calibre/diâmetro do cabo em milímetros."
  },
  {
    "id": "t12-q23",
    "testNumber": 12,
    "questionNumber": 23,
    "sourceTests": [
      12
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Identifique o nó que serve para unir dois cabos da mesma bitola que não corra nem escorregue:",
    "expectedAnswer": "Nó direito.",
    "acceptedKeywords": [
      "nó direito",
      "direito"
    ],
    "explanation": "Nó direito para cabos do mesmo diâmetro."
  },
  {
    "id": "t12-q24",
    "testNumber": 12,
    "questionNumber": 24,
    "sourceTests": [
      12
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "A carta de navegador de recreio que habilita o titular ao comando de embarcação até 25 milhas da costa é da categoria de:",
    "options": [
      "Patrão de Costa.",
      "Patrão de Alto Mar.",
      "Marinheiro.",
      "Patrão Local."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Patrão de Costa.",
    "acceptedKeywords": [
      "patrão de costa"
    ],
    "explanation": "Patrão de Costa."
  },
  {
    "id": "t12-q25",
    "testNumber": 12,
    "questionNumber": 25,
    "sourceTests": [
      12
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Como deve ser efetuado o governo de uma embarcação de recreio nas Zonas de Navegação Restrita (portos, canais e barras)?",
    "expectedAnswer": "Com velocidade de segurança reduzida (geralmente <= 3 a 5 nós), sem provocar esteira ou ondulação que cause danos a terceiros, e mantendo-se o mais próximo possível do limite exterior do canal a estibordo.",
    "acceptedKeywords": [
      "velocidade reduzida",
      "estibordo",
      "sem provocar ondulação",
      "velocidade de segurança"
    ],
    "explanation": "Regras de navegação em portos e canais estreitos."
  },
  {
    "id": "t12-q26",
    "testNumber": 12,
    "questionNumber": 26,
    "sourceTests": [
      12
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "A altura da água entre o Zero Hidrográfico e o fundo da carta náutica chama-se:",
    "options": [
      "Sonda Reduzida.",
      "Altura da maré.",
      "Sonda à Hora.",
      "Nível médio."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Sonda Reduzida.",
    "acceptedKeywords": [
      "sonda reduzida"
    ],
    "explanation": "Sonda Reduzida."
  },
  {
    "id": "t12-q27",
    "testNumber": 12,
    "questionNumber": 27,
    "sourceTests": [
      12
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Diga o que entende por Altura da Maré:",
    "options": [
      "É o plano a que são referidas as sondas da carta.",
      "É a altura da superfície da água num determinado local e momento sobre o Zero Hidrográfico.",
      "É a profundidade máxima do porto.",
      "É o desfasamento entre o sol e a lua."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "É a altura da superfície da água num determinado local e momento sobre o Zero Hidrográfico.",
    "acceptedKeywords": [
      "altura da superfície da água",
      "zero hidrográfico"
    ],
    "explanation": "Definição oficial de Altura da Maré."
  },
  {
    "id": "t12-q28",
    "testNumber": 12,
    "questionNumber": 28,
    "sourceTests": [
      12
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Complete a frase: Num motor a gasolina a combustão dá-se por meio de uma ____ elétrica fornecida pela vela de ignição.",
    "expectedAnswer": "Faísca (ou centelha).",
    "acceptedKeywords": [
      "faísca",
      "faisca",
      "centelha"
    ],
    "explanation": "Ignição por faísca em motores a gasolina."
  },
  {
    "id": "t12-q29",
    "testNumber": 12,
    "questionNumber": 29,
    "sourceTests": [
      12
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Assinale a alínea correta relativamente ao sistema IALA Região A:",
    "options": [
      "Uma baliza é uma marca fixa assente no fundo.",
      "Marcas de perigo isolado limitam a largura navegável de um canal.",
      "À entrada de um porto na Região A, as marcas vermelhas laterais são deixadas por Bombordo da embarcação.",
      "As marcas laterais não dependem do sentido da balizagem."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "À entrada de um porto na Região A, as marcas vermelhas laterais são deixadas por Bombordo da embarcação.",
    "acceptedKeywords": [
      "marcas vermelhas",
      "bombordo"
    ],
    "explanation": "Na Região A: entrada de porto deixa marcas vermelhas a Bombordo e verdes a Estibordo."
  },
  {
    "id": "t12-q30",
    "testNumber": 12,
    "questionNumber": 30,
    "sourceTests": [
      12
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Quais os fenómenos observados à passagem de uma frente fria no hemisfério Norte?",
    "options": [
      "A pressão sobe bruscamente, o vento roda bruscamente para NW aumentando de intensidade com rajadas, surgem cúmulo-nimbos com aguaceiros fortes e descida da temperatura.",
      "O tempo estabiliza com céu limpo e sem vento.",
      "A temperatura sobe muito e o vento para.",
      "Surgem nevoeiros quentes sem chuva."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "A pressão sobe bruscamente, o vento roda bruscamente para NW aumentando de intensidade com rajadas, surgem cúmulo-nimbos com aguaceiros fortes e descida da temperatura.",
    "acceptedKeywords": [
      "pressão sobe",
      "roda para nw",
      "cúmulo-nimbos",
      "aguaceiros fortes"
    ],
    "explanation": "Meteorologia sinóptica clássica de frente fria."
  }
];
