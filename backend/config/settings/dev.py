"""Development settings."""
import os

from .base import *  # noqa: F403

DEBUG = True

# No DATABASE_URL configured → fall back to SQLite so `manage.py runserver`
# works without a local Postgres. Docker/prod always set DATABASE_URL.
if "DATABASE_URL" not in os.environ:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",  # noqa: F405
        }
    }

# Relax static storage in dev (no manifest requirement).
STORAGES = {
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}
