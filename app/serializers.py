from .models import DataModel, Lang
from rest_framework import serializers


class InitSerializer(serializers.ModelSerializer):
	
	# user gets the value of the current user
	user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
	
	class Meta:
		model = DataModel
		fields = ('id', 'title', 'color','body', 'user')
	
	def create(self, validated_data):
		validated_data['user'] = self.context['request'].user
		instance = super().create(validated_data)
		return instance
	

class LangSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lang
		fields = ('id', 'prompt', 'answer')