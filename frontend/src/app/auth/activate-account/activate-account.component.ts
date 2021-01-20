import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService, TranslateConfigService } from 'src/app/@core/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  token: string;

  errorOcurred: boolean = false;
  message: string;

  statusIcon: any;

  successMessage: string = 'Success';
  failureMessage: string = 'Failure';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translateService: TranslateConfigService
    ) {
      this.token = this.route.snapshot.paramMap.get('token');
      spinner.show();
      this.translateService.get('auth.activateAccount.successMessage').subscribe(
        (text: string) => { this.successMessage = text }
      );
      this.translateService.get('auth.activateAccount.failureMessage').subscribe(
        (text: string) => { this.failureMessage = text }
      );
    }

  ngOnInit(): void {
    this.authService.activateAccount(this.token).then(
      () => {
        this.statusIcon = faCheck;
        this.message = this.successMessage;
        this.spinner.hide();
        setTimeout(
          ()=> {
            this.router.navigate(['/auth/login'])
          }, 5000 );
      },
      () => {
        this.statusIcon = faTimes;
        this.message = this.failureMessage;
        this.errorOcurred = true;
        this.spinner.hide();
        setTimeout(
          ()=> {
            this.router.navigate(['/auth/resend-email'])
          }, 5000 );
      }
    );
  }

}
