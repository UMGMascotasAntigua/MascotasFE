import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FillingsRoutingModule } from './fillings-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FillingService } from 'src/app/services/filling.service';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    FillingsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FillingService, ToastrService]
})
export class FillingsModule { }
