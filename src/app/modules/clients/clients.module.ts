import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ToastrService, ClientService]
})
export class ClientsModule { }
