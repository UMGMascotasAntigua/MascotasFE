import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createForm: FormGroup;
  constructor(private fb: FormBuilder, private clientService: ClientService,
    private toastr: ToastrService){
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      nit: ['', Validators.required],
      payment: ['', Validators.required],
    })
  }

  public saveClient(){
    this.clientService.saveClient(this.createForm.value)
    .subscribe((e) => {
      if(e.success == true){
        this.toastr.success(e.message, "Clientes",{
          timeOut: 4000
        });
        this.createForm.reset()
      }else{
        this.toastr.error(e.message, "Clientes",{
          timeOut: 4000
        })
      }
    })
  }
}
