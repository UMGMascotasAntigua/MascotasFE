import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PetsService } from 'src/app/services/pets.service';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {
  public addVaccinationForm: FormGroup;
  public vaccines: any[] = [];
  public pets: any[] = [];
  constructor(private vaccineService: VaccineService, private petsService: PetsService, private fb: FormBuilder,
    private toast: ToastrService
  ){
    this.addVaccinationForm = this.fb.group({
      pet: [null, Validators.required],
      vaccine: ['', Validators.required],
      date: ['', Validators.required]
    })
    this.vaccineService.getVaccines()
    .subscribe((v) => {
      if(v.success == true){
        this.vaccines = v.result;
      }
    })

    this.petsService.getPets()
    .subscribe((p )=> {
      if(p.success == true){
        this.pets = p.result;
      }
    })
  }

  public registerVaccine(){
    if(!this.addVaccinationForm.valid){
      this.toast.error("Complete todos los campos", "Formulario incompleto", {
        timeOut: 4000
      })
    }else{
      let value = this.addVaccinationForm.value;

      this.petsService.applyVaccine(value.pet, value.vaccine, new Date(value.date))
      .subscribe((e) => {
        if(e.success == true){
          this.toast.success("Vacunación agregada a la mascota!", "Vacunación", {
            timeOut: 4500
          });
        }else{
          this.toast.error(e.message ?? "Error al agregar la vacuna", "Vacunación", {
            timeOut: 4500
          });
        }
      });
      
      this.addVaccinationForm.reset()
    }
  }
}
