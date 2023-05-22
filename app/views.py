from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from environs import Env
from .models import DataModel #, Lang
from .serializers import InitSerializer #, LangSerializer
# import openai

env = Env()
env.read_env()

# api_key = env.str("OPENAI_KEY", default=None)
# openai.api_key = api_key


class React(TemplateView):
	template_name = 'index.html'
    

class ListView(APIView):
	
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
	
	def delete(self, request, pk):
		try:
			detail = DataModel.objects.get(pk=pk)
			detail.delete()
			return Response({'message': 'Item deleted successfully.'})
		except DataModel.DoesNotExist:
			return Response({'error': 'Item not found.'})


# class LangAi(APIView):
	
# 	serializer_class = LangSerializer

# 	def get(self, request):
# 		detail = Lang.objects.all()
# 		serializer = LangSerializer(detail, many=True)
# 		return Response(serializer.data)
	
# 	def post(self, request):
# 		serializer = LangSerializer(data=request.data)
# 		if serializer.is_valid(raise_exception=True):
# 			if api_key is not None:
# 				prompt = f"Correct my english prompt gramatically: {str(serializer.data['prompt'])}"
# 				response = openai.Completion.create(
# 					prompt=prompt,
# 					engine="davinci",
# 					temperature=0.9,
# 					max_tokens=256,
# 				)
# 			serializer.save()
# 			return Response(serializer.data)


