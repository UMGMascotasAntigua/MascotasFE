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

  ngOnInit(): void {
      // this.router.events.subscribe((e) =)
  }

  constructor(private router: Router, private toast: ToastrService, private auth: AuthService){
    this.menus = [
      {
        name: 'Inicio',
        route: '/main/home',
        type: 'simple'
      },
      {
        name: 'Mascotas',
        route: '/main/pets',
        type: 'dropdown',
        children: [
          {
            name: 'Editar mascota',
            route: '/main/update'
          }
        ]
      },
      {
        name: 'Buscar mascotas',
        route: '/main/search',
        type: 'simple'
      },
      {
        name: 'Vacunas',
        route: '',
        type: 'dropdown',
        children: [
          {
            name: 'Agregar Vacuna',
            route: '/vacunas/agregar',
          },
          {
            name: 'Vacunar',
            route: '/vacunas/vacunar',
          }
        ]
      },
      {
        name: 'Castración',
        route: '/castracion',
        type: 'simple'
      },
      {
        name: auth.isAuthenticated() ? "Mi cuenta" : "Iniciar sesión",
        route: auth.isAuthenticated() ? "/auth/account" : "/auth/login",
        type: 'simple'
      }
    ]
  }

  get items():any[]{
    return [];
  }
}
