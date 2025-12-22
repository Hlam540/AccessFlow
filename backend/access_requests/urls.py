from django.urls import path
from .views import AccessRequestListCreateView

urlpatterns = [
    path("access-requests/", AccessRequestListCreateView.as_view(), name="access-requests"),
]
