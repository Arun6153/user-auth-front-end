import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';

declare var $: any;
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
    if (!this.checkEmailPresent(user.email) && !this.checkUserIDPresent(user.userID)) {
      console.log("in phone");
      if (user.phone.length == 10 || user.phone.length == 0) {
        if ((this.cPassword == user.password && user.password.length > 0)) {
          if ( $("input[name='radio-op']:checked").val()) {
            this.registerUser();
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
      this.register.checkEmail({ email: email }).subscribe(
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
      this.register.checkUserID({ userID: userID }).subscribe(
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
}
