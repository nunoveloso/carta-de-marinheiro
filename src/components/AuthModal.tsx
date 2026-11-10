import React, { useState } from 'react';
import {
  X,
  LogIn,
  LogOut,
  CheckCircle2,
  Cloud,
  Database,
  Star,
  FileText,
  RefreshCw,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  sendResetPassword,
  formatAuthError,
  logOut,
} from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
  bookmarksCount: number;
  notesCount: number;
  onSeedFirestore: () => Promise<void>;
  isSeeding: boolean;
}

type AuthTab = 'login' | 'register' | 'forgot_password';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  bookmarksCount,
  notesCount,
  onSeedFirestore,
  isSeeding,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [seedSuccess, setSeedSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAuthError('');
    setAuthSuccess('');
    setShowPassword(false);
  };

  const handleSwitchTab = (tab: AuthTab) => {
    setAuthError('');
    setAuthSuccess('');
    setActiveTab(tab);
  };

  // 1. Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setAuthError('');
      await signInWithGoogle();
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setAuthError(formatAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Email Sign-In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setAuthError('Por favor preencha o seu e-mail e palavra-passe.');
      return;
    }

    try {
      setIsLoading(true);
      setAuthError('');
      await signInWithEmail(email, password);
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setAuthError(formatAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Email Registration
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setAuthError('Por favor preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setAuthError('A palavra-passe deve conter pelo menos 6 carateres.');
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('As palavras-passe não coincidem. Verifique a confirmação.');
      return;
    }

    try {
      setIsLoading(true);
      setAuthError('');
      await registerWithEmail(email, password, name.trim());
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setAuthError(formatAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Password Reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setAuthError('Por favor introduza o seu endereço de e-mail.');
      return;
    }

    try {
      setIsLoading(true);
      setAuthError('');
      await sendResetPassword(email);
      setAuthSuccess(
        'Enviámos uma mensagem para o seu e-mail com as instruções para redefinir a palavra-passe.'
      );
    } catch (err) {
      console.error(err);
      setAuthError(formatAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logOut();
    resetForm();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#112338]/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-[#ded5c2] bg-[#fdfbf7] p-6 shadow-xl text-[#1e293b] my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ded5c2]">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-[#f4efe4] p-2 text-[#112338] border border-[#ded5c2]">
              <Cloud className="w-5 h-5 text-[#a16207]" />
            </div>
            <div>
              <h3 className="font-maritime text-2xl font-bold text-[#112338]">Conta & Sincronização</h3>
              <p className="text-[11px] text-[#64748b]">Firebase: carta-de-marinheiro</p>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="rounded-xl p-1.5 text-[#64748b] hover:text-[#112338] hover:bg-[#eae3d2] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications */}
        {authError && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-xs text-[#991b1b]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{authError}</div>
          </div>
        )}

        {authSuccess && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] p-3 text-xs text-[#166534]">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{authSuccess}</div>
          </div>
        )}

        {currentUser ? (
          /* Logged In View */
          <div className="mt-5 space-y-5">
            {/* User Profile Card */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-[#f4efe4] p-4 border border-[#ded5c2]">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || ''}
                  className="h-12 w-12 rounded-full border border-[#ded5c2]"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#112338] font-bold text-lg text-[#d4af37]">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'M'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-[#112338] truncate text-sm sm:text-base">
                  {currentUser.displayName || 'Marinheiro'}
                </h4>
                <p className="text-xs text-[#64748b] truncate">{currentUser.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-[#15803d] font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Sessão Ativa no Firebase
                </span>
              </div>
            </div>

            {/* Study Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-3.5 border border-[#ded5c2] text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1.5 text-[#d97706] mb-1">
                  <Star className="w-4 h-4 fill-[#d97706]" />
                  <span className="font-maritime text-2xl font-bold text-[#112338]">{bookmarksCount}</span>
                </div>
                <div className="text-[11px] text-[#64748b] font-medium">Termos Favoritos</div>
              </div>

              <div className="rounded-2xl bg-white p-3.5 border border-[#ded5c2] text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1.5 text-[#0f766e] mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="font-maritime text-2xl font-bold text-[#112338]">{notesCount}</span>
                </div>
                <div className="text-[11px] text-[#64748b] font-medium">Notas Guardadas</div>
              </div>
            </div>

            {/* Cloud Firestore Info */}
            <div className="rounded-2xl bg-[#f7f4ea] p-4 border border-[#e8dfcf] text-xs text-[#334155] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#112338]">
                <Database className="w-4 h-4 text-[#a16207]" />
                <span>Base de Dados Cloud Firestore</span>
              </div>
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                As suas anotações, favoritos e progresso de estudo estão sincronizados de forma segura no projeto <strong className="text-[#112338]">carta-de-marinheiro</strong>.
              </p>

              <button
                onClick={handleTriggerSeed}
                disabled={isSeeding}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-[#ded5c2] px-3 py-2 text-xs font-semibold text-[#112338] hover:bg-[#f4efe4] transition shadow-2xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                <span>{isSeeding ? 'A sincronizar...' : 'Sincronizar Termos com Firestore'}</span>
              </button>

              {seedSuccess && (
                <p className="text-[11px] text-[#15803d] text-center font-semibold">
                  ✓ Termos sincronizados com sucesso no Cloud Firestore!
                </p>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#ded5c2] py-2.5 text-xs font-semibold text-[#b91c1c] hover:bg-[#fef2f2] hover:border-[#fecaca] transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminar Sessão</span>
            </button>
          </div>
        ) : (
          /* Authentication Views (Not Logged In) */
          <div className="mt-5 space-y-4">
            
            {/* View Switcher Tabs (when not in forgot password mode) */}
            {activeTab !== 'forgot_password' ? (
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#f4efe4] p-1 border border-[#ded5c2]">
                <button
                  type="button"
                  onClick={() => handleSwitchTab('login')}
                  className={`rounded-lg py-1.5 text-xs font-bold transition cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                      : 'text-[#64748b] hover:text-[#112338]'
                  }`}
                >
                  Iniciar Sessão
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchTab('register')}
                  className={`rounded-lg py-1.5 text-xs font-bold transition cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                      : 'text-[#64748b] hover:text-[#112338]'
                  }`}
                >
                  Criar Conta
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleSwitchTab('login')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#a16207] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar ao início de sessão</span>
              </button>
            )}

            {/* TAB 1: LOGIN COM EMAIL & PALAVRA-PASSE */}
            {activeTab === 'login' && (
              <form onSubmit={handleEmailSignIn} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Endereço de e-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marinheiro@exemplo.pt"
                      required
                      className="w-full rounded-xl border border-[#ded5c2] bg-white py-2 pl-9 pr-3 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-[#475569]">
                      Palavra-passe
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSwitchTab('forgot_password')}
                      className="text-[11px] text-[#a16207] hover:underline font-medium cursor-pointer"
                    >
                      Esqueceu-se da palavra-passe?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="A sua palavra-passe"
                      required
                      className="w-full rounded-xl border border-[#ded5c2] bg-white py-2 pl-9 pr-10 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#112338]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#112338] py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#fbf8f2] shadow-sm hover:bg-[#1c3858] transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'A entrar...' : 'Iniciar Sessão'}</span>
                </button>
              </form>
            )}

            {/* TAB 2: CRIAR CONTA COM EMAIL */}
            {activeTab === 'register' && (
              <form onSubmit={handleEmailRegister} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Nome ou Designação Náutica <span className="text-[#94a3b8] font-normal">(opcional)</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ex: Comandante Silva"
                      className="w-full rounded-xl border border-[#ded5c2] bg-white py-2 pl-9 pr-3 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Endereço de e-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marinheiro@exemplo.pt"
                      required
                      className="w-full rounded-xl border border-[#ded5c2] bg-white py-2 pl-9 pr-3 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Palavra-passe (mín. 6 carateres) *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 carateres"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-[#ded5c2] bg-white py-2 pl-9 pr-10 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#112338]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Confirmar palavra-passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a palavra-passe"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-[#ded5c2] bg-white py-2 pl-9 pr-3 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#112338] py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#fbf8f2] shadow-sm hover:bg-[#1c3858] transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isLoading ? 'A criar conta...' : 'Registar Conta'}</span>
                </button>
              </form>
            )}

            {/* TAB 3: RECUPERAR PALAVRA-PASSE */}
            {activeTab === 'forgot_password' && (
              <form onSubmit={handlePasswordReset} className="space-y-3.5">
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Introduza o e-mail associado à sua conta. Enviaremos uma ligação direta para redefinir a sua palavra-passe com toda a segurança.
                </p>

                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Endereço de e-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marinheiro@exemplo.pt"
                      required
                      className="w-full rounded-xl border border-[#ded5c2] bg-white py-2 pl-9 pr-3 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#112338] py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#fbf8f2] shadow-sm hover:bg-[#1c3858] transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isLoading ? 'A enviar...' : 'Enviar Ligação de Recuperação'}</span>
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#ded5c2]" />
              </div>
              <span className="relative bg-[#fdfbf7] px-3 text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">
                ou
              </span>
            </div>

            {/* Alternative: Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white border border-[#ded5c2] py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#1e293b] shadow-xs hover:bg-[#f7f3e8] transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
              <span>Continuar com Google</span>
            </button>

            <div className="rounded-xl bg-[#f4efe4] p-2.5 border border-[#ded5c2] text-[10px] text-[#64748b] text-center">
              🔒 Autenticação oficial gerida pelo Firebase Auth no projeto <strong>carta-de-marinheiro</strong>.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
