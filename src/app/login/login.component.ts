import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user/user.service';
import {Router} from '@angular/router';
import {CoreService} from '../service/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../style/kwetter_more_1.css', '../style/kwetter_more_2.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private coreService: CoreService) {
  }

  ngOnInit() {
  }

  login(username: string) {
    console.log(username);
    this.coreService.login(username).subscribe(success => {
      if (success) {
        this.router.navigateByUrl('/');
      }
    });
  }

}
