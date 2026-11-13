import React from 'react';
import { Info, Compass, BookOpen, ShieldCheck, Layers, Mail, ArrowRight } from 'lucide-react';
import { RouteId, ROUTES } from '../utils/routes';

interface SobrePageProps {
  onNavigate: (route: RouteId) => void;
}

export const SobrePage: React.FC<SobrePageProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: RouteId) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <section className="rounded-xs border border-[#d7d0c1] bg-[#ede9de]/45 p-6 sm:p-8">
        <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-[#4f6e82] mb-2.5">
          <Compass className="w-4 h-4 text-[#9a7413]" />
          <span>Sobre o Projeto</span>
          <span aria-hidden="true" className="text-[#d7d0c1]">·</span>
          <span>Conteúdo Genérico (Placeholder)</span>
        </div>

        <h2 className="font-maritime text-3xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight leading-tight flex items-center gap-3">
          <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#9a7413] shrink-0" />
          <span>Sobre a Carta de Marinheiro</span>
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-[#4f6e82] leading-relaxed max-w-3xl">
          Esta página serve como apresentação genérica (<span className="font-mono-naut">placeholder</span>) do projeto <strong className="text-[#0b3a55]">Carta de Marinheiro — Caderno de Estudo &amp; Glossário Náutico</strong>, criado para auxiliar navegadores de recreio na preparação teórica e prática para o exame oficial em Portugal.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5">
          <BookOpen className="w-5 h-5 text-[#9a7413] mb-3" />
          <h3 className="font-maritime text-lg font-bold text-[#0b3a55]">
            Referência Oficial DGRM
          </h3>
          <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
            Conteúdos estruturados segundo o Manual do Marinheiro (2021), o Regulamento Internacional para Evitar Abalroamentos no Mar (RIPEAM / R.I.E.A.M. 1972) e o sistema IALA Região A.
          </p>
        </div>

        <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5">
          <Layers className="w-5 h-5 text-[#9a7413] mb-3" />
          <h3 className="font-maritime text-lg font-bold text-[#0b3a55]">
            Estudo Interativo &amp; Visual
          </h3>
          <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
            Combina glossário pesquisável, guias visuais 2D/3D, fichas de estudo (flashcards), simulador de exame e apontamentos pessoais sincronizados na nuvem.
          </p>
        </div>

        <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5">
          <ShieldCheck className="w-5 h-5 text-[#9a7413] mb-3" />
          <h3 className="font-maritime text-lg font-bold text-[#0b3a55]">
            PWA Offline-First
          </h3>
          <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
            Desenvolvida como Progressive Web App (PWA) com cache local para consulta rápida mesmo sem ligação à internet a bordo ou em viagem.
          </p>
        </div>
      </section>

      <section className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-maritime text-xl font-bold text-[#0b3a55]">
            Tem sugestões de melhoria ou correções náuticas?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#4f6e82]">
            Utilize a página de contacto para enviar feedback diretamente à equipa responsável.
          </p>
        </div>
        <a
          href={ROUTES.contacto.path}
          onClick={(e) => handleLinkClick(e, 'contacto')}
          className="inline-flex items-center gap-2 rounded-xs bg-[#0b3a55] px-4 py-2.5 font-mono-naut text-xs uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition shrink-0"
        >
          <Mail className="w-4 h-4 text-[#ca9e1c]" />
          <span>Ir para Contacto</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </section>
    </div>
  );
};
