from rest_framework.views import APIView
from .models import DataModel
from .serializers import InitSerializer
from django.views.generic import TemplateView
from rest_framework.response import Response


class ListView(APIView):
	
	serializer_class = InitSerializer

	def get(self, request):
		detail = [ {"id": detail.id, "title": detail.title,"body": detail.body}
		for detail in DataModel.objects.all()]
		return Response(detail)

	def post(self, request):
		serializer = InitSerializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)

class React(TemplateView):
	template_name = 'index.html'