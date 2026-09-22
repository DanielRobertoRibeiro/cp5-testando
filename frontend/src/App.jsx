import { useEffect, useState } from "react";

// 1. DADOS FIXOS DA INTERFACE

const beneficios = [
  {
    icone: "electric_bolt",
    titulo: "Entrega rápida",
    texto: "Uma experiência planejada para aproximar você dos sabores da sua região.",
  },
  {
    icone: "restaurant",
    titulo: "Mais variedade",
    texto: "Receitas e ideias de diferentes cozinhas para ajudar na escolha da próxima refeição.",
  },
  {
    icone: "credit_card",
    titulo: "Pagamento simples",
    texto: "Fluxo de pagamento previsto para o aplicativo conceitual, com etapas fáceis de entender.",
  },
];

const depoimentos = [
  {
    nome: "Marina Alves",
    texto: "A apresentação é clara e a seleção de receitas ajuda a decidir o almoço sem perder tempo.",
  },
  {
    nome: "Rafael Costa",
    texto: "Gostei de filtrar por categoria e conferir tempo de preparo e porções no mesmo lugar.",
  },
  {
    nome: "Camila Rocha",
    texto: "O projeto transmite bem a ideia de um delivery simples, acolhedor e fácil de navegar.",
  },
];

const nomesCategorias = {
  "main course": "Prato principal",
  "side dish": "Acompanhamento",
  salad: "Salada",
  dessert: "Sobremesa",
  appetizer: "Entrada",
  breakfast: "Café da manhã",
  soup: "Sopa",
  snack: "Lanche",
  Outros: "Outros",
};

const enderecoBackend = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
let promessaReceitas = null;

function buscarReceitas() {
  if (!promessaReceitas) {
    promessaReceitas = fetch(`${enderecoBackend}/api/receitas?quantidade=6`)
      .then(async (resposta) => {
        const dados = await resposta.json().catch(() => ({}));

        if (!resposta.ok) {
          throw new Error(dados.erro || "Não foi possível buscar as receitas.");
        }

        return dados.receitas;
      })
      .catch((erro) => {
        promessaReceitas = null;
        throw erro;
      });
  }

  return promessaReceitas;
}

