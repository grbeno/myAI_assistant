from django.db import models

class DataModel(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()

    def __str__(self):
        return str(self.title)


# class Images(models.Model):

#     prompt = models.CharField(max_length=200)
#     ai_img = models.ImageField(upload_to="app")

#     def __str__(self):
#         return str(self.prompt)


