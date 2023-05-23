from django.urls import path
from .views import React, ListView, LangAI 

urlpatterns = [
    path('', React.as_view(), name='frontend'),
    path('app/', ListView.as_view(), name='app'),
    path('app/<int:pk>/', ListView.as_view()),
    path('lang/', LangAI.as_view(), name='lang'),
]