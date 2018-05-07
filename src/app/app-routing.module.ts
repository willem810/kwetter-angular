import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ProfileComponent} from './component/profile/profile.component';
import {LoginComponent} from './component/login/login.component';

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
