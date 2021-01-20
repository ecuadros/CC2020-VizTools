import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ResendEmailComponent } from './resend-email/resend-email.component';
import { AuthGuard } from '../@core/guards';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  canActivateChild: [ AuthGuard ],
  children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'activate-account/:token',
      component: ActivateAccountComponent,
    },
    {
      path: 'resend-email',
      component: ResendEmailComponent,
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
