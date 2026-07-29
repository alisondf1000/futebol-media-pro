import type { Jogo } from "@/types";

interface JogoCardProps {
  jogo: Jogo;
}

export function JogoCard({ jogo }: JogoCardProps) {
  const horario = new Date(jogo.dataHora).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const jogoEncerrado = jogo.placar.mandante !== null;

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background-surface p-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <img src={jogo.mandante.escudo} alt="" className="w-6 h-6 object-contain" />
        <span className="text-sm text-text-primary truncate">{jogo.mandante.nome}</span>
      </div>

      <div className="px-4 text-center shrink-0">
        {jogoEncerrado ? (
          <span className="text-sm font-semibold text-text-primary">
            {jogo.placar.mandante} - {jogo.placar.visitante}
          </span>
        ) : (
          <span className="text-sm font-medium text-text-secondary">{horario}</span>
        )}
      </div>

      <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
        <span className="text-sm text-text-primary truncate text-right">
          {jogo.visitante.nome}
        </span>
        <img src={jogo.visitante.escudo} alt="" className="w-6 h-6 object-contain" />
      </div>
    </div>
  );
}
