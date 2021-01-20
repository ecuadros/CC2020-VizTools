import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { WeightComponent } from './weight/weight.component';
import { UserGuard } from '../@core/guards';
import { CompareToolComponent } from './compare-tool/compare-tool.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  canActivateChild: [ UserGuard ],
  children: [
    {
      path: '',
      component: WeightComponent,
    },
    {
      path: 'compare-tool',
      component: CompareToolComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }