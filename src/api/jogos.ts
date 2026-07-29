import { apiClient } from "./client";
import type { ApiResponse, Jogo } from "@/types";

// Busca os jogos do Brasileirão no dia de hoje.
// O backend (Google Apps Script) já cuida do fallback entre
// football-data.org e API-Football — aqui só consumimos o resultado.
export async function getJogosHoje(): Promise<Jogo[]> {
  const response = await apiClient.get<ApiResponse<Jogo[]>>("", {
    action: "jogos-hoje",
  });

  if (!response.success) {
    throw new Error(response.message ?? "Não foi possível carregar os jogos.");
  }

  return response.data;
}
