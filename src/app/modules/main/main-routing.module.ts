import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { CartComponent } from './cart/cart.component';
import { UpdateComponent } from './update/update.component';
import { RegistroComponent } from './registro/registro.component';
import { CanDeactivateGuard } from 'src/app/guards/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: RegistroComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pets',
    component: MenuComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'update',
    component: UpdateComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
