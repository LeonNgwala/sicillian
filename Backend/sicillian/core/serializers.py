from models import User, Institution, LearnerProfile, Opportunity, Application, Match, GapAlert
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password_hash', 'role', 'first_name', 'phone']

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['user', 'name', 'type', 'district']

class LearnerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnerProfile
        fields = ['user', 'institution', 'district', 'nqf_level', 'qualification', 'skills', 'status']

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = ['institution', 'title', 'description', 'nqf_level', 'qualification', 'skills_required']

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['learner', 'opportunity', 'status']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['learner', 'opportunity', 'match_score']

class GapAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = GapAlert
        fields = ['learner', 'gap_description', 'suggested_actions']