import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenModel } from '@core/models';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  sidenavOpened: boolean = false;

  authToken: AuthTokenModel;
  isAuthenticated: boolean = false;

  routes!: {
    home: string,
    compareTool: string
  };

  constructor(
    private router: Router,
    private auhtService: AuthService
  ) {
    this.authToken = AuthService.authToken;
    this.isAuthenticated = this.auhtService.isAuthenticated();

    if (this.isAuthenticated) {
      if (this.auhtService.isAdmin()) {
        this.routes = {
          home: '/admin/home',
          compareTool: '/admin/compare-tool'
        }
      }
      if (this.auhtService.isUser()) {
        this.routes = {
          home: '/user/home',
          compareTool: '/user/compare-tool'
        }
      }
    } else {
      this.routes = {
        home: '/',
        compareTool: '/compare-tool'
      }
    }
  }

  onLogout() {
    this.auhtService.logout();
    this.router.navigate(['/']);
  }

}
