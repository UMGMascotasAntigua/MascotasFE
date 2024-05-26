import { Component } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import {Pet} from '../../../models/Pet';
import { environment } from 'src/app/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public mascotas: Pet[] = [];
  public photoEndpoint: string = `${environment.apiUrl}pet/photo/`;
  constructor(private petsService: PetsService, private toastr: ToastrService, public auth: AuthService){

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

  adoption(pet: Pet){
    this.toastr.success("Adopción completa", "Adopción", {
      timeOut: 4500
    })
  }

  addToFavorites(pet: Pet){
    if(this.auth.isAuthenticated()){
      this.petsService.addToFavorites(pet)
      .subscribe((e) => console.log(e));
    }else{
      Swal.fire({
        titleText: "Necesita un usuario para hacer esto",
        text: "Para agregar a favoritos o adoptar, requiere tener una cuenta de usuario",
        confirmButtonText: 'Cerrar',
        footer: "Su experiencia será más completa al obtener un usuario.",
        icon: 'info'
      })
    }
    
  }
}
