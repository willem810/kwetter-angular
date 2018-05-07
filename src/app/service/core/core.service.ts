import {User} from '../../domain/user';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CoreService {
  public static isEmpty(value): boolean {
    return (value == null || value.length === 0 || value === undefined);
  }
}





















