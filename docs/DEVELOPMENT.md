# Development Guide

## Design principles

BuildNest's UI takes its cues from **Linear, Notion, Vercel and Stripe dashboards**:

- Minimal, professional, content-first. No glassmorphism, no decoration for its own sake.
- Dense but breathable layouts; generous whitespace over boxes-in-boxes.
- Subtle motion (Framer Motion) — 150–250ms, ease-out, never bouncy in the dashboard.
- Everything works in **light and dark** — test both before committing.

## Design tokens

All tokens live in `frontend/src/app/globals.css` as CSS variables consumed by Tailwind v4's `@theme`:

- **Colors** — semantic tokens (`--background`, `--foreground`, `--primary`, `--muted`, `--destructive`, chart palette). Never hardcode hex values in components.
- **Typography** — Geist Sans / Geist Mono with a fixed type scale (`text-xs` → `text-3xl`); page titles are `text-2xl font-semibold tracking-tight`.
- **Spacing** — Tailwind's 4px scale; standard page padding is `p-6`, card padding `p-4`/`p-6`, section gaps `gap-6`.
- **Radii** — `--radius` (8px default); cards `rounded-xl`, controls `rounded-md`.

## Code quality

| Tool           | Command             | When                       |
| -------------- | ------------------- | -------------------------- |
| ESLint         | `npm run lint`      | CI + pre-commit            |
| Prettier       | `npm run format`    | pre-commit via lint-staged |
| TypeScript     | `npm run typecheck` | CI                         |
| Ruff (backend) | `ruff check .`      | CI + pre-commit            |

Husky runs lint-staged on every commit — staged files are linted and formatted automatically. Commits that fail lint do not land.

## Adding a feature page (frontend)

1. Create `src/features/<feature>/` with `types.ts`, `data.ts` (dummy data) and `components/`.
2. Add the route: `src/app/(dashboard)/<feature>/page.tsx` — compose from the feature folder; keep the page file thin.
3. Register it in `src/config/navigation.ts` so the sidebar, command palette and breadcrumbs pick it up.
4. Fetch data through the API layer (`src/lib/api/`) even while it returns dummy data — pages must not know where data comes from.

## API abstraction layer

`src/lib/api/client.ts` exposes a typed `apiClient` (fetch wrapper with auth-header hook, error normalization and JSON handling). Endpoint modules (`src/lib/api/endpoints/*.ts`) define **signatures only** for now and resolve dummy data. When the Django API lands, implementations change inside `lib/api/` and nothing else moves.

## State management

- **Server state** → TanStack Query (`useQuery`/`useMutation`) — already wired via `QueryProvider`.
- **UI state** → Zustand stores in `src/stores/` (sidebar collapsed, command palette open, …).
- **Forms** → React Hook Form + Zod resolvers; schemas live next to the form.

## Git conventions

- Branches: `feat/<area>-<short>`, `fix/…`, `chore/…`
- Commits: conventional style — `feat(budget): add category breakdown chart`
- PRs: fill the template; attach light+dark screenshots for UI changes.
