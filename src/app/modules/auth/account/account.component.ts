import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  public userInfo: any;
  public userInfoForm: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder){
    this.userInfoForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.required],
      date: [null, Validators.required],
      password: ['', Validators.required],
      newpassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    this.auth.getUserInfo()
    .subscribe((e) => {
      if(e.success == true){
        this.userInfo = e.result;
        this.userInfoForm.patchValue({
          username: this.userInfo.Usuario,
          email: this.userInfo.Correo,
          name: this.userInfo.Nombre_Usuario,
          date: this.userInfo.Fecha_Registro
        })
      }
    })
  }
}
