import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AddPetComponent } from './add-pet/add-pet.component';

const routes: Routes = [
  {
    path: '',
    component: AddComponent
  },
  {
    path: 'agregar',
    component: AddComponent
  },
  {
    path: 'vacunar',
    component: AddPetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule { }
