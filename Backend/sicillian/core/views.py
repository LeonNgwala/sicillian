from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import User, OrganisationProfile, LearnerProfile, Opportunity, Application, Match, GapAlert
from .serializers import (
    UserSerializer,
    LearnerRegisterSerializer, OrgRegisterSerializer, LoginSerializer,
    OrganisationProfileSerializer, LearnerProfileSerializer,
    OpportunitySerializer, ApplicationSerializer, MatchSerializer, GapAlertSerializer,
)
from .permissions import (
    IsActiveAccount, IsLearner, IsEmployer, IsInstitution, IsIncubator, IsSETA,
    IsEmployerOrSETA, IsInstitutionOrSETA, IsSETAOrReadOnly, IsOwnerOrSETA,
)
from .auth_utils import generate_token


# ── Auth ──────────────────────────────────────────────────────────────────────

class LearnerRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LearnerRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'token': generate_token(user),
            'user': UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)


class OrgRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OrgRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'message': 'Registration received. Your account is pending verification.',
            'user': UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        data = {
            'token': generate_token(user),
            'user': UserSerializer(user).data,
        }
        if user.account_status == 'pending':
            data['warning'] = 'Your account is pending verification. Access is restricted until approved.'
        return Response(data)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = UserSerializer(request.user).data
        if request.user.role != 'Learner':
            try:
                data['organisation'] = OrganisationProfileSerializer(
                    request.user.organisation
                ).data
            except OrganisationProfile.DoesNotExist:
                pass
        else:
            try:
                data['profile'] = LearnerProfileSerializer(
                    request.user.learner_profile
                ).data
            except LearnerProfile.DoesNotExist:
                pass
        return Response(data)


# ── Organisation verification (SETA admin) ────────────────────────────────────

class PendingOrganisationsView(generics.ListAPIView):
    """All orgs awaiting verification — SETA only."""
    serializer_class = OrganisationProfileSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSETA]

    def get_queryset(self):
        return OrganisationProfile.objects.filter(user__account_status='pending')


class ApproveOrganisationView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSETA]

    def patch(self, request, pk):
        org = get_object_or_404(OrganisationProfile, pk=pk)
        org.verified_at = timezone.now()
        org.verified_by = request.user
        org.save()
        org.user.account_status = 'active'
        org.user.save()
        return Response({
            'message': f'{org.company_name} has been approved.',
            'organisation': OrganisationProfileSerializer(org).data,
        })


class RejectOrganisationView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSETA]

    def patch(self, request, pk):
        org = get_object_or_404(OrganisationProfile, pk=pk)
        org.user.account_status = 'suspended'
        org.user.save()
        return Response({'message': f'{org.company_name} has been rejected.'})


# ── Users ─────────────────────────────────────────────────────────────────────

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSETA]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]


# ── Organisations ─────────────────────────────────────────────────────────────

class OrganisationListView(generics.ListAPIView):
    serializer_class = OrganisationProfileSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount]

    def get_queryset(self):
        qs = OrganisationProfile.objects.filter(user__account_status='active')
        org_type = self.request.query_params.get('type')
        if org_type:
            qs = qs.filter(org_type=org_type)
        return qs


class OrganisationDetailView(generics.RetrieveUpdateAPIView):
    queryset = OrganisationProfile.objects.all()
    serializer_class = OrganisationProfileSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]


# ── LearnerProfiles ───────────────────────────────────────────────────────────

class LearnerProfileListCreate(generics.ListCreateAPIView):
    queryset = LearnerProfile.objects.all()
    serializer_class = LearnerProfileSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsActiveAccount(), IsLearner()]
        return [IsAuthenticated(), IsActiveAccount()]


class LearnerProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LearnerProfile.objects.all()
    serializer_class = LearnerProfileSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]


# ── Opportunities ─────────────────────────────────────────────────────────────

class OpportunityListCreate(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsActiveAccount(), IsEmployer()]
        return [IsAuthenticated(), IsActiveAccount()]


class OpportunityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]


# ── Applications ──────────────────────────────────────────────────────────────

class ApplicationListCreate(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsActiveAccount(), IsLearner()]
        return [IsAuthenticated(), IsActiveAccount()]

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
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]


# ── Matches ───────────────────────────────────────────────────────────────────

class MatchListCreate(generics.ListCreateAPIView):
    serializer_class = MatchSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsActiveAccount(), IsSETA()]
        return [IsAuthenticated(), IsActiveAccount()]

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
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]


# ── GapAlerts ─────────────────────────────────────────────────────────────────

class GapAlertListCreate(generics.ListCreateAPIView):
    queryset = GapAlert.objects.all()
    serializer_class = GapAlertSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSETAOrReadOnly]


class GapAlertDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GapAlert.objects.all()
    serializer_class = GapAlertSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSETAOrReadOnly]
