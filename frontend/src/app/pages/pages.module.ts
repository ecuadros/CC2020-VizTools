import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DevExtremeModule } from '../devextreme.module';
import { ChartsModule } from 'ng2-charts'
import { CoreModule } from '../@core/core.module';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    PagesComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule,
    DevExtremeModule,
    ChartsModule
  ]
})
export class PagesModule { }
