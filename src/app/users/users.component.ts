import { Component, OnInit } from '@angular/core';
import {User} from '../domain/user';
import {UserService} from '../service/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}

