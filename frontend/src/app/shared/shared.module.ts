import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxColorsModule } from 'ngx-colors';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { MaterialModule } from './modules/material.module';
import { DevExtremeModule } from './modules/devextreme.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { LoggedLayoutComponent } from './layouts/logged-layout/logged-layout.component';
import { BlockLayoutComponent } from './layouts/block-layout/block-layout.component';
import { LoginComponent } from './components/login/login.component';
import { SelectSearchComponent } from './components/select-search/select-search.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    PublicLayoutComponent,
    LoggedLayoutComponent,
    BlockLayoutComponent,
    LoginComponent,
    SelectSearchComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxColorsModule,
    ShareIconsModule,
    ShareButtonsModule,
    MaterialModule,
    DevExtremeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ShareIconsModule,
    ShareButtonsModule,
    NgxColorsModule,
    MaterialModule,
    DevExtremeModule,
    PublicLayoutComponent,
    LoggedLayoutComponent,
    BlockLayoutComponent,
    SelectSearchComponent,
    LineChartComponent
  ]
})
export class SharedModule { }
