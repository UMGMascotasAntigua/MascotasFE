import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class FamilyService {

  constructor(private http: HttpClient) { }

  private extractData(body:any){
    let data = body;
    return data || [] || {};
  }

  public getFamilies(){
    return this.http.get("https://localhost:7147/family/catalog")
    .pipe(map(this.extractData))
  }

}
