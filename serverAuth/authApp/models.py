from django.db import models
from passlib.hash import pbkdf2_sha256


class User(models.Model):
    userid = models.CharField(max_length=20)
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=256)
    phone = models.CharField(max_length=10)
    optionPerm = models.CharField(max_length=15, null=True, blank=True)


class Task(models.Model):
    description = models.TextField()
    status = models.BooleanField(default=False)
    owner = models.CharField(max_length=30, blank=True, null=True)
    type = models.CharField(max_length=15)


class AssignedTask(models.Model):
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, default=None, on_delete=models.CASCADE)
