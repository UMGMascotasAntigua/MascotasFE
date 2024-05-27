import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class ClasificationService {

  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}clasification/`

  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  public getAll(): Observable<ApiResponse>{
    return this.http.get(`${this.api}`)
    .pipe(map(this.extractData<ApiResponse>));
  }
}
