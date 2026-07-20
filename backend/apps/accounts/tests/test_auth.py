import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

SIGNUP_URL = "/api/v1/auth/signup/"
LOGIN_URL = "/api/v1/auth/login/"
ME_URL = "/api/v1/auth/me/"

VALID = {"email": "priya@example.com", "full_name": "Priya Kumar", "password": "S3cure-pass!"}


@pytest.fixture
def client():
    return APIClient()


@pytest.mark.django_db
class TestSignup:
    def test_creates_user_and_returns_tokens(self, client):
        res = client.post(SIGNUP_URL, VALID, format="json")
        assert res.status_code == 201
        assert res.data["user"]["email"] == VALID["email"]
        assert res.data["access"] and res.data["refresh"]
        assert User.objects.filter(email=VALID["email"]).exists()

    def test_rejects_duplicate_email(self, client):
        User.objects.create_user(email=VALID["email"], password="x-9911-pass")
        res = client.post(SIGNUP_URL, VALID, format="json")
        assert res.status_code == 400
        assert "email" in res.data

    def test_rejects_weak_password(self, client):
        res = client.post(SIGNUP_URL, {**VALID, "password": "123"}, format="json")
        assert res.status_code == 400
        assert "password" in res.data

    def test_password_is_not_exposed(self, client):
        res = client.post(SIGNUP_URL, VALID, format="json")
        assert "password" not in res.data["user"]


@pytest.mark.django_db
class TestLogin:
    def test_returns_token_pair(self, client):
        User.objects.create_user(email=VALID["email"], password=VALID["password"])
        res = client.post(
            LOGIN_URL, {"email": VALID["email"], "password": VALID["password"]}, format="json"
        )
        assert res.status_code == 200
        assert res.data["access"] and res.data["refresh"]

    def test_rejects_wrong_password(self, client):
        User.objects.create_user(email=VALID["email"], password=VALID["password"])
        res = client.post(
            LOGIN_URL, {"email": VALID["email"], "password": "wrong-pass-1"}, format="json"
        )
        assert res.status_code == 401


@pytest.mark.django_db
class TestMe:
    def test_requires_auth(self, client):
        assert client.get(ME_URL).status_code == 401

    def test_returns_profile_with_bearer_token(self, client):
        signup = client.post(SIGNUP_URL, VALID, format="json")
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {signup.data['access']}")
        res = client.get(ME_URL)
        assert res.status_code == 200
        assert res.data["email"] == VALID["email"]
        assert res.data["full_name"] == VALID["full_name"]
