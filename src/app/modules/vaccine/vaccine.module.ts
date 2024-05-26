import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { AddComponent } from './add/add.component';
import { AddPetComponent } from './add-pet/add-pet.component';


@NgModule({
  declarations: [
    AddComponent,
    AddPetComponent
  ],
  imports: [
    CommonModule,
    VaccineRoutingModule
  ]
})
export class VaccineModule { }
