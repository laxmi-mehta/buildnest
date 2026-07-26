from django.db import models

from apps.projects.models import Project


class Photo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="photos")
    caption = models.CharField(max_length=300, blank=True)
    file = models.FileField(upload_to="photos/%Y/%m/")
    file_size = models.PositiveIntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def save(self, *args, **kwargs):
        if self.file and not self.file_size:
            self.file_size = self.file.size
        super().save(*args, **kwargs)

    def __str__(self):
        return self.caption or f"Photo {self.id}"
