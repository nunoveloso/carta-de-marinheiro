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
// TEST 10
// ==========================================
const t10 = [
  makeQ({
    id: 't10-q01', testNumber: 10, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de propulsão mecânica a navegar deve desviar-se de:',
    options: [
      'Um navio com capacidade de manobra reduzida.',
      'Um navio na faina da pesca.',
      'Um navio desgovernado.',
      'Todas as alíneas anteriores estão certas.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Todas as alíneas anteriores estão certas.', acceptedKeywords: ['todas', 'certas'],
    explanation: 'Regra 18 do RIEAM.'
  }),
  makeQ({
    id: 't10-q02', testNumber: 10, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque está com capacidade de manobra reduzida.', acceptedKeywords: ['capacidade de manobra reduzida', 'manobra reduzida'],
    explanation: 'Regra 18 do RIEAM.', diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't10-q03', testNumber: 10, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio condicionado pelo seu calado deve apresentar durante o dia:',
    options: [
      'Um balão cilíndrico de cor preta.',
      'Três balões esféricos pretos.',
      'Dois balões bicónicos.',
      'Um balão cónico.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Um balão cilíndrico de cor preta.', acceptedKeywords: ['cilíndrico', 'cilindro preto'],
    explanation: 'Regra 28 do RIEAM: Marca cilíndrica preta.'
  }),
  makeQ({
    id: 't10-q04', testNumber: 10, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Desenhe na figura ao lado os balões correspondentes a um navio com capacidade de manobra reduzida:',
    expectedAnswer: 'Três marcas verticais: esfera preta superior, losango (bicónico) preto no meio e esfera preta inferior.', acceptedKeywords: ['esfera', 'losango', 'bicónico'],
    explanation: 'Regra 27(b) do RIEAM.', diagram: { type: 'day-shapes', variant: 'mast-unmarked' }
  }),
  makeQ({
    id: 't10-q05', testNumber: 10, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'A embarcação A pretende atracar por Bombordo no cais. Para isso tem que guinar para Estibordo. Que sinal sonoro tem que emitir?',
    options: ['Um som curto.', 'Dois sons curtos.', 'Três sons curtos.', 'Dois sons longos.'],
    correctOptionIndex: 0, expectedAnswer: 'Um som curto.', acceptedKeywords: ['um som curto', 'um curto'],
    explanation: 'Regra 34(a) do RIEAM: "Estou a guinar para estibordo".'
  }),
  makeQ({
    id: 't10-q06', testNumber: 10, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação de propulsão mecânica com as máquinas a trabalhar a ré deve sinalizar a manobra emitindo:',
    options: ['Um som curto.', 'Dois sons longos.', 'Um som longo.', 'Três sons curtos.'],
    correctOptionIndex: 3, expectedAnswer: 'Três sons curtos.', acceptedKeywords: ['três sons curtos', 'três curtos'],
    explanation: 'Regra 34(a) do RIEAM.'
  }),
  makeQ({
    id: 't10-q07', testNumber: 10, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Indique o que deve fazer no caso de um tripulante cair ao mar:',
    expectedAnswer: 'Gritar "Homem ao mar!", lançar imediatamente boia salva-vidas com retenida/luz, guinar o leme para o bordo da queda para desviar o hélice e manter vigilância visual contínua sobre a vítima.',
    acceptedKeywords: ['homem ao mar', 'boia', 'bordo da queda', 'desviar o hélice', 'vigilância'],
    explanation: 'Protocolo de salvamento imediato.'
  }),
  makeQ({
    id: 't10-q08', testNumber: 10, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'multiple-choice', points: 1.0,
    statement: 'Qual o sinal pirotécnico que produz um fumo denso cor-de-laranja altamente visível durante o dia?',
    options: ['Sinal fumígeno flutuante.', 'Facho de mão de luz vermelha.', 'Foguete com paraquedas.', 'Lanterna estroboscópica.'],
    correctOptionIndex: 0, expectedAnswer: 'Sinal fumígeno flutuante.', acceptedKeywords: ['sinal fumígeno', 'fumígeno'],
    explanation: 'Equipamento pirotécnico de socorro diurno.'
  }),
  makeQ({
    id: 't10-q09', testNumber: 10, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'multiple-choice', points: 1.0,
    statement: 'Qual o extintor que devemos usar para combater um incêndio com origem elétrica em equipamentos sob tensão?',
    options: ['Extintor de água pressurizada.', 'Extintor de dióxido de carbono (CO2) ou pó químico seco.', 'Balde de água salgada.', 'Espuma química simples.'],
    correctOptionIndex: 1, expectedAnswer: 'Extintor de dióxido de carbono (CO2) ou pó químico seco.', acceptedKeywords: ['co2', 'pó químico'],
    explanation: 'Agentes não condutores de eletricidade.'
  }),
  makeQ({
    id: 't10-q10', testNumber: 10, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Numa hemorragia externa deve-se:',
    options: [
      'Fazer o tamponamento com uma compressa, envolvendo-a com uma ligadura apertada.',
      'Lavar abundantemente com álcool puro.',
      'Aplicar garrote apertado no pescoço.',
      'Deixar sangrar para purificar a ferida.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Fazer o tamponamento com uma compressa, envolvendo-a com uma ligadura apertada.', acceptedKeywords: ['tamponamento', 'compressa'],
    explanation: 'Controlo primário de hemorragias.'
  }),
  makeQ({
    id: 't10-q11', testNumber: 10, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Num adulto saudável considera-se como normal uma frequência respiratória de:',
    options: ['30 a 35 por minuto.', '60 a 65 por minuto.', '16 a 18 por minuto.', '08 a 10 por minuto.'],
    correctOptionIndex: 2, expectedAnswer: '16 a 18 por minuto.', acceptedKeywords: ['16 a 18'],
    explanation: 'Constantes vitais normais.'
  }),
  makeQ({
    id: 't10-q12', testNumber: 10, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A corrente constituída por elos de ferro ou aço que prende a âncora à embarcação chama-se:',
    expectedAnswer: 'Amarra.', acceptedKeywords: ['amarra'],
    explanation: 'Linha de fundeio de elos metálicos.'
  }),
  makeQ({
    id: 't10-q13', testNumber: 10, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A manobra de deixar correr a amarra para que o ferro chegue ao fundo dá-se o nome de:',
    expectedAnswer: 'Largar amarra (ou filar amarra).', acceptedKeywords: ['largar amarra', 'filar amarra', 'filar', 'largar'],
    explanation: 'Filar a amarra.'
  }),
  makeQ({
    id: 't10-q14', testNumber: 10, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A manobra de recolha da amarra e levantamento da âncora do fundo dá-se o nome de:',
    expectedAnswer: 'Suspender (ou virar amarra / alar).', acceptedKeywords: ['suspender', 'virar amarra'],
    explanation: 'Suspender ferro.'
  }),
  makeQ({
    id: 't10-q15', testNumber: 10, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Partindo do repouso, numa embarcação com hélice de passo direito em marcha à vante e leme a meio:',
    options: [
      'A popa tende a descair para estibordo e a proa guina ligeiramente para bombordo.',
      'A popa tende a descair para bombordo e a proa guina para estibordo.',
      'O barco avança rigorosamente a direito sem desvio.',
      'O barco anda para trás.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'A popa tende a descair para estibordo e a proa guina ligeiramente para bombordo.', acceptedKeywords: ['popa para estibordo', 'proa para bombordo'],
    explanation: 'Efeito de rotação das pás do hélice de passo direito.'
  }),
  makeQ({
    id: 't10-q16', testNumber: 10, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'A força exercida sobre a porta do leme é tanto maior:',
    options: ['Quanto maior for a velocidade.', 'Quanto menor for a velocidade.', 'Quanto menor for a área do leme.', 'Quanto menor for o calado.'],
    correctOptionIndex: 0, expectedAnswer: 'Quanto maior for a velocidade.', acceptedKeywords: ['maior for a velocidade', 'velocidade'],
    explanation: 'Efeito hidrodinâmico do leme.'
  }),
  makeQ({
    id: 't10-q17', testNumber: 10, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Ao reduzir a velocidade da embarcação em marcha à vante, o efeito lateral do hélice:',
    options: ['Não tem qualquer efeito.', 'Começa a sentir-se menos.', 'Começa a sentir-se mais.', 'Anula o governo.'],
    correctOptionIndex: 2, expectedAnswer: 'Começa a sentir-se mais.', acceptedKeywords: ['sentir-se mais', 'mais'],
    explanation: 'Prevalência do binário do hélice a baixas velocidades.'
  }),
  makeQ({
    id: 't10-q18', testNumber: 10, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'Ao cabo fixo num arganéu de proa que serve para amarrar a embarcação ao cais dá-se o nome de:',
    options: ['Regeira.', 'Boça.', 'Cabo de adriça.', 'Defensa.'],
    correctOptionIndex: 1, expectedAnswer: 'Boça.', acceptedKeywords: ['boça'],
    explanation: 'Cabo de amarração fixa da proa.'
  }),
  makeQ({
    id: 't10-q19', testNumber: 10, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'O dispositivo mecânico dotado de pás que assegura a impulsão da embarcação através de movimento rotativo chama-se:',
    expectedAnswer: 'Hélice.', acceptedKeywords: ['hélice', 'helice'],
    explanation: 'Propulsor.'
  }),
  makeQ({
    id: 't10-q20', testNumber: 10, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'O calado de uma embarcação define-se como:',
    options: [
      'A altura total desde o mastro até ao fundo do mar.',
      'A distância na perpendicular entre o plano da linha de água e o ponto mais baixo da quilha.',
      'O comprimento entre a proa e a popa.',
      'A largura máxima a meio-navio.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'A distância na perpendicular entre o plano da linha de água e o ponto mais baixo da quilha.', acceptedKeywords: ['distância na perpendicular', 'linha de água', 'quilha'],
    explanation: 'Calado imerso da embarcação.'
  }),
  makeQ({
    id: 't10-q21', testNumber: 10, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Pretende unir rapidamente dois cabos de bitolas diferentes. Que nó deve utilizar?',
    expectedAnswer: 'Nó de escota.', acceptedKeywords: ['nó de escota', 'escota'],
    explanation: 'Nó específico para bitolas diferentes.'
  }),
  makeQ({
    id: 't10-q22', testNumber: 10, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'A ação de enrolar um cabo em voltas regulares sucessivas de modo a ficar pronto a usar chama-se:',
    options: ['Alar um cabo.', 'Colher um cabo (em aduchas).', 'Amarrar um cabo.', 'Aguentar um cabo.'],
    correctOptionIndex: 1, expectedAnswer: 'Colher um cabo (em aduchas).', acceptedKeywords: ['colher', 'aduchas'],
    explanation: 'Arrumação de cabos em aduchas.'
  }),
  makeQ({
    id: 't10-q23', testNumber: 10, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Para fixar um cabo num cunho utilizam-se:',
    options: ['Voltas redondas e cruzadas em oito.', 'Nó de pescador.', 'Apenas voltas falcas.', 'Laço simples.'],
    correctOptionIndex: 0, expectedAnswer: 'Voltas redondas e cruzadas em oito.', acceptedKeywords: ['voltas redondas e cruzadas', 'oito'],
    explanation: 'Amarração em cunho.'
  }),
  makeQ({
    id: 't10-q24', testNumber: 10, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'A carta de navegador de recreio que habilita o titular ao comando de embarcações de recreio em navegação sem limite de área é:',
    options: ['Patrão de Alto Mar.', 'Patrão de Costa.', 'Patrão Local.', 'Marinheiro.'],
    correctOptionIndex: 0, expectedAnswer: 'Patrão de Alto Mar.', acceptedKeywords: ['patrão de alto mar'],
    explanation: 'Grau máximo da náutica de recreio.'
  }),
  makeQ({
    id: 't10-q25', testNumber: 10, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'A carta de navegador de recreio que habilita o titular a navegar até 25 milhas da linha de costa é:',
    options: ['Patrão de Alto Mar.', 'Patrão de Costa.', 'Patrão Local.', 'Marinheiro.'],
    correctOptionIndex: 1, expectedAnswer: 'Patrão de Costa.', acceptedKeywords: ['patrão de costa'],
    explanation: 'Carta de Patrão de Costa.'
  }),
  makeQ({
    id: 't10-q26', testNumber: 10, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'O plano horizontal a que são referidas as sondas cartográficas indicadas na carta náutica chama-se:',
    options: ['Sonda Reduzida.', 'Altura da maré.', 'Zero Hidrográfico.', 'Nível médio do mar.'],
    correctOptionIndex: 2, expectedAnswer: 'Zero Hidrográfico.', acceptedKeywords: ['zero hidrográfico', 'zh'],
    explanation: 'Zero Hidrográfico.'
  }),
  makeQ({
    id: 't10-q27', testNumber: 10, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'Quando ocorrem as Marés Mortas em relação às fases da Lua?',
    expectedAnswer: 'Nas fases de Quarto Crescente e Quarto Minguante.', acceptedKeywords: ['quarto crescente', 'quarto minguante', 'crescente', 'minguante'],
    explanation: 'Quadratura astronómica.'
  }),
  makeQ({
    id: 't10-q28', testNumber: 10, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'open-answer', points: 0.5,
    statement: 'Complete a frase: O circuito de refrigeração de um motor fora de borda após funcionamento em água salgada deve ser lavado/adoçado com:',
    expectedAnswer: 'Água doce limpa.', acceptedKeywords: ['água doce', 'doce'],
    explanation: 'Adoçamento do motor marítimo.'
  }),
  makeQ({
    id: 't10-q29', testNumber: 10, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'multiple-choice', points: 0.6,
    statement: 'As marcas cardinais em que o cone superior aponta para cima e o inferior para baixo (opostos pelas bases) indicam que o rumo seguro e águas profundas ficam a:',
    options: ['Norte.', 'Sul.', 'Este.', 'Oeste.'],
    correctOptionIndex: 2, expectedAnswer: 'Este.', acceptedKeywords: ['este', 'leste'],
    explanation: 'Marca cardinal Este.'
  }),
  makeQ({
    id: 't10-q30', testNumber: 10, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'O NAVTEX é um equipamento de radiocomunicações marítimas que permite receber a bordo:',
    options: ['Cartas de tempo e previsões meteorológicas.', 'Informação de segurança marítima e avisos de barras.', 'As duas alíneas anteriores estão corretas.', 'Chamadas privadas de voz.'],
    correctOptionIndex: 2, expectedAnswer: 'As duas alíneas anteriores estão corretas.', acceptedKeywords: ['duas', 'corretas'],
    explanation: 'Sistema internacional MSI NAVTEX.'
  })
];
exportTestFile(10, t10);

// ==========================================
// TEST 11
// ==========================================
const t11 = [
  makeQ({
    id: 't11-q01', testNumber: 11, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Como é que um navio desgovernado sinaliza essa situação aos navios na vizinhança durante o dia?',
    options: [
      'Colocando três balões esféricos no mastro.',
      'Colocando um balão cilíndrico no mastro.',
      'Colocando três balões no mastro sendo o superior e inferior esféricos e o do meio bicónico.',
      'Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.', acceptedKeywords: ['dois balões esféricos', 'dois balões pretos'],
    explanation: 'Regra 27(a) do RIEAM.'
  }),
  makeQ({
    id: 't11-q02', testNumber: 11, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque está com capacidade de manobra reduzida.', acceptedKeywords: ['capacidade de manobra reduzida', 'manobra reduzida'],
    explanation: 'Regra 18 do RIEAM.', diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't11-q03', testNumber: 11, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio encalhado exibe durante o dia:',
    options: ['Três balões esféricos pretos dispostos verticalmente.', 'Dois balões bicónicos.', 'Um cilindro preto.', 'Três bicónicos verticais.'],
    correctOptionIndex: 0, expectedAnswer: 'Três balões esféricos pretos dispostos verticalmente.', acceptedKeywords: ['três balões esféricos', 'três esferas'],
    explanation: 'Regra 30(d) do RIEAM.'
  }),
  makeQ({
    id: 't11-q04', testNumber: 11, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Desenhe na figura ao lado os balões correspondentes a um navio com capacidade de manobra reduzida:',
    expectedAnswer: 'Três marcas dispostas verticalmente: esfera preta superior, bicónico (losango) preto central e esfera preta inferior.', acceptedKeywords: ['esfera', 'bicónico', 'losango'],
    explanation: 'Regra 27(b) do RIEAM.', diagram: { type: 'day-shapes', variant: 'mast-unmarked' }
  }),
  makeQ({
    id: 't11-q05', testNumber: 11, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'A embarcação A pretende atracar por Estibordo no cais. Para isso tem que guinar para Bombordo. Que sinal sonoro tem que emitir?',
    options: ['Um som curto.', 'Dois sons curtos.', 'Três sons curtos.', 'Dois sons longos.'],
    correctOptionIndex: 1, expectedAnswer: 'Dois sons curtos.', acceptedKeywords: ['dois sons curtos', 'dois curtos'],
    explanation: 'Regra 34(a) do RIEAM: Dois sons curtos significam: "Estou a guinar para bombordo".'
  }),
  makeQ({
    id: 't11-q06', testNumber: 11, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação de propulsão mecânica com as máquinas a trabalhar a ré deve emitir:',
    options: ['Um som curto.', 'Dois sons curtos.', 'Três sons curtos.', 'Dois sons longos.'],
    correctOptionIndex: 2, expectedAnswer: 'Três sons curtos.', acceptedKeywords: ['três sons curtos', 'três curtos'],
    explanation: 'Regra 34(a) do RIEAM.'
  }),
  makeQ({
    id: 't11-q07', testNumber: 11, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Em caso de homem ao mar, quais as primeiras ações imediatas a tomar pelo timoneiro?',
    expectedAnswer: 'Gritar "Homem ao mar!", meter o leme para o bordo da queda para afastar a popa/hélice do náufrago, lançar a boia salva-vidas e reduzir a velocidade.',
    acceptedKeywords: ['homem ao mar', 'leme para o bordo da queda', 'boia salva-vidas', 'afastar o hélice'],
    explanation: 'Manobra de emergência de homem ao mar.'
  }),
  makeQ({
    id: 't11-q08', testNumber: 11, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'multiple-choice', points: 1.0,
    statement: 'Os fachos de mão de luz vermelha têm como objetivo:',
    options: ['Assinalar socorro imediato à noite ou em visibilidade reduzida com luz vermelha intensa.', 'Iluminar o convés.', 'Pescar chocos.', 'Aquecer as mãos.'],
    correctOptionIndex: 0, expectedAnswer: 'Assinalar socorro imediato à noite ou em visibilidade reduzida com luz vermelha intensa.', acceptedKeywords: ['socorro imediato', 'luz vermelha'],
    explanation: 'Sinalização pirotécnica noturna regulamentar.'
  }),
  makeQ({
    id: 't11-q09', testNumber: 11, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'multiple-choice', points: 1.0,
    statement: 'Num incêndio com combustível líquido em espaço confinado deve-se utilizar:',
    options: ['Extintor de pó químico ou CO2.', 'Mangueira com jato de água direto.', 'Balde com água salgada.', 'Abrir todas as portas.'],
    correctOptionIndex: 0, expectedAnswer: 'Extintor de pó químico ou CO2.', acceptedKeywords: ['pó químico', 'co2'],
    explanation: 'Extinção por abafamento e inibição química.'
  }),
  makeQ({
    id: 't11-q10', testNumber: 11, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'A um sinistrado com suspeita de hemorragia interna abdominal deve-se:',
    expectedAnswer: 'Manter a vítima em repouso absoluto na posição deitada com pernas fletidas, agasalhada, controlar os sinais vitais, chamar socorro urgente e NÃO dar de beber nem comer.',
    acceptedKeywords: ['repouso', 'não dar de beber', 'agasalhada', 'socorro urgente'],
    explanation: 'Primeiros socorros em hemorragias internas.'
  }),
  makeQ({
    id: 't11-q11', testNumber: 11, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Num adulto saudável considera-se como normal uma frequência respiratória de:',
    options: ['30 a 35 por minuto.', '60 a 65 por minuto.', '16 a 18 por minuto.', '08 a 10 por minuto.'],
    correctOptionIndex: 2, expectedAnswer: '16 a 18 por minuto.', acceptedKeywords: ['16 a 18'],
    explanation: 'Frequência respiratória normal.'
  }),
  makeQ({
    id: 't11-q12', testNumber: 11, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A corrente constituída por elos em ferro ou aço talingada à âncora designa-se por:',
    expectedAnswer: 'Amarra.', acceptedKeywords: ['amarra'],
    explanation: 'Linha de fundeio.'
  }),
  makeQ({
    id: 't11-q13', testNumber: 11, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A manobra de "içar o ferro" (arrancar a âncora do fundo e recolhê-la) designa-se por:',
    expectedAnswer: 'Suspender (ou virar amarra).', acceptedKeywords: ['suspender', 'virar amarra'],
    explanation: 'Suspender.'
  }),
  makeQ({
    id: 't11-q14', testNumber: 11, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'No ferro de Almirantado, qual o nome da barra transversal móvel que fica perpendicular ao plano dos braços?',
    expectedAnswer: 'Cepo.', acceptedKeywords: ['cepo'],
    explanation: 'Cepo da âncora.'
  }),
  makeQ({
    id: 't11-q15', testNumber: 11, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Partindo do repouso com vento forte de través, numa embarcação de recreio com motor em marcha à vante e leme a meio:',
    options: [
      'A embarcação sofre deriva significativa para sotavento.',
      'A embarcação avança a direito sem desvio.',
      'A embarcação sobe o vento para barlavento.',
      'O leme deixa de funcionar para sempre.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'A embarcação sofre deriva significativa para sotavento.', acceptedKeywords: ['deriva para sotavento', 'deriva'],
    explanation: 'O vento lateral arrasta o costado antes de haver escoamento estabilizador no leme.'
  }),
  makeQ({
    id: 't11-q16', testNumber: 11, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'A força exercida sobre a porta do leme é tanto maior:',
    options: ['Quanto maior for a velocidade.', 'Quanto menor for a velocidade.', 'Quanto menor for a área do leme.', 'Quanto menor for o calado.'],
    correctOptionIndex: 0, expectedAnswer: 'Quanto maior for a velocidade.', acceptedKeywords: ['maior for a velocidade', 'velocidade'],
    explanation: 'Força hidrodinâmica no leme.'
  }),
  makeQ({
    id: 't11-q17', testNumber: 11, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Ao reduzir a velocidade da embarcação em marcha à vante, o efeito lateral de rotação do hélice:',
    options: ['Não tem qualquer efeito.', 'Começa a sentir-se menos.', 'Começa a sentir-se mais.', 'Inverte o sentido de marcha.'],
    correctOptionIndex: 2, expectedAnswer: 'Começa a sentir-se mais.', acceptedKeywords: ['sentir-se mais', 'mais'],
    explanation: 'Efeito lateral do hélice a baixa velocidade.'
  }),
  makeQ({
    id: 't11-q18', testNumber: 11, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'Ao cabo fixo num arganéu de proa que serve para amarrar a embarcação ao cais dá-se o nome de:',
    options: ['Regeira.', 'Boça.', 'Cabo de adriça.', 'Defensa.'],
    correctOptionIndex: 1, expectedAnswer: 'Boça.', acceptedKeywords: ['boça'],
    explanation: 'Boça de proa.'
  }),
  makeQ({
    id: 't11-q19', testNumber: 11, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'O dispositivo que possibilita o avanço ou recuo de uma embarcação através do seu movimento circular chama-se:',
    expectedAnswer: 'Hélice.', acceptedKeywords: ['hélice', 'helice'],
    explanation: 'Hélice propulsor.'
  }),
  makeQ({
    id: 't11-q20', testNumber: 11, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'A peça estrutural longitudinal fixada sobre a quilha pelo lado interior das cavernas designa-se por:',
    options: ['Sobrequilha.', 'Trincaniz.', 'Robalete.', 'Borda falsa.'],
    correctOptionIndex: 0, expectedAnswer: 'Sobrequilha.', acceptedKeywords: ['sobrequilha'],
    explanation: 'A sobrequilha reforça internamente a união das cavernas com a quilha.'
  }),
  makeQ({
    id: 't11-q21', testNumber: 11, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Identifique o nó que forma uma laçada fixa que não aperta sob esforço e dê um exemplo da sua aplicação:',
    expectedAnswer: 'Lais de guia. Aplica-se na encapeladura de espias em cabeços do cais ou em cabos de salvamento.',
    acceptedKeywords: ['lais de guia', 'cabeço', 'encapeladura', 'laçada'],
    explanation: 'Lais de guia.'
  }),
  makeQ({
    id: 't11-q22', testNumber: 11, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'O que é a boca de uma embarcação?',
    options: [
      'Uma elevação a meio do convés.',
      'A largura máxima da embarcação medida entre os bordos exteriores.',
      'Um cabo de proa.',
      'O orifício de esgoto do fundo do casco.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'A largura máxima da embarcação medida entre os bordos exteriores.', acceptedKeywords: ['largura máxima', 'largura'],
    explanation: 'Dimensão principal: boca máxima.'
  }),
  makeQ({
    id: 't11-q23', testNumber: 11, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'A ação de enrolar um cabo em voltas largas e sucessivas de modo a ficar pronto a usar designa-se:',
    options: ['Alar um cabo.', 'Colher um cabo (em aduchas).', 'Arrumar um cabo.', 'Aguentar um cabo.'],
    correctOptionIndex: 1, expectedAnswer: 'Colher um cabo (em aduchas).', acceptedKeywords: ['colher', 'aduchas'],
    explanation: 'Colher cabos em aduchas.'
  }),
  makeQ({
    id: 't11-q24', testNumber: 11, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'A carta de navegador de recreio que habilita o titular ao comando de embarcação de recreio em navegação sem limite de área é:',
    options: ['Patrão de Alto Mar.', 'Patrão de Costa.', 'Patrão Local.', 'Marinheiro.'],
    correctOptionIndex: 0, expectedAnswer: 'Patrão de Alto Mar.', acceptedKeywords: ['patrão de alto mar'],
    explanation: 'Patrão de Alto Mar.'
  }),
  makeQ({
    id: 't11-q25', testNumber: 11, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'As vistorias periódicas de manutenção a embarcações de recreio destinam-se a:',
    expectedAnswer: 'Verificar as condições de navegabilidade, estanquidade do casco, funcionamento dos motores e validade dos equipamentos de segurança e salvação a bordo.',
    acceptedKeywords: ['navegabilidade', 'segurança', 'estanquidade', 'equipamentos de segurança'],
    explanation: 'Fiscalização técnica de segurança marítima.'
  }),
  makeQ({
    id: 't11-q26', testNumber: 11, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'Supondo que a sua embarcação encalhou às 12 horas e a maré tinha começado a vazar às 10 horas, a que horas deve iniciar as manobras de desencalhe?',
    options: [
      'Perto da próxima preia-mar (cerca das 22h-23h, quando a maré voltar a encher).',
      'Imediatamente na baixamar.',
      'À meia-noite sem luz.',
      'Nunca, a embarcação está perdida.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Perto da próxima preia-mar (cerca das 22h-23h, quando a maré voltar a encher).', acceptedKeywords: ['próxima preia-mar', 'maré voltar a encher', 'encher'],
    explanation: 'Desencalha-se com maré cheia e nível de água máximo.'
  }),
  makeQ({
    id: 't11-q27', testNumber: 11, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'A altura entre o Zero Hidrográfico e a superfície da água dá-se o nome de:',
    options: ['Sonda Reduzida.', 'Altura da maré.', 'Sonda à Hora.', 'Nível médio.'],
    correctOptionIndex: 1, expectedAnswer: 'Altura da maré.', acceptedKeywords: ['altura da maré'],
    explanation: 'Hm.'
  }),
  makeQ({
    id: 't11-q28', testNumber: 11, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'multiple-choice', points: 0.5,
    statement: 'Falta súbita de potência de um motor fora de borda a gasolina pode ser provocada por:',
    options: ['Filtro de combustível parcialmente obstruído ou vela suja/defeituosa.', 'Bateria descarregada.', 'Nível de óleo excessivo no depósito de água doce.', 'Pintura exterior nova.'],
    correctOptionIndex: 0, expectedAnswer: 'Filtro de combustível parcialmente obstruído ou vela suja/defeituosa.', acceptedKeywords: ['filtro de combustível', 'combustível'],
    explanation: 'Problema na alimentação de combustível ou ignição.'
  }),
  makeQ({
    id: 't11-q29', testNumber: 11, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'open-answer', points: 0.6,
    statement: 'As marcas cardinais do sistema IALA caracterizam-se por que cores e alvos?',
    expectedAnswer: 'Cores: Combinações de faixas pretas e amarelas horizontais; Alvos: Dois cones pretos (Norte: ambos para cima; Sul: ambos para baixo; Este: opostos pelas bases; Oeste: opostos pelos vértices).',
    acceptedKeywords: ['preto e amarelo', 'cones pretos', 'faixas pretas e amarelas'],
    explanation: 'Sistema de balizagem cardinal IALA Região A.'
  }),
  makeQ({
    id: 't11-q30', testNumber: 11, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'O NAVTEX é um sistema de radiodifusão e receção automática de informação de segurança marítima (MSI), que inclui:',
    options: ['Avisos aos navegantes.', 'Boletins meteorológicos.', 'Alertas de busca e salvamento (SAR).', 'Todas as alíneas anteriores estão corretas.'],
    correctOptionIndex: 3, expectedAnswer: 'Todas as alíneas anteriores estão corretas.', acceptedKeywords: ['todas', 'corretas'],
    explanation: 'Serviço global NAVTEX.'
  })
];
exportTestFile(11, t11);

// ==========================================
// TEST 12
// ==========================================
const t12 = [
  makeQ({
    id: 't12-q01', testNumber: 12, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Como é que um navio desgovernado sinaliza essa situação aos outros navios durante o dia?',
    options: [
      'Colocando três balões esféricos no mastro.',
      'Colocando um balão cilíndrico no mastro.',
      'Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.',
      'Colocando um balão bicónico preto.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Colocando dois balões esféricos pretos dispostos verticalmente onde melhor possam ser vistos.', acceptedKeywords: ['dois balões esféricos', 'duas esferas pretas'],
    explanation: 'Regra 27(a) do RIEAM.'
  }),
  makeQ({
    id: 't12-q02', testNumber: 12, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque está a navegar à vela.', acceptedKeywords: ['vela', 'à vela'],
    explanation: 'Regra 18 do RIEAM.', diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't12-q03', testNumber: 12, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio com capacidade de manobra reduzida deve apresentar de dia:',
    options: [
      'Dois balões bicónicos pretos.',
      'Três marcas dispostas verticalmente: a superior e inferior esféricas e a do meio bicónica (losango preto).',
      'Três esferas pretas verticais.',
      'Dois cones com os vértices para cima.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'Três marcas dispostas verticalmente: a superior e inferior esféricas e a do meio bicónica (losango preto).', acceptedKeywords: ['esféricas', 'bicónica', 'losango'],
    explanation: 'Regra 27(b) do RIEAM.'
  }),
  makeQ({
    id: 't12-q04', testNumber: 12, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Avista um navio pelo seu bombordo (BB) com balão de navio condicionado pelo calado e verifica estar em rota de colisão. Tem que manobrar? Porquê?',
    expectedAnswer: 'Sim, tem que manobrar para se manter desimpedido do caminho do navio condicionado pelo seu calado, pois este não pode desviar-se dos limites seguros do canal.',
    acceptedKeywords: ['sim', 'condicionado pelo seu calado', 'manobrar'],
    explanation: 'Regra 18(d) do RIEAM.'
  }),
  makeQ({
    id: 't12-q05', testNumber: 12, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação de propulsão mecânica com as máquinas a trabalhar a ré deve sinalizar a manobra emitindo:',
    options: ['Um som curto.', 'Dois sons longos.', 'Um som longo.', 'Três sons curtos.'],
    correctOptionIndex: 3, expectedAnswer: 'Três sons curtos.', acceptedKeywords: ['três sons curtos', 'três curtos'],
    explanation: 'Regra 34(a) do RIEAM.'
  }),
  makeQ({
    id: 't12-q06', testNumber: 12, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'A embarcação A pretende atracar por Estibordo no cais. Para isso tem que guinar para Bombordo. Que sinal sonoro tem que emitir?',
    options: ['Um som curto.', 'Dois sons curtos.', 'Três sons curtos.', 'Dois sons longos.'],
    correctOptionIndex: 1, expectedAnswer: 'Dois sons curtos.', acceptedKeywords: ['dois sons curtos', 'dois curtos'],
    explanation: 'Regra 34(a) do RIEAM: "Estou a guinar para bombordo".'
  }),
  makeQ({
    id: 't12-q07', testNumber: 12, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Diga o nome dos 3 principais sinais pirotécnicos de socorro homologados regulamentares:',
    expectedAnswer: '1. Foguetes com paraquedas de luz vermelha; 2. Fachos de mão de luz vermelha; 3. Sinal fumígeno flutuante cor-de-laranja.',
    acceptedKeywords: ['foguete com paraquedas', 'facho de mão', 'sinal fumígeno'],
    explanation: 'Pirotecnia padrão de bordo.'
  }),
  makeQ({
    id: 't12-q08', testNumber: 12, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Em caso de mau tempo com mar bravo, como deve navegar a embarcação em relação à vaga para evitar adornar ou capotar?',
    expectedAnswer: 'Navegar com a vaga pela amura (cerca de 30° a 45° com a vaga), reduzindo a velocidade, ou correr com o tempo pela alheta mantendo o governo firme.',
    acceptedKeywords: ['vaga pela amura', 'amura', 'reduzir a velocidade', 'alheta'],
    explanation: 'Nunca se deve receber a vaga pelo través pois provoca adornamento crítico e viragem da embarcação.'
  }),
  makeQ({
    id: 't12-q09', testNumber: 12, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'multiple-choice', points: 1.0,
    statement: 'Qual o método de extinção que devemos usar num incêndio produzido por combustíveis líquidos (gasolina/gasóleo)?',
    options: [
      'Abafamento com pó químico seco ou espuma mecânica (cortando o oxigénio).',
      'Inundação com jato potente de água salgada.',
      'Aumentar o fluxo de ventilação.',
      'Esperar que o combustível queime na totalidade.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Abafamento com pó químico seco ou espuma mecânica (cortando o oxigénio).', acceptedKeywords: ['abafamento', 'pó químico', 'espuma'],
    explanation: 'Extinção de fogos de Classe B.'
  }),
  makeQ({
    id: 't12-q10', testNumber: 12, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'Complete a frase com uma das palavras (Respirem / Não respirem): A posição lateral de segurança deve ser utilizada em sinistrados inconscientes que ____ e com batimentos cardíacos.',
    expectedAnswer: 'Respirem.', acceptedKeywords: ['respirem', 'respira'],
    explanation: 'PLS para náufragos e sinistrados inconscientes.'
  }),
  makeQ({
    id: 't12-q11', testNumber: 12, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'A atuação adequada para estancar uma hemorragia externa abundante visível é:',
    expectedAnswer: 'Compressão direta firme sobre a ferida com uma compressa esterilizada (penso compressivo) e elevação do membro acima do coração.',
    acceptedKeywords: ['compressão direta', 'compressa', 'elevação'],
    explanation: 'Hemostase mecânica imediata.'
  }),
  makeQ({
    id: 't12-q12', testNumber: 12, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A manobra de recolha da amarra, isto é, de levantar a âncora do fundo, dá-se o nome de:',
    expectedAnswer: 'Suspender (ou virar amarra / alar o ferro).', acceptedKeywords: ['suspender', 'virar amarra'],
    explanation: 'Suspender âncora.'
  }),
  makeQ({
    id: 't12-q13', testNumber: 12, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A manobra de "içar o ferro" pode-se também designar por:',
    expectedAnswer: 'Suspender.', acceptedKeywords: ['suspender', 'virar amarra'],
    explanation: 'Suspender.'
  }),
  makeQ({
    id: 't12-q14', testNumber: 12, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'Que nome se dá às marcas ou espaçamentos pintados na amarra que nos permitem controlar o comprimento de amarra largada?',
    expectedAnswer: 'Manilhas ou marcas da amarra (quartéis de amarra marcados em metros ou braças).', acceptedKeywords: ['quartéis', 'marcas da amarra', 'manilhas'],
    explanation: 'Marcações métricas de calibração da corrente de fundeio.'
  }),
  makeQ({
    id: 't12-q15', testNumber: 12, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'O principal efeito provocado numa embarcação com corrente de través é:',
    options: ['Abatimento e forte deriva lateral para sotacorrente.', 'Aumento da velocidade de seguimento.', 'Paragem do motor.', 'Nenhum efeito.'],
    correctOptionIndex: 0, expectedAnswer: 'Abatimento e forte deriva lateral para sotacorrente.', acceptedKeywords: ['abatimento', 'deriva lateral'],
    explanation: 'A corrente lateral desloca o casco em bloco.'
  }),
  makeQ({
    id: 't12-q16', testNumber: 12, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Numa embarcação, ao meter leme a um bordo, o seu efeito é tanto maior quanto:',
    options: [
      'Maior for a velocidade da embarcação.',
      'Maior for o ângulo de leme.',
      'Maior for a área da porta do leme.',
      'Todas as alíneas anteriores estão corretas.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Todas as alíneas anteriores estão corretas.', acceptedKeywords: ['todas', 'corretas'],
    explanation: 'A força do leme depende de todos estes fatores combinados.'
  }),
  makeQ({
    id: 't12-q17', testNumber: 12, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Na manobra de largada do cais com corrente pela proa, o último cabo a largar deverá ser:',
    options: ['O lançante de ré.', 'O lançante de proa.', 'A regeira de ré (para afastar a proa do cais com apoio da corrente).', 'Nenhum dos anteriores.'],
    correctOptionIndex: 2, expectedAnswer: 'A regeira de ré (para afastar a proa do cais com apoio da corrente).', acceptedKeywords: ['regeira de ré'],
    explanation: 'Com corrente pela proa, a regeira de ré permite à corrente abrir a proa para o largo.'
  }),
  makeQ({
    id: 't12-q18', testNumber: 12, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'A peça mecânica destinada ao governo da embarcação designa-se por:',
    options: ['Roda de proa.', 'Quilha.', 'Painel de popa.', 'Leme.'],
    correctOptionIndex: 3, expectedAnswer: 'Leme.', acceptedKeywords: ['leme'],
    explanation: 'Órgão de governo.'
  }),
  makeQ({
    id: 't12-q19', testNumber: 12, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'As peças metálicas verticais fixadas ao convés que servem para dar volta aos cabos e espias de amarração designam-se por:',
    expectedAnswer: 'Cabeços (ou cunhos).', acceptedKeywords: ['cabeços', 'cunhos', 'cabeço', 'cunho'],
    explanation: 'Elementos estruturais de amarração no convés.'
  }),
  makeQ({
    id: 't12-q20', testNumber: 12, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'A distância teórica que o hélice percorreria em linha reta durante uma rotação completa caso a água fosse um meio sólido rígido dá-se o nome de:',
    expectedAnswer: 'Passo do hélice.', acceptedKeywords: ['passo', 'passo do hélice'],
    explanation: 'Definição cinemática de passo do hélice.'
  }),
  makeQ({
    id: 't12-q21', testNumber: 12, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Às pequenas torções circulares que um cabo dá sobre si próprio dá-se o nome de:',
    expectedAnswer: 'Cocas.', acceptedKeywords: ['cocas', 'coca'],
    explanation: 'Cocas em cabos.'
  }),
  makeQ({
    id: 't12-q22', testNumber: 12, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Bitola de um cabo marítimo é:',
    options: ['O meio de um cabo.', 'A extremidade de um cabo.', 'O diâmetro (ou espessura transversal) de um cabo.', 'O comprimento total do cabo.'],
    correctOptionIndex: 2, expectedAnswer: 'O diâmetro (ou espessura transversal) de um cabo.', acceptedKeywords: ['diâmetro', 'espessura'],
    explanation: 'A bitola mede o calibre/diâmetro do cabo em milímetros.'
  }),
  makeQ({
    id: 't12-q23', testNumber: 12, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Identifique o nó que serve para unir dois cabos da mesma bitola que não corra nem escorregue:',
    expectedAnswer: 'Nó direito.', acceptedKeywords: ['nó direito', 'direito'],
    explanation: 'Nó direito para cabos do mesmo diâmetro.'
  }),
  makeQ({
    id: 't12-q24', testNumber: 12, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'A carta de navegador de recreio que habilita o titular ao comando de embarcação até 25 milhas da costa é da categoria de:',
    options: ['Patrão de Costa.', 'Patrão de Alto Mar.', 'Marinheiro.', 'Patrão Local.'],
    correctOptionIndex: 0, expectedAnswer: 'Patrão de Costa.', acceptedKeywords: ['patrão de costa'],
    explanation: 'Patrão de Costa.'
  }),
  makeQ({
    id: 't12-q25', testNumber: 12, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'Como deve ser efetuado o governo de uma embarcação de recreio nas Zonas de Navegação Restrita (portos, canais e barras)?',
    expectedAnswer: 'Com velocidade de segurança reduzida (geralmente <= 3 a 5 nós), sem provocar esteira ou ondulação que cause danos a terceiros, e mantendo-se o mais próximo possível do limite exterior do canal a estibordo.',
    acceptedKeywords: ['velocidade reduzida', 'estibordo', 'sem provocar ondulação', 'velocidade de segurança'],
    explanation: 'Regras de navegação em portos e canais estreitos.'
  }),
  makeQ({
    id: 't12-q26', testNumber: 12, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'A altura da água entre o Zero Hidrográfico e o fundo da carta náutica chama-se:',
    options: ['Sonda Reduzida.', 'Altura da maré.', 'Sonda à Hora.', 'Nível médio.'],
    correctOptionIndex: 0, expectedAnswer: 'Sonda Reduzida.', acceptedKeywords: ['sonda reduzida'],
    explanation: 'Sonda Reduzida.'
  }),
  makeQ({
    id: 't12-q27', testNumber: 12, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'Diga o que entende por Altura da Maré:',
    options: [
      'É o plano a que são referidas as sondas da carta.',
      'É a altura da superfície da água num determinado local e momento sobre o Zero Hidrográfico.',
      'É a profundidade máxima do porto.',
      'É o desfasamento entre o sol e a lua.'
    ],
    correctOptionIndex: 1, expectedAnswer: 'É a altura da superfície da água num determinado local e momento sobre o Zero Hidrográfico.', acceptedKeywords: ['altura da superfície da água', 'zero hidrográfico'],
    explanation: 'Definição oficial de Altura da Maré.'
  }),
  makeQ({
    id: 't12-q28', testNumber: 12, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'open-answer', points: 0.5,
    statement: 'Complete a frase: Num motor a gasolina a combustão dá-se por meio de uma ____ elétrica fornecida pela vela de ignição.',
    expectedAnswer: 'Faísca (ou centelha).', acceptedKeywords: ['faísca', 'faisca', 'centelha'],
    explanation: 'Ignição por faísca em motores a gasolina.'
  }),
  makeQ({
    id: 't12-q29', testNumber: 12, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'multiple-choice', points: 0.6,
    statement: 'Assinale a alínea correta relativamente ao sistema IALA Região A:',
    options: [
      'Uma baliza é uma marca fixa assente no fundo.',
      'Marcas de perigo isolado limitam a largura navegável de um canal.',
      'À entrada de um porto na Região A, as marcas vermelhas laterais são deixadas por Bombordo da embarcação.',
      'As marcas laterais não dependem do sentido da balizagem.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'À entrada de um porto na Região A, as marcas vermelhas laterais são deixadas por Bombordo da embarcação.', acceptedKeywords: ['marcas vermelhas', 'bombordo'],
    explanation: 'Na Região A: entrada de porto deixa marcas vermelhas a Bombordo e verdes a Estibordo.'
  }),
  makeQ({
    id: 't12-q30', testNumber: 12, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'Quais os fenómenos observados à passagem de uma frente fria no hemisfério Norte?',
    options: [
      'A pressão sobe bruscamente, o vento roda bruscamente para NW aumentando de intensidade com rajadas, surgem cúmulo-nimbos com aguaceiros fortes e descida da temperatura.',
      'O tempo estabiliza com céu limpo e sem vento.',
      'A temperatura sobe muito e o vento para.',
      'Surgem nevoeiros quentes sem chuva.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'A pressão sobe bruscamente, o vento roda bruscamente para NW aumentando de intensidade com rajadas, surgem cúmulo-nimbos com aguaceiros fortes e descida da temperatura.', acceptedKeywords: ['pressão sobe', 'roda para nw', 'cúmulo-nimbos', 'aguaceiros fortes'],
    explanation: 'Meteorologia sinóptica clássica de frente fria.'
  })
];
exportTestFile(12, t12);

// ==========================================
// TEST 13 (Com Chave Oficial DGRM Ficha nº 1)
// ==========================================
const t13 = [
  makeQ({
    id: 't13-q01', testNumber: 13, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Toda a embarcação que alcance outra desvia-se dela:',
    options: [
      'Ultrapassando por sotavento.',
      'Ultrapassando por barlavento.',
      'Apenas se a outra for de propulsão mecânica.',
      'Mantendo-se desimpedida do caminho da embarcação alcançada.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Mantendo-se desimpedida do caminho da embarcação alcançada.', acceptedKeywords: ['desimpedida', 'manter-se desimpedida'],
    explanation: 'Regra 13 do RIEAM. Chave Oficial 1: d).'
  }),
  makeQ({
    id: 't13-q02', testNumber: 13, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação B tem direito a rumo porque:',
    expectedAnswer: 'A embarcação B tem direito a rumo porque vai a navegar à vela e a embarcação A é de propulsão mecânica.',
    acceptedKeywords: ['vela', 'à vela', 'propulsão mecânica'],
    explanation: 'Regra 18 do RIEAM. Chave Oficial 2: B - vai a navegar à vela e a A é de propulsão mecânica.',
    diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't13-q03', testNumber: 13, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio encalhado exibe durante o dia:',
    options: [
      'Dois balões esféricos pretos.',
      'Três balões bicónicos pretos.',
      'Dois cones pretos unidos pelo vértice.',
      'Três balões esféricos pretos dispostos verticalmente.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Três balões esféricos pretos dispostos verticalmente.', acceptedKeywords: ['três balões esféricos', 'três esferas'],
    explanation: 'Regra 30(d) do RIEAM. Chave Oficial 3: d).'
  }),
  makeQ({
    id: 't13-q04', testNumber: 13, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Avista um navio pelo seu bombordo exibindo um cilindro preto de dia e verifica estar em rota de colisão. Tem que manobrar? Porquê?',
    expectedAnswer: 'Sim - Navio condicionado pelo seu calado tem prioridade e não pode manobrar livremente fora do canal.',
    acceptedKeywords: ['sim', 'condicionado pelo calado', 'calado'],
    explanation: 'Regra 18(d) do RIEAM. Chave Oficial 4: Sim - Navio condicionado pelo calado.'
  }),
  makeQ({
    id: 't13-q05', testNumber: 13, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de propulsão mecânica a rebocar e com visibilidade reduzida deve emitir o seguinte sinal sonoro:',
    options: [
      'Um som prolongado seguido de dois curtos com intervalos que não ultrapassem os dois minutos.',
      'Dois sons longos com intervalos de dois minutos.',
      'Um som curto a cada minuto.',
      'Três sons curtos.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Um som prolongado seguido de dois curtos com intervalos que não ultrapassem os dois minutos.', acceptedKeywords: ['prolongado seguido de dois curtos'],
    explanation: 'Regra 35(c) do RIEAM. Chave Oficial 5: a).'
  }),
  makeQ({
    id: 't13-q06', testNumber: 13, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação de propulsão mecânica que pretende guinar para Estibordo (EB) deve indicá-lo emitindo:',
    options: ['Um som curto.', 'Dois sons curtos.', 'Três sons curtos.', 'Dois sons longos.'],
    correctOptionIndex: 0, expectedAnswer: 'Um som curto.', acceptedKeywords: ['um som curto', 'um curto'],
    explanation: 'Regra 34(a) do RIEAM. Chave Oficial 6: a).'
  }),
  makeQ({
    id: 't13-q07', testNumber: 13, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'multiple-choice', points: 1.0,
    statement: 'Quando estiver dentro da água com o colete salva-vidas à espera de resgate, para evitar a perda rápida de calor (hipotermia) deve:',
    options: [
      'Nadar o mais rápido possível para aquecer.',
      'Retirar o colete.',
      'Mergulhar a cabeça debaixo de água.',
      'Adotar a posição de proteção contra a perda de calor (posição HELP / pernas fletidas e braços cruzados apertados ao peito).'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Adotar a posição de proteção contra a perda de calor (posição HELP).', acceptedKeywords: ['posição help', 'pernas fletidas', 'braços cruzados'],
    explanation: 'Chave Oficial 7: d).'
  }),
  makeQ({
    id: 't13-q08', testNumber: 13, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Onde deve ser fixado o cabo de disparo automático (boça de disparo) da jangada pneumática?',
    expectedAnswer: 'Deve estar fixado firmemente a bordo da embarcação (num ponto estrutural sólido).',
    acceptedKeywords: ['fixado a bordo', 'ponto fixo'],
    explanation: 'Chave Oficial 8: Deve estar fixado a bordo.'
  }),
  makeQ({
    id: 't13-q09', testNumber: 9, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'open-answer', points: 1.0,
    statement: 'Como deve combater com extintor um incêndio em combustíveis líquidos a bordo?',
    expectedAnswer: 'Com extintor de espuma (ou pó químico), dirigindo o jato para a base do incêndio e atacando pelo lado de barlavento (com o vento pelas costas).',
    acceptedKeywords: ['extintor de espuma', 'base do incêndio', 'barlavento', 'pó químico'],
    explanation: 'Chave Oficial 9: Com extintor de espuma, pela base do incêndio e a barlavento.'
  }),
  makeQ({
    id: 't13-q10', testNumber: 13, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'Complete a frase: A posição lateral de segurança deve ser utilizada em sinistrados ____ que respirem.',
    expectedAnswer: 'Inconscientes.', acceptedKeywords: ['inconscientes', 'inconsciente'],
    explanation: 'Chave Oficial 10: Inconscientes.'
  }),
  makeQ({
    id: 't13-q11', testNumber: 13, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Num adulto saudável considera-se como normal uma frequência respiratória de:',
    options: ['30 a 35 por minuto.', '60 a 65 por minuto.', '16 a 18 por minuto.', '08 a 10 por minuto.'],
    correctOptionIndex: 2, expectedAnswer: '16 a 18 por minuto.', acceptedKeywords: ['16 a 18'],
    explanation: 'Chave Oficial 11: c).'
  }),
  makeQ({
    id: 't13-q12', testNumber: 13, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'O que se entende por um fundo marinho de boa tença?',
    expectedAnswer: 'É um fundo onde a âncora unhe com facilidade e segurança sem garrear.',
    acceptedKeywords: ['unhe com facilidade', 'unhe', 'boa tença'],
    explanation: 'Chave Oficial 12: Unhe com facilidade.'
  }),
  makeQ({
    id: 't13-q13', testNumber: 13, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'De que material é habitualmente constituída a amarra das embarcações?',
    expectedAnswer: 'Ferro ou aço galvanizado.', acceptedKeywords: ['ferro ou aço', 'aço', 'ferro'],
    explanation: 'Chave Oficial 13: Ferro ou aço.'
  }),
  makeQ({
    id: 't13-q14', testNumber: 13, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A manobra de recolha da amarra e levantamento da âncora designa-se por:',
    expectedAnswer: 'Suspender.', acceptedKeywords: ['suspender'],
    explanation: 'Chave Oficial 14: Suspender.'
  }),
  makeQ({
    id: 't13-q15', testNumber: 13, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Numa embarcação de recreio, o hélice no seu movimento cria uma corrente de sucção que é descarregada para:',
    options: ['Vante.', 'Ré.', 'Alheta.', 'Quilha.'],
    correctOptionIndex: 0, expectedAnswer: 'Vante.', acceptedKeywords: ['vante'],
    explanation: 'Chave Oficial 15: a).'
  }),
  makeQ({
    id: 't13-q16', testNumber: 13, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'A força exercida sobre o leme varia com:',
    options: ['A cor do casco.', 'O quadrado da velocidade da água e a área do leme.', 'O peso do motor.', 'A temperatura da água.'],
    correctOptionIndex: 1, expectedAnswer: 'O quadrado da velocidade da água e a área do leme.', acceptedKeywords: ['velocidade', 'área'],
    explanation: 'Chave Oficial 16: b).'
  }),
  makeQ({
    id: 't13-q17', testNumber: 13, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Ao desatracar com vento contra o cais deve-se utilizar preferencialmente:',
    options: ['Lançante de proa.', 'Lançante de popa.', 'Regeira de vante (e motor a vante para abrir a popa).', 'Largada simultânea.'],
    correctOptionIndex: 2, expectedAnswer: 'Regeira de vante.', acceptedKeywords: ['regeira de vante'],
    explanation: 'Chave Oficial 17: c).'
  }),
  makeQ({
    id: 't13-q18', testNumber: 13, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'Das peças abaixo, indique as que constituem palamenta da embarcação:',
    options: ['Quilha e sobrequilha.', 'Leme e hélice.', 'Croque e boeira (vertedouro).', 'Enora e carlinga.'],
    correctOptionIndex: 2, expectedAnswer: 'Croque e boeira (vertedouro).', acceptedKeywords: ['croque', 'boeira'],
    explanation: 'Chave Oficial 18: c).'
  }),
  makeQ({
    id: 't13-q19', testNumber: 13, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'As amuras de uma embarcação ficam situadas:',
    options: ['Na popa.', 'Entre a roda de proa e o través de bombordo.', 'Entre a roda de proa e o través de estibordo.', 'As alíneas b) e c) estão corretas.'],
    correctOptionIndex: 3, expectedAnswer: 'As alíneas b) e c) estão corretas.', acceptedKeywords: ['b e c', 'corretas'],
    explanation: 'Chave Oficial 19: b) e c).'
  }),
  makeQ({
    id: 't13-q20', testNumber: 13, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'A distância teórica percorrida pelo hélice numa rotação de 360° em meio sólido chama-se:',
    expectedAnswer: 'Passo do hélice.', acceptedKeywords: ['passo', 'passo do hélice'],
    explanation: 'Chave Oficial 20: Passo do hélice.'
  }),
  makeQ({
    id: 't13-q21', testNumber: 13, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'A ação de puxar um cabo para bordo ou para o cais designa-se:',
    options: ['Alar um cabo.', 'Folgar um cabo.', 'Largar um cabo.', 'Aguentar um cabo.'],
    correctOptionIndex: 0, expectedAnswer: 'Alar um cabo.', acceptedKeywords: ['alar'],
    explanation: 'Chave Oficial 21: a).'
  }),
  makeQ({
    id: 't13-q22', testNumber: 13, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Identifique o nó que serve para unir dois cabos de bitolas semelhantes:',
    expectedAnswer: 'Nó direito - unir dois cabos de bitolas semelhantes.', acceptedKeywords: ['nó direito', 'direito'],
    explanation: 'Chave Oficial 22: Nó direito - unir dois cabos de bitolas semelhantes.'
  }),
  makeQ({
    id: 't13-q23', testNumber: 13, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Identifique o nó representado na figura que forma uma laçada ou olhal fechado num cabo:',
    expectedAnswer: 'Nó de azelha (ou lais de guia).', acceptedKeywords: ['nó de azelha', 'azelha', 'lais de guia'],
    explanation: 'Chave Oficial 23: Nó de azelha.'
  }),
  makeQ({
    id: 't13-q24', testNumber: 13, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'Indique os limites da carta de Marinheiro (menor de 18 anos): comprimento máximo, distância da costa, de porto de abrigo, tipo de navegação e potência instalada máxima:',
    expectedAnswer: '5 metros de comprimento, até 3 milhas da costa e 6 milhas de porto de abrigo, navegação diurna e potência máxima de 22,5 kW.',
    acceptedKeywords: ['5 m', '3 milhas', '6 milhas', 'diurna', '22,5 kw'],
    explanation: 'Chave Oficial 24: 5 m - 3 milhas - 6 milhas - diurna - 22,5 KW.'
  }),
  makeQ({
    id: 't13-q25', testNumber: 13, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'Qual a lotação mínima de segurança obrigatória durante a prática de esqui náutico?',
    expectedAnswer: '2 tripulantes (um timoneiro e um observador/vigia virado para a ré a vigiar o esquiador).',
    acceptedKeywords: ['2 tripulantes', 'dois tripulantes', '2'],
    explanation: 'Chave Oficial 25: 2 tripulantes.'
  }),
  makeQ({
    id: 't13-q26', testNumber: 13, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'Durante as fases da Lua de Quarto Crescente e Quarto Minguante ocorrem:',
    expectedAnswer: 'Marés mortas (de quadratura).', acceptedKeywords: ['marés mortas', 'quadratura'],
    explanation: 'Chave Oficial 26: Marés mortas.'
  }),
  makeQ({
    id: 't13-q27', testNumber: 13, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'O marégrafo é um aparelho de medição que serve para:',
    expectedAnswer: 'Registar continuamente a altura da água do mar em função da hora e data.',
    acceptedKeywords: ['registar a altura da água', 'altura da água', 'hora e data'],
    explanation: 'Chave Oficial 27: Registar a altura da água, hora e data.'
  }),
  makeQ({
    id: 't13-q28', testNumber: 13, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'multiple-choice', points: 0.5,
    statement: 'Ao arrancar um motor fora de borda é fundamental verificar de imediato:',
    options: ['Se a buzina toca.', 'Se o rádio funciona.', 'Se existe jato contínuo de água de refrigeração no escape (testemunho).', 'Se as luzes acendem.'],
    correctOptionIndex: 2, expectedAnswer: 'Se existe jato contínuo de água de refrigeração no escape (testemunho).', acceptedKeywords: ['jato de água', 'testemunho', 'refrigeração'],
    explanation: 'Chave Oficial 28: c).'
  }),
  makeQ({
    id: 't13-q29', testNumber: 13, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'multiple-choice', points: 0.6,
    statement: 'Uma marca de águas limpas (águas seguras) apresenta faixas verticais de que cor?',
    options: ['Amarelas e pretas.', 'Verdes e brancas.', 'Vermelhas e brancas em faixas verticais.', 'Azuis e amarelas.'],
    correctOptionIndex: 2, expectedAnswer: 'Vermelhas e brancas em faixas verticais.', acceptedKeywords: ['vermelhas e brancas', 'faixas verticais'],
    explanation: 'Chave Oficial 29: c).'
  }),
  makeQ({
    id: 't13-q30', testNumber: 13, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'As nuvens de grande desenvolvimento vertical que produzem trovoadas, rajadas violentas e perigo à navegação são:',
    options: ['Cirros.', 'Estratos.', 'Cúmulo-nimbos (Cumulonimbus).', 'Névoa.'],
    correctOptionIndex: 2, expectedAnswer: 'Cúmulo-nimbos (Cumulonimbus).', acceptedKeywords: ['cúmulo-nimbos', 'cumulonimbus'],
    explanation: 'Chave Oficial 30: c).'
  })
];
exportTestFile(13, t13);

console.log("Successfully generated Test 10, 11, 12 and 13!");
