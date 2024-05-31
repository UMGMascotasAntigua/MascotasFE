import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router, private toast: ToastrService){
    localStorage.clear();
    this.router.navigate(['/auth/login'])
    this.toast.success("Sesión cerrada con éxito", "Autenticación", {
      timeOut: 4500
    })
    .onShown.subscribe((e) => {
      window.location.reload()
    })
  }
}
