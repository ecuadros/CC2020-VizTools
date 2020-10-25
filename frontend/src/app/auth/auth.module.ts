import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { DevExtremeModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../@core/core.module';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    DevExtremeModule,
    CoreModule
  ]
})
export class AuthModule { }
