import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/home',
    pathMatch: 'full'
  },
    {
      path:'anuncios',loadChildren: () => import('./modules/anuncios/anuncios.module').then(m => m.AnunciosModule),
    },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'vacunas',
    loadChildren: () => import('./modules/vaccine/vaccine.module').then(m => m.VaccineModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'castracion',
    loadChildren: () => import('./modules/castration/castration.module').then(c => c.CastrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
