# Roteiro completo do repositório GourmetOn

Este documento foi refeito do zero para explicar o GourmetOn desde a origem dos requisitos até o deploy. Ele serve como roteiro de estudo, apresentação e defesa técnica do projeto.

## 1. Fontes usadas

O projeto nasceu da combinação de quatro fontes:

1. `Check-point-05-web.pptx`, do professor Lucas Sousa;
2. `Aula 16 - Web Development with JS Prof. Lucas Sousa.md`;
3. `Aula 17 - Web Development with JS Prof. Lucas Sousa.md`;
4. `SDD_CP5_GOURMETON.md`, versão 1.0.

A ordem de decisão usada no desenvolvimento foi:

1. solicitação explícita mais recente do usuário;
2. material do professor;
3. exemplos das aulas;
4. SDD;
5. versão anterior do projeto como referência.

Essa ordem explica diferenças entre o SDD inicial e a versão publicada. O SDD previa receitas locais de contingência e vários avisos acadêmicos na interface. Solicitações posteriores removeram as receitas inventadas e deram à landing page uma comunicação mais próxima de um produto. O código final mantém essas decisões posteriores.

## 2. Objetivo definido pelo professor

O Check-Point 05 pede uma landing page do GourmetOn que:

- apresente um aplicativo de delivery;
- use React e Vite;
- use Tailwind CSS;
- trabalhe com JSON e requisições assíncronas por `fetch`;
- consuma uma API de comidas, com recomendação da Spoonacular;
- possua hero, benefícios, funcionalidades, depoimentos, formulário e rodapé;
- tenha menu fixo, mudança visual durante a rolagem e scroll suave;
- funcione em diferentes tamanhos de tela;
- use uma biblioteca de ícones;
- seja publicada na web;
- possua README com descrição, tecnologias e integrantes;
- permita explicar componentes, hooks, estado, Fetch, JSON, Tailwind, deploy, decisões, dificuldades e soluções.

## 3. Relação com as aulas 16 e 17

### 3.1 Aula 16: backend simples

A aula 16 apresenta um backend com:

- Node.js;
- Express;
- CORS;
- `express.json()`;
- rota de API;
- validação da entrada;
- resposta JSON;
- inicialização com `app.listen`.

O GourmetOn preserva esse formato em `backend/server.js`. A diferença de domínio é que a rota não calcula frete. Ela consulta receitas e protege uma chave externa.

### 3.2 Aula 17: React, Vite e Tailwind

A aula 17 orienta:

- projeto React criado com Vite;
- plugin `@vitejs/plugin-react`;
- Tailwind com `@tailwindcss/vite`;
- `@import "tailwindcss"` no CSS;
- estados com `useState`;
- efeitos com `useEffect`;
- funções simples antes do `return`;
- interface JSX no final;
- listas renderizadas com `map`;
- classes responsivas diretamente no JSX.

O `frontend/src/App.jsx` segue a mesma sequência didática: dados fixos, estados, efeitos, valores calculados, funções de interação e JSX.

## 4. Visão geral da solução

O projeto possui dois processos:

```text
Navegador
   |
   | GET /api/receitas?quantidade=6
   v
Frontend React na Vercel
   |
   | Fetch para o backend
   v
Backend Express no Render
   |
   | Fetch com x-api-key
   v
Spoonacular API
```

O navegador nunca recebe a chave da Spoonacular. O frontend conhece apenas a URL pública do backend. O backend lê a chave da variável `SPOONACULAR_API_KEY` e chama a API externa.

## 5. Estrutura do repositório

```text
cp5/
  backend/
    .env.example
    package.json
    package-lock.json
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
    .env.production
    index.html
    package.json
    package-lock.json
    vercel.json
    vite.config.js
  .gitignore
  AUDITORIA_CP5.md
  CHECKLIST.md
  DEPLOY.md
  README.md
  ROTEIRO_10_COMMITS.md
  ROTEIRO_APRESENTACAO.md
  SDD_CP5_GOURMETON.md
  render.yaml
```

## 6. Explicação do frontend

### 6.1 `frontend/src/main.jsx`

Esse arquivo é o ponto de entrada do React.

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Decisões:

