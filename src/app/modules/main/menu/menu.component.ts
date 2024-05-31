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

    this.getPets();
  }

  getPets(){
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

  public adoptPet(pet: Pet){
    Swal.fire({
      title: `Desea adoptar a ${pet.Nombre_Mascota}?`,
      html: "Teniendo en cuenta la responsabilidad que esto conlleva, y aceptando nuestros términos de servicio y condiciones, además de los <a href='#derechos'>derechos animales</a>",
      imageUrl: `${this.photoEndpoint}${pet.Codigo_Mascota}`,
      imageAlt: `Foto de ${pet.Nombre_Mascota}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, adoptar",
      cancelButtonText: "Cancelar",
      footer: "<a href='#terms'>Términos de servicio y condiciones</a>",
    })
    .then((r )=> {
      if(r.isConfirmed){

      }
    })
  }

  public deletePet(pet: Pet){
    Swal.fire({
      title: 'Desea eliminar la mascota?',
      text: 'Este cambio no podrá ser revertido y se perderá toda la información relacionada',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar"
    })
    .then((r )=> {
      if(r.isConfirmed){
        this.petsService.deletePet(pet.Codigo_Mascota)
        .subscribe((e) => {
          if(e.success == true){
            this.toastr.success(e.message ?? "Mascota eliminada con éxito", "Registros", {
              timeOut: 4500
            });
            this.mascotas = [];
            this.getPets();
          }else{
            if(pet.Castraciones.length > 0 && pet.Vacunas_Det.length > 0){
              this.toastr.error("El registro no se puede borrar, ya que tiene relación con vacunas y/o castraciones.", "Registros", {
                timeOut: 4500
              })
            }else{
              this.toastr.error(e.message ?? "Error al eliminar la mascota", "Registros", {
                timeOut: 4500
              })
            }
            
          }
        })
      }
    })
  }

  public deleteCastration(pet: Pet, index: number){
    const castration = pet.Castraciones[index];
    this.petsService.deleteCastration(castration.Codigo_Castracion, castration.Codigo_Mascota)
    .subscribe((e) => {
      if(e.success == true){
        this.toastr.success(e.message ?? "Castración eliminada", "Registros", {
          timeOut: 3500
        });
        this.getPets();
      }
    })
  }

  public deleteVaccine(pet: Pet, index: number){
    const vaccine = pet.Vacunas_Det[index];
    this.petsService.deleteVaccine(vaccine.Codigo_Mvd)
    .subscribe((e) => {
      if(e.success == true){
        this.toastr.success(e.message ?? "Vacuna eliminada", "Registros", {
          timeOut: 3500
        });
        this.getPets();
      }
    })
  }
}
