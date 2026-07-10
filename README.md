# Starsoft — Front-end Challenge

**🔗 Demo:** **[starsoft-teste.vercel.app](https://starsoft-teste.vercel.app)** · **[/new](https://starsoft-teste.vercel.app/new)** (vitrine com ordenação + scroll infinito)

Marketplace de NFTs construído com **Next.js (App Router)**, consumindo a API do desafio da Starsoft. O foco foi fidelidade ao design do Figma, uma camada de dados sólida com **React Query**, carrinho de compras completo e animações fluidas com **Motion**.

> Lighthouse (produção): **Performance 96 · Acessibilidade 100 · Best Practices 96 · SEO 100**.

## ✨ Funcionalidades

- **Listagem de produtos** (`/`) consumindo a API real, com _load more_ incremental, skeletons de carregamento e tratamento de erro.
- **Carrinho de compras** — drawer lateral fiel ao Figma, controle de quantidade, remoção, total, contador no header e **persistência em `localStorage`**.
- **Animação _fly-to-cart_** — ao clicar em comprar, a imagem do produto voa em arco até o ícone do carrinho, que pulsa ao receber o item.
- **Modal de detalhes** — clique na imagem/título do card para abrir os detalhes com a descrição completa e ação de compra (entra/sai com _spring_).
- **Página `/new`** — vitrine ampliada com **ordenação** (Em destaque / Nome / Preço, asc e desc) via dropdown animado e **infinite scroll**.
- **Responsividade** em mobile, tablet e desktop.

## 🧱 Stack & justificativas

| Tecnologia                                  | Uso                | Por quê                                                                                                           |
| ------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Next.js 16 (App Router)**                 | Framework          | Roteamento, Server Components, otimização de imagem e build.                                                      |
| **TypeScript**                              | Toda a base        | Segurança de tipos e melhor DX.                                                                                   |
| **React Query (TanStack)**                  | Data fetching      | Cache, dedupe, cancelamento e `useInfiniteQuery` para paginação/infinite scroll com menos boilerplate.            |
| **Motion** (`motion.dev`, ex-Framer Motion) | Animações          | Modal, fly-to-cart, dropdown de ordenação, stagger dos cards e micro-interações.                                  |
| **SASS + CSS Modules**                      | Estilização        | Estilos escopados e modulares, com tokens/mixins de design compartilhados e injetados automaticamente.            |
| **Redux Toolkit** + React-Redux             | Estado do carrinho | Store tipada com slice do carrinho; server-state fica no React Query (ver [Decisões](#-decisões-de-arquitetura)). |
| **ESLint + Prettier**                       | Qualidade          | Padrão consistente alinhado ao estilo do time.                                                                    |

## 🎨 Design tokens

As cores, tipografia (Poppins + IBM Plex Sans), espaçamentos, breakpoints e raios vêm de `src/styles/abstracts` e são injetados em todo módulo SCSS via `sassOptions.additionalData` — então `space()`, `@include media(...)` e as _custom properties_ de cor estão disponíveis sem imports.

## 🚀 Como rodar

### Pré-requisitos

- **Node.js** ≥ 20
- **pnpm** ≥ 9 (`corepack enable` já disponibiliza o pnpm)

### Passos

```bash
# instalar dependências
pnpm install

# ambiente de desenvolvimento (http://localhost:3000)
pnpm dev

# build de produção
pnpm build && pnpm start
```

### Scripts

| Script              | Ação                        |
| ------------------- | --------------------------- |
| `pnpm dev`          | Servidor de desenvolvimento |
| `pnpm build`        | Build de produção           |
| `pnpm start`        | Sobe o build de produção    |
| `pnpm lint`         | ESLint                      |
| `pnpm format`       | Prettier (write)            |
| `pnpm format:check` | Prettier (check)            |

### Variáveis de ambiente

A base da API tem _fallback_ embutido; para sobrescrever, crie um `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api-challenge.starsoft.games/api/v1
```

## 🗂️ Estrutura

```
src/
├─ app/
│  ├─ _components/        # ProductList, ProductModal (home)
│  ├─ new/                # Página /new (Explorer, SortSelect)
│  ├─ layout.tsx          # Providers, header, footer, fontes
│  └─ page.tsx            # Home
├─ components/
│  ├─ cart/               # CartButton, CartDrawer
│  ├─ layout/             # Header, Footer
│  └─ ui/                 # Button, ProductCard, icons/
├─ lib/
│  ├─ api/                # client da API + hook React Query
│  ├─ cart/               # RTK slice/store + fly-to-cart overlay
│  └─ query/              # QueryProvider
└─ styles/abstracts/      # tokens, mixins
```

## 🧠 Decisões de arquitetura

- **SSR/ISR com prefetch + hidratação:** as páginas pré-buscam a 1ª página no server (React Query `prefetchInfiniteQuery` → `HydrationBoundary`) e são geradas com **ISR** (`revalidate`), servindo os produtos no HTML estático (TTFB baixo, sem waterfall). No client, o React Query cuida do _infinite scroll_, da ordenação e do cancelamento.
- **Modal em vez de rota de detalhe:** a API do desafio expõe apenas `GET /products` (sem endpoint por `id`); como os dados de detalhe já vêm na listagem, os detalhes são exibidos num modal, evitando um _fetch_/rota redundante.
- **Redux Toolkit para o carrinho, React Query para dados:** separação clara entre _client-state_ (carrinho, no RTK, com persistência em `localStorage`) e _server-state_ (produtos, no React Query com cache e cancelamento).
- **`next/image` + logo vetorial:** todas as imagens passam pelo otimizador; a logo é servida como SVG para nitidez em qualquer densidade de tela.
- **Contraste das CTAs (acessibilidade):** o Figma usa texto branco nos botões laranja, o que reprova o contraste WCAG AA (branco em `#ff8310` ≈ 2.5:1, mínimo 4.5:1). Optamos por **texto escuro** nas CTAs laranja (≈ 7:1) — um desvio consciente do mock em favor da acessibilidade (Lighthouse a11y 100).

## 🔭 Melhorias futuras

- **SEO** mais rico (Open Graph, JSON-LD) e auditoria de acessibilidade/Lighthouse.
- Transições animadas entre rotas e `next/dynamic` para componentes pesados.
