import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-users-component',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  fetchedUsers: any
  constructor() { }

  ngOnInit(): void {
    this.fetchedUsers = [{
      userID: "124",
      userName: "Arun",
      email: "any",
      phone: 454546461
    }]
  }
}
