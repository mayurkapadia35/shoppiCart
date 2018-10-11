import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication-service';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const copiedReq = req.clone();
    if (copiedReq.url.indexOf('http://192.168.200.153:4040/api/auth/') === -1) {
      const header = this.authService.getToken();
      const copy = req.clone({headers: req.headers.set('Authorization', header)});
      return next.handle(copy)
        .pipe(
          tap(
            event => {
              if (event instanceof HttpResponse) {
                console.log(event);
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
