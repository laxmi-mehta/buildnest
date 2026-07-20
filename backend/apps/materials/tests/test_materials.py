import pytest
from rest_framework import status
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.materials.models import Material
from apps.projects.models import Project

LIST_URL = "/api/v1/materials/"


def detail_url(pk):
    return f"/api/v1/materials/{pk}/"


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
def material(project, db):
    return Material.objects.create(
        project=project,
        name="OPC Cement 53 Grade",
        category=Material.Category.CEMENT,
        quantity="200.000",
        unit=Material.Unit.BAGS,
        unit_cost="420.00",
        vendor="ACC Cement Depot",
    )


@pytest.mark.django_db
def test_list_requires_auth(api_client):
    res = api_client.get(LIST_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_list_own_materials(auth_client, material):
    res = auth_client.get(LIST_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data["count"] == 1


@pytest.mark.django_db
def test_total_cost_computed(auth_client, material):
    res = auth_client.get(detail_url(material.pk))
    assert res.status_code == status.HTTP_200_OK
    assert float(res.data["total_cost"]) == 200 * 420


@pytest.mark.django_db
def test_list_excludes_other_user_materials(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="Other", city="Chennai")
    Material.objects.create(
        project=other_project, name="Steel", category="steel",
        quantity="5", unit="tons", unit_cost="60000",
    )
    res = auth_client.get(LIST_URL)
    assert res.data["count"] == 0


@pytest.mark.django_db
def test_create_material(auth_client, project):
    payload = {
        "project": project.pk,
        "name": "Red Clay Bricks",
        "category": "bricks",
        "quantity": "5000.000",
        "unit": "nos",
        "unit_cost": "8.50",
    }
    res = auth_client.post(LIST_URL, payload, format="json")
    assert res.status_code == status.HTTP_201_CREATED
    assert res.data["name"] == "Red Clay Bricks"
    assert float(res.data["total_cost"]) == 5000 * 8.5


@pytest.mark.django_db
def test_update_delivery_status(auth_client, material):
    res = auth_client.patch(
        detail_url(material.pk),
        {"delivery_status": "delivered", "delivered_date": "2026-07-15"},
        format="json",
    )
    assert res.status_code == status.HTTP_200_OK
    material.refresh_from_db()
    assert material.delivery_status == Material.DeliveryStatus.DELIVERED


@pytest.mark.django_db
def test_delete_material(auth_client, material):
    res = auth_client.delete(detail_url(material.pk))
    assert res.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_cannot_access_other_user_material(auth_client, other_user):
    other_project = Project.objects.create(owner=other_user, name="X", city="Hyderabad")
    other_mat = Material.objects.create(
        project=other_project, name="Private", category="misc",
        quantity="1", unit="nos", unit_cost="100",
    )
    res = auth_client.get(detail_url(other_mat.pk))
    assert res.status_code == status.HTTP_404_NOT_FOUND
