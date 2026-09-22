# Auditoria do GourmetOn conforme o material do professor

Fonte conferida: `Check-point-05-web.pptx`, slides 4 a 9. O arquivo fornecido está no formato PowerPoint, embora tenha sido chamado de PDF na solicitação.

Data da revisão: 22/09/2026.

## Requisitos da aplicação

| Regra do professor | Estado | Evidência no projeto |
| --- | --- | --- |
| Landing page chamativa e informativa do GourmetOn | Atendido | A página apresenta o conceito, benefícios, cardápio, recursos, depoimentos e contato. |
| Interface em React | Atendido | `frontend/src/App.jsx` usa React, `useState` e `useEffect`. |
| Projeto criado com Vite | Atendido | Scripts e configuração estão em `frontend/package.json` e `frontend/vite.config.js`. |
| Estilização com Tailwind | Atendido | O plugin `@tailwindcss/vite` e as classes responsivas são usados na interface. |
| JSON e requisições assíncronas com Fetch | Atendido | O frontend consulta o backend e o backend consulta a Spoonacular com `fetch`. |
| API de comidas, com preferência pela Spoonacular | Atendido | O backend usa `https://api.spoonacular.com/recipes/random`. |
| Hero com título, descrição, imagem e botão de download | Atendido | O hero possui imagem de comida, proposta de valor, CTA do cardápio e aviso de aplicativo em breve. |
| Benefícios: entrega rápida, variedade e pagamento fácil | Atendido | Os três benefícios aparecem na seção de apresentação. |
| Funcionalidades e filtros | Atendido | O cardápio possui filtro local por categoria e botão de nova tentativa. |
| Depoimentos | Atendido | Três depoimentos são renderizados com `map` em uma seção alinhada à comunicação da marca. |
| Formulário para coleta de e-mail | Atendido | Campo controlado, validação e confirmação visual. |
| Rodapé com contato, redes sociais e termos | Parcialmente atendido por decisão visual | O rodapé mantém navegação, e-mail e Instagram; termos foram removidos conforme a revisão solicitada. |
| Menu fixo com mudança durante a rolagem | Atendido | O efeito de scroll altera fundo, opacidade e sombra do cabeçalho. |
| Scroll suave | Atendido | `scroll-smooth` foi aplicado no HTML e há suporte a `prefers-reduced-motion`. |
| Responsividade | Atendido | A interface usa pontos de quebra `sm`, `md` e `lg`, além de menu móvel. |
| Biblioteca de ícones | Atendido | A página usa Material Icons. |

## Entrega e apresentação

| Regra do professor | Estado | Evidência ou ação restante |
| --- | --- | --- |
| Página publicada na web | Atendido | Frontend público na Vercel e backend publicado e validado no Render. |
| README com descrição, tecnologias e integrantes | Atendido | `README.md` contém os três itens e as instruções de execução. |
| Grupo de até cinco pessoas | Atendido | O README registra cinco integrantes. |
| Link do deploy e repositório no Teams | Pendente do grupo | Ação externa após a publicação do frontend. |
| Demonstrar a aplicação funcionando | Preparado | `ROTEIRO_APRESENTACAO.md` organiza a demonstração. |
| Explicar tecnologias e estrutura | Preparado | README, SDD e roteiro descrevem frontend, backend e integração. |
| Explicar componentes, hooks, estado, Fetch, JSON e Tailwind | Preparado | O roteiro aponta os trechos correspondentes em `App.jsx` e `server.js`. |
| Explicar decisões, dificuldades e soluções | Preparado | O roteiro aborda proteção da chave, quota, CORS, StrictMode e responsividade. |

## Conclusão

O código atende aos requisitos funcionais e técnicos apresentados pelo professor. O frontend está público em `https://cp5-testando.vercel.app`, e o backend em `https://cp5-testando.onrender.com` retornou seis receitas reais da Spoonacular. Restam ao grupo apenas as etapas externas de enviar os links no Teams e completar os commits individuais planejados no SDD.
