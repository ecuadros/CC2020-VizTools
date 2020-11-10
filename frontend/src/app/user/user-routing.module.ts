import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { UserGuard } from '../@core/guards';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  canActivateChild: [ UserGuard ],
  children: [
    {
      path: '',
      component: LandingComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }