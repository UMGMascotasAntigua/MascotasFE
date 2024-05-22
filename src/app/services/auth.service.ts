import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}auth/`
  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  public doLogin(user: string, password: string){
    return this.http.post(`${this.api}/login`, {
      user: user,
      password: password
    })
    .pipe(map(this.extractData))
  }
}
