import { Search, Bell } from "lucide-react";

// Header fixo no topo da área principal.
export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-border bg-background-surface">
      <div className="flex items-center gap-2 md:hidden">
        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        <span className="font-semibold text-text-primary tracking-tight">
          Futebol Média Pro
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2 w-full max-w-sm px-3 py-2 rounded-xl bg-background-elevated text-text-muted">
        <Search size={16} />
        <span className="text-sm">Buscar times, ligas, jogadores...</span>
      </div>

      <button
        type="button"
        className="p-2 rounded-xl text-text-secondary hover:bg-background-elevated hover:text-text-primary transition-colors"
        aria-label="Notificações"
      >
        <Bell size={20} />
      </button>
    </header>
  );
}
