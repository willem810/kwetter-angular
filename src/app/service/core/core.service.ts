import {User} from '../../domain/user';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CoreService {

  private userKey = 'loggedInUser';


  constructor(private router: Router,
              private http: HttpClient) {
  }


  public static isEmpty(value): boolean {
    return (value == null || value.length === 0);
  }

  login(username: string): Observable<boolean> {

    let observer: Observer<boolean>;
    const observable: Observable<boolean> = Observable.create(obs => observer = obs);

    const serverUrl = 'http://127.0.0.1:8080/kwetter/resources';
    const usersEndpoint = '/users';

    const url = `${serverUrl}${usersEndpoint}/${username}`;

    this.http.get<User>(url).subscribe(user => {
      console.log('incoming user: ' + user);

      if (CoreService.isEmpty(user)) {
        console.log('user was null...');
        observer.next(false);
      } else {
        console.log('new user logged in! - ' + user.username);

        localStorage.setItem(this.userKey, user.username);
        observer.next(true);
        // const url = `${this.serverUrl}/users/login/${username}`;
        //
        // this.http.post(url, null).subscribe(ok => {
        //   console.log('got response: ' + ok);
        //   observer.next(true);
        // });
      }
    });

    return observable;
  }

  logout() {
    localStorage.setItem(this.userKey, null);
  }


  getLoggedInUser(): string {

    const user = localStorage.getItem(this.userKey);
    if (CoreService.isEmpty(user)) {
      this.router.navigateByUrl('/login');
    }

    return user;
  }

}





















