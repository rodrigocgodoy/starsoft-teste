<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Commits

Follow the [Conventional Commits](https://www.conventionalcommits.org/) spec: `type(scope): description`.

- Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
- `scope` is optional but preferred (e.g. `feat(auth): ...`).
- Write self-explanatory messages: the subject states _what_ changed; add a body explaining _why_ whenever the reason isn't obvious from the subject.
- Use the imperative mood, lowercase description, no trailing period.
- Use `!` after the type/scope (or a `BREAKING CHANGE:` footer) for breaking changes.

# Formatting & Linting

Prettier + ESLint are configured to match the team's Biome style (single quotes, no semicolons, `arrowParens: avoid`, trailing commas, 2-space/LF). Run `pnpm format` to format and `pnpm lint` to lint.

# Styling

Sass with SCSS Modules (`*.module.scss`) — no CSS-in-JS. Design tokens and mixins live in `src/styles/abstracts` and are auto-injected into every module via `sassOptions.additionalData`, so `space()`, `$breakpoints`, `@include media(...)`, and the color tokens are available without imports. Reference colours/radius through the CSS custom properties (`var(--color-*)`, `var(--radius)`) so runtime theming keeps working; use the Sass variables for build-time logic (breakpoints, spacing math).

# Images

Always use `next/image`, never a bare `<img>`. Provide `width`/`height` (or `fill` + a sized parent) to avoid layout shift, a real `sizes` for responsive art, `priority` for above-the-fold images, and `alt=""` for decorative ones. Whitelist remote hosts under `images.remotePatterns` in `next.config.ts`. For dynamic (non-static-import) images, pass a `blurDataURL` to enable `placeholder="blur"`.

# Performance — dynamic imports

Good componentization improves structure but does **not** reduce shipped JS — that's a separate concern. Reach for `next/dynamic` to code-split **heavy or interaction-gated Client Components**: modals, drawers, carousels, lightboxes, wallet/web3 widgets, and anything pulling a large third-party dependency.

- Server Components are already code-split automatically — `dynamic` is for Client Components (`'use client'`).
- `ssr: false` only works inside a Client Component (it errors in a Server Component); use it for client-only widgets (e.g. wallet connectors that touch `window`).
- Do **not** dynamically import above-the-fold/critical UI (hero, first cards) — it delays what the user sees first.
