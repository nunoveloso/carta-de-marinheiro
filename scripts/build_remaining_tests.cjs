const fs = require('fs');

// Helper to format question
function makeQ({
  id,
  testNumber,
  questionNumber,
  sourceTests,
  category,
  subcategory,
  type,
  points,
  statement,
  options,
  correctOptionIndex,
  expectedAnswer,
  acceptedKeywords,
  explanation,
  diagram
}) {
  return {
    id,
    testNumber,
    questionNumber,
    sourceTests: sourceTests || [testNumber],
    category,
    subcategory,
    type,
    points,
    statement,
    ...(options ? { options } : {}),
    ...(correctOptionIndex !== undefined ? { correctOptionIndex } : {}),
    ...(expectedAnswer ? { expectedAnswer } : {}),
    ...(acceptedKeywords ? { acceptedKeywords } : {}),
    ...(explanation ? { explanation } : {}),
    ...(diagram ? { diagram } : {})
  };
}

// Function to export file
function exportTestFile(testNum, questions) {
  const content = `import { TestQuestion } from "../../types/tests";

/**
 * TESTE ${testNum} OFICIAL DGRM / IPTM
 * 30 Perguntas na Ordem Exata do Enunciado Oficial
 */
export const TEST_${testNum}_QUESTIONS: TestQuestion[] = ${JSON.stringify(questions, null, 2)};
`;
  fs.writeFileSync(`src/data/tests/test${testNum}.ts`, content);
  console.log(`Generated src/data/tests/test${testNum}.ts with ${questions.length} questions.`);
}

