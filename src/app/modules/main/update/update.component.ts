import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environment/environment';
import { ICanComponentDeactivate } from 'src/app/interfaces/ICanDeactivateComponent';
import { Pet } from 'src/app/models/Pet';
import { ClasificationService } from 'src/app/services/clasification.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements ICanComponentDeactivate{
  public pets: any[] = [];
  public classifications:any[] = [];
  public submitted: boolean = false;
  public updateForm: FormGroup;
  public selectedFile: File | null = null;
  public imageUrl: string | null = null;
  public photoEndpoint: string = `${environment.apiUrl}pet/photo/`;
  constructor(private activated: ActivatedRoute, private petService: PetsService, private fb: FormBuilder,
    private toast: ToastrService,
    private classificationService: ClasificationService,
    private router: Router
  ){
    this.updateForm = this.fb.group({
      pet: ['', Validators.required],
      name: ['', Validators.required],
      race: ['', Validators.required],
      state: ['', Validators.required],
      clasification: ['', Validators.required],
      age: [0, Validators.required],
      information: ['', Validators.required],
      comments: ['', Validators.required]
    });
    
    this.initRest();
  }

  public initRest(){
    this.classificationService.getAll()
    .subscribe((e) => {
      if(e.success == true){
        this.classifications = e.result;
      }
    })

    this.petService.getPets()
    .subscribe((e) => {
      if(e.success == true){
        this.pets = e.result
      }
    });
  }

  public setPetData(pet: string){
    const petFind: Pet = this.pets.find(p => p.Codigo_Mascota == pet);
    if(petFind == null || petFind == undefined){
      this.toast.warning("No se ha elegido una mascota para editar", "Selección", {
        timeOut: 4500
      })
    }else{
      this.updateForm.patchValue({
        name: petFind.Nombre_Mascota,
        race: petFind.Raza,
        age: petFind.Edad,
        information: petFind.Informacion,
        comments: petFind.Comentarios,
        state: petFind.Estado,
        clasification: petFind.Clasificacion.Codigo_Clasificacion.toString()
      });
    }
    
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

  canDeactivate(): boolean {
    if (this.updateForm.dirty && this.updateForm.touched && this.submitted == false) {
      return window.confirm('Tiene cambios sin guardar, desea salir?');
    }
    return true;
  }

  public saveChanges(){
    if(this.updateForm.valid){
      this.submitted = true;
      const value = this.updateForm.value;
      this.petService.updatePet(value.pet, value)
      .subscribe((e) => {
        if(e.success == true){
          this.toast.success(e.message ?? "Cambios guardados", "Registros", {
            timeOut: 3500
          });
          this.updateForm.reset();
          this.initRest();
          this.router.navigate(['/main/pets']);
        }
      })
    }
  }
}
