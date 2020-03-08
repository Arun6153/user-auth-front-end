import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { LocalData, TimeData } from '../component/localData'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  loginData;
  storage = new LocalData();
  timeData = new TimeData();
  watchTime: any;
  failureAttempt: boolean;
  timeDI: string;
  disable: boolean
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.toggleBool(this.timeData.getBool());
    this.timeDI = "0 : 0";
    this.nowItsTime();
    this.loginData = {
      email: "",
      password: "",
    }
  }

  verifyData() {
    let user = this.loginData;
    if (user.password.length > 0) {
      if (this.ValidateEmail(user.email))
        this.loginCheck();
    }
    else {
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
          token: res.token,
          email: res.email,
          name:res.name,
          permission:res.permission
        }
        this.storage.clearData();
        this.timeData.clearData();
        this.toggleBool(false);
        localStorage.setItem("userToken", JSON.stringify(store));
        window.location.replace('http://localhost:4200/dashboard/');
      },
      (error) => {
        this.updateAndAlert();
      }
    );
  }


  updateAndAlert() {
    let attempt = this.storage.getDataAttempts();

    attempt++;
    if (attempt < 3) {
      this.storage.setDataAttempts(attempt);
      alert("Attempt: " + attempt + "  Attempt Left: " + (3 - attempt))
    }
    else if (attempt == 3) {
      this.timeData.setBool(true);
      this.toggleBool(true);
      this.nowItsTime();
      this.storage.setDataAttempts(attempt);
      alert("Attempt: " + attempt + "  Attempt Left: " + (3 - attempt))
    }
    else {
      this.timeData.setBool(true);
      this.toggleBool(true);
      this.nowItsTime();
    }
  }

  nowItsTime() {

    if (!this.failureAttempt)
      return;

    let timeDynamic = this.timeData.getDataTime();

    this.watchTime = setInterval(() => {
      this.timeDI = this.convert(300 - timeDynamic);
      this.timeData.setDatatimes(timeDynamic);

      if (timeDynamic >= 300) {
        this.storage.setDataAttempts(0);
        this.timeData.setDatatimes(0);
        this.timeData.setBool(false);
        this.toggleBool(false)
        clearInterval(this.watchTime);
      }
      timeDynamic++;
    }, 1000);
  }
  toggleBool(bool) {
    console.log(bool);
    this.failureAttempt = bool;
    this.disable = !bool;
  }
  convert(time): string {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    return (min + ' min :' + sec + " sec");
  }

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("❌ You have entered an invalid email address!")
    return (false)
  }
}
