// Página exibida para rotas inexistentes.
export function NotFound() {
  return (
    <div className="rounded-xl border border-border bg-background-surface p-6">
      <h1 className="text-lg font-semibold text-text-primary">
        Página não encontrada
      </h1>
      <p className="mt-1 text-sm text-text-secondary">
        A página que você tentou acessar não existe.
      </p>
    </div>
  );
}
