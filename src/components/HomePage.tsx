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
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Placeholder Hero */}
      <section className="relative rounded-xs border border-[#d7d0c1] bg-[#ede9de]/45 p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-[#4f6e82] mb-3">
            <Compass className="w-4 h-4 text-[#9a7413]" />
            <span>DGRM Portugal</span>
            <span aria-hidden="true" className="text-[#d7d0c1]">·</span>
            <span>Página Inicial (Placeholder)</span>
          </div>

          <h2 className="font-maritime text-3xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight leading-tight">
            Carta de Marinheiro
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#4f6e82] leading-relaxed">
            Bem-vindo ao caderno digital e glossário náutico de preparação para a <strong className="text-[#0b3a55]">Carta de Marinheiro</strong>. Esta página inicial encontra-se em estrutura base (<span className="font-mono-naut text-xs">placeholder</span>) e serve como ponto de entrada para todas as áreas da aplicação.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={ROUTES.glossario.path}
              onClick={(e) => handleLinkClick(e, 'glossario')}
              className="inline-flex items-center gap-2 rounded-xs bg-[#0b3a55] px-5 py-2.5 font-mono-naut text-xs uppercase tracking-[0.08em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition"
            >
              <BookOpen className="w-4 h-4 text-[#ca9e1c]" />
              <span>Explorar Glossário ({termsCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={ROUTES.estudo.path}
              onClick={(e) => handleLinkClick(e, 'estudo')}
              className="inline-flex items-center gap-2 rounded-xs border border-[#0b3a55] bg-[#fcfbf8] px-5 py-2.5 font-mono-naut text-xs uppercase tracking-[0.08em] font-medium text-[#0b3a55] hover:bg-[#ede9de] transition"
            >
              <GraduationCap className="w-4 h-4 text-[#9a7413]" />
              <span>Centro de Estudo</span>
            </a>
          </div>

          <div className="mt-6 pt-5 border-t border-[#d7d0c1] flex flex-wrap gap-6 font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82]">
            <span className="flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-[#9a7413]" />
              <span><strong className="text-[#0b3a55]">{termsCount}</strong> Termos Oficiais</span>
            </span>
            <span>·</span>
            <span><strong className="text-[#0b3a55]">{bookmarksCount}</strong> Favoritos Guardados</span>
            <span>·</span>
            <span>Modo Offline PWA Ativo</span>
          </div>
        </div>
      </section>

      {/* Primary Sections Grid */}
      <section>
        <div className="flex items-center justify-between border-b border-[#d7d0c1] pb-2.5 mb-5">
          <h3 className="font-maritime text-xl sm:text-2xl font-bold text-[#0b3a55]">
            Secções da Aplicação
          </h3>
          <span className="font-mono-naut text-[11px] uppercase tracking-wider text-[#4f6e82]">
            Mapa de Navegação
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Glossário */}
          <a
            href={ROUTES.glossario.path}
            onClick={(e) => handleLinkClick(e, 'glossario')}
            className="group rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                  <BookOpen className="w-4 h-4 text-[#9a7413]" />
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82]">
                  /glossario
                </span>
              </div>
              <h4 className="font-maritime text-lg font-bold text-[#0b3a55]">Glossário Náutico</h4>
              <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
                Pesquisa instantânea por A-Z, categorias DGRM, subcategorias, notas pessoais e pronúncia em áudio.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#d7d0c1] flex items-center justify-between font-mono-naut text-[11px] uppercase tracking-wider text-[#0b3a55]">
              <span>Abrir Glossário</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Estudo - Guias Visuais */}
          <a
            href={ROUTES['guias-visuais'].path}
            onClick={(e) => handleLinkClick(e, 'guias-visuais')}
            className="group rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                  <Eye className="w-4 h-4 text-[#9a7413]" />
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82]">
                  /estudo/guias-visuais
                </span>
              </div>
              <h4 className="font-maritime text-lg font-bold text-[#0b3a55]">Guias Visuais</h4>
              <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
                Modelo 3D e 2D da embarcação, balões e luzes R.I.E.A.M., balizagem IALA, bandeiras CIS e segurança.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#d7d0c1] flex items-center justify-between font-mono-naut text-[11px] uppercase tracking-wider text-[#0b3a55]">
              <span>Ver Guias</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Estudo - Flashcards */}
          <a
            href={ROUTES.flashcards.path}
            onClick={(e) => handleLinkClick(e, 'flashcards')}
            className="group rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                  <Layers className="w-4 h-4 text-[#9a7413]" />
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82]">
                  /estudo/flashcards
                </span>
              </div>
              <h4 className="font-maritime text-lg font-bold text-[#0b3a55]">Fichas de Estudo</h4>
              <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
                Treine a memorização dos conceitos essenciais com cartões interativos por matéria e favoritos.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#d7d0c1] flex items-center justify-between font-mono-naut text-[11px] uppercase tracking-wider text-[#0b3a55]">
              <span>Praticar Fichas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Estudo - Progresso */}
          <a
            href={ROUTES.progresso.path}
            onClick={(e) => handleLinkClick(e, 'progresso')}
            className="group rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                  <TrendingUp className="w-4 h-4 text-[#9a7413]" />
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82]">
                  /estudo/progresso
                </span>
              </div>
              <h4 className="font-maritime text-lg font-bold text-[#0b3a55]">Progresso & Notas</h4>
              <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
                Gráficos de cobertura por categoria DGRM, limiares de exame e caderno de apontamentos pessoais.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#d7d0c1] flex items-center justify-between font-mono-naut text-[11px] uppercase tracking-wider text-[#0b3a55]">
              <span>Ver Progresso</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Estudo - Simulador */}
          <a
            href={ROUTES.testes.path}
            onClick={(e) => handleLinkClick(e, 'testes')}
            className="group rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 hover:-translate-y-0.5 hover:border-[#0b3a55] hover:shadow-[4px_4px_0_0_#0b3a55] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                  <CheckSquare className="w-4 h-4 text-[#9a7413]" />
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82]">
                  /estudo/testes
                </span>
              </div>
              <h4 className="font-maritime text-lg font-bold text-[#0b3a55]">Simulador de Exame</h4>
              <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
                Testes práticos com ponderação DGRM para avaliar a preparação antes da prova oficial.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#d7d0c1] flex items-center justify-between font-mono-naut text-[11px] uppercase tracking-wider text-[#0b3a55]">
              <span>Iniciar Teste</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Sobre & Contacto */}
          <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                  <Info className="w-4 h-4 text-[#9a7413]" />
                </div>
                <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#4f6e82]">
                  /sobre · /contacto
                </span>
              </div>
              <h4 className="font-maritime text-lg font-bold text-[#0b3a55]">Sobre & Contacto</h4>
              <p className="mt-1.5 text-xs text-[#4f6e82] leading-relaxed">
                Informação sobre o enquadramento do projeto e formulário direto para envio de sugestões ou dúvidas.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#d7d0c1] flex items-center gap-4 font-mono-naut text-[11px] uppercase tracking-wider text-[#0b3a55]">
              <a
                href={ROUTES.sobre.path}
                onClick={(e) => handleLinkClick(e, 'sobre')}
                className="inline-flex items-center gap-1 hover:text-[#9a7413] transition"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Sobre</span>
              </a>
              <span className="text-[#d7d0c1]">|</span>
              <a
                href={ROUTES.contacto.path}
                onClick={(e) => handleLinkClick(e, 'contacto')}
                className="inline-flex items-center gap-1 hover:text-[#9a7413] transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contacto</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
