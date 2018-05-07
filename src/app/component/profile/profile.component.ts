import {Component, OnInit} from '@angular/core';
import {User} from '../../domain/user';
import {UserService} from '../../service/user/user.service';
import {Tweet} from '../../domain/tweet';
import {ActivatedRoute, Router} from '@angular/router';
import {TweetService} from '../../service/tweet/tweet.service';
import {AuthenticationService} from '../../service/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../app.component.css', '../../style/kwetter_more_1.css', '../../style/kwetter_more_2.css']
})
export class ProfileComponent implements OnInit {

  tweetCount: number;
  user: User;
  tweets: Tweet[];


  isLoggedInUser = false;
  isFollowing = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private tweetService: TweetService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.tweets = [];
    const username = this.route.snapshot.paramMap.get('username');
    this.initUser(username);
  }


  initUser(username: string) {
    this.userService.getUser(username)
      .subscribe(user => {
        this.user = user;

        this.userService.getTweetCount(user)
          .subscribe(count => this.tweetCount = count);

        this.tweetService.getTweetsByUsername(user)
          .subscribe(tweet => this.tweets.unshift(tweet));

        this.authService.getLoggedInUser().subscribe(loggedInUser => {

          for (const follower of user.followers) {
            if (follower === loggedInUser.username) {
              this.isFollowing = true;
              break;
            }
          }

          if (loggedInUser.username === this.user.username) {
            this.isLoggedInUser = true;
          } else {
            this.isLoggedInUser = false;
          }
        });
      });





  }

  goToUser(username: string): string {
    return '/' + username;
  }

  followUser() {
    this.authService.getLoggedInUser().subscribe(loggedInUser => {
      this.userService.followUser(loggedInUser, this.user.username);
      this.user.followers.push(loggedInUser.username);
      this.isFollowing = true;
    });
  }

  unFollowUser() {
    this.authService.getLoggedInUser().subscribe(loggedInUser => {
      this.userService.unFollowUser(loggedInUser, this.user.username);

      const index: number = this.user.followers.indexOf(loggedInUser.username);
      if (index !== -1) {
        this.user.followers.splice(index, 1);
      }
      this.isFollowing = false;
    });
  }

  private getProfilePicture(sizeX: number, sizeY: number): string {
    return 'assets/images/default.png';
  }


}
