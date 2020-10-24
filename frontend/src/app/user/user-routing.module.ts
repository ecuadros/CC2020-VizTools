import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { LandingComponent } from '../pages/landing/landing.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
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