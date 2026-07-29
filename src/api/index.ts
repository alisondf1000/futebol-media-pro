// Ponto central para os futuros módulos de endpoints (ex: times.ts, partidas.ts,
// estatisticas.ts), todos consumindo a API REST criada com Google Apps Script.
export { apiClient } from "./client";
export { getJogosHoje } from "./jogos";
