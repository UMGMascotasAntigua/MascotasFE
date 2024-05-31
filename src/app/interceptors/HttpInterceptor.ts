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
import Swal from 'sweetalert2';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {

  constructor(private loader: NgxUiLoaderService, private router: Router, private toast: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('petsToken') ?? null;
    // const token = localStorage.getItem('shoppaytoken') ?? null;
    // console.log(token)
    var newReq = null;
    if(token != null && token.trim() != "" && token.length > 0 && token != undefined){
        const headers = request.headers
        .set('Authorization', `Bearer ${token}`)
        newReq = request.clone({headers});
    }else{
        newReq = request;
    }
    
    this.loader.start();
    return next.handle(newReq).pipe(
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
            case 403:
              Swal.fire({
                icon: 'warning',
                titleText: 'Error: Recurso no permitido',
                text: 'Usted no cuenta con los permisos para realizar esta acción.',
                confirmButtonText: 'Cerrar',
              });
              break;
            case 500:
              Swal.fire({
                icon: 'error',
                titleText: 'Error del servidor',
                text: 'Ocurrió un error del servidor, vuelva a intentar más tarde.',
                confirmButtonText: 'Cerrar',
                html: `<code>${error.message} - ${error.status} - ${error.url}</code>`,
                footer: 'Vuelva a intentar más tarde'
              });
              break;
            case 401:
              Swal.fire({
                icon: 'error',
                titleText: 'No ha iniciado sesión o no tiene acceso a esta página',
                text: 'Debe ingresar con sus credenciales para poder continuar con la navegación',
                confirmButtonText: 'Cerrar'
              });
              localStorage.clear();
              this.router.navigate(['/auth/login'])
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