- `createRoot` monta a aplicação dentro de `#root`;
- `StrictMode` ajuda a encontrar efeitos colaterais durante o desenvolvimento;
- `App` concentra a interface porque as aulas usam um componente principal e o escopo não exige uma arquitetura extensa.

### 6.2 `frontend/vite.config.js`

O Vite usa dois plugins:

```js
plugins: [react(), tailwindcss()]
```

O primeiro habilita React. O segundo integra Tailwind ao processo de build. Essa configuração segue diretamente a aula 17.

### 6.3 `frontend/src/index.css`

O CSS contém apenas o necessário para complementar o Tailwind:

- importação do Tailwind;
- `box-sizing` global;
- scroll suave;
- compensação do cabeçalho fixo;
- cores e fonte padrão;
- foco visível;
- fonte de destaque;
- ajuste dos Material Icons;
- respeito a `prefers-reduced-motion`.

As regras globais ficaram pequenas porque o SDD pede classes Tailwind simples no JSX, sem um sistema complexo de componentes CSS.

### 6.4 Dados fixos em `App.jsx`

Os arrays `beneficios` e `depoimentos` ficam fora do componente porque não mudam durante a execução. Eles são renderizados com `map`, como nos exemplos da aula 17.

O objeto `nomesCategorias` traduz categorias conhecidas da Spoonacular. Quando uma categoria não possui tradução, a aplicação usa o nome original.

### 6.5 Endereço do backend

```js
const enderecoBackend = (
  import.meta.env.VITE_API_URL || "http://localhost:3001"
).replace(/\/$/, "");
```

Decisões:

- em desenvolvimento, o frontend usa `http://localhost:3001`;
- em produção, `frontend/.env.production` aponta para o Render;
- `replace` remove uma barra final e evita URLs com duas barras;
- apenas a URL usa prefixo `VITE_` porque variáveis com esse prefixo aparecem no bundle;
- a chave da Spoonacular nunca usa `VITE_`.

### 6.6 Promessa compartilhada

`promessaReceitas` guarda a consulta em andamento. Durante o desenvolvimento, o `StrictMode` pode executar o efeito inicial novamente. Sem essa proteção, duas chamadas iguais poderiam consumir quota da Spoonacular.

Fluxo de `buscarReceitas`:

1. cria a promessa somente quando ela ainda não existe;
2. chama `/api/receitas?quantidade=6`;
3. tenta converter a resposta para JSON;
4. verifica `resposta.ok`;
5. devolve `dados.receitas` no sucesso;
6. limpa a promessa no erro para permitir uma nova tentativa.

### 6.7 Estados do componente

| Estado | Responsabilidade |
| --- | --- |
| `menuAberto` | Controla o menu móvel |
| `menuComFundo` | Altera o cabeçalho após a rolagem |
| `receitas` | Guarda o JSON recebido do backend |
| `carregando` | Controla a mensagem de carregamento |
| `erroApi` | Guarda a mensagem de falha |
| `categoria` | Guarda o filtro escolhido |
| `email` | Controla o campo do formulário |
| `emailEnviado` | Controla a confirmação visual |

Esses estados existem porque cada valor pode mudar e precisa atualizar a interface.

### 6.8 Efeito do menu

O primeiro `useEffect` registra um evento de `scroll`.

```js
setMenuComFundo(window.scrollY > 40);
```

Quando a página ultrapassa 40 pixels, o cabeçalho recebe fundo, sombra e desfoque. A função retornada pelo efeito remove o evento quando o componente sai da tela.

### 6.9 Carregamento das receitas

`carregarReceitas` organiza três estados possíveis:

1. antes da consulta: `carregando` verdadeiro e erro vazio;
2. sucesso: receitas recebidas;
3. falha: mensagem de erro e lista vazia.

O bloco `finally` encerra o carregamento em qualquer resultado.

O segundo `useEffect` chama essa função apenas na montagem do componente.

### 6.10 Categorias e filtro local

As categorias são calculadas com `Set`:

```js
const categorias = [
  "Todas",
  ...new Set(receitas.map((receita) => receita.tipos[0] || "Outros")),
];
```

O `Set` remove repetições. O filtro trabalha com as receitas já carregadas, por isso trocar de categoria não realiza outra chamada externa.

