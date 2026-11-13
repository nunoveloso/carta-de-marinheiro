import React, { useState } from 'react';
import {
  Compass,
  Home,
  BookOpen,
  GraduationCap,
  Layers,
  CheckSquare,
  Eye,
  TrendingUp,
  Info,
  Mail,
  ChevronDown,
  LogIn,
  LogOut,
  PlusCircle,
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { PWAInstallButton } from './PWAInstallButton';
import { RouteId, ROUTES } from '../utils/routes';

interface NavbarProps {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  currentUser: FirebaseUser | null;
  onOpenAuth: () => void;
  onOpenAddTerm: () => void;
  onSignOut: () => void;
  termsCount: number;
  bookmarksCount: number;
}

const ESTUDO_SUBMENU: {
  id: RouteId;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'progresso',
    label: 'Progresso',
    description: 'Desempenho DGRM & apontamentos',
    icon: TrendingUp,
  },
  {
    id: 'flashcards',
    label: 'Fichas de Estudo',
    description: 'Memorização por cartões',
    icon: Layers,
  },
  {
    id: 'guias-visuais',
    label: 'Guias Visuais',
    description: 'Esquemas 2D/3D, balões e bóias',
    icon: Eye,
  },
  {
    id: 'testes',
    label: 'Simulador de Exame',
    description: 'Testes cronometrados DGRM',
    icon: CheckSquare,
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeRoute,
  onNavigate,
  currentUser,
  onOpenAuth,
  onOpenAddTerm,
  onSignOut,
  termsCount,
  bookmarksCount,
}) => {
  const [isStudyHoverOpen, setIsStudyHoverOpen] = useState(false);
  const [isMobileStudyOpen, setIsMobileStudyOpen] = useState(false);

  const isEstudoBranchActive =
    activeRoute === 'estudo' ||
    activeRoute === 'progresso' ||
    activeRoute === 'flashcards' ||
    activeRoute === 'guias-visuais' ||
    activeRoute === 'testes';

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: RouteId
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    setIsStudyHoverOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#d7d0c1] bg-[#faf7f0]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand (links to /) */}
          <a
            href={ROUTES.home.path}
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xs bg-[#0b3a55] border border-[#0b3a55] shadow-[2px_2px_0_0_#ca9e1c] group-hover:translate-x-px group-hover:translate-y-px transition-transform">
              <Compass className="h-5 w-5 text-[#faf7f0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-maritime text-lg sm:text-xl font-bold tracking-tight text-[#0b3a55] leading-none whitespace-nowrap">
                  Carta de Marinheiro
                </h1>
                <span className="hidden xl:inline-block font-mono-naut text-[10px] uppercase tracking-[0.12em] bg-[#ede9de] px-1.5 py-0.5 text-[#4f6e82] border border-[#d7d0c1]">
                  DGRM PT
                </span>
              </div>
              <p className="font-mono-naut text-[10px] uppercase tracking-[0.1em] text-[#4f6e82] truncate max-w-[170px] sm:max-w-none mt-1">
                Glossário &amp; Caderno de Estudo
              </p>
            </div>
          </a>

          {/* Desktop 1st-Level Navigation (2nd-level under Estudo opens on hover) */}
          <nav
            aria-label="Navegação Principal"
            className="hidden lg:flex items-center gap-1 border border-[#d7d0c1] bg-[#ede9de]/60 p-1 rounded-xs"
          >
            {/* 1. Início */}
            <a
              href={ROUTES.home.path}
              onClick={(e) => handleLinkClick(e, 'home')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition ${
                activeRoute === 'home'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>Início</span>
            </a>

            {/* 2. Glossário */}
            <a
              href={ROUTES.glossario.path}
              onClick={(e) => handleLinkClick(e, 'glossario')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition ${
                activeRoute === 'glossario'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Glossário ({termsCount})</span>
            </a>

            {/* 3. Estudo (Hover Submenu for 2nd-level items) */}
            <div
              className="relative"
              onMouseEnter={() => setIsStudyHoverOpen(true)}
              onMouseLeave={() => setIsStudyHoverOpen(false)}
              onFocus={() => setIsStudyHoverOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setIsStudyHoverOpen(false);
                }
              }}
            >
              <a
                href={ROUTES.estudo.path}
                onClick={(e) => handleLinkClick(e, 'estudo')}
                aria-expanded={isStudyHoverOpen}
                className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition ${
                  isEstudoBranchActive
                    ? 'bg-[#0b3a55] text-[#faf7f0]'
                    : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Estudo</span>
                <ChevronDown
                  className={`w-3 h-3 shrink-0 transition-transform duration-150 ${
                    isStudyHoverOpen ? 'rotate-180' : ''
                  }`}
                />
              </a>

              {/* Hover Dropdown Panel (bridged with pt-2 so pointer never leaves container) */}
              {isStudyHoverOpen && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50">
                  <div className="rounded-xs border border-[#0b3a55] bg-[#fcfbf8] shadow-[4px_4px_0_0_#0b3a55] p-1.5">
                    <div className="px-2.5 py-1.5 mb-1 border-b border-[#d7d0c1] flex items-center justify-between">
                      <span className="font-mono-naut text-[10px] uppercase tracking-[0.12em] text-[#4f6e82]">
                        Ferramentas de Estudo
                      </span>
                      <a
                        href={ROUTES.estudo.path}
                        onClick={(e) => handleLinkClick(e, 'estudo')}
                        className="font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413] hover:underline"
                      >
                        Ver Hub →
                      </a>
                    </div>

                    <div className="space-y-0.5">
                      {ESTUDO_SUBMENU.map((item) => {
                        const SubIcon = item.icon;
                        const isItemActive = activeRoute === item.id;
                        return (
                          <a
                            key={item.id}
                            href={ROUTES[item.id].path}
                            onClick={(e) => handleLinkClick(e, item.id)}
                            className={`flex items-start gap-2.5 rounded-xs px-2.5 py-2 transition ${
                              isItemActive
                                ? 'bg-[#0b3a55] text-[#faf7f0]'
                                : 'text-[#0b3a55] hover:bg-[#ede9de]'
                            }`}
                          >
                            <SubIcon
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isItemActive ? 'text-[#ca9e1c]' : 'text-[#9a7413]'
                              }`}
                            />
                            <div className="min-w-0">
                              <div className="font-mono-naut text-[11px] uppercase tracking-[0.08em] font-semibold leading-tight">
                                {item.label}
                              </div>
                              <div
                                className={`text-[11px] mt-0.5 leading-snug ${
                                  isItemActive ? 'text-[#faf7f0]/80' : 'text-[#4f6e82]'
                                }`}
                              >
                                {item.description}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Sobre */}
            <a
              href={ROUTES.sobre.path}
              onClick={(e) => handleLinkClick(e, 'sobre')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition ${
                activeRoute === 'sobre'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Sobre</span>
            </a>

            {/* 5. Contacto */}
            <a
              href={ROUTES.contacto.path}
              onClick={(e) => handleLinkClick(e, 'contacto')}
              className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium transition ${
                activeRoute === 'contacto'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'text-[#0b3a55]/80 hover:text-[#0b3a55] hover:bg-[#eae6dc]'
              }`}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>Contacto</span>
            </a>
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
              <span className="hidden xl:inline">Novo Termo</span>
              <span className="xl:hidden">Termo</span>
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
                  <span className="hidden sm:inline font-mono-naut text-[11px] font-medium max-w-[90px] truncate">
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

        {/* Mobile 1st-level Bar + Toggleable Estudo Submenu */}
        <div className="lg:hidden border-t border-[#d7d0c1]/70">
          <div className="flex overflow-x-auto pb-2 pt-1.5 gap-1.5 scrollbar-none">
            <a
              href={ROUTES.home.path}
              onClick={(e) => handleLinkClick(e, 'home')}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
                activeRoute === 'home'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Início</span>
            </a>

            <a
              href={ROUTES.glossario.path}
              onClick={(e) => handleLinkClick(e, 'glossario')}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
                activeRoute === 'glossario'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glossário</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileStudyOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition cursor-pointer ${
                isEstudoBranchActive
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Estudo</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  isMobileStudyOpen || isEstudoBranchActive ? 'rotate-180' : ''
                }`}
              />
            </button>

            <a
              href={ROUTES.sobre.path}
              onClick={(e) => handleLinkClick(e, 'sobre')}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
                activeRoute === 'sobre'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Sobre</span>
            </a>

            <a
              href={ROUTES.contacto.path}
              onClick={(e) => handleLinkClick(e, 'contacto')}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
                activeRoute === 'contacto'
                  ? 'bg-[#0b3a55] text-[#faf7f0]'
                  : 'border border-[#d7d0c1] bg-[#fcfbf8] text-[#0b3a55] hover:bg-[#ede9de]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contacto</span>
            </a>
          </div>

          {/* Mobile 2nd-level Estudo strip */}
          {(isMobileStudyOpen || isEstudoBranchActive) && (
            <div className="flex overflow-x-auto pb-2.5 pt-1 gap-1.5 scrollbar-none border-t border-[#d7d0c1]/50">
              <a
                href={ROUTES.estudo.path}
                onClick={(e) => handleLinkClick(e, 'estudo')}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-2.5 py-1 font-mono-naut text-[10px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
                  activeRoute === 'estudo'
                    ? 'bg-[#9a7413] text-[#faf7f0]'
                    : 'bg-[#ede9de]/70 text-[#0b3a55] border border-[#d7d0c1]'
                }`}
              >
                <Compass className="w-3 h-3" />
                <span>Visão Geral</span>
              </a>

              {ESTUDO_SUBMENU.map((item) => {
                const SubIcon = item.icon;
                const isItemActive = activeRoute === item.id;
                return (
                  <a
                    key={item.id}
                    href={ROUTES[item.id].path}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-xs px-2.5 py-1 font-mono-naut text-[10px] uppercase tracking-[0.08em] font-medium shrink-0 transition ${
                      isItemActive
                        ? 'bg-[#9a7413] text-[#faf7f0]'
                        : 'bg-[#ede9de]/70 text-[#0b3a55] border border-[#d7d0c1]'
                    }`}
                  >
                    <SubIcon className="w-3 h-3" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
