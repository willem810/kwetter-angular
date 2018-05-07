import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from '../../service/core/core.service';
import {User} from '../../domain/user';
import {UserService} from '../../service/user/user.service';
import {AuthenticationService} from '../../service/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  foundUsers: User[];

  user: User;
  // TODO: Include image in page. Image is not correct path yet?

  defaultImage = '../assets/images/default.png';

  constructor(private router: Router,
              private authService: AuthenticationService,
              private userService: UserService) {
    this.authService.getLoggedInUser()
      .subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  search(searchQuery: string): void {
    if (searchQuery.length > 0) {
      this.userService.searchUser(searchQuery, 8)
        .subscribe(users => this.foundUsers = users);
    } else {
      this.foundUsers = [];
    }
  }


  home(): void {
    this.router.navigateByUrl('/');
  }

  notifications(): void {
    this.router.navigateByUrl('/');
  }

  messages(): void {
    this.router.navigateByUrl('/');
  }

  settings(): void {
    this.router.navigateByUrl('/');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  profileHref(): string {
    return '/' + this.user.username;
  }


  private getProfilePicture(sizeX: number, sizeY: number): string {
    return 'assets/images/default.png';
  }
}
