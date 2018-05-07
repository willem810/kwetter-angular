import {Injectable} from '@angular/core';
import {User} from '../../domain/user';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Tweet} from '../../domain/tweet';
import {TweetService} from '../tweet/tweet.service';
import {Observer} from 'rxjs/Observer';
import {Router} from '@angular/router';
import {CoreService} from '../core/core.service';


@Injectable()
export class UserService {

  private serverUrl = 'http://127.0.0.1:8080/kwetter';
  private usersEndpoint = '/resources/users';


  constructor(private http: HttpClient,
              private tweetService: TweetService,
              private router: Router,
              private coreService: CoreService) {
    tweetService.setUserService(this);
  }


  getUsers(): Observable<User[]> {
    const url = `${this.serverUrl}${this.usersEndpoint}`;

    return this.http.get<User[]>(url)
      .pipe(
        tap(users => console.log(`fetched user: ${users}`)),
        catchError(this.handleError('getUsers', []))
        //
      );
  }

  getUser(username: string): Observable<User> {
    const url = `${this.serverUrl}${this.usersEndpoint}/${username}`;

    return this.http.get<User>(url);
  }

  searchUser(query: string, amount: number): Observable<User[]> {
    const url = `${this.serverUrl}${this.usersEndpoint}/search/${query}/${amount}`;
    return this.http.get<User[]>(url);
  }

  getTweetCount(user: User): Observable<number> {
    const url = this.serverUrl + user.rel.tweetCount;
    // const url = `${this.serverUrl}${this.usersEndpoint}/${username}/tweets/count`;

    return this.http.get<number>(url);
  }

  tweet(message: string, username: string) {
    this.tweetService.tweet(message, username);
  }

  followUser(user: User, followUser: string): void {
    const url = this.serverUrl + user.rel.followUser + followUser;
    // const url = `${this.serverUrl}${this.usersEndpoint}/${user}/follow?u=${followUser}`;
    this.http.post(url, null).subscribe(ok => {
    });
  }

  unFollowUser(user: User, unFollowUser: string): void {
    const url = this.serverUrl + user.rel.unFollowUser + unFollowUser;
    //const url = `${this.serverUrl}${this.usersEndpoint}/${user}/unfollow?u=${unFollowUser}`;

    this.http.post(url, null).subscribe(ok => {
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error.message); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
