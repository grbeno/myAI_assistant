from django.urls import path
from accounts.views import Login, Logout, SessionInfoView

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('session/', SessionInfoView.as_view(), name='session-info'),
]