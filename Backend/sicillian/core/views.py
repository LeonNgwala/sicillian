from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import User, Institution, LearnerProfile, Opportunity, Application, Match, GapAlert
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    InstitutionSerializer, LearnerProfileSerializer,
    OpportunitySerializer, ApplicationSerializer, MatchSerializer, GapAlertSerializer
)
from .permissions import (
    IsLearner, IsEmployer, IsInstitution, IsSETA,
    IsEmployerOrSETA, IsInstitutionOrSETA, IsSETAOrReadOnlyForInstitution, IsOwnerOrSETA
)
from .auth_utils import generate_token


# ── Auth ──────────────────────────────────────────────────────────────────────

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = generate_token(user)
        return Response({
            'token': token,
            'user': UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = generate_token(user)
        return Response({
            'token': token,
            'user': UserSerializer(user).data,
        })


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


# ── Users ─────────────────────────────────────────────────────────────────────

class UserListCreate(generics.ListCreateAPIView):
    """List: SETA only. Create: handled via /auth/register/."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSETA]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """Own user or SETA."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrSETA]


# ── Institutions ──────────────────────────────────────────────────────────────

class InstitutionListCreate(generics.ListCreateAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsInstitution()]
        return [IsAuthenticated()]


class InstitutionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrSETA]


# ── LearnerProfiles ───────────────────────────────────────────────────────────

class LearnerProfileListCreate(generics.ListCreateAPIView):
    queryset = LearnerProfile.objects.all()
    serializer_class = LearnerProfileSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsLearner()]
        # Employers, Institutions, and SETAs can browse profiles
        return [IsAuthenticated()]


class LearnerProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LearnerProfile.objects.all()
    serializer_class = LearnerProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrSETA]


# ── Opportunities ─────────────────────────────────────────────────────────────

class OpportunityListCreate(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsEmployer()]
        return [IsAuthenticated()]


class OpportunityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [IsAuthenticated, IsOwnerOrSETA]


# ── Applications ──────────────────────────────────────────────────────────────

class ApplicationListCreate(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsLearner()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Learner':
            return Application.objects.filter(learner__user=user)
        if user.role == 'Employer':
            return Application.objects.filter(opportunity__employer=user)
        return Application.objects.all()


class ApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrSETA]


# ── Matches ───────────────────────────────────────────────────────────────────

class MatchListCreate(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsSETA()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Learner':
            return Match.objects.filter(learner__user=user)
        if user.role == 'Employer':
            return Match.objects.filter(opportunity__employer=user)
        return Match.objects.all()


class MatchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrSETA]


# ── GapAlerts ─────────────────────────────────────────────────────────────────

class GapAlertListCreate(generics.ListCreateAPIView):
    queryset = GapAlert.objects.all()
    serializer_class = GapAlertSerializer
    permission_classes = [IsSETAOrReadOnlyForInstitution]


class GapAlertDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GapAlert.objects.all()
    serializer_class = GapAlertSerializer
    permission_classes = [IsSETAOrReadOnlyForInstitution]
