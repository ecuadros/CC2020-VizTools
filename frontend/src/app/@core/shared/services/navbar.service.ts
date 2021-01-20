import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TranslateConfigService } from './translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  userRoutes: any[] = [
    {
      name: 'Home',
      path: '/user'
    },
    {
      name: 'Comparision Tool',
      path: '/user/compare-tool'
    }
  ];

  adminRoutes: any[] = [
    {
      name: 'Home',
      path: '/admin'
    },
    {
      name: 'Comparision Tool',
      path: '/admin/compare-tool'
    }
  ];

  constructor(
    private authService: AuthService,
    private translateService: TranslateConfigService
  ) {
    this.translateService.get('navbar').subscribe(
      (navbar: any) => {
        this.userRoutes[0].name = navbar.homeRoute;
        this.userRoutes[1].name = navbar.userCompareToolRoute;
        this.adminRoutes[0].name = navbar.homeRoute;
        this.adminRoutes[1].name = navbar.adminCompareToolRoute;
      }
    );
  }

  getRoutes(): string[] {
    if (!this.authService.isAuthenticated()) {
      return [];
    }
    if (this.authService.isAdmin()) {
      return this.adminRoutes;
    }
    return this.userRoutes;
  }

}
