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
  data: any;
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
    this.data = {
      email: null,
      userid: null,
    }
    this.cPassword = ""
  }



  verifyFields() {
    let user = this.userData;
    this.checkEmailPresent(user.email)
    this.checkUserIDPresent(user.userID)
    setTimeout(cal => {
      if (this.data.email) {
        if (this.data.userid) {
          if (user.phone.length == 10 || user.phone.length == 0) {
            if ((this.cPassword == user.password && user.password.length > 0)) {
              if ($("input[name='radio-op']:checked").val()) {
                this.registerUser();
              }
              else alert("select any one permission.")
            }
            else alert("Your password did'nt matches.")
          }
          else alert("Either add phone no or leave it.")
        }
      }
    })
  }

  checkEmailPresent(email) {

    // this.register.checkEmail({ "email": email }).subscribe(
    //   (res) => {
        this.data.email = true;
      // },
      // err => {
      //   alert(err.error)
      //   this.data.email = false;
      // }
    // )
  }
  // ValidateEmail(mail) {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
  //     return (true)
  //   }
  //   alert("You have entered an invalid email address!")
  //   return (false)
  // }

  checkUserIDPresent(userID) {
    // if (userID != "") {
    //   this.register.checkUserID({ "userID": userID }).subscribe(
    //     (res) => {
          this.data.userid = true;
    //     },
    //     err => {
    //       alert(err.error)
    //       this.data.userid = false;
    //     }
    //   );
    // }
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
