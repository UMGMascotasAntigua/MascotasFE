import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class FlavorService {

  constructor(private http: HttpClient) { }

  private extractData(body:any){
    let data = body;
    return data || [] || {};
  }

  public getFlavors(){
    return this.http.get("https://localhost:7147/flavor/catalog")
    .pipe(map(this.extractData))
  }

  public saveFlavor(body: any){
    return this.http.post("https://localhost:7147/flavor/create", body)
    .pipe(map(this.extractData));
  }

}
