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
  disable:boolean
  constructor(private login: LoginService) {
    this.failureAttempt = this.timeData.getBool();
    this.disable = !this.failureAttempt
    this.timeDI="0 : 0";
    this.nowItsTime();
   }

  ngOnInit(): void {

   
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
        }
        
        this.storage.clearData();
        this.timeData.clearData();
        localStorage.setItem('userToken', JSON.stringify(store));
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
    }
    else if (attempt == 3) {
      this.timeData.setBool(true);
      this.failureAttempt = true;
      this.nowItsTime
      this.storage.setDataAttempts(attempt);
    }
    else {
      this.timeData.setBool(true);
      this.failureAttempt = true;
      this.nowItsTime();
    }
    alert("Attempt: " + attempt + "  Attempt Left: " + (3 - attempt))
  }

  nowItsTime() {

    if(!this.failureAttempt)
    {
      console.log("val"+this.failureAttempt);
      return;
    }  

    let time = 0;
    let timeDynamic = this.timeData.getDataTime();

    this.watchTime = setInterval(() => {
      if (time % 1000 == 0) {
        time=0;

        timeDynamic++;
        this.timeDI = Math.floor(timeDynamic/60)+" : "+(timeDynamic%60);
        console.log(this.timeDI);
        this.timeData.setDatatimes(timeDynamic);
      }
      if (timeDynamic >= 300) {
        this.storage.setDataAttempts(0);
        this.timeData.setDatatimes(0);
        this.timeData.setBool(false);
        this.failureAttempt = false;

        clearInterval(this.watchTime);
      }
      time++;
    }, 0);
  }

  convert(sec):number{
      let minutes = sec/60;
      return Math.floor(minutes);
  }
  // convert(time):string {
  //   var ms = time;
  //   var min = ms / 1000 / 60;
  //   var r = min % 1;
  //   var sec = Math.floor(r * 60);
  //   if (sec < 10) {
  //     min = Math.floor(min);
  //     return (min + ':' + '0' + sec);
  //   }
  //   min = Math.floor(min);
  //   return (min + ' min :' + sec+" sec");
  // }
  
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }
}
