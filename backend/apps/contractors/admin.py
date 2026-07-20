from django.contrib import admin

from .models import Contractor


@admin.register(Contractor)
class ContractorAdmin(admin.ModelAdmin):
    list_display = ["name", "project", "trade", "phone", "company", "contract_amount"]
    list_filter = ["trade"]
    search_fields = ["name", "company", "project__name"]
    readonly_fields = ["created_at", "updated_at"]
