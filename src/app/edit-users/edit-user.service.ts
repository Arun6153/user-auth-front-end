import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private token:any
  constructor(private http: HttpClient) {
    this.token=window.localStorage.getItem("userToken");
   }
  edit(data): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/edit-user',data);
  }
 user():Observable <any> {
   return this.http.post('http://127.0.0.1:8000/user',{headers:new HttpHeaders({ 'Authorization':this.token })});
 }
}
