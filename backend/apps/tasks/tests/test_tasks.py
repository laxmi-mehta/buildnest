import pytest
from rest_framework import status
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.projects.models import Project
from apps.tasks.models import Task

LIST_URL = "/api/v1/tasks/"


def detail_url(pk):
    return f"/api/v1/tasks/{pk}/"


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
def task(project, db):
    return Task.objects.create(
        project=project,
        title="Lay foundation",
        priority=Task.Priority.HIGH,
        status=Task.Status.TODO,
    )


@pytest.mark.django_db
def test_list_requires_auth(api_client):
    res = api_client.get(LIST_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_list_own_tasks(auth_client, task):
    res = auth_client.get(LIST_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data["count"] == 1


@pytest.mark.django_db
def test_list_excludes_other_user_tasks(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Other", city="Mumbai")
    Task.objects.create(project=other_project, title="Private task")
    res = auth_client.get(LIST_URL)
    assert res.data["count"] == 0


@pytest.mark.django_db
def test_create_task(auth_client, project):
    payload = {
        "project": project.pk,
        "title": "Install electrical conduits",
        "priority": "high",
        "status": "todo",
        "due_date": "2026-08-15",
    }
    res = auth_client.post(LIST_URL, payload, format="json")
    assert res.status_code == status.HTTP_201_CREATED
    assert res.data["title"] == "Install electrical conduits"


@pytest.mark.django_db
def test_mark_task_done(auth_client, task):
    res = auth_client.patch(detail_url(task.pk), {"status": "done"}, format="json")
    assert res.status_code == status.HTTP_200_OK
    task.refresh_from_db()
    assert task.status == Task.Status.DONE


@pytest.mark.django_db
def test_delete_task(auth_client, task):
    res = auth_client.delete(detail_url(task.pk))
    assert res.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_cannot_access_other_user_task(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="X", city="Delhi")
    other_task = Task.objects.create(project=other_project, title="Secret")
    res = auth_client.get(detail_url(other_task.pk))
    assert res.status_code == status.HTTP_404_NOT_FOUND
