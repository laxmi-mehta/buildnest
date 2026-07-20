from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Project
        fields = [
            "id",
            "owner",
            "name",
            "description",
            "address",
            "city",
            "plot_area_sqft",
            "built_area_sqft",
            "total_floors",
            "total_budget",
            "status",
            "start_date",
            "expected_end_date",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ProjectListSerializer(serializers.ModelSerializer):
    """Lighter serializer used for list responses."""

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "city",
            "status",
            "total_budget",
            "start_date",
            "expected_end_date",
            "created_at",
        ]
