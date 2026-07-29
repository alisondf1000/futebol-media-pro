import { useQuery } from "@tanstack/react-query";

import { getJogosHoje } from "@/api/jogos";

// Hook que busca e mantém em cache os jogos do dia.
export function useJogosHoje() {
  return useQuery({
    queryKey: ["jogos-hoje"],
    queryFn: getJogosHoje,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}
