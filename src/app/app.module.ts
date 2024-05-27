import { NgModule } from '@angular/core';
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
      logoSize: 250,
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
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function getRandomMessage(): string{
  const mensajes = [
    "Cargando adorables mascotas...",
    "Espere, se están cargando adorables mascotas...",
    "¡Las mascotas más tiernas están en camino...",
    "Solo un momento, estamos preparando las mascotas...",
    "Mascotas lindas a punto de aparecer...",
    "Una variedad de mascotas están llegando...",
    "La ternura se está cargando, un momento...",
    "Mascotas en camino...",
    "¡Las mascotas están listas para ser descubiertas...",
    "Pronto podrás disfrutar de una tierna compañía animal...",
    "¡La ternura perfecta en camino...",
    "Un mundo de mascotas se avecina...",
    "El amor por las mascotas llena el aire...",
    "Nuestros amigos peludos están listos para ser descubiertos...",
    "¡Las mascotas más adorables en proceso...",
    "Guau, miau, grr..."
  ];

  if (mensajes.length === 0) {
    return "¡Cargando bellas mascotas!";
  }

  const indiceAleatorio = Math.floor(Math.random() * mensajes.length);
  const mensaje = mensajes.splice(indiceAleatorio, 1)[0];

  return mensaje;
}
