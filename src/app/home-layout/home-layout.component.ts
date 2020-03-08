import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent implements OnInit {
  // GLOBAL VARIABLE

  name: string;
  perm: string;
  constructor() { }

  ngOnInit(): void {
    const data= JSON.parse(localStorage.getItem("userToken"));
    this.name = data.name;
    this.perm = data.permission;
  }

  // CONDITIONAL RENDERING FOR SIDE NAV
  GetOutBro() {
    console.log("some thing is fishy.")
    localStorage.removeItem("userToken");
    window.location.replace('http://127.0.0.1:4200/');
  }

  // FUNCTIONS CONTROLING OPEN & CLOSING OF SIDENAV
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}
