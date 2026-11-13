import React from 'react';
import { Compass, BookOpen, Layers, CheckSquare, Eye, LogIn, LogOut, PlusCircle, TrendingUp } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  activeTab: 'glossario' | 'flashcards' | 'quiz' | 'guia' | 'progresso';
  setActiveTab: (tab: 'glossario' | 'flashcards' | 'quiz' | 'guia' | 'progresso') => void;
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
    <header className="sticky top-0 z-40 border-b border-[#d7d0c1] bg-[#faf7f0]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xs bg-[#0b3a55] border border-[#0b3a55] shadow-[2px_2px_0_0_#ca9e1c]">
              <Compass className="h-5 w-5 text-[#faf7f0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-maritime text-lg sm:text-xl font-bold tracking-tight text-[#0b3a55] leading-none whitespace-nowrap">
                  Carta de Marinheiro
                </h1>
                <span className="hidden sm:inline-block font-mono-naut text-[10px] uppercase tracking-[0.12em] bg-[#ede9de] px-1.5 py-0.5 text-[#4f6e82] border border-[#d7d0c1]">
                  DGRM PT
                </span>
              </div>
              <p className="font-mono-naut text-[10px] uppercase tracking-[0.1em] text-[#4f6e82] truncate max-w-[170px] sm:max-w-none mt-1">
                Glossário &amp; Caderno de Estudo
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 border border-[#d7d0c1] bg-[#ede9de]/60 p-1 rounded-xs">
            <button
              onClick={() => setActiveTab('glossario')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition cursor-pointer ${
                activeTab === 'glossario'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Glossário ({termsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 shrink-0" />
              <span>Testes</span>
            </button>

            <button
              onClick={() => setActiveTab('guia')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition cursor-pointer ${
                activeTab === 'guia'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>Guia Visual</span>
            </button>

            <button
              onClick={() => setActiveTab('progresso')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition cursor-pointer ${
                activeTab === 'progresso'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span>Progresso</span>
            </button>
          </nav>

          {/* Actions: Add Term, PWA, User */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Add Term button */}
            <button
              onClick={onOpenAddTerm}
              className="hidden sm:flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-[#0b3a55] hover:border-[#0b3a55] hover:bg-[#ede9de] transition cursor-pointer"
              title="Sugerir novo termo náutico"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#9a7413]" />
              <span>Novo Termo</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Authentication Button / User Profile */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-2.5 py-1 text-xs text-[#0b3a55] hover:border-[#0b3a55] transition cursor-pointer"
                  title="Meu Perfil e Estatísticas"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Utilizador'}
                      className="h-6 w-6 rounded-xs border border-[#d7d0c1] object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-xs bg-[#0b3a55] font-mono-naut text-[10px] font-bold text-[#ca9e1c]">
                      {currentUser.displayName ? currentUser.displayName[0] : 'M'}
                    </div>
                  )}
                  <span className="hidden sm:inline font-mono-naut text-[11px] font-medium max-w-[100px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'Marinheiro'}
                  </span>
                  {bookmarksCount > 0 && (
                    <span className="rounded-xs bg-[#f0e8cf] px-1.5 py-0.5 font-mono-naut text-[10px] font-bold text-[#9a7413] border border-[#9a7413]/30">
                      ★ {bookmarksCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onSignOut}
                  className="rounded-xs border border-transparent p-1.5 text-[#4f6e82] hover:text-[#b3402e] hover:border-[#b3402e]/30 hover:bg-[#f3ded9]/50 transition cursor-pointer"
                  title="Terminar sessão"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-[#0b3a55] hover:bg-[#ede9de] hover:border-[#0b3a55] transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#9a7413]" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto pb-2.5 pt-1.5 gap-1.5 scrollbar-none border-t border-[#d7d0c1]/70">
          <button
            onClick={() => setActiveTab('glossario')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
              activeTab === 'glossario'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glossário ({termsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
              activeTab === 'flashcards'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
              activeTab === 'quiz'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Simulador</span>
          </button>

          <button
            onClick={() => setActiveTab('guia')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
              activeTab === 'guia'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Guia Visual</span>
          </button>

          <button
            onClick={() => setActiveTab('progresso')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
              activeTab === 'progresso'
                ? 'bg-[#0b3a55] text-[#faf7f0]'
                : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Progresso</span>
          </button>
        </div>

      </div>
    </header>
  );
};
