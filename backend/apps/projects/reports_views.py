from decimal import Decimal

from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.expenses.models import Expense
from apps.tasks.models import Task

from .models import Project

MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]


class ProjectReportsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, project_pk):
        try:
            project = Project.objects.get(pk=project_pk, owner=request.user)
        except Project.DoesNotExist:
            raise NotFound()

        monthly_expenses = (
            Expense.objects.filter(project=project)
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total_spend=Sum("amount"), expense_count=Count("id"))
            .order_by("month")
        )

        monthly_tasks = (
            Task.objects.filter(project=project, status="done", completed_at__isnull=False)
            .annotate(month=TruncMonth("completed_at"))
            .values("month")
            .annotate(tasks_completed=Count("id"))
        )
        task_map = {row["month"]: row["tasks_completed"] for row in monthly_tasks}

        summaries = []
        prev_spend = None
        for row in monthly_expenses:
            spend = row["total_spend"] or Decimal("0")
            delta_pct = None
            if prev_spend is not None and prev_spend > 0:
                delta_pct = round(float((spend - prev_spend) / prev_spend * 100), 1)

            month_date = row["month"]
            summaries.append(
                {
                    "year": month_date.year,
                    "month": month_date.month,
                    "label": f"{MONTH_NAMES[month_date.month - 1]} {month_date.year}",
                    "total_spend": spend,
                    "expense_count": row["expense_count"],
                    "tasks_completed": task_map.get(month_date, 0),
                    "delta_pct": delta_pct,
                }
            )
            prev_spend = spend

        return Response({"monthly_summaries": summaries})
