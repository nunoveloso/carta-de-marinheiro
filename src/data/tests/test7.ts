import { TestQuestion } from "../../types/tests";

/**
 * TESTE 7 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_7_QUESTIONS: TestQuestion[] = [
  {
    "id": "t7-q01",
    "testNumber": 7,
    "questionNumber": 1,
    "sourceTests": [
      7
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Defina o que entende por embarcação alcançante:",
    "options": [
      "É aquela que se aproxima de outra de uma direção que fique mais de 22,5° para ré do través.",
      "É aquela que se aproxima de outra pela proa.",
      "É aquela que navega a menos de 5 nós.",
      "É aquela que dá prioridade aos veleiros apenas."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "É aquela que se aproxima de outra de uma direção que fique mais de 22,5° para ré do través.",
    "acceptedKeywords": [
      "22,5",
      "ré do través"
    ],
    "explanation": "Regra 13 do RIEAM."
  },
  {
    "id": "t7-q02",
    "testNumber": 7,
    "questionNumber": 2,
    "sourceTests": [
      7
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
    "id": "t7-q03",
    "testNumber": 7,
    "questionNumber": 3,
    "sourceTests": [
      7
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio encalhado deve apresentar durante o dia:",
    "options": [
      "Três balões esféricos pretos dispostos verticalmente.",
      "Dois balões bicónicos pretos.",
      "Um balão cónico preto com o vértice para baixo.",
      "Dois balões esféricos pretos."
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
    "id": "t7-q04",
    "testNumber": 7,
    "questionNumber": 4,
    "sourceTests": [
      7
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Desenhe na figura ao lado os balões correspondentes a um navio com capacidade de manobra reduzida:",
    "expectedAnswer": "Três marcas dispostas verticalmente: esfera preta superior, losango (bicónico) preto ao meio e esfera preta inferior.",
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
    "id": "t7-q05",
    "testNumber": 7,
    "questionNumber": 5,
    "sourceTests": [
      7
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "A embarcação A pretende atracar por Bombordo (BB) no cais. Para isso tem que guinar para Estibordo (EB). Que sinal sonoro tem que emitir?",
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
    "explanation": "Regra 34(a) do RIEAM: Um som curto significa: \"Estou a guinar para estibordo\"."
  },
  {
    "id": "t7-q06",
    "testNumber": 7,
    "questionNumber": 6,
    "sourceTests": [
      7
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
    "explanation": "Regra 34(a) do RIEAM: \"As minhas máquinas estão a trabalhar a ré\"."
  },
  {
    "id": "t7-q07",
    "testNumber": 7,
    "questionNumber": 7,
    "sourceTests": [
      7
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Onde deve estar colocada a jangada pneumática de salvação a bordo?",
    "expectedAnswer": "No convés aberto exterior, em local desimpedido de fácil acesso, pronta a ser lançada manualmente ou com libertação hidrostática automática.",
    "acceptedKeywords": [
      "convés aberto",
      "desimpedido",
      "libertação hidrostática"
    ],
    "explanation": "A jangada deve flutuar livremente se o navio se afundar."
  },
  {
    "id": "t7-q08",
    "testNumber": 7,
    "questionNumber": 8,
    "sourceTests": [
      7
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Qual dos sinais pirotécnicos de socorro deve utilizar preferencialmente de dia?",
    "options": [
      "Sinal fumígeno flutuante cor-de-laranja.",
      "Facho de mão de luz vermelha.",
      "Foguete paraquedas vermelho.",
      "Pistola de sinais com luz verde."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Sinal fumígeno flutuante cor-de-laranja.",
    "acceptedKeywords": [
      "fumígeno",
      "laranja"
    ],
    "explanation": "O fumo laranja proporciona visibilidade ótima diurna a longa distância."
  },
  {
    "id": "t7-q09",
    "testNumber": 7,
    "questionNumber": 9,
    "sourceTests": [
      7
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "open-answer",
    "points": 1,
    "statement": "Qual o tipo de extintor que devemos usar para combater um incêndio produzido por gases inflamáveis (Classe C)?",
    "expectedAnswer": "Extintor de pó químico seco (ou CO2), cortando previamente a fonte de gás.",
    "acceptedKeywords": [
      "pó químico",
      "co2",
      "cortar o gás"
    ],
    "explanation": "Fogo a gás deve ser extinto por corte do fornecimento e inibição por pó químico."
  },
  {
    "id": "t7-q10",
    "testNumber": 7,
    "questionNumber": 10,
    "sourceTests": [
      7
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
    "explanation": "A PLS destina-se a manter aberta a via aérea de quem está inconsciente mas a respirar."
  },
  {
    "id": "t7-q11",
    "testNumber": 7,
    "questionNumber": 11,
    "sourceTests": [
      7
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A temperatura média basal do corpo humano de um adulto normal é de:",
    "options": [
      "34,5°C.",
      "35,5°C.",
      "36,5°C.",
      "38,5°C."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "36,5°C.",
    "acceptedKeywords": [
      "36,5"
    ],
    "explanation": "Temperatura normotérmica fisiológica humana."
  },
  {
    "id": "t7-q12",
    "testNumber": 7,
    "questionNumber": 12,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A corrente constituída por elos em ferro ou aço que, talingada à âncora, permite fundear a embarcação chama-se:",
    "options": [
      "Ferro.",
      "Cabo.",
      "Manilha.",
      "Amarra."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Amarra.",
    "acceptedKeywords": [
      "amarra"
    ],
    "explanation": "A amarra é a corrente que liga o ferro ao escovém e paiol da amarra."
  },
  {
    "id": "t7-q13",
    "testNumber": 7,
    "questionNumber": 13,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Observe a figura da âncora de Almirantado e indique o nome das partes essenciais (haste, cepo, braços, unhas e anete):",
    "expectedAnswer": "Haste, Cepo, Braços, Unhas e Anete.",
    "acceptedKeywords": [
      "haste",
      "cepo",
      "unhas",
      "braços",
      "anete"
    ],
    "explanation": "Componentes estruturais da âncora de cepo."
  },
  {
    "id": "t7-q14",
    "testNumber": 7,
    "questionNumber": 14,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O ancorete é um ferro ligeiro que pode ser usado para fundear:",
    "options": [
      "Pequenas embarcações ou apoio a manobras.",
      "Navios de carga.",
      "Barcos de pesca de arrasto oceânico.",
      "Navios de guerra."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Pequenas embarcações ou apoio a manobras.",
    "acceptedKeywords": [
      "pequenas embarcações"
    ],
    "explanation": "O ancorete é uma âncora pequena auxiliar."
  },
  {
    "id": "t7-q15",
    "testNumber": 7,
    "questionNumber": 15,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A manobra de fundear deve ser efetuada preferencialmente:",
    "options": [
      "A favor do vento.",
      "Contra a corrente (ou contra o vento se não houver corrente).",
      "A favor da corrente.",
      "Em marcha rápida à ré."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Contra a corrente (ou contra o vento se não houver corrente).",
    "acceptedKeywords": [
      "contra a corrente",
      "contra o vento"
    ],
    "explanation": "Aproar à corrente/vento permite travar o seguimento suavemente e controlar a descida do ferro."
  },
  {
    "id": "t7-q16",
    "testNumber": 7,
    "questionNumber": 16,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Um hélice de passo direito, olhando de ré para vante, em marcha à vante gira no sentido:",
    "options": [
      "Dos ponteiros do relógio (sentido horário).",
      "Inverso dos ponteiros do relógio (anti-horário)."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Dos ponteiros do relógio (sentido horário).",
    "acceptedKeywords": [
      "ponteiros do relógio",
      "horário"
    ],
    "explanation": "Passo direito = rotação horária em marcha à vante vista de ré."
  },
  {
    "id": "t7-q17",
    "testNumber": 7,
    "questionNumber": 17,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Numa embarcação de recreio equipada com dois hélices, o hélice de Bombordo (BB) é geralmente de passo:",
    "options": [
      "Direito.",
      "Esquerdo (rotação exterior supradivergente)."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Esquerdo (rotação exterior supradivergente).",
    "acceptedKeywords": [
      "esquerdo"
    ],
    "explanation": "Em instalações bimotor os hélices giram para o exterior (BB esquerdo, EB direito)."
  },
  {
    "id": "t7-q18",
    "testNumber": 7,
    "questionNumber": 18,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "As embarcações dotadas de um pavimento estrutural completo com cobertura estanque protegida por superestruturas designam-se por:",
    "options": [
      "Embarcações abertas.",
      "Embarcações parcialmente abertas.",
      "Embarcações fechadas (com convés estanque).",
      "Embarcações insufláveis simples."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Embarcações fechadas (com convés estanque).",
    "acceptedKeywords": [
      "fechadas",
      "convés"
    ],
    "explanation": "Classificação estrutural do casco."
  },
  {
    "id": "t7-q19",
    "testNumber": 7,
    "questionNumber": 19,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O peso de uma embarcação que equivale exatamente ao peso do volume de água deslocada designa-se por:",
    "expectedAnswer": "Deslocamento.",
    "acceptedKeywords": [
      "deslocamento"
    ],
    "explanation": "Princípio de Arquimedes."
  },
  {
    "id": "t7-q20",
    "testNumber": 7,
    "questionNumber": 20,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Quais os 5 principais setores gerais de uma embarcação?",
    "expectedAnswer": "Proa (vante), Popa (ré), Bombordo (lado esquerdo), Estibordo (lado direito) e Meia-nau (centro).",
    "acceptedKeywords": [
      "proa",
      "popa",
      "bombordo",
      "estibordo",
      "meia-nau"
    ],
    "explanation": "Divisões referenciais fundamentais de qualquer embarcação."
  },
  {
    "id": "t7-q21",
    "testNumber": 7,
    "questionNumber": 21,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Os cabos livres que se encontram a bordo prontos a ser aplicados em qualquer faina chamam-se:",
    "options": [
      "Cabos solteiros.",
      "Espias mestras.",
      "Cabo cadeira.",
      "Boças fixas."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Cabos solteiros.",
    "acceptedKeywords": [
      "cabos solteiros"
    ],
    "explanation": "Cabos solteiros são linhas avulsas prontas para manobras imprevistas."
  },
  {
    "id": "t7-q22",
    "testNumber": 7,
    "questionNumber": 22,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Às pequenas torções circulares viciosas que um cabo dá sobre si próprio e que dificultam o seu correr dá-se o nome de:",
    "expectedAnswer": "Cocas.",
    "acceptedKeywords": [
      "cocas",
      "coca"
    ],
    "explanation": "Cocas são torções que podem encravar o cabo nos cabrestantes ou polés."
  },
  {
    "id": "t7-q23",
    "testNumber": 7,
    "questionNumber": 23,
    "sourceTests": [
      7
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Para travar ou suster o correr de um cabo diz-se:",
    "options": [
      "Alar um cabo.",
      "Folgar um cabo.",
      "Aguentar um cabo.",
      "Largar um cabo."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Aguentar um cabo.",
    "acceptedKeywords": [
      "aguentar",
      "aguentar um cabo"
    ],
    "explanation": "Comando para não deixar correr o cabo."
  },
  {
    "id": "t7-q24",
    "testNumber": 7,
    "questionNumber": 24,
    "sourceTests": [
      7
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "O Regulamento da Náutica de Recreio aplica-se a:",
    "options": [
      "Apenas embarcações de recreio.",
      "Apenas embarcações de recreio e equipamentos de apoio.",
      "Às embarcações de recreio, aos seus equipamentos e aos tripulantes sejam ou não responsáveis pelo seu governo.",
      "Apenas navios mercantes em recreio."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Às embarcações de recreio, aos seus equipamentos e aos tripulantes sejam ou não responsáveis pelo seu governo.",
    "acceptedKeywords": [
      "embarcações de recreio",
      "tripulantes",
      "equipamentos"
    ],
    "explanation": "Âmbito de aplicação integral do RNR."
  },
  {
    "id": "t7-q25",
    "testNumber": 7,
    "questionNumber": 25,
    "sourceTests": [
      7
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Quem é o responsável pela utilização e operação do equipamento de radiotelefone VHF a bordo de uma embarcação de recreio?",
    "options": [
      "O proprietário.",
      "O detentor do certificado/licença de Operador Radiotelefonista (ou o comandante habilitado).",
      "Qualquer passageiro.",
      "A capitania."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "O detentor do certificado/licença de Operador Radiotelefonista (ou o comandante habilitado).",
    "acceptedKeywords": [
      "radiotelefonista",
      "operador radiotelefonista"
    ],
    "explanation": "A operação do VHF exige habilitação específica ou inclusão na carta náutica."
  },
  {
    "id": "t7-q26",
    "testNumber": 7,
    "questionNumber": 26,
    "sourceTests": [
      7
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Como determina a fórmula do valor da Sonda à hora?",
    "expectedAnswer": "Sonda à Hora = Sonda Reduzida (SR) + Altura da Maré (Hm).",
    "acceptedKeywords": [
      "sonda reduzida",
      "altura da maré",
      "sr + hm"
    ],
    "explanation": "Cálculo fundamental da navegação em águas rasas."
  },
  {
    "id": "t7-q27",
    "testNumber": 7,
    "questionNumber": 27,
    "sourceTests": [
      7
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Quando ocorrem as Marés Mortas (ou de quadratura), em relação às fases da Lua?",
    "expectedAnswer": "Ocorrem durante as fases de Quarto Crescente e Quarto Minguante.",
    "acceptedKeywords": [
      "quarto crescente",
      "quarto minguante",
      "crescente",
      "minguante"
    ],
    "explanation": "Quando o ângulo Terra-Lua-Sol é de 90° as forças atraentes atenuam-se."
  },
  {
    "id": "t7-q28",
    "testNumber": 7,
    "questionNumber": 28,
    "sourceTests": [
      7
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A existência de combustível contaminado com água ou impurezas num motor fora de borda provoca:",
    "options": [
      "Sobreaquecimento do bloco.",
      "Falhas de ignição, ralenti irregular ou falha de arranque do motor.",
      "Cavitação do hélice.",
      "Aumento súbito de rotação."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Falhas de ignição, ralenti irregular ou falha de arranque do motor.",
    "acceptedKeywords": [
      "falha de arranque",
      "ralenti irregular"
    ],
    "explanation": "A água na gasolina entope os gicleurs e bloqueia a injeção."
  },
  {
    "id": "t7-q29",
    "testNumber": 7,
    "questionNumber": 29,
    "sourceTests": [
      7
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Diga como se apresenta a marca cardinal Oeste em relação à cor, forma dos alvos e ritmo da luz:",
    "expectedAnswer": "Cor: Amarela com faixa preta ao meio; Alvos: Dois cones pretos apontados um para o outro (opostos pelos vértices); Luz: Branca rápida cintilante com 9 flashes em cada 10 ou 15 segundos [Q(9) 15s].",
    "acceptedKeywords": [
      "amarela com faixa preta",
      "opostos pelos vértices",
      "9 cintilações",
      "luz branca"
    ],
    "explanation": "Especificação técnica IALA da marca cardinal Oeste."
  },
  {
    "id": "t7-q30",
    "testNumber": 7,
    "questionNumber": 30,
    "sourceTests": [
      7
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Na escala de Beaufort, à designação de força de vento \"Fresco\" (Força 5) corresponde uma velocidade de vento de:",
    "options": [
      "17 a 21 nós.",
      "< 1 nó.",
      "41 a 47 nós.",
      "4 a 6 nós."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "17 a 21 nós.",
    "acceptedKeywords": [
      "17 a 21 nós",
      "17 a 21"
    ],
    "explanation": "Força 5 Beaufort (vento fresco: 17 a 21 nós), com formação de cristas de espuma branca em todo o lado."
  }
];
