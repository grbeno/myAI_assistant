from .models import DataModel
from rest_framework import serializers


class InitSerializer(serializers.ModelSerializer):
	class Meta:
		model = DataModel
		fields = ('id', 'title','body')