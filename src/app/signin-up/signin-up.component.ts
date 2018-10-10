import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../auth-guard/authentication-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-up',
  templateUrl: './signin-up.component.html',
  styleUrls: ['./signin-up.component.css']
})
export class SigninUpComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<SigninUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public authService: AuthenticationService,
              private router: Router) { }
  loginForm: FormGroup;
  registerForm: FormGroup;
  public loginFlag = true;
  public registerFlag = false;
  dialogFlag = 'Login';
  public hideLogin: true;
  public hideRegister: true;
  response = {};

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      contactno: new FormControl(null, [Validators.required, Validators.maxLength(5)])
    });
  }

  login() {
    const data = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };

    this.authService.login(data)
      .subscribe(
        (result) => {
          this.response = result;
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.log(error);
        }
      );
    this.thisDialogRef.close(this.response);
  }

  register() {
    this.thisDialogRef.close(this.registerForm.value);
  }

  enableRegister() {
    this.dialogFlag = 'Register';
    this.loginFlag = false;
    this.registerFlag = true;
  }

  enableLogin() {
    this.dialogFlag = 'Login';
    this.loginFlag = true;
    this.registerFlag = false;
  }

}
