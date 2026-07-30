import { apiClient } from "./client";
import type { ApiResponse, Classificacao } from "@/types";

// Busca a tabela de classificação do Brasileirão Série A.
export async function getClassificacao(): Promise<Classificacao[]> {
  const response = await apiClient.get<ApiResponse<Classificacao[]>>("", {
    action: "classificacao",
  });

  if (!response.success) {
    throw new Error(response.message ?? "Não foi possível carregar a classificação.");
  }

  return response.data;
}
