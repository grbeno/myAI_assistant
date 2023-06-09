from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    # Django admin
    path('no4uh/', admin.site.urls),
    
    # User model
    path('accounts/', include('accounts.urls')),
    
    # Local apps
    path('', include('app.urls')),
]
