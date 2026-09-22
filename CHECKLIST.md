# Checklist de atendimento do GourmetOn

Data da conferência: 22/09/2026.

## Aplicação

| Pedido | Status | Justificativa |
| --- | --- | --- |
| Frontend em React e Vite | Atendido | Projeto configurado em `frontend` com React, React DOM e Vite. |
| Tailwind CSS com plugin do Vite | Atendido | `@tailwindcss/vite` está no `vite.config.js` e `@import "tailwindcss"` no CSS. |
| JavaScript sem TypeScript | Atendido | Todos os arquivos de aplicação usam `.js` e `.jsx`. |
| Backend Node.js, Express e CORS | Atendido | Servidor criado em `backend/server.js`. |
| Fetch no frontend e backend | Atendido | O frontend chama a rota interna e o backend chama a Spoonacular. |
| Spoonacular como API principal | Atendido | O backend usa `/recipes/random` e solicita seis receitas. |
| Chave fora do navegador | Atendido | A chave é lida de `SPOONACULAR_API_KEY` somente no backend. |
| Validação de quantidade de 1 a 12 | Atendido | Valores fora do intervalo ou não inteiros recebem erro 400. |
| JSON reduzido ao contrato | Atendido | O backend mapeia id, título, imagem, tempo, porções, tipos e cozinhas. |
| Hero completo | Atendido | Há título, descrição, imagem local, CTA do cardápio e aviso de conceito acadêmico. |
| Benefícios | Atendido | Entrega rápida, variedade e pagamento simples aparecem em três blocos. |
| Cardápio com seis receitas | Atendido | A consulta pede seis itens reais; não há receitas locais ou contingência inventada. |
| Campos dos cards | Atendido | Cada card mostra imagem, título, tipo, cozinha, tempo e porções. |
| Carregamento, sucesso e erro | Atendido | A interface mostra carregamento, dados recebidos e mensagem de erro. |
| Dados locais de contingência | Substituído pela solicitação atual | As receitas inventadas foram removidas; o cardápio mostra somente respostas reais da Spoonacular. |
| Botão de nova tentativa | Atendido | O botão limpa a promessa anterior e executa outra consulta. |
| Filtro local | Atendido | Categorias são calculadas e filtram os dados sem nova chamada. |
| Menu fixo com mudança de opacidade | Atendido | O evento de scroll altera fundo e sombra, com limpeza do listener. |
| Scroll suave | Atendido | Configurado no CSS e desativado para redução de movimento. |
| Menu móvel | Atendido | Controle por estado, `aria-label`, `aria-expanded` e `aria-controls`. |
| Funcionalidades reais e conceituais separadas | Atendido | Duas áreas identificam claramente o que funciona e o que é planejado. |
| Três depoimentos | Atendido | Array com três relatos fictícios renderizados por `map`. |
| Formulário controlado | Atendido | Usa `value`, `onChange`, `onSubmit`, `preventDefault` e `required`. |
| E-mail sem persistência | Atendido | A interface e o README informam que nenhum dado é armazenado. |
| Rodapé completo | Atendido | Marca, navegação, contato fictício, termos, privacidade e identificação acadêmica. |
| Responsividade | Atendido | Layouts usam pontos de quebra `sm`, `md` e `lg`. |
| Acessibilidade | Atendido | Idioma, alt, label, foco visível, ARIA e mensagens compreensíveis foram incluídos. |
| Imagem principal local | Atendido | Asset `gourmet-hero.png` gerado para o projeto e servido pelo frontend. |
| Sem funcionalidades fora do escopo | Atendido | Não foram criados banco, autenticação, pagamento ou pedidos reais. |

## Documentação e entrega

| Pedido | Status | Justificativa |
| --- | --- | --- |
| README completo | Atendido | Contém objetivo, tecnologias, estrutura, instalação, API, limitações, integrantes e entrega. |
| `.env.example` | Atendido | Backend e frontend possuem exemplos sem segredo. |
| `.env` ignorado | Atendido | `.gitignore` cobre arquivos de ambiente e preserva os exemplos. |
| Roteiro de apresentação | Atendido | `ROTEIRO_APRESENTACAO.md` cobre código, decisões, dificuldades e demonstração. |
| Checklist final | Atendido | Este arquivo registra estado e justificativa de cada requisito. |
| Build do frontend | Atendido | `npm run build` concluiu com 29 módulos transformados e sem erros. |
| Backend inicia | Atendido | O servidor iniciou e a rota final retornou seis receitas reais com todos os campos do contrato. |
| Inspeção no navegador | Atendido | Menu móvel, filtro, erro e formulário foram conferidos; o console não apresentou erros. |
| Chave real fora do Git | Atendido | O segredo foi movido de `.env.example` para `backend/.env`, que está coberto pelo `.gitignore`. |
| Consulta real da Spoonacular | Atendido | A rota retornou seis receitas reais após a configuração da chave. |
| Configuração de deploy | Atendido | `render.yaml`, `frontend/vercel.json` e `DEPLOY.md` foram adicionados. |
| Repositório Git local | Atendido | A branch `main` foi inicializada sem criar commits em nome dos integrantes. |
| Backend publicado no Render | Atendido | Serviço Live em `https://cp5-testando.onrender.com`, com rota pública retornando seis receitas reais. |
| Frontend publicado | Atendido | Site público em `https://cp5-testando.vercel.app`. |
| Links no README | Atendido | Repositório, frontend e backend estão registrados. |
| Entrega no Teams | Pendente | Ação externa reservada aos integrantes. |
| Dez commits, dois por integrante | Pendente | O plano está preservado, mas cada integrante precisa criar seus próprios commits. |
