import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  userData: any;
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const base64url = token.split('.')[1];
      const base64 = base64url.replace('-', '+').replace('_', '/');
      this.userData = JSON.parse(atob(base64));
      if (this.userData.role_name === 'Admin') {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
