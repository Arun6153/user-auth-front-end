import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { User } from '../component/localData';

declare var $: any;
@Component({
  selector: 'list-users-component',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [ListService],
})
export class ListUsersComponent implements OnInit {

  fetchedUsers: any
  private user: User;
  alert: boolean;
  perm: any
  placeholder: any;
  data: any;
  constructor(private list: ListService) { }

  ngOnInit(): void {
    this.placeholder = { email: "", userID: "", name: "", phone: "", option: "" }
    this.fetchedUsers = [];
    this.bringAllUsers();
    this.alert = false;
    this.perm = {
      superUser: false,
      normal: false,
      read: false,
    }
    this.data = {
      email: null,
      userid: null,
    }
    this.checkPermission();
  }








  submitData() {
    console.log(this.placeholder);
    this.checkEmailPresent(this.placeholder.email)
    this.checkUserIDPresent(this.placeholder.userID)
    setTimeout(cal => {
      if (this.data.email) {
        if (this.data.userid) {
          this.list.edit(this.placeholder).subscribe(
            (res) => {
              this.clearPlaceHolder();
              this.bringAllUsers();
              console.log(res);
            },
            err => console.log(err)
          )
        }
      }
    }, 1000)

  }

  /// Email and UserId checks
  checkEmailPresent(email) {
    this.list.checkEmail({ "email": email, "id": this.placeholder.id }).subscribe(
      (res) => {
        this.data.email = true;
      },
      err => {
        alert(err.error)
        this.data.email = false;
      }
    )

  }
  checkUserIDPresent(userID) {
    let invert = false;
    this.list.checkUserID({ "userID": userID, "id": this.placeholder.id }).subscribe(
      (res) => {
        this.data.userid = true;
      },
      err => {
        alert(err.error)
        this.data.userid = false;
      }
    );
  }
  /// checking permission of logged user
  checkPermission() {

    this.user = new User()
    let perm = this.user.perm();
    if (perm === "Sudo-User") {
      this.perm.superUser = true;
      this.perm.normal = false;
      this.perm.read = false;
    }
    else if (perm === "Normal") {
      this.perm.superUser = false;
      this.perm.normal = false;
      this.perm.read = false;
    }
    else {
      this.perm.superUser = false;
      this.perm.normal = false;
      this.perm.read = true;
    }
  }
  /// searching table contents
  myFunction(event) {
    let input, filter, table, tr, td1, td2, td3, td4, i, txtValue1, txtValue2, txtValue3, txtValue4;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[1];
      td3 = tr[i].getElementsByTagName("td")[2];
      td4 = tr[i].getElementsByTagName("td")[3];


      if (td1 || td2 || td3 || td4) {
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;
        txtValue4 = td4.textContent || td4.innerText;

        let one = txtValue1.toUpperCase().indexOf(filter);
        let two = txtValue2.toUpperCase().indexOf(filter);
        let three = txtValue3.toUpperCase().indexOf(filter);
        let four = txtValue4.toUpperCase().indexOf(filter);


        if ((one > -1) || (two > -1) || (three > -1) || (four > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  /// sorting contents of tables
  sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  /// fetch users from DB
  bringAllUsers() {
    this.list.list().subscribe(
      (res) => {
        this.fetchedUsers = res.data;
      },
      (err) => {
        document.getElementsByTagName("body")[0].innerHTML = "<h1>ERROR 500 - False Token</h1>";
      }
    )
  }
  /// placeholder data Fill And Clear
  placeholderData(userID) {
    $("#exampleModal").modal('show');
    console.log(userID);
    // ASSIGNING FETCHED DATA TO PLACEHOLDER
    this.fetchedUsers.forEach(user => {
      if (user.userid == userID) {
        this.placeholder = { email: user.email, userID: user.userid, name: user.name, phone: user.phone, option: user.option, id: user.id }
      }
    });
  }
  clearPlaceHolder() {
    this.placeholder = {}
    $("#exampleModal").modal('hide');
  }
  ///  CSV EXPORT IS WORKING HERE
  exportCSV() {
    this.alert = true;
    let a = document.createElement('a');
    a.href = "http://127.0.0.1:8000/download-csv";
    a.target = '_blank';
    a.download = 'edit_user.csv';
    a.click();
  }
}
