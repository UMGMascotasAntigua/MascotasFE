import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class PetsService {
  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}pets/`

  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  public getPets(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.api}all/`)
    .pipe(map(this.extractData<ApiResponse>))
  }
}
