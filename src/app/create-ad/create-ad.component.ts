import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,  ValidationErrors, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {
  form!:FormGroup;

  constructor(private _formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formbuilder.group({
      local: new FormControl('', [Validators.required]),
      preço: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required,Validators.min(1)]),
      negociavel: new FormControl('', ), 
      descriçao: new FormControl('', [Validators.required]),
      promover: new FormControl('', ),
      categoria: new FormControl('', [Validators.required]),   
    });
  }

  submit(){
    console.log(this.form.value);
    this.clear();
  }

  clear(){  
    this.form.reset();
  }

}
