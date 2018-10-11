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
              private router: Router) {
  }

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
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      phone_no: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    });
  }

  login() {
    const data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.authService.login(data)
      .subscribe(
        (result) => {
          if (Object.keys(result).length === 2) {
            if (result['user'].role_name === 'Admin') {
              this.response = result;
              this.thisDialogRef.close(this.response);
              this.router.navigate(['/admin']);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  register() {
    const data = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      phone_no: this.registerForm.get('phone_no').value
    };

    this.authService.register(data)
      .subscribe(
        (result) => {
          this.thisDialogRef.close(result);
        },
        (error) => {
          console.log(error);
        }
      );
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
