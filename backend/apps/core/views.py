"""Infrastructure endpoints only — no business logic lives here."""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    """Liveness probe for load balancers, Docker healthchecks and CI."""
    return Response({"status": "ok", "service": "buildnest-api"})
