import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bom-e-barato';

  constructor(public dialog: MatDialog) {}

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

  redirectAd() {
    
  }
}
