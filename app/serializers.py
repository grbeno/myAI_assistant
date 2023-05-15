from .models import DataModel #, Images
from rest_framework import serializers


class InitSerializer(serializers.ModelSerializer):
	class Meta:
		model = DataModel
		fields = ('id', 'title','body')


# class AiImageSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Images
# 		fields = ('id', 'prompt', 'ai_img')