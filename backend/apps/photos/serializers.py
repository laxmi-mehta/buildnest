from rest_framework import serializers

from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ["id", "project", "caption", "file", "file_url", "file_size", "uploaded_at"]
        read_only_fields = ["id", "file_url", "file_size", "uploaded_at"]
        extra_kwargs = {"file": {"write_only": True}}

    def get_file_url(self, obj):
        request = self.context.get("request")
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None
