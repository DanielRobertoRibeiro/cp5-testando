# Roteiro dos 10 commits do GourmetOn

Este documento reconstrói, do zero, a implementação incremental planejada no SDD 1.0. Ele distribui dois commits reais para cada integrante e mantém o projeto compreensível em cada etapa.

## 1. Aviso sobre o histórico atual

O repositório já possui um histórico diferente, criado durante a implementação e os deploys. Este roteiro não autoriza:

- alterar autores retroativamente;
- criar commits vazios;
- usar o nome de outro integrante;
- dividir mudanças artificiais apenas para atingir dez commits;
- reescrever a branch publicada sem decisão expressa do grupo.

Cada integrante deve executar seus próprios commits em uma implementação incremental ou em uma branch organizada pelo grupo. O nome e o e-mail do Git precisam pertencer à pessoa que realizou a contribuição.

## 2. Distribuição definida pelo SDD

| Commit | Integrante | Entrega principal |
| --- | --- | --- |
| 01 | Daniel Roberto | Estrutura inicial do frontend e backend |
| 02 | Leonardo Ferreira | Cabeçalho, menu e hero |
| 03 | Jecky Cossio | Backend Express e Spoonacular |
| 04 | Felipe Bandeira Pedrol | Apresentação, benefícios e funcionalidades |
| 05 | Felipi Godoy | Consumo da API e cards do cardápio |
| 06 | Daniel Roberto | Categorias, filtro e nova tentativa |
| 07 | Leonardo Ferreira | Depoimentos, formulário e rodapé |
| 08 | Jecky Cossio | Validações e tratamento de erros |
| 09 | Felipe Bandeira Pedrol | Documentação e roteiro |
| 10 | Felipi Godoy | Acessibilidade, build e deploy |

## 3. Regras para todos os commits

Antes de cada commit:

1. atualizar a branch de trabalho sem apagar alterações de outra pessoa;
2. revisar `git status`;
3. executar a validação indicada neste roteiro;
4. adicionar somente os arquivos daquela contribuição;
5. conferir `git diff --staged`;
6. criar o commit com a mensagem definida;
7. enviar a contribuição com a autoria real.

O arquivo `backend/.env` nunca deve entrar no Git.

## 4. Commit 01 — estrutura inicial

**Responsável:** Daniel Roberto  
**Mensagem:** `chore: cria estrutura inicial do frontend e backend`

### Base nas fontes

- aula 16: separação `backend` e `frontend`;
- aula 17: React com Vite e Tailwind;
- SDD: JavaScript, npm e estrutura simples.

### Objetivo

Criar uma base executável, ainda sem as seções completas e sem integração externa.

### Arquivos

```text
.gitignore
backend/package.json
backend/package-lock.json
backend/server.js
frontend/index.html
frontend/package.json
frontend/package-lock.json
frontend/vite.config.js
frontend/src/main.jsx
frontend/src/index.css
frontend/src/App.jsx
```

### Implementação

1. Criar as pastas `backend` e `frontend`.
2. Inicializar o backend com npm.
3. Instalar `express` e `cors`.
4. Criar um servidor mínimo com `GET /api/status` e porta 3001.
5. Criar o frontend React com Vite.
6. Instalar Tailwind e `@tailwindcss/vite`.
7. Configurar os plugins React e Tailwind em `vite.config.js`.
8. Importar Tailwind em `index.css`.
9. Criar um `App.jsx` mínimo com o título GourmetOn.
10. Ignorar `node_modules`, `dist`, `.env` e logs.

### Lógica a explicar

O backend segue o formato da aula 16. O frontend segue a inicialização da aula 17. As duas pastas são independentes porque serão hospedadas em serviços diferentes.

### Validação

```bash
cd backend
npm start
```

Abrir `http://localhost:3001/api/status`.

```bash
cd frontend
npm run build
```

### Resultado esperado

- backend inicia;
- frontend gera build;
- nenhuma chave existe no repositório.

## 5. Commit 02 — cabeçalho e hero

**Responsável:** Leonardo Ferreira  
**Mensagem:** `feat: cria cabecalho e hero responsivos`

### Base nas fontes

- slide 6: hero com título, descrição, botão e imagem;
- slide 7: menu fixo, opacidade, scroll suave e responsividade;
- aula 17: `useState`, `useEffect` e classes Tailwind.

### Objetivo

Construir a entrada visual da landing page e a navegação responsiva.

### Arquivos

```text
frontend/public/gourmet-hero.png
frontend/src/App.jsx
frontend/src/index.css
frontend/index.html
```

### Implementação

