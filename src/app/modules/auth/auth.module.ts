import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService]
  
})

export class AuthModule { }
