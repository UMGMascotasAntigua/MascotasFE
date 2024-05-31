import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import {Pet} from '../../../models/Pet';
import { environment } from 'src/app/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { IStepperOptions, IWizardStep } from 'ngx-form-wizard';
import { RegistroComponent } from '../registro/registro.component';
import { Step1Component } from '../adopt/step1.component';
import { Step2Component } from '../adopt/step2.component';
import { Step3Component } from '../adopt/step3.component';
import { Step4Component } from '../adopt/step4.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  public mascotas: Pet[] = [];
  public photoEndpoint: string = `${environment.apiUrl}pet/photo/`;
  public selectedPet: Pet | null = null;
  public isAdmin: boolean = false;
  public isUser: boolean = false;
  userProfile: any;
  public steps: IWizardStep[] = [
    {
      id: 1,
      title: 'Información personal',
      description: 'Ingreso de información personal',
      data: null,
      component: Step1Component
    },
    {
      id: 2,
      title: 'Información de mascota',
      description: 'Verificación de datos de mascota',
      data: this.selectedPet,
      component: Step2Component
    },
    {
      id: 3,
      title: 'Aceptar términos',
      description: 'Usted acepta términos de servicio y condiciones',
      data: null,
      component: Step3Component
    },
    {
      id: 4,
      title: 'Confirmación',
      description: 'Confirmar adopción',
      data: null,
      component: Step4Component
    }
  ];

  public stepperOptions: IStepperOptions = {
    custom: false,
    position: 'top',
  };
  public form: FormGroup;
  public petData: Pet | null = null
  public userInfo: any = null;
  
  constructor(private petsService: PetsService, private toastr: ToastrService, public auth: AuthService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      accept: [false, Validators.requiredTrue],
      terms: [false, Validators.requiredTrue],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaRecoleccion: ['', Validators.required],
      comentarios: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeForm()
    if(this.auth.isAuthenticated()){
      this.auth.getUserProfile().subscribe((e) => {
        this.userProfile = e;
        this.setRoleFlags()
      }, error => {
        this.toastr.error("Error al obtener el perfil del usuario", "Perfiles", {
          timeOut: 4500
        });
      })
      this.auth.getUserInfo().subscribe((e) => {
        if(e.success == true){
          this.userInfo = e.result
        }
      })
    }

    this.getPets();
  }

  initializeForm(): void {
    
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

  public cancelAdopt(){
    this.toastr.warning("Se canceló el proceso de adopción", "Adopción", {
      timeOut: 4500
    });
    window.location.reload();
  }


  adoption(pet: Pet){
    this.toastr.success("Adopción completa", "Adopción", {
      timeOut: 4500
    })
  }

  addToFavorites(pet: Pet){
    this.petsService.addToFavorites(pet)
      .subscribe((e) => {
        if(e.success == true){
          this.toastr.success(e.message ?? "Mascota agregada a favoritos", "Favoritos", {
            timeOut: 4500
          })
        }
      });
  }

  toggleFavorite(mascota: any): void {
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
      html: "Teniendo en cuenta la responsabilidad que esto conlleva, y aceptando nuestros términos de servicio y condiciones, además de los <a href='https://shorturl.at/swAAE'>derechos animales</a>",
      imageUrl: `${this.photoEndpoint}${pet.Codigo_Mascota}`,
      imageAlt: `Foto de ${pet.Nombre_Mascota}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, adoptar",
      cancelButtonText: "Cancelar",
      footer: "<a href='' (click)='showTerms()'>Términos de servicio y condiciones</a>",
    })
    .then((r )=> {
      if(r.isConfirmed){

      }
    })
  }

  public showTerms(){
    alert("xd")
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

  public setPet(pet: Pet){
    this.petData = pet;
  }

  public finishAdopt(){
    window.location.reload();
  }

  onSubmit(): void {
    if (this.form.valid) {
      if(this.petData != null){
        this.petsService.adoptPet(this.userInfo, this.petData, this.form.value)
        .subscribe((e) => {
          if(e.success == true){
            Swal.fire({
              titleText: 'Adopción completada',
              text: 'Recuerde presentar su identificación al acudir a nuestras instalaciones',
              icon: "success",
              confirmButtonText: "Cerrar"
            });
            this.getPets();
          }else{
            this.toastr.error(e.message ?? "Error al completar la adopción", "Adopciones", {
              timeOut: 4500
            })
          }
        })
      }else{
        this.toastr.error("Mascota no seleccionada", "Registros", {
          timeOut: 4500
        })
      }
    }
  }
}
