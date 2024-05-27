import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CastrationRoutingModule } from './castration-routing.module';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    CastrationRoutingModule
  ]
})
export class CastrationModule { }
