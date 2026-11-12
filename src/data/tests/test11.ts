import { TestQuestion } from "../../types/tests";

/**
 * TESTE 11 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_11_QUESTIONS: TestQuestion[] = [
  {
    "id": "t11-q01",
    "testNumber": 11,
    "questionNumber": 1,
    "sourceTests": [
      11
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Como é que um navio desgovernado sinaliza essa situação aos navios na vizinhança durante o dia?",
    "options": [
      "Colocando três balões esféricos no mastro.",
      "Colocando um balão cilíndrico no mastro.",
      "Colocando três balões no mastro sendo o superior e inferior esféricos e o do meio bicónico.",
      "Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.",
    "acceptedKeywords": [
      "dois balões esféricos",
      "dois balões pretos"
    ],
    "explanation": "Regra 27(a) do RIEAM."
  },
  {
    "id": "t11-q02",
    "testNumber": 11,
    "questionNumber": 2,
    "sourceTests": [
      11
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
    "id": "t11-q03",
    "testNumber": 11,
    "questionNumber": 3,
    "sourceTests": [
      11
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio encalhado exibe durante o dia:",
    "options": [
      "Três balões esféricos pretos dispostos verticalmente.",
      "Dois balões bicónicos.",
      "Um cilindro preto.",
      "Três bicónicos verticais."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Três balões esféricos pretos dispostos verticalmente.",
    "acceptedKeywords": [
      "três balões esféricos",
      "três esferas"
    ],
    "explanation": "Regra 30(d) do RIEAM."
  },
  {
    "id": "t11-q04",
    "testNumber": 11,
    "questionNumber": 4,
    "sourceTests": [
      11
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Desenhe na figura ao lado os balões correspondentes a um navio com capacidade de manobra reduzida:",
    "expectedAnswer": "Três marcas dispostas verticalmente: esfera preta superior, bicónico (losango) preto central e esfera preta inferior.",
    "acceptedKeywords": [
      "esfera",
      "bicónico",
      "losango"
    ],
    "explanation": "Regra 27(b) do RIEAM.",
    "diagram": {
      "type": "day-shapes",
      "variant": "mast-unmarked"
    }
  },
  {
    "id": "t11-q05",
    "testNumber": 11,
    "questionNumber": 5,
    "sourceTests": [
      11
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
    "explanation": "Regra 34(a) do RIEAM: Dois sons curtos significam: \"Estou a guinar para bombordo\"."
  },
  {
    "id": "t11-q06",
    "testNumber": 11,
    "questionNumber": 6,
    "sourceTests": [
      11
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Uma embarcação de propulsão mecânica com as máquinas a trabalhar a ré deve emitir:",
    "options": [
      "Um som curto.",
      "Dois sons curtos.",
      "Três sons curtos.",
      "Dois sons longos."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Três sons curtos.",
    "acceptedKeywords": [
      "três sons curtos",
      "três curtos"
    ],
    "explanation": "Regra 34(a) do RIEAM."
  },
  {
    "id": "t11-q07",
    "testNumber": 11,
    "questionNumber": 7,
    "sourceTests": [
      11
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Em caso de homem ao mar, quais as primeiras ações imediatas a tomar pelo timoneiro?",
    "expectedAnswer": "Gritar \"Homem ao mar!\", meter o leme para o bordo da queda para afastar a popa/hélice do náufrago, lançar a boia salva-vidas e reduzir a velocidade.",
    "acceptedKeywords": [
      "homem ao mar",
      "leme para o bordo da queda",
      "boia salva-vidas",
      "afastar o hélice"
    ],
    "explanation": "Manobra de emergência de homem ao mar."
  },
  {
    "id": "t11-q08",
    "testNumber": 11,
    "questionNumber": 8,
    "sourceTests": [
      11
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Os fachos de mão de luz vermelha têm como objetivo:",
    "options": [
      "Assinalar socorro imediato à noite ou em visibilidade reduzida com luz vermelha intensa.",
      "Iluminar o convés.",
      "Pescar chocos.",
      "Aquecer as mãos."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Assinalar socorro imediato à noite ou em visibilidade reduzida com luz vermelha intensa.",
    "acceptedKeywords": [
      "socorro imediato",
      "luz vermelha"
    ],
    "explanation": "Sinalização pirotécnica noturna regulamentar."
  },
  {
    "id": "t11-q09",
    "testNumber": 11,
    "questionNumber": 9,
    "sourceTests": [
      11
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Num incêndio com combustível líquido em espaço confinado deve-se utilizar:",
    "options": [
      "Extintor de pó químico ou CO2.",
      "Mangueira com jato de água direto.",
      "Balde com água salgada.",
      "Abrir todas as portas."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Extintor de pó químico ou CO2.",
    "acceptedKeywords": [
      "pó químico",
      "co2"
    ],
    "explanation": "Extinção por abafamento e inibição química."
  },
  {
    "id": "t11-q10",
    "testNumber": 11,
    "questionNumber": 10,
    "sourceTests": [
      11
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A um sinistrado com suspeita de hemorragia interna abdominal deve-se:",
    "expectedAnswer": "Manter a vítima em repouso absoluto na posição deitada com pernas fletidas, agasalhada, controlar os sinais vitais, chamar socorro urgente e NÃO dar de beber nem comer.",
    "acceptedKeywords": [
      "repouso",
      "não dar de beber",
      "agasalhada",
      "socorro urgente"
    ],
    "explanation": "Primeiros socorros em hemorragias internas."
  },
  {
    "id": "t11-q11",
    "testNumber": 11,
    "questionNumber": 11,
    "sourceTests": [
      11
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
    "explanation": "Frequência respiratória normal."
  },
  {
    "id": "t11-q12",
    "testNumber": 11,
    "questionNumber": 12,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A corrente constituída por elos em ferro ou aço talingada à âncora designa-se por:",
    "expectedAnswer": "Amarra.",
    "acceptedKeywords": [
      "amarra"
    ],
    "explanation": "Linha de fundeio."
  },
  {
    "id": "t11-q13",
    "testNumber": 11,
    "questionNumber": 13,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de \"içar o ferro\" (arrancar a âncora do fundo e recolhê-la) designa-se por:",
    "expectedAnswer": "Suspender (ou virar amarra).",
    "acceptedKeywords": [
      "suspender",
      "virar amarra"
    ],
    "explanation": "Suspender."
  },
  {
    "id": "t11-q14",
    "testNumber": 11,
    "questionNumber": 14,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "No ferro de Almirantado, qual o nome da barra transversal móvel que fica perpendicular ao plano dos braços?",
    "expectedAnswer": "Cepo.",
    "acceptedKeywords": [
      "cepo"
    ],
    "explanation": "Cepo da âncora."
  },
  {
    "id": "t11-q15",
    "testNumber": 11,
    "questionNumber": 15,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Partindo do repouso com vento forte de través, numa embarcação de recreio com motor em marcha à vante e leme a meio:",
    "options": [
      "A embarcação sofre deriva significativa para sotavento.",
      "A embarcação avança a direito sem desvio.",
      "A embarcação sobe o vento para barlavento.",
      "O leme deixa de funcionar para sempre."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "A embarcação sofre deriva significativa para sotavento.",
    "acceptedKeywords": [
      "deriva para sotavento",
      "deriva"
    ],
    "explanation": "O vento lateral arrasta o costado antes de haver escoamento estabilizador no leme."
  },
  {
    "id": "t11-q16",
    "testNumber": 11,
    "questionNumber": 16,
    "sourceTests": [
      11
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
    "explanation": "Força hidrodinâmica no leme."
  },
  {
    "id": "t11-q17",
    "testNumber": 11,
    "questionNumber": 17,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Ao reduzir a velocidade da embarcação em marcha à vante, o efeito lateral de rotação do hélice:",
    "options": [
      "Não tem qualquer efeito.",
      "Começa a sentir-se menos.",
      "Começa a sentir-se mais.",
      "Inverte o sentido de marcha."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Começa a sentir-se mais.",
    "acceptedKeywords": [
      "sentir-se mais",
      "mais"
    ],
    "explanation": "Efeito lateral do hélice a baixa velocidade."
  },
  {
    "id": "t11-q18",
    "testNumber": 11,
    "questionNumber": 18,
    "sourceTests": [
      11
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
    "explanation": "Boça de proa."
  },
  {
    "id": "t11-q19",
    "testNumber": 11,
    "questionNumber": 19,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O dispositivo que possibilita o avanço ou recuo de uma embarcação através do seu movimento circular chama-se:",
    "expectedAnswer": "Hélice.",
    "acceptedKeywords": [
      "hélice",
      "helice"
    ],
    "explanation": "Hélice propulsor."
  },
  {
    "id": "t11-q20",
    "testNumber": 11,
    "questionNumber": 20,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A peça estrutural longitudinal fixada sobre a quilha pelo lado interior das cavernas designa-se por:",
    "options": [
      "Sobrequilha.",
      "Trincaniz.",
      "Robalete.",
      "Borda falsa."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Sobrequilha.",
    "acceptedKeywords": [
      "sobrequilha"
    ],
    "explanation": "A sobrequilha reforça internamente a união das cavernas com a quilha."
  },
  {
    "id": "t11-q21",
    "testNumber": 11,
    "questionNumber": 21,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Identifique o nó que forma uma laçada fixa que não aperta sob esforço e dê um exemplo da sua aplicação:",
    "expectedAnswer": "Lais de guia. Aplica-se na encapeladura de espias em cabeços do cais ou em cabos de salvamento.",
    "acceptedKeywords": [
      "lais de guia",
      "cabeço",
      "encapeladura",
      "laçada"
    ],
    "explanation": "Lais de guia."
  },
  {
    "id": "t11-q22",
    "testNumber": 11,
    "questionNumber": 22,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O que é a boca de uma embarcação?",
    "options": [
      "Uma elevação a meio do convés.",
      "A largura máxima da embarcação medida entre os bordos exteriores.",
      "Um cabo de proa.",
      "O orifício de esgoto do fundo do casco."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "A largura máxima da embarcação medida entre os bordos exteriores.",
    "acceptedKeywords": [
      "largura máxima",
      "largura"
    ],
    "explanation": "Dimensão principal: boca máxima."
  },
  {
    "id": "t11-q23",
    "testNumber": 11,
    "questionNumber": 23,
    "sourceTests": [
      11
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A ação de enrolar um cabo em voltas largas e sucessivas de modo a ficar pronto a usar designa-se:",
    "options": [
      "Alar um cabo.",
      "Colher um cabo (em aduchas).",
      "Arrumar um cabo.",
      "Aguentar um cabo."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Colher um cabo (em aduchas).",
    "acceptedKeywords": [
      "colher",
      "aduchas"
    ],
    "explanation": "Colher cabos em aduchas."
  },
  {
    "id": "t11-q24",
    "testNumber": 11,
    "questionNumber": 24,
    "sourceTests": [
      11
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "A carta de navegador de recreio que habilita o titular ao comando de embarcação de recreio em navegação sem limite de área é:",
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
    "explanation": "Patrão de Alto Mar."
  },
  {
    "id": "t11-q25",
    "testNumber": 11,
    "questionNumber": 25,
    "sourceTests": [
      11
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "As vistorias periódicas de manutenção a embarcações de recreio destinam-se a:",
    "expectedAnswer": "Verificar as condições de navegabilidade, estanquidade do casco, funcionamento dos motores e validade dos equipamentos de segurança e salvação a bordo.",
    "acceptedKeywords": [
      "navegabilidade",
      "segurança",
      "estanquidade",
      "equipamentos de segurança"
    ],
    "explanation": "Fiscalização técnica de segurança marítima."
  },
  {
    "id": "t11-q26",
    "testNumber": 11,
    "questionNumber": 26,
    "sourceTests": [
      11
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Supondo que a sua embarcação encalhou às 12 horas e a maré tinha começado a vazar às 10 horas, a que horas deve iniciar as manobras de desencalhe?",
    "options": [
      "Perto da próxima preia-mar (cerca das 22h-23h, quando a maré voltar a encher).",
      "Imediatamente na baixamar.",
      "À meia-noite sem luz.",
      "Nunca, a embarcação está perdida."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Perto da próxima preia-mar (cerca das 22h-23h, quando a maré voltar a encher).",
    "acceptedKeywords": [
      "próxima preia-mar",
      "maré voltar a encher",
      "encher"
    ],
    "explanation": "Desencalha-se com maré cheia e nível de água máximo."
  },
  {
    "id": "t11-q27",
    "testNumber": 11,
    "questionNumber": 27,
    "sourceTests": [
      11
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "A altura entre o Zero Hidrográfico e a superfície da água dá-se o nome de:",
    "options": [
      "Sonda Reduzida.",
      "Altura da maré.",
      "Sonda à Hora.",
      "Nível médio."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Altura da maré.",
    "acceptedKeywords": [
      "altura da maré"
    ],
    "explanation": "Hm."
  },
  {
    "id": "t11-q28",
    "testNumber": 11,
    "questionNumber": 28,
    "sourceTests": [
      11
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Falta súbita de potência de um motor fora de borda a gasolina pode ser provocada por:",
    "options": [
      "Filtro de combustível parcialmente obstruído ou vela suja/defeituosa.",
      "Bateria descarregada.",
      "Nível de óleo excessivo no depósito de água doce.",
      "Pintura exterior nova."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Filtro de combustível parcialmente obstruído ou vela suja/defeituosa.",
    "acceptedKeywords": [
      "filtro de combustível",
      "combustível"
    ],
    "explanation": "Problema na alimentação de combustível ou ignição."
  },
  {
    "id": "t11-q29",
    "testNumber": 11,
    "questionNumber": 29,
    "sourceTests": [
      11
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "open-answer",
    "points": 0.6,
    "statement": "As marcas cardinais do sistema IALA caracterizam-se por que cores e alvos?",
    "expectedAnswer": "Cores: Combinações de faixas pretas e amarelas horizontais; Alvos: Dois cones pretos (Norte: ambos para cima; Sul: ambos para baixo; Este: opostos pelas bases; Oeste: opostos pelos vértices).",
    "acceptedKeywords": [
      "preto e amarelo",
      "cones pretos",
      "faixas pretas e amarelas"
    ],
    "explanation": "Sistema de balizagem cardinal IALA Região A."
  },
  {
    "id": "t11-q30",
    "testNumber": 11,
    "questionNumber": 30,
    "sourceTests": [
      11
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O NAVTEX é um sistema de radiodifusão e receção automática de informação de segurança marítima (MSI), que inclui:",
    "options": [
      "Avisos aos navegantes.",
      "Boletins meteorológicos.",
      "Alertas de busca e salvamento (SAR).",
      "Todas as alíneas anteriores estão corretas."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Todas as alíneas anteriores estão corretas.",
    "acceptedKeywords": [
      "todas",
      "corretas"
    ],
    "explanation": "Serviço global NAVTEX."
  }
];
