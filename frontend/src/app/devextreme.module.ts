import { NgModule } from '@angular/core';
import {
  DxBoxModule,
  DxButtonModule,
  DxChartModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxFormModule,
  DxNavBarModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxFileUploaderModule,
  DxTreeViewModule,
  DxPopupModule, 
  DxPopoverModule,
  DxScrollViewModule,
  DxToolbarModule,
  DxPolarChartModule
} from 'devextreme-angular';

@NgModule({
  imports: [
    DxButtonModule,
    DxChartModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxBoxModule,
    DxDataGridModule,
    DxNavBarModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxTreeViewModule,
    DxPopupModule, 
    DxPopoverModule,
    DxSelectBoxModule,
    DxFormModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxPolarChartModule
  ],
  exports: [
    DxButtonModule,
    DxChartModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxBoxModule,
    DxDataGridModule,
    DxNavBarModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxTreeViewModule,
    DxPopupModule, 
    DxPopoverModule,
    DxSelectBoxModule,
    DxFormModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxPolarChartModule
  ]
})
export class DevExtremeModule { }
