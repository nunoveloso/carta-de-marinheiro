import React, { useState } from 'react';
import { X, LogIn, LogOut, CheckCircle2, Cloud, Database, Star, FileText, RefreshCw } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { signInWithGoogle, logOut } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
  bookmarksCount: number;
  notesCount: number;
  onSeedFirestore: () => Promise<void>;
  isSeeding: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  bookmarksCount,
  notesCount,
  onSeedFirestore,
  isSeeding,
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [seedSuccess, setSeedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setAuthError('');
      await signInWithGoogle();
      onClose();
    } catch (err) {
      console.error(err);
      setAuthError(
        err instanceof Error ? err.message : 'Falha na autenticação com a conta Google.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logOut();
    onClose();
  };

  const handleTriggerSeed = async () => {
    try {
      await onSeedFirestore();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-cyan-500/20 p-2 text-cyan-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Conta & Sincronização</h3>
              <p className="text-[11px] text-cyan-400">Firebase: carta-de-marinheiro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {authError && (
          <div className="mt-4 rounded-xl bg-rose-950/40 border border-rose-500/40 p-3 text-xs text-rose-300">
            {authError}
          </div>
        )}

        {currentUser ? (
          <div className="mt-5 space-y-5">
            {/* User Profile Card */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-slate-950/80 p-4 border border-slate-800">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || ''}
                  className="h-12 w-12 rounded-full border-2 border-cyan-500/40"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 font-bold text-lg text-white">
                  {currentUser.displayName ? currentUser.displayName[0] : 'M'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-white truncate text-sm sm:text-base">
                  {currentUser.displayName || 'Marinheiro'}
                </h4>
                <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Sessão Ativa
                </span>
              </div>
            </div>

            {/* Study Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-800/50 p-3.5 border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-lg font-black">{bookmarksCount}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Termos Favoritos</div>
              </div>

              <div className="rounded-2xl bg-slate-800/50 p-3.5 border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-lg font-black">{notesCount}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Notas Salvas</div>
              </div>
            </div>

            {/* Cloud Firestore Info */}
            <div className="rounded-2xl bg-cyan-950/30 p-4 border border-cyan-500/20 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-cyan-300">
                <Database className="w-4 h-4" />
                <span>Base de Dados Cloud Firestore</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                As suas anotações, favoritos e progresso de estudo estão vinculados de forma segura à sua conta no projeto <strong className="text-cyan-200">carta-de-marinheiro</strong>.
              </p>

              <button
                onClick={handleTriggerSeed}
                disabled={isSeeding}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-slate-700 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                <span>{isSeeding ? 'A sincronizar...' : 'Sincronizar Termos com Firestore'}</span>
              </button>

              {seedSuccess && (
                <p className="text-[11px] text-emerald-400 text-center font-medium">
                  ✓ Termos sincronizados com sucesso no Cloud Firestore!
                </p>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 hover:border-rose-500/40 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminar Sessão</span>
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Inicie sessão com a sua conta Google para guardar os seus termos favoritos, adicionar notas de estudo personalizadas e sincronizar o seu progresso no projeto Firebase <strong>carta-de-marinheiro</strong>.
            </p>

            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-3 px-4 text-xs sm:text-sm font-bold text-slate-900 shadow-xl hover:bg-slate-100 transition active:scale-95 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSigningIn ? 'A autenticar...' : 'Entrar com Google'}</span>
            </button>

            <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800 text-[11px] text-slate-400">
              🔒 Autenticação oficial gerida de forma segura pelo Firebase Auth no seu projeto.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
