# BuildNest API (backend)

Django + Django REST Framework foundation. **No business logic, models or real endpoints yet** — only project configuration, JWT/DRF setup, OpenAPI docs and a health probe.

## Layout

```
backend/
├── manage.py
├── config/               # Project configuration
│   ├── settings/         # base.py / dev.py / prod.py (env-driven)
│   ├── urls.py           # Versioned API routing (/api/v1/)
│   ├── wsgi.py
│   └── asgi.py
└── apps/                 # Feature apps live here (apps.<feature>)
    └── core/             # Infrastructure: /api/v1/health/
```

## Run locally

```bash
python -m venv .venv
.venv\Scripts\activate            # Windows (source .venv/bin/activate on unix)
pip install -r requirements-dev.txt
copy .env.example .env            # then edit values
python manage.py migrate
python manage.py runserver
```

- API docs: http://localhost:8000/api/docs/
- Health: http://localhost:8000/api/v1/health/

## Conventions

- New features = new app under `apps/` (e.g. `apps.projects`), registered in `LOCAL_APPS` and routed in `config/urls.py` under `/api/v1/`.
- All configuration comes from environment variables (`django-environ`); never hardcode secrets.
- Lint with `ruff check .` before committing.
