import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
// import {Subject} from 'rxjs';
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}
  isAdmin = new Subject<any>();
  userData: any;
  role = 'User';
  login(data) {
    return this.http.post('http://192.168.200.153:3000/api/user/login', data)
      .pipe(
        map(
          (response: Response) => {
            localStorage.setItem('token', response['token']);
            const base64url = response['token'].split('.')[1];
            const base64 = base64url.replace('-', '+').replace('_', '/');
            this.userData = JSON.parse(atob(base64));
            this.role = this.userData.role_name;
            this.isAdmin.next(this.role);
            return response;
          }
        )
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.role = 'User';
    this.isAdmin.next(this.role);
  }

  getUserRole_name() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const base64url = token.split('.')[1];
      const base64 = base64url.replace('-', '+').replace('_', '/');
      this.userData = JSON.parse(atob(base64));
      this.role = this.userData.role_name;
      this.isAdmin.next(this.role);
    }
  }
}
