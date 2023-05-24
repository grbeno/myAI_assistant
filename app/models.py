from django.db import models

class DataModel(models.Model):
    title = models.CharField(max_length=200)
    # # priority
    # low = models.BooleanField(default=False)
    # medium = models.BooleanField(default=True)
    # high = models.BooleanField(default=False)
    # description = models.TextField(max_length=300, blank=True)
    body = models.TextField(max_length=500, blank=True)

    def __str__(self):
        return str(self.title)


class Lang(models.Model):

    prompt = models.TextField(max_length=500)
    answer = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.prompt)


