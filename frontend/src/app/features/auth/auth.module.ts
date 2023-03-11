import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthActivateAccountComponent } from './pages/auth-activate-account/auth-activate-account.component';


@NgModule({
  declarations: [
    AuthComponent,
    AuthActivateAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
