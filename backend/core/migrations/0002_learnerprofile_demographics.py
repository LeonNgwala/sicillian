from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='learnerprofile',
            name='race',
            field=models.CharField(
                max_length=20, null=True, blank=True,
                choices=[
                    ('black_african', 'Black African'),
                    ('coloured', 'Coloured'),
                    ('indian', 'Indian'),
                    ('asian', 'Asian'),
                    ('white', 'White'),
                    ('other', 'Other'),
                    ('prefer_not_to_say', 'Prefer not to say'),
                ],
            ),
        ),
        migrations.AddField(
            model_name='learnerprofile',
            name='gender',
            field=models.CharField(
                max_length=20, null=True, blank=True,
                choices=[
                    ('male', 'Male'),
                    ('female', 'Female'),
                    ('non_binary', 'Non-binary'),
                    ('prefer_not_to_say', 'Prefer not to say'),
                ],
            ),
        ),
        migrations.AddField(
            model_name='learnerprofile',
            name='disability',
            field=models.CharField(
                max_length=20, null=True, blank=True,
                choices=[
                    ('yes', 'Yes'),
                    ('no', 'No'),
                    ('prefer_not_to_say', 'Prefer not to say'),
                ],
            ),
        ),
        migrations.AddField(
            model_name='learnerprofile',
            name='nationality',
            field=models.CharField(
                max_length=25, null=True, blank=True,
                choices=[
                    ('south_african', 'South African'),
                    ('permanent_resident', 'Permanent Resident'),
                    ('refugee_permit', 'Refugee/Asylum Permit'),
                    ('other', 'Other'),
                ],
            ),
        ),
        migrations.AddField(
            model_name='learnerprofile',
            name='date_of_birth',
            field=models.DateField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='learnerprofile',
            name='id_number',
            field=models.CharField(max_length=20, null=True, blank=True),
        ),
    ]
