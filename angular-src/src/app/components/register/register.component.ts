import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.register(form.value.username, form.value.password)
        .subscribe(res => {
          if (res['success']) {
            this.message = 'You are registered, please login!';
            form.reset();
          } else {
            this.message = 'Some isssue with your registration please contact admin!';
          }
        }, error=>{
          this.message = 'Some isssue with your registration please contact admin!';
        });
    } else {
      this.message = 'Please enter valid inputs!';
    }
  }

}
