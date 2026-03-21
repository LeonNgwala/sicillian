from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsActiveAccount(BasePermission):
    message = 'Your account is pending verification or has been suspended.'

    def has_permission(self, request, view):
        if not request.user:
            return False
        # SuperAdmin bypasses account status checks
        if request.user.role == 'SuperAdmin':
            return True
        return request.user.account_status == 'active'


class IsLearner(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'Learner')


class IsEmployer(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'Employer')


class IsInstitution(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'Institution')


class IsIncubator(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'Incubator')


class IsSETA(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'SETA')


class IsEmployerOrSETA(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role in ('Employer', 'SETA'))


class IsInstitutionOrSETA(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role in ('Institution', 'SETA'))


class IsSETAOrReadOnly(BasePermission):
    """SETA/SuperAdmin full access; Institution/Incubator read-only."""
    def has_permission(self, request, view):
        if not request.user:
            return False
        if request.user.role in ('SETA', 'SuperAdmin'):
            return True
        if request.user.role in ('Institution', 'Incubator') and request.method in SAFE_METHODS:
            return True
        return False


class IsOwnerOrSETA(BasePermission):
    """Object-level: the object's owner, a SETA user, or a SuperAdmin."""
    def has_object_permission(self, request, view, obj):
        if request.user.role in ('SETA', 'SuperAdmin'):
            return True
        owner = getattr(obj, 'user', None) \
            or getattr(obj, 'employer', None)
        if owner is None:
            learner = getattr(obj, 'learner', None)
            if learner:
                owner = learner.user
        return owner == request.user


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'SuperAdmin')


class IsSuperAdminOrSETA(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role in ('SuperAdmin', 'SETA'))
