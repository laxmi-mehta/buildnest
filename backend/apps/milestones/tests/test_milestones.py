import pytest
from rest_framework import status
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.milestones.models import Milestone
from apps.projects.models import Project

LIST_URL = "/api/v1/milestones/"


def detail_url(pk):
    return f"/api/v1/milestones/{pk}/"


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
def milestone(project, db):
    return Milestone.objects.create(
        project=project,
        name="Foundation complete",
        target_date="2026-09-01",
        status=Milestone.Status.PENDING,
    )


@pytest.mark.django_db
def test_list_requires_auth(api_client):
    res = api_client.get(LIST_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_list_own_milestones(auth_client, milestone):
    res = auth_client.get(LIST_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data["count"] == 1


@pytest.mark.django_db
def test_list_excludes_other_user_milestones(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Other", city="Pune")
    Milestone.objects.create(project=other_project, name="Private milestone")
    res = auth_client.get(LIST_URL)
    assert res.data["count"] == 0


@pytest.mark.django_db
def test_create_milestone(auth_client, project):
    payload = {
        "project": project.pk,
        "name": "Slab casting done",
        "target_date": "2026-10-01",
        "status": "pending",
    }
    res = auth_client.post(LIST_URL, payload, format="json")
    assert res.status_code == status.HTTP_201_CREATED
    assert res.data["name"] == "Slab casting done"


@pytest.mark.django_db
def test_complete_milestone(auth_client, milestone):
    res = auth_client.patch(
        detail_url(milestone.pk),
        {"status": "completed", "completed_date": "2026-08-28"},
        format="json",
    )
    assert res.status_code == status.HTTP_200_OK
    milestone.refresh_from_db()
    assert milestone.status == Milestone.Status.COMPLETED


@pytest.mark.django_db
def test_delete_milestone(auth_client, milestone):
    res = auth_client.delete(detail_url(milestone.pk))
    assert res.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_cannot_access_other_user_milestone(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="X", city="Kolkata")
    other_ms = Milestone.objects.create(project=other_project, name="Secret")
    res = auth_client.get(detail_url(other_ms.pk))
    assert res.status_code == status.HTTP_404_NOT_FOUND
