import { Component } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import {Pet} from '../../../models/Pet';
import { environment } from 'src/app/environment/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public mascotas: Pet[] = [];
  public photoEndpoint: string = `${environment.apiUrl}pets/foto/`;
  constructor(private petsService: PetsService, private toastr: ToastrService){

    this.petsService.getPets()
    .subscribe((e) => {
      if(e.success == true){
        this.mascotas = e.result;
      }else{
        this.toastr.error(e.message ?? "Error al cargar los perros", "Carga de datos", {
          timeOut: 4500
        });
      }
    });
  }


  getPhoto(pet: Pet){
    console.log(pet.foto)
  }

  adoption(pet: Pet){

  }

  addToFavorites(pet: Pet){
    this.petsService.addToFavorites(pet)
    .subscribe((e) => console.log(e));
  }
}
