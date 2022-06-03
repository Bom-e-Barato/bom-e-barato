import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,  ValidationErrors, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {
  form!:FormGroup;
  districts: string[] = ['Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Castelo', 'Vila Real', 'Viseu'];
  categories:string[] = ['Automóveis','Ferramentas','Roupa','Imoveis', 'Eletrodomésticos', 'Eletrônicos', 'Desporto', 'Informática', 'Moda', 'Móveis', 'Outros'];
  filteredOptions?: Observable<string[]>;
  filteredOptions2?: Observable<string[]>;

  constructor(private _formbuilder: FormBuilder,private _router:Router) { }

  ngOnInit(): void {
    this.form = this._formbuilder.group({
      local: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      preço: new FormControl('', [Validators.required,Validators.min(0),Validators.pattern('^[0-9,]*$')]),
      titulo: new FormControl('', [Validators.required],),
      imagem: new FormControl('', [Validators.required]),
      negociavel: new FormControl('', ), 
      descriçao: new FormControl('', [Validators.required]),
      promover: new FormControl('', ),
      categoria: new FormControl('', [Validators.required]),   
    },{validator: [locationValidator,categoryValidator]});
    
    this.filteredOptions = this.form.valueChanges.pipe(//distritos
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredOptions2 = this.form.valueChanges.pipe(//categorias
      startWith(''),
      map(value => this._filter2(value)),
    );
  }

  submit() {
    console.log(this.form.value);
    this._router.navigate(['/home']);
  }

  get local() { return this.form.get('local') };
  get categoria() { return this.form.get('categoria') };
  get titulo() { return this.form.get('titulo') };
  get preco() { return this.form.get('preço') };

  onLocationInput() {
    if (this.form.hasError('locationWrong')) {
      this.local?.setErrors([{'locationWrong': true}]);
    } else {
      this.local?.setErrors(null);
      var i = this.districts.findIndex(x => x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") == this.local?.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""));
      this.form.get('local')?.setValue(this.districts[i]);
    }
  }

  onCategoryInput() {
    if (this.form.hasError('categoryWrong')) {
      this.categoria?.setErrors([{'categoryWrong': true}]);
    } else {
      this.categoria?.setErrors(null);
      var a = this.categories.findIndex(x => x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") == this.categoria?.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""));
      this.form.get('categoria')?.setValue(this.categories[a]);
    }
  }

  private _filter(value: any): string[] {
    if (value.location == undefined) return this.districts;

    const filterValue = value?.location?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return this.districts.filter(option => option.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(filterValue));
  }

  private _filter2(value: any): string[] {
    if (value.categoria == undefined) return this.categories;

    const filterValue2 = value?.categoria?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return this.categories.filter(option => option.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(filterValue2));
  }

  applyLocation() {
  }

  applyCategory() {
  }

  clear() {
    this.form.reset();
  }
}
export const locationValidator: ValidatorFn = (formGroup: AbstractControl ): ValidationErrors | null  => {
  var districts: string[] = ['Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Castelo', 'Vila Real', 'Viseu'];

  var input: string = formGroup.get('local')?.value?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
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

export const categoryValidator: ValidatorFn = (formGroup: AbstractControl ): ValidationErrors | null  => {
  var categories: string[] = ['Automóveis', 'Ferramentas', 'Roupa', 'Imóveis', 'Eletrodomésticos', 'Desporto', 'Tecnologia', 'Lazer', 'Móveis', 'Outros'];

  var input: string = formGroup.get('categoria')?.value?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  if (input == '') return null;

  var categories_query = categories.filter(element =>
    element.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") == input
  );
  
  if (categories_query.length > 0) {
    return null;
  } else {
    return { categoryWrong: true };
  }
}
