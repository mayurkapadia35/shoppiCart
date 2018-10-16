import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogConfig, MatDialog, MatMenuTrigger, MatSnackBar} from '@angular/material';
import {SigninUpComponent} from '../signin-up/signin-up.component';
import {AuthenticationService} from '../auth-guard/authentication-service';
import {exitCodeFromResult} from '@angular/compiler-cli';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService) {
  }
  public menuToggle = true;
  ngOnInit() {
    this.authService.isAdmin
      .subscribe(
        (result) => {
          if (result === 'User') {
            this.menuToggle = !this.menuToggle;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    this.authService.getUserRole_name();
  }

  logout() {
    this.authService.logout();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      status: 'data'
    };

    const loginDialogRef = this.dialog.open(SigninUpComponent, dialogConfig);

    loginDialogRef.afterClosed()
      .subscribe(
        (result: any) => {
          if (Object.keys(result).length === 1) {
            this.snackBar.open('Registered Successfully', 'close', {
              duration: 3000
            });
          } else {
            console.log(`${result}`);
          }
        },
        (error) => console.log(error)
      );

  }

  openMenu() {
    this.trigger.openMenu();
  }

}
