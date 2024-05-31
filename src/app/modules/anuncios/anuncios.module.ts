import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './crear/crear.component';
import { AnunciosRoutingModule } from './anuncios-routing.module';
import { AnnouncesService } from 'src/app/services/announces.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    AnunciosRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AnnouncesService]
})
export class AnunciosModule { }
