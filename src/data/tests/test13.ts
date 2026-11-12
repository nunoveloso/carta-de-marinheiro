import { TestQuestion } from "../../types/tests";

/**
 * TESTE 13 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_13_QUESTIONS: TestQuestion[] = [
  {
    "id": "t13-q01",
    "testNumber": 13,
    "questionNumber": 1,
    "sourceTests": [
      13
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Toda a embarcação que alcance outra desvia-se dela:",
    "options": [
      "Ultrapassando por sotavento.",
      "Ultrapassando por barlavento.",
      "Apenas se a outra for de propulsão mecânica.",
      "Mantendo-se desimpedida do caminho da embarcação alcançada."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Mantendo-se desimpedida do caminho da embarcação alcançada.",
    "acceptedKeywords": [
      "desimpedida",
      "manter-se desimpedida"
    ],
    "explanation": "Regra 13 do RIEAM. Chave Oficial 1: d)."
  },
  {
    "id": "t13-q02",
    "testNumber": 13,
    "questionNumber": 2,
    "sourceTests": [
      13
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "open-answer",
    "points": 1,
    "statement": "Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação B tem direito a rumo porque:",
    "expectedAnswer": "A embarcação B tem direito a rumo porque vai a navegar à vela e a embarcação A é de propulsão mecânica.",
    "acceptedKeywords": [
      "vela",
      "à vela",
      "propulsão mecânica"
    ],
    "explanation": "Regra 18 do RIEAM. Chave Oficial 2: B - vai a navegar à vela e a A é de propulsão mecânica.",
    "diagram": {
      "type": "vessel-crossing",
      "variant": "crossing-a-standon"
    }
  },
  {
    "id": "t13-q03",
    "testNumber": 13,
    "questionNumber": 3,
    "sourceTests": [
      13
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio encalhado exibe durante o dia:",
    "options": [
      "Dois balões esféricos pretos.",
      "Três balões bicónicos pretos.",
      "Dois cones pretos unidos pelo vértice.",
      "Três balões esféricos pretos dispostos verticalmente."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Três balões esféricos pretos dispostos verticalmente.",
    "acceptedKeywords": [
      "três balões esféricos",
      "três esferas"
    ],
    "explanation": "Regra 30(d) do RIEAM. Chave Oficial 3: d)."
  },
  {
    "id": "t13-q04",
    "testNumber": 13,
    "questionNumber": 4,
    "sourceTests": [
      13
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Avista um navio pelo seu bombordo exibindo um cilindro preto de dia e verifica estar em rota de colisão. Tem que manobrar? Porquê?",
    "expectedAnswer": "Sim - Navio condicionado pelo seu calado tem prioridade e não pode manobrar livremente fora do canal.",
    "acceptedKeywords": [
      "sim",
      "condicionado pelo calado",
      "calado"
    ],
    "explanation": "Regra 18(d) do RIEAM. Chave Oficial 4: Sim - Navio condicionado pelo calado."
  },
  {
    "id": "t13-q05",
    "testNumber": 13,
    "questionNumber": 5,
    "sourceTests": [
      13
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica a rebocar e com visibilidade reduzida deve emitir o seguinte sinal sonoro:",
    "options": [
      "Um som prolongado seguido de dois curtos com intervalos que não ultrapassem os dois minutos.",
      "Dois sons longos com intervalos de dois minutos.",
      "Um som curto a cada minuto.",
      "Três sons curtos."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Um som prolongado seguido de dois curtos com intervalos que não ultrapassem os dois minutos.",
    "acceptedKeywords": [
      "prolongado seguido de dois curtos"
    ],
    "explanation": "Regra 35(c) do RIEAM. Chave Oficial 5: a)."
  },
  {
    "id": "t13-q06",
    "testNumber": 13,
    "questionNumber": 6,
    "sourceTests": [
      13
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Uma embarcação de propulsão mecânica que pretende guinar para Estibordo (EB) deve indicá-lo emitindo:",
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
    "explanation": "Regra 34(a) do RIEAM. Chave Oficial 6: a)."
  },
  {
    "id": "t13-q07",
    "testNumber": 13,
    "questionNumber": 7,
    "sourceTests": [
      13
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Quando estiver dentro da água com o colete salva-vidas à espera de resgate, para evitar a perda rápida de calor (hipotermia) deve:",
    "options": [
      "Nadar o mais rápido possível para aquecer.",
      "Retirar o colete.",
      "Mergulhar a cabeça debaixo de água.",
      "Adotar a posição de proteção contra a perda de calor (posição HELP / pernas fletidas e braços cruzados apertados ao peito)."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Adotar a posição de proteção contra a perda de calor (posição HELP).",
    "acceptedKeywords": [
      "posição help",
      "pernas fletidas",
      "braços cruzados"
    ],
    "explanation": "Chave Oficial 7: d)."
  },
  {
    "id": "t13-q08",
    "testNumber": 13,
    "questionNumber": 8,
    "sourceTests": [
      13
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Onde deve ser fixado o cabo de disparo automático (boça de disparo) da jangada pneumática?",
    "expectedAnswer": "Deve estar fixado firmemente a bordo da embarcação (num ponto estrutural sólido).",
    "acceptedKeywords": [
      "fixado a bordo",
      "ponto fixo"
    ],
    "explanation": "Chave Oficial 8: Deve estar fixado a bordo."
  },
  {
    "id": "t13-q09",
    "testNumber": 9,
    "questionNumber": 9,
    "sourceTests": [
      9
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "open-answer",
    "points": 1,
    "statement": "Como deve combater com extintor um incêndio em combustíveis líquidos a bordo?",
    "expectedAnswer": "Com extintor de espuma (ou pó químico), dirigindo o jato para a base do incêndio e atacando pelo lado de barlavento (com o vento pelas costas).",
    "acceptedKeywords": [
      "extintor de espuma",
      "base do incêndio",
      "barlavento",
      "pó químico"
    ],
    "explanation": "Chave Oficial 9: Com extintor de espuma, pela base do incêndio e a barlavento."
  },
  {
    "id": "t13-q10",
    "testNumber": 13,
    "questionNumber": 10,
    "sourceTests": [
      13
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Complete a frase: A posição lateral de segurança deve ser utilizada em sinistrados ____ que respirem.",
    "expectedAnswer": "Inconscientes.",
    "acceptedKeywords": [
      "inconscientes",
      "inconsciente"
    ],
    "explanation": "Chave Oficial 10: Inconscientes."
  },
  {
    "id": "t13-q11",
    "testNumber": 13,
    "questionNumber": 11,
    "sourceTests": [
      13
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
    "explanation": "Chave Oficial 11: c)."
  },
  {
    "id": "t13-q12",
    "testNumber": 13,
    "questionNumber": 12,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O que se entende por um fundo marinho de boa tença?",
    "expectedAnswer": "É um fundo onde a âncora unhe com facilidade e segurança sem garrear.",
    "acceptedKeywords": [
      "unhe com facilidade",
      "unhe",
      "boa tença"
    ],
    "explanation": "Chave Oficial 12: Unhe com facilidade."
  },
  {
    "id": "t13-q13",
    "testNumber": 13,
    "questionNumber": 13,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "De que material é habitualmente constituída a amarra das embarcações?",
    "expectedAnswer": "Ferro ou aço galvanizado.",
    "acceptedKeywords": [
      "ferro ou aço",
      "aço",
      "ferro"
    ],
    "explanation": "Chave Oficial 13: Ferro ou aço."
  },
  {
    "id": "t13-q14",
    "testNumber": 13,
    "questionNumber": 14,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de recolha da amarra e levantamento da âncora designa-se por:",
    "expectedAnswer": "Suspender.",
    "acceptedKeywords": [
      "suspender"
    ],
    "explanation": "Chave Oficial 14: Suspender."
  },
  {
    "id": "t13-q15",
    "testNumber": 13,
    "questionNumber": 15,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Numa embarcação de recreio, o hélice no seu movimento cria uma corrente de sucção que é descarregada para:",
    "options": [
      "Vante.",
      "Ré.",
      "Alheta.",
      "Quilha."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Vante.",
    "acceptedKeywords": [
      "vante"
    ],
    "explanation": "Chave Oficial 15: a)."
  },
  {
    "id": "t13-q16",
    "testNumber": 13,
    "questionNumber": 16,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A força exercida sobre o leme varia com:",
    "options": [
      "A cor do casco.",
      "O quadrado da velocidade da água e a área do leme.",
      "O peso do motor.",
      "A temperatura da água."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "O quadrado da velocidade da água e a área do leme.",
    "acceptedKeywords": [
      "velocidade",
      "área"
    ],
    "explanation": "Chave Oficial 16: b)."
  },
  {
    "id": "t13-q17",
    "testNumber": 13,
    "questionNumber": 17,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Ao desatracar com vento contra o cais deve-se utilizar preferencialmente:",
    "options": [
      "Lançante de proa.",
      "Lançante de popa.",
      "Regeira de vante (e motor a vante para abrir a popa).",
      "Largada simultânea."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Regeira de vante.",
    "acceptedKeywords": [
      "regeira de vante"
    ],
    "explanation": "Chave Oficial 17: c)."
  },
  {
    "id": "t13-q18",
    "testNumber": 13,
    "questionNumber": 18,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Das peças abaixo, indique as que constituem palamenta da embarcação:",
    "options": [
      "Quilha e sobrequilha.",
      "Leme e hélice.",
      "Croque e boeira (vertedouro).",
      "Enora e carlinga."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Croque e boeira (vertedouro).",
    "acceptedKeywords": [
      "croque",
      "boeira"
    ],
    "explanation": "Chave Oficial 18: c)."
  },
  {
    "id": "t13-q19",
    "testNumber": 13,
    "questionNumber": 19,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "As amuras de uma embarcação ficam situadas:",
    "options": [
      "Na popa.",
      "Entre a roda de proa e o través de bombordo.",
      "Entre a roda de proa e o través de estibordo.",
      "As alíneas b) e c) estão corretas."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "As alíneas b) e c) estão corretas.",
    "acceptedKeywords": [
      "b e c",
      "corretas"
    ],
    "explanation": "Chave Oficial 19: b) e c)."
  },
  {
    "id": "t13-q20",
    "testNumber": 13,
    "questionNumber": 20,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A distância teórica percorrida pelo hélice numa rotação de 360° em meio sólido chama-se:",
    "expectedAnswer": "Passo do hélice.",
    "acceptedKeywords": [
      "passo",
      "passo do hélice"
    ],
    "explanation": "Chave Oficial 20: Passo do hélice."
  },
  {
    "id": "t13-q21",
    "testNumber": 13,
    "questionNumber": 21,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A ação de puxar um cabo para bordo ou para o cais designa-se:",
    "options": [
      "Alar um cabo.",
      "Folgar um cabo.",
      "Largar um cabo.",
      "Aguentar um cabo."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Alar um cabo.",
    "acceptedKeywords": [
      "alar"
    ],
    "explanation": "Chave Oficial 21: a)."
  },
  {
    "id": "t13-q22",
    "testNumber": 13,
    "questionNumber": 22,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Identifique o nó que serve para unir dois cabos de bitolas semelhantes:",
    "expectedAnswer": "Nó direito - unir dois cabos de bitolas semelhantes.",
    "acceptedKeywords": [
      "nó direito",
      "direito"
    ],
    "explanation": "Chave Oficial 22: Nó direito - unir dois cabos de bitolas semelhantes."
  },
  {
    "id": "t13-q23",
    "testNumber": 13,
    "questionNumber": 23,
    "sourceTests": [
      13
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Identifique o nó representado na figura que forma uma laçada ou olhal fechado num cabo:",
    "expectedAnswer": "Nó de azelha (ou lais de guia).",
    "acceptedKeywords": [
      "nó de azelha",
      "azelha",
      "lais de guia"
    ],
    "explanation": "Chave Oficial 23: Nó de azelha."
  },
  {
    "id": "t13-q24",
    "testNumber": 13,
    "questionNumber": 24,
    "sourceTests": [
      13
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Indique os limites da carta de Marinheiro (menor de 18 anos): comprimento máximo, distância da costa, de porto de abrigo, tipo de navegação e potência instalada máxima:",
    "expectedAnswer": "5 metros de comprimento, até 3 milhas da costa e 6 milhas de porto de abrigo, navegação diurna e potência máxima de 22,5 kW.",
    "acceptedKeywords": [
      "5 m",
      "3 milhas",
      "6 milhas",
      "diurna",
      "22,5 kw"
    ],
    "explanation": "Chave Oficial 24: 5 m - 3 milhas - 6 milhas - diurna - 22,5 KW."
  },
  {
    "id": "t13-q25",
    "testNumber": 13,
    "questionNumber": 25,
    "sourceTests": [
      13
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Qual a lotação mínima de segurança obrigatória durante a prática de esqui náutico?",
    "expectedAnswer": "2 tripulantes (um timoneiro e um observador/vigia virado para a ré a vigiar o esquiador).",
    "acceptedKeywords": [
      "2 tripulantes",
      "dois tripulantes",
      "2"
    ],
    "explanation": "Chave Oficial 25: 2 tripulantes."
  },
  {
    "id": "t13-q26",
    "testNumber": 13,
    "questionNumber": 26,
    "sourceTests": [
      13
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Durante as fases da Lua de Quarto Crescente e Quarto Minguante ocorrem:",
    "expectedAnswer": "Marés mortas (de quadratura).",
    "acceptedKeywords": [
      "marés mortas",
      "quadratura"
    ],
    "explanation": "Chave Oficial 26: Marés mortas."
  },
  {
    "id": "t13-q27",
    "testNumber": 13,
    "questionNumber": 27,
    "sourceTests": [
      13
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "O marégrafo é um aparelho de medição que serve para:",
    "expectedAnswer": "Registar continuamente a altura da água do mar em função da hora e data.",
    "acceptedKeywords": [
      "registar a altura da água",
      "altura da água",
      "hora e data"
    ],
    "explanation": "Chave Oficial 27: Registar a altura da água, hora e data."
  },
  {
    "id": "t13-q28",
    "testNumber": 13,
    "questionNumber": 28,
    "sourceTests": [
      13
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Ao arrancar um motor fora de borda é fundamental verificar de imediato:",
    "options": [
      "Se a buzina toca.",
      "Se o rádio funciona.",
      "Se existe jato contínuo de água de refrigeração no escape (testemunho).",
      "Se as luzes acendem."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Se existe jato contínuo de água de refrigeração no escape (testemunho).",
    "acceptedKeywords": [
      "jato de água",
      "testemunho",
      "refrigeração"
    ],
    "explanation": "Chave Oficial 28: c)."
  },
  {
    "id": "t13-q29",
    "testNumber": 13,
    "questionNumber": 29,
    "sourceTests": [
      13
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Uma marca de águas limpas (águas seguras) apresenta faixas verticais de que cor?",
    "options": [
      "Amarelas e pretas.",
      "Verdes e brancas.",
      "Vermelhas e brancas em faixas verticais.",
      "Azuis e amarelas."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Vermelhas e brancas em faixas verticais.",
    "acceptedKeywords": [
      "vermelhas e brancas",
      "faixas verticais"
    ],
    "explanation": "Chave Oficial 29: c)."
  },
  {
    "id": "t13-q30",
    "testNumber": 13,
    "questionNumber": 30,
    "sourceTests": [
      13
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "As nuvens de grande desenvolvimento vertical que produzem trovoadas, rajadas violentas e perigo à navegação são:",
    "options": [
      "Cirros.",
      "Estratos.",
      "Cúmulo-nimbos (Cumulonimbus).",
      "Névoa."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Cúmulo-nimbos (Cumulonimbus).",
    "acceptedKeywords": [
      "cúmulo-nimbos",
      "cumulonimbus"
    ],
    "explanation": "Chave Oficial 30: c)."
  }
];
