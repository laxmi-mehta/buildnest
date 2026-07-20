from rest_framework import serializers

from .models import Material


class MaterialSerializer(serializers.ModelSerializer):
    total_cost = serializers.ReadOnlyField()

    class Meta:
        model = Material
        fields = [
            "id",
            "project",
            "name",
            "category",
            "quantity",
            "unit",
            "unit_cost",
            "total_cost",
            "vendor",
            "delivery_status",
            "ordered_date",
            "delivered_date",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "total_cost", "created_at", "updated_at"]
