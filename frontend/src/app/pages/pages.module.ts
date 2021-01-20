import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DevExtremeModule } from '../devextreme.module';
import { ChartsModule } from 'ng2-charts'
import { CoreModule } from '../@core/core.module';
import { LandingComponent } from './landing/landing.component';
import { CompareToolComponent } from './compare-tool/compare-tool.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    PagesComponent,
    LandingComponent,
    CompareToolComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule,
    DevExtremeModule,
    ChartsModule,
    TranslateModule,
    AuthModule
  ]
})
export class PagesModule { }
