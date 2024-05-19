import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('inicia guard')
  const router = new Router();
  const token = localStorage.getItem('pettoken') ?? "";
  console.log('verifica guard')

  if(token !== null && token !== ''){
    console.log('si hay token')
    console.log(token)
    return true;
  }
  console.log('no hay token')
  router.navigate(['/auth/login'])
  return false;
};
