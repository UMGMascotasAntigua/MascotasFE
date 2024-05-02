import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {

  constructor(private loader: NgxUiLoaderService, private router: Router, private toast: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const token = localStorage.getItem('shoppaytoken') ?? null;
    // var newReq = null;
    // if(token != null && token.trim() != "" && token.length > 0){
    //     const headers = request.headers
    //     .set('Authorization', `Bearer ${token}`)
    //     newReq = request.clone({headers});
    // }else{
    //     newReq = request;
    // }
    
    this.loader.start();
    return next.handle(request).pipe(
      catchError((error: any) => {
        if(error instanceof HttpErrorResponse){
          switch(error.status){
            case 0:
              this.toast.error(`No se pudo acceder al recurso ${error.url}. 
              Puede ser que los servidores estén apagados. Intente más tarde`, "Error del sistema", {
                timeOut: 6000,
                tapToDismiss: true
              })
            break;
            default:
              this.toast.warning(`Ocurrió un error inesperado: 
              Código: ${error.status}.`, "Error del sistema", {
                timeOut: 6000,
                tapToDismiss: true
              })
          }
        }
        
        // if(error instanceof HttpErrorResponse){
        //   switch(error.status){
        //     case 0:
        //       this.toastr.error('Parece que ocurrió un error en el server o está apagado. Intente más tarde',
        //        'Error de conexión a servers', {
        //         timeOut: 5500
        //       })
        //     break;
        //     case 500:
        //       this.toastr.info(error.statusText, 'Error HTTP', {
        //         timeOut: 3500
        //       })
        //     break;
        //     case 401:
        //       this.toastr.warning('No cuenta con acceso o credenciales', 'Acceso no autorizado', {
        //         timeOut: 3500
        //       });
        //       this.router.navigate(['401']);
        //     break;
        //     case 404:
        //       this.toastr.warning('El recurso solicitado retornó (404, No Existe)', 'Recurso no disponible', {
        //         timeOut: 4200
        //       });
        //       // this.router.navigate(['notfound']);
        //     break;
        //     case 422:
        //       this.toastr.warning('Entidad no procesable, puede que el token no cuente con suficientes argumentos. La sesión será destruída. ', 'Error 422 (Token inválido)', {
        //         timeOut: 4200
        //       });
        //       localStorage.clear();
        //        this.router.navigate(['auth/login']);
        //     break;
        //     default:
        //       this.toastr.error(error.statusText, 'Error HTTP', {
        //         timeOut: 3500
        //       })
        //     break;
        //   }
          
        // }
        return throwError(error);
      }),
      finalize(() => {
        this.loader.stop();
      })
    )
  }
}