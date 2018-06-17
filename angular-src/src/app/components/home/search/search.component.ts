import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {NgForm} from "@angular/forms";
import {GithubUserService} from "../../../services/githubUser.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users = [];
  total_count: number;
  loading:boolean = false;

  constructor(private githubUserService: GithubUserService) {
  }

  ngOnInit() {
  }

  search(form: NgForm) {
    if(!form.valid)
      return;
    this.loading=true;
    this.githubUserService.searchUsers(form.value.search)
      .subscribe((res) => {
        this.total_count = res['total_count'];
        this.users = res['items'];
        this.users.splice(10);
        this.loading=false;
      });
  }

}
