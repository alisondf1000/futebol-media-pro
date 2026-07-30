import { useQuery } from "@tanstack/react-query";
import { getJogosDoTime } from "@/api/time";

export function useJogosDoTime(idTime: number | undefined) {
  return useQuery({
    queryKey: ["jogos-time", idTime],
    queryFn: () => getJogosDoTime(idTime as number),
    enabled: idTime !== undefined,
    staleTime: 1000 * 60 * 10,
  });
}
