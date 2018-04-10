import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {UsersComponent} from './users/users.component';
import {UserService} from './service/user/user.service';
import {AppRoutingModule} from './/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProfileComponent} from './profile/profile.component';
import {TweetService} from './service/tweet/tweet.service';
import {TweetsComponent} from './tweets/tweets.component';
import {LoginComponent} from './login/login.component';
import {CoreModule} from './core.module';
import {CommonModule} from '@angular/common';
import {TypeaheadContainerComponent} from 'ngx-bootstrap';

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
    UserService,
    TweetService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
