from django.shortcuts import render
from rest_framework.views import APIView
from .models import DataModel
from .serializers import InitSerializer
from rest_framework.renderers import TemplateHTMLRenderer
from django.views.generic import TemplateView
from rest_framework.response import Response
from environs import Env

env = Env()
env.read_env()

#api_key = env.str("OPENAI_KEY", default=None)


class React(TemplateView):
	template_name = 'index.html'


class ListView(APIView):
	
	serializer_class = InitSerializer
	# renderer_classes = [TemplateHTMLRenderer]
	# template_name = 'app.html'

	def get(self, request):
		detail = [ {"id": detail.id, "title": detail.title, "body": detail.body}
		for detail in DataModel.objects.all()]
		return Response(detail)
	
	# # Tried to render as django template
	# def get(self, request):
	# 	form = self.serializer_class()
	# 	return render(request, self.template_name, {'form': form})

	def post(self, request):
		serializer = InitSerializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)


#class AiImage():
#	pass
