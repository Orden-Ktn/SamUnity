from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/app/', include('app.urls')),  # URL pour accéder à l'API
]
