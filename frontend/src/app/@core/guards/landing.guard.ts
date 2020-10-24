import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LandingdGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/']);
    } else {
      this.router.navigate(['/user/']);
    }
    return false;
  }

}
