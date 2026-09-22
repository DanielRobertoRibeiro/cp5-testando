# Roteiro de apresentação do GourmetOn

## 1. Contexto e objetivo

Apresentar o GourmetOn como uma landing page acadêmica para um conceito de delivery. Explicar que o CP5 pede React, Vite, Tailwind, JSON, Fetch e publicação na web.

## 2. Estrutura técnica

Mostrar as pastas `frontend` e `backend`. O frontend monta a interface e chama apenas a rota interna. O backend mantém a chave fora do navegador, consulta a Spoonacular e devolve um JSON reduzido.

## 3. React e Tailwind

Abrir `frontend/src/App.jsx` e destacar:

- estados com `useState`;
- efeitos com `useEffect`;
- campo de e-mail controlado;
- arrays renderizados com `map`;
- categorias e receitas filtradas calculadas a partir dos dados;
- classes responsivas do Tailwind.

## 4. Fetch, API e JSON

Mostrar `buscarReceitas` no frontend e a rota `/api/receitas` no backend. Explicar o fluxo:

1. o frontend solicita seis receitas;
2. o backend valida a quantidade;
3. o backend envia a chave pelo cabeçalho `x-api-key`;
4. a Spoonacular responde com `recipes`;
5. o backend mapeia somente os campos usados;
6. o frontend exibe os cards reais ou uma mensagem clara de erro.

## 5. Decisões

- Um componente principal mantém o código próximo dos exemplos das aulas.
- A chave permanece no backend por segurança.
- Uma única chamada reduz o consumo de quota.
- Os filtros são locais.
- O projeto separa visualmente funções implementadas e recursos conceituais.
- O formulário não persiste o e-mail.

## 6. Dificuldades e soluções

- **Chave não pode ir para o navegador:** foi criado um backend Express.
- **API pode falhar ou ficar sem quota:** foram adicionados mensagem clara e botão de nova tentativa, sem exibir receitas inventadas.
- **StrictMode pode executar o efeito novamente:** a promessa da consulta é compartilhada.
- **Layout precisa funcionar em várias telas:** foram usadas classes responsivas `sm`, `md` e `lg`.

## 7. Demonstração

Demonstrar o menu fixo, a rolagem suave, os cards vindos da Spoonacular, o filtro, o menu móvel, o estado de erro e o formulário. Encerrar mostrando o build e os endereços publicados registrados no README.
