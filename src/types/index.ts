// Tipos globais do projeto. Serão expandidos conforme a API
// (Google Apps Script) e as funcionalidades forem implementadas.

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  fonte?: string;
}

export interface TimeResumo {
  id: number;
  nome: string;
  escudo: string;
}

export interface Placar {
  mandante: number | null;
  visitante: number | null;
}

export interface Jogo {
  id: number;
  dataHora: string;
  status: string;
  rodada?: number | string;
  competicao?: string;
  mandante: TimeResumo;
  visitante: TimeResumo;
  placar: Placar;
}

export interface Classificacao {
  posicao: number;
  time: TimeResumo;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
}
