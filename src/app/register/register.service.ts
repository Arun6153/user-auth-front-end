import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }
  register(data): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/register',data);
  }
  checkEmail(data): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/verify-email',data);
  }
  checkUserID(data): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/verify-userID',data);
  }
}
