import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  languages: any[] = [
    {
      name: 'English',
      lang: 'en'
    }, {
      name: 'Español',
      lang: 'es'
    }
  ];

  constructor(
    private translateService: TranslateService
  ) { }

  get(token: string): Observable<any> {
    return this.translateService.get(token);
  }

  setDefaultLang(lang: string): void {
    if (this.storeLang === null) {
      this.storeLang = lang;
      this.translateService.setDefaultLang(lang);
    }
    this.translateService.use(this.storeLang);
  }

  changeLang(lang: string): void {
    this.storeLang = lang;
    this.translateService.use(lang);
  }

  get currentLang(): string {
    return this.translateService.currentLang;
  }

  get storeLang(): string {
    return localStorage.getItem('lang');
  }

  set storeLang(lang: string) {
    localStorage.setItem('lang', lang);
  }

}
