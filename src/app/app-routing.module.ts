import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // {path: 'dashboard', component: DashboardComponent},
  {path: ':username', component: ProfileComponent},
  {path: 'admin/users', component: UsersComponent},
  {path: 'admin/users/:username', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
