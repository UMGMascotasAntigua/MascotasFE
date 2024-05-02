import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CakeService } from 'src/app/services/cake.service';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createForm: FormGroup;
  clients:any[] = [];
  products: any[] = [];
  orderProducts:any[] = [];
  selectedProducts: any[] = [];
  selectedProduct:any = null;

  orderDetails:any = {
    cake: null,
    count: 1
  }
  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private cakeService: CakeService,
    private toastr: ToastrService,
    private orderService: OrderService){
    this.createForm = this.fb.group({
      clientId: [0, Validators.required],
      date: [new Date(), Validators.required],
      state: ['in progress', Validators.required],
      total: [0.00, Validators.required],
      shipAddress: ['', Validators.required],
      notes: ['', Validators.required],
      deliveredDate: [new Date(), Validators.required],
      shipMethod: ['', Validators.required]
    });

    this.clientService.getClients()
    .subscribe((e) => {
      if(e.success == true){
        this.clients = e.result;
      }
    })

    this.cakeService.getCakesOnStock()
    .subscribe((e) => {
      if(e.success == true){
        this.products = e.result;
      }
    })
  }

  public saveOrder(){
    this.orderService.saveOrder(this.createForm.value, this.orderProducts)
    .subscribe((e) => {
      if(e.success == true){
        this.toastr.success(e.message, "Ordenes", {
          timeOut: 400
        });
      }else{
        this.toastr.error(e.message, "Ordenes", {
          timeOut: 400
        });
      }
    })
  }

  public radioChange(product:any){
    this.selectedProduct = product;
  }

  public validateStock(evn: any){
    var value = evn.target.value;
    if(value > this.selectedProduct.stock){
      this.toastr.warning("Solo hay " + this.selectedProduct.stock + " unidades", "Stock insuficiente",{
        timeOut: 4500
      })
      this.orderDetails.count = 1;
    }
  }

  public addToDetails(){
    let toAdd = {
      id: this.selectedProduct.id,
      name: this.selectedProduct.name,
      description: this.selectedProduct.description,
      count: this.orderDetails.count
    };

    const selected = this.products.find(p => p.id == this.selectedProduct.id);
    if(selected && selected.stock > 0){
      selected.stock = selected.stock - this.orderDetails.count
    }
    this.selectedProducts.push(toAdd);
    let detail = {
      cake: this.selectedProduct.id,
      count: this.orderDetails.count,
      unitPrice: this.selectedProduct.price
    };
    this.orderProducts.push(detail);
    console.log(this.orderProducts);
    this.orderDetails.count = 1;
    this.selectedProduct = null;
    this.toastr.success("Pastel(es) agregado(s)", "Orden", {
      timeOut: 4000
    })
  }
}
