import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService, TranslateConfigService } from 'src/app/@core/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.scss']
})
export class ResendEmailComponent implements OnInit {

  formData: any = {
    email: ''
  };

  submitted: boolean = false;

  statusIcon: any = faCheck;
  message: string = '';
  errorOcurred: boolean = false;

  successMessage: string = 'Success';
  failureMessage: string = 'Failure';

  buttonOptions: any = {
    text: 'Send',
    type: 'default',
    useSubmitBehavior: true
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private translateService: TranslateConfigService,
    private spinner: NgxSpinnerService
  ) {
    this.translateService.get('auth.resendEmail.resendButton').subscribe(
      (text: string) => { this.buttonOptions.text = text }
    );
    this.translateService.get('auth.resendEmail.successMessage').subscribe(
      (text: string) => { this.successMessage = text }
    );
    this.translateService.get('auth.resendEmail.failureMessage').subscribe(
      (text: string) => { this.failureMessage = text }
    );
  }

  ngOnInit(): void {
    this.formData.email = this.route.snapshot.queryParamMap.get('email');
  }

  onFormSubmit(e): void {
    e.preventDefault();
    this.spinner.show();
    this.authService.resendEmail(this.formData.email).then(
      () => {
        this.message = this.successMessage;
        this.spinner.hide();
        this.submitted = true;
        setTimeout(
          ()=> {
            this.router.navigate(['/'])
          }, 5000 );
      },
      () => {
        this.statusIcon = faTimes;
        this.message = this.failureMessage;
        this.errorOcurred = true;
        this.spinner.hide();
        this.submitted = true;
      }
    );
  }

  emailComparison = (): string => {
    return this.formData.email;
  }

  asyncValidation = (params): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.authService.isEmailRegistered(params.value).then(
        () => { reject() }, () => { resolve() }
      )
    })
  }

}
