import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  private extractData(body:any){
    let data = body;
    return data || [] || {};
  }

  public saveOrder(order:any, detail: any){
    console.log(order)
    console.log(detail)
    return this.http.post("https://localhost:7147/orders/create", {
      orderInfo: order,
      details: detail
    })
    .pipe(map(this.extractData));
  }

  public getOrders(){
    return this.http.get("https://localhost:7147/orders/catalog")
    .pipe(map(this.extractData));
  }



}
