from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from accounts.models import CustomUser


class LoggedInUser(models.Model):
    user = models.OneToOneField(CustomUser, related_name='logged_in_user', on_delete=models.CASCADE)
    session_key = models.CharField(max_length=32, null=True, blank=True)

    def __str__(self):
        return self.user.username


class DataModel(models.Model):
    # customuser id
    user = models.ForeignKey(get_user_model(), null=True, blank=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    # priority
    COLOR_CHOICES = [
        ('bg-info', 'Low'),
        ('bg-success', 'Medium'),
        ('bg-danger', 'High'),
    ]
    color = models.CharField(max_length=20, default='bg-success', choices=COLOR_CHOICES)
    body = models.TextField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.title}, id: {self.user}"


class Lang(models.Model):

    prompt = models.TextField(max_length=500)
    answer = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.prompt)


