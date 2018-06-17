import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {UserAuthGuard} from "./guards/user-auth.guard";
import {SearchComponent} from "./components/home/search/search.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/home/profile/profile.component";
import {FollowersComponent} from "./components/home/followers/followers.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'home/logout', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [UserAuthGuard], children: [
      {path: 'search', component: SearchComponent},
      {path: 'profile/:login', component: ProfileComponent},
      {path: 'followers', component: FollowersComponent}
    ]
  },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
