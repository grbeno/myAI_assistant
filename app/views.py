from environs import Env
import random
# import openai

from django.views.generic import TemplateView
from django.shortcuts import redirect
# from rest_framework import renderers
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import DataModel, Lang
from .serializers import InitSerializer, LangSerializer
from .permissions import IsOwner


env = Env()
env.read_env()

# api_key = env.str("OPENAI_KEY", default=None)
# openai.api_key = api_key


class React(TemplateView):
	template_name = 'index.html'


class TodoApp(APIView):
	
	serializer_class = InitSerializer
	permission_classes = [IsOwner]
	#renderer_classes = [renderers.BrowsableAPIRenderer, renderers.JSONRenderer]  # For testing (Browsable API)

	def get(self, request):
		# Filter by user id
		detail = DataModel.objects.filter(user=request.user.id)
		# Serialize data
		serializer = InitSerializer(detail, many=True)
		return Response(serializer.data)

	def post(self, request):
		# Add user id to request.data
		# user_id = request.user.id
		# request.data['user'] = user_id
		# Serialize data
		serializer = InitSerializer(data=request.data, context={'request': request})
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)
	
	def put(self, request, pk):
		detail = DataModel.objects.get(pk=pk)
		serializer = InitSerializer(instance=detail, data=request.data, context={'request': request})
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)
	
	def delete(self, request, pk):
		try:
			detail = DataModel.objects.get(pk=pk)
			detail.delete()
			return Response({'message': 'Item deleted successfully.'})
		except DataModel.DoesNotExist:
			return Response({'error': 'Item not found.'})
    

class LangAI(APIView):
	
	serializer_class = LangSerializer

	def get(self, request):
		detail = Lang.objects.all()
		serializer = LangSerializer(detail, many=True)
		return Response(serializer.data)
	
	def post(self, request):
		prompt = request.data['prompt']
		# custom_prompt = f"{prompt}\nAI: "
		
		# answer = openai.Completion.create(
		# 	prompt=prompt,
		# 	engine="davinci",
		# 	temperature=0.9,
		# 	max_tokens=256,
 		# )
		
		# Test
		unique = random.randint(10000, 99999)
		answer = f"@Thank you for the prompt, but this applicatation is currently under development. AI will response you soon. Have a nice day! [test-answer-{unique}]"
		
		data = { 'prompt': prompt , 'answer': answer }
		serializer = LangSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)

	def delete(self, request, pk):
		try:
			detail = Lang.objects.get(pk=pk)
			detail.delete()
			return Response({'message': 'Item deleted successfully.'})
		except Lang.DoesNotExist:
			return Response({'error': 'Item not found.'})



