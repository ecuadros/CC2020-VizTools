import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from '../@core/core.module';
import { DevExtremeModule } from 'devextreme-angular';
import { WeightComponent } from './weight/weight.component';
import { CompareToolComponent } from './compare-tool/compare-tool.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    UserComponent,
    WeightComponent,
    CompareToolComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    DevExtremeModule,
    TranslateModule
  ]
})
export class UserModule { }
