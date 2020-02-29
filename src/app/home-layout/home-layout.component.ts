import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  one: boolean;
  two: boolean;
  three: boolean;

  constructor() { }

  ngOnInit(): void {
    this.one = true;
    this.two = false;
    this.three = false;
  }





  // CONDITIONAL RENDERING FOR SIDE NAV
  switch(pipe) {
    if (pipe == 1) {
      this.one = true; this.two = false; this.three = false;
    }
    else if (pipe == 2) {
      this.one = false; this.two = true; this.three = false;
    }
    else if (pipe == 3) {
      this.one = false; this.two = false; this.three = true;
    }
    else if (pipe == 4) {
      // local storage work here LOGOUT
    }
  }
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}
