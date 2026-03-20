from django.urls import path
from .views import (
    # Auth
    LearnerRegisterView, OrgRegisterView, LoginView, MeView,
    # Org verification
    PendingOrganisationsView, ApproveOrganisationView, RejectOrganisationView,
    # Resources
    UserListView, UserDetailView,
    OrganisationListView, OrganisationDetailView,
    LearnerProfileListCreate, LearnerProfileDetail,
    OpportunityListCreate, OpportunityDetail,
    ApplicationListCreate, ApplicationDetail,
    MatchListCreate, MatchDetail,
    GapAlertListCreate, GapAlertDetail,
)

urlpatterns = [
    # ── Auth ──────────────────────────────────────────────────────────────────
    path('auth/register/learner/', LearnerRegisterView.as_view(), name='register-learner'),
    path('auth/register/organisation/', OrgRegisterView.as_view(), name='register-org'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/me/', MeView.as_view(), name='me'),

    # ── Organisation verification (SETA admin) ─────────────────────────────────
    path('admin/organisations/pending/', PendingOrganisationsView.as_view(), name='orgs-pending'),
    path('admin/organisations/<int:pk>/approve/', ApproveOrganisationView.as_view(), name='org-approve'),
    path('admin/organisations/<int:pk>/reject/', RejectOrganisationView.as_view(), name='org-reject'),

    # ── Resources ──────────────────────────────────────────────────────────────
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),

    path('organisations/', OrganisationListView.as_view(), name='org-list'),
    path('organisations/<int:pk>/', OrganisationDetailView.as_view(), name='org-detail'),

    path('learner-profiles/', LearnerProfileListCreate.as_view(), name='learner-profile-list'),
    path('learner-profiles/<int:pk>/', LearnerProfileDetail.as_view(), name='learner-profile-detail'),

    path('opportunities/', OpportunityListCreate.as_view(), name='opportunity-list'),
    path('opportunities/<int:pk>/', OpportunityDetail.as_view(), name='opportunity-detail'),

    path('applications/', ApplicationListCreate.as_view(), name='application-list'),
    path('applications/<int:pk>/', ApplicationDetail.as_view(), name='application-detail'),

    path('matches/', MatchListCreate.as_view(), name='match-list'),
    path('matches/<int:pk>/', MatchDetail.as_view(), name='match-detail'),

    path('gap-alerts/', GapAlertListCreate.as_view(), name='gap-alert-list'),
    path('gap-alerts/<int:pk>/', GapAlertDetail.as_view(), name='gap-alert-detail'),
]
