import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CakeService } from 'src/app/services/cake.service';
import { CartService } from 'src/app/services/cart.service';
import { FamilyService } from 'src/app/services/family.service';
import { FillingService } from 'src/app/services/filling.service';
import { FlavorService } from 'src/app/services/flavor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  searchForm: FormGroup;
  cakes: any[] = [];
  families: any[] = [];
  fillings: any[] = [];
  flavors: any[] = [];
  filters: any[] = [];

  test: any = {};
  valueOpts: any[] = [];
  selectedCake: any = null;

  constructor(
    private _fb: FormBuilder,
    private cakeService: CakeService,
    private toast: ToastrService,
    private cart: CartService,
    private familyService: FamilyService,
    private fillingService: FillingService,
    private flavorService: FlavorService
  ) {
    this.searchForm = this._fb.group({
      query: ['', Validators.required],
    });

    this.familyService.getFamilies().subscribe((e) => {
      if (e.success == true) {
        this.families = e.result;
      } else {
        this.families = [];
      }
    });

    this.fillingService.getFillings().subscribe((e) => {
      if (e.success == true) {
        this.fillings = e.result;
      } else {
        this.fillings = [];
      }
    });

    this.flavorService.getFlavors().subscribe((e) => {
      if (e.success == true) {
        this.flavors = e.result;
      } else {
        this.flavors = [];
      }
    });
  }

  public addToCart(cake: any) {
    this.toast.success('Pastel añadido al carrito', 'Carrito', {
      timeOut: 4500,
    });
    this.cart.addToCart(cake);
  }

  public applyFilters() {
    this.cakes = [];
    this.cakeService
      .getFilteredCakes(this.filters)
      .subscribe((e) => {
        this.cakes = e.result;
      });
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

    this.filters = filters
  }
}
