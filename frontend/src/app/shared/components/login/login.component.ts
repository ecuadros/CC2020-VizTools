import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '@core/models';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private auhtService: AuthService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  onLogin() {
    if (this.formLogin.invalid) {
      return;
    }
    const loginModel: LoginModel = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value
    };
    this.auhtService.login(loginModel).subscribe({
      next: () => {
        if (this.auhtService.isAdmin()) {
          this.router.navigate(['/admin/home']);
        }
        if (this.auhtService.isUser()) {
          this.router.navigate(['/user/home']);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
