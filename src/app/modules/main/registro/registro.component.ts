import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClasificationService } from 'src/app/services/clasification.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-home',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  selectedFile: File | null = null;
  public registerPetForm: FormGroup;
  public imageUrl: string | null = null;
  public classifications: any[] = [];
  constructor(private fb: FormBuilder, private toast: ToastrService, private petService: PetsService,
    private classificationService: ClasificationService,
    private router: Router
  ){
    this.registerPetForm = this.fb.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      age: ['', Validators.required],
      clasification: ['', Validators.required],
      information: ['', Validators.required],
      comments: ['', Validators.required]
    });

    this.classificationService.getAll()
    .subscribe((e) => {
      if(e.success == true){
        this.classifications = e.result;
      }
    })
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if(file && file.type.includes('image')){
      this.selectedFile = file;
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    }else{
      this.imageUrl = null;
      event.target.vlaue = null;
      this.toast.error("Por favor seleccione un archivo de imagen válido", "Archivos", {
        timeOut: 4500
      })
    }
  }


  savePet(){
    this.petService.addPet(this.registerPetForm.value, this.selectedFile)
    .subscribe((e) => {
      if(e.success == true){
        this.toast.success(e.message ?? "Mascota agregada con éxito", "Registros", {
          timeOut: 4500
        });
        this.registerPetForm.reset();
        this.selectedFile = null;
        this.router.navigate(['/main/pets'])
      }else{
        this.toast.error(e.message ?? "Error al guardar la mascota", "Registros", {
          timeOut: 4500
        })
      }
    })
  }

}
