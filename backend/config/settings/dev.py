"""Development settings."""
from .base import *  # noqa: F403

DEBUG = True

# Relax static storage in dev (no manifest requirement).
STORAGES = {
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}
