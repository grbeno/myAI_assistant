from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object to view and edit it.
    """
    message = 'Editing is restricted to the owner only.'

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        # print(f"obj.user.id:  {obj.user.id} - request.user.id: {request.user.id}")
        return obj.user.id == request.user.id


