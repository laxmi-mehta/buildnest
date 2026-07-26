from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.expenses.models import Expense
from apps.milestones.models import Milestone

from .models import Project


class ProjectTimelineView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, project_pk):
        try:
            project = Project.objects.get(pk=project_pk, owner=request.user)
        except Project.DoesNotExist:
            raise NotFound()

        milestones = list(
            Milestone.objects.filter(project=project).order_by("target_date", "-created_at")
        )
        expenses = Expense.objects.filter(project=project).order_by("-date")[:50]

        total = len(milestones)
        completed_count = sum(1 for m in milestones if m.status == "completed")
        overall_progress = round((completed_count / total * 100) if total else 0)

        # Phases = milestones in target_date order
        phases = [
            {
                "id": m.id,
                "label": m.name,
                "description": m.description or "",
                "status": m.status,
                "target_date": str(m.target_date) if m.target_date else None,
                "completed_date": str(m.completed_date) if m.completed_date else None,
            }
            for m in milestones
        ]

        # Current phase index = first non-completed milestone
        current_phase_index = 0
        for i, m in enumerate(milestones):
            if m.status != "completed":
                current_phase_index = i
                break
        else:
            current_phase_index = max(0, total - 1)

        # History = completed milestones + recent expenses, merged and sorted by date
        history = []
        for m in milestones:
            if m.status == "completed" and (m.completed_date or m.target_date):
                d = m.completed_date or m.target_date
                history.append(
                    {
                        "id": f"milestone-{m.id}",
                        "type": "milestone",
                        "title": m.name,
                        "description": m.description or "Milestone completed",
                        "date": str(d),
                        "category": "milestone",
                    }
                )
        for e in expenses:
            history.append(
                {
                    "id": f"expense-{e.id}",
                    "type": "expense",
                    "title": e.description,
                    "description": f"₹{int(e.amount):,} in {e.get_category_display()}",
                    "date": str(e.date),
                    "category": "expense",
                }
            )

        history.sort(key=lambda x: x["date"], reverse=True)

        return Response(
            {
                "phases": phases,
                "current_phase_index": current_phase_index,
                "overall_progress": overall_progress,
                "history": history[:40],
            }
        )
