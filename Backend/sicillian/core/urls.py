from django.urls import path
from .views import (
    RegisterView, LoginView, MeView,
    UserListCreate, UserDetail,
    InstitutionListCreate, InstitutionDetail,
    LearnerProfileListCreate, LearnerProfileDetail,
    OpportunityListCreate, OpportunityDetail,
    ApplicationListCreate, ApplicationDetail,
    MatchListCreate, MatchDetail,
    GapAlertListCreate, GapAlertDetail,
)

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/me/', MeView.as_view(), name='me'),

    # Users (SETA admin)
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    # Institutions
    path('institutions/', InstitutionListCreate.as_view(), name='institution-list-create'),
    path('institutions/<int:pk>/', InstitutionDetail.as_view(), name='institution-detail'),

    # LearnerProfiles
    path('learner-profiles/', LearnerProfileListCreate.as_view(), name='learner-profile-list-create'),
    path('learner-profiles/<int:pk>/', LearnerProfileDetail.as_view(), name='learner-profile-detail'),

    # Opportunities
    path('opportunities/', OpportunityListCreate.as_view(), name='opportunity-list-create'),
    path('opportunities/<int:pk>/', OpportunityDetail.as_view(), name='opportunity-detail'),

    # Applications
    path('applications/', ApplicationListCreate.as_view(), name='application-list-create'),
    path('applications/<int:pk>/', ApplicationDetail.as_view(), name='application-detail'),

    # Matches
    path('matches/', MatchListCreate.as_view(), name='match-list-create'),
    path('matches/<int:pk>/', MatchDetail.as_view(), name='match-detail'),

    # GapAlerts
    path('gap-alerts/', GapAlertListCreate.as_view(), name='gap-alert-list-create'),
    path('gap-alerts/<int:pk>/', GapAlertDetail.as_view(), name='gap-alert-detail'),
]
