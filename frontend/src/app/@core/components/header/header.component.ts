import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() navItems: any;

  isAuthenticated: boolean = false;

  userName = "";
  universityName = "";
  email = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.universityName = this.authService.universityName;
    this.userName = this.authService.userName;
    this.email = this.authService.email;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
