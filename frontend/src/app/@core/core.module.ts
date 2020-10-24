import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent, AlertComponent } from './components';
import { SampleComponent } from './layouts';
import { RouterModule } from '@angular/router';
import { AlertService, AuthService } from './services';
import { AuthGuard } from './guards';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SampleComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SampleComponent,
    AlertComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AlertService,
        AuthService,
        AuthGuard
      ],
    };
  }
}