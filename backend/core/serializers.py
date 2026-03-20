from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from .models import User, OrganisationProfile, LearnerProfile, Opportunity, Application, Match, GapAlert


# ── User ──────────────────────────────────────────────────────────────────────

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'first_name', 'phone', 'account_status', 'created_at']


# ── Auth ──────────────────────────────────────────────────────────────────────

class LearnerRegisterSerializer(serializers.Serializer):
    # Account fields
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(max_length=50)
    phone = serializers.CharField(max_length=20)
    # Profile fields — captured at first attempt
    district = serializers.CharField(max_length=100)
    nqf_level = serializers.CharField(max_length=10)
    qualification = serializers.CharField(max_length=100)
    skills = serializers.ListField(child=serializers.CharField(), default=list)
    institution_id = serializers.IntegerField(required=False, allow_null=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def validate_institution_id(self, value):
        if value is not None:
            try:
                org = OrganisationProfile.objects.get(pk=value, org_type='institution')
            except OrganisationProfile.DoesNotExist:
                raise serializers.ValidationError('Institution not found.')
        return value

    def create(self, validated_data):
        institution_id = validated_data.pop('institution_id', None)
        profile_fields = {
            'district': validated_data.pop('district'),
            'nqf_level': validated_data.pop('nqf_level'),
            'qualification': validated_data.pop('qualification'),
            'skills': validated_data.pop('skills'),
        }
        user = User.objects.create(
            email=validated_data['email'],
            password_hash=make_password(validated_data['password']),
            first_name=validated_data['first_name'],
            phone=validated_data['phone'],
            role='Learner',
            account_status='active',
        )
        LearnerProfile.objects.create(
            user=user,
            institution_id=institution_id,
            **profile_fields,
        )
        return user


class OrgRegisterSerializer(serializers.Serializer):
    # Account fields
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(max_length=50, help_text='Primary contact first name')
    phone = serializers.CharField(max_length=20)
    # Organisation fields
    org_type = serializers.ChoiceField(choices=['employer', 'institution', 'incubator', 'seta'])
    company_name = serializers.CharField(max_length=255)
    registration_number = serializers.CharField(max_length=100, required=False, allow_blank=True)
    contact_person = serializers.CharField(max_length=100, required=False, allow_blank=True)
    use_case = serializers.CharField(required=False, allow_blank=True)
    district = serializers.CharField(max_length=100, required=False, allow_blank=True)
    institution_type = serializers.ChoiceField(
        choices=['university', 'tvet', 'training_body'],
        required=False, allow_null=True
    )

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def validate(self, data):
        if data.get('org_type') == 'institution' and not data.get('institution_type'):
            raise serializers.ValidationError(
                {'institution_type': 'Required for institution registrations.'}
            )
        return data

    def create(self, validated_data):
        org_fields = {
            'org_type': validated_data.pop('org_type'),
            'company_name': validated_data.pop('company_name'),
            'registration_number': validated_data.pop('registration_number', ''),
            'contact_person': validated_data.pop('contact_person', ''),
            'use_case': validated_data.pop('use_case', ''),
            'district': validated_data.pop('district', ''),
            'institution_type': validated_data.pop('institution_type', None),
        }
        role_map = {
            'employer': 'Employer',
            'institution': 'Institution',
            'incubator': 'Incubator',
            'seta': 'SETA',
        }
        user = User.objects.create(
            email=validated_data['email'],
            password_hash=make_password(validated_data['password']),
            first_name=validated_data['first_name'],
            phone=validated_data['phone'],
            role=role_map[org_fields['org_type']],
            account_status='pending',
        )
        OrganisationProfile.objects.create(user=user, **org_fields)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials.')
        if not check_password(data['password'], user.password_hash or ''):
            raise serializers.ValidationError('Invalid credentials.')
        data['user'] = user
        return data


# ── Organisation ──────────────────────────────────────────────────────────────

class OrganisationProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = OrganisationProfile
        fields = [
            'id', 'user', 'org_type', 'company_name', 'registration_number',
            'contact_person', 'use_case', 'district', 'institution_type',
            'payment_status', 'verified_at', 'verified_by', 'created_at',
        ]
        read_only_fields = ['verified_at', 'verified_by', 'payment_status']


# ── Learner ───────────────────────────────────────────────────────────────────

class LearnerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnerProfile
        fields = [
            'id', 'user', 'institution', 'district', 'nqf_level',
            'qualification', 'skills', 'status', 'updated_at',
        ]


# ── Other resources ───────────────────────────────────────────────────────────

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = [
            'id', 'employer', 'title', 'type', 'district', 'nqf_required',
            'skills_required', 'stipend', 'spots_available', 'status', 'closes_at', 'created_at',
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'learner', 'opportunity', 'status', 'channel', 'applied_at']


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'learner', 'opportunity', 'fit_score', 'ai_reason', 'matched_at']


class GapAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = GapAlert
        fields = [
            'id', 'district', 'alert_type', 'learners_ready',
            'learners_placed', 'detail', 'status', 'created_at',
        ]
