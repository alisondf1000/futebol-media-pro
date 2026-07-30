# Futebol Média Pro

Estatísticas inteligentes de futebol para decisões mais precisas.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS (tema escuro inspirado no SofaScore)
- React Router v6
- TanStack Query (React Query v5)
- Lucide Icons

## Como rodar

O workflow **Start application** já está configurado. Basta iniciá-lo — ele roda `npm run dev` na porta 5000.

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_BASE_URL` | URL do Apps Script publicado (termina em `/exec`) |

## Backend (Google Apps Script)

O arquivo `apps-script/Code.gs` contém o backend. Ele expõe um endpoint GET com o parâmetro `action`:
- `action=jogos-hoje` → jogos do Brasileirão Série A do dia

Tenta primeiro a **football-data.org** e faz fallback automático para a **API-Football** se necessário. As chaves de API são configuradas como propriedades do script no Apps Script (não no `.env`).

## Estrutura de pastas

```
src/
  api/          # cliente HTTP e funções de chamada à API
  components/   # componentes reutilizáveis
  hooks/        # hooks customizados
  layouts/      # MainLayout, Sidebar, Header, MobileNav
  pages/        # páginas da aplicação
  services/     # configuração de serviços (React Query)
  types/        # tipos TypeScript globais
  utils/        # funções utilitárias
apps-script/    # backend Google Apps Script
```

## Notas técnicas

- O cliente HTTP (`src/api/client.ts`) omite o header `Content-Type` em requisições GET para evitar o preflight CORS do Google Apps Script.
- O Vite está configurado para rodar na porta 5000 com `host: "0.0.0.0"` para funcionar corretamente no preview do Replit.