`receitasFiltradas` não virou estado porque pode ser calculado a partir de `receitas` e `categoria`. Isso evita dados duplicados e inconsistentes.

### 6.11 Nova tentativa

`tentarNovamente` limpa `promessaReceitas` e executa uma nova consulta. Essa limpeza é necessária porque uma promessa anterior não deve impedir o usuário de tentar de novo.

### 6.12 Formulário controlado

O formulário demonstra os elementos pedidos no SDD:

- `value={email}`;
- `onChange`;
- `onSubmit`;
- `preventDefault()`;
- `required`;
- confirmação visual.

A função não envia nem persiste o endereço. Ela muda o estado de confirmação e limpa o campo. O projeto não possui banco de dados nem serviço de campanhas.

### 6.13 Seções da interface

#### Cabeçalho

- posição fixa;
- links internos;
- mudança de fundo durante a rolagem;
- menu móvel;
- `aria-label`, `aria-expanded` e `aria-controls`.

#### Hero

- imagem local de comida;
- título e descrição;
- CTA para o cardápio;
- botão que comunica a futura disponibilidade do aplicativo sem apontar para um arquivo inexistente.

#### Benefícios

Os três blocos seguem o material do professor: entrega rápida, variedade e pagamento simples.

#### Cardápio

- seis receitas reais;
- filtros por categoria;
- cards com imagem, título, tipo, cozinha, tempo e porções;
- estados de carregamento, erro e lista vazia;
- botão de nova tentativa.

#### Funcionalidades

A seção apresenta a experiência proposta pela marca. Ela não implementa pagamento, pedido ou rastreamento. Esses itens continuam fora do escopo técnico definido pelo SDD.

#### Depoimentos

Três entradas são renderizadas por `map`. Elas compõem a apresentação visual da landing page.

#### Contato

O campo de e-mail é controlado pelo React e mostra confirmação visual. Não existe persistência.

#### Rodapé

Mantém marca, navegação, e-mail fictício, Instagram fictício e copyright.

## 7. Explicação do backend

### 7.1 Dependências

O backend usa somente:

- `express`, para rotas e respostas HTTP;
- `cors`, para autorizar o frontend;
- `fetch` nativo do Node.js, para consultar a Spoonacular.

Essa escolha evita Axios e outras dependências que não aparecem nas aulas.

### 7.2 Carregamento do `.env`

```js
process.loadEnvFile();
```

O Node carrega o arquivo local quando ele existe. Em produção, Render fornece as variáveis diretamente. O `try/catch` ignora apenas a ausência normal do arquivo e registra outros problemas sem mostrar segredos.

### 7.3 Porta e CORS

```js
const PORT = Number(process.env.PORT) || 3001;
```

Localmente, a porta padrão é 3001. No Render, a plataforma fornece `PORT`.

`FRONTEND_URL` aceita mais de uma origem separada por vírgulas. O código divide o texto, remove espaços e descarta valores vazios. Essa lista permite o domínio principal da Vercel e, quando necessário, um domínio de preview.

### 7.4 Rotas

| Método e rota | Função |
| --- | --- |
| `GET /` | Identifica a API e lista as rotas principais |
| `GET /api/status` | Permite teste e health check |
| `GET /api/receitas` | Valida a quantidade e consulta a Spoonacular |
| Qualquer outra rota | Responde 404 em JSON |

### 7.5 Validação da quantidade

O backend converte `req.query.quantidade` para número e aceita somente inteiros entre 1 e 12. Uma entrada inválida recebe status 400.

A validação fica no backend porque parâmetros vindos do navegador não são confiáveis.

### 7.6 Proteção da chave

```js
const chaveApi = process.env.SPOONACULAR_API_KEY;
```

Sem a variável, a rota responde 503. A chave segue no cabeçalho `x-api-key`, nunca na resposta enviada ao frontend.

### 7.7 Chamada externa

O backend cria a URL com `new URL` e adiciona o parâmetro `number`. O `fetch` usa:

- cabeçalho `x-api-key`;
- timeout de 10 segundos;
- verificação de `resposta.ok`.

Uma única chamada pede todas as receitas. Isso reduz o consumo de quota.

### 7.8 Tratamento de erros

