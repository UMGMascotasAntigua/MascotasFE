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
    return this.http.patch<ApiResponse>(`${this.api}favorite`, {
      pet: pet.Codigo_Mascota
    })
    .pipe(map(this.extractData<ApiResponse>))
  }

  public applyVaccine(petCode: number, vaccineCode: number, date: Date):Observable<ApiResponse>{
    return this.http.patch<ApiResponse>(`${this.api}vaccines/apply`, {
      pet: Number(petCode),
      vaccine: Number(vaccineCode),
      date: date
    })
    .pipe(map(this.extractData<ApiResponse>))
  }

  public addCastration(petCode: number, comments: string, date: Date) : Observable<ApiResponse>{
    return this.http.patch<ApiResponse>(`${this.api}castration/add`, {
      pet: Number(petCode),
      comments: comments,
      date: date
    })
    .pipe(map(this.extractData<ApiResponse>));
  }
}
