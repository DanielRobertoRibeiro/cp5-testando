// Importa os módulos usados pelo servidor.
const express = require("express");
const cors = require("cors");

// Carrega o arquivo .env com o recurso nativo do Node.js, quando ele existir.
try {
  process.loadEnvFile();
} catch (erro) {
  if (erro.code !== "ENOENT") {
    console.error("Não foi possível ler o arquivo .env.");
  }
}

// Cria o servidor e define as configurações principais.
const app = express();
const PORT = Number(process.env.PORT) || 3001;
const ORIGENS_PERMITIDAS = (
  process.env.FRONTEND_URL || "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origem) => origem.trim())
  .filter(Boolean);

app.use(express.json());
app.use(cors({ origin: ORIGENS_PERMITIDAS }));

// Rota simples para verificar se o backend está disponível.
app.get("/api/status", (req, res) => {
  res.json({ mensagem: "API do GourmetOn disponível." });
});

// Busca receitas aleatórias na Spoonacular e devolve apenas os campos da tela.
app.get("/api/receitas", async (req, res) => {
  const quantidadeRecebida = Number(req.query.quantidade ?? 6);

  if (!Number.isInteger(quantidadeRecebida) || quantidadeRecebida < 1 || quantidadeRecebida > 12) {
    return res.status(400).json({
      erro: "A quantidade deve ser um número inteiro entre 1 e 12.",
    });
  }

  const chaveApi = process.env.SPOONACULAR_API_KEY;

  if (!chaveApi) {
    return res.status(503).json({
      erro: "A chave da Spoonacular ainda não foi configurada no servidor.",
    });
  }

  const enderecoApi = new URL("https://api.spoonacular.com/recipes/random");
  enderecoApi.searchParams.set("number", String(quantidadeRecebida));

  try {
    const resposta = await fetch(enderecoApi, {
      headers: {
        "x-api-key": chaveApi,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!resposta.ok) {
      console.error(`A Spoonacular respondeu com status ${resposta.status}.`);

      if (resposta.status === 401 || resposta.status === 403) {
        return res.status(503).json({
          erro: "A chave da Spoonacular foi rejeitada. Verifique a configuração do servidor.",
        });
      }

      if (resposta.status === 402 || resposta.status === 429) {
        return res.status(503).json({
          erro: "O limite de consultas da Spoonacular foi atingido. Tente novamente mais tarde.",
        });
      }

      return res.status(502).json({
        erro: "A Spoonacular não conseguiu responder à consulta.",
      });
    }

    const dados = await resposta.json();
    const receitas = Array.isArray(dados.recipes)
      ? dados.recipes.map((receita) => ({
          id: receita.id,
          titulo: receita.title,
          imagem: receita.image,
          tempoPreparo: receita.readyInMinutes,
          porcoes: receita.servings,
          tipos: Array.isArray(receita.dishTypes) ? receita.dishTypes : [],
          cozinhas: Array.isArray(receita.cuisines) ? receita.cuisines : [],
        }))
      : [];

    if (receitas.length === 0) {
      return res.status(502).json({
        erro: "A Spoonacular não retornou receitas nesta consulta.",
      });
    }

    return res.json({ receitas });
  } catch (erro) {
    if (erro.name === "TimeoutError") {
      return res.status(504).json({
        erro: "A Spoonacular demorou para responder. Tente novamente.",
      });
    }

    console.error("Falha de rede ao consultar a Spoonacular.");
    return res.status(502).json({
      erro: "Não foi possível buscar as receitas.",
    });
  }
});

// Inicia o servidor.
app.listen(PORT, () => {
  console.log(`Servidor GourmetOn rodando em http://localhost:${PORT}`);

  if (!process.env.SPOONACULAR_API_KEY) {
    console.log("Aviso: configure SPOONACULAR_API_KEY para consultar receitas reais.");
  }
});
