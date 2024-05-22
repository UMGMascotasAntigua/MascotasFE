import { Component } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import {Pet} from '../../../models/Pet';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public mascotas: Pet[] = [];
  public photoEndpoint: string = `${environment.apiUrl}pets/foto/`;
  constructor(private petsService: PetsService){
    console.log(this.photoEndpoint)

    this.petsService.getPets()
    .subscribe((e) => {
      if(e.success == true){
        this.mascotas = e.result;
      }
    });
  }

  toggleFlip(mascota: Pet): void {
    // mascota.flip = !mascota.flip;
  }

  adoptar(mascota: Pet): void {
    // mascota.adoptada = true;
  }

  toggleFavorita(mascota: Pet): void {
    // mascota.favorita = !mascota.favorita;
  }

  getPhoto(pet: Pet){
    console.log(pet.foto)
  }
}
