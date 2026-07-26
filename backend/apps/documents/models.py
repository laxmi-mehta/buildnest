from django.db import models

from apps.projects.models import Project


class Document(models.Model):
    class Category(models.TextChoices):
        PERMIT = "permit", "Permit"
        CONTRACT = "contract", "Contract"
        INVOICE = "invoice", "Invoice"
        PLAN = "plan", "Plan"
        REPORT = "report", "Report"
        OTHER = "other", "Other"

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="documents")
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)
    file = models.FileField(upload_to="documents/%Y/%m/")
    file_size = models.PositiveIntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def save(self, *args, **kwargs):
        if self.file and not self.file_size:
            self.file_size = self.file.size
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
