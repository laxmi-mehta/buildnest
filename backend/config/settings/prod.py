"""Production settings — secure defaults, everything from environment."""
import os

from .base import *  # noqa: F403

DEBUG = False

# Render sets the internal hostname; allow it alongside the custom domain
_render_host = os.environ.get("RENDER_EXTERNAL_HOSTNAME", "")
if _render_host:
    ALLOWED_HOSTS = ALLOWED_HOSTS + [_render_host]  # noqa: F405

# Security headers
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Neon (and most managed Postgres) requires SSL — django-environ passes
# ?sslmode=require when it's in the URL, but this is a safe explicit fallback
DATABASES["default"].setdefault("OPTIONS", {})  # noqa: F405
DATABASES["default"]["OPTIONS"]["sslmode"] = "require"  # noqa: F405
