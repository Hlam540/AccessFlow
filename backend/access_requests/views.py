from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AccessRequest
from .serializers import AccessRequestSerializer


class AccessRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = AccessRequestSerializer

    # TEMPORARY so the React app can submit requests without auth
    # (we will switch this back to IsAuthenticated once login is added)
    permission_classes = [permissions.AllowAny]

    def get_view_name(self):
        return "Access Requests"

    def get_queryset(self):
        user = self.request.user
        qs = AccessRequest.objects.all().order_by("-created_at")

        # Managers / staff see all requests
        if user.is_staff:
            return qs

        # Regular users only see their own
        return qs.filter(requester=user)

    def perform_create(self, serializer):
        # If the user is logged in, attach requester
        if self.request.user.is_authenticated:
            serializer.save(requester=self.request.user)
        else:
            # For now, allow unauthenticated (temporary)
            serializer.save(requester=None)


class ApproveAccessRequestView(APIView):
    # Must remain STAFF ONLY
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        ar = get_object_or_404(AccessRequest, pk=pk)

        if ar.requester == request.user:
            return Response(
                {"detail": "You cannot approve your own request."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if ar.status != AccessRequest.Status.PENDING:
            return Response(
                {"detail": "Only pending requests can be approved."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ar.status = AccessRequest.Status.APPROVED
        ar.decided_at = timezone.now()
        ar.save()

        return Response(AccessRequestSerializer(ar).data, status=status.HTTP_200_OK)


class DenyAccessRequestView(APIView):
    # Must remain STAFF ONLY
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        ar = get_object_or_404(AccessRequest, pk=pk)

        if ar.requester == request.user:
            return Response(
                {"detail": "You cannot deny your own request."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if ar.status != AccessRequest.Status.PENDING:
            return Response(
                {"detail": "Only pending requests can be denied."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ar.status = AccessRequest.Status.DENIED
        ar.decided_at = timezone.now()
        ar.save()

        return Response(AccessRequestSerializer(ar).data, status=status.HTTP_200_OK)
