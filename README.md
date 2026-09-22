# GourmetOn

Landing page responsiva para o conceito acadêmico de um aplicativo de delivery. O projeto foi desenvolvido para o Check-Point 05 de Web Development with JS e apresenta receitas reais da Spoonacular sem expor a chave da API no navegador.

## Objetivo do CP5

Aplicar React, Vite, Tailwind CSS, JavaScript, JSON, requisições assíncronas com `fetch`, estados e efeitos em uma página de apresentação publicada na web.

## Endereços do deploy

- Frontend: **pendente de publicação**
- Backend: **pendente de publicação**

Os endereços devem ser preenchidos após a publicação. O projeto está preparado para configurar o backend por `VITE_API_URL` e a origem permitida por `FRONTEND_URL`.

## Tecnologias

- React e React DOM
- Vite
- Tailwind CSS com `@tailwindcss/vite`
- JavaScript
- Fetch API nativa
- Node.js
- Express
- CORS
- Spoonacular API
- Material Symbols

## Estrutura de pastas

```text
gourmeton/
  backend/
    .env.example
    package.json
    server.js
  frontend/
    public/
      favicon.svg
      gourmet-hero.png
    src/
      App.jsx
      index.css
      main.jsx
    .env.example
    index.html
    package.json
    vercel.json
    vite.config.js
  .gitignore
  CHECKLIST.md
  DEPLOY.md
  README.md
  ROTEIRO_APRESENTACAO.md
  SDD_CP5_GOURMETON.md
  render.yaml
```

## Pré-requisitos

- Node.js 20.19 ou superior
- npm
- chave gratuita da Spoonacular

## Instalação

Abra dois terminais na pasta do projeto.

### Backend

```bash
cd backend
npm install
```

Copie `.env.example` para `.env` e preencha:

```env
SPOONACULAR_API_KEY=SUA_CHAVE_AQUI
FRONTEND_URL=http://localhost:5173
PORT=3001
```

Nunca publique a chave. O arquivo `.env` está ignorado pelo Git. Mais de uma origem CORS pode ser informada em `FRONTEND_URL`, separada por vírgula.

Inicie o servidor:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Integração com a Spoonacular

O frontend consulta somente `GET /api/receitas?quantidade=6` no backend. O servidor valida a quantidade entre 1 e 12, lê `SPOONACULAR_API_KEY`, chama `GET https://api.spoonacular.com/recipes/random` com o cabeçalho `x-api-key` e devolve apenas os campos usados na interface.

Uma única chamada retorna todas as receitas. Os filtros funcionam localmente e não consomem novas cotas. Em desenvolvimento, uma promessa compartilhada evita uma segunda chamada causada pelo `StrictMode`.

Se a chave estiver ausente, for rejeitada, a cota terminar ou houver falha de rede, a página informa o problema e não substitui o resultado por receitas inventadas. O botão **Tentar novamente** repete a consulta real.

## Funcionalidades implementadas

- menu fixo com fundo alterado após a rolagem;
- menu móvel com atributos de acessibilidade;
- rolagem suave com respeito à redução de movimento;
- hero com indicação de protótipo acadêmico;
- benefícios do conceito;
- consulta de seis receitas;
- carregamento, sucesso, erro e nova tentativa;
- filtro local por categoria;
- seção que separa funções reais e conceituais;
- três depoimentos fictícios identificados como demonstração;
- formulário controlado com confirmação visual e sem persistência;
- rodapé com contato fictício, links internos, termos e privacidade;
- layout responsivo para celular e desktop.

## Limitações do protótipo

Não há autenticação, banco de dados, pagamento, pedidos, rastreamento, cadastro de restaurantes ou envio real de e-mail. O aplicativo móvel e o botão de download também são conceituais.

## Build

```bash
cd frontend
npm run build
```

Para executar o backend em produção:

```bash
cd backend
npm start
```

## Publicação e entrega

O repositório inclui `render.yaml` para o backend e `frontend/vercel.json` para o frontend. O passo a passo completo está em [`DEPLOY.md`](./DEPLOY.md).

1. Publique o backend no Render e cadastre a chave como variável secreta.
2. Publique o frontend na Vercel com a pasta raiz `frontend`.
3. Configure `VITE_API_URL` com o endereço HTTPS do backend.
4. Configure `FRONTEND_URL` com o endereço HTTPS do frontend.
5. Atualize os links de deploy neste README.
6. Envie no Teams os links do repositório e do deploy.

## Integrantes

- Daniel Roberto
- Leonardo Ferreira
- Jecky Cossio
- Felipe Bandeira Pedrol
- Felipi Godoy

## Referências solicitadas

- TaskNote
- Organizador Inteligente
- VINILAK
- Material do professor: `Check-point-05-web.pptx`
- Aulas 16 e 17 de Web Development with JS
- [Documentação oficial da Spoonacular](https://spoonacular.com/food-api/docs)

## Plano de commits

O repositório Git local foi inicializado na branch `main`. Os dez espaços de contribuição e os respectivos autores estão registrados no `SDD_CP5_GOURMETON.md`. Os commits devem ser realizados pelos próprios integrantes, com exatamente dois commits por pessoa. Nenhum commit foi criado automaticamente em nome de terceiros.
