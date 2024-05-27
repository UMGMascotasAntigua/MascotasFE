import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public form: FormGroup;

  constructor(private _fb: FormBuilder, private toastr: ToastrService, private auth: AuthService,
    private router: Router
  ){
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public doLogin(){
    if(!this.form.valid){
      this.toastr.warning("Debe completar todos los campos o verificar que esté correcto", "Formulario no válido", {
        timeOut: 4500
      });
    }else{
      this.auth.doLogin(this.form.controls['email'].value, this.form.controls['password'].value)
      .subscribe((e) => {
        if(e.success == true){
          this.auth.setAuthenticated();
          localStorage.setItem('petsToken', e.result ?? "");
          this.router.navigate(['/main/home'])
          .then(() => {
            window.location.reload()
          })
        }else{
          this.toastr.error(e.message ?? "Error de autenticación", "Autenticación", {
            timeOut: 4500
          })
        }
      })
    }
  }
}
