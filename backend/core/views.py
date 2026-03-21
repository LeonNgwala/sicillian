from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import User, OrganisationProfile, LearnerProfile, Opportunity, Application, Match, GapAlert, Tenant
from .serializers import (
    UserSerializer,
    LearnerRegisterSerializer, OrgRegisterSerializer, LoginSerializer,
    OrganisationProfileSerializer, LearnerProfileSerializer,
    OpportunitySerializer, ApplicationSerializer, MatchSerializer, GapAlertSerializer,
    TenantSerializer,
)
from .permissions import (
    IsActiveAccount, IsLearner, IsEmployer, IsInstitution, IsIncubator, IsSETA,
    IsEmployerOrSETA, IsInstitutionOrSETA, IsSETAOrReadOnly, IsOwnerOrSETA,
    IsSuperAdmin, IsSuperAdminOrSETA,
)
from .auth_utils import generate_token
from .matching import run_matching_engine_for_learner


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
    """Pending non-SETA orgs — SETA coordinators; all pending — SuperAdmin."""
    serializer_class = OrganisationProfileSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdminOrSETA]

    def get_queryset(self):
        if self.request.user.role == 'SuperAdmin':
            return OrganisationProfile.objects.filter(user__account_status='pending')
        return OrganisationProfile.objects.filter(
            user__account_status='pending'
        ).exclude(org_type='seta')


class ApproveOrganisationView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdminOrSETA]

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
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdminOrSETA]

    def patch(self, request, pk):
        org = get_object_or_404(OrganisationProfile, pk=pk)
        org.user.account_status = 'suspended'
        org.user.save()
        return Response({'message': f'{org.company_name} has been rejected.'})


# ── SuperAdmin ─────────────────────────────────────────────────────────────────

class PendingSETAView(generics.ListAPIView):
    """Pending SETA registrations — SuperAdmin only."""
    serializer_class = OrganisationProfileSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdmin]

    def get_queryset(self):
        return OrganisationProfile.objects.filter(
            user__account_status='pending', org_type='seta'
        )


class ApproveSETAView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdmin]

    def patch(self, request, pk):
        org = get_object_or_404(OrganisationProfile, pk=pk, org_type='seta')
        org.verified_at = timezone.now()
        org.verified_by = request.user
        org.save()
        org.user.account_status = 'active'
        org.user.save()
        return Response({
            'message': f'{org.company_name} SETA has been approved.',
            'organisation': OrganisationProfileSerializer(org).data,
        })


class RejectSETAView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdmin]

    def patch(self, request, pk):
        org = get_object_or_404(OrganisationProfile, pk=pk, org_type='seta')
        org.user.account_status = 'suspended'
        org.user.save()
        return Response({'message': f'{org.company_name} SETA has been rejected.'})


class SuspendUserView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdmin]

    def patch(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        if user.role == 'SuperAdmin':
            return Response({'error': 'Cannot suspend a SuperAdmin.'}, status=status.HTTP_400_BAD_REQUEST)
        user.account_status = 'suspended'
        user.save()
        return Response({'message': f'{user.email} has been suspended.'})


class ActivateUserView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdmin]

    def patch(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.account_status = 'active'
        user.save()
        return Response({'message': f'{user.email} has been activated.'})


class TenantListCreate(generics.ListCreateAPIView):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdmin]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TenantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdmin]


# ── Users ─────────────────────────────────────────────────────────────────────

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsSuperAdminOrSETA]


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
    serializer_class = LearnerProfileSerializer

    def get_queryset(self):
        user = self.request.user
        # Learners only see their own profile
        if user.role == 'Learner':
            return LearnerProfile.objects.filter(user=user)
        # Employers, SETA, Institution, Incubator, SuperAdmin see all
        return LearnerProfile.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsActiveAccount(), IsLearner()]
        return [IsAuthenticated(), IsActiveAccount()]

    def perform_create(self, serializer):
        profile = serializer.save(user=self.request.user)
        run_matching_engine_for_learner(profile.id)


class LearnerProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LearnerProfile.objects.all()
    serializer_class = LearnerProfileSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]

    def perform_update(self, serializer):
        profile = serializer.save()
        run_matching_engine_for_learner(profile.id)


class UpdateSkillsView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsLearner]

    def patch(self, request, pk):
        profile = get_object_or_404(LearnerProfile, pk=pk, user=request.user)
        skills = request.data.get('skills')
        if not isinstance(skills, list):
            return Response({'error': 'skills must be a list.'}, status=status.HTTP_400_BAD_REQUEST)
        profile.skills = [s.strip() for s in skills if isinstance(s, str) and s.strip()]
        profile.save()
        run_matching_engine_for_learner(profile.id)
        return Response({'skills': profile.skills})


class UploadCVView(APIView):
    permission_classes = [IsAuthenticated, IsActiveAccount, IsLearner]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        profile = get_object_or_404(LearnerProfile, pk=pk, user=request.user)
        if 'cv' not in request.FILES:
            return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)
        file = request.FILES['cv']
        if not file.name.lower().endswith(('.pdf', '.doc', '.docx')):
            return Response({'error': 'Only PDF, DOC, and DOCX files are accepted.'}, status=status.HTTP_400_BAD_REQUEST)
        profile.cv = file
        profile.save()
        return Response({'cv_url': request.build_absolute_uri(profile.cv.url)})


# ── Opportunities ─────────────────────────────────────────────────────────────

class OpportunityListCreate(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsActiveAccount(), IsEmployer()]
        return [IsAuthenticated(), IsActiveAccount()]

    def perform_create(self, serializer):
        opportunity = serializer.save(employer=self.request.user)
        # Re-run matching for all searching learners when a new opportunity is posted
        for learner in LearnerProfile.objects.filter(status='searching'):
            run_matching_engine_for_learner(learner.id)


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

    def perform_create(self, serializer):
        serializer.save(learner=self.request.user.learner_profile)


class ApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsActiveAccount, IsOwnerOrSETA]


# ── Matches ───────────────────────────────────────────────────────────────────

class RunMatchingView(APIView):
    """POST /matches/run/ — trigger matching engine for the logged-in learner."""
    permission_classes = [IsAuthenticated, IsActiveAccount, IsLearner]

    def post(self, request):
        try:
            profile = request.user.learner_profile
        except LearnerProfile.DoesNotExist:
            return Response({'error': 'No learner profile found.'}, status=status.HTTP_404_NOT_FOUND)
        matches = run_matching_engine_for_learner(profile.id)
        return Response({
            'matches_found': len(matches),
            'message': f'Matching complete. {len(matches)} opportunities found.',
        })


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
