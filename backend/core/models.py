from django.db import models


class User(models.Model):
    ROLES_CHOICES = [
        ('Learner', 'Learner'),
        ('Employer', 'Employer'),
        ('Institution', 'Institution'),
        ('Incubator', 'Incubator'),
        ('SETA', 'SETA'),
        ('SuperAdmin', 'SuperAdmin'),
    ]
    ACCOUNT_STATUS_CHOICES = [
        ('active', 'Active'),
        ('pending', 'Pending'),
        ('suspended', 'Suspended'),
    ]

    email = models.EmailField(max_length=255, unique=True)
    password_hash = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLES_CHOICES)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    account_status = models.CharField(
        max_length=20, choices=ACCOUNT_STATUS_CHOICES, default='active'
    )
    province = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Required by DRF's IsAuthenticated permission check
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def __str__(self):
        return f"{self.email} ({self.role})"


class OrganisationProfile(models.Model):
    ORG_TYPE_CHOICES = [
        ('employer', 'Employer'),
        ('institution', 'Institution'),
        ('incubator', 'Incubator'),
        ('seta', 'SETA'),
    ]
    INSTITUTION_TYPE_CHOICES = [
        ('university', 'University'),
        ('tvet', 'TVET'),
        ('training_body', 'Training Body'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='organisation')
    org_type = models.CharField(max_length=20, choices=ORG_TYPE_CHOICES)
    company_name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, null=True, blank=True)
    contact_person = models.CharField(max_length=100, null=True, blank=True)
    use_case = models.TextField(null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    # Only populated when org_type == 'institution'
    institution_type = models.CharField(
        max_length=20, choices=INSTITUTION_TYPE_CHOICES, null=True, blank=True
    )
    payment_status = models.CharField(
        max_length=20, choices=PAYMENT_STATUS_CHOICES, default='unpaid'
    )
    verified_at = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='verified_orgs'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} ({self.org_type})"


class LearnerProfile(models.Model):
    STATUS_CHOICES = [
        ('searching', 'Searching'),
        ('placed', 'Placed'),
        ('training', 'Training'),
    ]
    RACE_CHOICES = [
        ('black_african', 'Black African'),
        ('coloured', 'Coloured'),
        ('indian', 'Indian'),
        ('asian', 'Asian'),
        ('white', 'White'),
        ('other', 'Other'),
        ('prefer_not_to_say', 'Prefer not to say'),
    ]
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('non_binary', 'Non-binary'),
        ('prefer_not_to_say', 'Prefer not to say'),
    ]
    DISABILITY_CHOICES = [
        ('yes', 'Yes'),
        ('no', 'No'),
        ('prefer_not_to_say', 'Prefer not to say'),
    ]
    NATIONALITY_CHOICES = [
        ('south_african', 'South African'),
        ('permanent_resident', 'Permanent Resident'),
        ('refugee_permit', 'Refugee/Asylum Permit'),
        ('other', 'Other'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='learner_profile')
    institution = models.ForeignKey(
        OrganisationProfile, on_delete=models.SET_NULL, null=True, blank=True
    )
    district = models.CharField(max_length=100)
    nqf_level = models.CharField(max_length=10)
    qualification = models.CharField(max_length=100)
    skills = models.JSONField(default=list)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='searching')

    # B-BBEE / demographics
    race        = models.CharField(max_length=20,  choices=RACE_CHOICES,        null=True, blank=True)
    gender      = models.CharField(max_length=20,  choices=GENDER_CHOICES,      null=True, blank=True)
    disability  = models.CharField(max_length=20,  choices=DISABILITY_CHOICES,  null=True, blank=True)
    nationality = models.CharField(max_length=25,  choices=NATIONALITY_CHOICES, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    id_number   = models.CharField(max_length=20, null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile for {self.user.email}"


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
    skills_required = models.JSONField(default=list)
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
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES, default='app')
    applied_at = models.DateTimeField(auto_now_add=True)


class Match(models.Model):
    learner = models.ForeignKey(LearnerProfile, on_delete=models.CASCADE)
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE)
    fit_score = models.IntegerField()
    ai_reason = models.TextField()
    matched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Matches"


class GapAlert(models.Model):
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


class Tenant(models.Model):
    name = models.CharField(max_length=100)
    province_code = models.CharField(max_length=10, unique=True)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='created_tenants',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.province_code})"
