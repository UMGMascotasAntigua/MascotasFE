import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cake } from 'src/app/models/Cake';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createForm: FormGroup;
  families:any[] = [];
  fillings:any[] = [];
  flavors:any[] = [];
  ingredient: string = "";
  ingredients: string[] = [];

  constructor(private fb: FormBuilder, 
    private toast: ToastrService){
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      family: [null, Validators.required],
      ingredient: [''],
      flavor: [null, Validators.required],
      filling: [null, Validators.required],
      price: [0.00, Validators.required],
      image: ['', Validators.required],
      stock: [0, Validators.required]
    })
  }

  public saveCake(){
    var cake = new Cake(
      this.createForm.controls['name'].value.toString(),
      this.createForm.controls['description'].value.toString(),
      this.ingredients,
      parseInt(this.createForm.controls['family'].value),
      parseInt(this.createForm.controls['flavor'].value),
      parseInt(this.createForm.controls['filling'].value),
      this.createForm.controls['price'].value,
      this.createForm.controls['image'].value.toString(),
      new Date(),
      this.createForm.controls['stock'].value,
    );

  }

  public addIngredient(){
    const value = this.createForm.controls['ingredient'].value;
    this.ingredients.push(value.toString());
    this.createForm.controls['ingredient'].reset();

  }
}
