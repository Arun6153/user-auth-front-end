import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { HomeLayoutComponent } from '../home-layout/home-layout.component';


declare var $: any;
@Component({
  selector: 'edit-users-component',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})

export class EditUsersComponent implements OnInit {
  fetchedUsers: any
  home:HomeLayoutComponent
  placeholder;

  constructor(private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.placeholder={
      email:"",
      userID:"",
      name:"",
      phone:"",
      password:"",
      option:"",
    }    
    this.fetchedUsers = [
      { userID: "124", userName: "Arun", email: "any", name:"ArunSAiin", phone: 454546461,password:"arun6153" ,option:"all" },{ userID: "12", userName: "ArunSarun", email: "any", name:"ArunSAiin", phone: 454546461,password:"arun6153" ,option:"all" },{ userID: "14", userName: "Arun", email: "any", name:"ArunSAiin", phone: 454546461,password:"arun6153" ,option:"all" }
    ]
  }

  ////////////  ADD DATA TO PLACEHOLDERs
  placeholderData(userID)
  {
    $("#exampleModal").modal('show');
    console.log(userID);
    this.fetchedUsers.forEach(user => {
      if(user.userID == userID)
      {
        this.placeholder={
          email:user.email,
          userID:user.userID,
          name:user.name,
          phone:user.phone,
          password:user.password,
          option:user.option,
        } 
      }
    });
  }
  submitData()
  {
    this.placeholder={}
    $("#exampleModal").modal('hide');
  }
  clearPlaceHolder()
  {
    this.placeholder={}
    $("#exampleModal").modal('hide');
  }
}
