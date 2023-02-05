import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ data: User }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ data: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ data: User }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ data: User }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);

export const resetUsersState = createAction('[User] Reset Users State');
