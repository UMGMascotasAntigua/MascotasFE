import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FillingService } from 'src/app/services/filling.service';

@Component({
  selector: 'app-filling-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createForm: FormGroup;
  constructor(private fb: FormBuilder, private fillingService: FillingService,
    private toastr: ToastrService){
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  public saveFilling(){
    this.fillingService.saveFilling(this.createForm.value)
    .subscribe((e) => {
      if(e.success == true){
        this.toastr.success(e.message, "Rellenos", {
          timeOut: 4000
        });
        this.createForm.reset()
      }else{
        this.toastr.error(e.message, "Rellenos", {
          timeOut: 4000
        })
      }
    })
  }
}
