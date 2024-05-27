import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { AddComponent } from './add/add.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PetsService } from 'src/app/services/pets.service';


@NgModule({
  declarations: [
    AddComponent,
    AddPetComponent
  ],
  imports: [
    CommonModule,
    VaccineRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PetsService]
})
export class VaccineModule { }
