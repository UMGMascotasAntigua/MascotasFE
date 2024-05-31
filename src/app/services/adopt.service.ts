import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdoptService {

  public api: string = `${environment.apiUrl}auth/`
  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  constructor(private http: HttpClient){
    
  }
}
