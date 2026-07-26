"""Root URL configuration.

API routes are versioned under /api/v1/. Feature apps register their own
urls modules here as they are implemented.
"""
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.core.urls")),
    path("api/v1/auth/", include("apps.accounts.urls")),
    path("api/v1/", include("apps.accounts.profile_urls")),
    path("api/v1/", include("apps.projects.urls")),
    path("api/v1/", include("apps.expenses.urls")),
    path("api/v1/", include("apps.tasks.urls")),
    path("api/v1/", include("apps.milestones.urls")),
    path("api/v1/", include("apps.materials.urls")),
    path("api/v1/", include("apps.contractors.urls")),
    path("api/v1/", include("apps.projects.notification_urls")),
    # OpenAPI schema + interactive docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
