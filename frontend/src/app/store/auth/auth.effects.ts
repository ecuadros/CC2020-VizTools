import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      exhaustMap((action) => {
        return this.authService.login(action.loginData).pipe(
          map(() => AuthActions.loginSuccessAction()),
          catchError(error => of(AuthActions.loginFailureAction({ error })))
        );
      }
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccessAction),
      tap(() => this.router.navigate(['/']))
      //map(() => AuthActions.loadUserDataAction())
    )
  );

}
