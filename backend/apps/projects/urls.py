from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .analytics_views import ProjectAnalyticsView
from .budget_views import ProjectBudgetView
from .reports_views import ProjectReportsView
from .timeline_views import ProjectTimelineView

router = DefaultRouter()
router.register("projects", views.ProjectViewSet, basename="project")

urlpatterns = router.urls + [
    path("projects/<int:project_pk>/budget/", ProjectBudgetView.as_view(), name="project-budget"),
    path("projects/<int:project_pk>/analytics/", ProjectAnalyticsView.as_view(), name="project-analytics"),
    path("projects/<int:project_pk>/timeline/", ProjectTimelineView.as_view(), name="project-timeline"),
    path("projects/<int:project_pk>/reports/", ProjectReportsView.as_view(), name="project-reports"),
]
