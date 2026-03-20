from django.contrib import admin
from .models import User, OrganisationProfile, LearnerProfile, Opportunity, Application, Match, GapAlert

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'role', 'account_status', 'created_at']
    list_filter = ['role', 'account_status']
    search_fields = ['email', 'first_name']

@admin.register(OrganisationProfile)
class OrganisationProfileAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'org_type', 'payment_status', 'verified_at', 'created_at']
    list_filter = ['org_type', 'payment_status']
    search_fields = ['company_name', 'registration_number']

@admin.register(LearnerProfile)
class LearnerProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'district', 'nqf_level', 'status']
    list_filter = ['status', 'district']

@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'district', 'status', 'created_at']
    list_filter = ['type', 'status']

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['learner', 'opportunity', 'status', 'channel', 'applied_at']
    list_filter = ['status', 'channel']

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['learner', 'opportunity', 'fit_score', 'matched_at']

@admin.register(GapAlert)
class GapAlertAdmin(admin.ModelAdmin):
    list_display = ['district', 'alert_type', 'status', 'created_at']
    list_filter = ['alert_type', 'status']
