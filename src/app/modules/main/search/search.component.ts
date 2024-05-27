import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  searchForm: FormGroup;

  test: any = {};
  valueOpts: any[] = [];
  selectedCake: any = null;

  constructor(
    private _fb: FormBuilder
  ) {
    this.searchForm = this._fb.group({
      query: ['', Validators.required],
    });

  
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
