from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("contractors", views.ContractorViewSet, basename="contractor")

urlpatterns = router.urls
