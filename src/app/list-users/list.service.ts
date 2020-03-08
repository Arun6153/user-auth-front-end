import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private token:any;
  constructor(private http: HttpClient) {
    this.token=window.localStorage.getItem("userToken");
   }
  list(): Observable <any> {
    return this.http.get('http://127.0.0.1:8000/get-users',{headers:new HttpHeaders({ 'Authorization':this.token })});
  }
  edit(data): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/edit-user',data,{headers:new HttpHeaders({ 'Authorization':this.token })});
  }
  checkEmail(data): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/verify-email',data);
  }
  checkUserID(data): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/verify-userID',data);
  }
}
