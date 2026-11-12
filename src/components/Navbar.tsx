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
    <header className="sticky top-0 z-40 border-b border-[#e5decb] bg-[#fdfbf7]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#112338] shadow-sm border border-[#0a1827]">
              <Compass className="h-5 w-5 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-maritime text-xl sm:text-2xl font-bold tracking-tight text-[#112338] leading-none">
                  Carta de Marinheiro
                </h1>
                <span className="hidden sm:inline-block rounded-md bg-[#f1ebe0] px-2 py-0.5 text-[10px] font-semibold text-[#64748b] border border-[#ded5c2]">
                  DGRM Portugal
                </span>
              </div>
              <p className="text-[11px] text-[#64748b] truncate max-w-[170px] sm:max-w-none font-medium mt-0.5">
                Glossário & Caderno de Estudo
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 rounded-xl bg-[#f4efe4] p-1 border border-[#e5decb]">
            <button
              onClick={() => setActiveTab('glossario')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'glossario'
                  ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                  : 'text-[#475569] hover:text-[#112338] hover:bg-[#eae3d2]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glossário ({termsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'flashcards'
                  ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                  : 'text-[#475569] hover:text-[#112338] hover:bg-[#eae3d2]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'quiz'
                  ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                  : 'text-[#475569] hover:text-[#112338] hover:bg-[#eae3d2]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Simulador de Testes</span>
            </button>

            <button
              onClick={() => setActiveTab('guia')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'guia'
                  ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                  : 'text-[#475569] hover:text-[#112338] hover:bg-[#eae3d2]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Guia Visual</span>
            </button>

            <button
              onClick={() => setActiveTab('progresso')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'progresso'
                  ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                  : 'text-[#475569] hover:text-[#112338] hover:bg-[#eae3d2]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Progresso</span>
            </button>
          </nav>

          {/* Actions: Add Term, PWA, User */}
          <div className="flex items-center gap-2">
            
            {/* Add Term button */}
            <button
              onClick={onOpenAddTerm}
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-[#ded5c2] bg-[#fcfaf5] px-3 py-1.5 text-xs font-semibold text-[#1e293b] hover:border-[#112338] hover:bg-[#f4efe4] transition shadow-2xs"
              title="Sugerir novo termo náutico"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#a16207]" />
              <span>Novo Termo</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Authentication Button / User Profile */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 rounded-xl border border-[#ded5c2] bg-[#fcfaf5] px-2.5 py-1 text-xs text-[#1e293b] hover:border-[#112338] transition shadow-2xs"
                  title="Meu Perfil e Estatísticas"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Utilizador'}
                      className="h-6 w-6 rounded-full border border-[#ded5c2]"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#112338] text-[10px] font-bold text-[#d4af37]">
                      {currentUser.displayName ? currentUser.displayName[0] : 'M'}
                    </div>
                  )}
                  <span className="hidden sm:inline font-semibold max-w-[100px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'Marinheiro'}
                  </span>
                  {bookmarksCount > 0 && (
                    <span className="rounded-md bg-[#fef3c7] px-1.5 py-0.5 text-[10px] font-bold text-[#92400e] border border-[#fde68a]">
                      ★ {bookmarksCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onSignOut}
                  className="rounded-xl p-2 text-[#64748b] hover:text-[#991b1b] hover:bg-[#f4efe4] transition"
                  title="Terminar sessão"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 rounded-xl border border-[#ded5c2] bg-[#fcfaf5] px-3 py-1.5 text-xs font-semibold text-[#112338] hover:bg-[#f4efe4] hover:border-[#112338] transition shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#a16207]" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto pb-2.5 pt-1 gap-1.5 scrollbar-none border-t border-[#ede6d8]">
          <button
            onClick={() => setActiveTab('glossario')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition ${
              activeTab === 'glossario'
                ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                : 'bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glossário ({termsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition ${
              activeTab === 'flashcards'
                ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                : 'bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition ${
              activeTab === 'quiz'
                ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                : 'bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Simulador</span>
          </button>

          <button
            onClick={() => setActiveTab('guia')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition ${
              activeTab === 'guia'
                ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                : 'bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Guia Visual</span>
          </button>

          <button
            onClick={() => setActiveTab('progresso')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition ${
              activeTab === 'progresso'
                ? 'bg-[#112338] text-[#fbf8f2] shadow-xs'
                : 'bg-[#f4efe4] text-[#475569] hover:bg-[#eae3d2]'
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
