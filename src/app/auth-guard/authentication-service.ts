import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}
  isAdmin = new Subject<any>();
  // userData: any;
  role = 'User';
  login(data) {
    return this.http.post('http://192.168.200.153:4040/api/auth/login', data)
      .pipe(
        map(
          (response: any) => {
            localStorage.setItem('token', 'Bearer ' + response['token']);
            localStorage.setItem('user', JSON.stringify(response['user']));
            // const base64url = response['token'].split('.')[1];
            // const base64 = base64url.replace('-', '+').replace('_', '/');
            // this.userData = JSON.parse(atob(base64));
            this.role = response['user'].role_name;
            this.isAdmin.next(this.role);
            return response;
          }
        )
      );
  }

  register(data) {
    return this.http.post('http://192.168.200.153:4040/api/auth/register', data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.role = 'User';
    this.isAdmin.next(this.role);
  }

  getToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
  }

  getUserRole_name() {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      let role: any;
      role = JSON.parse(localStorage.getItem('user'));
      this.role = role.role_name;
      this.isAdmin.next(this.role);
    }
  }
}
