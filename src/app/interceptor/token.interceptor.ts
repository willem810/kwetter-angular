// src/app/auth/token.interceptor.ts
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CoreService} from '../service/core/core.service';
import {AuthenticationService} from '../service/auth/authentication.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.initHeaders(request.headers);

    request = request.clone({
      headers: headers
    });


    const resp = next.handle(request).catch(e => {
      this.handleUnauthorized(e);
      return Observable.of(null);
    });


    return resp;
  }

  initHeaders(requestHeaders: HttpHeaders): HttpHeaders {
    let headers = new HttpHeaders();
    if (requestHeaders != null) {
      headers = requestHeaders;
    }

    // -- add code to add headers --
    headers = this.setJwtToken(headers);

    return headers;
  }

  setJwtToken(headers?: HttpHeaders): HttpHeaders {
    const jwt = this.authService.getJwt();

    if (CoreService.isEmpty(jwt)) {
      this.router.navigateByUrl('/login');
    } else {
      headers = headers.set('Authorization', 'Bearer ' + jwt);
    }

    return headers;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleUnauthorized(err: any) {
    const errMsg = err.status;

    if (err.status === 401) {
      console.error(errMsg + ': JWT Not valid!');
      this.router.navigateByUrl('/login');
    } else {
      console.error(err);
    }
  }
}
