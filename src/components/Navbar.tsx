import React from 'react';
import { Compass, BookOpen, Layers, CheckSquare, Eye, LogIn, LogOut, User, PlusCircle } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  activeTab: 'glossario' | 'flashcards' | 'quiz' | 'guia';
  setActiveTab: (tab: 'glossario' | 'flashcards' | 'quiz' | 'guia') => void;
  currentUser: FirebaseUser | null;
  onOpenAuth: () => void;
  onOpenAddTerm: () => void;
  onSignOut: () => void;
  termsCount: number;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenAddTerm,
  onSignOut,
  termsCount,
  bookmarksCount,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-900/40 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-900 shadow-md shadow-cyan-900/40 ring-1 ring-cyan-400/30">
              <Compass className="h-6 w-6 text-white animate-spin-slow" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Carta de Marinheiro
                  <span className="hidden md:inline-block rounded-md bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-400 border border-cyan-500/20">
                    Portugal
                  </span>
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate max-w-[170px] sm:max-w-none">
                Estudo & Glossário Náutico Interativo
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 rounded-xl bg-slate-900/80 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('glossario')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'glossario'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Glossário ({termsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Simulador Exame</span>
            </button>

            <button
              onClick={() => setActiveTab('guia')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'guia'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Guia Visual</span>
            </button>
          </nav>

          {/* Actions: Add Term, PWA, User */}
          <div className="flex items-center gap-2">
            
            {/* Add Term button */}
            <button
              onClick={onOpenAddTerm}
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition"
              title="Sugerir novo termo náutico"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Novo Termo</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Authentication Button / User Profile */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 rounded-xl border border-cyan-800/40 bg-slate-900/90 px-2.5 py-1 text-xs text-slate-200 hover:border-cyan-500/60 transition"
                  title="Meu Perfil e Estatísticas de Estudo"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Utilizador'}
                      className="h-6 w-6 rounded-full border border-cyan-400/50"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-bold text-white">
                      {currentUser.displayName ? currentUser.displayName[0] : 'M'}
                    </div>
                  )}
                  <span className="hidden sm:inline font-medium max-w-[100px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'Marinheiro'}
                  </span>
                  {bookmarksCount > 0 && (
                    <span className="rounded-full bg-cyan-500/20 px-1.5 py-0.2 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                      ★ {bookmarksCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onSignOut}
                  className="rounded-xl p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition"
                  title="Terminar sessão"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto pb-2.5 pt-1 gap-1.5 scrollbar-none border-t border-slate-900">
          <button
            onClick={() => setActiveTab('glossario')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium shrink-0 transition ${
              activeTab === 'glossario'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glossário ({termsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium shrink-0 transition ${
              activeTab === 'flashcards'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium shrink-0 transition ${
              activeTab === 'quiz'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Simulador</span>
          </button>

          <button
            onClick={() => setActiveTab('guia')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium shrink-0 transition ${
              activeTab === 'guia'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Guia Visual</span>
          </button>
        </div>

      </div>
    </header>
  );
};
