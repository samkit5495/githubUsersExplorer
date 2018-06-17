import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {GithubUserService} from "../../../services/githubUser.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  login: string;
  user;
  repos;
  invalid: boolean = false;

  constructor(private route: ActivatedRoute, private githubUserService: GithubUserService) {
  }

  ngOnInit() {
    this.login = this.route.snapshot.params['login'];
    this.githubUserService.getUser(this.login)
      .subscribe(res => {
        if ('message' in res && res['message'] == 'Not Found') {
          this.invalid = true;
          return;
        }
        this.user = res;
        this.githubUserService.insertUser(this.user)
          .subscribe(result=>{
            console.log(result);
          });
        this.githubUserService.get(this.user.repos_url)
          .subscribe(res => {
            this.repos = res;
          });
      }, error1 => {
        this.invalid = true;
      });
  }

}
