import { Link } from "react-router-dom";
import { useClassificacao } from "@/hooks/useClassificacao";

export function Competicoes() {
  const { data: classificacao, isLoading, isError, error } = useClassificacao();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background-surface p-4">
        <h1 className="text-lg font-semibold text-text-primary">Classificação</h1>
        <p className="mt-1 text-sm text-text-secondary">Brasileirão Série A</p>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-text-secondary">
          Carregando classificação...
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-danger">
          Não foi possível carregar a classificação: {(error as Error).message}
        </div>
      )}

      {!isLoading && !isError && classificacao?.length === 0 && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-text-secondary">
          Classificação indisponível no momento.
        </div>
      )}

      {!isLoading && !isError && classificacao && classificacao.length > 0 && (
        <div className="rounded-xl border border-border bg-background-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary">
                  <th className="px-4 py-3 text-center font-medium w-10">Pos</th>
                  <th className="px-4 py-3 text-left font-medium">Time</th>
                  <th className="px-4 py-3 text-center font-medium w-10">P</th>
                  <th className="px-4 py-3 text-center font-medium w-10">J</th>
                  <th className="px-4 py-3 text-center font-medium w-10">V</th>
                  <th className="px-4 py-3 text-center font-medium w-10">E</th>
                  <th className="px-4 py-3 text-center font-medium w-10">D</th>
                  <th className="px-4 py-3 text-center font-medium w-10">GP</th>
                  <th className="px-4 py-3 text-center font-medium w-10">GC</th>
                  <th className="px-4 py-3 text-center font-medium w-10">SG</th>
                </tr>
              </thead>
              <tbody>
                {classificacao.map((item, index) => (
                  <tr
                    key={item.posicao}
                    className={[
                      "border-b border-border last:border-0 transition-colors hover:bg-white/5",
                      index < 6 ? "border-l-2 border-l-green-500" : "",
                      index >= 6 && index < 12 ? "border-l-2 border-l-blue-500" : "",
                      index >= 17 ? "border-l-2 border-l-red-500" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <td className="px-4 py-3 text-center text-text-secondary font-medium">
                      {item.posicao}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/time/${item.time.id}`}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        {item.time.escudo ? (
                          <img
                            src={item.time.escudo}
                            alt={item.time.nome}
                            className="h-6 w-6 object-contain"
                          />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-white/10" />
                        )}
                        <span className="font-medium text-text-primary">{item.time.nome}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-text-primary">
                      {item.pontos}
                    </td>
                    <td className="px-4 py-3 text-center text-text-secondary">{item.jogos}</td>
                    <td className="px-4 py-3 text-center text-text-secondary">{item.vitorias}</td>
                    <td className="px-4 py-3 text-center text-text-secondary">{item.empates}</td>
                    <td className="px-4 py-3 text-center text-text-secondary">{item.derrotas}</td>
                    <td className="px-4 py-3 text-center text-text-secondary">{item.golsPro}</td>
                    <td className="px-4 py-3 text-center text-text-secondary">{item.golsContra}</td>
                    <td
                      className={[
                        "px-4 py-3 text-center font-medium",
                        item.saldoGols > 0
                          ? "text-green-400"
                          : item.saldoGols < 0
                          ? "text-red-400"
                          : "text-text-secondary",
                      ].join(" ")}
                    >
                      {item.saldoGols > 0 ? `+${item.saldoGols}` : item.saldoGols}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap gap-4 border-t border-border px-4 py-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-0.5 bg-green-500 rounded" />
              Libertadores
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-0.5 bg-blue-500 rounded" />
              Sul-Americana
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-0.5 bg-red-500 rounded" />
              Rebaixamento
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
