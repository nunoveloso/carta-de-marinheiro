import { TestQuestion } from "../../types/tests";

/**
 * TESTE 4 OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_4_QUESTIONS: TestQuestion[] = [
  {
    "id": "t4-q01",
    "testNumber": 4,
    "questionNumber": 1,
    "sourceTests": [
      4
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Quando duas embarcações de propulsão mecânica navegam em rumos que se cruzam de modo a envolver risco de colisão:",
    "options": [
      "Desvia-se aquela que vê a outra por bombordo (BB).",
      "Desvia-se aquela que vê a outra por estibordo (EB).",
      "Ambas devem guinar para bombordo (BB).",
      "A mais veloz tem sempre prioridade."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Desvia-se aquela que vê a outra por estibordo (EB).",
    "acceptedKeywords": [
      "estibordo",
      "eb"
    ],
    "explanation": "Regra 15 do RIEAM: A embarcação que vê a outra por estibordo deve desviar-se do caminho desta e evitar cortar-lhe a proa."
  },
  {
    "id": "t4-q02",
    "testNumber": 4,
    "questionNumber": 2,
    "sourceTests": [
      4
    ],
    "category": "RIEAM",
    "subcategory": "Abalroamentos",
    "type": "open-answer",
    "points": 1,
    "statement": "Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:",
    "expectedAnswer": "A embarcação A tem direito a rumo porque se encontra a navegar à vela enquanto a embarcação B é de propulsão mecânica.",
    "acceptedKeywords": [
      "vela",
      "à vela",
      "propulsão mecânica"
    ],
    "explanation": "Regra 18(a)(iv) do RIEAM: Embarcação à vela tem prioridade sobre embarcação de propulsão mecânica.",
    "diagram": {
      "type": "vessel-crossing",
      "variant": "crossing-a-standon"
    }
  },
  {
    "id": "t4-q03",
    "testNumber": 4,
    "questionNumber": 3,
    "sourceTests": [
      4
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio desgovernado deve apresentar durante o dia onde melhor possa ser visto:",
    "options": [
      "Três balões esféricos pretos dispostos verticalmente.",
      "Dois balões esféricos pretos dispostos verticalmente.",
      "Um balão bicónico de cor preta.",
      "Um balão esférico e um bicónico."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Dois balões esféricos pretos dispostos verticalmente.",
    "acceptedKeywords": [
      "dois balões esféricos",
      "dois esféricos pretos"
    ],
    "explanation": "Regra 27(a) do RIEAM: Navio desgovernado exibe de dia duas esferas pretas dispostas verticalmente."
  },
  {
    "id": "t4-q04",
    "testNumber": 4,
    "questionNumber": 4,
    "sourceTests": [
      4
    ],
    "category": "RIEAM",
    "subcategory": "Balões e Marcas Diurnas",
    "type": "open-answer",
    "points": 1,
    "statement": "Desenhe na figura ao lado os balões correspondentes a uma embarcação com capacidade de manobra reduzida:",
    "expectedAnswer": "Três marcas dispostas verticalmente: a superior e a inferior esféricas (balões pretos) e a do meio bicónica (losango preto).",
    "acceptedKeywords": [
      "esfera",
      "bicónico",
      "losango",
      "três marcas"
    ],
    "explanation": "Regra 27(b) do RIEAM: Esfera - Losango/Bicónico - Esfera em linha vertical.",
    "diagram": {
      "type": "day-shapes",
      "variant": "mast-unmarked"
    }
  },
  {
    "id": "t4-q05",
    "testNumber": 4,
    "questionNumber": 5,
    "sourceTests": [
      4
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Um navio de propulsão mecânica (comprimento inferior a 100m) fundeado em condições de visibilidade reduzida deve emitir:",
    "options": [
      "Sequência, com intervalos não superiores a um minuto, de toques de sino em cadência rápida não superior a 5 segundos.",
      "Sequência, com intervalos não superiores a um minuto, de toques de sino em cadência rápida não superior a 10 segundos.",
      "Sequência, com intervalos não superiores a dois minutos, de toques de sino em cadência rápida.",
      "Um som prolongado a cada dois minutos."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Sequência, com intervalos não superiores a um minuto, de toques de sino em cadência rápida não superior a 5 segundos.",
    "acceptedKeywords": [
      "5 segundos",
      "um minuto",
      "toques de sino"
    ],
    "explanation": "Regra 35(g) do RIEAM: Sino com toques rápidos durante 5 segundos a intervalos <= 1 minuto."
  },
  {
    "id": "t4-q06",
    "testNumber": 4,
    "questionNumber": 6,
    "sourceTests": [
      4
    ],
    "category": "RIEAM",
    "subcategory": "Sinais Sonoros e Luminosos",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Uma embarcação de propulsão mecânica em faina de navegação que pretende guinar para Estibordo (EB) deve assinalar emitindo:",
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
    "id": "t4-q07",
    "testNumber": 4,
    "questionNumber": 7,
    "sourceTests": [
      4
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Em caso de queda de um homem ao mar, descreva a manobra imediata de leme e máquinas:",
    "expectedAnswer": "Meter o leme a todo o bordo para o mesmo lado da queda (para afastar a popa e o hélice do náufrago), reduzir velocidade dos motores e lançar a boia salva-vidas.",
    "acceptedKeywords": [
      "leme para o bordo da queda",
      "afastar o hélice",
      "boia salva-vidas"
    ],
    "explanation": "A rotação imediata para o bordo da queda faz a popa afastar-se do sinistrado, evitando ferimentos fatais com o hélice."
  },
  {
    "id": "t4-q08",
    "testNumber": 4,
    "questionNumber": 8,
    "sourceTests": [
      4
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Segurança e Salvamento",
    "type": "open-answer",
    "points": 1,
    "statement": "Enuncie três meios coletivos ou individuais de salvação que devem existir a bordo de uma embarcação de recreio:",
    "expectedAnswer": "Coletes salva-vidas (um por pessoa a bordo), boia de salvação com retenida/luz, e balsa/jangada pneumática salva-vidas.",
    "acceptedKeywords": [
      "colete",
      "boia",
      "balsa",
      "jangada"
    ],
    "explanation": "Equipamentos obrigatórios de salvamento segundo o Regulamento da Náutica de Recreio."
  },
  {
    "id": "t4-q09",
    "testNumber": 4,
    "questionNumber": 9,
    "sourceTests": [
      4
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Combate a Incêndios",
    "type": "multiple-choice",
    "points": 1,
    "statement": "Num incêndio originado por combustíveis líquidos (gasolina ou gasóleo - Classe B), qual o extintor mais adequado?",
    "options": [
      "Extintor de água pressurizada.",
      "Extintor de pó químico seco (ou espuma mecânica / CO2).",
      "Jato de mangueira com água salgada.",
      "Nenhum, deve-se apenas esperar que o combustível arda."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Extintor de pó químico seco (ou espuma mecânica / CO2).",
    "acceptedKeywords": [
      "pó químico",
      "espuma",
      "co2"
    ],
    "explanation": "Nunca se deve usar água direta em combustíveis líquidos pois a água propaga o combustível a arder."
  },
  {
    "id": "t4-q10",
    "testNumber": 4,
    "questionNumber": 10,
    "sourceTests": [
      4
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Quais os valores médios de temperatura, pulso e frequência respiratória de um adulto normal em repouso?",
    "options": [
      "38°C; 70 pulsações/min; 17 respirações/min.",
      "35°C; 100 pulsações/min; 17 respirações/min.",
      "36,5°C; 70 pulsações/min; 17 respirações/min.",
      "37,5°C; 50 pulsações/min; 25 respirações/min."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "36,5°C; 70 pulsações/min; 17 respirações/min.",
    "acceptedKeywords": [
      "36,5",
      "70",
      "17"
    ],
    "explanation": "Valores vitais basais: temperatura corporal ~36,5°C, frequência cardíaca ~60-80 bpm, frequência respiratória ~16-18 rpm."
  },
  {
    "id": "t4-q11",
    "testNumber": 4,
    "questionNumber": 11,
    "sourceTests": [
      4
    ],
    "category": "Segurança e Primeiros Socorros",
    "subcategory": "Primeiros Socorros",
    "type": "open-answer",
    "points": 0.5,
    "statement": "Como deve atuar perante um náufrago resgatado da água que apresente sinais de hipotermia grave?",
    "expectedAnswer": "Retirar as roupas molhadas, agasalhar com mantas secas (ou manta térmica), aquecer o tronco de forma gradual, nunca esfregar a pele e não administrar bebidas alcoólicas.",
    "acceptedKeywords": [
      "retirar roupas molhadas",
      "mantas",
      "aquecimento gradual",
      "não dar álcool"
    ],
    "explanation": "O reaquecimento deve ser progressivo para evitar o choque térmico e paragem cardiorrespiratória."
  },
  {
    "id": "t4-q12",
    "testNumber": 4,
    "questionNumber": 12,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "A manobra de \"içar o ferro\" (arrancar a âncora do fundo) pode-se também designar por:",
    "expectedAnswer": "Suspender o ferro (ou virar a amarra / alar).",
    "acceptedKeywords": [
      "suspender",
      "virar a amarra",
      "alar"
    ],
    "explanation": "Suspender é o termo náutico canónico para o recolhimento e içamento da âncora."
  },
  {
    "id": "t4-q13",
    "testNumber": 4,
    "questionNumber": 13,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "open-answer",
    "points": 0.5,
    "statement": "No ferro de Almirantado, como se designa a haste transversal perpendicular ao plano dos braços que garante a viragem das unhas para o fundo?",
    "expectedAnswer": "Cepo.",
    "acceptedKeywords": [
      "cepo"
    ],
    "explanation": "O cepo tomba a âncora para que uma das unhas penetre e unhe no fundo."
  },
  {
    "id": "t4-q14",
    "testNumber": 4,
    "questionNumber": 14,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Âncoras e Fundeio",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "De entre os tipos de fundo marinho abaixo indicados, quais se consideram de boa tença (bom agarrar do ferro)?",
    "options": [
      "Rocha lisa e lajes.",
      "Areia compacta e barro (lama/vasa).",
      "Seixos redondos e cascalho solto.",
      "Coral duro."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Areia compacta e barro (lama/vasa).",
    "acceptedKeywords": [
      "areia",
      "barro",
      "lama"
    ],
    "explanation": "Areia consistente e lodo firme oferecem excelente fixação para as unhas da âncora."
  },
  {
    "id": "t4-q15",
    "testNumber": 4,
    "questionNumber": 15,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Os fatores que influenciam o governo e a manobra de uma embarcação a motor são:",
    "options": [
      "O efeito do leme.",
      "O efeito lateral de rotação do hélice.",
      "As correntes de sucção e descarga produzidas pelo hélice.",
      "Todas as alíneas estão corretas."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Todas as alíneas estão corretas.",
    "acceptedKeywords": [
      "todas",
      "corretas"
    ],
    "explanation": "A manobrabilidade depende da interação combinada da pá do leme com as forças geradas pelo hélice."
  },
  {
    "id": "t4-q16",
    "testNumber": 4,
    "questionNumber": 16,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Numa manobra de atracação com vento a soprar do lado de terra (a afastar do cais), quanto maior for a força do vento:",
    "options": [
      "Maior deverá ser o ângulo de aproximação entre a embarcação e o cais.",
      "Menor deverá ser o ângulo de aproximação.",
      "O ângulo não influencia a manobra.",
      "Deve atracar-se sempre com o motor desligado."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Maior deverá ser o ângulo de aproximação entre a embarcação e o cais.",
    "acceptedKeywords": [
      "maior o ângulo",
      "maior"
    ],
    "explanation": "Com vento a afastar, aproxima-se com maior ângulo (até 45°) para vencer a deriva antes de passar a espia de proa."
  },
  {
    "id": "t4-q17",
    "testNumber": 4,
    "questionNumber": 17,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Manobras e Amarração",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Estando a embarcação atracada apenas pela regeira de vante com defesa na bochecha, quando for colocado o motor em marcha à vante:",
    "options": [
      "A embarcação vai abrir a popa para fora do cais.",
      "A embarcação vai encostar a popa ao cais.",
      "A embarcação vai avançar para a frente.",
      "A embarcação não se move nem roda."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "A embarcação vai abrir a popa para fora do cais.",
    "acceptedKeywords": [
      "abrir a popa",
      "popa para fora"
    ],
    "explanation": "A regeira de vante impede o avanço e a impulsão do hélice faz a popa abrir para fora, preparando a saída à ré."
  },
  {
    "id": "t4-q18",
    "testNumber": 4,
    "questionNumber": 18,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O peso total de uma embarcação na água (que equivale exatamente ao peso do volume de água deslocada) designa-se por:",
    "expectedAnswer": "Deslocamento.",
    "acceptedKeywords": [
      "deslocamento"
    ],
    "explanation": "Princípio de Arquimedes: O deslocamento é o peso do volume de líquido deslocado pelo casco flutuante."
  },
  {
    "id": "t4-q19",
    "testNumber": 4,
    "questionNumber": 19,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A região média longitudinal de uma embarcação a meio do seu comprimento designa-se por:",
    "options": [
      "Meia-nau.",
      "Meio navio.",
      "Vante.",
      "Ré."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Meia-nau.",
    "acceptedKeywords": [
      "meia-nau",
      "meia nau"
    ],
    "explanation": "Meia-nau é a secção transversal central situada a meio da distância entre perpendiculares."
  },
  {
    "id": "t4-q20",
    "testNumber": 4,
    "questionNumber": 20,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Nomenclatura da Embarcação",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A parte do casco de uma embarcação que fica situada abaixo da linha de água chama-se:",
    "options": [
      "Costado.",
      "Querena (ou obras vivas).",
      "Borda falsa.",
      "Obras mortas."
    ],
    "correctOptionIndex": 1,
    "expectedAnswer": "Querena (ou obras vivas).",
    "acceptedKeywords": [
      "querena",
      "obras vivas"
    ],
    "explanation": "Querena ou obras vivas é a porção imersa permanente do casco."
  },
  {
    "id": "t4-q21",
    "testNumber": 4,
    "questionNumber": 21,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "O que é o chicote de um cabo marítimo?",
    "options": [
      "É a medida do seu comprimento total.",
      "É o meio do cabo.",
      "É a medida do seu perímetro.",
      "É a extremidade livre do cabo."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "É a extremidade livre do cabo.",
    "acceptedKeywords": [
      "extremidade",
      "extremidade do cabo"
    ],
    "explanation": "O chicote é a ponta terminal de um cabo, distinguindo-se do seio (meio) e do firme (ponta fixa)."
  },
  {
    "id": "t4-q22",
    "testNumber": 4,
    "questionNumber": 22,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "A ação de enrolar um cabo em voltas circulares largas e sucessivas sobre o convés para ficar pronto a usar designa-se:",
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
      "aduchas",
      "colher em aduchas"
    ],
    "explanation": "Colher um cabo em aduchas é a boa prática marinheira de arrumação para evitar nós e cocas."
  },
  {
    "id": "t4-q23",
    "testNumber": 4,
    "questionNumber": 23,
    "sourceTests": [
      4
    ],
    "category": "Marinharia",
    "subcategory": "Cabos e Nós",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Para travar ou suster o correr de um cabo sob esforço diz-se em marinharia:",
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
    "explanation": "Aguentar significa suster firmemente a tensão de um cabo para que não corra mais."
  },
  {
    "id": "t4-q24",
    "testNumber": 4,
    "questionNumber": 24,
    "sourceTests": [
      4
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "Indique a resposta correta: a Zona de Navegação Interdita costeira é:",
    "options": [
      "A faixa da costa até 300 metros, a qual é destinada exclusivamente à prática de banhos.",
      "A faixa da costa até 200 metros apenas nas praias sem vigilância.",
      "A faixa da costa até 50 metros em redor de qualquer falésia.",
      "A faixa da costa até 1000 metros de qualquer porto."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "A faixa da costa até 300 metros, a qual é destinada exclusivamente à prática de banhos.",
    "acceptedKeywords": [
      "300 metros",
      "banhos"
    ],
    "explanation": "A faixa de 300 metros da orla marítima balnear é reservada à natação, sendo proibida a navegação a motor exceto nos canais balizados de acesso."
  },
  {
    "id": "t4-q25",
    "testNumber": 4,
    "questionNumber": 25,
    "sourceTests": [
      4
    ],
    "category": "Outras Matérias",
    "subcategory": "Legislação Marítima",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "As normas do Regulamento da Náutica de Recreio NÃO se aplicam a:",
    "options": [
      "Motas de água.",
      "Embarcações à vela de comprimento até 10 metros.",
      "Pranchas de surf, pranchas à vela e embarcações a remos de praia.",
      "Embarcações sem motor."
    ],
    "correctOptionIndex": 2,
    "expectedAnswer": "Pranchas de surf, pranchas à vela e embarcações a remos de praia.",
    "acceptedKeywords": [
      "pranchas",
      "remos de praia"
    ],
    "explanation": "Pranchas e artefactos de praia não têm estatuto de embarcação de recreio registada."
  },
  {
    "id": "t4-q26",
    "testNumber": 4,
    "questionNumber": 26,
    "sourceTests": [
      4
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Relativamente às marés astronómicas, durante a fase de Lua Cheia ocorrem habitualmente:",
    "expectedAnswer": "Marés vivas (ou marés de sizígia), caracterizadas por grandes amplitudes e preia-mares muito altas.",
    "acceptedKeywords": [
      "marés vivas",
      "sizígia",
      "vivas"
    ],
    "explanation": "Na Lua Cheia (e Nova) as forças do Sol e da Lua somam-se em alinhamento (sizígia), gerando marés vivas."
  },
  {
    "id": "t4-q27",
    "testNumber": 4,
    "questionNumber": 27,
    "sourceTests": [
      4
    ],
    "category": "Outras Matérias",
    "subcategory": "Marés e Navegação",
    "type": "open-answer",
    "points": 0.6,
    "statement": "Como determina o valor da Sonda à hora da sua embarcação?",
    "expectedAnswer": "Sonda à Hora = Sonda Reduzida (lida na carta) + Altura da Maré calculada para a respetiva hora.",
    "acceptedKeywords": [
      "sonda reduzida",
      "altura da maré",
      "sr + hm"
    ],
    "explanation": "A profundidade real disponível é a soma da sonda da carta com a altura da maré no instante da passagem."
  },
  {
    "id": "t4-q28",
    "testNumber": 4,
    "questionNumber": 28,
    "sourceTests": [
      4
    ],
    "category": "Outras Matérias",
    "subcategory": "Motores e Mecânica",
    "type": "open-answer",
    "points": 0.5,
    "statement": "O que se deve verificar numa embarcação antes de pôr a trabalhar o motor?",
    "expectedAnswer": "Verificar o nível de óleo no cárter, combustível suficiente, circuito de refrigeração aberto e ventilar o compartimento do motor para expulsar vapores inflamáveis.",
    "acceptedKeywords": [
      "óleo",
      "combustível",
      "ventilar",
      "água de refrigeração"
    ],
    "explanation": "A ventilação dos compartimentos e a verificação dos fluidos são regras fundamentais de segurança náutica."
  },
  {
    "id": "t4-q29",
    "testNumber": 4,
    "questionNumber": 29,
    "sourceTests": [
      4
    ],
    "category": "Outras Matérias",
    "subcategory": "Balizagem",
    "type": "multiple-choice",
    "points": 0.6,
    "statement": "As marcas especiais que assinalam zonas reservadas ou áreas de recreio e desporto náutico são de cor:",
    "options": [
      "Amarela.",
      "Vermelha.",
      "Verde.",
      "Branca e vermelha em faixas verticais."
    ],
    "correctOptionIndex": 0,
    "expectedAnswer": "Amarela.",
    "acceptedKeywords": [
      "amarela",
      "amarelo"
    ],
    "explanation": "No sistema IALA as marcas especiais (alvo em X) têm cor amarela e assinalam áreas reservadas, cabos submarinos ou recreio."
  },
  {
    "id": "t4-q30",
    "testNumber": 4,
    "questionNumber": 30,
    "sourceTests": [
      4
    ],
    "category": "Outras Matérias",
    "subcategory": "Meteorologia",
    "type": "multiple-choice",
    "points": 0.5,
    "statement": "Qual a nuvem de grande desenvolvimento vertical em forma de bigorna que acarreta tempestades violentas, rajadas e perigo no mar?",
    "options": [
      "Cúmulos.",
      "Estratos.",
      "Cirros.",
      "Cúmulo-nimbos (Cumulonimbus)."
    ],
    "correctOptionIndex": 3,
    "expectedAnswer": "Cúmulo-nimbos (Cumulonimbus).",
    "acceptedKeywords": [
      "cúmulo-nimbos",
      "cumulonimbus"
    ],
    "explanation": "Os cúmulo-nimbos provocam ventos tempestuosos súbitos, trovoada, granizo e forte agitação marítima."
  }
];
