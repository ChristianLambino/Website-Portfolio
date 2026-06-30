from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'), # Directs the homepage to a view named 'home'
]