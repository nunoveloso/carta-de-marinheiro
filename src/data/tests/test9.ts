import { TestQuestion } from "../../types/tests";

/**
 * TESTE 9 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial (Tipo de Enunciado 59467SB)
 */
export const TEST_9_QUESTIONS: TestQuestion[] = [
  // 1 a 6: RIEAM (6.0 valores)
  {
    id: "t9-q01",
    testNumber: 9,
    questionNumber: 1,
    sourceTests: [9],
    category: "RIEAM",
    subcategory: "Abalroamentos",
    type: "multiple-choice",
    points: 1.0,
    statement: "Um navio de propulsão mecânica deve desviar-se do caminho de:",
    options: [
      "Um navio desgovernado.",
      "Um navio à vela.",
      "Um navio que se aproxime por estibordo.",
      "Todas as alíneas estão corretas."
    ],
    correctOptionIndex: 3,
    expectedAnswer: "Todas as alíneas estão corretas.",
    acceptedKeywords: ["todas", "corretas"],
    explanation: "Regras 18 e 15 do RIEAM: Embarcações de propulsão mecânica desviam-se de navios desgovernados, navios com capacidade de manobra reduzida, pesqueiros, veleiros e embarcações que se aproximem por estibordo em rumos cruzados."
  },
  {
    id: "t9-q02",
    testNumber: 9,
    questionNumber: 2,
    sourceTests: [9],
    category: "RIEAM",
    subcategory: "Abalroamentos",
    type: "open-answer",
    points: 1.0,
    statement: "Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:",
    expectedAnswer: "A embarcação A tem direito a rumo porque se encontra com capacidade de manobra reduzida.",
    acceptedKeywords: ["capacidade de manobra reduzida", "manobra reduzida", "reduzida"],
    explanation: "Regra 18 do RIEAM: Embarcações com capacidade de manobra reduzida têm prioridade sobre embarcações de propulsão mecânica em rumos cruzados.",
    diagram: {
      type: "vessel-crossing",
      variant: "crossing-a-standon"
    }
  },
  {
    id: "t9-q03",
    testNumber: 9,
    questionNumber: 3,
    sourceTests: [9],
    category: "RIEAM",
    subcategory: "Balões e Marcas Diurnas",
    type: "multiple-choice",
    points: 1.0,
    statement: "Embarcação a navegar simultaneamente à vela e a motor deve apresentar de dia:",
    options: [
      "Um balão esférico preto ligado à proa.",
      "Um balão bicónico preto ligado à proa.",
      "Um balão cónico preto, com o vértice para baixo, ligado à proa.",
      "Dois balões cónicos pretos, com o vértice para baixo, ligados à proa."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "Um balão cónico preto, com o vértice para baixo, ligado à proa.",
    acceptedKeywords: ["cónico", "vértice para baixo", "cone preto"],
    explanation: "Regra 25(e) do RIEAM: Embarcação que navega à vela e ao mesmo tempo com propulsão mecânica deve exibir a vante um cone com o vértice para baixo."
  },
  {
    id: "t9-q04",
    testNumber: 9,
    questionNumber: 4,
    sourceTests: [9],
    category: "RIEAM",
    subcategory: "Balões e Marcas Diurnas",
    type: "open-answer",
    points: 1.0,
    statement: "Desenhe na figura ao lado os balões correspondentes a um navio condicionado pelo seu calado:",
    expectedAnswer: "Um cilindro preto disposto verticalmente onde melhor possa ser visto.",
    acceptedKeywords: ["cilindro", "cilindro preto"],
    explanation: "Regra 28 do RIEAM: Navio condicionado pelo seu calado exibe de dia um cilindro preto.",
    diagram: {
      type: "day-shapes",
      variant: "mast-unmarked"
    }
  },
  {
    id: "t9-q05",
    testNumber: 9,
    questionNumber: 5,
    sourceTests: [9],
    category: "RIEAM",
    subcategory: "Sinais Sonoros e Luminosos",
    type: "multiple-choice",
    points: 1.0,
    statement: "Uma embarcação de propulsão mecânica com as máquinas a trabalhar a ré deve sinalizar a manobra emitindo o seguinte sinal sonoro:",
    options: [
      "Um som curto.",
      "Dois sons longos.",
      "Um som longo.",
      "Três sons curtos."
    ],
    correctOptionIndex: 3,
    expectedAnswer: "Três sons curtos.",
    acceptedKeywords: ["três sons curtos", "três curtos"],
    explanation: "Regra 34(a) do RIEAM: Três sons curtos significam: \\\"As minhas máquinas estão a trabalhar a ré\\\"."
  },
  {
    id: "t9-q06",
    testNumber: 9,
    questionNumber: 6,
    sourceTests: [9],
    category: "RIEAM",
    subcategory: "Sinais Sonoros e Luminosos",
    type: "multiple-choice",
    points: 1.0,
    statement: "Uma embarcação de propulsão mecânica que pretende guinar para Bombordo (BB) deve indicá-lo da seguinte forma:",
    options: [
      "Um som curto.",
      "Dois sons longos.",
      "Um som longo.",
      "Dois sons curtos."
    ],
    correctOptionIndex: 3,
    expectedAnswer: "Dois sons curtos.",
    acceptedKeywords: ["dois sons curtos", "dois curtos"],
    explanation: "Regra 34(a) do RIEAM: Dois sons curtos significam: \\\"Estou a guinar para bombordo\\\"."
  },

  // 7 a 11: Segurança e Primeiros Socorros (4.0 valores)
  {
    id: "t9-q07",
    testNumber: 9,
    questionNumber: 7,
    sourceTests: [9],
    category: "Segurança e Primeiros Socorros",
    subcategory: "Segurança e Salvamento",
    type: "open-answer",
    points: 1.0,
    statement: "Indique as ações sequenciais a efetuar no caso de um dos tripulantes cair ao mar por Bombordo (BB):",
    expectedAnswer: "1. Reduzir a velocidade dos motores; 2. Guinar para BB (afastar a popa/hélice da vítima); 3. Largar boia salva-vidas com fumo/luz; 4. Não perder o náufrago de vista; 5. Recolher o náufrago por sotavento.",
    acceptedKeywords: ["guinar para bb", "reduzir velocidade", "largar boia", "sotavento", "vigia"],
    explanation: "Manobra padrão de Homem ao Mar (Williamson / Anderson): roda-se o leme para o bordo da queda para desviar o hélice e recolhe-se a sotavento."
  },
  {
    id: "t9-q08",
    testNumber: 9,
    questionNumber: 8,
    sourceTests: [9],
    category: "Segurança e Primeiros Socorros",
    subcategory: "Segurança e Salvamento",
    type: "multiple-choice",
    points: 1.0,
    statement: "Ao vestir um colete salva-vidas insuflável, relativamente ao cabo que faz disparar a garrafa de ar comprimido (acionador manual):",
    options: [
      "Deve ficar acessível pelo lado exterior para ser puxado firmemente se a insuflação automática falhar.",
      "Deve ser amarrado à amurada da embarcação.",
      "Deve ser introduzido no bolso estanque com fecho.",
      "Deve ser puxado obrigatoriamente antes de entrar na embarcação."
    ],
    correctOptionIndex: 0,
    expectedAnswer: "Deve ficar acessível pelo lado exterior para ser puxado firmemente se a insuflação automática falhar.",
    acceptedKeywords: ["acessível", "exterior", "disparo manual"],
    explanation: "O manípulo do percutor manual deve ficar livre e visível no exterior para acionamento imediato caso o sistema automático falhe."
  },
  {
    id: "t9-q09",
    testNumber: 9,
    questionNumber: 9,
    sourceTests: [9],
    category: "Segurança e Primeiros Socorros",
    subcategory: "Combate a Incêndios",
    type: "multiple-choice",
    points: 1.0,
    statement: "Ao regressar de uma pescaria na sua embarcação com motor fora de bordo, este incendeia-se. Que ações de manobra deve tomar e qual o agente extintor mais adequado para apagar o incêndio?",
    options: [
      "Aproar ao vento e usar extintor de água pressurizada.",
      "Pôr o vento pela popa e usar extintor de água.",
      "Pôr o vento por uma das alhetas de modo a afastar chamas e fumos da embarcação, e utilizar extintor de pó químico ou CO2.",
      "Acelerar a marcha à vante para apagar as chamas com o vento."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "Pôr o vento por uma das alhetas de modo a afastar chamas e fumos da embarcação, e utilizar extintor de pó químico ou CO2.",
    acceptedKeywords: ["vento", "alheta", "pó químico", "co2"],
    explanation: "A manobra visa manter as chamas e gases tóxicos fora do poço/convés da embarcação. Em motores com combustível usam-se extintores classe B (pó químico seco ou CO2), nunca água."
  },
  {
    id: "t9-q10",
    testNumber: 9,
    questionNumber: 10,
    sourceTests: [9],
    category: "Segurança e Primeiros Socorros",
    subcategory: "Primeiros Socorros",
    type: "multiple-choice",
    points: 0.5,
    statement: "Uma ferida aberta com hemorragia deve ser limpa com:",
    options: [
      "Água oxigenada.",
      "Soro fisiológico.",
      "Álcool etílico.",
      "Nenhuma se aplica."
    ],
    correctOptionIndex: 1,
    expectedAnswer: "Soro fisiológico.",
    acceptedKeywords: ["soro fisiológico", "soro"],
    explanation: "Feridas abertas limpam-se preferencialmente com soro fisiológico estéril ou água potável corrente. Álcool e água oxigenada lesam os tecidos celulares e dificultam a cicatrização."
  },
  {
    id: "t9-q11",
    testNumber: 9,
    questionNumber: 11,
    sourceTests: [9],
    category: "Segurança e Primeiros Socorros",
    subcategory: "Primeiros Socorros",
    type: "open-answer",
    points: 0.5,
    statement: "A atuação adequada para estancar uma hemorragia externa abundante visível é:",
    expectedAnswer: "Compressão direta sobre a ferida com compressa estéril (ou pano limpo) e elevação do membro afetado acima do nível do coração.",
    acceptedKeywords: ["compressão direta", "compressa", "elevação", "ligadura compressiva"],
    explanation: "A compressão direta contínua é o método primário e mais eficaz para estancar hemorragias externas graves."
  },

  // 12 a 23: Marinharia (6.0 valores)
  {
    id: "t9-q12",
    testNumber: 9,
    questionNumber: 12,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Âncoras e Fundeio",
    type: "multiple-choice",
    points: 0.5,
    statement: "A fateixa, ferro de pequenas dimensões muito utilizado em embarcações de recreio miúdas, é composta por:",
    options: [
      "1 único braço.",
      "2 braços cruzados.",
      "3 ou 4 braços (unhas).",
      "Nenhum braço."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "3 ou 4 braços (unhas).",
    acceptedKeywords: ["3 ou 4 braços", "4 braços"],
    explanation: "A fateixa é constituída por 4 braços curvos (fixos ou dobráveis) soldados à haste central."
  },
  {
    id: "t9-q13",
    testNumber: 9,
    questionNumber: 13,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Âncoras e Fundeio",
    type: "open-answer",
    points: 0.5,
    statement: "À manobra de deixar correr a amarra, para que o ferro chegue ao fundo dá-se o nome de:",
    expectedAnswer: "Largar a amarra (ou filar amarra).",
    acceptedKeywords: ["largar", "filar", "filar a amarra", "largar a amarra"],
    explanation: "Filar ou largar a amarra é o comando dado para soltar o travão do molinete/cabrestante e deixar o ferro descer até ao fundo."
  },
  {
    id: "t9-q14",
    testNumber: 9,
    questionNumber: 14,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Âncoras e Fundeio",
    type: "open-answer",
    points: 0.5,
    statement: "À manobra de recolha da amarra, isto é, de levantar a âncora do fundo e trazê-la para bordo, dá-se o nome de:",
    expectedAnswer: "Suspender o ferro (ou virar amarra / alar).",
    acceptedKeywords: ["suspender", "virar amarra", "alar", "içar"],
    explanation: "Suspender é arrancar o ferro do fundo e alçá-lo até à sua posição de viagem na raposa ou no convés."
  },
  {
    id: "t9-q15",
    testNumber: 9,
    questionNumber: 15,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Manobras e Amarração",
    type: "multiple-choice",
    points: 0.5,
    statement: "Ao meter o leme a um bordo é necessário vencer uma certa força hidrodinâmica, que se designa por:",
    options: [
      "Resistência do hélice.",
      "Resistência passiva do casco.",
      "Resistência da proa.",
      "Resistência do leme."
    ],
    correctOptionIndex: 3,
    expectedAnswer: "Resistência do leme.",
    acceptedKeywords: ["resistência do leme"],
    explanation: "A água em escoamento exerce uma força perpendicular à porta do leme angulada, designada resistência do leme."
  },
  {
    id: "t9-q16",
    testNumber: 9,
    questionNumber: 16,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Manobras e Amarração",
    type: "multiple-choice",
    points: 0.5,
    statement: "A força de rotação exercida pelo leme é tanto maior:",
    options: [
      "Quanto menor for a velocidade.",
      "Quanto menor for o ângulo do leme.",
      "Quanto maior for a área da porta do leme e a velocidade da água.",
      "Quanto mais leve for a embarcação."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "Quanto maior for a área da porta do leme e a velocidade da água.",
    acceptedKeywords: ["maior a área", "velocidade"],
    explanation: "A eficácia e força do leme aumentam diretamente com a sua área superficial e com o quadrado da velocidade relativa da água que passa pela pá."
  },
  {
    id: "t9-q17",
    testNumber: 9,
    questionNumber: 17,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Manobras e Amarração",
    type: "multiple-choice",
    points: 0.5,
    statement: "Ao reduzir a velocidade da embarcação em marcha à vante, o efeito lateral de rotação do hélice:",
    options: [
      "Não tem qualquer efeito na manobra.",
      "Começa a sentir-se menos.",
      "Começa a sentir-se mais.",
      "Inverte de sentido automaticamente."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "Começa a sentir-se mais.",
    acceptedKeywords: ["sentir-se mais", "mais"],
    explanation: "A baixa velocidade o leme perde sustentação de governo e o efeito de pás do hélice passa a ter um impacto muito mais dominante no desvio da popa."
  },
  {
    id: "t9-q18",
    testNumber: 9,
    questionNumber: 18,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Nomenclatura da Embarcação",
    type: "multiple-choice",
    points: 0.5,
    statement: "Das peças abaixo enunciadas, sinalize as duas que constituem palamenta da embarcação:",
    options: [
      "Boeira e Croque.",
      "Leme e Enora.",
      "Quilha e Caverna.",
      "Cachola e Arganéu."
    ],
    correctOptionIndex: 0,
    expectedAnswer: "Boeira e Croque.",
    acceptedKeywords: ["boeira", "croque"],
    explanation: "Palamenta engloba os utensílios amovíveis de bordo indispensáveis à manobra e manutenção miúda (ex.: croque, boeira/bujão, vertedouro, remos)."
  },
  {
    id: "t9-q19",
    testNumber: 9,
    questionNumber: 19,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Nomenclatura da Embarcação",
    type: "open-answer",
    points: 0.5,
    statement: "O elemento propulsor que possibilita o avanço ou recuo de uma embarcação através do seu movimento circular em rotação chama-se:",
    expectedAnswer: "Hélice.",
    acceptedKeywords: ["hélice", "helice"],
    explanation: "O hélice marítimo é o órgão mecânico dotado de pás que converte potência de rotação em impulsão propulsora hidrodinâmica."
  },
  {
    id: "t9-q20",
    testNumber: 9,
    questionNumber: 20,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Nomenclatura da Embarcação",
    type: "multiple-choice",
    points: 0.5,
    statement: "Quanto às regiões de uma embarcação, o setor exterior lateral situado a meio comprimento, perpendicular à linha proa-popa, designa-se por:",
    options: [
      "Amura.",
      "Alheta.",
      "Través.",
      "Bochecha."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "Través.",
    acceptedKeywords: ["través", "traves"],
    explanation: "O través situa-se a meio navio em direção de 90° relativamente ao eixo longitudinal da embarcação."
  },
  {
    id: "t9-q21",
    testNumber: 9,
    questionNumber: 21,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Cabos e Nós",
    type: "multiple-choice",
    points: 0.5,
    statement: "Para fixar um cabo de amarração num cabeço duplo utilizamos:",
    options: [
      "Voltas falcas.",
      "Voltas de fiel.",
      "Voltas de tomadouro.",
      "Voltas redondas e cruzadas em oito."
    ],
    correctOptionIndex: 3,
    expectedAnswer: "Voltas redondas e cruzadas em oito.",
    acceptedKeywords: ["voltas redondas", "cruzadas", "oito"],
    explanation: "A amarração a cabeço duplo faz-se passando uma volta redonda pela base das duas colunas e em seguida sucessivas voltas em oito."
  },
  {
    id: "t9-q22",
    testNumber: 9,
    questionNumber: 22,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Cabos e Nós",
    type: "multiple-choice",
    points: 0.5,
    statement: "A ação marinheira de prender e fixar firmemente um cabo a um cabeço ou cunho designa-se:",
    options: [
      "Colher um cabo.",
      "Dar volta a um cabo.",
      "Cunhar um cabo.",
      "Aguentar um cabo."
    ],
    correctOptionIndex: 1,
    expectedAnswer: "Dar volta a um cabo.",
    acceptedKeywords: ["dar volta", "dar volta a um cabo"],
    explanation: "Dar volta é a expressão náutica exata para segurar e prender um cabo de manobra num ponto de amarração."
  },
  {
    id: "t9-q23",
    testNumber: 9,
    questionNumber: 23,
    sourceTests: [9],
    category: "Marinharia",
    subcategory: "Cabos e Nós",
    type: "multiple-choice",
    points: 0.5,
    statement: "Para unir dois cabos de bitolas (diâmetros) diferentes o nó náutico mais recomendado a utilizar é o:",
    options: [
      "Lais de guia.",
      "Nó direito.",
      "Nó torto.",
      "Nó de escota."
    ],
    correctOptionIndex: 3,
    expectedAnswer: "Nó de escota.",
    acceptedKeywords: ["nó de escota", "escota"],
    explanation: "O nó de escota (simples ou duplo) foi concebido especificamente para unir com segurança cabos de espessuras diferentes."
  },

  // 24 a 30: Outras Matérias (4.0 valores)
  {
    id: "t9-q24",
    testNumber: 9,
    questionNumber: 24,
    sourceTests: [9],
    category: "Outras Matérias",
    subcategory: "Legislação Marítima",
    type: "open-answer",
    points: 0.6,
    statement: "Complete a frase: O titular da carta de marinheiro com mais de 18 anos está habilitado ao comando de uma ER até ____ metros de comprimento, até uma distância máxima de ____ milhas da costa e ____ milhas de um porto de abrigo, em navegação diurna com potência instalada até ____ kW.",
    expectedAnswer: "7 metros de comprimento, até 3 milhas da costa e 10 milhas de um porto de abrigo, em navegação diurna com potência conforme a homologação da ER (ou 22,5 kW até aos 18 anos).",
    acceptedKeywords: ["7", "3", "10", "diurna"],
    explanation: "Artigo 34.º do Regulamento da Náutica de Recreio (DL 93/2018): Marinheiro maior de idade pode comandar ER até 7m em navegação diurna até 3 milhas da costa e 10 milhas de porto de abrigo."
  },
  {
    id: "t9-q25",
    testNumber: 9,
    questionNumber: 25,
    sourceTests: [9],
    category: "Outras Matérias",
    subcategory: "Legislação Marítima",
    type: "multiple-choice",
    points: 0.6,
    statement: "De acordo com o Regulamento da Náutica de Recreio, as embarcações de recreio com comprimento entre os 7 e os 15 metros destinadas a navegação até 25 milhas da costa classificam-se como:",
    options: [
      "Embarcações Tipo 1 (Navegação Oceânica).",
      "Embarcações Tipo 2 (Navegação ao Largo).",
      "Embarcações Tipo 4 (Navegação em Águas Abrigadas).",
      "Embarcações de Praia."
    ],
    correctOptionIndex: 1,
    expectedAnswer: "Embarcações Tipo 2 (Navegação ao Largo).",
    acceptedKeywords: ["tipo 2", "ao largo"],
    explanation: "Tipo 2 são embarcações concebidas para navegar até 25 milhas da costa e com comprimentos habituais até 15 metros."
  },
  {
    id: "t9-q26",
    testNumber: 9,
    questionNumber: 26,
    sourceTests: [9],
    category: "Outras Matérias",
    subcategory: "Marés e Navegação",
    type: "multiple-choice",
    points: 0.6,
    statement: "O plano de referência horizontal a que são referidas as sondas batimétricas indicadas na carta náutica chama-se:",
    options: [
      "Sonda Reduzida.",
      "Altura da maré.",
      "Zero Hidrográfico (ZH).",
      "Nível médio do mar."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "Zero Hidrográfico (ZH).",
    acceptedKeywords: ["zero hidrográfico", "zh"],
    explanation: "O Zero Hidrográfico é a superfície de referência das sondas cartográficas portuguesas, garantindo que raramente o mar desça abaixo desse nível."
  },
  {
    id: "t9-q27",
    testNumber: 9,
    questionNumber: 27,
    sourceTests: [9],
    category: "Outras Matérias",
    subcategory: "Marés e Navegação",
    type: "multiple-choice",
    points: 0.6,
    statement: "À distância vertical medida entre o plano do Zero Hidrográfico e a superfície da água num dado instante dá-se o nome de:",
    options: [
      "Sonda Reduzida.",
      "Altura da maré.",
      "Sonda à Hora.",
      "Amplitude de maré."
    ],
    correctOptionIndex: 1,
    expectedAnswer: "Altura da maré.",
    acceptedKeywords: ["altura da maré", "altura de maré"],
    explanation: "A Altura da Maré é a altura da superfície do mar acima do Zero Hidrográfico no momento em causa."
  },
  {
    id: "t9-q28",
    testNumber: 9,
    questionNumber: 28,
    sourceTests: [9],
    category: "Outras Matérias",
    subcategory: "Motores e Mecânica",
    type: "open-answer",
    points: 0.5,
    statement: "Complete a frase: O circuito de arrefecimento de um motor fora de borda após funcionamento em água salgada deve ser adoçado/lavado com:",
    expectedAnswer: "Água doce limpa (para retirar cristais de sal e resíduos corrosivos).",
    acceptedKeywords: ["água doce", "doce"],
    explanation: "O adoçamento regular do motor com água doce evita a cristalização do sal que obstrui as galerias de refrigeração e corrói o bloco."
  },
  {
    id: "t9-q29",
    testNumber: 9,
    questionNumber: 29,
    sourceTests: [9],
    category: "Outras Matérias",
    subcategory: "Balizagem",
    type: "multiple-choice",
    points: 0.6,
    statement: "Numa marca cardinal em que o alvo superior aponta para cima e o alvo inferior aponta para baixo (dois cones unidos pelas bases), o perigo encontra-se a:",
    options: [
      "Sul em relação à boia.",
      "Norte em relação à boia.",
      "Oeste em relação à boia (as águas navegáveis estão a Este).",
      "Este em relação à boia."
    ],
    correctOptionIndex: 2,
    expectedAnswer: "Oeste em relação à boia (as águas navegáveis estão a Este).",
    acceptedKeywords: ["oeste", "oeste em relação à boia"],
    explanation: "Cones unidos pela base identificam o quadrante Este. A marca indica que se deve navegar a Este da boia, pelo que o obstáculo/perigo está situado a Oeste da marca."
  },
  {
    id: "t9-q30",
    testNumber: 9,
    questionNumber: 30,
    sourceTests: [9],
    category: "Outras Matérias",
    subcategory: "Meteorologia",
    type: "multiple-choice",
    points: 0.5,
    statement: "O NAVTEX é um equipamento de radiocomunicações que permite receber a bordo:",
    options: [
      "Cartas de tempo por fax.",
      "Informação meteorológica marítima.",
      "Informação de segurança náutica e aviso sobre o estado de abertura das barras.",
      "As alíneas b) e c) estão corretas."
    ],
    correctOptionIndex: 3,
    expectedAnswer: "As alíneas b) e c) estão corretas.",
    acceptedKeywords: ["b e c", "todas", "corretas"],
    explanation: "O Navtex transmite automaticamente na frequência internacional de 518 kHz boletins meteorológicos, avisos à navegação e estado de acesso às barras portuárias."
  }
];
