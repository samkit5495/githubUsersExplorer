import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable()
export class GithubUserService {

  httpOptions;

  constructor(private http: HttpClient, private userService: UserService) {
    console.log('Github User services started!');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ userService.getCurrentUser().access_token
      })
    };
  }

  searchUsers(parameter: string) {
    return this.http.get('https://api.github.com/search/users?q='+parameter);
  }

  getUser(login: string) {
    return this.http.get('https://api.github.com/users/' + login);
  }

  get(url: string) {
    return this.http.get(url);
  }

  insertUser(userData) {
    return this.http.post('/api/githubUser/dumpUserData', userData, this.httpOptions);
  }

  getTopUsersByFollowers() {
    return this.http.get('/api/githubUser/getTopUsersByFollowers', this.httpOptions);
  }
}
