import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CakeService } from 'src/app/services/cake.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CartService } from 'src/app/services/cart.service';
import { FamilyService } from 'src/app/services/family.service';
import { FillingService } from 'src/app/services/filling.service';
import { FlavorService } from 'src/app/services/flavor.service';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    SearchComponent,
    CreateComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    FormsModule,
  ],
  providers: [CakeService, CartService, FamilyService, FillingService, FlavorService]
})
export class MainModule { }
