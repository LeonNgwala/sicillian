from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Institution, LearnerProfile, Opportunity, Application, Match, GapAlert


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'first_name', 'phone', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['email', 'password', 'role', 'first_name', 'phone']

    def create(self, validated_data):
        validated_data['password_hash'] = make_password(validated_data.pop('password'))
        return super().create(validated_data)


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


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'user', 'name', 'type', 'district', 'created_at']


class LearnerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnerProfile
        fields = ['id', 'user', 'institution', 'district', 'nqf_level', 'qualification', 'skills', 'status', 'updated_at']


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = ['id', 'employer', 'title', 'type', 'district', 'nqf_required', 'skills_required', 'stipend', 'spots_available', 'status', 'closes_at', 'created_at']


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
        fields = ['id', 'district', 'alert_type', 'learners_ready', 'learners_placed', 'detail', 'status', 'created_at']
