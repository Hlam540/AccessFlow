from django.urls import path
from .views import (
    AccessRequestListCreateView,
    ApproveAccessRequestView,
    DenyAccessRequestView,
)

urlpatterns = [
    path("access-requests/", AccessRequestListCreateView.as_view(), name="access-requests"),
    path("access-requests/<int:pk>/approve/", ApproveAccessRequestView.as_view(), name="approve-access-request"),
    path("access-requests/<int:pk>/deny/", DenyAccessRequestView.as_view(), name="deny-access-request"),
]
