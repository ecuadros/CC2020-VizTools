import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard {

  static canActivate(router = inject(Router), authService = inject(AuthService)) {
    if (!authService.isAuthenticated()) {
      return true;
    }
    if (authService.isUser()) {
      return router.navigate(['/user/home']);
    }
    if (authService.isAdmin()) {
      return router.navigate(['/admin/home']);
    }
    return false;
  }

}
