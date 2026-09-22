# SDD aplicado ao GourmetOn

Este arquivo registra as decisões implementadas a partir do SDD 1.0 fornecido em 22/09/2026, das aulas 16 e 17 e da apresentação `Check-point-05-web.pptx`. A ordem de precedência adotada foi: solicitação do usuário, material do professor, exemplos das aulas e SDD.

## Escopo aplicado

- Landing page responsiva do GourmetOn.
- Frontend em JavaScript, React, Vite e Tailwind CSS.
- Backend simples em Node.js, Express e CORS.
- Fetch nativo nos dois lados.
- Spoonacular como fonte principal.
- Chave protegida na variável `SPOONACULAR_API_KEY`.
- Estados de carregamento, sucesso e erro.
- Erro visível e nova tentativa sem substituir a API por receitas criadas localmente.
- Menu fixo, menu móvel, scroll suave, hero, benefícios, cardápio, funcionalidades, depoimentos, formulário e rodapé.
- Acessibilidade básica, documentação, roteiro e preparação para deploy.

## Fora do escopo

Autenticação, pagamento, carrinho, pedidos, rastreamento real, banco de dados, painel administrativo, cadastro de restaurantes, envio de campanhas, download do aplicativo, gerenciamento global de estado, TypeScript e testes end-to-end complexos.

## Contrato interno da API

`GET /api/receitas?quantidade=6`

- quantidade opcional;
- padrão igual a 6;
- inteiro entre 1 e 12;
- erro 400 para valor inválido;
- erro 503 para chave ausente ou limite de quota;
- erro 502 para falha externa ou de rede.

Resposta:

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

## Decisões

1. O frontend nunca lê a chave externa.
2. A autenticação da Spoonacular usa `x-api-key`.
3. Uma chamada solicita todas as receitas da tela.
4. Os filtros não fazem novas requisições.
5. O `StrictMode` é mantido e a promessa compartilhada evita consulta externa duplicada.
6. O formulário valida o e-mail, mas não armazena nem envia dados.
7. Recursos não implementados aparecem como conceituais.
8. Após a configuração da chave, a solicitação explícita do usuário substituiu a contingência com receitas locais: o cardápio agora apresenta exclusivamente dados da Spoonacular.

## Plano de dez commits

| Espaço | Integrante | Responsabilidade | Mensagem sugerida |
| --- | --- | --- | --- |
| 01 | Daniel Roberto | Estrutura e arquivos base | `chore: cria estrutura inicial do frontend e backend` |
| 02 | Leonardo Ferreira | Cabeçalho, menu e hero | `feat: cria cabecalho e hero responsivos` |
| 03 | Jecky Cossio | Express e Spoonacular | `feat: integra backend com a spoonacular` |
| 04 | Felipe Bandeira Pedrol | Apresentação, benefícios e recursos | `feat: cria secoes de apresentacao e beneficios` |
| 05 | Felipi Godoy | Consumo da API e cardápio | `feat: carrega receitas e monta cardapio` |
| 06 | Daniel Roberto | Categorias, filtro e nova tentativa | `feat: adiciona filtro e nova tentativa da api` |
| 07 | Leonardo Ferreira | Depoimentos, formulário e rodapé | `feat: conclui secoes finais da landing page` |
| 08 | Jecky Cossio | Erros e contingência | `fix: melhora tratamento de erros e contingencia` |
| 09 | Felipe Bandeira Pedrol | Documentação e roteiro | `docs: atualiza documentacao e roteiro do projeto` |
| 10 | Felipi Godoy | Acessibilidade, build e deploy | `chore: valida acessibilidade build e deploy` |

Cada integrante deve criar seus dois commits com autoria real. O trabalho entregue nesta pasta não falsifica autores nem cria commits vazios.
