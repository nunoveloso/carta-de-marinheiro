import React from 'react';
import {
  Compass,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Layers,
  Eye,
  CheckSquare,
  Info,
  Mail,
  ArrowRight,
  Anchor,
} from 'lucide-react';
import { RouteId, ROUTES } from '../utils/routes';

interface HomePageProps {
  onNavigate: (route: RouteId) => void;
  termsCount: number;
  bookmarksCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  termsCount,
  bookmarksCount,
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: RouteId) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <div>
      {/* Editorial Hero matching reference Home */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono-naut text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Manual do Marinheiro 2021 · DGRM Portugal · Página Inicial (Placeholder)
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            Carta de Marinheiro — Glossário técnico, estudo e preparação para exame.
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Esta página inicial encontra-se em estrutura base (<span className="font-mono-naut text-xs">placeholder</span>) e organiza o acesso ao glossário, fichas de estudo, guias visuais, progresso e simulador oficial.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href={ROUTES.glossario.path}
              onClick={(e) => handleLinkClick(e, 'glossario')}
              className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#082b3f]"
            >
              <BookOpen className="h-4 w-4 text-[#ca9e1c]" />
              <span>Explorar Glossário ({termsCount})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href={ROUTES.estudo.path}
              onClick={(e) => handleLinkClick(e, 'estudo')}
              className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-border bg-card px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:bg-secondary"
            >
              <GraduationCap className="h-4 w-4 text-[#9a7413]" />
              <span>Centro de Estudo</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 font-mono-naut text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Anchor className="h-3.5 w-3.5 text-[#9a7413]" />
              <span><strong className="text-foreground">{termsCount}</strong> Termos Oficiais</span>
            </span>
            <span aria-hidden="true">·</span>
            <span><strong className="text-foreground">{bookmarksCount}</strong> Favoritos Guardados</span>
            <span aria-hidden="true">·</span>
            <span>Modo Offline PWA Ativo</span>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-5 flex items-center justify-between border-b border-border pb-2.5">
          <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Secções da Aplicação
          </h3>
          <span className="font-mono-naut text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Mapa de Navegação
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 lg:grid-cols-3">
          <SectionCard
            href={ROUTES.glossario.path}
            pathLabel="/glossario"
            title="Glossário Náutico"
            description="Pesquisa instantânea por A-Z, categorias DGRM, subcategorias, notas pessoais e pronúncia em áudio."
            cta="Abrir Glossário"
            icon={<BookOpen className="h-4 w-4 text-[#9a7413]" />}
            onClick={(e) => handleLinkClick(e, 'glossario')}
          />

          <SectionCard
            href={ROUTES['guias-visuais'].path}
            pathLabel="/estudo/guias-visuais"
            title="Guias Visuais"
            description="Modelo 3D e 2D da embarcação, balões e luzes R.I.E.A.M., balizagem IALA, bandeiras CIS e segurança."
            cta="Ver Guias"
            icon={<Eye className="h-4 w-4 text-[#9a7413]" />}
            onClick={(e) => handleLinkClick(e, 'guias-visuais')}
          />

          <SectionCard
            href={ROUTES.flashcards.path}
            pathLabel="/estudo/flashcards"
            title="Fichas de Estudo"
            description="Treine a memorização dos conceitos essenciais com cartões interativos por matéria e favoritos."
            cta="Praticar Fichas"
            icon={<Layers className="h-4 w-4 text-[#9a7413]" />}
            onClick={(e) => handleLinkClick(e, 'flashcards')}
          />

          <SectionCard
            href={ROUTES.progresso.path}
            pathLabel="/estudo/progresso"
            title="Progresso & Notas"
            description="Gráficos de cobertura por categoria DGRM, limiares de exame e caderno de apontamentos pessoais."
            cta="Ver Progresso"
            icon={<TrendingUp className="h-4 w-4 text-[#9a7413]" />}
            onClick={(e) => handleLinkClick(e, 'progresso')}
          />

          <SectionCard
            href={ROUTES.testes.path}
            pathLabel="/estudo/testes"
            title="Simulador de Exame"
            description="Testes práticos com ponderação DGRM para avaliar a preparação antes da prova oficial."
            cta="Iniciar Teste"
            icon={<CheckSquare className="h-4 w-4 text-[#9a7413]" />}
            onClick={(e) => handleLinkClick(e, 'testes')}
          />

          <div className="flex flex-col justify-between border border-border bg-card p-5">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center border border-border bg-secondary text-foreground">
                  <Compass className="h-4 w-4 text-[#9a7413]" />
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  /sobre · /contacto
                </span>
              </div>
              <h4 className="text-lg font-semibold text-foreground">Sobre &amp; Contacto</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Informação sobre o enquadramento do projeto e formulário direto para envio de sugestões ou dúvidas.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-foreground">
              <a
                href={ROUTES.sobre.path}
                onClick={(e) => handleLinkClick(e, 'sobre')}
                className="inline-flex items-center gap-1.5 hover:text-[#9a7413] transition-colors"
              >
                <Info className="h-3.5 w-3.5" />
                <span>Sobre</span>
              </a>
              <span className="text-border">|</span>
              <a
                href={ROUTES.contacto.path}
                onClick={(e) => handleLinkClick(e, 'contacto')}
                className="inline-flex items-center gap-1.5 hover:text-[#9a7413] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contacto</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function SectionCard({
  href,
  pathLabel,
  title,
  description,
  cta,
  icon,
  onClick,
}: {
  href: string;
  pathLabel: string;
  title: string;
  description: string;
  cta: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group flex flex-col justify-between border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[6px_6px_0_0_#0b3a55]"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center border border-border bg-secondary text-foreground">
            {icon}
          </div>
          <span className="font-mono-naut text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {pathLabel}
          </span>
        </div>
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-foreground">
        <span>{cta}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </a>
  );
}
