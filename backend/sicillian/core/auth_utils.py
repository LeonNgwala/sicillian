import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings


def generate_token(user):
    payload = {
        'user_id': user.id,
        'role': user.role,
        'email': user.email,
        'exp': datetime.now(tz=timezone.utc) + timedelta(days=1),
        'iat': datetime.now(tz=timezone.utc),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')


def decode_token(token):
    return jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
