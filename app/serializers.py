from .models import DataModel #, Lang
from rest_framework import serializers

class InitSerializer(serializers.ModelSerializer):
	class Meta:
		model = DataModel
		fields = ('id', 'title','body')


# class LangSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Lang
# 		fields = ('id', 'prompt', 'answer')