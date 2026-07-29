import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "./nav-items";
import { cn } from "@/utils/cn";

// Menu inferior fixo, visível apenas em telas pequenas (mobile).
export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 flex items-stretch justify-around border-t border-border bg-background-surface pb-[env(safe-area-inset-bottom)]">
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/"}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              isActive ? "text-primary" : "text-text-secondary"
            )
          }
        >
          <Icon size={20} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
