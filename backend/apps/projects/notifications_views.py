from datetime import date
from decimal import Decimal

from django.db.models import Sum
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.expenses.models import Expense
from apps.milestones.models import Milestone
from apps.tasks.models import Task

from .models import Project


class NotificationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        today = date.today()
        notifications = []

        for project in Project.objects.filter(owner=request.user):
            # Overdue tasks
            for task in Task.objects.filter(
                project=project,
                due_date__lt=today,
                status__in=["todo", "in_progress"],
            )[:5]:
                delta = (today - task.due_date).days
                notifications.append(
                    {
                        "id": f"task-overdue-{task.id}",
                        "kind": "task",
                        "title": f"Overdue: {task.title}",
                        "body": f"Due {delta} day{'s' if delta != 1 else ''} ago · {project.name}",
                        "created_at": task.due_date.isoformat() + "T00:00:00Z",
                        "read": False,
                    }
                )

            # Delayed milestones
            for m in Milestone.objects.filter(
                project=project,
                target_date__lt=today,
                status__in=["pending", "in_progress"],
            )[:3]:
                delta = (today - m.target_date).days
                notifications.append(
                    {
                        "id": f"milestone-delayed-{m.id}",
                        "kind": "milestone",
                        "title": f"Milestone delayed: {m.name}",
                        "body": f"Target date passed {delta} day{'s' if delta != 1 else ''} ago · {project.name}",
                        "created_at": m.target_date.isoformat() + "T00:00:00Z",
                        "read": False,
                    }
                )

            # Budget alerts
            if project.total_budget:
                spent = (
                    Expense.objects.filter(project=project).aggregate(total=Sum("amount"))["total"]
                    or Decimal("0")
                )
                if spent > project.total_budget:
                    notifications.append(
                        {
                            "id": f"budget-over-{project.id}",
                            "kind": "budget",
                            "title": "Project over budget",
                            "body": f"{project.name} has exceeded its budget",
                            "created_at": today.isoformat() + "T00:00:00Z",
                            "read": False,
                        }
                    )
                elif spent > project.total_budget * Decimal("0.8"):
                    notifications.append(
                        {
                            "id": f"budget-near-{project.id}",
                            "kind": "budget",
                            "title": "Budget at 80%+",
                            "body": f"{project.name} has used over 80% of its budget",
                            "created_at": today.isoformat() + "T00:00:00Z",
                            "read": False,
                        }
                    )

        notifications.sort(key=lambda x: x["created_at"], reverse=True)
        return Response(notifications)
