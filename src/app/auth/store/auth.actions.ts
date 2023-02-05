import { createAction, props } from '@ngrx/store';
import { User } from '../../dashboard/users/models/user.model';
import { AuthUser } from '../models/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ authUser: AuthUser }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authenticatedUser: User }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: unknown }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ authUser: AuthUser }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ authenticatedUser: User }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: unknown }>()
);

export const update = createAction('[Auth] Update', props<{ user: User }>());
export const updateSuccess = createAction(
  '[Auth] Update Success',
  props<{ authenticatedUser: User }>()
);
export const updateFailure = createAction(
  '[Auth] Update Failure',
  props<{ error: unknown }>()
);

export const authStateChanged = createAction('[Auth] AuthStateChanged');
export const authStateChangedSuccess = createAction(
  '[Auth] AuthStateChanged Success',
  props<{ authenticatedUser: User | null }>()
);
export const authStateChangedFailure = createAction(
  '[Auth] AuthStateChanged Failure',
  props<{ error: unknown }>()
);

export const logOut = createAction('[Auth] LogOut');
export const logOutSuccess = createAction('[Auth] LogOut Success');
export const logOutFailure = createAction(
  '[Auth] LogOut Failure',
  props<{ error: unknown }>()
);
