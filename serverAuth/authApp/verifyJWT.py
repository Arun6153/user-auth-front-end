import jwt
from django.db import connection
import logging


cursor = connection.cursor()


def checkJwt(token):
    try:
        payload = jwt.decode(token,"WANNA_BREACH", algorithm='HS256')
        if payload['email']:
            return payload['email']
    except jwt.ExpiredSignatureError as e:
        logging.error(e)
        return 'error'
    except jwt.InvalidSignatureError:
        logging.error(e)
        return 'error'
