import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  message: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      this.userService.getClientId(username)
        .subscribe(clientId => {
          this.userService.authenticate(username, password, clientId.toString())
            .subscribe(res => {
              this.userService.login({
                id: clientId.toString(),
                username: username,
                password: password,
                access_token: res['access_token'],
              });
              this.router.navigate([this.returnUrl]);
            }, error => {
              this.message = 'Please enter valid details!';
            });
        });
    } else {
      this.message = 'Please enter valid inputs!';
    }
  }

}
