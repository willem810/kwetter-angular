import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpParams} from '@angular/common/http/src/params';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {CoreService} from '../core/core.service';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable()
export class HttpclientService {


  constructor(private http: HttpClient,
              private router: Router) {
  }
}
