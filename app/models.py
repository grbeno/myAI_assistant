from django.db import models

class DataModel(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()

    def __str__(self):
        return str(self.title)


class Lang(models.Model):

    prompt = models.CharField(max_length=200)
    answer = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.prompt)


