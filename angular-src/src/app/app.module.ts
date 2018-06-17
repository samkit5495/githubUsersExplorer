import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/home/search/search.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {appRouting} from "./app.routing";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { RepoComponent } from './components/repo/repo.component';
import { FollowersComponent } from './components/home/followers/followers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    UserComponent,
    ProfileComponent,
    RepoComponent,
    FollowersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    appRouting
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
