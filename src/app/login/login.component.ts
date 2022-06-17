import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { account_response, login, SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  
  constructor(private _service: SharedService, private dialogRef: MatDialogRef<LoginComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
      var cred: login = { 
        'email': this.form.controls['email'].value, 
        'password': this.form.controls['password'].value
      };
      
      /* Call authentication method */
      this._service.login(cred).subscribe((data: any) => {
        if (data.v == true) {
          /* Get the account response */
          data as account_response;

          /* Set the token and log status in the service */
          localStorage.setItem('token', data.t);
          localStorage.setItem('id', data.id)
          this._service.changeLogStatus(true);

          /* Close the Dialog */
          this.dialogRef.close();
          this._snackBar.open('Login bem sucedido!', 'Fechar', { "duration": 2500 });

          location.replace("/");
        } else {
          /* Set the log status as false and reset the password field */
          this._service.changeLogStatus(false);
          this.form.controls['password'].reset();
          this._snackBar.open('Email ou Password incorretas!', 'Fechar', { "duration": 2500 });
        }
      });
    } else {
      /* Set the log status as false and reset the password field */
      this._service.changeLogStatus(false);
      this.form.controls['password'].reset();
      this._snackBar.open('Email ou Password incorretas!', 'Fechar', { "duration": 2500 });
    }
  }
}