from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Contractor
from .serializers import ContractorSerializer


class ContractorViewSet(viewsets.ModelViewSet):
    serializer_class = ContractorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Contractor.objects.filter(project__owner=self.request.user)
        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs
