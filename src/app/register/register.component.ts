import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit {

  userData;
  cPassword;
  errString;
  constructor(private register: RegisterService) { }

  ngOnInit(): void {
    this.userData = {
      email: "",
      userID: "",
      name: "",
      phone: "",
      password: "",
      option: "",
    }
    this.cPassword = ""
  }


  
  verifyFields() {
    let user = this.userData;
    if ( !this.checkPresent(user.email, user.userID)) {
      if (user.phone.length == 10 || user.phone.length ==0) {
        if ((this.cPassword == user.password && user.password.length > 0) ) {
          if (user.option) {
            this.registerUser();
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

  // FOR VALIDATION OR SUBMIT DATA
  registerUser() {
    console.log("in register");
    this.register.register(this.userData).subscribe(
      (response) => {
        window.location.replace('http://localhost:4200')
      },
      error => console.log(error)
    );
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
