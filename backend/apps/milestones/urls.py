from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("milestones", views.MilestoneViewSet, basename="milestone")

urlpatterns = router.urls
