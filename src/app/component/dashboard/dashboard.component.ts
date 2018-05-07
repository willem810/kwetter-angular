import {Component, OnInit} from '@angular/core';
import {User} from '../../domain/user';
import {UserService} from '../../service/user/user.service';
import {Tweet} from '../../domain/tweet';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {CoreService} from '../../service/core/core.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {TweetService} from '../../service/tweet/tweet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.css', '../../style/kwetter_more_1.css', '../../style/kwetter_more_2.css']
})
export class DashboardComponent implements OnInit {


  user: User;
  tweetCount: number;

  userTweets: Tweet[];

  feedSubject: Subject<Tweet> = new Subject<Tweet>();
  private feed: Tweet[];

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthenticationService,
              private tweetService: TweetService) {
    this.feed = [];

  }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(user => {
      if (!CoreService.isEmpty(user)) {
        this.initUserData(user);
      } else {
        this.router.navigateByUrl('/login');
      }
    });

    // TODO: Remove this line!
    // this.router.navigateByUrl('/login');
  }

  initUserData(user: User): void {
    this.user = user;
    this.updateFeed();

    this.userService.getTweetCount(user)
      .subscribe(count => this.tweetCount = count);
  }

  search(): void {
    return;
  }

  loadFeed(): void {
    return;
  }

  goToUser(username: string): void {
    this.router.navigate(['/' + username]);
  }

  likeTweet(tweetId: number): void {
    return;
  }

  tweet(message: string): void {
    this.userService.tweet(message, this.user.username);
  }

  private updateFeed(user?: User) {
    if (user == null) {
      user = this.user;
    }


    this.tweetService.getFeed(user)
      .subscribe(tweet => {

        this.feed.unshift(tweet);
      });

  }

  private getProfilePicture(sizeX: number, sizeY: number): string {
    return 'assets/images/default.png';
  }


}
