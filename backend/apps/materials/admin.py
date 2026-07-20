from django.contrib import admin

from .models import Material


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ["name", "project", "category", "quantity", "unit", "unit_cost", "delivery_status"]  # noqa: E501
    list_filter = ["category", "delivery_status"]
    search_fields = ["name", "vendor", "project__name"]
    readonly_fields = ["created_at", "updated_at"]
