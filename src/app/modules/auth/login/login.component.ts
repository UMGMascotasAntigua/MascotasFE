import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public form: FormGroup;

  constructor(private _fb: FormBuilder, private toastr: ToastrService, private auth: AuthService){
    this.form = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  public doLogin(){
    if(!this.form.valid){
      this.toastr.warning("Debe completar todos los campos", "Formulario incompleto", {
        timeOut: 3500
      })
    }else{
      this.auth.doLogin(this.form.controls['email'].value, this.form.controls['password'].value)
      .subscribe((e) => console.log(e))
    }
  }
}
