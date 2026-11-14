import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import {
  Anchor,
  BookOpen,
  BookMarked,
  ChevronDown,
  ClipboardList,
  FileCheck2,
  Layers,
  MessagesSquare,
  ShipWheel,
} from "lucide-react";

interface SubItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
          <span className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
            <Anchor className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight sm:text-[17px]">
              Glossário do Marinheiro
            </span>
            <span className="font-mono-naut block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Navegador de Recreio · Marinheiro
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavItem to="/" icon={<BookOpen className="h-4 w-4" />} label="Glossário" end />
          <NavItem to="/manual" icon={<BookMarked className="h-4 w-4" />} label="Manual" />
          <NavGroup
            label="Estudo"
            items={[
              { to: "/estudo", icon: <Layers className="h-4 w-4" />, label: "Fichas de estudo" },
              { to: "/quiz", icon: <ClipboardList className="h-4 w-4" />, label: "Quiz" },
            ]}
          />
          <NavGroup
            label="Simuladores"
            items={[
              { to: "/rieam", icon: <ShipWheel className="h-4 w-4" />, label: "Simulador R.I.E.A.M." },
              { to: "/simulador", icon: <FileCheck2 className="h-4 w-4" />, label: "Simulador de Teste DGRM" },
            ]}
          />
          <NavItem to="/instrutor" icon={<MessagesSquare className="h-4 w-4" />} label="Instrutor Virtual" />
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  to,
  icon,
  label,
  end,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "font-mono-naut flex min-h-11 min-w-11 items-center justify-center gap-2 border px-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4",
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : "border-transparent text-foreground hover:border-border hover:bg-secondary",
        ].join(" ")
      }
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  );
}

function NavGroup({ label, items }: { label: string; items: SubItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`font-mono-naut flex min-h-11 min-w-11 items-center justify-center gap-2 border px-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 ${
          open
            ? "border-primary bg-primary text-primary-foreground"
            : "border-transparent text-foreground hover:border-border hover:bg-secondary"
        }`}
      >
        <span className="hidden sm:inline">{label}</span>
        <span className="flex items-center gap-1.5 sm:hidden">
          {items.map((i) => (
            <span key={i.to}>{i.icon}</span>
          ))}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-56 border border-border bg-card shadow-[6px_6px_0_0_#0b3a55]">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  "font-mono-naut flex min-h-11 items-center gap-2.5 border-b border-border px-4 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary",
                ].join(" ")
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
