import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import {
  AuthService,
  CountryService,
  DisciplineService,
  DKAService,
  DKAGService,
  InstitutionService,
  ProgramService,
  PWeightService
} from '@core/services';



const JwtModuleConfig = {
  config: {
    tokenGetter: () => AuthService.token,
    allowedDomains: ['localhost:8443', 'cc.spc.org.pe'],
    disallowedRoutes: ['//localhost:8443/api/v1/auth/*', '//cc.spc.org.pe/api/v1/auth/*']
  }
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot(JwtModuleConfig)
  ],
  providers: [
    AuthService,
    CountryService,
    DisciplineService,
    DKAService,
    DKAGService,
    InstitutionService,
    ProgramService,
    PWeightService
  ]
})
export class CoreModule { }
