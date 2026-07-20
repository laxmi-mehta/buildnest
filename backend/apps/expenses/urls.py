from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("expenses", views.ExpenseViewSet, basename="expense")

urlpatterns = router.urls
