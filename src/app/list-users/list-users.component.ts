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
  alert:boolean;
  ngOnInit(): void {
    this.fetchedUsers = [];
    this.bringAllUsers();
    this.alert = false;
  }

  myFunction(event) {
    let input, filter, table, tr, td1, td2, td3, td4, i, txtValue1, txtValue2, txtValue3, txtValue4;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td1=  tr[i].getElementsByTagName("td")[0];
      td2=  tr[i].getElementsByTagName("td")[1];
      td3=  tr[i].getElementsByTagName("td")[2];
      td4=  tr[i].getElementsByTagName("td")[3];


      if (td1 || td2 || td3 || td4) {
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;
        txtValue4 = td4.textContent || td4.innerText;

        let one = txtValue1.toUpperCase().indexOf(filter);
        let two = txtValue2.toUpperCase().indexOf(filter);
        let three = txtValue3.toUpperCase().indexOf(filter);
        let four = txtValue4.toUpperCase().indexOf(filter);


        if ((one > -1)|| (two > -1) ||(three > -1) ||(four > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
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

  bringAllUsers() {
    this.list.list().subscribe(
      (res) => {
        this.fetchedUsers = res.data;
      }
    )
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
