type ClassValue = string | number | boolean | null | undefined;

// Utilitário simples para concatenar classes condicionalmente,
// evitando dependências extras (clsx/tailwind-merge) nesta etapa inicial.
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
