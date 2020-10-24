import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
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
