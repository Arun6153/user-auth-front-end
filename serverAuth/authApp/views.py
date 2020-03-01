from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse, HttpResponseNotAllowed
from django.db import connection
from .models import User
import json,jwt


def login():
    print("in login")

def signup():
    print("in logout")