from rest_framework import serializers
from .models import AccessRequest


class AccessRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessRequest
        fields = [
            "id",
            "requester",
            "approved_by",
            "resource_name",
            "reason",
            "requested_days",
            "status",
            "decision_note",
            "created_at",
            "decided_at",
        ]
        read_only_fields = [
            "id",
            "requester",
            "approved_by",
            "status",
            "created_at",
            "decided_at",
        ]
