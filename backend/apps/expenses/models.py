from django.db import models

from apps.projects.models import Project


class Expense(models.Model):
    class Category(models.TextChoices):
        MATERIALS = "materials", "Materials"
        LABOR = "labor", "Labour"
        DESIGN = "design", "Design & Architecture"
        PERMITS = "permits", "Permits & Approvals"
        EQUIPMENT = "equipment", "Equipment"
        MISC = "misc", "Miscellaneous"

    class PaymentMethod(models.TextChoices):
        CASH = "cash", "Cash"
        CHEQUE = "cheque", "Cheque"
        BANK_TRANSFER = "bank_transfer", "Bank Transfer"
        UPI = "upi", "UPI"

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="expenses")
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.MISC)
    description = models.CharField(max_length=300)
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    date = models.DateField()
    payee = models.CharField(max_length=200, blank=True)
    payment_method = models.CharField(
        max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.CASH
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date", "-created_at"]

    def __str__(self) -> str:
        return f"{self.description} — ₹{self.amount}"
