import { Injectable } from '@angular/core';
import { LoginModel } from '@core/models';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/auth/auth.actions';
import { AuthSelector } from '@store/auth/auth.selectors';
import { RootState } from '@store/index';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private readonly store: Store<RootState>) {
    this.isLoading$ = this.store.select(AuthSelector.selectIsLoading);
    this.error$ = this.store.select(AuthSelector.selectError);
  }

  login(loginData: LoginModel) {
    this.store.dispatch(AuthActions.loginAction({ loginData }));
  }

  loginError(error: string) {
    this.store.dispatch(AuthActions.loginFailureAction({ error }));
  }

  /*
  logout() {
    this.store.dispatch(AuthActions.logoutAction());
  }
  */

}