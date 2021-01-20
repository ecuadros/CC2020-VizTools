import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../shared/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  languages: any[];

  selectedLanguage: any;

  constructor(
    private translateService: TranslateConfigService
  ) {
    this.languages = this.translateService.languages;
    let currentLang = this.translateService.currentLang;
    this.selectedLanguage = this.languages.find(item => item.lang == currentLang);
  }

  ngOnInit(): void {
  }

  onSelectedLanguage() {
    this.translateService.changeLang(this.selectedLanguage.lang);
    window.location.reload();
  }

}
