import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DevExtremeModule } from 'devextreme-angular';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../@core/core.module';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    AdminComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    DevExtremeModule
  ]
})
export class AdminModule { }
