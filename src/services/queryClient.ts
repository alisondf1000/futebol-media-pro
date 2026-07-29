import { QueryClient } from "@tanstack/react-query";

// Instância única do React Query, usada em toda a aplicação.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
