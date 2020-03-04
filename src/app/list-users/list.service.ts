import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  list(): Observable <any> {
    return this.http.get('http://127.0.0.1:8000/get-users');
    // headers:new HttpHeaders({ 'Authorisation':localStorage.getItem('userToken') }
  }
}
