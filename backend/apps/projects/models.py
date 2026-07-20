from django.conf import settings
from django.db import models


class Project(models.Model):
    class Status(models.TextChoices):
        PLANNING = "planning", "Planning"
        ACTIVE = "active", "Active"
        ON_HOLD = "on_hold", "On Hold"
        COMPLETED = "completed", "Completed"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects",
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=500, blank=True)
    city = models.CharField(max_length=100, default="Bengaluru")

    # Area in square feet
    plot_area_sqft = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    built_area_sqft = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_floors = models.PositiveSmallIntegerField(default=1)

    # Budget in INR (paise-level precision not needed; 2 decimal places suffice)
    total_budget = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PLANNING)
    start_date = models.DateField(null=True, blank=True)
    expected_end_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.owner})"
