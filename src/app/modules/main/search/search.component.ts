import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environment/environment';
import { Pet } from 'src/app/models/Pet';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit{
  filterForm: FormGroup;
  query: string = '';
  searchForm: FormGroup;
  public photoEndpoint: string = `${environment.apiUrl}pet/photo/`;
  test: any = {};
  valueOpts: any[] = [];
  selectedCake: any = null;
  public pets: Pet[] = [];

  constructor(
    private _fb: FormBuilder,
    private toast: ToastrService,
    private petService: PetsService
  ) {
    this.searchForm = this._fb.group({
      query: ['', Validators.required],
    });

    this.filterForm = this._fb.group({
      filters: this._fb.array([])
    })
    this.addFilter();
  
  }

  ngOnInit(): void {
    
  }

  get filters(){
    return this.filterForm.get('filters') as FormArray;
  }

  public createFilter() : FormGroup{
    return this._fb.group({
      field: ['', Validators.required],
      operator: [''],
      value: ['', Validators.required]
    })
  }

  addFilter() : void{
    const filters = this.filterForm.get('filters') as FormArray;
  if (filters && filters.length > 0) {
    const lastFilter = filters.at(filters.length - 1);
    if (lastFilter.valid) {
      filters.push(this.createFilter());
    }else{
      this.toast.error("Debe completar el filtro primero", "Filtro vacío", {
        timeOut: 5000
      })
    }
  } else {
    // Si no hay filtros, simplemente agregamos uno nuevo
    filters.push(this.createFilter());
  }
    
  }

  removeFilter(index: number){
    if(this.filters.length > 1){
      this.filters.removeAt(index);
    }
  }

  submit(): void {
    // this.clasificacionService.filtrarMascotas(this.filterForm.value).subscribe(data => {
    //   console.log(data); // Aquí manejar los resultados del filtro
    // });
    const filters = this.filterForm.get('filters') as FormArray;
  const filtrosValidos = filters.controls.filter(f => f.get('field')?.value !== '' && f.get('value')?.value !== '');
  const filtros = filtrosValidos.map(f => ({
    field: f.get('field')?.value,
    operator: f.get('operator')?.value,
    value: f.get('value')?.value
  }));

  this.petService.filterPets(filtros)
  .subscribe((e) => {
    if(e.success == true){
      this.pets = e.result;
    }else{
      this.toast.error(e.message ?? "Error al filtrar las mascotas", "Filtro", {
        timeOut: 4500
      });
    }
  })
  }

  public addToCart(cake: any) {

  }

  public applyFilters() {

  }

  public async parseQuery() {
    const input = this.searchForm.controls['query'].value;
    const fields = ['Tipo', 'Sabor', 'Relleno'];
    const filters = [];
  
    for (const field of fields) {
      const regex = new RegExp(`${field.toLowerCase()}\\s+([^y]+)(?:\\s+y\\s+|$)`, 'i');
         

      let matches;
      let remainingInput = input;
  
      while ((matches = regex.exec(remainingInput)) !== null) {
        let filter = {
          field: field.toLowerCase(),
          value: matches[1].trim().toLowerCase()
        };

        filters.push(filter);
        remainingInput = remainingInput.substring(matches.index + matches[0].length);
      }
    }
  }
}
