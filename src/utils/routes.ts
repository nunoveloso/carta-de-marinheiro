export type RouteId =
  | 'home'
  | 'glossario'
  | 'estudo'
  | 'progresso'
  | 'flashcards'
  | 'guias-visuais'
  | 'testes'
  | 'sobre'
  | 'contacto';

export interface RouteMeta {
  id: RouteId;
  path: string;
  label: string;
  pageTitle: string;
  description: string;
  parentId?: RouteId;
}

export const ROUTES: Record<RouteId, RouteMeta> = {
  home: {
    id: 'home',
    path: '/',
    label: 'Início',
    pageTitle: 'Carta de Marinheiro — Início | Glossário & Caderno Náutico',
    description:
      'Plataforma PWA de apoio ao estudo da Carta de Marinheiro (DGRM): glossário náutico interativo, fichas de estudo, guias visuais e simulador de exame.',
  },
  glossario: {
    id: 'glossario',
    path: '/glossario',
    label: 'Glossário',
    pageTitle: 'Glossário Náutico Interativo | Carta de Marinheiro',
    description:
      'Consulte os termos e definições oficiais do Manual do Marinheiro com pesquisa instantânea, pronúncia áudio, regras R.I.E.A.M. e apontamentos.',
  },
  estudo: {
    id: 'estudo',
    path: '/estudo',
    label: 'Estudo',
    pageTitle: 'Centro de Estudo | Carta de Marinheiro',
    description:
      'Aceda às ferramentas de preparação para o exame de Carta de Marinheiro: progresso, fichas de estudo, guias visuais e simulador oficial.',
  },
  progresso: {
    id: 'progresso',
    path: '/estudo/progresso',
    label: 'Progresso',
    pageTitle: 'Progresso de Estudo | Carta de Marinheiro',
    description:
      'Acompanhe a cobertura 360° do programa DGRM, aproveitamento nos simuladores, termos favoritados e caderno de apontamentos pessoais.',
    parentId: 'estudo',
  },
  flashcards: {
    id: 'flashcards',
    path: '/estudo/flashcards',
    label: 'Fichas de Estudo',
    pageTitle: 'Fichas de Estudo (Flashcards) | Carta de Marinheiro',
    description:
      'Pratique e memorize termos náuticos do Manual do Marinheiro com sessões interativas de fichas de estudo filtradas por categoria e importância.',
    parentId: 'estudo',
  },
  'guias-visuais': {
    id: 'guias-visuais',
    path: '/estudo/guias-visuais',
    label: 'Guias Visuais',
    pageTitle: 'Guias Visuais Náuticos | Carta de Marinheiro',
    description:
      'Explore esquemas 2D e 3D da embarcação, balões e luzes R.I.E.A.M., sistema de balizamento IALA Região A, bandeiras CIS e segurança a bordo.',
    parentId: 'estudo',
  },
  testes: {
    id: 'testes',
    path: '/estudo/testes',
    label: 'Simulador de Exame',
    pageTitle: 'Simulador de Exame DGRM | Carta de Marinheiro',
    description:
      'Realize simuladores cronometrados de preparação para o exame de Carta de Marinheiro com validação pelos critérios oficiais da DGRM.',
    parentId: 'estudo',
  },
  sobre: {
    id: 'sobre',
    path: '/sobre',
    label: 'Sobre',
    pageTitle: 'Sobre o Projeto | Carta de Marinheiro',
    description:
      'Conheça o projeto Carta de Marinheiro, alinhado com o Manual do Marinheiro da DGRM, R.I.E.A.M. 1972 e Sistema de Balizamento IALA Região A.',
  },
  contacto: {
    id: 'contacto',
    path: '/contacto',
    label: 'Contacto',
    pageTitle: 'Contacto | Carta de Marinheiro',
    description:
      'Entre em contacto com a equipa do projeto Carta de Marinheiro para sugestões, correções náuticas ou questões técnicas.',
  },
};

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

export function getRouteFromPathname(pathname: string): RouteMeta {
  const normalized = normalizePathname(pathname);
  const match = Object.values(ROUTES).find((r) => r.path === normalized);
  return match || ROUTES.home;
}

function setMetaTag(selector: string, attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonicalLink(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function applyRouteSEO(route: RouteMeta) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const canonicalUrl = `${window.location.origin}${route.path}`;

  document.title = route.pageTitle;
  setMetaTag('meta[name="description"]', 'name', 'description', route.description);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', route.pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', route.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', route.pageTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', route.description);
  setCanonicalLink(canonicalUrl);
}
