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
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
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
  termsCount?: number;
}

type AuthTab = 'login' | 'register' | 'forgot_password';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  bookmarksCount,
  notesCount,
  termsCount = 225,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b3a55]/45 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-xs border border-[#0b3a55] bg-[#fcfbf8] shadow-[6px_6px_0_0_#0b3a55] text-[#0b3a55] my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header (Full-bleed chart-paper banner) */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#faf7f0] border-b border-[#d7d0c1]">
          <div className="flex items-center gap-3">
            <div className="rounded-xs bg-[#fcfbf8] p-2 text-[#0b3a55] border border-[#d7d0c1]">
              <Cloud className="w-5 h-5 text-[#9a7413]" />
            </div>
            <div>
              <h3 className="font-maritime text-2xl font-bold text-[#0b3a55] leading-tight">
                Conta &amp; Sincronização
              </h3>
              <p className="font-mono-naut text-[10px] uppercase tracking-[0.1em] text-[#4f6e82] mt-0.5">
                Caderno de Bordo • DGRM PT
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            aria-label="Fechar janela de autenticação"
            className="rounded-xs p-1.5 text-[#4f6e82] hover:text-[#0b3a55] hover:bg-[#ede9de] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Notifications */}
          {authError && (
            <div className="mb-4 flex items-start gap-2 rounded-xs bg-[#f3ded9] border border-[#b3402e] p-3 text-xs text-[#b3402e]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{authError}</div>
            </div>
          )}

          {authSuccess && (
            <div className="mb-4 flex items-start gap-2 rounded-xs bg-[#dcebe1] border border-[#1e7d4f] p-3 text-xs text-[#1e7d4f]">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{authSuccess}</div>
            </div>
          )}

          {currentUser ? (
            /* Logged In View */
            <div className="space-y-5">
              {/* User Profile Card */}
              <div className="flex items-center gap-3.5 rounded-xs bg-[#faf7f0] p-4 border border-[#d7d0c1]">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || ''}
                    className="h-12 w-12 rounded-xs border border-[#d7d0c1] object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-[#0b3a55] font-mono-naut font-bold text-lg text-[#ca9e1c]">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'M'}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-[#0b3a55] truncate text-sm sm:text-base">
                    {currentUser.displayName || 'Marinheiro'}
                  </h4>
                  <p className="font-mono-naut text-[11px] text-[#4f6e82] truncate">{currentUser.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1 font-mono-naut text-[10px] uppercase tracking-[0.06em] text-[#1e7d4f] font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Sessão Ativa
                  </span>
                </div>
              </div>

              {/* Study Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xs bg-[#faf7f0] p-3.5 border border-[#d7d0c1] text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[#ca9e1c] mb-1">
                    <Star className="w-4 h-4 fill-[#ca9e1c]" />
                    <span className="font-maritime text-2xl font-bold text-[#0b3a55] tabular-nums">{bookmarksCount}</span>
                  </div>
                  <div className="font-mono-naut text-[10px] uppercase tracking-[0.08em] text-[#4f6e82]">Favoritos</div>
                </div>

                <div className="rounded-xs bg-[#faf7f0] p-3.5 border border-[#d7d0c1] text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[#1e7d4f] mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="font-maritime text-2xl font-bold text-[#0b3a55] tabular-nums">{notesCount}</span>
                  </div>
                  <div className="font-mono-naut text-[10px] uppercase tracking-[0.08em] text-[#4f6e82]">Notas Guardadas</div>
                </div>
              </div>

              {/* Cloud Firestore Info */}
              <div className="rounded-xs bg-[#ede9de]/65 p-4 border border-[#d7d0c1] text-xs text-[#0b3a55] space-y-2">
                <div className="flex items-center justify-between font-bold text-[#0b3a55]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#9a7413]" />
                    <span>Sincronização na Nuvem</span>
                  </div>
                  <span className="flex items-center gap-1 font-mono-naut text-[10px] uppercase font-semibold text-[#1e7d4f]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
                  </span>
                </div>
                <p className="text-[11px] text-[#4f6e82] leading-relaxed">
                  Os <strong className="text-[#0b3a55]">{termsCount} termos oficiais</strong>, as suas anotações e favoritos estão guardados e sincronizados entre dispositivos.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-xs border border-[#b3402e]/50 bg-[#fcfbf8] py-2.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-semibold text-[#b3402e] hover:bg-[#f3ded9] hover:border-[#b3402e] transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Terminar Sessão</span>
              </button>
            </div>
          ) : (
            /* Authentication Views (Not Logged In) */
            <div className="space-y-4">
            
            {/* View Switcher Tabs (when not in forgot password mode) */}
            {activeTab !== 'forgot_password' ? (
              <div className="grid grid-cols-2 gap-1 rounded-xs bg-[#ede9de] p-1 border border-[#d7d0c1]">
                <button
                  type="button"
                  onClick={() => handleSwitchTab('login')}
                  className={`rounded-xs py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium transition cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-[#0b3a55] text-[#faf7f0]'
                      : 'text-[#4f6e82] hover:text-[#0b3a55]'
                  }`}
                >
                  Iniciar Sessão
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchTab('register')}
                  className={`rounded-xs py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium transition cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-[#0b3a55] text-[#faf7f0]'
                      : 'text-[#4f6e82] hover:text-[#0b3a55]'
                  }`}
                >
                  Criar Conta
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleSwitchTab('login')}
                className="flex items-center gap-1.5 font-mono-naut text-[11px] font-semibold text-[#9a7413] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar ao início de sessão</span>
              </button>
            )}

            {/* TAB 1: LOGIN COM EMAIL & PALAVRA-PASSE */}
            {activeTab === 'login' && (
              <form onSubmit={handleEmailSignIn} className="space-y-3.5">
                <div>
                  <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                    Endereço de e-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6e82]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marinheiro@exemplo.pt"
                      required
                      className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:bg-[#fcfbf8] focus:border-[#0b3a55] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82]">
                      Palavra-passe
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSwitchTab('forgot_password')}
                      className="text-[11px] text-[#9a7413] hover:text-[#0b3a55] hover:underline font-medium cursor-pointer transition-colors"
                    >
                      Esqueceu-se da palavra-passe?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6e82]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="A sua palavra-passe"
                      required
                      className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] py-2.5 pl-9 pr-10 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:bg-[#fcfbf8] focus:border-[#0b3a55] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4f6e82] hover:text-[#0b3a55] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xs bg-[#0b3a55] py-2.5 px-4 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition disabled:opacity-50 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#ca9e1c]" />
                  <span>{isLoading ? 'A entrar...' : 'Iniciar Sessão'}</span>
                </button>
              </form>
            )}

            {/* TAB 2: CRIAR CONTA COM EMAIL */}
            {activeTab === 'register' && (
              <form onSubmit={handleEmailRegister} className="space-y-3">
                <div>
                  <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                    Nome ou Designação Náutica <span className="normal-case text-[#4f6e82]/70">(opcional)</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6e82]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ex: Comandante Silva"
                      className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:bg-[#fcfbf8] focus:border-[#0b3a55] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                    Endereço de e-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6e82]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marinheiro@exemplo.pt"
                      required
                      className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:bg-[#fcfbf8] focus:border-[#0b3a55] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                    Palavra-passe (mín. 6 carateres) *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6e82]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 carateres"
                      required
                      minLength={6}
                      className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] py-2.5 pl-9 pr-10 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:bg-[#fcfbf8] focus:border-[#0b3a55] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4f6e82] hover:text-[#0b3a55] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                    Confirmar palavra-passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6e82]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a palavra-passe"
                      required
                      minLength={6}
                      className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:bg-[#fcfbf8] focus:border-[#0b3a55] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xs bg-[#0b3a55] py-2.5 px-4 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition disabled:opacity-50 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ca9e1c]" />
                  <span>{isLoading ? 'A criar conta...' : 'Registar Conta'}</span>
                </button>
              </form>
            )}

            {/* TAB 3: RECUPERAR PALAVRA-PASSE */}
            {activeTab === 'forgot_password' && (
              <form onSubmit={handlePasswordReset} className="space-y-3.5">
                <p className="text-xs text-[#4f6e82] leading-relaxed">
                  Introduza o e-mail associado à sua conta. Enviaremos uma ligação direta para redefinir a sua palavra-passe com toda a segurança.
                </p>

                <div>
                  <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                    Endereço de e-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6e82]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marinheiro@exemplo.pt"
                      required
                      className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:bg-[#fcfbf8] focus:border-[#0b3a55] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xs bg-[#0b3a55] py-2.5 px-4 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition disabled:opacity-50 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#ca9e1c]" />
                  <span>{isLoading ? 'A enviar...' : 'Enviar Ligação de Recuperação'}</span>
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d7d0c1]" />
              </div>
              <span className="relative bg-[#fcfbf8] px-3 font-mono-naut text-[10px] font-medium text-[#4f6e82] uppercase tracking-[0.14em]">
                ou
              </span>
            </div>

            {/* Alternative: Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xs bg-[#faf7f0] border border-[#d7d0c1] py-2.5 px-4 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-semibold text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de] transition disabled:opacity-50 cursor-pointer"
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

            <div className="flex items-center justify-center gap-2 rounded-xs bg-[#ede9de]/55 p-2.5 border border-[#d7d0c1] font-mono-naut text-[10px] text-[#4f6e82] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1e7d4f] shrink-0" />
              <span>Sessão segura • Sincronização automática de favoritos e notas</span>
            </div>
          </div>
          )}
        </div>

      </div>
    </div>
  );
};
