import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}
  isAdmin = new Subject<any>();
  role = 'User';
  login(data) {
    return this.http.post(environment.apiUrl + 'auth/login', data)
      .pipe(
        map(
          (response: any) => {
            localStorage.setItem('token', 'Bearer ' + response['token']);
            localStorage.setItem('user', JSON.stringify(response['user']));
            this.role = response['user'].role_name;
            this.isAdmin.next(this.role);
            return response;
          }
        )
      );
  }

  register(data) {
    return this.http.post(environment.apiUrl + 'auth/register', data);
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
