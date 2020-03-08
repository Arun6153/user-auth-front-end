import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private token:any
  constructor(private http: HttpClient) {
    this.token = JSON.parse(window.localStorage.getItem("userToken"));
   }
  edit(data): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/edit-user', data);
  }
  user(): Observable<any> {
    console.log(this.token);
    return this.http.get('http://127.0.0.1:8000/user', { headers: new HttpHeaders({ 'Authorization': this.token['token'] }) });
  }
  update(data): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/update-logged-user',data,{ headers: new HttpHeaders({ 'Authorization': this.token['token'] }) })
  }
}
