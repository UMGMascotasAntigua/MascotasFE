import { Component, OnInit } from '@angular/core';
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
export class MenuComponent implements OnInit{
  public mascotas: Pet[] = [];
  public photoEndpoint: string = `${environment.apiUrl}pet/photo/`;
  public isAdmin: boolean = false;
  public isUser: boolean = false;
  userProfile: any;
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

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.auth.getUserProfile().subscribe((e) => {
        this.userProfile = e;
        this.setRoleFlags()
      }, error => {
        this.toastr.error("Error al obtener el perfil del usuario", "Perfiles", {
          timeOut: 4500
        });
      })
    }
  }

  setRoleFlags(): void {
    this.isAdmin = this.userProfile && this.userProfile.Perfil.Descripcion === 'Administrador';
    this.isUser = this.userProfile && this.userProfile.Perfil.Descripcion === 'Usuario';
  }


  adoption(pet: Pet){
    this.toastr.success("Adopción completa", "Adopción", {
      timeOut: 4500
    })
  }

  addToFavorites(pet: Pet){
    if(this.auth.isAuthenticated()){
      this.petsService.addToFavorites(pet)
      .subscribe((e) => {
        if(e.success == true){
          this.toastr.success(e.message ?? "Mascota agregada a favoritos", "Favoritos", {
            timeOut: 4500
          })
        }
      });
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

  toggleFavorite(mascota: any): void {
    const val = mascota.isFavorite;
    mascota.isFavorite = !mascota.isFavorite;
    this.addToFavorites(mascota);
    // if(mascota.isFavorite == false){
    //   this.addToFavorites(mascota)
    // }
  }

  removeFromFavorites(pet: any){

  }
}
