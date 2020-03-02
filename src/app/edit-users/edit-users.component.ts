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
        } 
      }
    });
  }
  submitData(object)
  {
    console.log(object);
    this.editUsr.edit(object).subscribe(
      (res)=>{
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
    if ( !this.checkPresent(user.email, user.userID)) {
      if (user.phone.length == 10 || user.phone.length ==0) {
        if ((this.cPassword == user.password && user.password.length > 0) ) {
          if (user.option) {
            $("#exampleModal").modal('hide');
            this.submitData(this.placeholder);
            this.placeholder={}
          }
          else alert("select any one permission.")
          // alert("You have already registered with us.")
        }
        else alert("Your password did'nt matches.")
      }
      else alert("Either add phone no or leave it.")
    }
    else alert("Your email or UserId is incorrect.")
  }
  checkPresent(email, userID): boolean {
    if(this.ValidateEmail(email) && userID!="")
    {

    }
    return false;
  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }
}