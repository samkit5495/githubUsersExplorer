import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  currentUser: User;

  constructor(private http: HttpClient) {
    console.log('User services started!');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

  insertUser(name: string, email: string, password: string) {
    return this.http.post('/api/user/add', {
      'name': name,
      'email': email,
      'password': password
    });

  }

  updateUser(userid: string, name: string, email: string) {
    return this.http.post('/api/user/update/' + userid, {
      'name': name,
      'email': email
    });
  }

  changePassword(userid: string, password: string) {
    return this.http.post('/api/user/changePassword/' + userid, {
      'password': password,
    });
  }

  deleteUser(id: string) {
    return this.http.get('/api/user/delete/' + id);
  }

  authenticate(email: string, password: string) {
    return this.http.post('/api/user/authenticate', {
      'email': email,
      'password': password
    });
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
