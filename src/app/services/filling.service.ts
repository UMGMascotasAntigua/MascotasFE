import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class FillingService {

  constructor(private http: HttpClient) { }

  private extractData(body:any){
    let data = body;
    return data || [] || {};
  }

  public getFillings(){
    return this.http.get("https://localhost:7147/filling/catalog")
    .pipe(map(this.extractData))
  }

  public saveFilling(body: any){
    return this.http.post("https://localhost:7147/filling/create", body)
    .pipe(map(this.extractData));
  }
}
