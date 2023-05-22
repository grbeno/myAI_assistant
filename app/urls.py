from django.urls import path
from .views import React, ListView #, LangAi 

urlpatterns = [
    path('', React.as_view(), name='frontend'),
    path('app/', ListView.as_view(), name='app'),
    #path('app/', LangAi.as_view()),
    path('app/<int:pk>/', ListView.as_view()),
]