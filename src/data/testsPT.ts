import { TestQuestion } from '../types/tests';
import { TEST_1_QUESTIONS } from './tests/test1';
import { TEST_2_QUESTIONS } from './tests/test2';
import { TEST_3_QUESTIONS } from './tests/test3';
import { TEST_4_QUESTIONS } from './tests/test4';
import { TEST_5_QUESTIONS } from './tests/test5';
import { TEST_6_QUESTIONS } from './tests/test6';
import { TEST_7_QUESTIONS } from './tests/test7';
import { TEST_8_QUESTIONS } from './tests/test8';
import { TEST_9_QUESTIONS } from './tests/test9';
import { TEST_10_QUESTIONS } from './tests/test10';
import { TEST_11_QUESTIONS } from './tests/test11';
import { TEST_12_QUESTIONS } from './tests/test12';
import { TEST_13_QUESTIONS } from './tests/test13';

// Re-export individual test question lists
export {
  TEST_1_QUESTIONS,
  TEST_2_QUESTIONS,
  TEST_3_QUESTIONS,
  TEST_4_QUESTIONS,
  TEST_5_QUESTIONS,
  TEST_6_QUESTIONS,
  TEST_7_QUESTIONS,
  TEST_8_QUESTIONS,
  TEST_9_QUESTIONS,
  TEST_10_QUESTIONS,
  TEST_11_QUESTIONS,
  TEST_12_QUESTIONS,
  TEST_13_QUESTIONS,
};

/**
 * Mapeamento oficial dos 13 Exames DGRM / IPTM:
 * Cada teste contém rigorosamente 30 perguntas na ordem estrita de 1 a 30 dos respetivos enunciados oficiais.
 */
export const ALL_OFFICIAL_TESTS: Record<number, TestQuestion[]> = {
  1: TEST_1_QUESTIONS,
  2: TEST_2_QUESTIONS,
  3: TEST_3_QUESTIONS,
  4: TEST_4_QUESTIONS,
  5: TEST_5_QUESTIONS,
  6: TEST_6_QUESTIONS,
  7: TEST_7_QUESTIONS,
  8: TEST_8_QUESTIONS,
  9: TEST_9_QUESTIONS,
  10: TEST_10_QUESTIONS,
  11: TEST_11_QUESTIONS,
  12: TEST_12_QUESTIONS,
  13: TEST_13_QUESTIONS,
};

/**
 * Base de dados consolidada e desduplicada (testsPT):
 * Agrupa todas as perguntas dos 13 exames, evitando repetições exatas de enunciados.
 */
function buildDeduplicatedPool(): TestQuestion[] {
  const pool: TestQuestion[] = [];
  const seenStatements = new Set<string>();

  for (let t = 1; t <= 13; t++) {
    const questions = ALL_OFFICIAL_TESTS[t] || [];
    for (const q of questions) {
      // Normalização para deteção de duplicados
      const key = q.statement.trim().toLowerCase().slice(0, 70);
      if (!seenStatements.has(key)) {
        seenStatements.add(key);
        pool.push(q);
      }
    }
  }
  return pool;
}

export const testsPT: TestQuestion[] = buildDeduplicatedPool();

/**
 * Gera um exame oficial com exatamente 30 perguntas respeitando a ordem estrita (1 a 30):
 * - Se fornecido testNumber (1 a 13), retorna o teste oficial correspondente com as suas 30 perguntas na ordem original.
 * - Se omitido, gera um exame balanceado onde cada posição (1 a 30) respeita a respetiva categoria e subcategoria oficial.
 */
export function generateOfficialExam(testNumber?: number): TestQuestion[] {
  if (testNumber && ALL_OFFICIAL_TESTS[testNumber]) {
    // Retorna cópia das 30 perguntas na ordem exata do enunciado oficial
    return ALL_OFFICIAL_TESTS[testNumber].map((q) => ({ ...q }));
  }

  // Exame Aleatório Balanceado de 30 perguntas:
  // Para cada posição i (1 a 30), escolhe aleatoriamente entre as perguntas dessa posição nos 13 testes
  const exam: TestQuestion[] = [];
  for (let pos = 1; pos <= 30; pos++) {
    const candidates: TestQuestion[] = [];
    for (let t = 1; t <= 13; t++) {
      const q = ALL_OFFICIAL_TESTS[t]?.[pos - 1];
      if (q) candidates.push(q);
    }
    const chosen = candidates[Math.floor(Math.random() * candidates.length)] || TEST_1_QUESTIONS[pos - 1];
    exam.push({
      ...chosen,
      questionNumber: pos,
    });
  }

  return exam;
}
