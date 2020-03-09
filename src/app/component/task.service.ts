import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient , HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  newTask(data):Observable<any>
  {
    const token=window.localStorage.getItem('userToken');
    return this.http.post('http://127.0.0.1:8000/new-task',data,{headers:new HttpHeaders({'Authorization':token})});
  }
}
