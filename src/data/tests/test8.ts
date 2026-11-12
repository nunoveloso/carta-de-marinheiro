import { TestQuestion } from "../../types/tests";

/**
 * TESTE 8 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_8_QUESTIONS: TestQuestion[] = [
  {
    "id": "t8-q01",
    "testNumber": 8,
    "questionNumber": 1,
    "sourceTests": [
      8
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Uma embarcação que governa para evitar colisão deve efetuar uma alteração de rumo e/ou velocidade que seja:",
    "options": [
      "Ampla e claramente visível com bastante antecedência.",
      "Pequena e sucessiva para não assustar a outra embarcação.",
      "Apenas de 1 ou 2 graus.",
      "Apenas em marcha à ré."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Ampla e claramente visível com bastante antecedência.",
    "acceptedKeywords": [
      "ampla",
      "antecedência"
    ],
    "explanation": "Regra 8 do RIEAM."
  },
  {
    "id": "t8-q02",
    "testNumber": 8,
    "questionNumber": 2,
    "sourceTests": [
      8
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "open-answer",
    "points": 1,
    "statement": "Caso exista risco de colisão entre duas embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:",
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
    "id": "t8-q03",
    "testNumber": 8,
    "questionNumber": 3,
    "sourceTests": [
      8
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio encalhado exibe durante o dia:",
    "options": [
      "Três balões esféricos pretos dispostos verticalmente.",
      "Dois balões bicónicos pretos.",
      "Um balão bicónico preto.",
      "Nenhuma marca se for menor de 50 metros."
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
    "id": "t8-q04",
    "testNumber": 8,
    "questionNumber": 4,
    "sourceTests": [
      8
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Desenhe na figura ao lado os balões correspondentes a um navio desgovernado:",
    "expectedAnswer": "Dois balões esféricos pretos sobrepostos verticalmente.",
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
    "id": "t8-q05",
    "testNumber": 8,
    "questionNumber": 5,
    "sourceTests": [
      8
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio na faina da pesca e com visibilidade reduzida deve emitir:",
    "options": [
      "Um som curto a cada dois minutos.",
      "Dois sons longos a cada dois minutos.",
      "Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.",
      "Três sons curtos."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.",
    "acceptedKeywords": [
      "prolongado seguido de dois curtos"
    ],
    "explanation": "Regra 35(c) do RIEAM."
  },
  {
    "id": "t8-q06",
    "testNumber": 8,
    "questionNumber": 6,
    "sourceTests": [
      8
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica fundeado com visibilidade reduzida deve emitir:",
    "options": [
      "Toques de sino em cadência rápida durante 5 segundos a intervalos não superiores a 1 minuto.",
      "Dois sons longos a cada minuto.",
      "Três apitos curtos.",
      "Um som contínuo de buzina."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Toques de sino em cadência rápida durante 5 segundos a intervalos não superiores a 1 minuto.",
    "acceptedKeywords": [
      "sino",
      "5 segundos",
      "1 minuto"
    ],
    "explanation": "Regra 35(g) do RIEAM."
  },
  {
    "id": "t8-q07",
    "testNumber": 8,
    "questionNumber": 7,
    "sourceTests": [
      8
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Em caso de queda de tripulante ao mar, por que motivo se deve guinar imediatamente para o mesmo bordo da queda?",
    "expectedAnswer": "Para desviar a popa e as pás do hélice para fora da trajetória do náufrago, evitando ferimentos graves ou mortais.",
    "acceptedKeywords": [
      "desviar o hélice",
      "afastar a popa",
      "evitar ferimentos"
    ],
    "explanation": "Manobra de salvação em homem ao mar."
  },
  {
    "id": "t8-q08",
    "testNumber": 8,
    "questionNumber": 8,
    "sourceTests": [
      8
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "multiple-choice",
    "points": 1,
    "statement": "O colete salva-vidas de 150N homologado SOLAS garante:",
    "options": [
      "Que uma pessoa inconsciente com roupa de mar volte a face para cima fora de água em menos de 5 segundos.",
      "Que a pessoa consiga nadar a mais de 10 nós.",
      "Apenas proteção contra o vento.",
      "Flutuação exclusiva para mergulhadores."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Que uma pessoa inconsciente com roupa de mar volte a face para cima fora de água em menos de 5 segundos.",
    "acceptedKeywords": [
      "face para cima",
      "inconsciente"
    ],
    "explanation": "Requisito técnico fundamental do colete salva-vidas."
  },
  {
    "id": "t8-q09",
    "testNumber": 8,
    "questionNumber": 9,
    "sourceTests": [
      8
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Para combater um incêndio de classe B (gasolina/gasóleo) o operador do extintor deve dirigir o jato:",
    "options": [
      "Para o topo das chamas.",
      "Para a base das chamas, em movimento de varrimento e com o vento pelas costas (a barlavento).",
      "Para a água circundante.",
      "Para as vigias."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Para a base das chamas, em movimento de varrimento e com o vento pelas costas (a barlavento).",
    "acceptedKeywords": [
      "base das chamas",
      "barlavento",
      "varrimento"
    ],
    "explanation": "Técnica correta de ataque ao fogo com extintor portátil."
  },
  {
    "id": "t8-q10",
    "testNumber": 8,
    "questionNumber": 10,
    "sourceTests": [
      8
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Num adulto saudável a pulsação arterial normal em repouso varia entre:",
    "options": [
      "30 e 40 bpm.",
      "60 e 80 bpm.",
      "120 e 150 bpm.",
      "10 e 20 bpm."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "60 e 80 bpm.",
    "acceptedKeywords": [
      "60 e 80",
      "70"
    ],
    "explanation": "Frequência cardíaca basal de repouso."
  },
  {
    "id": "t8-q11",
    "testNumber": 8,
    "questionNumber": 11,
    "sourceTests": [
      8
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Como deve atuar perante uma queimadura de segundo grau sofrida no motor da embarcação?",
    "expectedAnswer": "Arrefecer de imediato com água limpa fria corrente durante pelo menos 10 a 15 minutos, não rebentar bolhas e cobrir com penso estéril humedecido.",
    "acceptedKeywords": [
      "água fria",
      "arrefecer",
      "não rebentar bolhas",
      "penso estéril"
    ],
    "explanation": "Tratamento de suporte imediato a queimaduras térmicas."
  },
  {
    "id": "t8-q12",
    "testNumber": 8,
    "questionNumber": 12,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Identifique os componentes da âncora de Almirantado: haste, cepo, braços, unhas e anete.",
    "expectedAnswer": "Haste, Cepo, Braços, Unhas e Anete.",
    "acceptedKeywords": [
      "haste",
      "cepo",
      "unhas",
      "braços",
      "anete"
    ],
    "explanation": "Nomenclatura do ferro."
  },
  {
    "id": "t8-q13",
    "testNumber": 8,
    "questionNumber": 13,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Complete a frase: A defensa destina-se a proteger o ____ da embarcação do contacto direto ou choque contra o cais ou outra embarcação.",
    "expectedAnswer": "Costado (ou casco).",
    "acceptedKeywords": [
      "costado",
      "casco"
    ],
    "explanation": "As defensas amortecem os impactos na atracação."
  },
  {
    "id": "t8-q14",
    "testNumber": 8,
    "questionNumber": 14,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Por que motivo um fundo de areia ou lodo é considerado de boa tença?",
    "expectedAnswer": "Porque permite que as unhas do ferro penetrem facilmente na camada superficial e fiquem cravadas com firmeza sem garrear.",
    "acceptedKeywords": [
      "penetrar",
      "unhar",
      "cravadas",
      "não garrear"
    ],
    "explanation": "Mecânica do fundeio."
  },
  {
    "id": "t8-q15",
    "testNumber": 8,
    "questionNumber": 15,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Os fatores que influenciam o governo e a manobra de uma embarcação a motor são:",
    "options": [
      "Efeito do leme.",
      "Efeito lateral do hélice.",
      "Correntes produzidas pelos hélices.",
      "Todas as alíneas estão corretas."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Todas as alíneas estão corretas.",
    "acceptedKeywords": [
      "todas",
      "corretas"
    ],
    "explanation": "Fatores manobreiros clássicos."
  },
  {
    "id": "t8-q16",
    "testNumber": 8,
    "questionNumber": 16,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A força exercida sobre a porta do leme é tanto maior:",
    "options": [
      "Quanto maior for a velocidade da embarcação.",
      "Quanto menor for a velocidade.",
      "Quanto menor for a área do leme.",
      "Quanto menor for o calado."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Quanto maior for a velocidade da embarcação.",
    "acceptedKeywords": [
      "maior for a velocidade",
      "velocidade"
    ],
    "explanation": "Pressão hidrodinâmica na porta do leme."
  },
  {
    "id": "t8-q17",
    "testNumber": 8,
    "questionNumber": 17,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Ao meter leme a um bordo é necessário vencer uma certa força, que se designa:",
    "options": [
      "Resistência do hélice.",
      "Resistência passiva.",
      "Resistência da proa.",
      "Resistência do leme."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Resistência do leme.",
    "acceptedKeywords": [
      "resistência do leme"
    ],
    "explanation": "Resistência hidrodinâmica gerada pela pá do leme."
  },
  {
    "id": "t8-q18",
    "testNumber": 8,
    "questionNumber": 18,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O dispositivo que possibilita o avanço ou recuo de uma embarcação através do seu movimento circular em rotação chama-se:",
    "expectedAnswer": "Hélice.",
    "acceptedKeywords": [
      "hélice",
      "helice"
    ],
    "explanation": "Propulsor marítimo."
  },
  {
    "id": "t8-q19",
    "testNumber": 8,
    "questionNumber": 19,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O plano vertical longitudinal que divide a embarcação em Bombordo e Estibordo designa-se por:",
    "options": [
      "Plano Diametral.",
      "Plano de Flutuação.",
      "Plano de Meia-Nau.",
      "Plano das Balizas."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Plano Diametral.",
    "acceptedKeywords": [
      "plano diametral",
      "diametral"
    ],
    "explanation": "O plano diametral é o plano vertical de simetria longitudinal da embarcação."
  },
  {
    "id": "t8-q20",
    "testNumber": 8,
    "questionNumber": 20,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Quanto às regiões exteriores das embarcações, o setor situado a meio comprimento, perpendicular à linha proa-popa, designa-se por:",
    "expectedAnswer": "Través.",
    "acceptedKeywords": [
      "través",
      "traves"
    ],
    "explanation": "Direção perpendicular a meio comprimento."
  },
  {
    "id": "t8-q21",
    "testNumber": 8,
    "questionNumber": 21,
    "sourceTests": [
      8
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
      "aguentar"
    ],
    "explanation": "Terminologia náutica."
  },
  {
    "id": "t8-q22",
    "testNumber": 8,
    "questionNumber": 22,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A ação de prender um cabo a um cabeço ou cunho designa-se:",
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
    "explanation": "Prender cabo."
  },
  {
    "id": "t8-q23",
    "testNumber": 8,
    "questionNumber": 23,
    "sourceTests": [
      8
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Para unir dois cabos de bitolas diferentes o nó a utilizar é o:",
    "options": [
      "Lais de guia.",
      "Nó direito.",
      "Nó torto.",
      "Nó de escota."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Nó de escota.",
    "acceptedKeywords": [
      "nó de escota",
      "escota"
    ],
    "explanation": "União de cabos de espessuras diferentes."
  },
  {
    "id": "t8-q24",
    "testNumber": 8,
    "questionNumber": 24,
    "sourceTests": [
      8
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "open-answer",
    "points": 0.6,
    "statement": "O titular da carta de marinheiro maior de 18 anos pode governar que tipo de embarcações e em que limites?",
    "expectedAnswer": "ER até 7 metros de comprimento, até 3 milhas da costa e 10 milhas de porto de abrigo, em navegação diurna.",
    "acceptedKeywords": [
      "7 metros",
      "3 milhas",
      "10 milhas",
      "diurna"
    ],
    "explanation": "Competências legais da carta de Marinheiro."
  },
  {
    "id": "t8-q25",
    "testNumber": 8,
    "questionNumber": 25,
    "sourceTests": [
      8
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Como se classificam as embarcações de recreio com comprimento entre os 7 e os 15 metros?",
    "options": [
      "Tipo 1.",
      "Tipo 2 (Navegação ao Largo).",
      "Tipo 4.",
      "Embarcações de praia."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Tipo 2 (Navegação ao Largo).",
    "acceptedKeywords": [
      "tipo 2",
      "ao largo"
    ],
    "explanation": "Classificação oficial por tipo de embarcação de recreio."
  },
  {
    "id": "t8-q26",
    "testNumber": 8,
    "questionNumber": 26,
    "sourceTests": [
      8
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Diga o que entende por Zero Hidrográfico (ZH):",
    "options": [
      "É o plano horizontal de referência ao qual estão referidas as sondas cartográficas e as previsões de maré.",
      "É a altura máxima que a água atinge na preia-mar.",
      "É a profundidade média do oceano.",
      "É a linha de costa desenhada a vermelho."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "É o plano horizontal de referência ao qual estão referidas as sondas cartográficas e as previsões de maré.",
    "acceptedKeywords": [
      "plano de referência",
      "sondas cartográficas",
      "previsões de maré"
    ],
    "explanation": "Definição oficial do Instituto Hidrográfico para o ZH."
  },
  {
    "id": "t8-q27",
    "testNumber": 8,
    "questionNumber": 27,
    "sourceTests": [
      8
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "A altura da água entre o Zero Hidrográfico e a superfície livre da água designa-se por:",
    "expectedAnswer": "Altura da maré.",
    "acceptedKeywords": [
      "altura da maré",
      "altura de maré"
    ],
    "explanation": "Definição de Hm."
  },
  {
    "id": "t8-q28",
    "testNumber": 8,
    "questionNumber": 28,
    "sourceTests": [
      8
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O circuito de arrefecimento de um motor fora de borda após funcionamento em água salgada deve ser adoçado com:",
    "expectedAnswer": "Água doce limpa.",
    "acceptedKeywords": [
      "água doce",
      "doce"
    ],
    "explanation": "Manutenção de motores marítimos."
  },
  {
    "id": "t8-q29",
    "testNumber": 8,
    "questionNumber": 29,
    "sourceTests": [
      8
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Diga como se apresenta a marca cardinal Norte quanto a cor e forma dos alvos:",
    "expectedAnswer": "Cor: Faixa preta em cima e amarela em baixo (preto sobre amarelo); Alvos: Dois cones pretos apontados ambos para cima.",
    "acceptedKeywords": [
      "preto sobre amarelo",
      "cones para cima",
      "ambos para cima"
    ],
    "explanation": "Marca cardinal Norte IALA."
  },
  {
    "id": "t8-q30",
    "testNumber": 8,
    "questionNumber": 30,
    "sourceTests": [
      8
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O NAVTEX é um equipamento de radiocomunicações marítimas que permite receber automaticamente:",
    "options": [
      "Informação de segurança marítima (MSI), avisos à navegação e boletins meteorológicos.",
      "Filmes e séries.",
      "Comunicações telefónicas terrestres.",
      "Apenas música."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Informação de segurança marítima (MSI), avisos à navegação e boletins meteorológicos.",
    "acceptedKeywords": [
      "segurança marítima",
      "avisos à navegação",
      "meteorológicos"
    ],
    "explanation": "Sistema internacional NAVTEX (518 kHz)."
  }
];
