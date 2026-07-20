import pytest
from rest_framework import status
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.contractors.models import Contractor
from apps.projects.models import Project

LIST_URL = "/api/v1/contractors/"


def detail_url(pk):
    return f"/api/v1/contractors/{pk}/"


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
def contractor(project, db):
    return Contractor.objects.create(
        project=project,
        name="Ramesh Kumar",
        trade=Contractor.Trade.MASON,
        phone="9876543210",
        contract_amount="180000.00",
    )


@pytest.mark.django_db
def test_list_requires_auth(api_client):
    res = api_client.get(LIST_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_list_own_contractors(auth_client, contractor):
    res = auth_client.get(LIST_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data["count"] == 1


@pytest.mark.django_db
def test_list_excludes_other_user_contractors(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Other", city="Goa")
    Contractor.objects.create(project=other_project, name="Private Person", trade="mason")
    res = auth_client.get(LIST_URL)
    assert res.data["count"] == 0


@pytest.mark.django_db
def test_create_contractor(auth_client, project):
    payload = {
        "project": project.pk,
        "name": "Suresh Electricals",
        "trade": "electrician",
        "phone": "9123456780",
        "company": "Suresh & Sons",
        "contract_amount": "95000.00",
    }
    res = auth_client.post(LIST_URL, payload, format="json")
    assert res.status_code == status.HTTP_201_CREATED
    assert res.data["name"] == "Suresh Electricals"
    assert res.data["trade"] == "electrician"


@pytest.mark.django_db
def test_update_contractor(auth_client, contractor):
    res = auth_client.patch(
        detail_url(contractor.pk),
        {"contract_amount": "200000.00"},
        format="json",
    )
    assert res.status_code == status.HTTP_200_OK
    contractor.refresh_from_db()
    assert float(contractor.contract_amount) == 200000.00


@pytest.mark.django_db
def test_delete_contractor(auth_client, contractor):
    res = auth_client.delete(detail_url(contractor.pk))
    assert res.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_cannot_access_other_user_contractor(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="X", city="Jaipur")
    other_c = Contractor.objects.create(project=other_project, name="Private", trade="painter")
    res = auth_client.get(detail_url(other_c.pk))
    assert res.status_code == status.HTTP_404_NOT_FOUND