1. Adicionar marca GourmetOn e links internos.
2. Criar `menuAberto` com `useState`.
3. Criar `menuComFundo` com `useState`.
4. Registrar o evento de scroll em `useEffect`.
5. Remover o evento na limpeza do efeito.
6. Criar menu móvel com botão abrir/fechar.
7. Criar o hero com imagem local, título, descrição e CTA.
8. Incluir chamada para o aplicativo sem apontar para download inexistente.
9. Configurar scroll suave e compensação do menu fixo.
10. Adicionar `alt`, `aria-label`, `aria-expanded` e `aria-controls`.

### Lógica a explicar

O estado do menu muda a visibilidade no celular. O estado de rolagem muda as classes do cabeçalho. O efeito usa função de limpeza para não deixar eventos registrados.

### Validação

- testar topo transparente;
- rolar mais de 40 pixels;
- confirmar fundo e sombra;
- abrir e fechar o menu móvel;
- navegar para uma âncora;
- executar `npm run build`.

## 6. Commit 03 — backend e Spoonacular

**Responsável:** Jecky Cossio  
**Mensagem:** `feat: integra backend com a spoonacular`

### Base nas fontes

- slide 5: recomendação da Spoonacular e uso de Fetch;
- aula 16: Express, CORS, rota e JSON;
- SDD: chave fora do frontend e rota interna.

### Objetivo

Criar a integração segura com a Spoonacular.

### Arquivos

```text
backend/.env.example
backend/package.json
backend/server.js
.gitignore
```

### Implementação

1. Carregar variáveis de ambiente.
2. Ler `PORT`, `FRONTEND_URL` e `SPOONACULAR_API_KEY`.
3. Configurar `express.json()` e CORS.
4. Criar `GET /` e `GET /api/status`.
5. Criar `GET /api/receitas`.
6. Usar quantidade padrão igual a 6.
7. Montar a URL externa com `new URL`.
8. Enviar a chave no cabeçalho `x-api-key`.
9. Converter a resposta para JSON.
10. Mapear somente os campos necessários.
11. Criar `.env.example` sem segredo.

### Contrato interno

```json
{
  "receitas": [
    {
      "id": 123,
      "titulo": "Nome da receita",
      "imagem": "https://...",
      "tempoPreparo": 30,
      "porcoes": 4,
      "tipos": ["main course"],
      "cozinhas": ["Italian"]
    }
  ]
}
```

### Lógica a explicar

O backend funciona como intermediário. Ele protege a chave, reduz o JSON e impede que o frontend dependa diretamente do formato completo da Spoonacular.

### Validação

- iniciar com chave válida;
- abrir `/api/status`;
- abrir `/api/receitas?quantidade=6`;
- confirmar seis itens;
- confirmar que a chave não aparece na resposta.

## 7. Commit 04 — apresentação, benefícios e funcionalidades

**Responsável:** Felipe Bandeira Pedrol  
**Mensagem:** `feat: cria secoes de apresentacao e beneficios`

### Base nas fontes

- slide 6: benefícios e funcionalidades;
- SDD: entrega rápida, variedade e pagamento simples;
- aula 17: arrays, `map`, grid e Tailwind.

### Objetivo

Completar a apresentação do produto entre o hero e o cardápio.

### Arquivos

```text
frontend/src/App.jsx
```

### Implementação

1. Criar o array `beneficios`.
2. Incluir entrega rápida, variedade e pagamento simples.
3. Renderizar os benefícios com `map`.
4. Criar a seção “Por que GourmetOn”.
5. Criar a seção de funcionalidades.
6. Usar Material Icons, conforme o slide 8.
7. Criar layouts de uma coluna no celular e múltiplas colunas em telas maiores.
8. Manter o conteúdo fora do escopo apenas como comunicação da proposta, sem implementar pagamento ou rastreamento.

### Lógica a explicar

Os dados repetidos ficam em arrays. O `map` evita copiar manualmente a mesma estrutura JSX. A `key` usa um valor estável.

### Validação

- conferir os três benefícios;
- conferir ícones;
- testar celular e desktop;
- executar `npm run build`.

## 8. Commit 05 — consumo da API e cardápio

**Responsável:** Felipi Godoy  
**Mensagem:** `feat: carrega receitas e monta cardapio`

### Base nas fontes

- slide 4: JSON e Fetch;
- slide 5: Spoonacular e `useEffect`;
- SDD: seis receitas e campos dos cards;
- aula 17: estado, efeito e `map`.

### Objetivo

Buscar receitas do backend e renderizar o cardápio real.

### Arquivos

```text
frontend/.env.example
frontend/src/App.jsx
```

### Implementação

