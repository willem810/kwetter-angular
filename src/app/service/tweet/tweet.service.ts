import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../../domain/user';
import {of} from 'rxjs/observable/of';
import {Tweet} from '../../domain/tweet';
import {TweetRequest} from '../../request/tweetRequest';
import {UserService} from '../user/user.service';
import {initTransferState} from '@angular/platform-browser/src/browser/transfer_state';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class TweetService {

  private serverUrl = 'http://127.0.0.1:8080/kwetter/resources';
  private tweetEndpoint = '/tweets';
  private userEndpoint = '/users';

  private userService: UserService;

  constructor(private http: HttpClient) {
  }


  getTweetsByUsername(username: string): Observable<Tweet[]> {
    const url = `${this.serverUrl}${this.userEndpoint}/${username}/tweets`;

    const data = this.http.get<TweetRequest[]>(url)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );

    return this.processTweetRequests(data);
  }

  getFeed(username: string): Observable<Tweet[]> {
    const url = `${this.serverUrl}${this.userEndpoint}/${username}/feed`;

    const data = this.http.get<TweetRequest[]>(url)
      .pipe(
        catchError(this.handleError('getFeed', []))
      );

    return this.processTweetRequests(data);
  }

  processTweetRequests(data: Observable<TweetRequest[]>): Observable<Tweet[]> {
    let observer: Observer<Tweet[]>;
    const observable: Observable<Tweet[]> = Observable.create(obs => observer = obs);

    data.subscribe(
      value => {
        // value is of type TweetRequest
        // We need to transform it as Tweet object
        const tweets = [];
        for (const resp of value) {
          this.initTweet(resp).subscribe(t => tweets.push(t));
        }
        // tell subscribers that we've got a new value, and then complete the observable;
        observer.next(tweets);
      },
      () => observer.complete()
    );

    return observable;
  }

  initTweet(tReq: TweetRequest): Observable<Tweet> {
    let observer: Observer<Tweet>;
    const observable: Observable<Tweet> = Observable.create(obs => observer = obs);

    let user;
    this.userService.getUser(tReq.user).subscribe(value => {
        user = value;
        observer.next(new Tweet(tReq.id, user, tReq.message, tReq.datePlaced, tReq.likes, tReq.hashtags));
      },
      () => observer.complete()
    );

    return observable;
  }

  tweet(message: string, username: string): Observable<Object> {
    const url = `${this.serverUrl}${this.tweetEndpoint}/add`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log('posting to: ' + url);

    const body = {
      message: message,
      user: {username: username}
    }

    return this.http.post(url, body, httpOptions);
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

  setUserService(param: UserService) {
    this.userService = param;
  }
}
