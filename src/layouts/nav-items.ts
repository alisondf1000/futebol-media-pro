import {
  Home,
  Trophy,
  BarChart3,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

// Itens de navegação principais do app.
// Ainda sem funcionalidade: apenas estrutura de menu (desktop + mobile).
export const NAV_ITEMS: NavItem[] = [
  { label: "Início", path: "/", icon: Home },
  { label: "Competições", path: "/competicoes", icon: Trophy },
  { label: "Estatísticas", path: "/estatisticas", icon: BarChart3 },
  { label: "Favoritos", path: "/favoritos", icon: Star },
  { label: "Perfil", path: "/perfil", icon: User },
];
