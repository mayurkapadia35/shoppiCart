import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './auth-guard/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  flagStatus = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.isAdmin
      .subscribe(
        (data) => {
          (data === 'Admin') ? this.flagStatus = true : this.flagStatus = false;
        }
      );

    this.authService.getUserRole_name();
  }
}
