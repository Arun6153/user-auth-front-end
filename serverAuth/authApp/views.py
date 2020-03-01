from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse, HttpResponseNotAllowed
from django.db import connection
from .models import User
from django.contrib.auth.hashers import make_password, check_password
import json
import jwt

########### LOGIN AND SIGNUP WITH HASING AND JWT AUTHENTICATION
@csrf_exempt
def login(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        email = values['email']
        password = values['password']
        try:
            user = User.objects.get(email=f'{email}')
            if  check_password(password,user.password):
                payload = {
                    'email': user.email,
                }
                jwt_token = jwt.encode(
                    payload, "WANNA_BREACH", algorithm='HS256',)
                data = {
                    'status': '200',
                    'token': f'{jwt_token}',
                    'email': f'{user.email}'
                }
                return JsonResponse(data)
            else:
                return HttpResponseBadRequest("Password is wrong.")
        except Exception as e:
            return HttpResponseNotFound("User does not exists.")
    else:
        return HttpResponseNotAllowed('<p>ERROR 404 - Request Not Allowed</p>')

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))

        name        = values['name']
        email       = values['email']
        userid      = values['userID']
        passRaw     = values['password']
        phone       = values['phone']
        option      = values['option']
        
        passwordEn = make_password(passRaw)
        # passwordEn="pbkdf2_sha256$180000$18b5QY0u3b38$p9C+fAl0jBJMt4VmH60x1jWb4Cj4eOsPo+Gwvxhw8P4="
        # print("Hashed Password:- "+passwordEn)
        # print(check_password(passRaw,passwordEn))
        newUser = User(name=name, email=email, userid=userid, phone=phone, password=passwordEn, option=option)
        newUser.save()
        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed('<p>Not allowed</p>')

# pbkdf2_sha256$180000$18b5QY0u3b38$p9C+fAl0jBJMt4VmH60x1jWb4Cj4eOsPo+Gwvxhw8P4=
# pbkdf2_sha256$180000$Ep2wdSi9ldbK$Hk5we+6dY2b4DZJLBauGaYIdUkPR+T5TjBCliuzXom0=