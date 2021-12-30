import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { Login } from './login';
import { LoginService } from './login.service';
import { DialogService } from '../dialog/dialog.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  model = new Login('', '');
  showLoad: boolean = false;
  showSubmit: boolean = false;
  errorMessage: String;
  showError: boolean = false;
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private authService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private idle: Idle,
    private keepalive: Keepalive,
    private dialogService: DialogService,
  ) { }

    ngOnInit() {
    }

    reset() {
      this.idle.watch();
      this.timedOut = false;
    }

    login(): void {
      this.showLoad = true;
      if (this.model.username != "" && this.model.password != "") {
        this.authService.login(this.model).then(response => {
          let obj = response.json();
          if (response.status == 200 && response.statusText == 'OK') {
            if (obj.d) {
              if (!this.timedOut) {
                //this is set is seconds
                this.idle.setIdle(300);
                this.idle.setTimeout(1500);
                this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
                this.idle.onTimeout.subscribe(() => {
                  console.log('Timed out!');
                  console.log(this);
                  this.timedOut = true;
                  this.idle.stop();
                  this.dialogService.openAlertDialog({
                    message: 'Session Timeout. You will be redirect to login page',
                    disabledClose: true
                  }).subscribe(() => {
                    this.dialogService.dialog.closeAll();
                    this.router.navigate(['login']);
                  });
                });

                //this.idle.watch();
                this.keepalive.interval(15);
                this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
                this.reset();
              }
              localStorage.setItem('username', this.model.username);
              this.router.navigate(["home"]);
            } else {
              this.showError = true;
              this.showLoad = false;
              this.errorMessage = "Authentication Failed: Invalid email or password!";
            }

          }
        }, error => {
          //let err = error.json();
          this.showError = true;
          this.showLoad = false;
          this.errorMessage = "Authentication Failed: Invalid email or password!";
        });
      } else {
        this.showLoad = false;
        this.showError = true;
        this.errorMessage = "Please enter your username and password!";
      }
    }

    /*public resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
      if (captchaResponse) {
        this.showSubmit = true;
      }
    }

    public onError(errorDetails: any[]) {
      console.log(`reCAPTCHA error encountered; details:`, errorDetails);
      if (errorDetails){
        this.showSubmit = false;
      }
    }*/
}
