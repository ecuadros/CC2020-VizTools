import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { PublicHomeComponent } from './pages/public-home/public-home.component';
import { PublicCompareToolComponent } from './pages/public-compare-tool/public-compare-tool.component';
import { HomeGuard } from '@core/guards';

const routes: Routes = [{
  path: '',
  component: PublicComponent,
  children: [
    {
      path: '',
      component: PublicHomeComponent,
      canActivate: [() => HomeGuard.canActivate()]
    },
    {
      path: 'compare-tool',
      component: PublicCompareToolComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
