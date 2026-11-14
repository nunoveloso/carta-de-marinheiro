import React from 'react';
import { School, MapPin, Compass, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { RouteId, ROUTES } from '../utils/routes';

interface EscolasPageProps {
  onNavigate: (route: RouteId) => void;
}

export const EscolasPage: React.FC<EscolasPageProps> = ({ onNavigate }) => {
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
            Centro de Estudo · Conteúdo Base (Placeholder)
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            Escolas de Navegação de Recreio
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
            Página reservada (<span className="font-mono-naut text-xs">/estudo/escolas</span>) para reunir escolas de formação náutica e entidades credenciadas pela <strong className="text-foreground">DGRM</strong> para a obtenção da Carta de Marinheiro.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-border bg-card p-5">
            <School className="mb-3 h-5 w-5 text-[#9a7413]" />
            <h3 className="text-lg font-semibold text-foreground">
              Entidades Credenciadas
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Lista organizada de escolas autorizadas para ministrar a formação teórica e prática obrigatória de Marinheiro e Navegador de Recreio.
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <MapPin className="mb-3 h-5 w-5 text-[#9a7413]" />
            <h3 className="text-lg font-semibold text-foreground">
              Distritos &amp; Portos de Abrigo
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Pesquisa futura por região marítima (Norte, Centro, Lisboa e Tejo, Alentejo, Algarve, Madeira e Açores) e locais de embarque.
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <Compass className="mb-3 h-5 w-5 text-[#9a7413]" />
            <h3 className="text-lg font-semibold text-foreground">
              Aulas Práticas &amp; Exames
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Informação sobre carga horária prática, embarcações de instrução e datas de épocas de exame junto das capitanias e escolas.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-4 border border-border bg-card p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Representa uma escola de navegação?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Envie os dados da sua entidade através da página de contacto para futura integração no diretório.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={ROUTES.estudo.path}
              onClick={(e) => handleLinkClick(e, 'estudo')}
              className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-border bg-background px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:bg-secondary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Centro de Estudo</span>
            </a>
            <a
              href={ROUTES.contacto.path}
              onClick={(e) => handleLinkClick(e, 'contacto')}
              className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#082b3f]"
            >
              <Mail className="h-4 w-4 text-[#ca9e1c]" />
              <span>Sugerir Escola</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
