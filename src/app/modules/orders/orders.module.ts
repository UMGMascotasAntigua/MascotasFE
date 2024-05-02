import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';
import { CakeService } from 'src/app/services/cake.service';
import { OrderService } from 'src/app/services/product.service';
import { AllComponent } from './all/all.component';


@NgModule({
  declarations: [
    CreateComponent,
    AllComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ToastrService, ClientService, CakeService, OrderService]
})
export class OrdersModule { }
