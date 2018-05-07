import {Injectable} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {TweetRequest} from '../request/tweetRequest';
import {TweetService} from '../service/tweet/tweet.service';

@Injectable()
export class TweetSocket {

  private serverURL = 'ws://username:password@localhost:8080/kwetter/socket/tweet';

  private ws: WebSocket;

  private tweetObservable: Observable<TweetRequest>;
  private tweetObserver: Observer<TweetRequest>;

  constructor() {
    console.log('Trying to connect...');
    this.connect(this.serverURL);
    this.initObservables();
  }

  private connect(url) {
    if (!this.ws) {
      this.ws = new WebSocket(url);


      this.ws.onopen = (ev: Event) => {
        console.log('subscribing...');
        this.onOpen(ev);
      };

      this.ws.onmessage = (ev: MessageEvent) => {
        this.onMessage(ev);
      };

      this.ws.onerror = (ev: Event) => {
        this.onError(ev);
      };

      this.ws.onclose = (ev: CloseEvent) => {
        this.onClose(ev);
      };

      console.log('Successfully connected: ' + url);
    } else {
      console.log('Already connected!');
    }
  }

  private onMessage(msg: MessageEvent) {
    console.log('Got Message!');
    const tweetReq: TweetRequest = JSON.parse(msg.data);
    this.tweetObserver.next(tweetReq);
  }

  private onError(ev: Event) {
    console.error('ERROR ON WEBSOCKET: ' + ev.toString());

  }

  private onClose(ev: CloseEvent) {

  }

  private onOpen(ev: Event) {
  }

  private initObservables() {

    this.tweetObservable = Observable.create(obs => this.tweetObserver = obs);

  }

  public subscribeTweets(username: string): Observable<TweetRequest> {
    this.subscribe(username);
    return this.tweetObservable;
  }

  public subscribe(username: string) {
    setTimeout(() => { /*Your Code*/
      while (!this.ws.OPEN) {
      }

      this.ws.send(`sub:${username}`);
    }, 2000);
  }
}
