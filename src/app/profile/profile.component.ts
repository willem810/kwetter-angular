import {Component, OnInit} from '@angular/core';
import {User} from '../domain/user';
import {UserService} from '../service/user/user.service';
import {Tweet} from '../domain/tweet';
import {ActivatedRoute, Router} from '@angular/router';
import {CoreService} from '../service/core/core.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../app.component.css', '../style/kwetter_more_1.css', '../style/kwetter_more_2.css']
})
export class ProfileComponent implements OnInit {

  tweetCount: number;
  user: User;
  tweets: Tweet[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private coreService: CoreService) {
  }

  ngOnInit() {

    const username = this.route.snapshot.paramMap.get('username');

    this.userService.getUser(username)
      .subscribe(user => this.user = user);

    this.userService.getTweetCount(username)
      .subscribe(count => this.tweetCount = count);


    this.userService.getUserTweets(username)
      .subscribe(value => this.tweets = value);


  }

  goToUser(username: string): string {
    return '/' + username;
    // this.router.navigate(['/' + username]);
    // return false;
  }

  followUser() {
    console.log('following ' + this.user.username);
    this.userService.followUser(this.user.username);
    window.location.reload();
  }

  unFollowUser() {
    console.log('unFollowing ' + this.user.username);
    this.userService.unFollowUser(this.user.username);
    window.location.reload();

  }

  isFollowing(): boolean {
    for (const u of this.user.followers) {
      if (u === this.coreService.getLoggedInUser()) {
        return true;
      }
    }

    return false;
  }

  isLoggedInUser(): boolean {
    return this.coreService.getLoggedInUser() === this.user.username;
  }

  private getProfilePicture(sizeX: number, sizeY: number): string {
    return 'assets/images/default.png';
  }


}
