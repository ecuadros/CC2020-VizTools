import { NgModule } from '@angular/core';
import {
  DxChartModule,
  DxDataGridModule,
  DxTemplateModule
} from 'devextreme-angular';



const DevExtremeComponents = [
  DxChartModule,
  DxDataGridModule,
  DxTemplateModule
];

@NgModule({
  imports: DevExtremeComponents,
  exports: DevExtremeComponents
})
export class DevExtremeModule { }