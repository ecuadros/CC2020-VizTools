import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { WeightComponent } from './weight/weight.component';
import { AdminGuard } from '../@core/guards';
import { CompareToolComponent } from './compare-tool/compare-tool.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivateChild: [ AdminGuard ],
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
export class AdminRoutingModule { }