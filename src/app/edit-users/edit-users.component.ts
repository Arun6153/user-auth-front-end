import { Component, OnInit } from '@angular/core';
import { ListService } from '../list-users/list.service';
import { EditUserService } from './edit-user.service'


declare var $: any;
@Component({
  selector: 'edit-users-component',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'],
  providers: [ListService, EditUserService],
})

export class EditUsersComponent implements OnInit {
  // GLOBAL VARIABLES
  fetchedUser: any
  placeholder: any;
  cPassword: any;
  data: any;
  constructor(private editUsr: EditUserService, private list: ListService, ) { }

  ngOnInit(): void {
    this.placeholder = { email: "", userID: "", name: "", phone: "", password: "", option: "" }
    this.data = {
      email: null,
      userid: null,
    }
    this.cPassword = "";
    this.bringUser();
  }

  bringUser() {
    this.editUsr.user().subscribe(
      (res) => {
        this.fetchedUser = res.data;
        let user = this.fetchedUser;
        console.log(res)
        this.placeholder = { email: user.email, userID: user.userid, name: user.name, phone: user.phone, password: "", option: user.permission, id: user.id }
      },
      (err) => {
        console.log()
      }
    )
  }

  checkDetails() {
    console.log(this.placeholder);
    this.checkEmailPresent(this.placeholder.email)
    this.checkUserIDPresent(this.placeholder.userID)
    setTimeout(cal => {
      if (this.data.email) {
        if (this.data.userid) {
          if (this.placeholder.password == this.cPassword) {
            this.editUsr.update(this.placeholder).subscribe(
              (res) => {
                console.log(res);
              },
              err => console.log(err)
            )
          }
          else{
            alert("Your password is'nt matching to confirm password.")
          }
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
}