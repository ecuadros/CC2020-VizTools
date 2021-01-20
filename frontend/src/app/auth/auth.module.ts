import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { DevExtremeModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../@core/core.module';
import { AuthComponent } from './auth.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResendEmailComponent } from './resend-email/resend-email.component';
import { CredentialsFormComponent } from './register/credentials-form/credentials-form.component';
import { InfoFormComponent } from './register/info-form/info-form.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    ResendEmailComponent,
    CredentialsFormComponent,
    InfoFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DevExtremeModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    CoreModule,
    TranslateModule
  ],
  exports: [
    CredentialsFormComponent
  ]
})
export class AuthModule { }
