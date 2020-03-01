import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  loginData;
  constructor(private login: LoginService) { }

  ngOnInit(): void {
    this.loginData = {
      email: "",
      password: "",
    }
  }

  verifyData() {
    let user = this.loginData;
    if (user.password.length > 0)
    {
      if( this.ValidateEmail(user.email) )
          this.loginCheck();
    }
    else{
      alert("Fill the empty Fieldset.")
    }
  }
  // FOR VALIDATION OR SUBMIT DATA
  loginCheck() {
    console.log("in register");
    this.login.login(this.loginData).subscribe(
        (res) => {
          console.log(res)
          let store = {
            token:res.token,
            email:res.email,
          }
          localStorage.setItem('userToken', JSON.stringify(store));
          window.location.replace('http://localhost:4200/home');
        },
        error => alert(error)
    );
  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }
}
