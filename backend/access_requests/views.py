from rest_framework import generics, permissions
from .models import AccessRequest
from .serializers import AccessRequestSerializer


class AccessRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = AccessRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AccessRequest.objects.filter(
            requester=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)
