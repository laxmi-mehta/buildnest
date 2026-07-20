from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["name", "owner", "city", "status", "total_budget", "created_at"]
    list_filter = ["status", "city"]
    search_fields = ["name", "owner__email", "address"]
    readonly_fields = ["created_at", "updated_at"]
