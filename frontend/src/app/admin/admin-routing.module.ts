import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { WeightComponent } from './weight/weight.component';
import { AdminGuard } from '../@core/guards';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivateChild: [ AdminGuard ],
  children: [
    {
      path: '',
      component: WeightComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }