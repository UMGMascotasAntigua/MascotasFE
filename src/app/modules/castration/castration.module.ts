import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CastrationRoutingModule } from './castration-routing.module';
import { AddComponent } from './add/add.component';
import { PetsService } from 'src/app/services/pets.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    CastrationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PetsService]
})
export class CastrationModule { }
