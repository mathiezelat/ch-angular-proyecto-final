import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (authState) => authState.authenticatedUser
);

export const selectLoadingUser = createSelector(
  selectAuthState,
  (authState) => authState.loading
);
