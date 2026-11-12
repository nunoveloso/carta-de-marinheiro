import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { ExamAttempt, WeakTopicAnalysis, MainCategory } from '../types/tests';

const LOCAL_STORAGE_KEY = 'nautical_user_exam_attempts_v1';

/**
 * Lê tentativas salvas localmente
 */
export function getLocalExamAttempts(): ExamAttempt[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ExamAttempt[];
  } catch (err) {
    console.error('Erro ao ler tentativas locais do exame:', err);
    return [];
  }
}

/**
 * Guarda tentativa no localStorage
 */
function saveLocalExamAttempt(attempt: ExamAttempt): void {
  try {
    const existing = getLocalExamAttempts();
    // Previne duplicação por ID
    const updated = [attempt, ...existing.filter((a) => a.id !== attempt.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Erro ao gravar tentativa local:', err);
  }
}

/**
 * Guarda uma tentativa de exame:
 * 1. Sempre no localStorage para resposta instantânea e suporte offline.
 * 2. No Firestore na coleção user-isolated caso o utilizador esteja autenticado.
 */
export async function saveExamAttempt(attempt: ExamAttempt): Promise<void> {
  // 1. Sempre local
  saveLocalExamAttempt(attempt);

  // 2. Se autenticado, grava no Firestore
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const attemptDocRef = doc(db, 'users', currentUser.uid, 'exam_attempts', attempt.id);
      await setDoc(attemptDocRef, {
        ...attempt,
        userId: currentUser.uid,
        userEmail: currentUser.email || undefined,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Não foi possível sincronizar tentativa com o Firestore:', err);
    }
  }
}

/**
 * Obtém todas as tentativas (unindo Firestore e localStorage)
 */
export async function getAllExamAttempts(): Promise<ExamAttempt[]> {
  const localAttempts = getLocalExamAttempts();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return localAttempts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }

  try {
    const colRef = collection(db, 'users', currentUser.uid, 'exam_attempts');
    const snapshot = await getDocs(colRef);
    const remoteAttempts: ExamAttempt[] = [];
    snapshot.forEach((d) => {
      remoteAttempts.push(d.data() as ExamAttempt);
    });

    // Unir sem duplicados
    const map = new Map<string, ExamAttempt>();
    for (const a of localAttempts) map.set(a.id, a);
    for (const a of remoteAttempts) map.set(a.id, a);

    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );

    // Atualiza local storage com dados mais recentes
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
    } catch {}

    return merged;
  } catch (err) {
    console.warn('Erro ao carregar tentativas do Firestore, a usar locais:', err);
    return localAttempts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }
}

/**
 * Analisa as tentativas do utilizador e deteta os tópicos/subcategorias
 * com maior índice de erros para orientar o estudo.
 */
export function analyzeWeakTopics(attempts: ExamAttempt[]): WeakTopicAnalysis[] {
  if (!attempts || attempts.length === 0) return [];

  // Mapear desempenho por subcategoria
  const statsMap = new Map<
    string,
    {
      category: MainCategory;
      totalEncountered: number;
      failedCount: number;
      sampleStatements: string[];
    }
  >();

  for (const attempt of attempts) {
    // 1. Processar perguntas falhadas
    if (attempt.failedQuestions) {
      for (const failed of attempt.failedQuestions) {
        const key = failed.subcategory || 'Geral';
        const curr = statsMap.get(key) || {
          category: failed.category,
          totalEncountered: 0,
          failedCount: 0,
          sampleStatements: [],
        };
        curr.failedCount += 1;
        if (!curr.sampleStatements.includes(failed.statement) && curr.sampleStatements.length < 3) {
          curr.sampleStatements.push(failed.statement);
        }
        statsMap.set(key, curr);
      }
    }

    // 2. Processar total de perguntas respondidas
    if (attempt.categoryBreakdown) {
      // Cada exame oficial tem 30 perguntas com distribuição conhecida
    }
  }

  const results: WeakTopicAnalysis[] = [];

  statsMap.forEach((val, subcategory) => {
    // Estima total de perguntas encontradas nessa subcategoria (pelo menos igual aos erros)
    const total = Math.max(val.totalEncountered, val.failedCount);
    const failureRate = total > 0 ? Math.round((val.failedCount / total) * 100) : 0;

    results.push({
      subcategory,
      category: val.category,
      totalEncountered: total,
      failedCount: val.failedCount,
      failureRate,
      sampleStatements: val.sampleStatements,
    });
  });

  // Ordenar decrescente pelo número de falhas
  return results.sort((a, b) => b.failedCount - a.failedCount);
}
