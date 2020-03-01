from django.urls import path
from authApp import views

urlpatterns = [
    path('login', views.login),
    path('register', views.signup),
    # path('status', views.checkLoginStatus)
]
