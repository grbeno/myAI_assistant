from django.contrib.auth import login
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
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})

# from django.contrib.auth.views import LoginView
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.utils.decorators import method_decorator
# from django.views import View
# from django.http import JsonResponse

# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class Login(LoginView):
#     def form_valid(self, form):
#         # Perform any additional processing here if needed
#         return JsonResponse({'success': True})

#     def form_invalid(self, form):
#         # Handle failed login attempt here if needed
#         return JsonResponse({'success': False})