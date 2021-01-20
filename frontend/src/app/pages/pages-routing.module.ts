import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { LandingGuard } from '../@core/guards';
import { LandingComponent } from './landing/landing.component';
import { CompareToolComponent } from './compare-tool/compare-tool.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: LandingComponent,
      canActivate: [ LandingGuard ]
    },
    {
      path: 'compare-tool',
      component: CompareToolComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