1. Ler `VITE_API_URL` com fallback local.
2. Criar estados `receitas`, `carregando` e `erroApi`.
3. Criar `buscarReceitas` com Fetch.
4. Criar `carregarReceitas` com `async/await`.
5. Executar a carga inicial em `useEffect`.
6. Mostrar “Carregando receitas...” durante a consulta.
7. Renderizar seis cards com `map`.
8. Mostrar imagem, título, tipo, cozinha, tempo e porções.
9. Tratar tipo vazio como “Outros”.
10. Tratar cozinha vazia como “Internacional”.

### Lógica a explicar

O frontend chama somente a rota interna. Os estados determinam qual parte da interface aparece. O `map` transforma cada item do JSON em um card.

### Validação

- confirmar requisição para o backend, não para a Spoonacular;
- confirmar seis cards;
- conferir todos os campos;
- confirmar que nenhuma chave aparece no bundle.

## 9. Commit 06 — categorias, filtro e nova tentativa

**Responsável:** Daniel Roberto  
**Mensagem:** `feat: adiciona filtro e nova tentativa da api`

### Base nas fontes

- slide 6: busca por tipo e filtros;
- SDD: filtro local, valores calculados e nova tentativa;
- aula 17: estado, arrays e funções de interação.

### Objetivo

Permitir que a pessoa filtre o cardápio sem consumir nova quota.

### Arquivos

```text
frontend/src/App.jsx
```

### Implementação

1. Criar estado `categoria` com valor “Todas”.
2. Calcular categorias únicas com `Set`.
3. Criar `receitasFiltradas`.
4. Criar o mapa de tradução de categorias.
5. Renderizar botões de filtro.
6. Usar `aria-pressed` no filtro ativo.
7. Criar o estado de lista vazia.
8. Criar `tentarNovamente`.
9. Limpar a promessa anterior antes da nova consulta.
10. Compartilhar a promessa para reduzir duplicação no `StrictMode`.

### Lógica a explicar

Categorias e receitas filtradas são valores calculados. Não precisam de estado próprio. O filtro trabalha em memória e não realiza outra chamada externa.

### Validação

- alternar entre categorias;
- confirmar que a rede não recebe nova chamada;
- testar “Todas”;
- testar nova tentativa;
- executar build.

## 10. Commit 07 — depoimentos, formulário e rodapé

**Responsável:** Leonardo Ferreira  
**Mensagem:** `feat: conclui secoes finais da landing page`

### Base nas fontes

- slide 6: depoimentos, formulário e rodapé;
- SDD: campo controlado, confirmação, contato e navegação;
- aula 17: `useState`, eventos e `map`.

### Objetivo

Finalizar as seções visuais e a navegação da landing page.

### Arquivos

```text
frontend/src/App.jsx
```

### Implementação

1. Criar array com três depoimentos.
2. Renderizar os depoimentos com `map`.
3. Criar estados `email` e `emailEnviado`.
4. Criar campo com `value`, `onChange` e `required`.
5. Criar `enviarEmail` com `preventDefault`.
6. Exibir confirmação visual.
7. Criar rodapé com marca e navegação.
8. Adicionar `contato@GourmetOn.com` e `@GourmetOn`.
9. Adicionar copyright.

### Lógica a explicar

O formulário é controlado pelo React. O estado sempre representa o valor do campo. O envio não persiste dados porque banco e campanhas estão fora do escopo.

### Validação

- testar e-mail vazio;
- testar e-mail válido;
- confirmar mensagem visual;
- conferir os três depoimentos;
- testar links internos do rodapé.

## 11. Commit 08 — validação e erros

**Responsável:** Jecky Cossio  
**Mensagem:** `fix: melhora tratamento de erros da api`

### Base nas fontes

- aula 16: validação e status 400;
- SDD: chave ausente, quota, rede e resposta compreensível;
- decisão posterior do usuário: não usar receitas locais inventadas.

### Objetivo

Tornar o backend previsível e permitir recuperação de falhas no frontend.

### Arquivos

```text
backend/server.js
frontend/src/App.jsx
```

### Implementação

1. Validar inteiro entre 1 e 12.
2. Responder 400 para quantidade inválida.
3. Responder 503 quando a chave estiver ausente.
4. Tratar chave rejeitada.
5. Tratar quota atingida.
6. Tratar falha externa com 502.
7. Aplicar timeout de 10 segundos e responder 504.
8. Tratar rota inexistente com 404 em JSON.
9. Mostrar a mensagem no frontend.
10. Manter lista vazia no erro.
11. Permitir nova tentativa.

### Diferença em relação ao SDD inicial

