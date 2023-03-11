import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services';

enum AuthActivateAccountState {
  Loading,
  Success,
  Error
}

@Component({
  selector: 'app-auth-activate-account',
  templateUrl: './auth-activate-account.component.html',
  styleUrls: ['./auth-activate-account.component.scss']
})
export class AuthActivateAccountComponent {

  token!: string;

  state: AuthActivateAccountState = AuthActivateAccountState.Loading;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let _token = this.route.snapshot.paramMap.get('token');
    if (_token) {
      this.token = _token;
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.authService.activateAccount(this.token).subscribe({
      next: () => {
        this.state = AuthActivateAccountState.Success;
        setTimeout(
          () => {
            this.router.navigate(['/'])
          }, 5000);
      },
      error: () => {
        this.state = AuthActivateAccountState.Error;
        setTimeout(
          () => {
            this.router.navigate(['/auth/resend-email'])
          }, 5000);
      }
    })
  }

}
