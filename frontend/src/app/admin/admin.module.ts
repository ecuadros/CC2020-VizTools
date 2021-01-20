import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DevExtremeModule } from 'devextreme-angular';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../@core/core.module';
import { WeightComponent } from './weight/weight.component';
import { CompareToolComponent } from './compare-tool/compare-tool.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MultiprogramGridComponent } from './weight/multiprogram-grid/multiprogram-grid.component';



@NgModule({
  declarations: [
    AdminComponent,
    WeightComponent,
    CompareToolComponent,
    MultiprogramGridComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    DevExtremeModule,
    FontAwesomeModule,
    TranslateModule
  ]
})
export class AdminModule { }
