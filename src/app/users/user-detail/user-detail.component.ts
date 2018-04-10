import {Component, Input, OnInit} from '@angular/core';
import { User } from '../../domain/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
}
