from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .budget_views import ProjectBudgetView

router = DefaultRouter()
router.register("projects", views.ProjectViewSet, basename="project")

urlpatterns = router.urls + [
    path("projects/<int:project_pk>/budget/", ProjectBudgetView.as_view(), name="project-budget"),
]
