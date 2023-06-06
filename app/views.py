from django.views.generic import TemplateView
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from environs import Env
from .models import DataModel, Lang
from .serializers import InitSerializer, LangSerializer
import random
# import openai

env = Env()
env.read_env()

# api_key = env.str("OPENAI_KEY", default=None)
# openai.api_key = api_key


class React(TemplateView):
	template_name = 'index.html'


class TodoApp(APIView):
	
	serializer_class = InitSerializer

	def get(self, request):
		detail = DataModel.objects.all()
		serializer = InitSerializer(detail, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = InitSerializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)
	
	def put(self, request, pk):
		detail = DataModel.objects.get(pk=pk)
		serializer = InitSerializer(instance=detail, data=request.data)
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



