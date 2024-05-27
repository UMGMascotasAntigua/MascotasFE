import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}vaccine/`

  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  public getVaccines(): Observable<ApiResponse>{
    return this.http.get(`${this.api}`)
    .pipe(map(this.extractData<any>))
  }

  public addVaccine(name: string, comments: string) : Observable<ApiResponse>{
    return this.http.post(`${this.api}`, {
      name: name,
      comments: comments
    }).pipe(map(this.extractData<any>));
  }
}
