from rest_framework import serializers

from .models import Contractor


class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = [
            "id",
            "project",
            "name",
            "trade",
            "phone",
            "email",
            "company",
            "contract_amount",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
