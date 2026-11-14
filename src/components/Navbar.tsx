import React, { useEffect, useRef, useState } from 'react';
import {
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
  CircleUserRound,
  LogOut,
  Compass,
  School,
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { PWAInstallButton } from './PWAInstallButton';
import { RouteId, ROUTES } from '../utils/routes';

interface NavbarProps {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  currentUser: FirebaseUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  bookmarksCount: number;
}

const ESTUDO_SUBMENU: {
  id: RouteId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'estudo',
    label: 'Centro de Estudo',
    icon: Compass,
  },
  {
    id: 'progresso',
    label: 'Progresso',
    icon: TrendingUp,
  },
  {
    id: 'flashcards',
    label: 'Fichas de Estudo',
    icon: Layers,
  },
  {
    id: 'guias-visuais',
    label: 'Guias Visuais',
    icon: Eye,
  },
  {
    id: 'testes',
    label: 'Simulador de Exame',
    icon: CheckSquare,
  },
  {
    id: 'escolas',
    label: 'Escolas',
    icon: School,
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeRoute,
  onNavigate,
  currentUser,
  onOpenAuth,
  onSignOut,
  bookmarksCount,
}) => {
  const [studyOpen, setStudyOpen] = useState(false);
  const studyGroupRef = useRef<HTMLDivElement>(null);
  const openedByHoverRef = useRef(false);

  const isEstudoBranchActive =
    activeRoute === 'estudo' ||
    activeRoute === 'progresso' ||
    activeRoute === 'flashcards' ||
    activeRoute === 'guias-visuais' ||
    activeRoute === 'testes' ||
    activeRoute === 'escolas';

  useEffect(() => {
    if (!studyOpen) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      if (studyGroupRef.current && !studyGroupRef.current.contains(e.target as Node)) {
        openedByHoverRef.current = false;
        setStudyOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        openedByHoverRef.current = false;
        setStudyOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [studyOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: RouteId
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    openedByHoverRef.current = false;
    setStudyOpen(false);
    onNavigate(route);
  };

  const handleEstudoButtonClick = () => {
    if (studyOpen && openedByHoverRef.current) {
      openedByHoverRef.current = false;
      setStudyOpen(true);
      return;
    }
    openedByHoverRef.current = false;
    setStudyOpen((o) => !o);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6">
        {/* Brand lockup with clean 2-color quirky pocket-compass logo */}
        <a
          href={ROUTES.home.path}
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="Carta de Marinheiro — Início"
          className="group flex items-center gap-2.5 sm:gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 overflow-visible"
              fill="none"
            >
              <g transform="rotate(-8 12 12.8)">
                {/* Quirky pocket-compass crown loop */}
                <circle cx="12" cy="2.6" r="1.45" stroke="currentColor" strokeWidth="1.65" />
                <path d="M12 4.05v1.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

                {/* Clean dial circle */}
                <circle cx="12" cy="13.2" r="7.7" stroke="currentColor" strokeWidth="1.85" />
                <path d="M12 6.8v1.2" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />

                {/* Centro de Estudo style diagonal diamond needle with gentle hover wobble */}
                <g className="origin-[12px_13.2px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[20deg]">
                  <polygon
                    points="15.6,9.6 13.3,14.5 10.7,11.9"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="8.4,16.8 10.7,11.9 13.3,14.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="13.2" r="0.85" fill="#0b3a55" />
                </g>
              </g>
            </svg>
          </span>
          <span className="hidden min-[520px]:block leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight text-foreground sm:text-[17px] whitespace-nowrap">
              Carta de Marinheiro
            </span>
            <span className="font-mono-naut hidden md:block text-[10px] uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap">
              Navegador de Recreio · Marinheiro
            </span>
          </span>
        </a>

        {/* Unified single-row navigation & personal area actions matching reference AppHeader */}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav
            aria-label="Navegação Principal"
            className="flex items-center gap-1 sm:gap-2"
          >
            <NavItem
              href={ROUTES.home.path}
              active={activeRoute === 'home'}
              icon={<Home className="h-4 w-4 shrink-0" />}
              label="Início"
              onClick={(e) => handleLinkClick(e, 'home')}
            />

            <NavItem
              href={ROUTES.glossario.path}
              active={activeRoute === 'glossario'}
              icon={<BookOpen className="h-4 w-4 shrink-0" />}
              label="Glossário"
              onClick={(e) => handleLinkClick(e, 'glossario')}
            />

            {/* Estudo dropdown (mouse hover + click/touch, unified ref) */}
            <div
              ref={studyGroupRef}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') {
                  openedByHoverRef.current = true;
                  setStudyOpen(true);
                }
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') {
                  openedByHoverRef.current = false;
                  setStudyOpen(false);
                }
              }}
            >
              <button
                type="button"
                onClick={handleEstudoButtonClick}
                aria-expanded={studyOpen}
                aria-haspopup="menu"
                aria-label="Estudo"
                title="Estudo"
                className={`font-mono-naut flex min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 items-center justify-center gap-2 border px-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 lg:px-4 whitespace-nowrap shrink-0 cursor-pointer ${
                  studyOpen || isEstudoBranchActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-transparent text-foreground hover:border-border hover:bg-secondary'
                }`}
              >
                <GraduationCap className="h-4 w-4 shrink-0" />
                <span className="hidden lg:inline">Estudo</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    studyOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {studyOpen && (
                <div className="absolute right-0 top-full z-50 pt-1">
                  <div
                    role="menu"
                    aria-label="Submenu Estudo"
                    className="min-w-52 sm:min-w-56 border border-border bg-card shadow-[6px_6px_0_0_#0b3a55]"
                  >
                    {ESTUDO_SUBMENU.map((item) => {
                      const SubIcon = item.icon;
                      const isItemActive = activeRoute === item.id;
                      return (
                        <a
                          key={item.id}
                          role="menuitem"
                          href={ROUTES[item.id].path}
                          onClick={(e) => handleLinkClick(e, item.id)}
                          className={[
                            'font-mono-naut flex min-h-11 items-center gap-2.5 border-b border-border px-4 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap cursor-pointer',
                            isItemActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-foreground hover:bg-secondary',
                          ].join(' ')}
                        >
                          <SubIcon className="h-4 w-4 shrink-0" />
                          <span>{item.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <NavItem
              href={ROUTES.sobre.path}
              active={activeRoute === 'sobre'}
              icon={<Info className="h-4 w-4 shrink-0" />}
              label="Sobre"
              onClick={(e) => handleLinkClick(e, 'sobre')}
            />

            <NavItem
              href={ROUTES.contacto.path}
              active={activeRoute === 'contacto'}
              icon={<Mail className="h-4 w-4 shrink-0" />}
              label="Contacto"
              onClick={(e) => handleLinkClick(e, 'contacto')}
            />
          </nav>

          <PWAInstallButton />

          {/* Top-right Personal Area icon button (distinct brass accent color) */}
          {currentUser ? (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={onOpenAuth}
                aria-label="Área Pessoal — Perfil e Estatísticas"
                title={`${currentUser.displayName || 'Minha Conta'} · Área Pessoal`}
                className="flex min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 items-center justify-center gap-1.5 border border-[#9a7413]/55 bg-[#f0e8cf] px-2 sm:px-2.5 text-[#7a5809] transition-colors hover:border-[#9a7413] hover:bg-[#ca9e1c]/40 outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Utilizador'}
                    className="h-6 w-6 border border-[#9a7413]/40 object-cover"
                  />
                ) : (
                  <CircleUserRound className="h-5 w-5 text-[#7a5809]" strokeWidth={1.9} />
                )}
                {bookmarksCount > 0 && (
                  <span className="hidden sm:inline font-mono-naut text-[10px] font-bold text-[#0b3a55]">
                    ★ {bookmarksCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={onSignOut}
                aria-label="Terminar sessão"
                title="Terminar sessão"
                className="flex min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 items-center justify-center border border-transparent text-muted-foreground hover:border-destructive/40 hover:bg-[#f3ded9]/60 hover:text-destructive transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              aria-label="Área Pessoal — Entrar ou Registar"
              title="Área Pessoal · Entrar ou Registar"
              className="flex min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 shrink-0 items-center justify-center border border-[#9a7413]/55 bg-[#f0e8cf] text-[#7a5809] transition-colors hover:border-[#9a7413] hover:bg-[#ca9e1c] hover:text-[#0b3a55] outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <CircleUserRound className="h-5 w-5" strokeWidth={1.9} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

function NavItem({
  href,
  active,
  icon,
  label,
  onClick,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        'font-mono-naut flex min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 items-center justify-center gap-2 border px-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 lg:px-4 whitespace-nowrap shrink-0',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-transparent text-foreground hover:border-border hover:bg-secondary',
      ].join(' ')}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </a>
  );
}
