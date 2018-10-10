import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogConfig, MatDialog, MatMenuTrigger} from '@angular/material';
import {SigninUpComponent} from '../signin-up/signin-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      status: 'hello'
    };

    const loginDialogRef = this.dialog.open(SigninUpComponent, dialogConfig);

    loginDialogRef.afterClosed()
      .subscribe(
        (result) => {
          console.log(`${result}`);
        },
        (error) => console.log(error)
      );

  }

  openMenu() {
    this.trigger.openMenu();
  }

}
