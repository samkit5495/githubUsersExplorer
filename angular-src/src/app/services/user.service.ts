import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService {

  currentUser: User;

  constructor(private http: HttpClient) {
    console.log('User services started!');

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  register(username: string, password: string) {
    return this.http.post('/api/user/register', {
      'username': username,
      'password': password
    });
  }

  getClientId(username: string) {
    return this.http.post('/api/user/getClientId', {
      'username': username
    });
  }

  authenticate(username: string, password: string, client_id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:'Basic '+ btoa(client_id+':secret')
      })
    };
    return this.http.post(`/oauth/token?grant_type=password&username=${username}&password=${password}`,{}, httpOptions);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
