import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  private extractData(body:any){
    let data = body;
    return data || [] || {};
  }

  public getClients(){
    return this.http.get("https://localhost:7147/clients/all")
    .pipe(map(this.extractData));
  }
  
  public saveClient(body: any){
    return this.http.post("https://localhost:7147/clients/create", body)
    .pipe(map(this.extractData));
  }
}
