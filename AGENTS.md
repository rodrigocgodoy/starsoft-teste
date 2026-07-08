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
