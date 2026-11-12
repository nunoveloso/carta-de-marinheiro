const fs = require('fs');

function makeQ({ id, testNumber, questionNumber, sourceTests, category, subcategory, type, points, statement, options, correctOptionIndex, expectedAnswer, acceptedKeywords, explanation, diagram }) {
  return {
    id, testNumber, questionNumber, sourceTests: sourceTests || [testNumber], category, subcategory, type, points, statement,
    ...(options ? { options } : {}),
    ...(correctOptionIndex !== undefined ? { correctOptionIndex } : {}),
    ...(expectedAnswer ? { expectedAnswer } : {}),
    ...(acceptedKeywords ? { acceptedKeywords } : {}),
    ...(explanation ? { explanation } : {}),
    ...(diagram ? { diagram } : {})
  };
}

function exportTestFile(testNum, questions) {
  const content = `import { TestQuestion } from "../../types/tests";\n\n/**\n * TESTE ${testNum} OFICIAL DGRM / IPTM\n * 30 Perguntas na Ordem Exata do Enunciado Oficial\n */\nexport const TEST_${testNum}_QUESTIONS: TestQuestion[] = ${JSON.stringify(questions, null, 2)};\n`;
  fs.writeFileSync(`src/data/tests/test${testNum}.ts`, content);
  console.log(`Generated src/data/tests/test${testNum}.ts with ${questions.length} questions.`);
}

