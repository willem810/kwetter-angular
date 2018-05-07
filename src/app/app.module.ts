import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {UsersComponent} from './users/users.component';
import {UserService} from './service/user/user.service';
import {AppRoutingModule} from './/app-routing.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {ProfileComponent} from './component/profile/profile.component';
import {TweetService} from './service/tweet/tweet.service';
import {TweetsComponent} from './component/tweets/tweets.component';
import {LoginComponent} from './component/login/login.component';
import {CoreModule} from './core.module';
import {CommonModule} from '@angular/common';
import {TypeaheadContainerComponent} from 'ngx-bootstrap';
import {AuthenticationService} from './service/auth/authentication.service';
import {HttpclientService} from './service/httpclient/httpclient.service';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {TweetSocket} from './socket/TweetSocket';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    UsersComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    ProfileComponent,
    TweetsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    UserService,
    TweetService,
    AuthenticationService,
    TweetSocket,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
