# Installation

## Prerequisites

- **Node.js 22+** and npm 10+
- **Python 3.12+** (backend)
- **Docker Desktop** (optional, for the one-command stack)
- **PostgreSQL 16** (only if running the backend without Docker)

## Option A — Frontend only (most common during the foundation phase)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. All pages run on dummy data; no backend needed.

## Option B — Full stack with Docker

```bash
docker compose -f docker/docker-compose.yml up --build
```

| Service            | URL                                  |
| ------------------ | ------------------------------------ |
| Frontend           | http://localhost:3000                |
| API                | http://localhost:8000/api/v1/        |
| API docs (Swagger) | http://localhost:8000/api/docs/      |
| PostgreSQL         | localhost:5432 (buildnest/buildnest) |

## Option C — Backend natively

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate            # Windows
# source .venv/bin/activate       # macOS/Linux
pip install -r requirements-dev.txt
copy .env.example .env            # adjust DATABASE_URL to your postgres
python manage.py migrate
python manage.py runserver
```

## Environment variables

### Frontend (`frontend/.env.local`)

| Variable              | Default                        | Purpose                                    |
| --------------------- | ------------------------------ | ------------------------------------------ |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | Base URL used by the API abstraction layer |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000`        | Absolute URL of the app (links, metadata)  |

Copy `frontend/.env.example` to `frontend/.env.local` to get started.

### Backend (`backend/.env`)

See `backend/.env.example` — settings module, secret key, `DATABASE_URL`, CORS origins and JWT lifetimes.

## Troubleshooting

- **npm `ECONNRESET` during install** — the registry connection can be flaky; re-run with retries:
  `npm install --fetch-retries=5 --fetch-retry-maxtimeout=60000`
- **Port already in use** — frontend uses 3000, backend 8000, postgres 5432.