// ==========================================
// TEST 4
// ==========================================
const t4 = [
  makeQ({
    id: 't4-q01', testNumber: 4, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Quando duas embarcações de propulsão mecânica navegam em rumos que se cruzam de modo a envolver risco de colisão:',
    options: [
      'Desvia-se aquela que vê a outra por bombordo (BB).',
      'Desvia-se aquela que vê a outra por estibordo (EB).',
      'Ambas devem guinar para bombordo (BB).',
      'A mais veloz tem sempre prioridade.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Desvia-se aquela que vê a outra por estibordo (EB).', acceptedKeywords: ['estibordo', 'eb'],
    explanation: 'Regra 15 do RIEAM: A embarcação que vê a outra por estibordo deve desviar-se do caminho desta e evitar cortar-lhe a proa.'
  }),
  makeQ({
    id: 't4-q02', testNumber: 4, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque se encontra a navegar à vela enquanto a embarcação B é de propulsão mecânica.',
    acceptedKeywords: ['vela', 'à vela', 'propulsão mecânica'],
    explanation: 'Regra 18(a)(iv) do RIEAM: Embarcação à vela tem prioridade sobre embarcação de propulsão mecânica.',
    diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't4-q03', testNumber: 4, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio desgovernado deve apresentar durante o dia onde melhor possa ser visto:',
    options: [
      'Três balões esféricos pretos dispostos verticalmente.',
      'Dois balões esféricos pretos dispostos verticalmente.',
      'Um balão bicónico de cor preta.',
      'Um balão esférico e um bicónico.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Dois balões esféricos pretos dispostos verticalmente.', acceptedKeywords: ['dois balões esféricos', 'dois esféricos pretos'],
    explanation: 'Regra 27(a) do RIEAM: Navio desgovernado exibe de dia duas esferas pretas dispostas verticalmente.'
  }),
  makeQ({
    id: 't4-q04', testNumber: 4, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Desenhe na figura ao lado os balões correspondentes a uma embarcação com capacidade de manobra reduzida:',
    expectedAnswer: 'Três marcas dispostas verticalmente: a superior e a inferior esféricas (balões pretos) e a do meio bicónica (losango preto).',
    acceptedKeywords: ['esfera', 'bicónico', 'losango', 'três marcas'],
    explanation: 'Regra 27(b) do RIEAM: Esfera - Losango/Bicónico - Esfera em linha vertical.',
    diagram: { type: 'day-shapes', variant: 'mast-unmarked' }
  }),
  makeQ({
    id: 't4-q05', testNumber: 4, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de propulsão mecânica (comprimento inferior a 100m) fundeado em condições de visibilidade reduzida deve emitir:',
    options: [
      'Sequência, com intervalos não superiores a um minuto, de toques de sino em cadência rápida não superior a 5 segundos.',
      'Sequência, com intervalos não superiores a um minuto, de toques de sino em cadência rápida não superior a 10 segundos.',
      'Sequência, com intervalos não superiores a dois minutos, de toques de sino em cadência rápida.',
      'Um som prolongado a cada dois minutos.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Sequência, com intervalos não superiores a um minuto, de toques de sino em cadência rápida não superior a 5 segundos.', acceptedKeywords: ['5 segundos', 'um minuto', 'toques de sino'],
    explanation: 'Regra 35(g) do RIEAM: Sino com toques rápidos durante 5 segundos a intervalos <= 1 minuto.'
  }),
  makeQ({
    id: 't4-q06', testNumber: 4, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação de propulsão mecânica em faina de navegação que pretende guinar para Estibordo (EB) deve assinalar emitindo:',
    options: [
      'Um som curto.',
      'Dois sons curtos.',
      'Três sons curtos.',
      'Dois sons longos.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Um som curto.', acceptedKeywords: ['um som curto', 'um curto'],
    explanation: 'Regra 34(a) do RIEAM: Um som curto significa: "Estou a guinar para estibordo".'
  }),
  makeQ({
    id: 't4-q07', testNumber: 4, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Em caso de queda de um homem ao mar, descreva a manobra imediata de leme e máquinas:',
    expectedAnswer: 'Meter o leme a todo o bordo para o mesmo lado da queda (para afastar a popa e o hélice do náufrago), reduzir velocidade dos motores e lançar a boia salva-vidas.',
    acceptedKeywords: ['leme para o bordo da queda', 'afastar o hélice', 'boia salva-vidas'],
    explanation: 'A rotação imediata para o bordo da queda faz a popa afastar-se do sinistrado, evitando ferimentos fatais com o hélice.'
  }),
  makeQ({
    id: 't4-q08', testNumber: 4, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Enuncie três meios coletivos ou individuais de salvação que devem existir a bordo de uma embarcação de recreio:',
    expectedAnswer: 'Coletes salva-vidas (um por pessoa a bordo), boia de salvação com retenida/luz, e balsa/jangada pneumática salva-vidas.',
    acceptedKeywords: ['colete', 'boia', 'balsa', 'jangada'],
    explanation: 'Equipamentos obrigatórios de salvamento segundo o Regulamento da Náutica de Recreio.'
  }),
  makeQ({
    id: 't4-q09', testNumber: 4, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'multiple-choice', points: 1.0,
    statement: 'Num incêndio originado por combustíveis líquidos (gasolina ou gasóleo - Classe B), qual o extintor mais adequado?',
    options: [
      'Extintor de água pressurizada.',
      'Extintor de pó químico seco (ou espuma mecânica / CO2).',
      'Jato de mangueira com água salgada.',
      'Nenhum, deve-se apenas esperar que o combustível arda.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Extintor de pó químico seco (ou espuma mecânica / CO2).', acceptedKeywords: ['pó químico', 'espuma', 'co2'],
    explanation: 'Nunca se deve usar água direta em combustíveis líquidos pois a água propaga o combustível a arder.'
  }),
  makeQ({
    id: 't4-q10', testNumber: 4, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Quais os valores médios de temperatura, pulso e frequência respiratória de um adulto normal em repouso?',
    options: [
      '38°C; 70 pulsações/min; 17 respirações/min.',
      '35°C; 100 pulsações/min; 17 respirações/min.',
      '36,5°C; 70 pulsações/min; 17 respirações/min.',
      '37,5°C; 50 pulsações/min; 25 respirações/min.'
    ],
    correctOptionIndex: 2, expectedAnswer: '36,5°C; 70 pulsações/min; 17 respirações/min.', acceptedKeywords: ['36,5', '70', '17'],
    explanation: 'Valores vitais basais: temperatura corporal ~36,5°C, frequência cardíaca ~60-80 bpm, frequência respiratória ~16-18 rpm.'
  }),
  makeQ({
    id: 't4-q11', testNumber: 4, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'Como deve atuar perante um náufrago resgatado da água que apresente sinais de hipotermia grave?',
    expectedAnswer: 'Retirar as roupas molhadas, agasalhar com mantas secas (ou manta térmica), aquecer o tronco de forma gradual, nunca esfregar a pele e não administrar bebidas alcoólicas.',
    acceptedKeywords: ['retirar roupas molhadas', 'mantas', 'aquecimento gradual', 'não dar álcool'],
    explanation: 'O reaquecimento deve ser progressivo para evitar o choque térmico e paragem cardiorrespiratória.'
  }),
  makeQ({
    id: 't4-q12', testNumber: 4, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A manobra de "içar o ferro" (arrancar a âncora do fundo) pode-se também designar por:',
    expectedAnswer: 'Suspender o ferro (ou virar a amarra / alar).', acceptedKeywords: ['suspender', 'virar a amarra', 'alar'],
    explanation: 'Suspender é o termo náutico canónico para o recolhimento e içamento da âncora.'
  }),
  makeQ({
    id: 't4-q13', testNumber: 4, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'No ferro de Almirantado, como se designa a haste transversal perpendicular ao plano dos braços que garante a viragem das unhas para o fundo?',
    expectedAnswer: 'Cepo.', acceptedKeywords: ['cepo'],
    explanation: 'O cepo tomba a âncora para que uma das unhas penetre e unhe no fundo.'
  }),
  makeQ({
    id: 't4-q14', testNumber: 4, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'multiple-choice', points: 0.5,
    statement: 'De entre os tipos de fundo marinho abaixo indicados, quais se consideram de boa tença (bom agarrar do ferro)?',
    options: [
      'Rocha lisa e lajes.',
      'Areia compacta e barro (lama/vasa).',
      'Seixos redondos e cascalho solto.',
      'Coral duro.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Areia compacta e barro (lama/vasa).', acceptedKeywords: ['areia', 'barro', 'lama'],
    explanation: 'Areia consistente e lodo firme oferecem excelente fixação para as unhas da âncora.'
  }),
  makeQ({
    id: 't4-q15', testNumber: 4, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Os fatores que influenciam o governo e a manobra de uma embarcação a motor são:',
    options: [
      'O efeito do leme.',
      'O efeito lateral de rotação do hélice.',
      'As correntes de sucção e descarga produzidas pelo hélice.',
      'Todas as alíneas estão corretas.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Todas as alíneas estão corretas.', acceptedKeywords: ['todas', 'corretas'],
    explanation: 'A manobrabilidade depende da interação combinada da pá do leme com as forças geradas pelo hélice.'
  }),
  makeQ({
    id: 't4-q16', testNumber: 4, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Numa manobra de atracação com vento a soprar do lado de terra (a afastar do cais), quanto maior for a força do vento:',
    options: [
      'Maior deverá ser o ângulo de aproximação entre a embarcação e o cais.',
      'Menor deverá ser o ângulo de aproximação.',
      'O ângulo não influencia a manobra.',
      'Deve atracar-se sempre com o motor desligado.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Maior deverá ser o ângulo de aproximação entre a embarcação e o cais.', acceptedKeywords: ['maior o ângulo', 'maior'],
    explanation: 'Com vento a afastar, aproxima-se com maior ângulo (até 45°) para vencer a deriva antes de passar a espia de proa.'
  }),
  makeQ({
    id: 't4-q17', testNumber: 4, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Estando a embarcação atracada apenas pela regeira de vante com defesa na bochecha, quando for colocado o motor em marcha à vante:',
    options: [
      'A embarcação vai abrir a popa para fora do cais.',
      'A embarcação vai encostar a popa ao cais.',
      'A embarcação vai avançar para a frente.',
      'A embarcação não se move nem roda.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'A embarcação vai abrir a popa para fora do cais.', acceptedKeywords: ['abrir a popa', 'popa para fora'],
    explanation: 'A regeira de vante impede o avanço e a impulsão do hélice faz a popa abrir para fora, preparando a saída à ré.'
  }),
  makeQ({
    id: 't4-q18', testNumber: 4, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'O peso total de uma embarcação na água (que equivale exatamente ao peso do volume de água deslocada) designa-se por:',
    expectedAnswer: 'Deslocamento.', acceptedKeywords: ['deslocamento'],
    explanation: 'Princípio de Arquimedes: O deslocamento é o peso do volume de líquido deslocado pelo casco flutuante.'
  }),
  makeQ({
    id: 't4-q19', testNumber: 4, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'A região média longitudinal de uma embarcação a meio do seu comprimento designa-se por:',
    options: [
      'Meia-nau.',
      'Meio navio.',
      'Vante.',
      'Ré.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Meia-nau.', acceptedKeywords: ['meia-nau', 'meia nau'],
    explanation: 'Meia-nau é a secção transversal central situada a meio da distância entre perpendiculares.'
  }),
  makeQ({
    id: 't4-q20', testNumber: 4, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'A parte do casco de uma embarcação que fica situada abaixo da linha de água chama-se:',
    options: [
      'Costado.',
      'Querena (ou obras vivas).',
      'Borda falsa.',
      'Obras mortas.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Querena (ou obras vivas).', acceptedKeywords: ['querena', 'obras vivas'],
    explanation: 'Querena ou obras vivas é a porção imersa permanente do casco.'
  }),
  makeQ({
    id: 't4-q21', testNumber: 4, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'O que é o chicote de um cabo marítimo?',
    options: [
      'É a medida do seu comprimento total.',
      'É o meio do cabo.',
      'É a medida do seu perímetro.',
      'É a extremidade livre do cabo.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'É a extremidade livre do cabo.', acceptedKeywords: ['extremidade', 'extremidade do cabo'],
    explanation: 'O chicote é a ponta terminal de um cabo, distinguindo-se do seio (meio) e do firme (ponta fixa).'
  }),
  makeQ({
    id: 't4-q22', testNumber: 4, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'A ação de enrolar um cabo em voltas circulares largas e sucessivas sobre o convés para ficar pronto a usar designa-se:',
    options: [
      'Alar um cabo.',
      'Colher um cabo (em aduchas).',
      'Amarrar um cabo.',
      'Aguentar um cabo.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Colher um cabo (em aduchas).', acceptedKeywords: ['colher', 'aduchas', 'colher em aduchas'],
    explanation: 'Colher um cabo em aduchas é a boa prática marinheira de arrumação para evitar nós e cocas.'
  }),
  makeQ({
    id: 't4-q23', testNumber: 4, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Para travar ou suster o correr de um cabo sob esforço diz-se em marinharia:',
    options: [
      'Alar um cabo.',
      'Folgar um cabo.',
      'Aguentar um cabo.',
      'Largar um cabo.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Aguentar um cabo.', acceptedKeywords: ['aguentar', 'aguentar um cabo'],
    explanation: 'Aguentar significa suster firmemente a tensão de um cabo para que não corra mais.'
  }),
  makeQ({
    id: 't4-q24', testNumber: 4, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'Indique a resposta correta: a Zona de Navegação Interdita costeira é:',
    options: [
      'A faixa da costa até 300 metros, a qual é destinada exclusivamente à prática de banhos.',
      'A faixa da costa até 200 metros apenas nas praias sem vigilância.',
      'A faixa da costa até 50 metros em redor de qualquer falésia.',
      'A faixa da costa até 1000 metros de qualquer porto.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'A faixa da costa até 300 metros, a qual é destinada exclusivamente à prática de banhos.', acceptedKeywords: ['300 metros', 'banhos'],
    explanation: 'A faixa de 300 metros da orla marítima balnear é reservada à natação, sendo proibida a navegação a motor exceto nos canais balizados de acesso.'
  }),
  makeQ({
    id: 't4-q25', testNumber: 4, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'As normas do Regulamento da Náutica de Recreio NÃO se aplicam a:',
    options: [
      'Motas de água.',
      'Embarcações à vela de comprimento até 10 metros.',
      'Pranchas de surf, pranchas à vela e embarcações a remos de praia.',
      'Embarcações sem motor.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Pranchas de surf, pranchas à vela e embarcações a remos de praia.', acceptedKeywords: ['pranchas', 'remos de praia'],
    explanation: 'Pranchas e artefactos de praia não têm estatuto de embarcação de recreio registada.'
  }),
  makeQ({
    id: 't4-q26', testNumber: 4, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'Relativamente às marés astronómicas, durante a fase de Lua Cheia ocorrem habitualmente:',
    expectedAnswer: 'Marés vivas (ou marés de sizígia), caracterizadas por grandes amplitudes e preia-mares muito altas.',
    acceptedKeywords: ['marés vivas', 'sizígia', 'vivas'],
    explanation: 'Na Lua Cheia (e Nova) as forças do Sol e da Lua somam-se em alinhamento (sizígia), gerando marés vivas.'
  }),
  makeQ({
    id: 't4-q27', testNumber: 4, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'Como determina o valor da Sonda à hora da sua embarcação?',
    expectedAnswer: 'Sonda à Hora = Sonda Reduzida (lida na carta) + Altura da Maré calculada para a respetiva hora.',
    acceptedKeywords: ['sonda reduzida', 'altura da maré', 'sr + hm'],
    explanation: 'A profundidade real disponível é a soma da sonda da carta com a altura da maré no instante da passagem.'
  }),
  makeQ({
    id: 't4-q28', testNumber: 4, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'open-answer', points: 0.5,
    statement: 'O que se deve verificar numa embarcação antes de pôr a trabalhar o motor?',
    expectedAnswer: 'Verificar o nível de óleo no cárter, combustível suficiente, circuito de refrigeração aberto e ventilar o compartimento do motor para expulsar vapores inflamáveis.',
    acceptedKeywords: ['óleo', 'combustível', 'ventilar', 'água de refrigeração'],
    explanation: 'A ventilação dos compartimentos e a verificação dos fluidos são regras fundamentais de segurança náutica.'
  }),
  makeQ({
    id: 't4-q29', testNumber: 4, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'multiple-choice', points: 0.6,
    statement: 'As marcas especiais que assinalam zonas reservadas ou áreas de recreio e desporto náutico são de cor:',
    options: [
      'Amarela.',
      'Vermelha.',
      'Verde.',
      'Branca e vermelha em faixas verticais.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Amarela.', acceptedKeywords: ['amarela', 'amarelo'],
    explanation: 'No sistema IALA as marcas especiais (alvo em X) têm cor amarela e assinalam áreas reservadas, cabos submarinos ou recreio.'
  }),
  makeQ({
    id: 't4-q30', testNumber: 4, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'Qual a nuvem de grande desenvolvimento vertical em forma de bigorna que acarreta tempestades violentas, rajadas e perigo no mar?',
    options: [
      'Cúmulos.',
      'Estratos.',
      'Cirros.',
      'Cúmulo-nimbos (Cumulonimbus).'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Cúmulo-nimbos (Cumulonimbus).', acceptedKeywords: ['cúmulo-nimbos', 'cumulonimbus'],
    explanation: 'Os cúmulo-nimbos provocam ventos tempestuosos súbitos, trovoada, granizo e forte agitação marítima.'
  })
];
exportTestFile(4, t4);

// ==========================================
// TEST 5
// ==========================================
const t5 = [
  makeQ({
    id: 't5-q01', testNumber: 5, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de propulsão mecânica deve desviar-se do caminho de:',
    options: [
      'Um navio desgovernado.',
      'Um navio com capacidade de manobra reduzida.',
      'Um navio na faina da pesca ou um navio à vela.',
      'Todas as alíneas anteriores estão corretas.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Todas as alíneas anteriores estão corretas.', acceptedKeywords: ['todas', 'corretas'],
    explanation: 'Regra 18 do RIEAM: Hierarquia de responsabilidades entre embarcações.'
  }),
  makeQ({
    id: 't5-q02', testNumber: 5, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque se encontra com capacidade de manobra reduzida.',
    acceptedKeywords: ['capacidade de manobra reduzida', 'manobra reduzida'],
    explanation: 'Regra 18 do RIEAM.',
    diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't5-q03', testNumber: 5, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação que navegue simultaneamente à vela e com propulsão mecânica deve apresentar de dia:',
    options: [
      'Um balão esférico preto na proa.',
      'Um balão bicónico preto.',
      'Um balão cónico preto com o vértice para baixo.',
      'Nenhuma marca se for menor de 12 metros.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Um balão cónico preto com o vértice para baixo.', acceptedKeywords: ['cone preto', 'vértice para baixo'],
    explanation: 'Regra 25(e) do RIEAM.'
  }),
  makeQ({
    id: 't5-q04', testNumber: 5, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Desenhe na figura ao lado os balões correspondentes a um navio encalhado:',
    expectedAnswer: 'Três balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.',
    acceptedKeywords: ['três balões esféricos', 'três esferas pretas'],
    explanation: 'Regra 30(d) do RIEAM: Navio encalhado exibe 3 esferas pretas na vertical.',
    diagram: { type: 'day-shapes', variant: 'mast-unmarked' }
  }),
  makeQ({
    id: 't5-q05', testNumber: 5, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de comprimento igual ou superior a 12 metros e inferior a 20 metros deve dispor de material de sinalização sonora composto por:',
    options: [
      'Apito, sino e gongo.',
      'Apito, sino e gongo opcional.',
      'Apito (e o sino é opcional).',
      'Apito, sino e gongo todos opcionais.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Apito (e o sino é opcional).', acceptedKeywords: ['apito', 'sino opcional'],
    explanation: 'Regra 33(a) do RIEAM: Embarcações de 12m a 20m não são obrigadas a levar sino, mas devem ter apito.'
  }),
  makeQ({
    id: 't5-q06', testNumber: 5, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de propulsão mecânica na faina da pesca e com visibilidade reduzida deve emitir o seguinte sinal sonoro:',
    options: [
      'Um som curto a cada dois minutos.',
      'Dois sons longos a cada dois minutos.',
      'Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.',
      'Três sons curtos com intervalos não superiores a dois minutos.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.', acceptedKeywords: ['prolongado seguido de dois curtos'],
    explanation: 'Regra 35(c) do RIEAM.'
  }),
  makeQ({
    id: 't5-q07', testNumber: 5, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Descreva o que entende por drogue ou âncora flutuante, e quando e como deve ser usado:',
    expectedAnswer: 'É um dispositivo cónico de lona que se lança à água pela proa ou popa ligado por um cabo comprido. Usa-se em mau tempo (para ficar à capa) para diminuir a velocidade de deriva e manter a embarcação alinhada com as vagas.',
    acceptedKeywords: ['reduzir a deriva', 'manter alinhada', 'mau tempo', 'à capa'],
    explanation: 'O drogue trava a embarcação hidrodinamicamente no mar bravo, prevenindo o atravessamento à vaga.'
  }),
  makeQ({
    id: 't5-q08', testNumber: 5, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Enuncie três meios de salvação individuais ou coletivos regulamentares:',
    expectedAnswer: '1. Coletes salva-vidas; 2. Boia circular de salvação com retinida; 3. Jangada pneumática salva-vidas.',
    acceptedKeywords: ['colete', 'boia', 'jangada'],
    explanation: 'Meios padrão de salvamento em mar.'
  }),
  makeQ({
    id: 't5-q09', testNumber: 5, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'open-answer', points: 1.0,
    statement: 'Qual o método e agente de extinção que devemos usar num incêndio com origem em equipamentos elétricos em carga?',
    expectedAnswer: 'Extintor de dióxido de carbono (CO2) ou pó químico seco, cortando previamente a corrente elétrica. Nunca usar água.',
    acceptedKeywords: ['co2', 'dióxido de carbono', 'pó químico', 'nunca água'],
    explanation: 'A água conduz corrente elétrica e provoca choque mortal no operador.'
  }),
  makeQ({
    id: 't5-q10', testNumber: 5, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'Complete a frase com uma das palavras (Consciente / Inconsciente): A Posição Lateral de Segurança (PLS) deve ser utilizada em sinistrados ____ que respirem e com batimentos cardíacos.',
    expectedAnswer: 'Inconsciente (ou inconscientes).', acceptedKeywords: ['inconsciente', 'inconscientes'],
    explanation: 'A PLS destina-se exclusivamente a pessoas inconscientes mas a respirar, para manter a via aérea permeável.'
  }),
  makeQ({
    id: 't5-q11', testNumber: 5, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Num adulto saudável considera-se como normal uma frequência respiratória de:',
    options: ['30 a 35 por minuto.', '60 a 65 por minuto.', '16 a 18 por minuto.', '08 a 10 por minuto.'],
    correctOptionIndex: 2, expectedAnswer: '16 a 18 por minuto.', acceptedKeywords: ['16 a 18'],
    explanation: 'Frequência basal fisiológica respiratória normal no adulto.'
  }),
  makeQ({
    id: 't5-q12', testNumber: 5, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'Observe a figura da âncora de Almirantado e indique as partes principais: haste, cepo, braços, unhas e anete.',
    expectedAnswer: 'Haste, Cepo, Braços, Unhas e Anete.', acceptedKeywords: ['haste', 'cepo', 'unhas', 'braços', 'anete'],
    explanation: 'Nomenclatura clássica do ferro de cepo/almirantado.'
  }),
  makeQ({
    id: 't5-q13', testNumber: 5, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'multiple-choice', points: 0.5,
    statement: 'De entre os fundos abaixo, indique aqueles que se podem considerar de boa tença:',
    options: ['Lajes e rocha lisa.', 'Barro (lama consistente) e areia.', 'Seixos soltos e cascalho.', 'Fundo de algas flutuantes.'],
    correctOptionIndex: 1, expectedAnswer: 'Barro (lama consistente) e areia.', acceptedKeywords: ['barro', 'areia'],
    explanation: 'Barro e areia permitem a penetração e unhadura das pás do ferro.'
  }),
  makeQ({
    id: 't5-q14', testNumber: 5, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'multiple-choice', points: 0.5,
    statement: 'O arinque é:',
    options: [
      'Uma volta de cabo.',
      'Um cabo fino que liga a âncora à boia de arinque para assinalar a posição do ferro.',
      'Um tipo especial de âncora.',
      'Uma manilha de amarração.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Um cabo fino que liga a âncora à boia de arinque para assinalar a posição do ferro.', acceptedKeywords: ['cabo', 'boia de arinque'],
    explanation: 'O arinque permite localizar a âncora e desferrá-la pela cruz se ficar presa numa rocha.'
  }),
  makeQ({
    id: 't5-q15', testNumber: 5, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'open-answer', points: 0.5,
    statement: 'Numa amarração ao cais, identifique os cabos: Lançante de vante e Regeira de vante.',
    expectedAnswer: 'Lançante de vante (vai da proa para a frente) e Regeira de vante (vai da proa para a ré).',
    acceptedKeywords: ['lançante', 'regeira'],
    explanation: 'Lançantes impedem o recuo ou avanço geral; as regeiras impedem a deslocação em sentido contrário.'
  }),
  makeQ({
    id: 't5-q16', testNumber: 5, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Na manobra de rotação para recolha de um náufrago que caiu por bombordo (BB), deve-se de imediato:',
    options: [
      'Guinar para estibordo.',
      'Guinar para bombordo (BB), de modo a afastar a popa do náufrago.',
      'Acelerar a toda a força à vante.',
      'Manter o leme a meio e dar máquinas à ré.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Guinar para bombordo (BB), de modo a afastar a popa do náufrago.', acceptedKeywords: ['guinar para bombordo', 'afastar a popa'],
    explanation: 'Ao guinar para o bordo da queda, a popa e o hélice afastam-se imediatamente da vítima.'
  }),
  makeQ({
    id: 't5-q17', testNumber: 5, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'No movimento do hélice em marcha à vante, a corrente de descarga atua no leme:',
    options: [
      'Provocando pressão hidrodinâmica sobre a porta do leme.',
      'Provocando pressão sobre a madre do leme.',
      'Provocando atração sobre a cachola.',
      'Sem provocar qualquer alteração no governo.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Provocando pressão hidrodinâmica sobre a porta do leme.', acceptedKeywords: ['pressão', 'porta do leme'],
    explanation: 'O fluxo de água acelerado pelo hélice atinge a porta do leme, gerando a força que faz guinar o barco.'
  }),
  makeQ({
    id: 't5-q18', testNumber: 5, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'A parte submersa do casco de uma embarcação designa-se por:',
    options: ['Robalete.', 'Costado.', 'Obras vivas ou querena.', 'Obras mortas.'],
    correctOptionIndex: 2, expectedAnswer: 'Obras vivas ou querena.', acceptedKeywords: ['obras vivas', 'querena'],
    explanation: 'Querena é a superfície do casco em contacto permanente com a água.'
  }),
  makeQ({
    id: 't5-q19', testNumber: 5, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'A peça longitudinal estrutural fundamental que constitui a espinha dorsal da ossada da embarcação designa-se por:',
    options: ['Longarina.', 'Quilha.', 'Baliza.', 'Trincaniz.'],
    correctOptionIndex: 1, expectedAnswer: 'Quilha.', acceptedKeywords: ['quilha'],
    explanation: 'A quilha é a viga mestra inferior que corre longitudinalmente de proa a ré.'
  }),
  makeQ({
    id: 't5-q20', testNumber: 5, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'Quanto às regiões de uma embarcação, a zona posterior curva de transição entre o costado e a popa designa-se por:',
    expectedAnswer: 'Alheta (alheta de bombordo ou de estibordo).', acceptedKeywords: ['alheta'],
    explanation: 'A alheta fica situada entre o través e a popa.'
  }),
  makeQ({
    id: 't5-q21', testNumber: 5, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'O que é a boça de uma embarcação?',
    options: [
      'Uma elevação a meio do convés.',
      'Um cabo fixo à proa que serve para amarrar a embarcação.',
      'Uma peça de ferro fundido.',
      'A largura máxima da embarcação.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Um cabo fixo à proa que serve para amarrar a embarcação.', acceptedKeywords: ['cabo', 'amarrar'],
    explanation: 'Cabo de proa para amarração ou reboque rápido.'
  }),
  makeQ({
    id: 't5-q22', testNumber: 5, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Identifique o nó que forma uma laçada fixa que não corre nem aperta sob tensão e dê um exemplo da sua aplicação:',
    expectedAnswer: 'Lais de guia. Aplica-se para passar uma laçada num cabeço do cais ou içar um homem em segurança.',
    acceptedKeywords: ['lais de guia', 'cabeço', 'laçada'],
    explanation: 'O lais de guia é o rei dos nós em marinharia.'
  }),
  makeQ({
    id: 't5-q23', testNumber: 5, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Para fixar um cabo a um cunho de amarração devem-se utilizar:',
    options: [
      'Apenas uma volta redonda.',
      'Voltas em oito cruzadas rematadas com meia volta mordida.',
      'Nó cego com várias laçadas.',
      'Nó de barcaça.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Voltas em oito cruzadas rematadas com meia volta mordida.', acceptedKeywords: ['voltas em oito', 'oito'],
    explanation: 'As voltas em oito no cunho prendem sem encavalar e desfazem-se facilmente sob carga.'
  }),
  makeQ({
    id: 't5-q24', testNumber: 5, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'Uma embarcação de recreio do Tipo 4 (águas abrigadas) pode navegar até:',
    options: [
      'Até 25 milhas da costa e 60 milhas do porto de abrigo.',
      'Até 3 milhas da costa e 6 milhas do porto de abrigo.',
      'Até 5 milhas da costa e 10 milhas do porto de abrigo.',
      'Até 6 milhas da costa e 20 milhas do porto de abrigo.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Até 3 milhas da costa e 6 milhas do porto de abrigo.', acceptedKeywords: ['3 milhas', '6 milhas'],
    explanation: 'Regulamento da Náutica de Recreio: ER Tipo 4 está restrita a águas abrigadas, 3 milhas da costa e 6 milhas de abrigo.'
  }),
  makeQ({
    id: 't5-q25', testNumber: 5, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'Quando é que uma embarcação de recreio deve possuir um sinal luminoso automático acoplado à boia de salvação individual?',
    expectedAnswer: 'Sempre que navegue de noite (em navegação noturna).', acceptedKeywords: ['noite', 'navegação noturna'],
    explanation: 'O dispositivo luminoso de acendimento automático na boia é obrigatório para localização noturna do náufrago.'
  }),
  makeQ({
    id: 't5-q26', testNumber: 5, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'Que instrumento de navegação usa para determinar a profundidade real da água por baixo da quilha em qualquer momento?',
    options: ['Prumo de mão ou sonda acústica (ecobatímetro).', 'Odómetro.', 'Anemómetro.', 'Agulha magnética.'],
    correctOptionIndex: 0, expectedAnswer: 'Prumo de mão ou sonda acústica (ecobatímetro).', acceptedKeywords: ['sonda', 'ecobatímetro', 'prumo'],
    explanation: 'A sonda náutica (eletrónica ou prumo de mão) mede a coluna de água abaixo do transdutor ou casco.'
  }),
  makeQ({
    id: 't5-q27', testNumber: 5, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'O plano horizontal a que são referidas as Sondas Reduzidas indicado na carta de navegação designa-se por:',
    expectedAnswer: 'Zero Hidrográfico (ZH).', acceptedKeywords: ['zero hidrográfico', 'zh'],
    explanation: 'Plano de referência batimétrico das cartas hidrográficas nacionais.'
  }),
  makeQ({
    id: 't5-q28', testNumber: 5, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'open-answer', points: 0.5,
    statement: 'Indique duas causas prováveis para o sobreaquecimento súbito de um motor marítimo com arrefecimento a água:',
    expectedAnswer: 'Tomada de água salgada obstruída (plásticos/algas) e falha/desgaste do impulsor da bomba de água (rotor de borracha/impeller).',
    acceptedKeywords: ['tomada de água', 'bomba de água', 'impulsor', 'rotor'],
    explanation: 'A interrupção do caudal de água fria provoca rápida subida da temperatura do motor.'
  }),
  makeQ({
    id: 't5-q29', testNumber: 5, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'open-answer', points: 0.6,
    statement: 'A que se destinam as marcas cardinais do sistema de balizagem IALA?',
    expectedAnswer: 'Destinam-se a indicar ao navegador o quadrante (Norte, Sul, Este ou Oeste) onde se encontram as águas mais profundas e seguras para navegar em relação a um perigo.',
    acceptedKeywords: ['águas navegáveis', 'rumo seguro', 'quadrante', 'perigo'],
    explanation: 'Cada marca cardinal (N, S, E, W) indica o bordo seguro por onde se deve passar.'
  }),
  makeQ({
    id: 't5-q30', testNumber: 5, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'Em que camada da atmosfera terrestre ocorrem praticamente todos os fenómenos meteorológicos (nuvens, chuva, vento)?',
    options: ['Estratosfera.', 'Troposfera.', 'Termosfera.', 'Mesosfera.'],
    correctOptionIndex: 1, expectedAnswer: 'Troposfera.', acceptedKeywords: ['troposfera'],
    explanation: 'A troposfera é a camada inferior da atmosfera (até ~12 km) onde ocorrem as variações meteorológicas.'
  })
];
exportTestFile(5, t5);

console.log("Exported Test 4 and Test 5 successfully!");
