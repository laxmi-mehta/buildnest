from django.contrib import admin

from .models import Milestone


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ["name", "project", "status", "target_date", "completed_date"]
    list_filter = ["status"]
    search_fields = ["name", "project__name"]
    readonly_fields = ["created_at", "updated_at"]
