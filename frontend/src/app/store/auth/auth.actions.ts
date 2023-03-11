import { createAction, props } from '@ngrx/store';
import { LoginModel } from '@core/models';



export const loginAction = createAction(
  '[Auth] Login',
  props<{ loginData: LoginModel }>()
);

export const loginSuccessAction = createAction(
  '[Auth] Login Success'
);

export const loginFailureAction = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const AuthActions = {
  loginAction,
  loginSuccessAction,
  loginFailureAction
};
