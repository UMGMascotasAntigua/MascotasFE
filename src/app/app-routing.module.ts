import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [authGuard]
  },
  {
    path: 'flavors',
    loadChildren: () => import('./modules/flavors/flavors.module').then(f => f.FlavorsModule)
  },
  {
    path: 'fillings',
    loadChildren: () => import('./modules/fillings/fillings.module').then(f => f.FillingsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./modules/orders/orders.module').then(o => o.OrdersModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./modules/clients/clients.module').then(c => c.ClientsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
