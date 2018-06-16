import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users = [];
  total_count: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  search(form: NgForm) {
    this.userService.searchUsers(form.value.search)
      .subscribe((res) => {
        this.total_count = res['total_count'];
        this.users = res['items'];
        this.users.splice(10);
      });
  }

}
