import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class AnnouncesService {
  
  constructor(private http: HttpClient) { }

  public api: string = `${environment.apiUrl}announce/`
  private extractData<T>(response:any): T{
    return response || {} as T;
  }

  public getAll() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.api)
    .pipe(map(this.extractData<ApiResponse>));
  }

  public addAnnounce(data: any, file: File | null): Observable<ApiResponse> {
    const formData = new FormData();

    formData.append('Tipo_Anuncio', data.Tipo_Anuncio);
    formData.append('Titulo', data.Titulo);
    formData.append('Descripcion', data.Descripcion);
    formData.append('Fecha_Evento', data.Fecha_Evento); // Fecha en formato ISO
    formData.append('Lugar', data.Lugar);
    formData.append('Telefono', data.Telefono);
    formData.append('Email', data.Email);
    formData.append('file', file ?? new Blob(), file?.name);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    return this.http.post<ApiResponse>(this.api, formData, { headers })
        .pipe(map(this.extractData<ApiResponse>));
}

}
