import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnouncesService } from 'src/app/services/announces.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  public createForm: FormGroup;
  public selectedFile: File | null = null;
  public imageUrl: string | null = null;
  constructor(private announceService: AnnouncesService, private fb: FormBuilder,
    private toast: ToastrService, private router: Router
  ){
    this.createForm = this.fb.group({
      Tipo_Anuncio: ['', Validators.required],
      Titulo: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Fecha_Evento: ['', Validators.required],
      Lugar: ['', Validators.required],
      Telefono: ['', Validators.required],
      Email: ['', Validators.required] 
    });
    
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

  public saveAnnounce(){
    if(this.createForm.valid){
      this.announceService.addAnnounce(this.createForm.value, this.selectedFile)
      .subscribe((e) => {
        if(e.success == true){
          this.toast.success(e.message ?? "Anuncio añadido", "Anuncios", {
            timeOut: 4500
          })
          this.createForm.reset();
          this.router.navigate(['/main/home'])
        }
      })
    }else{
      this.toast.error("El formulario no es válido, verifique.", "Formulario incompleto", {
        timeOut: 4500
      })
    }
  }
  
}
