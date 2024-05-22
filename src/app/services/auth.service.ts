import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}auth/`
  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  public doLogin(user: string, password: string) : Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.api}login`, {
      user: user,
      password: password
    })
    .pipe(map(this.extractData<ApiResponse>))
  }
}
