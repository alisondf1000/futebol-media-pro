import { useJogosHoje } from "@/hooks/useJogosHoje";
import { JogoCard } from "@/components/JogoCard";

export function Home() {
  const { data: jogos, isLoading, isError, error } = useJogosHoje();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background-surface p-4">
        <h1 className="text-lg font-semibold text-text-primary">Jogos de hoje</h1>
        <p className="mt-1 text-sm text-text-secondary">Brasileirão Série A</p>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-text-secondary">
          Carregando jogos...
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-danger">
          Não foi possível carregar os jogos: {(error as Error).message}
        </div>
      )}

      {!isLoading && !isError && jogos?.length === 0 && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-text-secondary">
          Nenhum jogo do Brasileirão hoje.
        </div>
      )}

      {jogos?.map((jogo) => (
        <JogoCard key={jogo.id} jogo={jogo} />
      ))}
    </div>
  );
}
