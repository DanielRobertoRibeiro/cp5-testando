# Publicação do GourmetOn

Este projeto usa dois serviços porque a chave da Spoonacular precisa permanecer no backend.

## 1. Conferência antes do GitHub

Na raiz do projeto, confirme que o segredo não será versionado:

```bash
git init -b main
git check-ignore backend/.env
```

O segundo comando deve imprimir `backend/.env`. Não execute `git add` se ele não aparecer.

Depois confira os arquivos preparados para o commit:

```bash
git add .
git status
```

`backend/.env` não pode aparecer na lista. O arquivo `backend/.env.example`, sem chave, deve aparecer.

## 2. Backend no Render

1. Envie o repositório ao GitHub.
2. No Render, escolha **New +**, depois **Blueprint**, e conecte o repositório. O Render lerá `render.yaml`.
3. Cadastre `SPOONACULAR_API_KEY` como variável secreta quando o Blueprint solicitar.
4. Deixe `FRONTEND_URL` temporariamente como `http://localhost:5173` até obter o endereço da Vercel.
5. Publique e abra `https://cp5-testando.onrender.com/api/status`.

Se preferir criar um **Web Service** manual, use exatamente:

| Campo | Valor |
| --- | --- |
| Language | `Node` |
| Branch | `main` |
| Root Directory | `backend` |
| Build Command | `npm ci` |
| Start Command | `npm start` |
| Compute | `Free` |
| Environment Variable | `SPOONACULAR_API_KEY` com a chave somente no valor |

O nome da variável precisa ser exatamente `SPOONACULAR_API_KEY`. Nomes genéricos como `CHAVE-SECRETA` não serão lidos pelo código.

A resposta esperada é:

```json
{"mensagem":"API do GourmetOn disponível."}
```

Não coloque a chave no `render.yaml`.

## 3. Frontend na Vercel

1. Importe o mesmo repositório na Vercel.
2. Defina **Root Directory** como `frontend`.
3. Confirme o framework Vite.
4. Adicione a variável:

```text
VITE_API_URL=https://cp5-testando.onrender.com
```

5. Publique o frontend.

O valor de `VITE_API_URL` pode ser público porque contém somente o endereço do backend. Nunca use `VITE_SPOONACULAR_API_KEY`.

## 4. CORS definitivo

Depois de obter o domínio da Vercel, volte ao Render e defina:

```text
FRONTEND_URL=https://SEU-PROJETO.vercel.app
```

Se houver mais de um domínio autorizado, separe por vírgula. Não inclua barra no final.

Após salvar, faça uma nova publicação do backend e recarregue o frontend.

## 5. Validação final

- Backend confirmado como **Live** no Render em `https://cp5-testando.onrender.com`.
- A rota pública de receitas foi validada com seis resultados reais da Spoonacular.
- Abra o frontend publicado em uma janela anônima.
- Confirme que aparecem seis receitas reais.
- Teste os filtros e o botão de nova tentativa.
- Confira se o console do navegador não mostra erro de CORS.
- Atualize os links no `README.md`.
- Envie os links do repositório e do deploy no Teams.

## Segurança da chave

A chave fica somente em `backend/.env` no computador e em `SPOONACULAR_API_KEY` no Render. Se uma chave for enviada ao GitHub, remova-a do histórico e gere uma nova no painel da Spoonacular antes de publicar novamente.
