from django.contrib import admin
from .models import AccessRequest

# Branding
admin.site.site_header = "AccessFlow Administration"
admin.site.site_title = "AccessFlow Admin"
admin.site.index_title = "System Management"

admin.site.register(AccessRequest)


