import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from '../@core/core.module';
import { DevExtremeModule } from 'devextreme-angular';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    UserComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    DevExtremeModule
  ]
})
export class UserModule { }