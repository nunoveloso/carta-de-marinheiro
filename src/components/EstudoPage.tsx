import React from 'react';
import {
  TrendingUp,
  Layers,
  Eye,
  CheckSquare,
  ArrowRight,
  School,
} from 'lucide-react';
import { RouteId, ROUTES } from '../utils/routes';

interface EstudoPageProps {
  onNavigate: (route: RouteId) => void;
  termsCount: number;
  bookmarksCount: number;
  notesCount: number;
}

export const EstudoPage: React.FC<EstudoPageProps> = ({
  onNavigate,
  termsCount,
  bookmarksCount,
  notesCount,
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: RouteId) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  const modules = [
    {
      route: 'progresso' as RouteId,
      title: 'Progresso',
      path: ROUTES.progresso.path,
      icon: TrendingUp,
      badge: `${notesCount} notas · ${bookmarksCount} favs`,
      description:
        'Painel analítico com gráfico radar 360°, comparação com os mínimos oficiais DGRM e explorador do caderno pessoal.',
      cta: 'Abrir Progresso',
    },
    {
      route: 'flashcards' as RouteId,
      title: 'Fichas de Estudo',
      path: ROUTES.flashcards.path,
      icon: Layers,
      badge: `${termsCount} termos`,
      description:
        'Sessões de revisão rápida com cartões frente/verso filtráveis por matéria do programa, importância ou favoritos.',
      cta: 'Iniciar Fichas',
    },
    {
      route: 'guias-visuais' as RouteId,
      title: 'Guias Visuais',
      path: ROUTES['guias-visuais'].path,
      icon: Eye,
      badge: '2D & 3D Interativo',
      description:
        'Esquemas visuais da embarcação (2D/3D), balões e luzes R.I.E.A.M., balizagem IALA Região A, bandeiras CIS e segurança.',
      cta: 'Explorar Guias',
    },
    {
      route: 'testes' as RouteId,
      title: 'Simulador de Exame',
      path: ROUTES.testes.path,
      icon: CheckSquare,
      badge: 'Avaliação DGRM',
      description:
        'Exames simulados com critério oficial de aprovação por grupo temático para consolidar conhecimentos antes da prova.',
      cta: 'Fazer Simulador',
    },
    {
      route: 'escolas' as RouteId,
      title: 'Escolas',
      path: ROUTES.escolas.path,
      icon: School,
      badge: 'Formação DGRM',
      description:
        'Diretório reservado para escolas de navegação de recreio e centros de formação credenciados em Portugal.',
      cta: 'Ver Escolas',
    },
  ];

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono-naut text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Centro de Estudo · Estrutura Base (Placeholder)
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            Ferramentas de preparação para a Carta de Marinheiro.
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Página central da área de estudo (<span className="font-mono-naut text-xs">/estudo</span>). Escolha uma das ferramentas abaixo ou aceda pelo menu suspenso <strong className="text-foreground">Estudo</strong>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <a
                key={mod.route}
                href={mod.path}
                onClick={(e) => handleLinkClick(e, mod.route)}
                className="group flex flex-col justify-between border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[6px_6px_0_0_#0b3a55]"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border border-border bg-secondary text-foreground">
                        <Icon className="h-5 w-5 text-[#9a7413]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {mod.title}
                        </h3>
                        <span className="font-mono-naut text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                          {mod.path}
                        </span>
                      </div>
                    </div>
                    <span className="border border-[#9a7413]/30 bg-[#f0e8cf] px-2.5 py-1 font-mono-naut text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9a7413]">
                      {mod.badge}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-3 font-mono-naut text-[11px] font-medium uppercase tracking-[0.12em] text-foreground">
                  <span>{mod.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
