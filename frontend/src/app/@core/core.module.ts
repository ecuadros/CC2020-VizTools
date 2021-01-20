import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { TranslateModule } from '@ngx-translate/core';
import { DevExtremeModule } from '../devextreme.module';

import { HeaderComponent, FooterComponent } from './components';
import { SampleComponent, ExtendedSampleComponent, BlockComponent } from './layouts';
import { SessionInterceptor } from './interceptors';
import {
  AlertComponent,
  ChipListComponent,
  DlComputingProgramsComponent,
  DlUniversityProgramsComponent,
  DlUserProgramsComponent,
  LinearGraphComponent,
  LoginInlineComponent,
  ShareLinkComponent
} from './shared/components';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SampleComponent,
    ExtendedSampleComponent,
    BlockComponent,
    AlertComponent,
    ChipListComponent,
    DlComputingProgramsComponent,
    DlUniversityProgramsComponent,
    DlUserProgramsComponent,
    LinearGraphComponent,
    LoginInlineComponent,
    ShareLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ColorPickerModule,
    DevExtremeModule,
    TranslateModule
  ],
  exports: [
    SampleComponent,
    ExtendedSampleComponent,
    BlockComponent,
    AlertComponent,
    ChipListComponent,
    DlComputingProgramsComponent,
    DlUniversityProgramsComponent,
    DlUserProgramsComponent,
    LinearGraphComponent,
    LoginInlineComponent,
    ShareLinkComponent
  ]
})

export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SessionInterceptor,
          multi: true
        }
      ],
    };
  }
}
