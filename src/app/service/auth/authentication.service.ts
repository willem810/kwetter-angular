import {Injectable} from '@angular/core';
import {User} from '../../domain/user';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CoreService} from '../core/core.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  public static JWT_KEY: string;

  private serverUrl = 'http://127.0.0.1:8080/kwetter/resources';
  private usersEndpoint = '/auth';


  public AUTHORIZATION = 'Authorizationd';
  public UNAUTHORIZED = 401;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public authenticate(username: string, password: string): Observable<boolean> {
    let observer: Observer<boolean>;
    const observable: Observable<boolean> = Observable.create(obs => observer = obs);

    const url = `${this.serverUrl}${this.usersEndpoint}/login`;

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      'username': username,
      'password': password
    };

    this.http.post(url, body, {headers: headers, observe: 'response'})
      .subscribe((res: HttpResponse<any>) => {
        // JWT is valid
        let jwt = res.headers.get('Authorization');
        jwt = jwt.replace('Bearer ', '').trim();

        this.setJwt(jwt);
        observer.next(true);

      }, (err: any) => {
        // JWT is not valid or authentication failed!
        observer.next(false);
      });

    return observable;
  }

  public logout() {
    sessionStorage.setItem(AuthenticationService.JWT_KEY, '');
  }

  public getJwt(): string {
    return sessionStorage.getItem(AuthenticationService.JWT_KEY);
  }

  public setJwt(jwt: string): void {
    this.logout();
    sessionStorage.setItem(AuthenticationService.JWT_KEY, jwt);

  }

  public getLoggedInUser(): Observable<User> {
    let observer: Observer<User>;
    const observable: Observable<User> = Observable.create(obs => observer = obs);

    const jwt = this.getJwt();

    if (CoreService.isEmpty(jwt)) {
      console.error('Session expired!');
      this.router.navigateByUrl('/login');
    } else {
      const url = `${this.serverUrl}${this.usersEndpoint}/loggedinuser`;
      const headers = {
        'Authorization': 'Bearer ' + jwt
      };
      this.http.get<User>(url, {headers: headers}).subscribe(user => {
          if (!CoreService.isEmpty(user)) {
            observer.next(user);
          } else {
            this.router.navigateByUrl('/login');
          }
        }
      );
    }


    return observable;


  }
}
