import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDocFromServer,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without passing firestoreDatabaseId
// Configured with persistent local cache (IndexedDB) for seamless offline access and multi-tab synchronization
export const db = initializeFirestore(
  app,
  {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  },
  firebaseConfig.firestoreDatabaseId
);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection on boot as mandated by Firebase skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline. Check connectivity.');
    }
  }
}

// Google Sign-In via popup (safe inside iframe)
export async function signInWithGoogle() {
  try {
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error('Error signing in with Google:', err);
    throw err;
  }
}

// Email & Password Sign-In
export async function signInWithEmail(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return userCredential.user;
}

// Email & Password Registration
export async function registerWithEmail(email: string, password: string, displayName?: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName && displayName.trim()) {
    await updateProfile(userCredential.user, {
      displayName: displayName.trim(),
    });
  }
  return userCredential.user;
}

// Password reset
export async function sendResetPassword(email: string) {
  await sendPasswordResetEmail(auth, email.trim());
}

// Translate Firebase Auth error codes into Portuguese
export function formatAuthError(err: unknown): string {
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: string }).code;
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'E-mail ou palavra-passe incorretos.';
      case 'auth/email-already-in-use':
        return 'Já existe uma conta registada com este endereço de e-mail.';
      case 'auth/weak-password':
        return 'A palavra-passe deve ter pelo menos 6 carateres.';
      case 'auth/invalid-email':
        return 'Endereço de e-mail inválido.';
      case 'auth/too-many-requests':
        return 'Demasiadas tentativas falhadas. Por favor, tente mais tarde.';
      case 'auth/popup-closed-by-user':
        return 'A janela de autenticação foi fechada antes de concluir.';
      default:
        break;
    }
  }
  return err instanceof Error ? err.message : 'Ocorreu um erro na autenticação.';
}

export async function logOut() {
  await signOut(auth);
}

// Trigger initial boot test
testConnection();
