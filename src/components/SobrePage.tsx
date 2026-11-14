import React from 'react';
import { BookOpen, ShieldCheck, Layers, Mail, ArrowRight } from 'lucide-react';
import { RouteId, ROUTES } from '../utils/routes';

interface SobrePageProps {
  onNavigate: (route: RouteId) => void;
}

export const SobrePage: React.FC<SobrePageProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: RouteId) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono-naut text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Sobre o Projeto · Conteúdo Genérico (Placeholder)
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            Sobre a Carta de Marinheiro
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
            Esta página serve como apresentação genérica (<span className="font-mono-naut text-xs">placeholder</span>) do projeto <strong className="text-foreground">Carta de Marinheiro — Caderno de Estudo &amp; Glossário Náutico</strong>, criado para apoiar navegadores de recreio na preparação teórica e prática para o exame oficial em Portugal.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-border bg-card p-5">
            <BookOpen className="mb-3 h-5 w-5 text-[#9a7413]" />
            <h3 className="text-lg font-semibold text-foreground">
              Referência Oficial DGRM
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Conteúdos estruturados segundo o Manual do Marinheiro (2021), o Regulamento Internacional para Evitar Abalroamentos no Mar (RIPEAM / R.I.E.A.M. 1972) e o sistema IALA Região A.
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <Layers className="mb-3 h-5 w-5 text-[#9a7413]" />
            <h3 className="text-lg font-semibold text-foreground">
              Estudo Interativo &amp; Visual
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Combina glossário pesquisável, guias visuais 2D/3D, fichas de estudo (flashcards), simulador de exame e apontamentos pessoais sincronizados na nuvem.
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <ShieldCheck className="mb-3 h-5 w-5 text-[#9a7413]" />
            <h3 className="text-lg font-semibold text-foreground">
              PWA Offline-First
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Desenvolvida como Progressive Web App (PWA) com cache local para consulta rápida mesmo sem ligação à internet a bordo ou em viagem.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-4 border border-border bg-card p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Tem sugestões de melhoria ou correções náuticas?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Utilize a página de contacto para enviar feedback diretamente à equipa responsável.
            </p>
          </div>
          <a
            href={ROUTES.contacto.path}
            onClick={(e) => handleLinkClick(e, 'contacto')}
            className="font-mono-naut inline-flex min-h-11 shrink-0 items-center gap-2 border border-primary bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#082b3f]"
          >
            <Mail className="h-4 w-4 text-[#ca9e1c]" />
            <span>Ir para Contacto</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </section>
      </div>
    </div>
  );
};
