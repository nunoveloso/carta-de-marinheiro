import { TestQuestion } from "../../types/tests";

/**
 * TESTE 6 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_6_QUESTIONS: TestQuestion[] = [
  {
    "id": "t6-q01",
    "testNumber": 6,
    "questionNumber": 1,
    "sourceTests": [
      6
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Toda a embarcação que alcance outra:",
    "options": [
      "Deve manter-se desimpedida do caminho da embarcação alcançada.",
      "Tem prioridade se for maior.",
      "Deve ultrapassar sempre por estibordo.",
      "Deve cortar a proa da outra."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Deve manter-se desimpedida do caminho da embarcação alcançada.",
    "acceptedKeywords": [
      "desimpedida"
    ],
    "explanation": "Regra 13 do RIEAM."
  },
  {
    "id": "t6-q02",
    "testNumber": 6,
    "questionNumber": 2,
    "sourceTests": [
      6
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
    "id": "t6-q03",
    "testNumber": 6,
    "questionNumber": 3,
    "sourceTests": [
      6
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio com capacidade de manobra reduzida deve apresentar de dia:",
    "options": [
      "Três balões esféricos pretos.",
      "Três marcas verticais: duas esferas pretas com um bicónico (losango) no meio.",
      "Um balão bicónico apenas.",
      "Dois cones com os vértices opostos."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Três marcas verticais: duas esferas pretas com um bicónico (losango) no meio.",
    "acceptedKeywords": [
      "esferas",
      "bicónico",
      "losango"
    ],
    "explanation": "Regra 27(b) do RIEAM."
  },
  {
    "id": "t6-q04",
    "testNumber": 6,
    "questionNumber": 4,
    "sourceTests": [
      6
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Desenhe na figura ao lado os balões correspondentes a um navio desgovernado:",
    "expectedAnswer": "Dois balões esféricos pretos sobrepostos verticalmente no mastro.",
    "acceptedKeywords": [
      "dois balões esféricos",
      "duas esferas pretas"
    ],
    "explanation": "Regra 27(a) do RIEAM.",
    "diagram": {
      "type": "day-shapes",
      "variant": "mast-unmarked"
    }
  },
  {
    "id": "t6-q05",
    "testNumber": 6,
    "questionNumber": 5,
    "sourceTests": [
      6
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica a rebocar com visibilidade reduzida deve emitir o seguinte sinal sonoro:",
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
    "id": "t6-q06",
    "testNumber": 6,
    "questionNumber": 6,
    "sourceTests": [
      6
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica com seguimento em visibilidade reduzida deve emitir:",
    "options": [
      "Um som prolongado com intervalos não superiores a dois minutos.",
      "Dois sons prolongados com intervalos não superiores a dois minutos.",
      "Um som curto a cada dois minutos.",
      "Três sons curtos."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Um som prolongado com intervalos não superiores a dois minutos.",
    "acceptedKeywords": [
      "um som prolongado",
      "dois minutos"
    ],
    "explanation": "Regra 35(a) do RIEAM."
  },
  {
    "id": "t6-q07",
    "testNumber": 6,
    "questionNumber": 7,
    "sourceTests": [
      6
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Em caso de abandono de emergência de uma embarcação de recreio, quais as ações essenciais dos tripulantes?",
    "expectedAnswer": "Vestir coletes salva-vidas e fatos térmicos, lançar e embarcar na balsa salva-vidas com o saco de emergência e rádio VHF portátil / EPIRB.",
    "acceptedKeywords": [
      "coletes",
      "balsa salva-vidas",
      "vhf",
      "emergência"
    ],
    "explanation": "O abandono da embarcação é o último recurso, devendo todos embarcar diretamente na balsa sem entrar na água."
  },
  {
    "id": "t6-q08",
    "testNumber": 6,
    "questionNumber": 8,
    "sourceTests": [
      6
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "multiple-choice",
    "points": 1,
    "statement": "A palamenta obrigatória de segurança de uma embarcação em navegação costeira inclui:",
    "options": [
      "Boia de salvação com retinida flutuante de pelo menos 27,5 metros.",
      "Apenas uma buzina de brincar.",
      "Rede de pesca desportiva.",
      "Farolim de bicicleta."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Boia de salvação com retinida flutuante de pelo menos 27,5 metros.",
    "acceptedKeywords": [
      "boia",
      "retinida flutuante"
    ],
    "explanation": "Equipamento regulamentar de salvamento segundo o Regulamento da Náutica de Recreio."
  },
  {
    "id": "t6-q09",
    "testNumber": 6,
    "questionNumber": 9,
    "sourceTests": [
      6
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Para extinguir um fogo de classe B (óleos ou gasolina), qual o método mais indicado?",
    "options": [
      "Arrefecimento com jato de água.",
      "Abafamento com pó químico ou espuma.",
      "Abertura de escotilhas.",
      "Abanar com toalhas."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Abafamento com pó químico ou espuma.",
    "acceptedKeywords": [
      "abafamento",
      "pó químico",
      "espuma"
    ],
    "explanation": "O abafamento elimina o contacto do combustível líquido com o oxigénio atmosférico."
  },
  {
    "id": "t6-q10",
    "testNumber": 6,
    "questionNumber": 10,
    "sourceTests": [
      6
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Complete a frase: A posição lateral de segurança (PLS) deve ser utilizada em sinistrados ____ que respirem e com batimentos cardíacos.",
    "expectedAnswer": "Inconscientes.",
    "acceptedKeywords": [
      "inconscientes",
      "inconsciente"
    ],
    "explanation": "A PLS impede que a língua obstrua a via aérea de uma pessoa desmaiada."
  },
  {
    "id": "t6-q11",
    "testNumber": 6,
    "questionNumber": 11,
    "sourceTests": [
      6
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
    "explanation": "Fisiologia humana básica em primeiros socorros."
  },
  {
    "id": "t6-q12",
    "testNumber": 6,
    "questionNumber": 12,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "De entre os fundos marinhos abaixo, indique aqueles que se podem considerar de boa tença:",
    "options": [
      "Barro e areia.",
      "Rocha lisa.",
      "Seixos grandes.",
      "Cascalho solto."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Barro e areia.",
    "acceptedKeywords": [
      "barro e areia",
      "areia"
    ],
    "explanation": "Fundo consistente que retém o ferro."
  },
  {
    "id": "t6-q13",
    "testNumber": 6,
    "questionNumber": 13,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de recolha da amarra, isto é, de levantar âncora, dá-se o nome de:",
    "expectedAnswer": "Suspender o ferro (ou virar a amarra).",
    "acceptedKeywords": [
      "suspender",
      "virar a amarra",
      "alar"
    ],
    "explanation": "Levantar âncora do fundo."
  },
  {
    "id": "t6-q14",
    "testNumber": 6,
    "questionNumber": 14,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Que nome se dá, na âncora de Almirantado, à parte extrema pontiaguda dos braços que penetra e unhe no fundo?",
    "expectedAnswer": "Unhas (ou patas).",
    "acceptedKeywords": [
      "unhas",
      "unha",
      "patas"
    ],
    "explanation": "A unha é a extremidade triangular de cada braço da âncora."
  },
  {
    "id": "t6-q15",
    "testNumber": 6,
    "questionNumber": 15,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Numa embarcação, a força provocada pelo efeito do leme é tanto maior:",
    "options": [
      "Quanto menor for a velocidade.",
      "Quanto maior for o ângulo do leme (até ~35°) e maior a velocidade.",
      "Quanto menor for a área do leme.",
      "Quanto menor for o calado."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Quanto maior for o ângulo do leme e maior a velocidade.",
    "acceptedKeywords": [
      "maior o ângulo",
      "maior velocidade"
    ],
    "explanation": "A sustentação do leme depende do ângulo de ataque e da velocidade do fluxo de água."
  },
  {
    "id": "t6-q16",
    "testNumber": 6,
    "questionNumber": 16,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Numa embarcação com hélice de passo direito em marcha à vante, quando reduzimos a velocidade:",
    "options": [
      "O efeito lateral do hélice começa a sentir-se menos.",
      "O efeito lateral do hélice começa a sentir-se mais.",
      "O efeito lateral do hélice não sofre alteração.",
      "O barco para instantaneamente."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "O efeito lateral do hélice começa a sentir-se mais.",
    "acceptedKeywords": [
      "sentir-se mais",
      "mais"
    ],
    "explanation": "A baixa velocidade o leme perde sustentação e o binário de pás do hélice desvia mais a popa."
  },
  {
    "id": "t6-q17",
    "testNumber": 6,
    "questionNumber": 17,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Ao desatracar a embarcação com vento contra o cais, indique qual seria o último cabo a largar e o sentido do motor para abrir a popa:",
    "options": [
      "O lançante de ré, motor a vante.",
      "O lançante de vante, motor a vante.",
      "A regeira de vante, motor a vante.",
      "A regeira de vante, motor a ré."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "A regeira de vante, motor a vante.",
    "acceptedKeywords": [
      "regeira de vante",
      "motor a vante"
    ],
    "explanation": "Apoiar sobre a regeira de vante com motor à vante faz a popa abrir para fora do cais."
  },
  {
    "id": "t6-q18",
    "testNumber": 6,
    "questionNumber": 18,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A direção perpendicular à mediania da embarcação situada entre a amura e a alheta designa-se por:",
    "expectedAnswer": "Través.",
    "acceptedKeywords": [
      "través",
      "traves"
    ],
    "explanation": "Direção a 90° com a linha proa-popa."
  },
  {
    "id": "t6-q19",
    "testNumber": 6,
    "questionNumber": 19,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A peça metálica ou de madeira em forma de forca na qual se apoia e trabalha o remo chama-se:",
    "options": [
      "Forqueta (ou toleteira).",
      "Cachola.",
      "Carlinga.",
      "Sarreta."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Forqueta (ou toleteira).",
    "acceptedKeywords": [
      "forqueta",
      "toleteira"
    ],
    "explanation": "Ponto de apoio do remo na borda da embarcação miúda."
  },
  {
    "id": "t6-q20",
    "testNumber": 6,
    "questionNumber": 20,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Os três cantos (punhos) de uma vela triangular designam-se por:",
    "options": [
      "Valuma, esteira e pena.",
      "Pena, boca e escota.",
      "Punho da amura, punho da pena (adriça) e punho da escota.",
      "Punho da amura, punho da valuma e punho do mastro."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Punho da amura, punho da pena (adriça) e punho da escota.",
    "acceptedKeywords": [
      "amura",
      "pena",
      "escota"
    ],
    "explanation": "Amura (em baixo à vante), Pena (no topo) e Escota (em baixo à ré)."
  },
  {
    "id": "t6-q21",
    "testNumber": 6,
    "questionNumber": 21,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A ação marinheira de prender um cabo a um cabeço ou cunho designa-se por:",
    "options": [
      "Colher um cabo.",
      "Dar volta a um cabo.",
      "Cunhar um cabo.",
      "Aguentar um cabo."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Dar volta a um cabo.",
    "acceptedKeywords": [
      "dar volta"
    ],
    "explanation": "Terminologia náutica para fixar o cabo."
  },
  {
    "id": "t6-q22",
    "testNumber": 6,
    "questionNumber": 22,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "As escotas e espias devem ser arrumadas no convés. Se caírem à água por descuido, qual o grande perigo que pode resultar?",
    "expectedAnswer": "O cabo pode enrolar-se no hélice e no veio de transmissão, bloqueando o motor e imobilizando a embarcação.",
    "acceptedKeywords": [
      "enrolar no hélice",
      "hélice",
      "bloquear o motor"
    ],
    "explanation": "Um cabo no hélice paralisa o governo e pode arrancar o veio ou danificar o inversor."
  },
  {
    "id": "t6-q23",
    "testNumber": 6,
    "questionNumber": 23,
    "sourceTests": [
      6
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Para fixar um cabo num cabeço duplo utilizamos:",
    "options": [
      "Voltas falcas.",
      "Voltas de fiel.",
      "Voltas de tomadouro.",
      "Voltas redondas e cruzadas em oito."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Voltas redondas e cruzadas em oito.",
    "acceptedKeywords": [
      "voltas redondas e cruzadas",
      "oito"
    ],
    "explanation": "Forma segura de amarração a cabeço duplo."
  },
  {
    "id": "t6-q24",
    "testNumber": 6,
    "questionNumber": 24,
    "sourceTests": [
      6
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "\"Embarcações para navegação ao largo\" é uma classificação de embarcações de recreio quanto a quê?",
    "expectedAnswer": "Quanto à sua área ou zona de navegação autorizada (Tipo 2 - navegação até 25 milhas da costa).",
    "acceptedKeywords": [
      "zona de navegação",
      "área de navegação",
      "tipo 2"
    ],
    "explanation": "Classificação oficial por zonas de navegação (Oceânica, Ao Largo, Costeira, Águas Abrigadas)."
  },
  {
    "id": "t6-q25",
    "testNumber": 6,
    "questionNumber": 25,
    "sourceTests": [
      6
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Durante a prática de esqui náutico ou reboque de boias de tração, o que é de uso obrigatório para o esquiador?",
    "expectedAnswer": "É obrigatório o uso de colete de salvação (colete de flutuação adequado).",
    "acceptedKeywords": [
      "colete",
      "colete de salvação",
      "colete salva-vidas"
    ],
    "explanation": "Regulamentar para prevenção de afogamento em caso de queda a alta velocidade."
  },
  {
    "id": "t6-q26",
    "testNumber": 6,
    "questionNumber": 26,
    "sourceTests": [
      6
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "A altura da água entre o Zero Hidrográfico e o fundo marinho chama-se:",
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
    "explanation": "A Sonda Reduzida é a cota batimétrica cartográfica referida ao Zero Hidrográfico."
  },
  {
    "id": "t6-q27",
    "testNumber": 6,
    "questionNumber": 27,
    "sourceTests": [
      6
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "O plano horizontal a que são referidas as Sondas Reduzidas na carta náutica designa-se por:",
    "expectedAnswer": "Zero Hidrográfico (ZH).",
    "acceptedKeywords": [
      "zero hidrográfico",
      "zh"
    ],
    "explanation": "Referência altimétrica marítima."
  },
  {
    "id": "t6-q28",
    "testNumber": 6,
    "questionNumber": 28,
    "sourceTests": [
      6
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Se o motor fora de borda não arrancar, indique as causas prováveis mais comuns:",
    "options": [
      "Falta de combustível, tubo de gasolina dobrado/desapertado, ou filtro de combustível obstruído.",
      "Água doce a mais no radiador.",
      "Pressão de ar excessiva no barco.",
      "Leme com ângulo demasiado elevado."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Falta de combustível, tubo de gasolina dobrado/desapertado, ou filtro de combustível obstruído.",
    "acceptedKeywords": [
      "falta de combustível",
      "filtro obstruído"
    ],
    "explanation": "Problemas de alimentação de combustível são as avarias mais frequentes de não arranque."
  },
  {
    "id": "t6-q29",
    "testNumber": 6,
    "questionNumber": 29,
    "sourceTests": [
      6
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "As marcas cardinais em que o cone superior aponta para cima e o inferior para baixo (opostos pelas bases) indicam que o perigo está a:",
    "options": [
      "Norte da boia.",
      "Sul da boia.",
      "Oeste da boia (águas navegáveis a Este).",
      "Leste da boia."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Oeste da boia (águas navegáveis a Este).",
    "acceptedKeywords": [
      "oeste",
      "oeste da boia"
    ],
    "explanation": "Marca cardinal Este."
  },
  {
    "id": "t6-q30",
    "testNumber": 6,
    "questionNumber": 30,
    "sourceTests": [
      6
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Quais os fenómenos observados à passagem de uma frente quente no hemisfério Norte?",
    "options": [
      "Pressão sobe bruscamente, vento sopra de Norte.",
      "Pressão estabiliza ou desce, vento roda para SW e diminui, nuvens de tipo Cirros e Altos-estratos com chuva contínua.",
      "Céu limpo sem vento.",
      "Tornado súbito de Este."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Pressão estabiliza ou desce, vento roda para SW e diminui, nuvens de tipo Cirros e Altos-estratos com chuva contínua.",
    "acceptedKeywords": [
      "cirros",
      "altos-estratos",
      "chuva contínua"
    ],
    "explanation": "Meteorologia sinóptica de frentes quentes."
  }
];