O SDD 1.0 previa receitas locais de contingência. A decisão explícita posterior removeu essa estratégia para evitar mascarar falhas com dados inventados. O commit final deve seguir o comportamento real: mensagem de erro e nova tentativa.

### Validação

- testar `quantidade=0`;
- testar `quantidade=13`;
- testar valor não numérico;
- iniciar sem chave;
- testar rota inexistente;
- confirmar que o frontend não mostra receitas falsas.

## 12. Commit 09 — documentação

**Responsável:** Felipe Bandeira Pedrol  
**Mensagem:** `docs: atualiza documentacao e roteiro do projeto`

### Base nas fontes

- slide 9: README e apresentação técnica;
- SDD: documentação, checklist e decisões;
- estado real do projeto.

### Objetivo

Permitir que qualquer integrante instale, explique e apresente o projeto.

### Arquivos

```text
README.md
SDD_CP5_GOURMETON.md
CHECKLIST.md
AUDITORIA_CP5.md
DEPLOY.md
ROTEIRO_10_COMMITS.md
ROTEIRO_APRESENTACAO.md
```

### Implementação

1. Documentar objetivo e tecnologias.
2. Registrar estrutura de pastas.
3. Explicar instalação do frontend e backend.
4. Documentar variáveis de ambiente.
5. Explicar a integração com a Spoonacular.
6. Registrar funcionalidades e limites reais.
7. Registrar integrantes.
8. Criar checklist contra o material do professor.
9. Criar roteiro completo do repositório.
10. Criar roteiro detalhado dos dez commits.

### Validação

- seguir o README em uma instalação limpa;
- conferir todos os caminhos citados;
- conferir URLs de deploy;
- comparar checklist com slides 4 a 9;
- procurar afirmações que não correspondem ao código.

## 13. Commit 10 — acessibilidade, build e deploy

**Responsável:** Felipi Godoy  
**Mensagem:** `chore: valida acessibilidade build e deploy`

### Base nas fontes

- slide 7: responsividade e scroll;
- slide 8: Vite, Tailwind e ícones;
- slide 9: aplicação publicada;
- SDD: segurança, acessibilidade, build e deploy.

### Objetivo

Executar a revisão integrada e preparar os dois serviços de produção.

### Arquivos

```text
frontend/index.html
frontend/src/App.jsx
frontend/src/index.css
frontend/.env.production
frontend/vercel.json
render.yaml
DEPLOY.md
README.md
```

### Implementação

1. Confirmar `lang="pt-BR"`.
2. Revisar `alt`, labels, ARIA e foco visível.
3. Revisar teclado e redução de movimento.
4. Testar celular, tablet e desktop.
5. Executar build do frontend.
6. Executar backend com chave válida.
7. Procurar segredos rastreados pelo Git.
8. Configurar Render com raiz `backend`.
9. Configurar Vercel com raiz `frontend`.
10. Configurar `VITE_API_URL` e `FRONTEND_URL`.
11. Testar CORS e seis receitas na versão pública.
12. Atualizar os links finais no README.

### Validação

```bash
cd frontend
npm ci
npm run build
```

```bash
cd backend
npm ci
npm start
```

Conferir:

- `https://cp5-testando.vercel.app`;
- `https://cp5-testando.onrender.com/api/status`;
- `https://cp5-testando.onrender.com/api/receitas?quantidade=6`.

## 14. Matriz final de autoria

| Integrante | Commit 1 | Commit 2 | Total |
| --- | --- | --- | --- |
| Daniel Roberto | 01 | 06 | 2 |
| Leonardo Ferreira | 02 | 07 | 2 |
| Jecky Cossio | 03 | 08 | 2 |
| Felipe Bandeira Pedrol | 04 | 09 | 2 |
| Felipi Godoy | 05 | 10 | 2 |

## 15. Checklist final

- [ ] Commit 01 criado por Daniel Roberto.
- [ ] Commit 02 criado por Leonardo Ferreira.
- [ ] Commit 03 criado por Jecky Cossio.
- [ ] Commit 04 criado por Felipe Bandeira Pedrol.
- [ ] Commit 05 criado por Felipi Godoy.
- [ ] Commit 06 criado por Daniel Roberto.
- [ ] Commit 07 criado por Leonardo Ferreira.
- [ ] Commit 08 criado por Jecky Cossio.
- [ ] Commit 09 criado por Felipe Bandeira Pedrol.
- [ ] Commit 10 criado por Felipi Godoy.
- [ ] Nenhum commit vazio.
- [ ] Nenhuma autoria falsificada.
- [ ] Cada commit possui uma alteração funcional ou documental coerente.
- [ ] O frontend continua gerando build nas etapas aplicáveis.
- [ ] A chave da Spoonacular não aparece no Git.
