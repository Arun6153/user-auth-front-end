from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse, HttpResponseNotAllowed
from django.db import connection
from .models import User, Task, AssignedTask
from django.contrib.auth.hashers import make_password, check_password
import json
import jwt
import csv
import io

from .verifyJWT import checkJwt

########### LOGIN AND SIGNUP WITH HASING AND JWT AUTHENTICATION


######### API FOR USER LOGIN
@csrf_exempt
def login(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        email = values['email']
        password = values['password']
        try:
            user = User.objects.get(email=f'{email}')
            print(user.password)
            print(check_password(password, user.password))
            if check_password(password, user.password):
                # MAKING PAYLOAD FOR TOKEN
                payload = {
                    'email': user.email,
                }
                print("present")
                # JWT_TOKEN HAS NEWLY CREATED TOKEN OF THE USER
                jwt_token = jwt.encode(
                    payload, "WANNA_BREACH", algorithm='HS256',)
                data = {
                    'status': '200',
                    'token': f'{jwt_token}',
                    'email': f'{email}',
                    'name': f'{user.name}',
                    'permission': f'{user.optionPerm}',
                }
                return JsonResponse(data)
            else:
                return HttpResponseBadRequest("Password is wrong.")
        except Exception as e:
            return HttpResponseNotFound("User does not exists.")
    else:
        return HttpResponseNotAllowed('<p>ERROR 404 - Request Not Allowed</p>')

######### API FOR USER REGISTRATION/SIGNUP
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
######### API TO EXPORT USER DATA
def csvExport(request):
    if request.method == "GET":
        users = User.objects.all()
        res = HttpResponse(content_type="text/csv")
        res['Content-Disposition'] = 'attachment; filename="edit_users.csv"'
        writer = csv.writer(res, delimiter=',')
        writer.writerow(
            ['ID', 'Email', 'UserId', 'Name', 'Phone', 'Permission'])
        for user in users:
            writer.writerow(
                [user.id, user.email, user.userid, user.name, user.phone, user.optionPerm])
        return res
    return HttpResponseBadRequest("Password is wrong.")


######### API FOR IMPORTING USER DATA FROM CSV FORMAT AT ONCE.
@csrf_exempt
def csvImport(request):
    if request.method == 'POST':
        try:
            token = request.headers['Authorization'].split("'")
            email = checkJwt(token[1])

            csv_file = request.FILES['file']

            data_set = csv_file.read().decode('UTF-8')
            io_string = io.StringIO(data_set)
            next(io_string)

            for column in csv.reader(io_string, delimiter=',', quotechar="|"):
                data = User.objects.get(id=column[0])
                data.email = column[1]
                data.userid = column[2]
                data.name = column[3]
                data.phone = column[4]
                data.optionPerm = column[5]
                data.save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponseBadRequest("Server error")
    return HttpResponseBadRequest("EITHER FILE is'nt UPLOADING OR REQUEST IS BAD")
###################################################################################################


######### API FOR GETTING USER LIST
def getUsersList(request):
    if request.method == "GET":
        try:
            token = request.headers['Authorization'].split("'")
            email = checkJwt(token[1])
            allData = User.objects.all()
            val = allData.values('name', 'email', 'userid',
                                 'phone', 'optionPerm', 'id')
            return JsonResponse({"data": list(val)})
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    return HttpResponseBadRequest('<h3>Not Allowed</h3>')

######### API FOR EMAIL-VERIFICATION
@csrf_exempt
def verifyEmail(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        email = User.objects.get(id=values['id'])
        if email.email == values['email']:
            print(email.email+"    old")
            print(values["email"]+"    new")
            print("how")
            return HttpResponse(200)
        try:
            data = User.objects.get(email=values['email'])

        except Exception as e:
            return HttpResponse(200)
        return HttpResponseBadRequest("A user is already registerd with this email id")
    else:
        return HttpResponseBadRequest("Request not allowed")

######### API FOR USER_ID-VERIFICATION
@csrf_exempt
def verifyUserID(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        userid = User.objects.get(id=values['id'])
        print(values)
        if userid.userid == values['userID']:
            print("how")
            return HttpResponse(200)
        try:
            print(userid.userid+"    old")
            print(values["userID"]+"    new")
            data = User.objects.get(userid=values['userID'])

        except Exception as e:
            return HttpResponse(200)

        return HttpResponseBadRequest("This userID is already taken")
    else:
        return HttpResponseBadRequest("Request not allowed")

######### API FOR EDIT-USER
@csrf_exempt
def editUser(request):
    if request.method == "POST":
        values = json.loads(request.body.decode('utf-8'))
        try:
            data = User.objects.get(id=values['id'])
            data.name = values['name']
            data.email = values['email']
            data.userid = values['userID']
            data.phone = values['phone']
            data.optionPerm = values['option']
            data.save()
        except Exception as e:
            return HttpResponseBadRequest("This userID is already taken")
        return HttpResponse(200)
    return HttpResponseBadRequest("Request not allowed")


@csrf_exempt
def sendUser(request):
    if request.method == 'GET':
        try:
            token = request.headers['Authorization'].split("'")
            email = checkJwt(token[1])
            user = User.objects.get(email=email)
            return JsonResponse({'data': {
                "name": user.name, "email": user.email, "phone": user.phone, "permission": user.optionPerm, "userid": user.userid, "id": user.id
            }})
        except Exception as e:
            return HttpResponseBadRequest("didnt get user.")
    else:
        return HttpResponseBadRequest("Request not allowed")


@csrf_exempt
def updateLogged(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        id = values['id']
        passRaw = values['password']
        try:
            user = User.objects.get(id=f'{id}')
            print(user)
            if not passRaw:
                passRaw = make_password(passRaw)
                user.password = passRaw
            user.name = values['name']
            user.email = values['email']
            user.userid = values['userID']
            user.phone = values['phone']
            user.optionPerm = values['option']
            user.save()

            return HttpResponse(200)
        except Exception as e:
            print("exception")
            return HttpResponseBadRequest("Something went wrong.")
    return HttpResponseNotAllowed("Request not allowed to this server.")

##################################################################################################

### TASK QUERRIES
@csrf_exempt
def NewTask(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('UTF-8'))
        description = values['description']
        type = values['type']
        task = Task(description=description, type=type,
                    owner="NONE", status=False)
        task.save()
        return HttpResponse(200)
    else:
        return HttpResponseNotAllowed("something went wrong.")


def GetTasksList(request):
    if request.method == 'GET':
         try:
            token = request.headers['Authorization'].split("'")
            email = checkJwt(token[1])
            task = Task.objects.all()
            data = task.values()
            return JsonResponse({'data':list(data)})
         except Exception as e:
            return HttpResponseNotAllowed("This request is'nt alowed")
    else:
        return HttpResponseBadRequest("Something went wrong server isnt responding")

def GetAssignedTask(request,id):
    if request.method == 'GET':
        try:
            token = request.headers['Authorization'].split("'")
            email = checkJwt(token[1])
            userTasks = AssignedTask.objects.all()
            lists = userTasks.filter(user = id).values()
            data={}
            for task in lists:
                data.setdefault(task.id, []).append(task)

            return JsonResponse({"data":list(data)})
        except Exception as e:
            return HttpResponseNotAllowed("This request is'nt alowed")
    else:
        return HttpResponseBadRequest("Something went wrong server isnt responding")
    
@csrf_exempt
def AssignTask(request,id):
    if request.method == 'POST':
        values = json.loads(request.body.decode('UTF-8'))
        list = values['tasks']
        for task in list:
            task = AssignedTask(task=task, user=id)
            task.save()
        return HttpResponse(200)
    else:
        return HttpResponseNotAllowed("something went wrong.")

    