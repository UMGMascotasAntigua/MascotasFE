import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  menus: any[] = []
  public userProfile: any;
  constructor(private router: Router, private toast: ToastrService, private auth: AuthService){
    
  }

  ngOnInit(): void {
      if(this.auth.isAuthenticated()){
        this.auth.getUserProfile()
        .subscribe( profile => {
          this.userProfile = profile;
          this.loadMenus()
        }, error => {
          this.toast.error("Error al cargar el perfil del usuario", "Perfiles", {
            timeOut: 3500
          })
        });
      }else{
        this.loadMenus()
      }
  }

  

  public loadMenus(){
    const isAdmin = this.userProfile && this.userProfile.Perfil.Descripcion === 'Administrador';
    const isUser = this.userProfile && this.userProfile.Perfil.Descripcion === 'Usuario';

    this.menus = [
      {
        name: 'Inicio',
        route: '/main/home',
        type: 'simple',
        visible: true
      },
      {
        name: 'Mascotas',
        route: '/main/pets',
        type: 'dropdown',
        visible: isAdmin | isUser,
        children: [
          {
            name: 'Crear',
            route: '/main/add',
            visible: isAdmin
          },
          {
            name: 'Listado',
            route: '/main/pets',
            visible: isUser | isAdmin
          },
          {
            name: 'Editar mascota',
            route: '/main/update',
            visible: isAdmin
          }
        ]
      },
      {
        name: 'Buscar mascotas',
        route: '/main/search',
        type: 'simple',
        visible: true
      },
      {
        name: 'Vacunas',
        route: '',
        type: 'dropdown',
        visible: isAdmin,
        children: [
          {
            name: 'Agregar Vacuna',
            route: '/vacunas/agregar',
            visible: isAdmin
          },
          {
            name: 'Vacunar',
            route: '/vacunas/vacunar',
            visible: isAdmin
          }
        ]
      },
      {
        name: 'Castración',
        route: '/castracion/add',
        type: 'simple',
        visible: isAdmin
      },
      {
        name: this.auth.isAuthenticated() ? "Mi cuenta" : "Iniciar sesión",
        route: this.auth.isAuthenticated() ? "/auth/account" : "/auth/login",
        type: 'simple',
        visible: true
      }
    ]

    this.menus = this.menus.filter(menu => menu.visible !== false);
  }

  get items():any[]{
    return [];
  }
}
