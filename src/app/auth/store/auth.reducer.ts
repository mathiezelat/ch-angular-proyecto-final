import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/dashboard/users/models/user.model';

export const authFeatureKey = 'auth';

export interface State {
  authenticatedUser: User | null;
  loading: boolean;
  error: unknown;
}

const initialState: State = {
  authenticatedUser: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    authenticatedUser: action.authenticatedUser,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    authenticatedUser: action.authenticatedUser,
    loading: false,
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.update, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.updateSuccess, (state, action) => ({
    ...state,
    authenticatedUser: action.authenticatedUser,
    loading: false,
  })),
  on(AuthActions.updateFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.authStateChanged, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.authStateChangedSuccess, (state, action) => ({
    ...state,
    authenticatedUser: action.authenticatedUser,
    loading: false,
  })),
  on(AuthActions.authStateChangedFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.logOutSuccess, () => initialState),
  on(AuthActions.logOutFailure, (state, action) => ({
    ...initialState,
    loading: false,
    error: action.error,
  }))
);
