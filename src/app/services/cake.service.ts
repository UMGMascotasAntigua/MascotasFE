import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { map } from 'rxjs';
import { Cake } from '../models/Cake';

@Injectable()
export class CakeService {

  headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*')
  constructor(private http: HttpClient) { }

  private extractData(body:any){
    let data = body;
    return data || [] || {};
  }

  public getCakes(){
    return this.http.get("https://localhost:7147/cakes/catalog", {
      headers: this.headers
    })
    .pipe(map(this.extractData))
  }

  public getCakesOnStock(){
    return this.http.get("https://localhost:7147/cakes/catalog/instock", {
      headers: this.headers
    })
    .pipe(map(this.extractData))
  }

  public getFilteredCakes(filters: any[]){
    return this.http.post("https://localhost:7147/cakes/filter", {
      filters: filters
    })
    .pipe(map(this.extractData))
  }

  public addCake(cake: Cake){
    return this.http.post("https://localhost:7147/cakes/create", cake)
    .pipe(map(this.extractData))
  }
}
