from django.db import models

class DataModel(models.Model):
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
        return str(self.title)


class Lang(models.Model):

    prompt = models.TextField(max_length=500)
    answer = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.prompt)


