from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Photo
from .serializers import PhotoSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "post", "delete"]

    def get_queryset(self):
        qs = Photo.objects.filter(project__owner=self.request.user)
        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs

    def get_serializer_context(self):
        return {**super().get_serializer_context(), "request": self.request}
