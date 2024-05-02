import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlavorsRoutingModule } from './flavors-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlavorService } from 'src/app/services/flavor.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    FlavorsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FlavorService, ToastrService]
})
export class FlavorsModule { }
