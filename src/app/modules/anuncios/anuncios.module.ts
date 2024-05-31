import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './crear/crear.component';
import { AnunciosRoutingModule } from './anuncios-routing.module';



@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    AnunciosRoutingModule
  ]
})
export class AnunciosModule { }
