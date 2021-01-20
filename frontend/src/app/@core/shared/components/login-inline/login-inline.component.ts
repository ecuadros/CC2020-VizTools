import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AuthService, TranslateConfigService } from 'src/app/@core/shared/services';
import { Alert } from 'src/app/@core/models';

@Component({
  selector: 'app-login-inline',
  templateUrl: './login-inline.component.html',
  styleUrls: ['./login-inline.component.scss']
})
export class LoginInlineComponent implements OnInit {

  formData: any = {
    email: '',
    password: ''
  };

  errorUnauthorizedMessage: string;
  errorNotActivatedMessage: string;

  resendLinkLabel: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateConfigService
  ) {
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
  }

  onLogin(e): void {
    e.preventDefault();
    this.authService.login(this.formData.email, this.formData.password).subscribe(
      () => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
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