| Situação | Status interno | Resposta |
| --- | --- | --- |
| Quantidade inválida | 400 | Explica o intervalo permitido |
| Chave ausente | 503 | Solicita configuração do servidor |
| Chave rejeitada | 503 | Informa rejeição da chave |
| Quota atingida | 503 | Solicita nova tentativa posterior |
| Falha da Spoonacular | 502 | Informa falha externa |
| Timeout | 504 | Informa demora da API |
| Erro de rede | 502 | Informa que a busca falhou |
| Rota inexistente | 404 | Informa rota não encontrada |

As mensagens não incluem a chave, corpo sensível ou detalhes internos desnecessários.

### 7.9 Redução do JSON

A Spoonacular devolve muitos campos. O backend mapeia somente os usados na tela:

```json
{
  "id": 123,
  "titulo": "Nome da receita",
  "imagem": "https://...",
  "tempoPreparo": 30,
  "porcoes": 4,
  "tipos": ["main course"],
  "cozinhas": ["Italian"]
}
```

Esse contrato reduz o acoplamento do frontend à resposta externa e deixa o JSON mais fácil de explicar.

## 8. Segurança

- `.env` está no `.gitignore`;
- `backend/.env.example` contém apenas placeholders;
- o frontend não recebe a chave;
- `VITE_API_URL` pode ser público porque contém somente uma URL;
- o backend valida parâmetros;
- o projeto não usa `dangerouslySetInnerHTML`;
- a API devolve apenas os campos necessários;
- o CORS limita as origens autorizadas.

## 9. Responsividade e acessibilidade

O layout usa `sm`, `md` e `lg` para mudar colunas, espaçamentos e navegação.

Recursos de acessibilidade:

- `lang="pt-BR"`;
- textos alternativos nas imagens;
- `label` ligado ao campo de e-mail;
- foco visível;
- atributos ARIA no menu;
- `aria-live` em mensagens dinâmicas;
- navegação por teclado;
- redução de movimento respeitada.

## 10. Deploy

### 10.1 Backend no Render

`render.yaml` define:

- raiz `backend`;
- build `npm ci`;
- início `npm start`;
- health check `/api/status`;
- Node.js;
- variáveis `SPOONACULAR_API_KEY` e `FRONTEND_URL`.

URL publicada:

`https://cp5-testando.onrender.com`

### 10.2 Frontend na Vercel

`frontend/vercel.json` define Vite, build e pasta `dist`.

`frontend/.env.production` aponta para o backend publicado.

URL publicada:

`https://cp5-testando.vercel.app`

## 11. Decisões e justificativas

### Backend intermediário

Motivo: proteger a chave da Spoonacular. Uma variável `VITE_` seria incluída no código entregue ao navegador.

### Um componente principal

Motivo: manter o projeto próximo dos exemplos das aulas e fácil de apresentar. A aplicação possui uma única página e não exige roteamento.

### Fetch nativo

Motivo: o professor pede Fetch e o Node atual já oferece a função. Axios adicionaria uma dependência sem necessidade.

### Filtro local

Motivo: as seis receitas já estão na memória. Uma nova chamada por filtro aumentaria a quota sem benefício.

### Promessa compartilhada

Motivo: impedir chamadas duplicadas no `StrictMode` durante o desenvolvimento.

### JSON reduzido

Motivo: enviar ao frontend apenas o que os cards usam.

### Sem banco de dados

Motivo: autenticação, pedidos, campanhas e persistência estão fora do escopo do SDD.

### Sem receitas inventadas

O SDD original previa contingência local. Uma solicitação posterior determinou que a tela mostrasse somente dados reais da Spoonacular. O estado final exibe erro e nova tentativa quando a API falha.

### Comunicação visual de produto

O SDD original previa vários avisos acadêmicos na própria interface. A revisão mais recente removeu esses avisos da página pública. A documentação continua registrando o escopo real.

## 12. Dificuldades e soluções

### Chave da API

Problema: colocar a chave no frontend expõe o segredo.

Solução: backend Express e variável `SPOONACULAR_API_KEY`.

### Quota da Spoonacular

Problema: chamadas duplicadas consomem a cota.

Solução: uma chamada para seis receitas, filtros locais e promessa compartilhada.

### Falhas externas

Problema: chave, rede, timeout ou quota podem interromper a consulta.

