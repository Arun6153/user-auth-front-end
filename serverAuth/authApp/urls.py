from django.urls import path
from authApp import views

urlpatterns = [
    path('login', views.login),
    path('register', views.signup),
    path('download-csv', views.csvExport),
    path('upload-csv', views.csvImport),
    path('get-users',views.getUsersList),
    path('verify-email',views.verifyEmail),
    path('verify-userID',views.verifyUserID),
    path('edit-user',views.editUser),
    path('user',views.sendUser),
    path('update-logged-user',views.updateLogged),
    path('new-task',views.NewTask),
    path('tasks',views.GetTasksList),
]
