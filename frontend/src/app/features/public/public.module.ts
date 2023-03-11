import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { PublicHomeComponent } from './pages/public-home/public-home.component';
import { RegisterComponent } from './components/register/register.component';
import { PublicCompareToolComponent } from './pages/public-compare-tool/public-compare-tool.component';


@NgModule({
  declarations: [
    PublicComponent,
    PublicHomeComponent,
    RegisterComponent,
    PublicCompareToolComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
