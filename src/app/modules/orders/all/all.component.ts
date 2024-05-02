import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent {
  orders:any[] = []; 
  constructor(private service: OrderService){
    this.service.getOrders()
    .subscribe((e) => {
      if(e.success == true){
        this.orders = e.result;
      }
    })
  }
}
