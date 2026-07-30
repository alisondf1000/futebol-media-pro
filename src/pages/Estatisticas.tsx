import { useState, useMemo } from "react";

import { useClassificacao } from "@/hooks/useClassificacao";
import { useJogosDoTime } from "@/hooks/useJogosDoTime";
import type { Classificacao, Jogo } from "@/types";

export function Estatisticas() {
  const { data: tabela, isLoading, isError, error } = useClassificacao();

  const [idTimeA, setIdTimeA] = useState<number | undefined>(undefined);
  const [idTimeB, setIdTimeB] = useState<number | undefined>(undefined);

  // Assim que a tabela carrega, pré-seleciona os dois primeiros colocados.
  const timeAPadrao = tabela?.[0]?.time.id;
  const timeBPadrao = tabela?.[1]?.time.id;

  const idA = idTimeA ?? timeAPadrao;
  const idB = idTimeB ?? timeBPadrao;

  const timeA = tabela?.find((t) => t.time.id === idA);
  const timeB = tabela?.find((t) => t.time.id === idB);

  const { data: jogosA } = useJogosDoTime(idA);
  const { data: jogosB } = useJogosDoTime(idB);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background-surface p-4">
        <h1 className="text-lg font-semibold text-text-primary">Comparativo entre times</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Médias, aproveitamento e forma recente no Brasileirão Série A
        </p>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-text-secondary">
          Carregando times...
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-border bg-background-surface p-6 text-sm text-danger">
          Não foi possível carregar os dados: {(error as Error).message}
        </div>
      )}

      {tabela && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SeletorTime
            tabela={tabela}
            idSelecionado={idA}
            aoSelecionar={setIdTimeA}
            label="Time A"
          />
          <SeletorTime
            tabela={tabela}
            idSelecionado={idB}
            aoSelecionar={setIdTimeB}
            label="Time B"
          />
        </div>
      )}

      {timeA && timeB && (
        <div className="rounded-xl border border-border bg-background-surface overflow-hidden">
          <div className="grid grid-cols-3">
            <TimeHeader time={timeA} />
            <div className="flex items-center justify-center text-text-muted text-xs font-medium">
              VS
            </div>
            <TimeHeader time={timeB} alinhamento="right" />
          </div>

          <div className="divide-y divide-border">
            <LinhaComparativa
              label="Pontos"
              valorA={timeA.pontos}
              valorB={timeB.pontos}
            />
            <LinhaComparativa
              label="Aproveitamento"
              valorA={aproveitamento(timeA)}
              valorB={aproveitamento(timeB)}
              sufixo="%"
            />
            <LinhaComparativa
              label="Média de gols pró"
              valorA={media(timeA.golsPro, timeA.jogos)}
              valorB={media(timeB.golsPro, timeB.jogos)}
            />
            <LinhaComparativa
              label="Média de gols contra"
              valorA={media(timeA.golsContra, timeA.jogos)}
              valorB={media(timeB.golsContra, timeB.jogos)}
            />
            <LinhaComparativa
              label="Saldo de gols"
              valorA={timeA.saldoGols}
              valorB={timeB.saldoGols}
            />

            <div className="grid grid-cols-2 gap-4 p-4">
              <FormaRecente jogos={jogosA} idTime={idA} />
              <FormaRecente jogos={jogosB} idTime={idB} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function aproveitamento(time: Classificacao) {
  if (time.jogos === 0) return 0;
  return Math.round((time.pontos / (time.jogos * 3)) * 100);
}

function media(total: number, jogos: number) {
  if (jogos === 0) return "0.0";
  return (total / jogos).toFixed(1);
}

function SeletorTime({
  tabela,
  idSelecionado,
  aoSelecionar,
  label,
}: {
  tabela: Classificacao[];
  idSelecionado: number | undefined;
  aoSelecionar: (id: number) => void;
  label: string;
}) {
  return (
    <label className="block rounded-xl border border-border bg-background-surface p-3">
      <span className="text-xs text-text-muted">{label}</span>
      <select
        value={idSelecionado ?? ""}
        onChange={(e) => aoSelecionar(Number(e.target.value))}
        className="mt-1 w-full bg-transparent text-sm text-text-primary outline-none"
      >
        {tabela.map((linha) => (
          <option key={linha.time.id} value={linha.time.id} className="bg-background-surface">
            {linha.time.nome}
          </option>
        ))}
      </select>
    </label>
  );
}

function TimeHeader({ time, alinhamento }: { time: Classificacao; alinhamento?: "right" }) {
  return (
    <div
      className={`flex items-center gap-2 p-4 ${
        alinhamento === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <img src={time.time.escudo} alt="" className="w-8 h-8 object-contain shrink-0" />
      <span className="text-sm font-medium text-text-primary truncate">{time.time.nome}</span>
    </div>
  );
}

function LinhaComparativa({
  label,
  valorA,
  valorB,
  sufixo = "",
}: {
  label: string;
  valorA: number | string;
  valorB: number | string;
  sufixo?: string;
}) {
  return (
    <div className="grid grid-cols-3 items-center px-4 py-3">
      <span className="text-sm font-semibold text-text-primary">
        {valorA}
        {sufixo}
      </span>
      <span className="text-xs text-text-muted text-center">{label}</span>
      <span className="text-sm font-semibold text-text-primary text-right">
        {valorB}
        {sufixo}
      </span>
    </div>
  );
}

function FormaRecente({ jogos, idTime }: { jogos: Jogo[] | undefined; idTime: number | undefined }) {
  const forma = useMemo(() => calcularForma(jogos, idTime), [jogos, idTime]);

  return (
    <div>
      <p className="text-xs text-text-muted mb-2">Últimos 5 jogos</p>
      <div className="flex gap-1.5">
        {forma.length === 0 && <span className="text-xs text-text-muted">Sem dados</span>}
        {forma.map((resultado, i) => (
          <span
            key={i}
            className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-bold ${
              resultado === "V"
                ? "bg-primary/20 text-primary"
                : resultado === "D"
                  ? "bg-danger/20 text-danger"
                  : "bg-background-elevated text-text-secondary"
            }`}
          >
            {resultado}
          </span>
        ))}
      </div>
    </div>
  );
}

function calcularForma(jogos: Jogo[] | undefined, idTime: number | undefined): ("V" | "E" | "D")[] {
  if (!jogos || !idTime) return [];

  const finalizados = jogos
    .filter((jogo) => jogo.placar.mandante !== null)
    .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())
    .slice(0, 5);

  return finalizados.map((jogo) => {
    const éMandante = jogo.mandante.id === idTime;
    const golsTime = éMandante ? jogo.placar.mandante! : jogo.placar.visitante!;
    const golsAdversario = éMandante ? jogo.placar.visitante! : jogo.placar.mandante!;

    if (golsTime > golsAdversario) return "V";
    if (golsTime < golsAdversario) return "D";
    return "E";
  });
}
