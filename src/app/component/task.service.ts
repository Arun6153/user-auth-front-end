import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  token: any
  constructor(private http: HttpClient) {
    this.token = window.localStorage.getItem('userToken');
   }
  newTask(data): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/new-task', data, { headers: new HttpHeaders({ 'Authorization': this.token }) });
  }
  GetListOfTasks(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/tasks', { headers: new HttpHeaders({ 'Authorization': this.token }) });
  }
}
