import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { AuthState } from './auth.state';



export const selectAuthFeatureState = (state: RootState) => state.auth;

export const selectIsLoading = createSelector(
  selectAuthFeatureState,
  (state: AuthState) => state.isLoading
);

export const selectError = createSelector(
  selectAuthFeatureState,
  (state: AuthState) => state.error
);

export const AuthSelector = {
  selectIsLoading,
  selectError
};
