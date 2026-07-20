from django.db import models

from apps.projects.models import Project


class Contractor(models.Model):
    class Trade(models.TextChoices):
        ARCHITECT = "architect", "Architect"
        CIVIL_ENGINEER = "civil_engineer", "Civil Engineer"
        INTERIOR_DESIGNER = "interior_designer", "Interior Designer"
        ELECTRICIAN = "electrician", "Electrician"
        PLUMBER = "plumber", "Plumber"
        CARPENTER = "carpenter", "Carpenter"
        PAINTER = "painter", "Painter"
        MASON = "mason", "Mason"
        GENERAL = "general", "General Contractor"

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="contractors")
    name = models.CharField(max_length=200)
    trade = models.CharField(max_length=30, choices=Trade.choices, default=Trade.GENERAL)
    phone = models.CharField(max_length=15, blank=True)
    email = models.EmailField(blank=True)
    company = models.CharField(max_length=200, blank=True)
    contract_amount = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["trade", "name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.get_trade_display()})"
