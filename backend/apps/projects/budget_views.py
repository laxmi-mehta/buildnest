from decimal import Decimal

from django.db.models import Sum
from django.db.models.functions import TruncMonth
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.expenses.models import Expense

from .models import Project


class ProjectBudgetView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, project_pk):
        try:
            project = Project.objects.get(pk=project_pk, owner=request.user)
        except Project.DoesNotExist:
            raise NotFound()

        expenses = Expense.objects.filter(project=project)
        spent_total = expenses.aggregate(total=Sum("amount"))["total"] or Decimal("0")
        total_budget = project.total_budget or Decimal("0")

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

        monthly_qs = (
            expenses.annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(spent=Sum("amount"))
            .order_by("month")
        )

        cumulative = Decimal("0")
        monthly_spend = []
        for row in monthly_qs:
            cumulative += row["spent"]
            monthly_spend.append(
                {
                    "year": row["month"].year,
                    "month": row["month"].month,
                    "spent": row["spent"],
                    "cumulative": cumulative,
                }
            )

        return Response(
            {
                "total_budget": total_budget,
                "spent_to_date": spent_total,
                "remaining": total_budget - spent_total,
                "by_category": by_category,
                "monthly_spend": monthly_spend,
            }
        )
