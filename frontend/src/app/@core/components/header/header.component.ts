import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, NavbarService } from 'src/app/@core/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems: any[] = [];

  isAuthenticated: boolean = false;

  userName: string = '';
  universityName: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private navbarService: NavbarService
  ) {
    this.navItems = this.navbarService.getRoutes();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.universityName = this.authService.universityName;
    this.userName = this.authService.userName;
    this.email = this.authService.email;
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.navItems = this.navbarService.getRoutes();
    this.router.navigate(['/']);
  }

}
