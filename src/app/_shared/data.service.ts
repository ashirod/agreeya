import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http:HttpClient) { }

  getData(){
    return this._http.get('https://dummyjson.com/users');
  }
}
