"""
Management command: seed demo data for presentation.

Usage:
    python manage.py seed_demo

Creates:
  - 1 Employer user + OrganisationProfile with 3 open opportunities
  - 3 Learner users with profiles + skills that overlap the opportunities
  - Runs the matching engine so /matches/ returns real scored results
  - 2 Gap alerts for the SETA dashboard
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from core.models import User, OrganisationProfile, LearnerProfile, Opportunity, GapAlert
from core.matching import run_matching_engine_for_learner


EMPLOYER_EMAIL    = 'employer@demo.co.za'
SETA_EMAIL        = 'seta@demo.co.za'
INCUBATOR_EMAIL   = 'incubator@demo.co.za'
LEARNER_EMAILS    = [
    'thabo@demo.co.za',
    'naledi@demo.co.za',
    'sipho@demo.co.za',
]
PASSWORD = 'demo1234'


class Command(BaseCommand):
    help = 'Seed demo data for presentation'

    def handle(self, *args, **options):
        self.stdout.write('Seeding demo data...')

        # ── Employer ──────────────────────────────────────────────────────────
        emp_user, _ = User.objects.get_or_create(
            email=EMPLOYER_EMAIL,
            defaults=dict(
                password_hash=make_password(PASSWORD),
                role='Employer',
                first_name='TechCorp EC',
                phone='0411234567',
                account_status='active',
            )
        )
        org, _ = OrganisationProfile.objects.get_or_create(
            user=emp_user,
            defaults=dict(
                org_type='employer',
                company_name='TechCorp Eastern Cape',
                registration_number='2021/123456/07',
                contact_person='Jane Smith',
                use_case='We hire junior developers and data analysts for our EC office.',
                district='Nelson Mandela Bay',
            )
        )
        self.stdout.write(f'  Employer: {emp_user.email}')

        # ── SETA demo user ─────────────────────────────────────────────────────
        seta_user, _ = User.objects.get_or_create(
            email=SETA_EMAIL,
            defaults=dict(
                password_hash=make_password(PASSWORD),
                role='SETA',
                first_name='MERSETA EC',
                phone='0413456789',
                account_status='active',
            )
        )
        self.stdout.write(f'  SETA: {seta_user.email}')

        # ── Incubator demo user ────────────────────────────────────────────────
        incubator_user, _ = User.objects.get_or_create(
            email=INCUBATOR_EMAIL,
            defaults=dict(
                password_hash=make_password(PASSWORD),
                role='Incubator',
                first_name='Propella Incubator',
                phone='0419876543',
                account_status='active',
            )
        )
        self.stdout.write(f'  Incubator: {incubator_user.email}')

        # ── Opportunities ──────────────────────────────────────────────────────
        opps_data = [
            dict(
                title='Junior Python Developer',
                type='internship',
                district='Nelson Mandela Bay',
                nqf_required=6,
                skills_required=['Python', 'SQL', 'Django'],
                stipend=8000,
                spots_available=2,
            ),
            dict(
                title='Data Analyst Learnership',
                type='learnership',
                district='Nelson Mandela Bay',
                nqf_required=5,
                skills_required=['SQL', 'Excel', 'Data Analysis'],
                stipend=6000,
                spots_available=3,
            ),
            dict(
                title='IT Support Technician',
                type='job',
                district='Buffalo City',
                nqf_required=4,
                skills_required=['Networking', 'Windows', 'Hardware'],
                stipend=12000,
                spots_available=1,
            ),
        ]
        opportunities = []
        for opp in opps_data:
            obj, created = Opportunity.objects.get_or_create(
                employer=emp_user,
                title=opp['title'],
                defaults={**opp, 'status': 'open'},
            )
            opportunities.append(obj)
            if created:
                self.stdout.write(f'  Opportunity: {obj.title}')

        # ── Learners ──────────────────────────────────────────────────────────
        learners_data = [
            dict(
                email='thabo@demo.co.za',
                first_name='Thabo Mokoena',
                phone='0731234567',
                district='Nelson Mandela Bay',
                nqf_level='6',
                qualification='BSc Computer Science',
                skills=['Python', 'SQL', 'Django', 'Git'],
            ),
            dict(
                email='naledi@demo.co.za',
                first_name='Naledi Dlamini',
                phone='0842345678',
                district='Nelson Mandela Bay',
                nqf_level='5',
                qualification='National Diploma IT',
                skills=['SQL', 'Excel', 'Data Analysis', 'Power BI'],
            ),
            dict(
                email='sipho@demo.co.za',
                first_name='Sipho Ndlovu',
                phone='0613456789',
                district='Buffalo City',
                nqf_level='4',
                qualification='NCV IT',
                skills=['Networking', 'Windows', 'Hardware', 'CompTIA A+'],
            ),
            dict(
                email='vuyo@demo.co.za',
                first_name='Vuyo Mkhize',
                phone='0821234567',
                district='Nelson Mandela Bay',
                nqf_level='6',
                qualification='BSc Information Technology',
                skills=['Python', 'SQL', 'Django', 'Data Analysis', 'Excel', 'Git'],
            ),
        ]

        for ld in learners_data:
            user, _ = User.objects.get_or_create(
                email=ld['email'],
                defaults=dict(
                    password_hash=make_password(PASSWORD),
                    role='Learner',
                    first_name=ld['first_name'],
                    phone=ld['phone'],
                    account_status='active',
                )
            )
            profile, _ = LearnerProfile.objects.get_or_create(
                user=user,
                defaults=dict(
                    district=ld['district'],
                    nqf_level=ld['nqf_level'],
                    qualification=ld['qualification'],
                    skills=ld['skills'],
                    status='searching',
                )
            )
            self.stdout.write(f'  Learner: {user.email}')

        # ── Run matching engine ────────────────────────────────────────────────
        self.stdout.write('  Running matching engine...')
        total = 0
        for profile in LearnerProfile.objects.filter(status='searching'):
            matches = run_matching_engine_for_learner(profile.id)
            total += len(matches)
            self.stdout.write(f'    {profile.user.first_name}: {len(matches)} matches')

        # ── Gap alerts ────────────────────────────────────────────────────────
        alerts_data = [
            dict(
                district='Nelson Mandela Bay',
                alert_type='critical_gap',
                learners_ready=42,
                learners_placed=8,
                detail='High demand for Python developers with SQL skills. Only 19% placement rate.',
            ),
            dict(
                district='Buffalo City',
                alert_type='high_gap',
                learners_ready=27,
                learners_placed=11,
                detail='IT support roles available but learners lack networking certifications.',
            ),
        ]
        for alert in alerts_data:
            GapAlert.objects.get_or_create(
                district=alert['district'],
                alert_type=alert['alert_type'],
                defaults={**alert, 'status': 'open'},
            )

        self.stdout.write(self.style.SUCCESS(
            f'\nDone! {total} matches created.\n'
            f'\nDemo credentials (password: {PASSWORD}):\n'
            f'  Learner 1:  thabo@demo.co.za   (NQF 6, Python/SQL/Django)\n'
            f'  Learner 2:  naledi@demo.co.za  (NQF 5, SQL/Excel/Data)\n'
            f'  Learner 3:  sipho@demo.co.za   (NQF 4, Networking/IT)\n'
            f'  DEMO USER:  vuyo@demo.co.za    (NQF 6, Python/SQL/Django/Data) [USE FOR JUDGES]\n'
            f'  Employer:   employer@demo.co.za\n'
            f'  SETA:       seta@demo.co.za\n'
            f'  Incubator:  incubator@demo.co.za\n'
        ))
