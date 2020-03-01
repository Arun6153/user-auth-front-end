import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { HomeLayoutComponent } from '../home-layout/home-layout.component';
import { ListService } from '../list-users/list.service';

declare var $: any;
@Component({
  selector: 'edit-users-component',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'],
  providers: [ListService],
})

export class EditUsersComponent implements OnInit {
  fetchedUsers: any
  home:HomeLayoutComponent
  placeholder;
 
  constructor(private route:ActivatedRoute, private list: ListService) { }
  ngOnInit(): void {
    this.placeholder={
      email:"",
      userID:"",
      name:"",
      phone:"",
      password:"",
      option:"",
    }
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
