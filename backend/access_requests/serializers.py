from rest_framework import serializers
from .models import AccessRequest


class AccessRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessRequest
        fields = [
            "id",
            "requester",
            "resource_name",
            "reason",
            "requested_days",
            "status",
            "created_at",
            "decided_at",
        ]
        read_only_fields = ["id", "requester", "status", "created_at", "decided_at"]
