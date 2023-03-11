import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';



export const initialState: AuthState = {
  loginData: null,
  isLoading: false,
  error: null
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loginAction, (state, { loginData }) => ({
    ...state,
    loginData: loginData,
    isLoading: true,
    error: null
  })),
  on(AuthActions.loginSuccessAction, state => ({
    ...state,
    isLoading: false,
    error: null
  })),
  on(AuthActions.loginFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);
