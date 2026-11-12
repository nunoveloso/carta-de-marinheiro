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
// TEST 7
// ==========================================
const t7 = [
  makeQ({
    id: 't7-q01', testNumber: 7, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Defina o que entende por embarcação alcançante:',
    options: [
      'É aquela que se aproxima de outra de uma direção que fique mais de 22,5° para ré do través.',
      'É aquela que se aproxima de outra pela proa.',
      'É aquela que navega a menos de 5 nós.',
      'É aquela que dá prioridade aos veleiros apenas.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'É aquela que se aproxima de outra de uma direção que fique mais de 22,5° para ré do través.', acceptedKeywords: ['22,5', 'ré do través'],
    explanation: 'Regra 13 do RIEAM.'
  }),
  makeQ({
    id: 't7-q02', testNumber: 7, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque está com capacidade de manobra reduzida.', acceptedKeywords: ['capacidade de manobra reduzida', 'manobra reduzida'],
    explanation: 'Regra 18 do RIEAM.', diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't7-q03', testNumber: 7, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio encalhado deve apresentar durante o dia:',
    options: [
      'Três balões esféricos pretos dispostos verticalmente.',
      'Dois balões bicónicos pretos.',
      'Um balão cónico preto com o vértice para baixo.',
      'Dois balões esféricos pretos.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Três balões esféricos pretos dispostos verticalmente.', acceptedKeywords: ['três balões esféricos', 'três esferas'],
    explanation: 'Regra 30(d) do RIEAM.'
  }),
  makeQ({
    id: 't7-q04', testNumber: 7, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Desenhe na figura ao lado os balões correspondentes a um navio com capacidade de manobra reduzida:',
    expectedAnswer: 'Três marcas dispostas verticalmente: esfera preta superior, losango (bicónico) preto ao meio e esfera preta inferior.', acceptedKeywords: ['esfera', 'losango', 'bicónico'],
    explanation: 'Regra 27(b) do RIEAM.', diagram: { type: 'day-shapes', variant: 'mast-unmarked' }
  }),
  makeQ({
    id: 't7-q05', testNumber: 7, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'A embarcação A pretende atracar por Bombordo (BB) no cais. Para isso tem que guinar para Estibordo (EB). Que sinal sonoro tem que emitir?',
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
    id: 't7-q06', testNumber: 7, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação de propulsão mecânica com as máquinas a trabalhar a ré deve sinalizar a manobra emitindo:',
    options: [
      'Um som curto.',
      'Dois sons longos.',
      'Um som longo.',
      'Três sons curtos.'
    ],
    correctOptionIndex: 3, expectedAnswer: 'Três sons curtos.', acceptedKeywords: ['três sons curtos', 'três curtos'],
    explanation: 'Regra 34(a) do RIEAM: "As minhas máquinas estão a trabalhar a ré".'
  }),
  makeQ({
    id: 't7-q07', testNumber: 7, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Onde deve estar colocada a jangada pneumática de salvação a bordo?',
    expectedAnswer: 'No convés aberto exterior, em local desimpedido de fácil acesso, pronta a ser lançada manualmente ou com libertação hidrostática automática.',
    acceptedKeywords: ['convés aberto', 'desimpedido', 'libertação hidrostática'],
    explanation: 'A jangada deve flutuar livremente se o navio se afundar.'
  }),
  makeQ({
    id: 't7-q08', testNumber: 7, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'multiple-choice', points: 1.0,
    statement: 'Qual dos sinais pirotécnicos de socorro deve utilizar preferencialmente de dia?',
    options: [
      'Sinal fumígeno flutuante cor-de-laranja.',
      'Facho de mão de luz vermelha.',
      'Foguete paraquedas vermelho.',
      'Pistola de sinais com luz verde.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Sinal fumígeno flutuante cor-de-laranja.', acceptedKeywords: ['fumígeno', 'laranja'],
    explanation: 'O fumo laranja proporciona visibilidade ótima diurna a longa distância.'
  }),
  makeQ({
    id: 't7-q09', testNumber: 7, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'open-answer', points: 1.0,
    statement: 'Qual o tipo de extintor que devemos usar para combater um incêndio produzido por gases inflamáveis (Classe C)?',
    expectedAnswer: 'Extintor de pó químico seco (ou CO2), cortando previamente a fonte de gás.', acceptedKeywords: ['pó químico', 'co2', 'cortar o gás'],
    explanation: 'Fogo a gás deve ser extinto por corte do fornecimento e inibição por pó químico.'
  }),
  makeQ({
    id: 't7-q10', testNumber: 7, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'Complete a frase com uma das palavras (Respirem / Não respirem): A posição lateral de segurança deve ser utilizada em sinistrados inconscientes que ____ e com batimentos cardíacos.',
    expectedAnswer: 'Respirem.', acceptedKeywords: ['respirem', 'respira'],
    explanation: 'A PLS destina-se a manter aberta a via aérea de quem está inconsciente mas a respirar.'
  }),
  makeQ({
    id: 't7-q11', testNumber: 7, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'A temperatura média basal do corpo humano de um adulto normal é de:',
    options: ['34,5°C.', '35,5°C.', '36,5°C.', '38,5°C.'],
    correctOptionIndex: 2, expectedAnswer: '36,5°C.', acceptedKeywords: ['36,5'],
    explanation: 'Temperatura normotérmica fisiológica humana.'
  }),
  makeQ({
    id: 't7-q12', testNumber: 7, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'multiple-choice', points: 0.5,
    statement: 'A corrente constituída por elos em ferro ou aço que, talingada à âncora, permite fundear a embarcação chama-se:',
    options: ['Ferro.', 'Cabo.', 'Manilha.', 'Amarra.'],
    correctOptionIndex: 3, expectedAnswer: 'Amarra.', acceptedKeywords: ['amarra'],
    explanation: 'A amarra é a corrente que liga o ferro ao escovém e paiol da amarra.'
  }),
  makeQ({
    id: 't7-q13', testNumber: 7, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'Observe a figura da âncora de Almirantado e indique o nome das partes essenciais (haste, cepo, braços, unhas e anete):',
    expectedAnswer: 'Haste, Cepo, Braços, Unhas e Anete.', acceptedKeywords: ['haste', 'cepo', 'unhas', 'braços', 'anete'],
    explanation: 'Componentes estruturais da âncora de cepo.'
  }),
  makeQ({
    id: 't7-q14', testNumber: 7, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'multiple-choice', points: 0.5,
    statement: 'O ancorete é um ferro ligeiro que pode ser usado para fundear:',
    options: ['Pequenas embarcações ou apoio a manobras.', 'Navios de carga.', 'Barcos de pesca de arrasto oceânico.', 'Navios de guerra.'],
    correctOptionIndex: 0, expectedAnswer: 'Pequenas embarcações ou apoio a manobras.', acceptedKeywords: ['pequenas embarcações'],
    explanation: 'O ancorete é uma âncora pequena auxiliar.'
  }),
  makeQ({
    id: 't7-q15', testNumber: 7, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'A manobra de fundear deve ser efetuada preferencialmente:',
    options: ['A favor do vento.', 'Contra a corrente (ou contra o vento se não houver corrente).', 'A favor da corrente.', 'Em marcha rápida à ré.'],
    correctOptionIndex: 1, expectedAnswer: 'Contra a corrente (ou contra o vento se não houver corrente).', acceptedKeywords: ['contra a corrente', 'contra o vento'],
    explanation: 'Aproar à corrente/vento permite travar o seguimento suavemente e controlar a descida do ferro.'
  }),
  makeQ({
    id: 't7-q16', testNumber: 7, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Um hélice de passo direito, olhando de ré para vante, em marcha à vante gira no sentido:',
    options: ['Dos ponteiros do relógio (sentido horário).', 'Inverso dos ponteiros do relógio (anti-horário).'],
    correctOptionIndex: 0, expectedAnswer: 'Dos ponteiros do relógio (sentido horário).', acceptedKeywords: ['ponteiros do relógio', 'horário'],
    explanation: 'Passo direito = rotação horária em marcha à vante vista de ré.'
  }),
  makeQ({
    id: 't7-q17', testNumber: 7, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Numa embarcação de recreio equipada com dois hélices, o hélice de Bombordo (BB) é geralmente de passo:',
    options: ['Direito.', 'Esquerdo (rotação exterior supradivergente).'],
    correctOptionIndex: 1, expectedAnswer: 'Esquerdo (rotação exterior supradivergente).', acceptedKeywords: ['esquerdo'],
    explanation: 'Em instalações bimotor os hélices giram para o exterior (BB esquerdo, EB direito).'
  }),
  makeQ({
    id: 't7-q18', testNumber: 7, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'As embarcações dotadas de um pavimento estrutural completo com cobertura estanque protegida por superestruturas designam-se por:',
    options: ['Embarcações abertas.', 'Embarcações parcialmente abertas.', 'Embarcações fechadas (com convés estanque).', 'Embarcações insufláveis simples.'],
    correctOptionIndex: 2, expectedAnswer: 'Embarcações fechadas (com convés estanque).', acceptedKeywords: ['fechadas', 'convés'],
    explanation: 'Classificação estrutural do casco.'
  }),
  makeQ({
    id: 't7-q19', testNumber: 7, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'O peso de uma embarcação que equivale exatamente ao peso do volume de água deslocada designa-se por:',
    expectedAnswer: 'Deslocamento.', acceptedKeywords: ['deslocamento'],
    explanation: 'Princípio de Arquimedes.'
  }),
  makeQ({
    id: 't7-q20', testNumber: 7, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'Quais os 5 principais setores gerais de uma embarcação?',
    expectedAnswer: 'Proa (vante), Popa (ré), Bombordo (lado esquerdo), Estibordo (lado direito) e Meia-nau (centro).',
    acceptedKeywords: ['proa', 'popa', 'bombordo', 'estibordo', 'meia-nau'],
    explanation: 'Divisões referenciais fundamentais de qualquer embarcação.'
  }),
  makeQ({
    id: 't7-q21', testNumber: 7, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Os cabos livres que se encontram a bordo prontos a ser aplicados em qualquer faina chamam-se:',
    options: ['Cabos solteiros.', 'Espias mestras.', 'Cabo cadeira.', 'Boças fixas.'],
    correctOptionIndex: 0, expectedAnswer: 'Cabos solteiros.', acceptedKeywords: ['cabos solteiros'],
    explanation: 'Cabos solteiros são linhas avulsas prontas para manobras imprevistas.'
  }),
  makeQ({
    id: 't7-q22', testNumber: 7, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'open-answer', points: 0.5,
    statement: 'Às pequenas torções circulares viciosas que um cabo dá sobre si próprio e que dificultam o seu correr dá-se o nome de:',
    expectedAnswer: 'Cocas.', acceptedKeywords: ['cocas', 'coca'],
    explanation: 'Cocas são torções que podem encravar o cabo nos cabrestantes ou polés.'
  }),
  makeQ({
    id: 't7-q23', testNumber: 7, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Para travar ou suster o correr de um cabo diz-se:',
    options: ['Alar um cabo.', 'Folgar um cabo.', 'Aguentar um cabo.', 'Largar um cabo.'],
    correctOptionIndex: 2, expectedAnswer: 'Aguentar um cabo.', acceptedKeywords: ['aguentar', 'aguentar um cabo'],
    explanation: 'Comando para não deixar correr o cabo.'
  }),
  makeQ({
    id: 't7-q24', testNumber: 7, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'O Regulamento da Náutica de Recreio aplica-se a:',
    options: [
      'Apenas embarcações de recreio.',
      'Apenas embarcações de recreio e equipamentos de apoio.',
      'Às embarcações de recreio, aos seus equipamentos e aos tripulantes sejam ou não responsáveis pelo seu governo.',
      'Apenas navios mercantes em recreio.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Às embarcações de recreio, aos seus equipamentos e aos tripulantes sejam ou não responsáveis pelo seu governo.', acceptedKeywords: ['embarcações de recreio', 'tripulantes', 'equipamentos'],
    explanation: 'Âmbito de aplicação integral do RNR.'
  }),
  makeQ({
    id: 't7-q25', testNumber: 7, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'Quem é o responsável pela utilização e operação do equipamento de radiotelefone VHF a bordo de uma embarcação de recreio?',
    options: ['O proprietário.', 'O detentor do certificado/licença de Operador Radiotelefonista (ou o comandante habilitado).', 'Qualquer passageiro.', 'A capitania.'],
    correctOptionIndex: 1, expectedAnswer: 'O detentor do certificado/licença de Operador Radiotelefonista (ou o comandante habilitado).', acceptedKeywords: ['radiotelefonista', 'operador radiotelefonista'],
    explanation: 'A operação do VHF exige habilitação específica ou inclusão na carta náutica.'
  }),
  makeQ({
    id: 't7-q26', testNumber: 7, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'Como determina a fórmula do valor da Sonda à hora?',
    expectedAnswer: 'Sonda à Hora = Sonda Reduzida (SR) + Altura da Maré (Hm).', acceptedKeywords: ['sonda reduzida', 'altura da maré', 'sr + hm'],
    explanation: 'Cálculo fundamental da navegação em águas rasas.'
  }),
  makeQ({
    id: 't7-q27', testNumber: 7, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'Quando ocorrem as Marés Mortas (ou de quadratura), em relação às fases da Lua?',
    expectedAnswer: 'Ocorrem durante as fases de Quarto Crescente e Quarto Minguante.', acceptedKeywords: ['quarto crescente', 'quarto minguante', 'crescente', 'minguante'],
    explanation: 'Quando o ângulo Terra-Lua-Sol é de 90° as forças atraentes atenuam-se.'
  }),
  makeQ({
    id: 't7-q28', testNumber: 7, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'multiple-choice', points: 0.5,
    statement: 'A existência de combustível contaminado com água ou impurezas num motor fora de borda provoca:',
    options: ['Sobreaquecimento do bloco.', 'Falhas de ignição, ralenti irregular ou falha de arranque do motor.', 'Cavitação do hélice.', 'Aumento súbito de rotação.'],
    correctOptionIndex: 1, expectedAnswer: 'Falhas de ignição, ralenti irregular ou falha de arranque do motor.', acceptedKeywords: ['falha de arranque', 'ralenti irregular'],
    explanation: 'A água na gasolina entope os gicleurs e bloqueia a injeção.'
  }),
  makeQ({
    id: 't7-q29', testNumber: 7, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'open-answer', points: 0.6,
    statement: 'Diga como se apresenta a marca cardinal Oeste em relação à cor, forma dos alvos e ritmo da luz:',
    expectedAnswer: 'Cor: Amarela com faixa preta ao meio; Alvos: Dois cones pretos apontados um para o outro (opostos pelos vértices); Luz: Branca rápida cintilante com 9 flashes em cada 10 ou 15 segundos [Q(9) 15s].',
    acceptedKeywords: ['amarela com faixa preta', 'opostos pelos vértices', '9 cintilações', 'luz branca'],
    explanation: 'Especificação técnica IALA da marca cardinal Oeste.'
  }),
  makeQ({
    id: 't7-q30', testNumber: 7, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'Na escala de Beaufort, à designação de força de vento "Fresco" (Força 5) corresponde uma velocidade de vento de:',
    options: ['17 a 21 nós.', '< 1 nó.', '41 a 47 nós.', '4 a 6 nós.'],
    correctOptionIndex: 0, expectedAnswer: '17 a 21 nós.', acceptedKeywords: ['17 a 21 nós', '17 a 21'],
    explanation: 'Força 5 Beaufort (vento fresco: 17 a 21 nós), com formação de cristas de espuma branca em todo o lado.'
  })
];
exportTestFile(7, t7);

// ==========================================
// TEST 8
// ==========================================
const t8 = [
  makeQ({
    id: 't8-q01', testNumber: 8, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Uma embarcação que governa para evitar colisão deve efetuar uma alteração de rumo e/ou velocidade que seja:',
    options: [
      'Ampla e claramente visível com bastante antecedência.',
      'Pequena e sucessiva para não assustar a outra embarcação.',
      'Apenas de 1 ou 2 graus.',
      'Apenas em marcha à ré.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Ampla e claramente visível com bastante antecedência.', acceptedKeywords: ['ampla', 'antecedência'],
    explanation: 'Regra 8 do RIEAM.'
  }),
  makeQ({
    id: 't8-q02', testNumber: 8, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre duas embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque está com capacidade de manobra reduzida.', acceptedKeywords: ['capacidade de manobra reduzida', 'manobra reduzida'],
    explanation: 'Regra 18 do RIEAM.', diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't8-q03', testNumber: 8, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio encalhado exibe durante o dia:',
    options: [
      'Três balões esféricos pretos dispostos verticalmente.',
      'Dois balões bicónicos pretos.',
      'Um balão bicónico preto.',
      'Nenhuma marca se for menor de 50 metros.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Três balões esféricos pretos dispostos verticalmente.', acceptedKeywords: ['três balões esféricos', 'três esferas'],
    explanation: 'Regra 30(d) do RIEAM.'
  }),
  makeQ({
    id: 't8-q04', testNumber: 8, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'open-answer', points: 1.0,
    statement: 'Desenhe na figura ao lado os balões correspondentes a um navio desgovernado:',
    expectedAnswer: 'Dois balões esféricos pretos sobrepostos verticalmente.', acceptedKeywords: ['dois balões esféricos', 'duas esferas pretas'],
    explanation: 'Regra 27(a) do RIEAM.', diagram: { type: 'day-shapes', variant: 'mast-unmarked' }
  }),
  makeQ({
    id: 't8-q05', testNumber: 8, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio na faina da pesca e com visibilidade reduzida deve emitir:',
    options: [
      'Um som curto a cada dois minutos.',
      'Dois sons longos a cada dois minutos.',
      'Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.',
      'Três sons curtos.'
    ],
    correctOptionIndex: 2, expectedAnswer: 'Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.', acceptedKeywords: ['prolongado seguido de dois curtos'],
    explanation: 'Regra 35(c) do RIEAM.'
  }),
  makeQ({
    id: 't8-q06', testNumber: 8, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de propulsão mecânica fundeado com visibilidade reduzida deve emitir:',
    options: [
      'Toques de sino em cadência rápida durante 5 segundos a intervalos não superiores a 1 minuto.',
      'Dois sons longos a cada minuto.',
      'Três apitos curtos.',
      'Um som contínuo de buzina.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Toques de sino em cadência rápida durante 5 segundos a intervalos não superiores a 1 minuto.', acceptedKeywords: ['sino', '5 segundos', '1 minuto'],
    explanation: 'Regra 35(g) do RIEAM.'
  }),
  makeQ({
    id: 't8-q07', testNumber: 8, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Em caso de queda de tripulante ao mar, por que motivo se deve guinar imediatamente para o mesmo bordo da queda?',
    expectedAnswer: 'Para desviar a popa e as pás do hélice para fora da trajetória do náufrago, evitando ferimentos graves ou mortais.',
    acceptedKeywords: ['desviar o hélice', 'afastar a popa', 'evitar ferimentos'],
    explanation: 'Manobra de salvação em homem ao mar.'
  }),
  makeQ({
    id: 't8-q08', testNumber: 8, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'multiple-choice', points: 1.0,
    statement: 'O colete salva-vidas de 150N homologado SOLAS garante:',
    options: [
      'Que uma pessoa inconsciente com roupa de mar volte a face para cima fora de água em menos de 5 segundos.',
      'Que a pessoa consiga nadar a mais de 10 nós.',
      'Apenas proteção contra o vento.',
      'Flutuação exclusiva para mergulhadores.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'Que uma pessoa inconsciente com roupa de mar volte a face para cima fora de água em menos de 5 segundos.', acceptedKeywords: ['face para cima', 'inconsciente'],
    explanation: 'Requisito técnico fundamental do colete salva-vidas.'
  }),
  makeQ({
    id: 't8-q09', testNumber: 8, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'multiple-choice', points: 1.0,
    statement: 'Para combater um incêndio de classe B (gasolina/gasóleo) o operador do extintor deve dirigir o jato:',
    options: ['Para o topo das chamas.', 'Para a base das chamas, em movimento de varrimento e com o vento pelas costas (a barlavento).', 'Para a água circundante.', 'Para as vigias.'],
    correctOptionIndex: 1, expectedAnswer: 'Para a base das chamas, em movimento de varrimento e com o vento pelas costas (a barlavento).', acceptedKeywords: ['base das chamas', 'barlavento', 'varrimento'],
    explanation: 'Técnica correta de ataque ao fogo com extintor portátil.'
  }),
  makeQ({
    id: 't8-q10', testNumber: 8, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Num adulto saudável a pulsação arterial normal em repouso varia entre:',
    options: ['30 e 40 bpm.', '60 e 80 bpm.', '120 e 150 bpm.', '10 e 20 bpm.'],
    correctOptionIndex: 1, expectedAnswer: '60 e 80 bpm.', acceptedKeywords: ['60 e 80', '70'],
    explanation: 'Frequência cardíaca basal de repouso.'
  }),
  makeQ({
    id: 't8-q11', testNumber: 8, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'open-answer', points: 0.5,
    statement: 'Como deve atuar perante uma queimadura de segundo grau sofrida no motor da embarcação?',
    expectedAnswer: 'Arrefecer de imediato com água limpa fria corrente durante pelo menos 10 a 15 minutos, não rebentar bolhas e cobrir com penso estéril humedecido.',
    acceptedKeywords: ['água fria', 'arrefecer', 'não rebentar bolhas', 'penso estéril'],
    explanation: 'Tratamento de suporte imediato a queimaduras térmicas.'
  }),
  makeQ({
    id: 't8-q12', testNumber: 8, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'Identifique os componentes da âncora de Almirantado: haste, cepo, braços, unhas e anete.',
    expectedAnswer: 'Haste, Cepo, Braços, Unhas e Anete.', acceptedKeywords: ['haste', 'cepo', 'unhas', 'braços', 'anete'],
    explanation: 'Nomenclatura do ferro.'
  }),
  makeQ({
    id: 't8-q13', testNumber: 8, questionNumber: 13, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'open-answer', points: 0.5,
    statement: 'Complete a frase: A defensa destina-se a proteger o ____ da embarcação do contacto direto ou choque contra o cais ou outra embarcação.',
    expectedAnswer: 'Costado (ou casco).', acceptedKeywords: ['costado', 'casco'],
    explanation: 'As defensas amortecem os impactos na atracação.'
  }),
  makeQ({
    id: 't8-q14', testNumber: 8, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'Por que motivo um fundo de areia ou lodo é considerado de boa tença?',
    expectedAnswer: 'Porque permite que as unhas do ferro penetrem facilmente na camada superficial e fiquem cravadas com firmeza sem garrear.',
    acceptedKeywords: ['penetrar', 'unhar', 'cravadas', 'não garrear'],
    explanation: 'Mecânica do fundeio.'
  }),
  makeQ({
    id: 't8-q15', testNumber: 8, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Os fatores que influenciam o governo e a manobra de uma embarcação a motor são:',
    options: ['Efeito do leme.', 'Efeito lateral do hélice.', 'Correntes produzidas pelos hélices.', 'Todas as alíneas estão corretas.'],
    correctOptionIndex: 3, expectedAnswer: 'Todas as alíneas estão corretas.', acceptedKeywords: ['todas', 'corretas'],
    explanation: 'Fatores manobreiros clássicos.'
  }),
  makeQ({
    id: 't8-q16', testNumber: 8, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'A força exercida sobre a porta do leme é tanto maior:',
    options: ['Quanto maior for a velocidade da embarcação.', 'Quanto menor for a velocidade.', 'Quanto menor for a área do leme.', 'Quanto menor for o calado.'],
    correctOptionIndex: 0, expectedAnswer: 'Quanto maior for a velocidade da embarcação.', acceptedKeywords: ['maior for a velocidade', 'velocidade'],
    explanation: 'Pressão hidrodinâmica na porta do leme.'
  }),
  makeQ({
    id: 't8-q17', testNumber: 8, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Ao meter leme a um bordo é necessário vencer uma certa força, que se designa:',
    options: ['Resistência do hélice.', 'Resistência passiva.', 'Resistência da proa.', 'Resistência do leme.'],
    correctOptionIndex: 3, expectedAnswer: 'Resistência do leme.', acceptedKeywords: ['resistência do leme'],
    explanation: 'Resistência hidrodinâmica gerada pela pá do leme.'
  }),
  makeQ({
    id: 't8-q18', testNumber: 8, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'O dispositivo que possibilita o avanço ou recuo de uma embarcação através do seu movimento circular em rotação chama-se:',
    expectedAnswer: 'Hélice.', acceptedKeywords: ['hélice', 'helice'],
    explanation: 'Propulsor marítimo.'
  }),
  makeQ({
    id: 't8-q19', testNumber: 8, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'O plano vertical longitudinal que divide a embarcação em Bombordo e Estibordo designa-se por:',
    options: ['Plano Diametral.', 'Plano de Flutuação.', 'Plano de Meia-Nau.', 'Plano das Balizas.'],
    correctOptionIndex: 0, expectedAnswer: 'Plano Diametral.', acceptedKeywords: ['plano diametral', 'diametral'],
    explanation: 'O plano diametral é o plano vertical de simetria longitudinal da embarcação.'
  }),
  makeQ({
    id: 't8-q20', testNumber: 8, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'open-answer', points: 0.5,
    statement: 'Quanto às regiões exteriores das embarcações, o setor situado a meio comprimento, perpendicular à linha proa-popa, designa-se por:',
    expectedAnswer: 'Través.', acceptedKeywords: ['través', 'traves'],
    explanation: 'Direção perpendicular a meio comprimento.'
  }),
  makeQ({
    id: 't8-q21', testNumber: 8, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Para travar ou suster o correr de um cabo diz-se:',
    options: ['Alar um cabo.', 'Folgar um cabo.', 'Aguentar um cabo.', 'Largar um cabo.'],
    correctOptionIndex: 2, expectedAnswer: 'Aguentar um cabo.', acceptedKeywords: ['aguentar'],
    explanation: 'Terminologia náutica.'
  }),
  makeQ({
    id: 't8-q22', testNumber: 8, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'A ação de prender um cabo a um cabeço ou cunho designa-se:',
    options: ['Colher um cabo.', 'Dar volta a um cabo.', 'Cunhar um cabo.', 'Aguentar um cabo.'],
    correctOptionIndex: 1, expectedAnswer: 'Dar volta a um cabo.', acceptedKeywords: ['dar volta'],
    explanation: 'Prender cabo.'
  }),
  makeQ({
    id: 't8-q23', testNumber: 8, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Para unir dois cabos de bitolas diferentes o nó a utilizar é o:',
    options: ['Lais de guia.', 'Nó direito.', 'Nó torto.', 'Nó de escota.'],
    correctOptionIndex: 3, expectedAnswer: 'Nó de escota.', acceptedKeywords: ['nó de escota', 'escota'],
    explanation: 'União de cabos de espessuras diferentes.'
  }),
  makeQ({
    id: 't8-q24', testNumber: 8, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'O titular da carta de marinheiro maior de 18 anos pode governar que tipo de embarcações e em que limites?',
    expectedAnswer: 'ER até 7 metros de comprimento, até 3 milhas da costa e 10 milhas de porto de abrigo, em navegação diurna.',
    acceptedKeywords: ['7 metros', '3 milhas', '10 milhas', 'diurna'],
    explanation: 'Competências legais da carta de Marinheiro.'
  }),
  makeQ({
    id: 't8-q25', testNumber: 8, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'multiple-choice', points: 0.6,
    statement: 'Como se classificam as embarcações de recreio com comprimento entre os 7 e os 15 metros?',
    options: ['Tipo 1.', 'Tipo 2 (Navegação ao Largo).', 'Tipo 4.', 'Embarcações de praia.'],
    correctOptionIndex: 1, expectedAnswer: 'Tipo 2 (Navegação ao Largo).', acceptedKeywords: ['tipo 2', 'ao largo'],
    explanation: 'Classificação oficial por tipo de embarcação de recreio.'
  }),
  makeQ({
    id: 't8-q26', testNumber: 8, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'Diga o que entende por Zero Hidrográfico (ZH):',
    options: [
      'É o plano horizontal de referência ao qual estão referidas as sondas cartográficas e as previsões de maré.',
      'É a altura máxima que a água atinge na preia-mar.',
      'É a profundidade média do oceano.',
      'É a linha de costa desenhada a vermelho.'
    ],
    correctOptionIndex: 0, expectedAnswer: 'É o plano horizontal de referência ao qual estão referidas as sondas cartográficas e as previsões de maré.', acceptedKeywords: ['plano de referência', 'sondas cartográficas', 'previsões de maré'],
    explanation: 'Definição oficial do Instituto Hidrográfico para o ZH.'
  }),
  makeQ({
    id: 't8-q27', testNumber: 8, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'A altura da água entre o Zero Hidrográfico e a superfície livre da água designa-se por:',
    expectedAnswer: 'Altura da maré.', acceptedKeywords: ['altura da maré', 'altura de maré'],
    explanation: 'Definição de Hm.'
  }),
  makeQ({
    id: 't8-q28', testNumber: 8, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'open-answer', points: 0.5,
    statement: 'O circuito de arrefecimento de um motor fora de borda após funcionamento em água salgada deve ser adoçado com:',
    expectedAnswer: 'Água doce limpa.', acceptedKeywords: ['água doce', 'doce'],
    explanation: 'Manutenção de motores marítimos.'
  }),
  makeQ({
    id: 't8-q29', testNumber: 8, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'open-answer', points: 0.6,
    statement: 'Diga como se apresenta a marca cardinal Norte quanto a cor e forma dos alvos:',
    expectedAnswer: 'Cor: Faixa preta em cima e amarela em baixo (preto sobre amarelo); Alvos: Dois cones pretos apontados ambos para cima.',
    acceptedKeywords: ['preto sobre amarelo', 'cones para cima', 'ambos para cima'],
    explanation: 'Marca cardinal Norte IALA.'
  }),
  makeQ({
    id: 't8-q30', testNumber: 8, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'O NAVTEX é um equipamento de radiocomunicações marítimas que permite receber automaticamente:',
    options: ['Informação de segurança marítima (MSI), avisos à navegação e boletins meteorológicos.', 'Filmes e séries.', 'Comunicações telefónicas terrestres.', 'Apenas música.'],
    correctOptionIndex: 0, expectedAnswer: 'Informação de segurança marítima (MSI), avisos à navegação e boletins meteorológicos.', acceptedKeywords: ['segurança marítima', 'avisos à navegação', 'meteorológicos'],
    explanation: 'Sistema internacional NAVTEX (518 kHz).'
  })
];
exportTestFile(8, t8);

console.log("Exported Test 7 and Test 8 successfully!");
