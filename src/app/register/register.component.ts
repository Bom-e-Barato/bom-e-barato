import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,  ValidationErrors, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { account_response, person, SharedService } from '../shared.service';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
const moment = _moment;

export const DATE_FORMAT = {
  parse: {
      dateInput: ['DD-MM-YYYY', 'DD/MM/YYYY']
  },
  display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ]
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  hide_confirm: boolean = true;
  minPw: number = 8;
  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<RegisterComponent>, private _service: SharedService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      password2: ['', [Validators.required]],
      bday: new FormControl('', [Validators.required])
    }, {validator: passwordMatchValidator});
  }

  /* Shorthands for form controls (used from within template) */
  get password() { return this.form.get('password'); }
  get password2() { return this.form.get('password2'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.form.hasError('passwordMismatch'))
      this.password2?.setErrors([{'passwordMismatch': true}]);
    else
      this.password2?.setErrors(null);
  }

  /* Error Message for Email validation */
  getErrorMessageEmail() {
    if (this.form.controls['email'].hasError('required')) {
      return 'Você deve inserir um email';
    }

    return this.form.controls['email'].hasError('email') ? 'Email não é válido' : '';
  }

  /* Submit form action */
  submit() {
    /* Only submit if the form is valid */
    if (this.form.valid) {
      var person: person = { 
        email: this.form.controls['email'].value, 
        first_name: this.form.controls['fname'].value, 
        last_name: this.form.controls['lname'].value, 
        birth_date: moment(this.form.controls['bday'].value).format('YYYY-MM-DD'), 
        password: this.form.controls['password'].value
      };

      /* Call registration method */
      this._service.register(person).subscribe((data: any) => {
        data as account_response;
        
        if (data.v == true) {
          // Close dialog
          this.dialogRef.close();          
          this._snackBar.open('Registo realizado com sucesso!', 'Fechar', { "duration": 2500 });
        } else {
          /* Reset Email and Password forms */
          this.form.controls['email'].reset();
          this.form.controls['password'].reset();
          this.form.controls['password2'].reset();
          this._snackBar.open('Email já está registado!', 'Fechar', { "duration": 2500 });
        }
      });
    } else {
      this._snackBar.open('Parâmetros introduzidos inválidos!', 'Fechar', { "duration": 2500 });
    }
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl ): ValidationErrors | null => {
  if (formGroup.get('password')?.value === formGroup.get('password2')?.value)
    return null;
  else
    return {passwordMismatch: true};
};
