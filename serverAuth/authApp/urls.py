from django.urls import path
from authApp import views

urlpatterns = [
    path('login', views.login),
    path('signup', views.signup),
    # path('status', views.checkLoginStatus)
]
