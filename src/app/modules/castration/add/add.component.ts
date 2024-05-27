import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  public pets:any[] = [];
  public addCastrationForm: FormGroup;
  constructor(private petService: PetsService, private fb: FormBuilder, private toast: ToastrService){
    this.addCastrationForm = this.fb.group({
      pet: ['', Validators.required],
      date: [null, Validators.required],
      comments: ['', Validators.required]
    })
    this.petService.getPets()
    .subscribe((e) => {
      if(e.success == true){
        this.pets = e.result;
      }
    })
  }

  public addCastration(){
    let value = this.addCastrationForm.value;
    this.petService.addCastration(value.pet, value.comments, new Date(value.date))
    .subscribe((e) => {
      if(e.success == true){
        this.toast.success(e.message ?? "Castración agregada con éxito", "Salud", {
          timeOut: 4500
        });
        this.addCastrationForm.reset();
      }else{
        this.toast.error(e.message ?? "Error al agregar la castración", "Salud", {
          timeOut: 4500
        });
      }
    })
  }
}
