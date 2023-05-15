from django.urls import path
from .views import React, ListView

urlpatterns = [
    path('', React.as_view(), name='frontend'),
	path('app/', ListView.as_view(), name='app'),
]