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
 
  constructor(private editUsr:EditUserService, private list: ListService, ) { }

  ngOnInit(): void {
    this.placeholder={ email:"", userID:"", name:"", phone:"", password:"", option:"" }
    this.cPassword="";
    this.bringUser();
  }

  bringUser()
  {
    
  }
  placeholderData(userID)
  {
    // ASSIGNING FETCHED DATA TO PLACEHOLDER
    this.fetchedUser.forEach(user => {
      if(user.userid == userID)
      {
        this.placeholder={ email:user.email, userID:user.userid, name:user.name, phone:user.phone, password:"", option:user.option, id:user.id } 
      }
    });
  }

  checkDetails()
  {
    console.log("save")
  }  
}