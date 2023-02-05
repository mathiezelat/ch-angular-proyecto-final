import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

export const userFeatureKey = 'user';

export interface State {
  data: User[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: action.data,
  })),
  on(UserActions.loadUsersFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.updateUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((user) => {
      if (user.id === action.data.id) {
        return { ...user, ...action.data };
      }
      return user;
    }),
  })),
  on(UserActions.updateUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.deleteUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((user) => {
      if (user.id === action.data.id) {
        return { ...user, ...action.data };
      }
      return user;
    }),
  })),
  on(UserActions.deleteUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(UserActions.resetUsersState, () => initialState)
);
