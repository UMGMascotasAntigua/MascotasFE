import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlavorService } from 'src/app/services/flavor.service';

@Component({
  selector: 'app-flavor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createForm: FormGroup;
  constructor(private fb: FormBuilder, private flavorService: FlavorService,
    private toastr: ToastrService){
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  public saveFlavor(){
    this.flavorService.saveFlavor(this.createForm.value)
    .subscribe((e) => {
      if(e.success == true){
        this.toastr.success(e.message, "Sabores", {
          timeOut: 4000
        });
        this.createForm.reset()
      }else{
        this.toastr.error(e.message, "Sabores", {
          timeOut: 4000
        })
      }
    })
  }
}
