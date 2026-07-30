import { apiClient } from "./client";
import type { ApiResponse, Jogo } from "@/types";

export async function getJogosDoTime(idTime: number): Promise<Jogo[]> {
  const response = await apiClient.get<ApiResponse<Jogo[]>>("", {
    action: "jogos-time",
    id: idTime,
  });

  if (!response.success) {
    throw new Error(response.message ?? "Não foi possível carregar os jogos do time.");
  }

  return response.data;
}