// =========================================================================
// TESTE 3
// =========================================================================
const t3 = [
  makeQ({
    id: 't3-q01', testNumber: 3, questionNumber: 1, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'multiple-choice', points: 1.0,
    statement: 'Das opções indicadas escolha a correta no que respeita a direito a rumo entre embarcações:',
    options: [
      'Toda a embarcação que alcança outra desvia-se dela ultrapassando-a por sotavento.',
      'Toda a embarcação que alcança outra desvia-se dela ultrapassando-a por barlavento.',
      'Toda a embarcação que alcança outra desvia-se dela de forma a não lhe tirar o vento.',
      'Toda a embarcação que alcança outra deve manter-se desimpedida do caminho da embarcação alcançada.'
    ],
    correctOptionIndex: 3,
    expectedAnswer: 'Toda a embarcação que alcança outra deve manter-se desimpedida do caminho da embarcação alcançada.',
    acceptedKeywords: ['manter-se desimpedida', 'desimpedida'],
    explanation: 'Regra 13 do RIEAM: Toda a embarcação que alcance outra deve manter-se desimpedida do caminho desta.'
  }),
  makeQ({
    id: 't3-q02', testNumber: 3, questionNumber: 2, category: 'RIEAM', subcategory: 'Abalroamentos', type: 'open-answer', points: 1.0,
    statement: 'Caso exista risco de colisão entre as embarcações A e B representadas na figura, a embarcação A tem direito a rumo porque:',
    expectedAnswer: 'A embarcação A tem direito a rumo porque está com capacidade de manobra reduzida.',
    acceptedKeywords: ['capacidade de manobra reduzida', 'manobra reduzida'],
    explanation: 'Regra 18 do RIEAM: Embarcação com capacidade de manobra reduzida tem prioridade.',
    diagram: { type: 'vessel-crossing', variant: 'crossing-a-standon' }
  }),
  makeQ({
    id: 't3-q03', testNumber: 3, questionNumber: 3, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio a rebocar durante o dia, com um comprimento de reboque superior a 200 metros, deve apresentar:',
    options: [
      'Dois balões bicónicos de cor preta.',
      'Dois balões esféricos de cor preta.',
      'Três balões esféricos de cor preta.',
      'Um balão bicónico de cor preta onde melhor possa ser visto.'
    ],
    correctOptionIndex: 3,
    expectedAnswer: 'Um balão bicónico de cor preta onde melhor possa ser visto.',
    acceptedKeywords: ['bicónico', 'bicónico de cor preta'],
    explanation: 'Regra 24(a)(v) e 24(e) do RIEAM: Reboque superior a 200 metros exibe de dia uma marca bicónica preta.'
  }),
  makeQ({
    id: 't3-q04', testNumber: 3, questionNumber: 4, category: 'RIEAM', subcategory: 'Balões e Marcas Diurnas', type: 'multiple-choice', points: 1.0,
    statement: 'Avista um navio pelo seu bombordo (BB) com marca diurna de navio condicionado pelo calado e verifica estar em rota de colisão. Tem que manobrar?',
    options: [
      'Sim, porque um navio condicionado pelo seu calado tem prioridade de rumo sobre embarcações normais.',
      'Não, porque navios que se aproximam por bombordo nunca têm prioridade.',
      'Não, apenas manobra se for um veleiro.',
      'Depende da velocidade do vento.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Sim, porque o navio condicionado pelo seu calado não pode desviar-se em segurança da rota do canal.',
    acceptedKeywords: ['sim', 'condicionado pelo calado'],
    explanation: 'Regra 18(d) do RIEAM: Qualquer navio que não seja desgovernado ou de capacidade de manobra reduzida deve evitar cortar a proa de navio condicionado pelo seu calado.'
  }),
  makeQ({
    id: 't3-q05', testNumber: 3, questionNumber: 5, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio de propulsão mecânica (comprimento inferior a 100m) fundeado com visibilidade reduzida deve emitir:',
    options: [
      'Toques de sino em cadência rápida durante cerca de 5 segundos com intervalos não superiores a 1 minuto.',
      'Toques de sino em cadência rápida durante cerca de 10 segundos com intervalos não superiores a 1 minuto.',
      'Toques de sino em cadência rápida durante cerca de 10 segundos com intervalos não superiores a 2 minutos.',
      'Toques de sino em cadência rápida durante cerca de 5 segundos com intervalos não superiores a 2 minutos.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Toques de sino em cadência rápida durante cerca de 5 segundos com intervalos não superiores a 1 minuto.',
    acceptedKeywords: ['5 segundos', '1 minuto', 'toques de sino'],
    explanation: 'Regra 35(g) do RIEAM: Navio fundeado em visibilidade reduzida toca o sino rapidamente durante 5 segundos a intervalos não superiores a um minuto.'
  }),
  makeQ({
    id: 't3-q06', testNumber: 3, questionNumber: 6, category: 'RIEAM', subcategory: 'Sinais Sonoros e Luminosos', type: 'multiple-choice', points: 1.0,
    statement: 'Um navio na faina da pesca e com visibilidade reduzida deve emitir o seguinte sinal sonoro:',
    options: [
      'Um som curto com intervalos não superiores a dois minutos.',
      'Dois sons longos com intervalos não superiores a dois minutos.',
      'Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.',
      'Três sons curtos com intervalos não superiores a dois minutos.'
    ],
    correctOptionIndex: 2,
    expectedAnswer: 'Um som prolongado seguido de dois curtos com intervalos não superiores a dois minutos.',
    acceptedKeywords: ['prolongado seguido de dois curtos', 'dois minutos'],
    explanation: 'Regra 35(c) do RIEAM: Navio na faina da pesca emite um som prolongado seguido de dois curtos (— · ·).'
  }),
  makeQ({
    id: 't3-q07', testNumber: 3, questionNumber: 7, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'open-answer', points: 1.0,
    statement: 'Em caso de alagamento da embarcação, quais são as três primeiras ações imediatas a tomar?',
    expectedAnswer: '1. Parar máquinas / acionar bombas de esgoto; 2. Localizar o rombo de água e tentar estancá-lo; 3. Emitir pedido de socorro (VHF canal 16 / Mayday) e vestir coletes salva-vidas.',
    acceptedKeywords: ['bombas de esgoto', 'estancar rombo', 'coletes', 'socorro', 'parar'],
    explanation: 'As prioridades no alagamento são a salvaguarda das vidas (coletes), esgoto e contenção da entrada de água, e comunicação do socorro.'
  }),
  makeQ({
    id: 't3-q08', testNumber: 3, questionNumber: 8, category: 'Segurança e Primeiros Socorros', subcategory: 'Segurança e Salvamento', type: 'multiple-choice', points: 1.0,
    statement: 'Qual dos sinais pirotécnicos de socorro deve ser preferencialmente utilizado durante o dia?',
    options: [
      'Sinal fumígeno flutuante cor-de-laranja.',
      'Very-light de luz vermelha.',
      'Facho de mão de luz branca.',
      'Foguete com paraquedas com luz vermelha apenas.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Sinal fumígeno flutuante cor-de-laranja.',
    acceptedKeywords: ['fumígeno', 'fumígeno flutuante', 'laranja'],
    explanation: 'O sinal fumígeno emite uma nuvem densa de fumo cor-de-laranja altamente visível durante o dia sem encandear aeronaves de resgate.'
  }),
  makeQ({
    id: 't3-q09', testNumber: 3, questionNumber: 9, category: 'Segurança e Primeiros Socorros', subcategory: 'Combate a Incêndios', type: 'multiple-choice', points: 1.0,
    statement: 'Se for detetado um incêndio a bordo num compartimento fechado, deve-se de imediato:',
    options: [
      'Fechar o compartimento de modo a cortar a entrada de oxigénio (comburente).',
      'Ventilar o compartimento de modo a não acumular gases.',
      'Ventilar o compartimento de modo a arrefecer o mesmo.',
      'Abrir o compartimento de modo a permitir o combate com ar fresco.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Fechar o compartimento de modo a cortar a entrada de oxigénio (comburente).',
    acceptedKeywords: ['fechar o compartimento', 'cortar oxigénio', 'oxigénio'],
    explanation: 'O isolamento e estanquidade cortam o oxigénio e limitam a propagação do fogo aos restantes compartimentos.'
  }),
  makeQ({
    id: 't3-q10', testNumber: 3, questionNumber: 10, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Num adulto saudável considera-se como normal uma frequência respiratória em repouso de:',
    options: [
      '30 a 35 ciclos por minuto.',
      '60 a 65 ciclos por minuto.',
      '16 a 18 ciclos por minuto.',
      '08 a 10 ciclos por minuto.'
    ],
    correctOptionIndex: 2,
    expectedAnswer: '16 a 18 ciclos por minuto.',
    acceptedKeywords: ['16 a 18', '16 a 20'],
    explanation: 'Em repouso, a frequência respiratória de um adulto normal varia entre 12 a 20 ciclos por minuto (média 16 a 18).'
  }),
  makeQ({
    id: 't3-q11', testNumber: 3, questionNumber: 11, category: 'Segurança e Primeiros Socorros', subcategory: 'Primeiros Socorros', type: 'multiple-choice', points: 0.5,
    statement: 'Numa hemorragia externa deve-se:',
    options: [
      'Fazer o tamponamento com uma compressa, envolvendo-a com uma ligadura apertada.',
      'Fazer o tamponamento com uma compressa, envolvendo-a com uma compressa solta.',
      'Fazer o tamponamento com algodão hidrófilo e aplicar gelo.',
      'Aplicar imediatamente garrote acima da articulação.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Fazer o tamponamento com uma compressa, envolvendo-a com uma ligadura apertada.',
    acceptedKeywords: ['tamponamento', 'compressa', 'ligadura apertada'],
    explanation: 'O penso compressivo com compressa esterilizada e ligadura elástica mantém a hemostase por compressão contínua.'
  }),
  makeQ({
    id: 't3-q12', testNumber: 3, questionNumber: 12, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'A expressão marinheira "a pique de estai" significa que:',
    expectedAnswer: 'A amarra está esticada na vertical (a 90° com a superfície), com o ferro exatamente por baixo da proa prestes a arrancar do fundo.',
    acceptedKeywords: ['vertical', 'ferro por baixo da proa', 'amarra na vertical'],
    explanation: 'Diz-se que a amarra está a pique de estai quando foi recolhida até à vertical da âncora, antecedendo o suspender.'
  }),
  makeQ({
    id: 't3-q13', testNumber: 3, questionNumber: 13, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'Dos termos abaixo, indique três que compõem uma âncora de Almirantado: Cepo, Mísula, Moleteira, Haste, Anete, Arganéu.',
    expectedAnswer: 'Cepo, Haste, Anete (ou Braços, Unhas).',
    acceptedKeywords: ['cepo', 'haste', 'anete', 'braços', 'unhas'],
    explanation: 'A âncora tipo Almirantado é composta por haste, cepo transversal, braços curvos, unhas e anete.'
  }),
  makeQ({
    id: 't3-q14', testNumber: 3, questionNumber: 14, category: 'Marinharia', subcategory: 'Âncoras e Fundeio', type: 'open-answer', points: 0.5,
    statement: 'À manobra de recolha da amarra, isto é, de levantar a âncora do fundo para a embarcação, dá-se o nome de:',
    expectedAnswer: 'Suspender (ou virar amarra / alar o ferro).',
    acceptedKeywords: ['suspender', 'virar amarra', 'alar'],
    explanation: 'Suspender o ferro é a manobra de desferrar a âncora e recolhê-la a bordo.'
  }),
  makeQ({
    id: 't3-q15', testNumber: 3, questionNumber: 15, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'A desatracação de uma embarcação com vento forte contra o cais deve ser efetuada:',
    options: [
      'Abrindo a popa e saindo à ré (largando os cabos de ré e dando motor à vante sobre a regeira de vante).',
      'Abrindo a proa e saindo à vante a toda a velocidade.',
      'Largando todos os cabos em simultâneo.',
      'Dando motor à ré a direito sem auxílio de cabos.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Abrindo a popa e saindo à ré com apoio da regeira de vante.',
    acceptedKeywords: ['abrindo a popa', 'regeira de vante', 'saindo à ré'],
    explanation: 'Com vento contra o cais, roda-se a popa para fora usando a regeira de vante com defesa na bochecha, permitindo recuar livre do cais.'
  }),
  makeQ({
    id: 't3-q16', testNumber: 3, questionNumber: 16, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'Partindo do repouso, uma embarcação com hélice de passo direito em marcha lenta à vante:',
    options: [
      'Guina mais facilmente para Bombordo (BB) do que para Estibordo (EB).',
      'Guina mais facilmente para Estibordo (EB) do que para Bombordo (BB).',
      'Guina com igual facilidade para qualquer dos bordos.',
      'Não sofre qualquer influência do passo do hélice.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Guina mais facilmente para Bombordo (BB) do que para Estibordo (EB).',
    acceptedKeywords: ['bombordo', 'bb', 'mais facilmente para bb'],
    explanation: 'A baixa velocidade o efeito de pás do hélice de passo direito desvia a popa para estibordo e a proa guina naturalmente para bombordo.'
  }),
  makeQ({
    id: 't3-q17', testNumber: 3, questionNumber: 17, category: 'Marinharia', subcategory: 'Manobras e Amarração', type: 'multiple-choice', points: 0.5,
    statement: 'A força exercida sobre a porta do leme é tanto maior:',
    options: [
      'Quanto maior for a velocidade da embarcação em relação à água.',
      'Quanto menor for a velocidade.',
      'Quanto menor for a área do leme.',
      'Quanto menor for o ângulo de ataque.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Quanto maior for a velocidade da embarcação em relação à água.',
    acceptedKeywords: ['maior a velocidade', 'velocidade'],
    explanation: 'A pressão hidrodinâmica varia com o quadrado da velocidade do escoamento da água no leme.'
  }),
  makeQ({
    id: 't3-q18', testNumber: 3, questionNumber: 18, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'Ao cabo fixo num arganéu de proa que serve para amarrar a embarcação ao cais ou reboque dá-se o nome de:',
    options: [
      'Regeira.',
      'Boça.',
      'Cabo de adriça.',
      'Defensa.'
    ],
    correctOptionIndex: 1,
    expectedAnswer: 'Boça.',
    acceptedKeywords: ['boça', 'boca'],
    explanation: 'A boça é o cabo curto preso permanentemente à proa para amarração rápida ou reboque curto.'
  }),
  makeQ({
    id: 't3-q19', testNumber: 3, questionNumber: 19, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'O plano vertical transversal que se designa por Meia-Nau divide a embarcação em duas partes principais que são:',
    options: [
      'Bombordo e Estibordo.',
      'Amuras e Alhetas.',
      'Proa e Ré.',
      'Obras vivas e Obras mortas.'
    ],
    correctOptionIndex: 2,
    expectedAnswer: 'Proa e Ré.',
    acceptedKeywords: ['proa e ré', 'vante e ré'],
    explanation: 'A secção mestra ou plano de meia-nau divide a embarcação a meio do seu comprimento em vante (proa) e ré.'
  }),
  makeQ({
    id: 't3-q20', testNumber: 3, questionNumber: 20, category: 'Marinharia', subcategory: 'Nomenclatura da Embarcação', type: 'multiple-choice', points: 0.5,
    statement: 'Às partes curvas das obras mortas do costado situadas de um e do outro lado da roda de proa dá-se o nome de:',
    options: [
      'Amuras.',
      'Alhetas.',
      'Querena.',
      'Cadaste.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: 'Amuras.',
    acceptedKeywords: ['amuras', 'amura'],
    explanation: 'As amuras correspondem às zonas curvas da proa entre a roda de proa e o través.'
  }),
  makeQ({
    id: 't3-q21', testNumber: 3, questionNumber: 21, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Quando se passa a amarração ao cais devem-se deixar os cabos suficientemente folgados porque desse modo:',
    options: [
      'Evita-se a entrada de roedores ou sujidade.',
      'Os cabos não ficam demasiado espertos (esticados) em consequência da descida da maré.',
      'Facilita a drenagem da água do convés.',
      'Diminui o consumo do motor.'
    ],
    correctOptionIndex: 1,
    expectedAnswer: 'Os cabos não ficam demasiado espertos (esticados) em consequência da descida da maré.',
    acceptedKeywords: ['maré', 'espertos', 'esticados'],
    explanation: 'A oscilação da maré pode partir cabos esticados à preia-mar quando a água desce para a baixamar.'
  }),
  makeQ({
    id: 't3-q22', testNumber: 3, questionNumber: 22, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'A um cabo de pequena bitola e leve com uma pinha ou peso numa das pontas para facilitar o arremesso para o cais chama-se:',
    options: [
      'Espia.',
      'Cabo solteiro.',
      'Retenida.',
      'Amantilho.'
    ],
    correctOptionIndex: 2,
    expectedAnswer: 'Retenida.',
    acceptedKeywords: ['retenida'],
    explanation: 'A retenida é a linha de arremesso que permite puxar a espia mais grossa para terra.'
  }),
  makeQ({
    id: 't3-q23', testNumber: 3, questionNumber: 23, category: 'Marinharia', subcategory: 'Cabos e Nós', type: 'multiple-choice', points: 0.5,
    statement: 'Os cabos de laborar que servem especificamente para içar as velas têm o nome de:',
    options: [
      'Escotas.',
      'Adriças.',
      'Brandais.',
      'Amantilhos.'
    ],
    correctOptionIndex: 1,
    expectedAnswer: 'Adriças.',
    acceptedKeywords: ['adriças', 'adricas'],
    explanation: 'As adriças içam panos e vergas, enquanto as escotas caçam ou folgam a esteira da vela.'
  }),
  makeQ({
    id: 't3-q24', testNumber: 3, questionNumber: 24, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'Complete a frase: O titular da carta de Patrão de Alto Mar está habilitado ao comando de uma embarcação de recreio a navegar em ____.',
    expectedAnswer: 'Navegação sem limite de área (em qualquer oceano ou mar do mundo).',
    acceptedKeywords: ['sem limite', 'sem limite de área', 'oceânica'],
    explanation: 'A carta de Patrão de Alto Mar é o grau máximo da náutica de recreio em Portugal, sem qualquer restrição de distância ou dimensão.'
  }),
  makeQ({
    id: 't3-q25', testNumber: 3, questionNumber: 25, category: 'Outras Matérias', subcategory: 'Legislação Marítima', type: 'open-answer', points: 0.6,
    statement: 'Complete a frase: O titular da carta de Patrão de Costa está habilitado ao comando de uma embarcação de recreio a navegar até uma distância da costa que não exceda ____ milhas.',
    expectedAnswer: '25 milhas da costa (e até 40 milhas de um porto de abrigo).',
    acceptedKeywords: ['25', '25 milhas'],
    explanation: 'Artigo 34.º do RNR: Patrão de Costa tem como limite 25 milhas da linha de costa.'
  }),
  makeQ({
    id: 't3-q26', testNumber: 3, questionNumber: 26, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'multiple-choice', points: 0.6,
    statement: 'Relativamente às marés, durante a fase de Quarto Minguante ocorrem habitualmente:',
    options: [
      'Marés vivas (de sizígia).',
      'Marés mortas (de quadratura).',
      'Marés extraordinárias de equinócio.',
      'Não há variação de maré.'
    ],
    correctOptionIndex: 1,
    expectedAnswer: 'Marés mortas (de quadratura).',
    acceptedKeywords: ['marés mortas', 'quadratura'],
    explanation: 'Nos quartos minguante e crescente a Lua e o Sol formam 90°, reduzindo a atração gravitacional e originando marés mortas com menor amplitude.'
  }),
  makeQ({
    id: 't3-q27', testNumber: 3, questionNumber: 27, category: 'Outras Matérias', subcategory: 'Marés e Navegação', type: 'open-answer', points: 0.6,
    statement: 'Como determina a fórmula do valor da Sonda à hora (altura total da água no local)?',
    expectedAnswer: 'Sonda à Hora = Sonda Reduzida (da carta náutica) + Altura da Maré (àquela hora específica).',
    acceptedKeywords: ['sonda reduzida + altura da maré', 'sr + hm', 'sonda reduzida'],
    explanation: 'Sonda à Hora = SR + Hm. Se a sonda cartográfica for negativa (secante), subtrai-se à altura da maré.'
  }),
  makeQ({
    id: 't3-q28', testNumber: 3, questionNumber: 28, category: 'Outras Matérias', subcategory: 'Motores e Mecânica', type: 'multiple-choice', points: 0.5,
    statement: 'Um motor a gasóleo não arranca apesar de rodar no motor de arranque. Indique a causa mais provável:',
    options: [
      'Sobreaquecimento da água doce.',
      'Diminuição da carga de ar nos cilindros.',
      'Nível de óleo baixo no cárter.',
      'Ar no circuito de injeção de combustível.'
    ],
    correctOptionIndex: 3,
    expectedAnswer: 'Ar no circuito de injeção de combustível.',
    acceptedKeywords: ['ar no circuito', 'combustível'],
    explanation: 'Os motores diesel dependem de alta pressão e incompressibilidade do líquido; havendo bolhas de ar nos injetores é necessário purgar o circuito.'
  }),
  makeQ({
    id: 't3-q29', testNumber: 3, questionNumber: 29, category: 'Outras Matérias', subcategory: 'Balizagem', type: 'multiple-choice', points: 0.6,
    statement: 'As marcas cardinais em que os dois cones pretos apontam ambos para baixo indicam que as águas navegáveis e seguras estão a:',
    options: [
      'Norte da marca.',
      'Sul da marca.',
      'Este da marca.',
      'Oeste da marca.'
    ],
    correctOptionIndex: 1,
    expectedAnswer: 'Sul da marca.',
    acceptedKeywords: ['sul', 'sul da marca'],
    explanation: 'Dois cones com os vértices para baixo representam o quadrante Sul do sistema IALA.'
  }),
  makeQ({
    id: 't3-q30', testNumber: 3, questionNumber: 30, category: 'Outras Matérias', subcategory: 'Meteorologia', type: 'multiple-choice', points: 0.5,
    statement: 'Na escala de Beaufort, à designação de força de vento "Fraco" (Força 2) corresponde uma velocidade de vento de:',
    options: [
      '4 a 6 nós.',
      '< 1 nó.',
      '41 a 47 nós.',
      '11 a 16 nós.'
    ],
    correctOptionIndex: 0,
    expectedAnswer: '4 a 6 nós.',
    acceptedKeywords: ['4 a 6 nós', '4 a 6'],
    explanation: 'Força 2 na escala de Beaufort corresponde a vento fraco (4 a 6 nós), com pequenas vagas que não chegam a rebentar.'
  })
];

exportTestFile(3, t3);
