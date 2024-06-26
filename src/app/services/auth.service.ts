import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}auth/`
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
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

  public isAuthenticated(): boolean | Promise<boolean>{
    const token = localStorage.getItem('petsToken');
    if(token != null && token !== '' && token !== undefined){
      return true;
    }
    return false;
  }

  public setAuthenticated(){
    this.isAuthenticatedSubject.next(true);
  }

  public getUserProfile() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.api}profile`)
    .pipe(map(this.extractData<ApiResponse>));
  }

  public getUserInfo() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.api}info`)
    .pipe(map(this.extractData<ApiResponse>));
  }
}
