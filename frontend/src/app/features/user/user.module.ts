import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserCompareToolComponent } from './pages/user-compare-tool/user-compare-tool.component';



@NgModule({
  declarations: [
    UserComponent,
    UserHomeComponent,
    UserCompareToolComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
