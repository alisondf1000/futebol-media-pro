import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Header } from "./Header";

// Estrutura visual principal do app:
// - Sidebar (desktop) | MobileNav (celular)
// - Header no topo
// - Área principal onde as páginas são renderizadas (Outlet do React Router)
export function MainLayout() {
  return (
    <div className="min-h-screen flex bg-background text-text-primary">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>

        <MobileNav />
      </div>
    </div>
  );
}
