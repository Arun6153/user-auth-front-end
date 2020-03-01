from django.db import models

class User(models.Model):
    userid=models.CharField(max_length=20)
    name=models.CharField(max_length=30)
    email=models.CharField(max_length=30)
    password=models.CharField(max_length=15)
    phone=models.CharField(max_length=10)
    option=models.CharField(max_length=7,null=True, blank=True)
