# Folder Structure

## Monorepo

```
buildnest/
├── frontend/          # Next.js 15 application
├── backend/           # Django + DRF API
├── docs/              # This documentation
├── docker/            # docker-compose.yml + Dockerfiles
└── .github/           # CI workflows, PR template
```

## Frontend — feature-based architecture

```
frontend/src/
├── app/                        # Routing ONLY — pages compose features
│   ├── (auth)/                 # Auth layout group: centered card, no sidebar
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (dashboard)/            # Dashboard layout group: sidebar + navbar
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── budget/
│   │   ├── expenses/
│   │   ├── materials/
│   │   ├── contractors/
│   │   ├── documents/
│   │   ├── photos/
│   │   ├── timeline/
│   │   ├── tasks/
│   │   ├── milestones/
│   │   ├── reports/
│   │   ├── analytics/
│   │   ├── notifications/
│   │   ├── help/
│   │   └── settings/           # Settings layout: sub-navigation (profile, …)
│   ├── layout.tsx              # Root layout: fonts, providers, metadata
│   ├── error.tsx               # Error layout
│   ├── not-found.tsx
│   └── globals.css             # Design tokens: colors, typography, spacing
│
├── components/
│   ├── ui/                     # Primitive components (shadcn/ui based)
│   └── shared/                 # Composed app components: sidebar, navbar,
│                               # stat-card, empty-state, page-header,
│                               # command palette, theme switch, …
│
├── features/                   # One folder per domain feature
│   └── <feature>/
│       ├── components/         # Feature-specific components
│       ├── data.ts             # Dummy data (until real API lands)
│       └── types.ts            # Feature types
│
├── lib/
│   ├── api/                    # API abstraction layer (client + endpoints)
│   ├── constants.ts            # App-wide constants
│   ├── env.ts                  # Typed, validated environment access
│   └── utils.ts                # cn() and general utilities
│
├── hooks/                      # Reusable hooks (media query, debounce, …)
├── providers/                  # Theme, Query, Toast providers
├── stores/                     # Zustand stores (UI state)
└── config/                     # Navigation config, site metadata
```

### Rules

1. `app/` contains **routing and composition only** — no business components.
2. Anything used by 2+ features lives in `components/shared/` or `lib/`.
3. A feature never imports from another feature — shared code moves down a layer.
4. Dummy data lives beside the feature (`features/<x>/data.ts`) so swapping to the real API is a one-file change.

## Backend

```
backend/
├── manage.py
├── config/
│   ├── settings/ (base / dev / prod)
│   ├── urls.py            # /api/v1/ versioned routing
│   ├── wsgi.py / asgi.py
└── apps/
    └── core/              # Infrastructure endpoints (health)
```

New backend features are Django apps under `apps/` (e.g. `apps.projects`).
