import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Pet } from '../models/Pet';

@Injectable()
export class PetsService {
  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}pet/`

  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  public getPets(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.api}`)
    .pipe(map(this.extractData<ApiResponse>))
  }

  public addToFavorites(pet: Pet): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.api}favorites/add/${pet.Codigo_Mascota}`, null)
    .pipe(map(this.extractData<ApiResponse>))
  }
}
