import React from 'react';
import {
  GraduationCap,
  TrendingUp,
  Layers,
  Eye,
  CheckSquare,
  ArrowRight,
  Compass,
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
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <section className="rounded-xs border border-[#d7d0c1] bg-[#ede9de]/45 p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-[#4f6e82] mb-2.5">
            <Compass className="w-4 h-4 text-[#9a7413]" />
            <span>Centro de Estudo</span>
            <span aria-hidden="true" className="text-[#d7d0c1]">·</span>
            <span>Estrutura Base (Placeholder)</span>
          </div>

          <h2 className="font-maritime text-3xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight leading-tight flex items-center gap-3">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-[#9a7413] shrink-0" />
            <span>Estudo</span>
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-[#4f6e82] leading-relaxed">
            Página central da área de estudo (<span className="font-mono-naut">/estudo</span>). Escolha abaixo uma das ferramentas de preparação para o exame de Carta de Marinheiro ou aceda diretamente através do submenu de <strong className="text-[#0b3a55]">Estudo</strong>.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <a
              key={mod.route}
              href={mod.path}
              onClick={(e) => handleLinkClick(e, mod.route)}
              className="group rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                      <Icon className="w-5 h-5 text-[#9a7413]" />
                    </div>
                    <div>
                      <h3 className="font-maritime text-xl font-bold text-[#0b3a55]">
                        {mod.title}
                      </h3>
                      <span className="font-mono-naut text-[10px] text-[#4f6e82]">
                        {mod.path}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-xs border border-[#9a7413]/30 bg-[#f0e8cf] px-2.5 py-1 font-mono-naut text-[10px] font-semibold uppercase tracking-wider text-[#9a7413]">
                    {mod.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4f6e82] leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#d7d0c1] flex items-center justify-between font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#0b3a55]">
                <span>{mod.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
};
