# BuildNest

> **Plan. Build. Track.** — The complete digital workspace for homeowners managing a construction project.

BuildNest gives homeowners a single place to manage budgets, contractors, tasks, documents, and site photos throughout the entire home construction journey. The backend exposes a REST API that serves both the web app today and the Android app in a future phase.

---

## Features

### Dashboard

A live overview of the active project — budget burn, upcoming milestones, recent expenses, open tasks, and contractor headcount. All data is pulled in real time from the API with skeleton loading states.

### Projects

Create and manage multiple construction projects. Each project is an isolated workspace; switching projects updates every view instantly via Zustand global state.

### Budget

Set a total budget and track spend against it. A cumulative spend chart shows the burn curve over time. Alerts surface automatically when spend exceeds 90 % or the project goes over budget. Budget can be adjusted at any time.

### Expenses

Log every site expense with amount, category, vendor, date, and notes. The expense table supports search and filtering. Category breakdown is fed into the Analytics and Budget views.

### Tasks

Manage the full task list for a project — create tasks with title, status (To Do / In Progress / Done), priority (Low / Medium / High / Critical), assignee, and due date. Open task count feeds the Dashboard.

### Milestones

Define key project milestones with target dates and track completion. Milestone progress feeds the Timeline view and surfaces overdue alerts in Notifications.

### Timeline

A phase-by-phase project timeline built from real milestone data. Shows overall project progress, phase completion bars, and a project history log.

### Analytics

Charts covering spend trends by week, expense breakdown by category, contractor spend distribution, and task throughput over time. All charts are built with Recharts and read from aggregated API data.

### Materials

Track materials ordered for the project — name, quantity, unit, unit cost, supplier, status (Ordered / Delivered / Installed / Returned). Inline editing and status updates sync to the backend immediately.

### Contractors

A directory of contractors on the project — name, trade, company, phone, email, and status. Add, edit, and remove contractors. Contractor list feeds the Dashboard headcount card.

### Documents

Upload and manage project documents — permits, contracts, invoices, plans, and reports. Files are stored on the server using Django's `FileField` with local `MEDIA_ROOT` storage. Each document can be downloaded directly or deleted. Storage usage and document count shown in stat cards.

### Photos

Upload site progress photos from any device. Photos are displayed in a responsive grid grouped by upload month. Clicking any photo opens a full-screen lightbox with caption and date. Photos are stored on the server alongside documents.

### Reports

Monthly financial summaries — total spend, expense count, top category, and contractor costs per month. Exportable report templates for sharing with banks, architects, or project managers.

### Notifications

Real-time alerts computed on the server — overdue tasks, delayed milestones, and budget warnings. Read/unread state managed client-side. Badge count shown in the sidebar nav.

### Settings

- **Profile** — edit name, phone, and avatar; changes persist to the backend immediately.
- **Appearance** — light / dark / system theme toggle, persisted in localStorage.
- **Help** — FAQ accordion, contact email, and documentation links.

---

## Screenshots

> Add screenshots to `docs/screenshots/` after the first server run and link them here.

| Page         | Screenshot                       |
| ------------ | -------------------------------- |
| Landing page | `docs/screenshots/landing.png`   |
| Dashboard    | `docs/screenshots/dashboard.png` |
| Budget       | `docs/screenshots/budget.png`    |
| Expenses     | `docs/screenshots/expenses.png`  |
| Tasks        | `docs/screenshots/tasks.png`     |
| Documents    | `docs/screenshots/documents.png` |
| Photos       | `docs/screenshots/photos.png`    |
| Analytics    | `docs/screenshots/analytics.png` |

---

## Tech stack

| Layer                 | Technology                                                      |
| --------------------- | --------------------------------------------------------------- |
| Frontend              | Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui |
| State / data fetching | TanStack Query v5, Zustand, React Hook Form + Zod               |
| Charts                | Recharts                                                        |
| Backend               | Django 5, Django REST Framework, SimpleJWT                      |
| Database              | PostgreSQL (SQLite for local dev)                               |
| File storage          | Django `FileField`, local `MEDIA_ROOT` (production: swap to S3) |
| API docs              | drf-spectacular → Swagger UI at `/api/docs/`                    |
| Infra                 | Docker, Docker Compose, GitHub Actions                          |
| Quality               | ESLint, Prettier, Husky, lint-staged, Ruff                      |

---

## Repository structure

```
buildnest/
├── frontend/               # Next.js 15 web app
│   └── src/
│       ├── app/            # App Router pages
│       ├── features/       # Feature modules (hooks, components)
│       ├── components/     # Shared UI components
│       └── lib/            # API client, store, utils
├── backend/                # Django REST API
│   ├── apps/
│   │   ├── accounts/       # Custom User model, JWT auth
│   │   ├── projects/       # Projects, budget, analytics, timeline, notifications
│   │   ├── expenses/       # Expense tracking
│   │   ├── tasks/          # Task management
│   │   ├── milestones/     # Milestones
│   │   ├── materials/      # Material inventory
│   │   ├── contractors/    # Contractor directory
│   │   ├── documents/      # Document file upload
│   │   └── photos/         # Photo file upload
│   └── config/             # Django settings, URLs
├── docs/                   # Installation and development guides
└── docker/                 # Docker Compose for local dev and production
```

---

## Quick start

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend

```bash
cd backend

# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS / Linux
python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # optional — creates an admin account
python manage.py runserver
# → http://localhost:8000
# → http://localhost:8000/api/docs/   (Swagger UI)
```

### Docker (everything together)

```bash
docker compose -f docker/docker-compose.yml up
```

See [docs/INSTALLATION.md](docs/INSTALLATION.md) for full setup and [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for conventions.

---

## API overview

The backend exposes a versioned REST API under `/api/v1/`. All endpoints require JWT authentication except login and signup.

| Resource      | Endpoint                                                                 |
| ------------- | ------------------------------------------------------------------------ |
| Auth          | `POST /api/v1/auth/login/` · `/auth/signup/` · `/auth/token/refresh/`    |
| Profile       | `GET/PATCH /api/v1/profiles/`                                            |
| Projects      | `GET/POST /api/v1/projects/` · `GET/PATCH/DELETE /api/v1/projects/{id}/` |
| Budget        | `GET /api/v1/projects/{id}/budget/`                                      |
| Analytics     | `GET /api/v1/projects/{id}/analytics/`                                   |
| Timeline      | `GET /api/v1/projects/{id}/timeline/`                                    |
| Notifications | `GET /api/v1/projects/{id}/notifications/`                               |
| Reports       | `GET /api/v1/projects/{id}/reports/`                                     |
| Expenses      | `GET/POST /api/v1/expenses/`                                             |
| Tasks         | `GET/POST /api/v1/tasks/`                                                |
| Milestones    | `GET/POST /api/v1/milestones/`                                           |
| Materials     | `GET/POST /api/v1/materials/`                                            |
| Contractors   | `GET/POST /api/v1/contractors/`                                          |
| Documents     | `GET/POST/DELETE /api/v1/documents/`                                     |
| Photos        | `GET/POST/DELETE /api/v1/photos/`                                        |

Full interactive docs: **`http://localhost:8000/api/docs/`**

---

## Environment variables

### Backend — `backend/.env`

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## Production notes

- Set `DEBUG=False` and use PostgreSQL via `DATABASE_URL`
- Serve `MEDIA_ROOT` files through a CDN or reverse proxy (nginx) in production
- Set `CORS_ALLOWED_ORIGINS` to your production frontend domain
- Rotate `SECRET_KEY` before first production deploy
