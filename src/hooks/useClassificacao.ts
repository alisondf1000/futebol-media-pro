import { useQuery } from "@tanstack/react-query";

import { getClassificacao } from "@/api/classificacao";

// Hook que busca e mantém em cache a classificação do Brasileirão.
export function useClassificacao() {
  return useQuery({
    queryKey: ["classificacao"],
    queryFn: getClassificacao,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
