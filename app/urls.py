from django.urls import path
from .views import React, TodoApp, LangAI

urlpatterns = [
    path('', React.as_view(), name='frontend'),
    path('app/', TodoApp.as_view(), name='app'),
    path('app/<int:pk>/', TodoApp.as_view()),
    path('lang/', LangAI.as_view(), name='lang'),
    path('lang/<int:pk>/', LangAI.as_view()),
]