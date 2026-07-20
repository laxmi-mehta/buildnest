import pytest
from rest_framework import status
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.expenses.models import Expense
from apps.projects.models import Project

LIST_URL = "/api/v1/expenses/"


def detail_url(pk):
    return f"/api/v1/expenses/{pk}/"


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user(db):
    return User.objects.create_user(email="arjun@example.com", password="strongpass1")


@pytest.fixture
def other_user(db):
    return User.objects.create_user(email="priya@example.com", password="strongpass1")


@pytest.fixture
def auth_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def project(user, db):
    return Project.objects.create(owner=user, name="Mehta Residence", city="Bengaluru")


@pytest.fixture
def expense(project, db):
    return Expense.objects.create(
        project=project,
        category=Expense.Category.MATERIALS,
        description="Sand and aggregate",
        amount="45000.00",
        date="2026-07-01",
        payee="Suresh Traders",
    )


@pytest.mark.django_db
def test_list_requires_auth(api_client):
    res = api_client.get(LIST_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_list_own_expenses(auth_client, expense):
    res = auth_client.get(LIST_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data["count"] == 1


@pytest.mark.django_db
def test_list_excludes_other_user_expenses(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Other", city="Mumbai")
    Expense.objects.create(
        project=other_project,
        description="Private",
        amount="10000",
        date="2026-07-01",
    )
    res = auth_client.get(LIST_URL)
    assert res.data["count"] == 0


@pytest.mark.django_db
def test_filter_by_project(auth_client, user, project, expense):
    other_project = Project.objects.create(owner=user, name="Other Site", city="Pune")
    Expense.objects.create(
        project=other_project, description="Paint", amount="5000", date="2026-07-02"
    )
    res = auth_client.get(LIST_URL, {"project": project.pk})
    assert res.data["count"] == 1
    assert res.data["results"][0]["description"] == "Sand and aggregate"


@pytest.mark.django_db
def test_create_expense(auth_client, project):
    payload = {
        "project": project.pk,
        "category": "labor",
        "description": "Mason wages",
        "amount": "25000.00",
        "date": "2026-07-10",
        "payment_method": "upi",
    }
    res = auth_client.post(LIST_URL, payload, format="json")
    assert res.status_code == status.HTTP_201_CREATED
    assert res.data["description"] == "Mason wages"


@pytest.mark.django_db
def test_create_requires_amount(auth_client, project):
    res = auth_client.post(
        LIST_URL,
        {"project": project.pk, "description": "Test", "date": "2026-07-01"},
        format="json",
    )
    assert res.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_partial_update_expense(auth_client, expense):
    res = auth_client.patch(detail_url(expense.pk), {"amount": "50000.00"}, format="json")
    assert res.status_code == status.HTTP_200_OK
    expense.refresh_from_db()
    assert float(expense.amount) == 50000.00


@pytest.mark.django_db
def test_delete_expense(auth_client, expense):
    res = auth_client.delete(detail_url(expense.pk))
    assert res.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_cannot_access_other_user_expense(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="X", city="Delhi")
    other_expense = Expense.objects.create(
        project=other_project, description="Private", amount="1000", date="2026-07-01"
    )
    res = auth_client.get(detail_url(other_expense.pk))
    assert res.status_code == status.HTTP_404_NOT_FOUND
