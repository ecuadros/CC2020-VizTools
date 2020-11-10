import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent, AlertComponent } from './components';
import { SampleComponent, BlockComponent } from './layouts';
import { RouterModule } from '@angular/router';
import {
  AlertService,
  AuthService,
  ChartService,
  CountryService,
  DKAGService,
  DKAService,
  ProgramService,
  UniversityService,
  UProgramService
} from './services';
import { AuthGuard, LandingdGuard } from './guards';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SampleComponent,
    AlertComponent,
    BlockComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SampleComponent,
    AlertComponent,
    BlockComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AlertService,
        AuthService,
        ChartService,
        CountryService,
        DKAGService,
        DKAService,
        ProgramService,
        UniversityService,
        UProgramService,
        AuthGuard,
        LandingdGuard
      ],
    };
  }
}