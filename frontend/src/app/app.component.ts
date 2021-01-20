import { Component } from '@angular/core';
import { TranslateConfigService } from './@core/shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translateService: TranslateConfigService
  ) {
    this.translateService.setDefaultLang('en');
  }

}
