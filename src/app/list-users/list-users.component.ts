import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';

@Component({
  selector: 'list-users-component',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [ListService],
})
export class ListUsersComponent implements OnInit {

  fetchedUsers: any
  constructor(private list: ListService) { }

  ngOnInit(): void {
    this.fetchedUsers = [{
      userID: "124",
      userName: "Arun",
      email: "any",
      phone: 454546461
    }]
  }
  exportCSV() {
        let a = document.createElement('a');
        a.href = "http://127.0.0.1:8000/download-csv";
        a.target ='_blank';
        a.download = 'edit_user.csv';
        a.click();
  }
}
