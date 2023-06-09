from django.contrib.auth import login, logout
from django.http import JsonResponse
from django.views import View
from .models import CustomUser


class Login(View):

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = CustomUser.objects.filter(username=username).first()
        print(username)
        
        if user is not None and user.check_password(password):
            try:
                login(request, user)
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)})
            else:
                return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})


class Logout(View):
    
    def post(self, request):
        logout(request)
        return JsonResponse({'success': True})


class SessionInfoView(View):
    def get(self, request):
        session_data = {
            'is_authenticated': request.user.is_authenticated,
            'username': request.user.username,
            # Include any other session data you want to expose
        }
        return JsonResponse(session_data)