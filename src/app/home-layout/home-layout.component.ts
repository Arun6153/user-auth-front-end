import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router ,ParamMap} from '@angular/router';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent implements OnInit {
  // GLOBAL VARIABLE
  one: boolean;
  two: boolean;
  three: boolean;
  name:string;

  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.one = true;
    this.two = false;
    this.three = false;
    this.name="Arun";
    this.router.navigate(['home'],{relativeTo:this.route})
  }

  // CONDITIONAL RENDERING FOR SIDE NAV
  switch(pipe) {
    if (pipe == 1) {
      this.one = true; this.two = false; this.three = false;
      this.router.navigate(['list'],{relativeTo:this.route})
    }
    else if (pipe == 2) {
      this.one = false; this.two = true; this.three = false;
      this.router.navigate(['edit'],{relativeTo:this.route})
    }
    else if (pipe == 3) {
      this.one = false; this.two = false; this.three = true;
      this.router.navigate(['import'],{relativeTo:this.route})
    }
    else if (pipe == 4) {
      // LOGOUT
      localStorage.removeItem('tokenUser');
      window.location.replace('http://127.0.0.1:4200/');
    }
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
