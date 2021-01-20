import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/@core/models';
import { AlertService, AuthService, TranslateConfigService } from 'src/app/@core/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  formData: any = {
    email: '',
    password: ''
  };

  buttonOptions: any = {
    text: 'Log in',
    type: 'default',
    useSubmitBehavior: true
  };

  errorUnauthorizedMessage: string;
  errorNotActivatedMessage: string;

  resendLinkLabel: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private translateService: TranslateConfigService
  ) {
    this.translateService.get('auth.login.loginButton').subscribe(
      (text: string) => { this.buttonOptions.text = text }
    );
    this.translateService.get('auth.login.errorUnauthorizedMessage').subscribe(
      (text: string) => { this.errorUnauthorizedMessage = text }
    );
    this.translateService.get('auth.login.errorNotActivatedMessage').subscribe(
      (text: string) => { this.errorNotActivatedMessage = text }
    );
    this.translateService.get('auth.login.resendLink').subscribe(
      (text: string) => { this.resendLinkLabel = text }
    );
  }

  ngOnInit(): void {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';    
  }

  onFormSubmit(e): void {
    e.preventDefault();
    this.authService.login(this.formData.email, this.formData.password).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        let message: string = error.error;
        let alertOptions: Alert = new Alert();
        alertOptions.autoClose = true;
        alertOptions.keepAfterRouteChange = false;

        if (error.status === 401) {
          message = this.errorUnauthorizedMessage;
        }
        if (error.status === 409) {
          alertOptions.autoClose = false;
          alertOptions.linkUrl = '/auth/resend-email';
          alertOptions.linkLabel = this.resendLinkLabel;
          alertOptions.linkParams = {
            email: this.formData.email
          };
          message = this.errorNotActivatedMessage;
        }
        this.alertService.error(message, alertOptions);
      }
    );
  }

}