Solução: estados de erro, códigos HTTP adequados e botão de nova tentativa.

### CORS no deploy

Problema: o navegador bloqueia respostas para origens não autorizadas.

Solução: `FRONTEND_URL` no Render com os domínios da Vercel.

### Monorepositório

Problema: Render e Vercel precisam executar comandos em pastas diferentes.

Solução: `rootDir: backend` no Render e raiz `frontend` no projeto da Vercel.

### Responsividade

Problema: navegação e grids precisam funcionar em celular e desktop.

Solução: menu controlado por estado e classes responsivas do Tailwind.

## 13. Roteiro de apresentação oral

### Abertura

“O GourmetOn é uma landing page responsiva para uma experiência de delivery. O projeto usa React, Vite e Tailwind no frontend. Um backend Node e Express protege a chave e consulta a Spoonacular.”

### Demonstração visual

1. Mostrar o hero e a navegação fixa.
2. Rolar a página e destacar a mudança do cabeçalho.
3. Mostrar benefícios e funcionalidades.
4. Abrir o cardápio e apontar os seis resultados reais.
5. Trocar um filtro e explicar que a filtragem é local.
6. Mostrar tempo, porções, tipo e cozinha nos cards.
7. Demonstrar o menu móvel.
8. Preencher o formulário e mostrar a confirmação visual.
9. Mostrar o rodapé e os contatos.

### Explicação técnica

1. Abrir `App.jsx` e mostrar dados fixos e estados.
2. Explicar os dois `useEffect`.
3. Mostrar `buscarReceitas`, carregamento, erro e nova tentativa.
4. Explicar `Set`, categorias e filtro local.
5. Abrir `server.js` e explicar CORS, validação e variável de ambiente.
6. Mostrar o `fetch` com `x-api-key`.
7. Mostrar o mapeamento do JSON.
8. Mostrar `render.yaml`, `vercel.json` e os endereços publicados.

### Encerramento

“A solução atende ao escopo técnico do CP5 com uma arquitetura simples. O frontend cuida da experiência. O backend protege a chave e normaliza os dados. A aplicação está publicada e usa receitas reais.”

## 14. Perguntas prováveis

### Por que não chamar a Spoonacular direto do React?

Porque a chave ficaria disponível no navegador.

### Por que usar Express?

Porque a aula 16 apresenta esse modelo e ele resolve a proteção da chave com pouca complexidade.

### Por que não usar Axios?

Porque o professor solicita Fetch e o recurso nativo atende ao projeto.

### Por que não criar vários componentes?

Porque a aplicação tem uma única página e o formato centralizado fica próximo das aulas. Uma versão maior poderia separar as seções.

### Por que o filtro não chama a API?

Porque as receitas já foram recebidas. Filtrar localmente é mais rápido e economiza quota.

### O formulário envia e-mail?

Não. Ele demonstra estado, validação e envio controlado. Persistência e campanhas estão fora do escopo.

### Pagamento e rastreamento funcionam?

Não. A seção apresenta a visão do produto. O código entregue implementa a landing page, a consulta de receitas, os filtros, a navegação e o formulário visual.

## 15. Conferência antes da apresentação

- [ ] Abrir o frontend publicado.
- [ ] Confirmar seis receitas.
- [ ] Testar pelo menos um filtro.
- [ ] Testar menu móvel e rolagem.
- [ ] Testar o formulário.
- [ ] Confirmar que o console não mostra erro.
- [ ] Abrir `/api/status` no Render.
- [ ] Mostrar que `.env` não está no Git.
- [ ] Abrir `App.jsx` e `server.js` nos trechos preparados.
- [ ] Mostrar README, checklist, auditoria e roteiro dos commits.
- [ ] Levar os links do GitHub, Vercel e Render.

## 16. Pendências que não devem ser escondidas na apresentação técnica

- O formulário não persiste o e-mail.
- Pagamento, pedido e rastreamento não foram implementados.
- Os depoimentos são conteúdo de apresentação da interface.
- O rodapé atual não possui termos de uso, embora o slide do professor cite esse item.
- O histórico Git atual não corresponde aos dez commits distribuídos do SDD. A autoria real não deve ser reescrita ou falsificada.
