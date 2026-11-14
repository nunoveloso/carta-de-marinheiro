import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { AppHeader } from "@/components/AppHeader";
import { TermCard } from "@/components/TermCard";
import { TermDetail } from "@/components/TermDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/providers/trpc";
import { categoryColor, categorySoft, titleMatches, type Term } from "@/lib/glossary";
import { BookOpenText, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [category, setCategory] = useState<string | null>(searchParams.get("categoria"));
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // refletir a categoria no URL (ligações a partir das cartas de glossário)
  useEffect(() => {
    const current = searchParams.get("categoria");
    if (category !== current) {
      const next = new URLSearchParams(searchParams);
      if (category) next.set("categoria", category);
      else next.delete("categoria");
      setSearchParams(next, { replace: true });
    }
  }, [category, searchParams, setSearchParams]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  const meta = trpc.glossary.meta.useQuery();
  const indexQuery = trpc.glossary.index.useQuery();
  const list = trpc.glossary.list.useQuery({
    category: category ?? undefined,
    subcategory: subcategory ?? undefined,
    search: debounced || undefined,
  });

  const terms = useMemo(() => (list.data ?? []) as Term[], [list.data]);
  const index = useMemo(() => indexQuery.data ?? [], [indexQuery.data]);
  const visible = useMemo(
    () => (section ? terms.filter((t) => t.section === section) : terms),
    [terms, section],
  );

  // pesquisa dividida: correspondências no nome em cima, dentro das cartas em baixo
  const q = debounced.trim();
  const searching = q.length >= 2;
  const titleHits = useMemo(
    () => (searching ? visible.filter((t) => titleMatches(t.term, q)) : []),
    [visible, searching, q],
  );
  const bodyHits = useMemo(
    () => (searching ? visible.filter((t) => !titleMatches(t.term, q)) : []),
    [visible, searching, q],
  );

  const openIndex = openSlug ? visible.findIndex((t) => t.slug === openSlug) : -1;
  // o termo aberto pode vir de uma ligação cruzada fora da lista filtrada
  const openTerm = openIndex >= 0 ? visible[openIndex] : null;
  const linkedTerm = trpc.glossary.bySlug.useQuery(
    { slug: openSlug! },
    { enabled: openSlug !== null && openIndex === -1 },
  );
  const detailTerm = openTerm ?? ((linkedTerm.data as Term | null) ?? null);

  const pickCategory = (c: string | null) => {
    setCategory(c);
    setSubcategory(null);
    setSection(null);
  };

  const hasFilters = !!(category || subcategory || section || search);

  return (
    <div className="min-h-dvh">
      <AppHeader />

      {/* introdução */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono-naut text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Manual do Marinheiro 2021 · 13 testes de exame
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Os termos técnicos da carta de Marinheiro, explicados e ilustrados.
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {(meta.data?.categories ?? []).map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => pickCategory(category === c.name ? null : c.name)}
                className="font-mono-naut min-h-11 cursor-pointer border px-3 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={
                  category === c.name
                    ? { background: categoryColor(c.name), color: "#fbf9f0", borderColor: categoryColor(c.name) }
                    : { background: categorySoft(c.name), color: categoryColor(c.name), borderColor: "transparent" }
                }
              >
                {c.name} · {c.count}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-6 sm:px-6">
        {/* filtros — barra lateral no desktop */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterPanel
              meta={meta.data}
              category={category}
              subcategory={subcategory}
              section={section}
              onCategory={pickCategory}
              onSubcategory={(s) => setSubcategory(subcategory === s ? null : s)}
              onSection={(s) => setSection(section === s ? null : s)}
            />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* pesquisa + filtro móvel */}
          <div className="flex gap-2">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Procurar termo, definição ou secção…"
                className="h-12 w-full border border-border bg-card pl-10 pr-10 text-[15px] outline-none placeholder:text-muted-foreground/70 focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Limpar pesquisa"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="font-mono-naut flex h-12 cursor-pointer items-center gap-2 border border-border bg-card px-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {filtersOpen && (
            <div className="mt-3 border border-border bg-card p-4 lg:hidden">
              <FilterPanel
                meta={meta.data}
                category={category}
                subcategory={subcategory}
                section={section}
                onCategory={pickCategory}
                onSubcategory={(s) => setSubcategory(subcategory === s ? null : s)}
                onSection={(s) => setSection(section === s ? null : s)}
              />
            </div>
          )}

          {/* contagem / limpar */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="font-mono-naut text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {list.isLoading
                ? "A carregar…"
                : `${visible.length} ${visible.length === 1 ? "termo" : "termos"}`}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  pickCategory(null);
                }}
                className="font-mono-naut min-h-11 cursor-pointer text-[11px] font-semibold uppercase tracking-[0.12em] text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {/* grelha */}
          {list.isLoading ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-none" />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="mt-4 flex flex-col items-center gap-3 border border-dashed border-border bg-card px-6 py-16 text-center">
              <BookOpenText className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-lg font-semibold">Nenhum termo encontrado</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Experimenta outra palavra ou limpa os filtros para veres todo o glossário.
              </p>
            </div>
          ) : searching ? (
            <div className="pb-16">
              {titleHits.length > 0 && (
                <>
                  <p className="font-mono-naut mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    No nome dos termos · {titleHits.length}
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {titleHits.map((t) => (
                      <TermCard key={t.slug} term={t} onOpen={setOpenSlug} query={debounced} />
                    ))}
                  </div>
                </>
              )}
              {bodyHits.length > 0 && (
                <>
                  {titleHits.length > 0 && <hr className="my-6 border-t-2 border-border" />}
                  <p className="font-mono-naut mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Dentro das cartas · {bodyHits.length}
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {bodyHits.map((t) => (
                      <TermCard key={t.slug} term={t} onOpen={setOpenSlug} query={debounced} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((t) => (
                <TermCard key={t.slug} term={t} onOpen={setOpenSlug} query={debounced} />
              ))}
            </div>
          )}
        </main>
      </div>

      <TermDetail
        term={detailTerm}
        open={detailTerm !== null}
        onOpenChange={(o) => !o && setOpenSlug(null)}
        onPrev={() => openIndex > 0 && setOpenSlug(visible[openIndex - 1].slug)}
        onNext={() => openIndex < visible.length - 1 && setOpenSlug(visible[openIndex + 1].slug)}
        position={Math.max(0, openIndex)}
        total={openIndex >= 0 ? visible.length : 1}
        index={index}
        onNavigate={setOpenSlug}
      />

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-6 sm:px-6">
          <p className="font-mono-naut text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Fontes: Manual do Marinheiro 2021 · Portaria n.º 1464/2002 · Testes de exame (DGRM)
          </p>
          <p className="font-mono-naut text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Glossário de estudo — não substitui a legislação oficial
          </p>
        </div>
      </footer>
    </div>
  );
}

function FilterPanel({
  meta,
  category,
  subcategory,
  section,
  onCategory,
  onSubcategory,
  onSection,
}: {
  meta:
    | {
        categories: { name: string; count: number; subcategories: { name: string; count: number }[] }[];
        sections: { name: string; count: number }[];
      }
    | undefined;
  category: string | null;
  subcategory: string | null;
  section: string | null;
  onCategory: (c: string | null) => void;
  onSubcategory: (s: string) => void;
  onSection: (s: string) => void;
}) {
  if (!meta) return <Skeleton className="h-64 w-full rounded-none" />;
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono-naut mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Categorias dos testes
        </p>
        <ul className="space-y-1">
          <li>
            <FilterItem
              active={category === null}
              label="Todas"
              onClick={() => onCategory(null)}
            />
          </li>
          {meta.categories.map((c) => (
            <li key={c.name}>
              <FilterItem
                active={category === c.name}
                label={c.name}
                count={c.count}
                onClick={() => onCategory(c.name)}
                color={categoryColor(c.name)}
              />
              {category === c.name && (
                <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                  {c.subcategories.map((s) => (
                    <FilterItem
                      key={s.name}
                      active={subcategory === s.name}
                      label={s.name}
                      count={s.count}
                      small
                      onClick={() => onSubcategory(s.name)}
                    />
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-mono-naut mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Secções do manual
        </p>
        <ul className="space-y-1">
          {meta.sections.map((s) => (
            <FilterItem
              key={s.name}
              active={section === s.name}
              label={s.name}
              count={s.count}
              small
              onClick={() => onSection(s.name)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FilterItem({
  active,
  label,
  count,
  onClick,
  small,
  color,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
  small?: boolean;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 px-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        small ? "text-[13.5px]" : "text-[14.5px] font-medium",
        active ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
      ].join(" ")}
    >
      <span className="flex items-center gap-2">
        {color && !active && (
          <span className="h-2.5 w-2.5 shrink-0" style={{ background: color }} />
        )}
        {label}
      </span>
      {count !== undefined && (
        <span className={`font-mono-naut text-[10px] ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {count}
        </span>
      )}
    </button>
  );
}
