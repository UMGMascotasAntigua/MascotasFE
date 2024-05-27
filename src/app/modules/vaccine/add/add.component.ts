import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  public addVaccineForm: FormGroup;
  constructor(private fb: FormBuilder, private vaccineService: VaccineService,
    private toast: ToastrService
  ){
    this.addVaccineForm = this.fb.group({
      name: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }

  

  public addVaccine(){
    if(this.addVaccineForm.valid){
      let value = this.addVaccineForm.value;
      this.vaccineService.addVaccine(value.name, value.comments)
      .subscribe((e) => {
        if(e.success == true){
          this.toast.success("Vacuna agregada con éxito", "Vacunas", {
            timeOut: 4500
          });
        }else{
          this.toast.error(e.message ?? "Error al agregar la vacuna", "Vacunas", {
            timeOut: 4500
          });
        }
      })
    }else{
      this.toast.error("Complete todos los campos", "Formulario incompleto", {
        timeOut: 4000
      })
    }
    
  }

}
