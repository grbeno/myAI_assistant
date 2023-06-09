from django.urls import path
from accounts.views import Login, Logout, SessionInfoView, CookieAgeView

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('session/', SessionInfoView.as_view(), name='session-info'),
    path('cookie_age/', CookieAgeView.as_view(), name='cookie-age'),
]