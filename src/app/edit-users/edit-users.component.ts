import { Component, OnInit } from '@angular/core';
import { HomeLayoutComponent } from '../home-layout/home-layout.component';
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
  fetchedUsers: any
  home:HomeLayoutComponent
  placeholder;
  cPassword;
 
  constructor(private editUsr:EditUserService, private list: ListService, ) { }
  ngOnInit(): void {
    this.placeholder={
      email:"",
      userID:"",
      name:"",
      phone:"",
      password:"",
      option:"",
    }
    this.cPassword="";
    this.bringAllUsers();
  }

  bringAllUsers()
  {
    this.list.list().subscribe(
      (res)=>{
        this.fetchedUsers = res.data;
        console.log(this.fetchedUsers)
      }
    )
  }
  ////////////  ADD DATA TO PLACEHOLDERs
  placeholderData(userID)
  {
    $("#exampleModal").modal('show');
    console.log(userID);
    this.fetchedUsers.forEach(user => {
      if(user.userid == userID)
      {
        this.placeholder={
          email:user.email,
          userID:user.userid,
          name:user.name,
          phone:user.phone,
          password:"not here yet",
          option:user.option,
          id:user.id
        } 
      }
    });
  }
  submitData(object)
  {
    console.log(object);
    this.editUsr.edit(object).subscribe(
      (res)=>{
        window.location.href = "http://127.0.0.1:4200/dashboard/home"
        console.log(res);
      },
      err => console.log(err)
    )
  }
  clearPlaceHolder()
  {
    this.placeholder={}
    $("#exampleModal").modal('hide');
  }
  //////////////////////////////////
  verifyFields() {
    let user = this.placeholder;
    if (!this.checkEmailPresent(user.email) && !this.checkUserIDPresent(user.userID)) {
      console.log("in phone");
      if (user.phone.length == 10 || user.phone.length == 0) {
        if ((this.cPassword == user.password && user.password.length > 0)) {
          if ( $("input[name='radio-op']:checked").val()) {
            $("#exampleModal").modal('hide');
            this.submitData(this.placeholder);
            this.placeholder={}
          }
          else alert("select any one permission.")
        }
        else alert("Your password did'nt matches.")
      }
      else alert("Either add phone no or leave it.")
    }
  }
  checkEmailPresent(email): boolean {
    let invert = false;
    if (this.ValidateEmail(email)) {
      this.editUsr.checkEmail({ email: email }).subscribe(
        (res) => {
          invert= false;
        },
        err => {
          alert(err.error)
          invert = true;
        }
      )
      return invert;
    }
    else alert("Your email field is empty.")
    return true;
  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }
  checkUserIDPresent(userID): boolean {
    let invert = false;
    if (userID != "") {
      this.editUsr.checkUserID({ userID: userID }).subscribe(
        (res) => {
          invert = false;
        },
        err => {
          alert(err.error)
          invert = true;
        }
      );
      console.log()
      return invert;
    }
    else alert("Your UserID field is empty.")
    return true;
  }
}