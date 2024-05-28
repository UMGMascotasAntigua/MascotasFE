import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpReqInterceptor } from './interceptors/HttpInterceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from './services/auth.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      tapToDismiss: true,
      autoDismiss: true,
      closeButton: true,
      progressAnimation: "decreasing",
      newestOnTop: true,
      progressBar: true
    }),
    NgxUiLoaderModule.forRoot({
      bgsColor: '#fff',
      logoUrl: '../assets/img/loader.gif',
      logoSize: 320,
      logoPosition: 'center-center',
      blur: 50,
      text: 'Cargando...',
      fgsType: 'three-bounce',
      fgsSize: 75,
      fgsColor: '#fff',
      textPosition: 'center-center',
      hasProgressBar: true
    }),
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
