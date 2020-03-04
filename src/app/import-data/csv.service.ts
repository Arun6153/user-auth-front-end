import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http:HttpClient) { }
  csvSend(file): Observable <any> {
    const token=window.localStorage.getItem('userToken');
    return this.http.post('http://127.0.0.1:8000/upload-csv',file,{headers:new HttpHeaders({'Authorization':token})});
  }
}
