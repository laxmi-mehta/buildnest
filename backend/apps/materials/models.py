from django.db import models

from apps.projects.models import Project


class Material(models.Model):
    class Category(models.TextChoices):
        CEMENT = "cement", "Cement"
        STEEL = "steel", "Steel"
        BRICKS = "bricks", "Bricks & Blocks"
        SAND = "sand", "Sand & Aggregate"
        TILES = "tiles", "Tiles & Flooring"
        WOOD = "wood", "Wood & Timber"
        ELECTRICAL = "electrical", "Electrical"
        PLUMBING = "plumbing", "Plumbing"
        PAINT = "paint", "Paint & Finishing"
        MISC = "misc", "Miscellaneous"

    class Unit(models.TextChoices):
        BAGS = "bags", "Bags"
        KG = "kg", "Kg"
        TONS = "tons", "Tons"
        SQFT = "sqft", "Sq. Ft."
        NOS = "nos", "Nos."
        METERS = "meters", "Meters"
        LITERS = "liters", "Liters"
        CFT = "cft", "Cu. Ft."

    class DeliveryStatus(models.TextChoices):
        REQUIRED = "required", "Required"
        ORDERED = "ordered", "Ordered"
        DELIVERED = "delivered", "Delivered"
        INSTALLED = "installed", "Installed"

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="materials")
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.MISC)
    quantity = models.DecimalField(max_digits=12, decimal_places=3)
    unit = models.CharField(max_length=10, choices=Unit.choices, default=Unit.NOS)
    unit_cost = models.DecimalField(max_digits=14, decimal_places=2)
    vendor = models.CharField(max_length=200, blank=True)
    delivery_status = models.CharField(
        max_length=20, choices=DeliveryStatus.choices, default=DeliveryStatus.REQUIRED
    )
    ordered_date = models.DateField(null=True, blank=True)
    delivered_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category", "name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.quantity} {self.unit})"

    @property
    def total_cost(self) -> float:
        return float(self.quantity * self.unit_cost)
