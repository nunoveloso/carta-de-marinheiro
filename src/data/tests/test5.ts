import { TestQuestion } from "../../types/tests";

/**
 * TESTE 5 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_5_QUESTIONS: TestQuestion[] = [
  {
    "id": "t5-q01",
    "testNumber": 5,
    "questionNumber": 1,
    "sourceTests": [
      5
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica deve desviar-se do caminho de:",
    "options": [
      "Um navio desgovernado.",
      "Um navio com capacidade de manobra reduzida.",
      "Um navio na faina da pesca ou um navio à vela.",
      "Todas as alíneas anteriores estão corretas."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Todas as alíneas anteriores estão corretas.",
    "acceptedKeywords": [
      "todas",
      "corretas"
    ],
    "explanation": "Regra 18 do RIEAM: Hierarquia de responsabilidades entre embarcações."
  },
  {
    "id": "t5-q02",
    "testNumber": 5,
    "questionNumber": 2,
    "sourceTests": [
      5
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "open-answer",
    "points": 1,
    "statement": "Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:",
    "expectedAnswer": "A embarcação A tem direito a rumo porque se encontra com capacidade de manobra reduzida.",
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
    "id": "t5-q03",
    "testNumber": 5,
    "questionNumber": 3,
    "sourceTests": [
      5
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Uma embarcação que navegue simultaneamente à vela e com propulsão mecânica deve apresentar de dia:",
    "options": [
      "Um balão esférico preto na proa.",
      "Um balão bicónico preto.",
      "Um balão cónico preto com o vértice para baixo.",
      "Nenhuma marca se for menor de 12 metros."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Um balão cónico preto com o vértice para baixo.",
    "acceptedKeywords": [
      "cone preto",
      "vértice para baixo"
    ],
    "explanation": "Regra 25(e) do RIEAM."
  },
  {
    "id": "t5-q04",
    "testNumber": 5,
    "questionNumber": 4,
    "sourceTests": [
      5
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Desenhe na figura ao lado os balões correspondentes a um navio encalhado:",
    "expectedAnswer": "Três balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.",
    "acceptedKeywords": [
      "três balões esféricos",
      "três esferas pretas"
    ],
    "explanation": "Regra 30(d) do RIEAM: Navio encalhado exibe 3 esferas pretas na vertical.",
    "diagram": {
      "type": "day-shapes",
      "variant": "mast-unmarked"
    }
  },
  {
    "id": "t5-q05",
    "testNumber": 5,
    "questionNumber": 5,
    "sourceTests": [
      5
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de comprimento igual ou superior a 12 metros e inferior a 20 metros deve dispor de material de sinalização sonora composto por:",
    "options": [
      "Apito, sino e gongo.",
      "Apito, sino e gongo opcional.",
      "Apito (e o sino é opcional).",
      "Apito, sino e gongo todos opcionais."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Apito (e o sino é opcional).",
    "acceptedKeywords": [
      "apito",
      "sino opcional"
    ],
    "explanation": "Regra 33(a) do RIEAM: Embarcações de 12m a 20m não são obrigadas a levar sino, mas devem ter apito."
  },
  {
    "id": "t5-q06",
    "testNumber": 5,
    "questionNumber": 6,
    "sourceTests": [
      5
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica na faina da pesca e com visibilidade reduzida deve emitir o seguinte sinal sonoro:",
    "options": [
      "Um som curto a cada dois minutos.",
      "Dois sons longos a cada dois minutos.",
      "Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.",
      "Três sons curtos com intervalos não superiores a dois minutos."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.",
    "acceptedKeywords": [
      "prolongado seguido de dois curtos"
    ],
    "explanation": "Regra 35(c) do RIEAM."
  },
  {
    "id": "t5-q07",
    "testNumber": 5,
    "questionNumber": 7,
    "sourceTests": [
      5
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Descreva o que entende por drogue ou âncora flutuante, e quando e como deve ser usado:",
    "expectedAnswer": "É um dispositivo cónico de lona que se lança à água pela proa ou popa ligado por um cabo comprido. Usa-se em mau tempo (para ficar à capa) para diminuir a velocidade de deriva e manter a embarcação alinhada com as vagas.",
    "acceptedKeywords": [
      "reduzir a deriva",
      "manter alinhada",
      "mau tempo",
      "à capa"
    ],
    "explanation": "O drogue trava a embarcação hidrodinamicamente no mar bravo, prevenindo o atravessamento à vaga."
  },
  {
    "id": "t5-q08",
    "testNumber": 5,
    "questionNumber": 8,
    "sourceTests": [
      5
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Enuncie três meios de salvação individuais ou coletivos regulamentares:",
    "expectedAnswer": "1. Coletes salva-vidas; 2. Boia circular de salvação com retinida; 3. Jangada pneumática salva-vidas.",
    "acceptedKeywords": [
      "colete",
      "boia",
      "jangada"
    ],
    "explanation": "Meios padrão de salvamento em mar."
  },
  {
    "id": "t5-q09",
    "testNumber": 5,
    "questionNumber": 9,
    "sourceTests": [
      5
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "open-answer",
    "points": 1,
    "statement": "Qual o método e agente de extinção que devemos usar num incêndio com origem em equipamentos elétricos em carga?",
    "expectedAnswer": "Extintor de dióxido de carbono (CO2) ou pó químico seco, cortando previamente a corrente elétrica. Nunca usar água.",
    "acceptedKeywords": [
      "co2",
      "dióxido de carbono",
      "pó químico",
      "nunca água"
    ],
    "explanation": "A água conduz corrente elétrica e provoca choque mortal no operador."
  },
  {
    "id": "t5-q10",
    "testNumber": 5,
    "questionNumber": 10,
    "sourceTests": [
      5
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Complete a frase com uma das palavras (Consciente / Inconsciente): A Posição Lateral de Segurança (PLS) deve ser utilizada em sinistrados ____ que respirem e com batimentos cardíacos.",
    "expectedAnswer": "Inconsciente (ou inconscientes).",
    "acceptedKeywords": [
      "inconsciente",
      "inconscientes"
    ],
    "explanation": "A PLS destina-se exclusivamente a pessoas inconscientes mas a respirar, para manter a via aérea permeável."
  },
  {
    "id": "t5-q11",
    "testNumber": 5,
    "questionNumber": 11,
    "sourceTests": [
      5
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
    "explanation": "Frequência basal fisiológica respiratória normal no adulto."
  },
  {
    "id": "t5-q12",
    "testNumber": 5,
    "questionNumber": 12,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Observe a figura da âncora de Almirantado e indique as partes principais: haste, cepo, braços, unhas e anete.",
    "expectedAnswer": "Haste, Cepo, Braços, Unhas e Anete.",
    "acceptedKeywords": [
      "haste",
      "cepo",
      "unhas",
      "braços",
      "anete"
    ],
    "explanation": "Nomenclatura clássica do ferro de cepo/almirantado."
  },
  {
    "id": "t5-q13",
    "testNumber": 5,
    "questionNumber": 13,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "De entre os fundos abaixo, indique aqueles que se podem considerar de boa tença:",
    "options": [
      "Lajes e rocha lisa.",
      "Barro (lama consistente) e areia.",
      "Seixos soltos e cascalho.",
      "Fundo de algas flutuantes."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Barro (lama consistente) e areia.",
    "acceptedKeywords": [
      "barro",
      "areia"
    ],
    "explanation": "Barro e areia permitem a penetração e unhadura das pás do ferro."
  },
  {
    "id": "t5-q14",
    "testNumber": 5,
    "questionNumber": 14,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O arinque é:",
    "options": [
      "Uma volta de cabo.",
      "Um cabo fino que liga a âncora à boia de arinque para assinalar a posição do ferro.",
      "Um tipo especial de âncora.",
      "Uma manilha de amarração."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Um cabo fino que liga a âncora à boia de arinque para assinalar a posição do ferro.",
    "acceptedKeywords": [
      "cabo",
      "boia de arinque"
    ],
    "explanation": "O arinque permite localizar a âncora e desferrá-la pela cruz se ficar presa numa rocha."
  },
  {
    "id": "t5-q15",
    "testNumber": 5,
    "questionNumber": 15,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Numa amarração ao cais, identifique os cabos: Lançante de vante e Regeira de vante.",
    "expectedAnswer": "Lançante de vante (vai da proa para a frente) e Regeira de vante (vai da proa para a ré).",
    "acceptedKeywords": [
      "lançante",
      "regeira"
    ],
    "explanation": "Lançantes impedem o recuo ou avanço geral; as regeiras impedem a deslocação em sentido contrário."
  },
  {
    "id": "t5-q16",
    "testNumber": 5,
    "questionNumber": 16,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Na manobra de rotação para recolha de um náufrago que caiu por bombordo (BB), deve-se de imediato:",
    "options": [
      "Guinar para estibordo.",
      "Guinar para bombordo (BB), de modo a afastar a popa do náufrago.",
      "Acelerar a toda a força à vante.",
      "Manter o leme a meio e dar máquinas à ré."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Guinar para bombordo (BB), de modo a afastar a popa do náufrago.",
    "acceptedKeywords": [
      "guinar para bombordo",
      "afastar a popa"
    ],
    "explanation": "Ao guinar para o bordo da queda, a popa e o hélice afastam-se imediatamente da vítima."
  },
  {
    "id": "t5-q17",
    "testNumber": 5,
    "questionNumber": 17,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "No movimento do hélice em marcha à vante, a corrente de descarga atua no leme:",
    "options": [
      "Provocando pressão hidrodinâmica sobre a porta do leme.",
      "Provocando pressão sobre a madre do leme.",
      "Provocando atração sobre a cachola.",
      "Sem provocar qualquer alteração no governo."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Provocando pressão hidrodinâmica sobre a porta do leme.",
    "acceptedKeywords": [
      "pressão",
      "porta do leme"
    ],
    "explanation": "O fluxo de água acelerado pelo hélice atinge a porta do leme, gerando a força que faz guinar o barco."
  },
  {
    "id": "t5-q18",
    "testNumber": 5,
    "questionNumber": 18,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A parte submersa do casco de uma embarcação designa-se por:",
    "options": [
      "Robalete.",
      "Costado.",
      "Obras vivas ou querena.",
      "Obras mortas."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Obras vivas ou querena.",
    "acceptedKeywords": [
      "obras vivas",
      "querena"
    ],
    "explanation": "Querena é a superfície do casco em contacto permanente com a água."
  },
  {
    "id": "t5-q19",
    "testNumber": 5,
    "questionNumber": 19,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A peça longitudinal estrutural fundamental que constitui a espinha dorsal da ossada da embarcação designa-se por:",
    "options": [
      "Longarina.",
      "Quilha.",
      "Baliza.",
      "Trincaniz."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Quilha.",
    "acceptedKeywords": [
      "quilha"
    ],
    "explanation": "A quilha é a viga mestra inferior que corre longitudinalmente de proa a ré."
  },
  {
    "id": "t5-q20",
    "testNumber": 5,
    "questionNumber": 20,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Quanto às regiões de uma embarcação, a zona posterior curva de transição entre o costado e a popa designa-se por:",
    "expectedAnswer": "Alheta (alheta de bombordo ou de estibordo).",
    "acceptedKeywords": [
      "alheta"
    ],
    "explanation": "A alheta fica situada entre o través e a popa."
  },
  {
    "id": "t5-q21",
    "testNumber": 5,
    "questionNumber": 21,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O que é a boça de uma embarcação?",
    "options": [
      "Uma elevação a meio do convés.",
      "Um cabo fixo à proa que serve para amarrar a embarcação.",
      "Uma peça de ferro fundido.",
      "A largura máxima da embarcação."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Um cabo fixo à proa que serve para amarrar a embarcação.",
    "acceptedKeywords": [
      "cabo",
      "amarrar"
    ],
    "explanation": "Cabo de proa para amarração ou reboque rápido."
  },
  {
    "id": "t5-q22",
    "testNumber": 5,
    "questionNumber": 22,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Identifique o nó que forma uma laçada fixa que não corre nem aperta sob tensão e dê um exemplo da sua aplicação:",
    "expectedAnswer": "Lais de guia. Aplica-se para passar uma laçada num cabeço do cais ou içar um homem em segurança.",
    "acceptedKeywords": [
      "lais de guia",
      "cabeço",
      "laçada"
    ],
    "explanation": "O lais de guia é o rei dos nós em marinharia."
  },
  {
    "id": "t5-q23",
    "testNumber": 5,
    "questionNumber": 23,
    "sourceTests": [
      5
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Para fixar um cabo a um cunho de amarração devem-se utilizar:",
    "options": [
      "Apenas uma volta redonda.",
      "Voltas em oito cruzadas rematadas com meia volta mordida.",
      "Nó cego com várias laçadas.",
      "Nó de barcaça."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Voltas em oito cruzadas rematadas com meia volta mordida.",
    "acceptedKeywords": [
      "voltas em oito",
      "oito"
    ],
    "explanation": "As voltas em oito no cunho prendem sem encavalar e desfazem-se facilmente sob carga."
  },
  {
    "id": "t5-q24",
    "testNumber": 5,
    "questionNumber": 24,
    "sourceTests": [
      5
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Uma embarcação de recreio do Tipo 4 (águas abrigadas) pode navegar até:",
    "options": [
      "Até 25 milhas da costa e 60 milhas do porto de abrigo.",
      "Até 3 milhas da costa e 6 milhas do porto de abrigo.",
      "Até 5 milhas da costa e 10 milhas do porto de abrigo.",
      "Até 6 milhas da costa e 20 milhas do porto de abrigo."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Até 3 milhas da costa e 6 milhas do porto de abrigo.",
    "acceptedKeywords": [
      "3 milhas",
      "6 milhas"
    ],
    "explanation": "Regulamento da Náutica de Recreio: ER Tipo 4 está restrita a águas abrigadas, 3 milhas da costa e 6 milhas de abrigo."
  },
  {
    "id": "t5-q25",
    "testNumber": 5,
    "questionNumber": 25,
    "sourceTests": [
      5
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Quando é que uma embarcação de recreio deve possuir um sinal luminoso automático acoplado à boia de salvação individual?",
    "expectedAnswer": "Sempre que navegue de noite (em navegação noturna).",
    "acceptedKeywords": [
      "noite",
      "navegação noturna"
    ],
    "explanation": "O dispositivo luminoso de acendimento automático na boia é obrigatório para localização noturna do náufrago."
  },
  {
    "id": "t5-q26",
    "testNumber": 5,
    "questionNumber": 26,
    "sourceTests": [
      5
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Que instrumento de navegação usa para determinar a profundidade real da água por baixo da quilha em qualquer momento?",
    "options": [
      "Prumo de mão ou sonda acústica (ecobatímetro).",
      "Odómetro.",
      "Anemómetro.",
      "Agulha magnética."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Prumo de mão ou sonda acústica (ecobatímetro).",
    "acceptedKeywords": [
      "sonda",
      "ecobatímetro",
      "prumo"
    ],
    "explanation": "A sonda náutica (eletrónica ou prumo de mão) mede a coluna de água abaixo do transdutor ou casco."
  },
  {
    "id": "t5-q27",
    "testNumber": 5,
    "questionNumber": 27,
    "sourceTests": [
      5
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "O plano horizontal a que são referidas as Sondas Reduzidas indicado na carta de navegação designa-se por:",
    "expectedAnswer": "Zero Hidrográfico (ZH).",
    "acceptedKeywords": [
      "zero hidrográfico",
      "zh"
    ],
    "explanation": "Plano de referência batimétrico das cartas hidrográficas nacionais."
  },
  {
    "id": "t5-q28",
    "testNumber": 5,
    "questionNumber": 28,
    "sourceTests": [
      5
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Indique duas causas prováveis para o sobreaquecimento súbito de um motor marítimo com arrefecimento a água:",
    "expectedAnswer": "Tomada de água salgada obstruída (plásticos/algas) e falha/desgaste do impulsor da bomba de água (rotor de borracha/impeller).",
    "acceptedKeywords": [
      "tomada de água",
      "bomba de água",
      "impulsor",
      "rotor"
    ],
    "explanation": "A interrupção do caudal de água fria provoca rápida subida da temperatura do motor."
  },
  {
    "id": "t5-q29",
    "testNumber": 5,
    "questionNumber": 29,
    "sourceTests": [
      5
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "open-answer",
    "points": 0.6,
    "statement": "A que se destinam as marcas cardinais do sistema de balizagem IALA?",
    "expectedAnswer": "Destinam-se a indicar ao navegador o quadrante (Norte, Sul, Este ou Oeste) onde se encontram as águas mais profundas e seguras para navegar em relação a um perigo.",
    "acceptedKeywords": [
      "águas navegáveis",
      "rumo seguro",
      "quadrante",
      "perigo"
    ],
    "explanation": "Cada marca cardinal (N, S, E, W) indica o bordo seguro por onde se deve passar."
  },
  {
    "id": "t5-q30",
    "testNumber": 5,
    "questionNumber": 30,
    "sourceTests": [
      5
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Em que camada da atmosfera terrestre ocorrem praticamente todos os fenómenos meteorológicos (nuvens, chuva, vento)?",
    "options": [
      "Estratosfera.",
      "Troposfera.",
      "Termosfera.",
      "Mesosfera."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Troposfera.",
    "acceptedKeywords": [
      "troposfera"
    ],
    "explanation": "A troposfera é a camada inferior da atmosfera (até ~12 km) onde ocorrem as variações meteorológicas."
  }
];
