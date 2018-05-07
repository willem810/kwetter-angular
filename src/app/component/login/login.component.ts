import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoreService} from '../../service/core/core.service';
import {AuthenticationService} from '../../service/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../style/kwetter_more_1.css', '../../style/kwetter_more_2.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('invalid') === 'false') {
      this.invalidLogin = true;
    }
  }


  login(username: string, password: string) {
    this.authService.authenticate(username, password).subscribe(success => {
      this.invalidLogin = !success;
      if (success) {
        this.router.navigateByUrl('/');
      }
    });
  }

}
