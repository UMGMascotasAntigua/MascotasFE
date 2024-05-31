import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CartComponent } from './cart/cart.component';
import { PetsService } from 'src/app/services/pets.service';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateComponent } from './update/update.component';
import { RegistroComponent } from './registro/registro.component';
import { ClasificationService } from 'src/app/services/clasification.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AnnouncesService } from 'src/app/services/announces.service';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    SearchComponent,
    CreateComponent,
    CartComponent,
    UpdateComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    FormsModule,
    CarouselModule.forRoot()
  ],
  providers: [
    PetsService,
    AuthService,
    ClasificationService,
    AnnouncesService
  ]
})
export class MainModule { }
