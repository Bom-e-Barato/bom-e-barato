import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { account_response, SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription = new Subscription();
  loggedIn: boolean = false;

  constructor(public dialog: MatDialog, private _router: Router, private _service: SharedService, private _snackBar: MatSnackBar) {
    this.subscription = this._service.currentLogStatus.subscribe(logStatus => this.loggedIn = logStatus);
  }

  ngOnInit() {
  }

  /* Open Login Dialog */
  redirectLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '20%'
    });
  }

  /* Open Register Dialog */
  redirectRegister() {
    const dialogRef = this.dialog.open(RegisterComponent);
  }

  resetSearchBar() {
    this._service.setFilter('', '');
  }

  logout() {
    this._service.changeLogStatus(false);
    this._service.logout().subscribe((data: any) => {
      if ("v" in data) {
        data as account_response;
        if (data.v == true) {
          this._snackBar.open('Logout bem sucedido!', 'Close', { "duration": 2500 });
        } else {
          this._snackBar.open('Logout falhou!', 'Close', { "duration": 2500 });
        }
      } else {
        this._snackBar.open('Logout falhou!', 'Close', { "duration": 2500 });
      }  
    });
    
    this._router.navigate(['/home']);
  }
}
