import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "./nav-items";
import { cn } from "@/utils/cn";

// Menu lateral, visível apenas em telas médias/grandes (desktop).
export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-60 md:shrink-0 md:border-r md:border-border md:bg-background-surface">
      <div className="flex items-center gap-2 h-16 px-5 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        <span className="font-semibold text-text-primary tracking-tight">
          Futebol Média Pro
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-background-elevated text-primary"
                  : "text-text-secondary hover:bg-background-elevated hover:text-text-primary"
              )
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-text-muted">
          Estatísticas inteligentes para decisões mais precisas.
        </p>
      </div>
    </aside>
  );
}