function App() {
  // 2. ESTADOS DO COMPONENTE
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuComFundo, setMenuComFundo] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroApi, setErroApi] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);

  // 3. EFEITO DO MENU DURANTE A ROLAGEM
  useEffect(() => {
    const observarRolagem = () => {
      setMenuComFundo(window.scrollY > 40);
    };

    observarRolagem();
    window.addEventListener("scroll", observarRolagem);

    return () => window.removeEventListener("scroll", observarRolagem);
  }, []);

  // 4. EFEITO DE CARREGAMENTO DAS RECEITAS
  const carregarReceitas = async () => {
    setCarregando(true);
    setErroApi("");

    try {
      const dadosRecebidos = await buscarReceitas();
      setReceitas(dadosRecebidos);
    } catch (erro) {
      setErroApi(erro.message);
      setReceitas([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarReceitas();
  }, []);

  // 5. CATEGORIAS E FILTROS
  const categorias = [
    "Todas",
    ...new Set(receitas.map((receita) => receita.tipos[0] || "Outros")),
  ];

  const receitasFiltradas =
    categoria === "Todas"
      ? receitas
      : receitas.filter((receita) => (receita.tipos[0] || "Outros") === categoria);

  const nomeCategoria = (nome) => nomesCategorias[nome] || nome;

  const tentarNovamente = () => {
    promessaReceitas = null;
    carregarReceitas();
  };

  const fecharMenu = () => setMenuAberto(false);

  // 6. FUNÇÃO DO FORMULÁRIO
  const enviarEmail = (evento) => {
    evento.preventDefault();
    setEmailEnviado(true);
    setEmail("");
  };

  // 7. INTERFACE JSX
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          menuComFundo || menuAberto
            ? "bg-[#fffaf2]/95 shadow-sm backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        >
          <a href="#inicio" onClick={fecharMenu} className="font-display text-2xl font-bold text-[#b64022]">
            Gourmet<span className="text-[#2f5d45]">On</span>
          </a>

          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white text-[#29231f] shadow md:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className="material-icons-round" aria-hidden="true">
              {menuAberto ? "close" : "menu"}
            </span>
          </button>

          <div
            id="menu-principal"
            className={`${
              menuAberto ? "flex" : "hidden"
            } absolute left-5 right-5 top-20 flex-col gap-1 rounded-2xl bg-white p-4 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-7 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {["Sobre", "Cardápio", "Recursos", "Depoimentos", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("á", "a")}`}
                onClick={fecharMenu}
                className="rounded-lg px-3 py-2 font-medium text-[#39312c] hover:bg-[#f7e9da] hover:text-[#a8381d]"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="inicio" className="relative min-h-[760px] bg-[#211c19] text-white">
          <img
            src="/gourmet-hero.png"
            alt="Mesa com pizza artesanal, massa, salada e legumes"
            className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#211c19] via-[#211c19]/85 to-transparent" />
          <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 pb-16 pt-28 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em]">
                Conceito acadêmico de delivery
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                Sua próxima descoberta começa pelo sabor
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#fff6ea] sm:text-xl">
                Conheça receitas reais, explore categorias e imagine um jeito simples de encontrar boas refeições perto de você.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cardapio"
                  className="rounded-full bg-[#d95d39] px-7 py-4 text-center font-bold text-white shadow-lg hover:bg-[#bf4728]"
                >
                  Explorar cardápio
                </a>
                <button
                  type="button"
                  aria-disabled="true"
                  title="O aplicativo acadêmico ainda não possui arquivo para download"
                  className="cursor-not-allowed rounded-full border border-white/50 bg-white/10 px-7 py-4 text-center font-bold text-white/90"
                >
                  Download em breve
                </button>
              </div>
              <p className="mt-5 text-sm text-[#f7dcc7]">
                O aplicativo ainda não está disponível para download. Esta página apresenta o protótipo do projeto GourmetOn.
              </p>
            </div>
          </div>
        </section>

        <section id="sobre" className="px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="font-bold uppercase tracking-[0.18em] text-[#b64022]">Por que GourmetOn</p>
                <h2 className="font-display mt-3 text-4xl font-bold leading-tight text-[#29231f] sm:text-5xl">
                  Boas escolhas começam com informação clara
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[#6d625b]">
                O GourmetOn aproxima pessoas de restaurantes e receitas em uma experiência responsiva. Nesta landing page, a consulta à Spoonacular mostra dados reais enquanto as funções de delivery permanecem identificadas como conceito.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {beneficios.map((beneficio) => (
                <article key={beneficio.titulo} className="rounded-3xl border border-[#eadbcb] bg-white p-7 shadow-sm">
                  <span className="material-icons-round flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7e0d6] text-[#a8381d]" aria-hidden="true">
                    {beneficio.icone}
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{beneficio.titulo}</h3>
                  <p className="mt-3 leading-7 text-[#6d625b]">{beneficio.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cardapio" className="bg-[#eef3eb] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-bold uppercase tracking-[0.18em] text-[#2f5d45]">Cardápio dinâmico</p>
                <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">Receitas para inspirar seu pedido</h2>
                <p className="mt-4 max-w-2xl text-[#5b675f]">
                  Todas as receitas são carregadas da Spoonacular por meio do backend seguro do projeto.
                </p>
              </div>

              {!carregando && (
                <div className="flex flex-wrap gap-2" aria-label="Filtros do cardápio">
                  {categorias.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategoria(item)}
                      aria-pressed={categoria === item}
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        categoria === item
                          ? "bg-[#2f5d45] text-white"
                          : "bg-white text-[#2f5d45] hover:bg-[#dfe9db]"
                      }`}
                    >
                      {nomeCategoria(item)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10" aria-live="polite">
              {carregando && (
                <div className="rounded-3xl bg-white p-10 text-center text-lg font-semibold text-[#2f5d45] shadow-sm">
                  Carregando receitas...
                </div>
              )}

              {!carregando && erroApi && (
                <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#e5b49f] bg-[#fff3ed] p-5 text-[#7a2e18] sm:flex-row sm:items-center sm:justify-between">
                  <p>{erroApi}</p>
                  <button
                    type="button"
                    onClick={tentarNovamente}
                    className="shrink-0 rounded-full bg-[#b64022] px-5 py-3 font-bold text-white hover:bg-[#963018]"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {!carregando && !erroApi && receitasFiltradas.length === 0 && (
                <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                  <p className="text-lg font-semibold text-[#2f5d45]">Nenhuma receita foi encontrada.</p>
                  <button
                    type="button"
                    onClick={tentarNovamente}
                    className="mt-5 rounded-full bg-[#2f5d45] px-5 py-3 font-bold text-white hover:bg-[#244936]"
                  >
                    Buscar novamente
                  </button>
                </div>
              )}

              {!carregando && !erroApi && receitasFiltradas.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {receitasFiltradas.map((receita) => {
                    const tipo = receita.tipos[0] || "Outros";
                    const cozinha = receita.cozinhas[0] || "Internacional";

                    return (
                      <article key={receita.id} className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <img
                          src={receita.imagem || "/gourmet-hero.png"}
                          alt={`Receita ${receita.titulo}`}
                          className="h-56 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-[#7a4b35]">
                            <span className="rounded-full bg-[#f8e9de] px-3 py-1">{nomeCategoria(tipo)}</span>
                            <span className="rounded-full bg-[#edf1e9] px-3 py-1 text-[#3d654e]">{cozinha}</span>
                          </div>
                          <h3 className="mt-4 text-xl font-bold leading-snug">{receita.titulo}</h3>
                          <div className="mt-5 flex gap-5 text-sm text-[#6d625b]">
                            <span className="flex items-center gap-1">
                              <span className="material-icons-round" aria-hidden="true">schedule</span>
                              {receita.tempoPreparo || "—"} min
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-icons-round" aria-hidden="true">group</span>
                              {receita.porcoes || "—"} porções
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="recursos" className="px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-bold uppercase tracking-[0.18em] text-[#b64022]">Funcionalidades</p>
              <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">O que funciona agora e o que faz parte do conceito</h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[2rem] bg-[#2f5d45] p-8 text-white sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#cae0d1]">Disponível nesta landing page</p>
                <h3 className="mt-3 text-2xl font-bold">Experiência implementada</h3>
                <ul className="mt-7 grid gap-4">
                  {["Menu responsivo e navegação suave", "Consulta de receitas pela API", "Filtro local por categoria", "Formulário com confirmação visual"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="material-icons-round mt-0.5 text-[#f4c178]" aria-hidden="true">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[2rem] border border-[#e6d7c8] bg-white p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#a8381d]">Planejado para o aplicativo</p>
                <h3 className="mt-3 text-2xl font-bold">Recursos conceituais</h3>
                <ul className="mt-7 grid gap-4 text-[#5f554e]">
                  {["Localização de restaurantes", "Rastreamento de entregas", "Pagamento e pedidos reais", "Aplicativo para download"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="material-icons-round mt-0.5 text-[#c25b3b]" aria-hidden="true">pending</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="depoimentos" className="bg-[#2b2420] px-5 py-20 text-white lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="font-bold uppercase tracking-[0.18em] text-[#f2b36f]">Depoimentos de demonstração</p>
            <h2 className="font-display mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">Como o GourmetOn pode fazer parte da rotina</h2>
            <p className="mt-4 text-[#d7cbc3]">Os relatos abaixo são fictícios e servem apenas para apresentar o conceito acadêmico.</p>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {depoimentos.map((depoimento) => (
                <blockquote key={depoimento.nome} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                  <span className="material-icons-round text-4xl text-[#f2b36f]" aria-hidden="true">format_quote</span>
                  <p className="mt-4 text-lg leading-8 text-[#fff7ef]">“{depoimento.texto}”</p>
                  <footer className="mt-6 font-bold text-[#f2b36f]">{depoimento.nome}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-[#f2ded0] p-8 sm:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-bold uppercase tracking-[0.18em] text-[#a8381d]">Novidades do projeto</p>
              <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">Receba um aviso quando o conceito evoluir</h2>
              <p className="mt-4 max-w-xl leading-7 text-[#6d5143]">
                Este formulário demonstra o fluxo de cadastro. O endereço informado não é enviado nem armazenado.
              </p>
            </div>

            <form onSubmit={enviarEmail} className="rounded-3xl bg-white p-6 shadow-sm">
              <label htmlFor="email" className="block font-bold text-[#342a24]">Seu melhor e-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(evento) => {
                  setEmail(evento.target.value);
                  setEmailEnviado(false);
                }}
                required
                placeholder="voce@exemplo.com"
                className="mt-3 w-full rounded-xl border border-[#d8c7ba] bg-[#fffdf9] px-4 py-3"
              />
              <button type="submit" className="mt-4 w-full rounded-xl bg-[#b64022] px-5 py-3 font-bold text-white hover:bg-[#963018]">
                Quero acompanhar
              </button>
              <p className="mt-3 min-h-6 text-sm font-semibold text-[#2f5d45]" aria-live="polite">
                {emailEnviado ? "E-mail validado. Demonstração concluída sem armazenamento." : "Nenhum dado será salvo."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#1f1a17] px-5 py-12 text-[#ded2ca] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-bold text-white">GourmetOn</p>
            <p className="mt-3 max-w-sm leading-7">Projeto acadêmico desenvolvido para o Check-Point 05 de Web Development with JS.</p>
          </div>
          <div>
            <p className="font-bold text-white">Navegação</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#sobre" className="hover:text-white">Sobre</a>
              <a href="#cardapio" className="hover:text-white">Cardápio</a>
              <a href="#contato" className="hover:text-white">Contato</a>
            </div>
          </div>
          <div>
            <p className="font-bold text-white">Contato e informações</p>
            <p className="mt-3">contato@gourmeton.exemplo</p>
            <p className="text-sm">Endereço fictício para fins acadêmicos.</p>
            <div id="redes-sociais" className="mt-4 flex flex-wrap gap-4 text-sm">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-white">
                Instagram (demonstração)
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="hover:text-white">
                TikTok (demonstração)
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a id="termos" href="#termos" className="hover:text-white">Termos de uso: demonstração</a>
              <a id="privacidade" href="#privacidade" className="hover:text-white">Privacidade: nenhum dado armazenado</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm">
          © 2026 GourmetOn. Trabalho acadêmico sem operação comercial.
        </div>
      </footer>
    </div>
  );
}

export default App;
