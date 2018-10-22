import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication-service';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const copiedReq = req.clone();

    if (copiedReq.url.indexOf(environment.apiUrl + 'auth/') === -1) {
      const data = req.url.split('/');

      if (copiedReq.url.indexOf(environment.apiUrl + 'product/' + data[5]) === 0) {
        return next.handle(copiedReq);
      }

      if (copiedReq.url.indexOf(environment.apiUrl + 'product/feature/6') === 0) {
        return next.handle(copiedReq);
      }

      const header = this.authService.getToken();
      const copy = req.clone({headers: req.headers.set('Authorization', header)});
      return next.handle(copy)
        .pipe(
          tap(
            event => {
              if (event instanceof HttpResponse) {
              }
            },
            error => {
              if (error.error.message === 'jwt expired') {
                alert('Your login session was expired.. Please login again');
                this.authService.logout();
                this.router.navigate(['/']);
              }
            }
          )
        );
    } else {
      return next.handle(copiedReq);
    }
  }
}
