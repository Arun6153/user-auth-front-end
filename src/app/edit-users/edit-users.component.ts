import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { HomeLayoutComponent } from '../home-layout/home-layout.component';

@Component({
  selector: 'edit-users-component',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  fetchedUsers: any
  home:HomeLayoutComponent
  constructor(private route:ActivatedRoute) { }
  ngOnInit(): void {
    // this.route.paramMap.route="";

    this.fetchedUsers = [{
      userID: "124",
      userName: "Arun",
      email: "any",
      phone: 454546461
    }]
  }
}
