from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsLearner(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'Learner')


class IsEmployer(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'Employer')


class IsInstitution(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'Institution')


class IsSETA(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'SETA')


class IsEmployerOrSETA(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role in ('Employer', 'SETA'))


class IsInstitutionOrSETA(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role in ('Institution', 'SETA'))


class IsSETAOrReadOnlyForInstitution(BasePermission):
    """SETA can do anything; Institution can only read."""
    def has_permission(self, request, view):
        if not request.user:
            return False
        if request.user.role == 'SETA':
            return True
        if request.user.role == 'Institution' and request.method in SAFE_METHODS:
            return True
        return False


class IsOwnerOrSETA(BasePermission):
    """Object-level: owner (by user field) or SETA."""
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'SETA':
            return True
        owner = getattr(obj, 'user', getattr(obj, 'learner', getattr(obj, 'employer', None)))
        if hasattr(owner, 'user'):
            # obj.learner is a LearnerProfile → get its user
            return owner.user == request.user
        return owner == request.user
