from django.db import models
from passlib.hash import pbkdf2_sha256

class User(models.Model):
    userid=models.CharField(max_length=20)
    name=models.CharField(max_length=30)
    email=models.CharField(max_length=30)
    password=models.CharField(max_length=256)
    phone=models.CharField(max_length=10)
    optionPerm=models.CharField(max_length=15,null=True, blank=True)