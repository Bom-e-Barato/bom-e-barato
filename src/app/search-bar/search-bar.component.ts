import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import  {map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  districts: string[] = ['Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Castelo', 'Vila Real', 'Viseu'];
  
  filterValue: string = '';
  locationValue: string = '';
  form!: FormGroup;
  filteredOptions?: Observable<string[]>;
  subscription: Subscription = new Subscription();

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _service: SharedService) {
    this.subscription = this._service.filter.subscribe((data: any) => {
      this.filterValue = data.filter;
      this.locationValue = data.location;

      this.form = this._formBuilder.group({
        filter: [this.filterValue],
        location: [this.locationValue]
      }, {validator: locationValidator});
    });    
  }

  ngOnInit(): void {
    this.filteredOptions = this.form.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.form.get('location')?.valueChanges.subscribe(value => {
      this.districts.includes(value) == true || value == '' ? this.applyLocation() : null
    });
  }

  /* Shorthands for form controls (used from within template) */
  get location() { return this.form.get('location') };

  /* Update validation when the location input changes */
  onLocationInput() {
    if (this.form.hasError('locationWrong')) {
      this.location?.setErrors([{'locationWrong': true}]);
    } else {
      this.location?.setErrors(null);
      var i = this.districts.findIndex(x => x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") == this.location?.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""));
      this.form.get('location')?.setValue(this.districts[i]);
    }
  }

  private _filter(value: any): string[] {
    if (value.location == undefined) return this.districts;

    const filterValue = value?.location?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return this.districts.filter(option => option.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(filterValue));
  }

  applyLocation() {
    this.locationValue = this.form.get('location')?.value;
    this.filterValue = this.form.get('filter')?.value;
    this._service.setFilter(this.filterValue, this.locationValue);
  }

  applySearch() {
    this.filterValue = this.form.get('filter')?.value;
    this.locationValue = this.form.get('location')?.value;
    this._service.setFilter(this.filterValue, this.locationValue);

    /* Route to the search page */
    if (this.filterValue.length > 0) {
      this._router.navigate(['/search']);
    }

    /* Route to the home page */
    if (this.filterValue.length == 0) {
      this._router.navigate(['/']);
    }
  }
}

export const locationValidator: ValidatorFn = (formGroup: AbstractControl ): ValidationErrors | null  => {
  var districts: string[] = ['Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Castelo', 'Vila Real', 'Viseu'];

  var input: string = formGroup.get('location')?.value?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  if (input == '') return null;

  var districts_query = districts.filter(element =>
    element.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") == input
  );
  
  if (districts_query.length > 0) {
    return null;
  } else {
    return { locationWrong: true };
  }
}
