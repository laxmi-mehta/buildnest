import pytest
from rest_framework import status
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.projects.models import Project

LIST_URL = "/api/v1/projects/"


def detail_url(pk):
    return f"/api/v1/projects/{pk}/"


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
    return Project.objects.create(
        owner=user,
        name="Mehta Residence",
        city="Bengaluru",
        status=Project.Status.PLANNING,
        total_budget="4800000.00",
    )


# ── Auth guard ────────────────────────────────────────────────────

@pytest.mark.django_db
def test_list_requires_auth(api_client):
    res = api_client.get(LIST_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_create_requires_auth(api_client):
    res = api_client.post(LIST_URL, {"name": "Test", "city": "Pune"})
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


# ── List ─────────────────────────────────────────────────────────

@pytest.mark.django_db
def test_list_returns_own_projects(auth_client, user, other_user, project):
    Project.objects.create(owner=other_user, name="Other Bungalow", city="Mumbai")
    res = auth_client.get(LIST_URL)
    assert res.status_code == status.HTTP_200_OK
    names = [p["name"] for p in res.data["results"]]
    assert "Mehta Residence" in names
    assert "Other Bungalow" not in names


@pytest.mark.django_db
def test_list_empty_for_new_user(auth_client):
    res = auth_client.get(LIST_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data["count"] == 0


# ── Create ───────────────────────────────────────────────────────

@pytest.mark.django_db
def test_create_project(auth_client):
    payload = {
        "name": "Sharma Villa",
        "city": "Bengaluru",
        "address": "12 MG Road, Indiranagar",
        "total_budget": "7500000.00",
        "total_floors": 2,
        "status": "planning",
    }
    res = auth_client.post(LIST_URL, payload, format="json")
    assert res.status_code == status.HTTP_201_CREATED
    assert res.data["name"] == "Sharma Villa"
    assert res.data["city"] == "Bengaluru"
    assert "owner" not in res.data  # hidden field must not leak


@pytest.mark.django_db
def test_create_sets_owner_to_current_user(auth_client, user):
    payload = {"name": "Flat Renovation", "city": "Hyderabad"}
    res = auth_client.post(LIST_URL, payload, format="json")
    assert res.status_code == status.HTTP_201_CREATED
    project = Project.objects.get(pk=res.data["id"])
    assert project.owner == user


@pytest.mark.django_db
def test_create_requires_name(auth_client):
    res = auth_client.post(LIST_URL, {"city": "Chennai"}, format="json")
    assert res.status_code == status.HTTP_400_BAD_REQUEST
    assert "name" in res.data


# ── Retrieve ─────────────────────────────────────────────────────

@pytest.mark.django_db
def test_retrieve_own_project(auth_client, project):
    res = auth_client.get(detail_url(project.pk))
    assert res.status_code == status.HTTP_200_OK
    assert res.data["name"] == "Mehta Residence"


@pytest.mark.django_db
def test_retrieve_other_user_project_returns_404(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Private Villa", city="Goa")
    res = auth_client.get(detail_url(other_project.pk))
    assert res.status_code == status.HTTP_404_NOT_FOUND


# ── Update ───────────────────────────────────────────────────────

@pytest.mark.django_db
def test_partial_update_project(auth_client, project):
    res = auth_client.patch(detail_url(project.pk), {"status": "active"}, format="json")
    assert res.status_code == status.HTTP_200_OK
    project.refresh_from_db()
    assert project.status == Project.Status.ACTIVE


@pytest.mark.django_db
def test_cannot_update_other_user_project(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Other Project", city="Pune")
    res = auth_client.patch(detail_url(other_project.pk), {"name": "Hacked"}, format="json")
    assert res.status_code == status.HTTP_404_NOT_FOUND


# ── Delete ───────────────────────────────────────────────────────

@pytest.mark.django_db
def test_delete_own_project(auth_client, project):
    res = auth_client.delete(detail_url(project.pk))
    assert res.status_code == status.HTTP_204_NO_CONTENT
    assert not Project.objects.filter(pk=project.pk).exists()


@pytest.mark.django_db
def test_cannot_delete_other_user_project(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Someone Else", city="Kolkata")
    res = auth_client.delete(detail_url(other_project.pk))
    assert res.status_code == status.HTTP_404_NOT_FOUND
    assert Project.objects.filter(pk=other_project.pk).exists()
