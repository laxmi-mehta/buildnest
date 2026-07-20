from django.contrib import admin

from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ["description", "project", "category", "amount", "date", "payee"]
    list_filter = ["category", "payment_method"]
    search_fields = ["description", "payee", "project__name"]
    readonly_fields = ["created_at", "updated_at"]
