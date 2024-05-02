import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/home',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
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
