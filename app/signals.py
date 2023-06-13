# Signals that fires when a user logs in and logs out
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from .models import LoggedInUser


@receiver(user_logged_in)
def on_user_logged_in(sender, request, **kwargs):
    LoggedInUser.objects.get_or_create(user=request.user, session_key=request.session.session_key)

@receiver(user_logged_out)
def on_user_logged_out(sender, request, **kwargs):
    try:
        LoggedInUser.objects.get(user=request.user).delete()
    except LoggedInUser.DoesNotExist:
        pass


