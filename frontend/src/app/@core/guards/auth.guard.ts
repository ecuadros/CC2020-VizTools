import { Injectable } from '@angular/core';
import { Router, CanActivateChild,} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  
  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}