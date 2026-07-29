# Futebol Média Pro

Estatísticas inteligentes para decisões mais precisas.

## Stack desta etapa

- React + Vite + TypeScript
- Tailwind CSS (tema escuro inspirado no SofaScore)
- React Router
- React Query
- Lucide Icons

Nesta etapa **não há banco de dados nem funcionalidades** — apenas a estrutura
do projeto e o layout principal (sidebar no desktop, menu inferior no mobile,
header e área de conteúdo). A comunicação com dados reais será feita
futuramente por uma API REST criada com Google Apps Script, através de
`src/api/client.ts`.

## Como rodar localmente

1. Instale o [Node.js](https://nodejs.org/) (versão 18 ou superior).
2. Extraia este projeto em uma pasta no seu computador.
3. Abra um terminal dentro da pasta do projeto.
4. Instale as dependências:

   ```bash
   npm install
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Abra no navegador o endereço mostrado no terminal (geralmente
   `http://localhost:5173`).

## Integração com a API (jogos do dia)

O backend fica no Google Apps Script (pasta `apps-script/Code.gs`). Passos:

1. Acesse [script.google.com](https://script.google.com), crie um novo projeto e
   cole o conteúdo de `apps-script/Code.gs`.
2. Em "Configurações do projeto" (ícone de engrenagem) → "Propriedades do
   script", adicione:
   - `FOOTBALL_DATA_TOKEN` → sua chave da football-data.org
   - `API_FOOTBALL_KEY` → sua chave da API-Football
3. Clique em "Implantar" → "Nova implantação" → tipo **App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Copie a URL gerada (termina em `/exec`).
5. No projeto React, copie `.env.example` para `.env` e cole a URL em
   `VITE_API_BASE_URL`.
6. Rode `npm run dev` novamente — a página inicial já busca os jogos do
   Brasileirão do dia via `useJogosHoje()`.

Se a football-data.org falhar (limite de requisições, instabilidade, etc.), o
próprio Apps Script tenta automaticamente a API-Football como alternativa.

## Estrutura de pastas

```
src/
  components/   # componentes reutilizáveis (ainda vazio)
  layouts/       # MainLayout, Sidebar, Header, MobileNav
  pages/         # páginas da aplicação
  hooks/         # hooks customizados (ainda vazio)
  services/      # configuração de serviços (ex: React Query)
  api/           # cliente HTTP para a futura API (Google Apps Script)
  types/         # tipos TypeScript globais
  utils/         # funções utilitárias
  assets/        # imagens, ícones, etc.
```
