import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-users-component',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  fetchedUsers:any
  constructor() { }

  ngOnInit(): void {
    this.fetchedUsers=[{
      userID:"124",
      userName:"Arun",
      email:"any",
      phone:454546461
    }]
  }
  exportToCSV()
  {
    
  }
}
