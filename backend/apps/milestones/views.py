from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Milestone
from .serializers import MilestoneSerializer


class MilestoneViewSet(viewsets.ModelViewSet):
    serializer_class = MilestoneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Milestone.objects.filter(project__owner=self.request.user)
        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs
