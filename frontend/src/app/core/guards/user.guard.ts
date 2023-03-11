import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {

  static canLoad(router = inject(Router), authService = inject(AuthService)) {
    let isAuthorized = authService.isUser();
    if (!isAuthorized) {
      return router.navigate(['']);
    }
    return isAuthorized;
  }

}
