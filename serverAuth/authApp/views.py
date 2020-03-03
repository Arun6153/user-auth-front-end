from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse, HttpResponseNotAllowed
from django.db import connection
from .models import User
from django.contrib.auth.hashers import make_password, check_password
import json
import jwt
import csv
import io

########### LOGIN AND SIGNUP WITH HASING AND JWT AUTHENTICATION
@csrf_exempt
def login(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        email = values['email']
        password = values['password']
        try:
            user = User.objects.get(email=f'{email}')
            if check_password(password, user.password):
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

        name = values['name']
        email = values['email']
        userid = values['userID']
        passRaw = values['password']
        phone = values['phone']
        option = values['option']

        passwordEn = make_password(passRaw)

        newUser = User(name=name, email=email, userid=userid,
                       phone=phone, password=passwordEn, optionPerm=option)
        newUser.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed('<p>Not allowed</p>')
##################################################################################################################
# CSV STUFF HERE!


def csvExport(request):
    if request.method == "GET":
        users = User.objects.all()
        res = HttpResponse(content_type="text/csv")
        res['Content-Deposition'] = 'attachment; filename="edit_users.csv"'
        writer = csv.writer(res, delimiter=',')
        writer.writerow(['Email', 'UserId', 'Name', 'Phone', 'Permission'])
        for user in users:
            writer.writerow(
                [user.email, user.userid, user.name, user.phone, user.option])
        return res
    return HttpResponseBadRequest("Password is wrong.")


@csrf_exempt
def csvImport(request):
    if request.method == 'POST':
        csv_file = request.FILES['file']

        data_set = csv_file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)
        next(io_string)

        for column in csv.reader(io_string, delimiter=',', quotechar="|"):
            _, created = User.objects.update_or_create(
                email=column[0],
                userid=column[1],
                name=column[2],
                phone=column[3],
                optionPerm=column[4],
            )

        return HttpResponse(status=201)

    return HttpResponseBadRequest("EITHER FILE is'nt UPLOADING OR REQUEST IS BAD")


def getUsersList(request):
    if request.method == "GET":
        if request.method == 'GET':
            allData = User.objects.all()
            val = allData.values('name', 'email', 'userid',
                                 'phone', 'optionPerm')
            enodedPass = allData.values('password')
            return JsonResponse({"data": list(val)})
    return HttpResponseBadRequest('<h3>Not Allowed</h3>')


@csrf_exempt
def verifyEmail(request):
    if request.method == 'POST':
         values = json.loads(request.body.decode('utf-8'))
         print(values)
         try:
             data = User.objects.get(email=values['email'])
         except Exception as e:
                return HttpResponse(200)
         return HttpResponseBadRequest("A user is already registerd with this email id")
    else:
        return HttpResponseBadRequest("Request not allowed")
        
@csrf_exempt
def verifyUserID(request):
    if request.method == 'POST':
         values = json.loads(request.body.decode('utf-8'))
         print("Dude its ok")
         try:
             data = User.objects.get(userid=values['userID']) 
         except Exception as e:
                return HttpResponse(200)
         return HttpResponseBadRequest("This userID is already taken")
    else:
        return HttpResponseBadRequest("Request not allowed")
