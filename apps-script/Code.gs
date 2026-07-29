/**
 * FUTEBOL MÉDIA PRO — API REST (Google Apps Script)
 * ---------------------------------------------------
 * Este script funciona como backend temporário do projeto.
 * Ele expõe endpoints via doGet(), que o front-end consome
 * através de src/api/client.ts.
 *
 * CONFIGURAÇÃO NECESSÁRIA (antes de publicar):
 * 1. No editor do Apps Script, vá em "Configurações do projeto"
 *    (ícone de engrenagem) > "Propriedades do script".
 * 2. Adicione duas propriedades:
 *    - FOOTBALL_DATA_TOKEN  -> sua chave da football-data.org
 *    - API_FOOTBALL_KEY     -> sua chave da API-Football (RapidAPI)
 * 3. Publique como "Implantação" > "Nova implantação" > tipo "App da Web".
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 4. Copie a URL gerada (termina em /exec) e use como
 *    VITE_API_BASE_URL no front-end.
 */

const COMPETICAO_FOOTBALL_DATA = "BSA"; // Brasileirão Série A
const LIGA_API_FOOTBALL = 71; // ID do Brasileirão Série A na API-Football
const TEMPORADA_API_FOOTBALL = 2026;

function doGet(e) {
  const action = e.parameter.action;

  let resultado;
  try {
    if (action === "jogos-hoje") {
      resultado = buscarJogosHoje();
    } else {
      resultado = { success: false, message: "Ação não reconhecida: " + action };
    }
  } catch (erro) {
    resultado = { success: false, message: "Erro interno: " + erro.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Busca os jogos do dia no Brasileirão.
 * Tenta primeiro a football-data.org; se falhar (erro, limite de
 * requisições, etc.), tenta a API-Football automaticamente.
 */
function buscarJogosHoje() {
  const hoje = Utilities.formatDate(new Date(), "GMT-3", "yyyy-MM-dd");

  try {
    const jogos = buscarJogosFootballData(hoje);
    return { success: true, fonte: "football-data.org", data: jogos };
  } catch (erroPrimario) {
    Logger.log("football-data.org falhou: " + erroPrimario.message);

    try {
      const jogos = buscarJogosApiFootball(hoje);
      return { success: true, fonte: "api-football", data: jogos };
    } catch (erroFallback) {
      Logger.log("API-Football também falhou: " + erroFallback.message);
      throw new Error(
        "Todas as fontes de dados falharam. football-data.org: " +
          erroPrimario.message +
          " | api-football: " +
          erroFallback.message
      );
    }
  }
}

function buscarJogosFootballData(data) {
  const token = PropertiesService.getScriptProperties().getProperty("FOOTBALL_DATA_TOKEN");
  if (!token) throw new Error("FOOTBALL_DATA_TOKEN não configurado.");

  const url =
    "https://api.football-data.org/v4/competitions/" +
    COMPETICAO_FOOTBALL_DATA +
    "/matches?dateFrom=" + data + "&dateTo=" + data;

  const resposta = UrlFetchApp.fetch(url, {
    headers: { "X-Auth-Token": token },
    muteHttpExceptions: true,
  });

  if (resposta.getResponseCode() !== 200) {
    throw new Error("HTTP " + resposta.getResponseCode() + " - " + resposta.getContentText());
  }

  const json = JSON.parse(resposta.getContentText());

  return json.matches.map(function (jogo) {
    return {
      id: jogo.id,
      dataHora: jogo.utcDate,
      status: jogo.status,
      rodada: jogo.matchday,
      mandante: { nome: jogo.homeTeam.name, escudo: jogo.homeTeam.crest },
      visitante: { nome: jogo.awayTeam.name, escudo: jogo.awayTeam.crest },
      placar: {
        mandante: jogo.score.fullTime.home,
        visitante: jogo.score.fullTime.away,
      },
    };
  });
}

function buscarJogosApiFootball(data) {
  const key = PropertiesService.getScriptProperties().getProperty("API_FOOTBALL_KEY");
  if (!key) throw new Error("API_FOOTBALL_KEY não configurado.");

  const url =
    "https://v3.football.api-sports.io/fixtures?league=" +
    LIGA_API_FOOTBALL +
    "&season=" + TEMPORADA_API_FOOTBALL +
    "&date=" + data;

  const resposta = UrlFetchApp.fetch(url, {
    headers: { "x-apisports-key": key },
    muteHttpExceptions: true,
  });

  if (resposta.getResponseCode() !== 200) {
    throw new Error("HTTP " + resposta.getResponseCode() + " - " + resposta.getContentText());
  }

  const json = JSON.parse(resposta.getContentText());

  return json.response.map(function (jogo) {
    return {
      id: jogo.fixture.id,
      dataHora: jogo.fixture.date,
      status: jogo.fixture.status.short,
      rodada: jogo.league.round,
      mandante: { nome: jogo.teams.home.name, escudo: jogo.teams.home.logo },
      visitante: { nome: jogo.teams.away.name, escudo: jogo.teams.away.logo },
      placar: {
        mandante: jogo.goals.home,
        visitante: jogo.goals.away,
      },
    };
  });
}
