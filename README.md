# BuildNest

> **Plan. Build. Track.**

BuildNest is the complete digital workspace for homeowners to plan, organize, track, document and manage the entire home construction journey.

This repository is a monorepo containing the full BuildNest platform.

## Repository structure

```
buildnest/
├── frontend/   # Next.js 15 app (App Router, TypeScript, Tailwind v4, shadcn/ui)
├── backend/    # Django + DRF API (PostgreSQL, JWT) — foundation only
├── docs/       # Documentation: installation, architecture, development guide
├── docker/     # Docker Compose + Dockerfiles for local dev and production
└── .github/    # CI workflows and PR templates
```

## Tech stack

| Layer    | Technology                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod, Framer Motion, Lucide, Recharts |
| Backend  | Django, Django REST Framework, PostgreSQL, SimpleJWT                                                                                            |
| Infra    | Docker, Docker Compose, GitHub Actions                                                                                                          |
| Quality  | ESLint, Prettier, Husky, lint-staged, Ruff (backend)                                                                                            |

## Quick start

```bash
# Frontend
cd frontend
npm install
npm run dev          # http://localhost:3000

# Backend (requires Python 3.12+)
cd backend
python -m venv .venv && .venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py runserver                        # http://localhost:8000

# Or run everything with Docker
docker compose -f docker/docker-compose.yml up
```

See [docs/INSTALLATION.md](docs/INSTALLATION.md) for full setup and [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for conventions.

## Current phase

**Foundation.** This codebase currently contains the production-grade scaffolding: design system, component library, layouts, routing, auth screens, and dashboard pages with realistic dummy data. Business logic, real APIs and database models are intentionally not implemented yet.
