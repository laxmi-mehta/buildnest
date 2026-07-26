from decimal import Decimal

from django.db.models import Count, Sum
from django.db.models.functions import TruncWeek
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.expenses.models import Expense
from apps.tasks.models import Task

from .models import Project


class ProjectAnalyticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, project_pk):
        try:
            project = Project.objects.get(pk=project_pk, owner=request.user)
        except Project.DoesNotExist:
            raise NotFound()

        expenses = Expense.objects.filter(project=project)
        tasks = Task.objects.filter(project=project)

        total_spend = expenses.aggregate(total=Sum("amount"))["total"] or Decimal("0")
        total_tasks = tasks.count()
        completed_tasks = tasks.filter(status="done").count()
        task_completion_rate = round((completed_tasks / total_tasks * 100) if total_tasks else 0)

        # Weekly spend — last 8 weeks with data
        weekly_spend_qs = (
            expenses.annotate(week=TruncWeek("date"))
            .values("week")
            .annotate(spent=Sum("amount"))
            .order_by("week")
        )
        weekly_spend_rows = list(weekly_spend_qs)[-8:]
        avg_weekly = (
            sum(r["spent"] for r in weekly_spend_rows) / len(weekly_spend_rows)
            if weekly_spend_rows
            else Decimal("0")
        )

        # Category breakdown
        by_category = []
        for choice_value, choice_label in Expense.Category.choices:
            cat_spent = (
                expenses.filter(category=choice_value).aggregate(total=Sum("amount"))["total"]
                or Decimal("0")
            )
            if cat_spent > 0:
                by_category.append(
                    {"category": choice_value, "label": choice_label, "spent": cat_spent}
                )

        # Contractor spend (by payee)
        contractor_spend = list(
            expenses.exclude(payee="")
            .values("payee")
            .annotate(spent=Sum("amount"))
            .order_by("-spent")[:8]
        )

        # Task throughput — created vs completed per week, last 8 weeks
        created_qs = (
            tasks.annotate(week=TruncWeek("created_at"))
            .values("week")
            .annotate(created=Count("id"))
        )
        completed_qs = (
            tasks.filter(status="done", completed_at__isnull=False)
            .annotate(week=TruncWeek("completed_at"))
            .values("week")
            .annotate(completed=Count("id"))
        )
        created_map = {r["week"]: r["created"] for r in created_qs}
        completed_map = {r["week"]: r["completed"] for r in completed_qs}
        all_weeks = sorted(set(list(created_map) + list(completed_map)))
        task_throughput_rows = [
            {"week": w, "created": created_map.get(w, 0), "completed": completed_map.get(w, 0)}
            for w in all_weeks
        ][-8:]

        def week_label(dt):
            return f"{dt.strftime('%b')} {dt.day}"

        return Response(
            {
                "insights": {
                    "total_spend": total_spend,
                    "avg_weekly_spend": avg_weekly,
                    "task_completion_rate_pct": task_completion_rate,
                    "total_tasks": total_tasks,
                    "completed_tasks": completed_tasks,
                },
                "weekly_spend": [
                    {"week": week_label(r["week"]), "spent": r["spent"]}
                    for r in weekly_spend_rows
                ],
                "category_breakdown": by_category,
                "contractor_spend": [
                    {"payee": r["payee"], "spent": r["spent"]} for r in contractor_spend
                ],
                "task_throughput": [
                    {
                        "week": week_label(r["week"]),
                        "created": r["created"],
                        "completed": r["completed"],
                    }
                    for r in task_throughput_rows
                ],
            }
        )
