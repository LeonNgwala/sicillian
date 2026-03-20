from django.db import models
from django.contrib.auth.models import AbstractUser
from core.models import LearnerProfile, Opportunity, Institution, Application, Match, GapAlert
from core.models import User



# Create your models here.
class User:
    ROLES_CHOICES = [
        ('Learner'),
        ('Employer'),
        ('Institution'),
        ('SETA')
    ]

    email = models.CharField(max_length= 50, null = True, blank = True)
    password_hash = models.CharField(max_length= 10,null = True, blank = True)
    role = models.CharField(max_length= 20, CHOICES= ROLES_CHOICES)
    first_name = models.CharField(max_length= 20,null = True, blank = True)
    phone = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add = True)
    existing_emails = set()


class Institution(models.Model):
    INSTITUTION_TYPE = [
        ('university', 'University'),
        ('tvet', 'TVET'),
        ('training_body', 'Training Body'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=20, choices=INSTITUTION_TYPE)
    district = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class LearnerProfile(models.Model):
    STATUS_CHOICES = [
        ('searching','Searching'),
        ('placed','Placed'),
        ('training','Training'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    institution = models.ForeignKey(
        'Institution', on_delete=models.SET_NULL, null=True, blank=True
    )
    district = models.CharField(max_length=100)
    nqf_level = models.CharField(max_length=10)
    qualification = models.CharField(max_length=100)
    skills = models.JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='searching')
    updated_at = models.DateTimeField(auto_now=True)   



class Opportunity(models.Model):
    OPPORTUNITY_TYPE = [
        ('learnership', 'Learnership'),
        ('internship', 'Internship'),
        ('job', 'Job'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('filled', 'Filled'),
    ]

    employer = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=OPPORTUNITY_TYPE)
    district = models.CharField(max_length=100)
    nqf_required = models.IntegerField()
    skills_required = models.JSONField()
    stipend = models.IntegerField(null=True, blank=True)
    spots_available = models.IntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    closes_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]

    CHANNEL_CHOICES = [
        ('app', 'App'),
        ('ussd', 'USSD'),
    ]

    learner = models.ForeignKey(LearnerProfile, on_delete=models.CASCADE)
    opportunity = models.ForeignKey(opportunity, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES, default='app')
    applied_at = models.DateTimeField(auto_now_add=True)


class Match:
    learner = models.ForeignKey(LearnerProfile, on_delete=models.CASCADE)
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE)
    fit_score = models.IntegerField()
    ai_reason = models.TextField()
    matched_at = models.DateTimeField(auto_now_add=True)

class GapAlert:
    ALERT_TYPE_CHOICES = [
        ('critical_gap', 'Critical Gap'),
        ('high_gap', 'High Gap'),
        ('ready_to_scale', 'Ready to Scale'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('actioned', 'Actioned'),
        ('resolved', 'Resolved'),
    ]

    district = models.CharField(max_length=100)
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPE_CHOICES)
    learners_ready = models.IntegerField(default=0)
    learners_placed = models.IntegerField(default=0)
    detail = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)    


