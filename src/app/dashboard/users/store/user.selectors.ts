import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectIsActiveUsersArray = createSelector(
  selectUserState,
  (usersState) => usersState.data.filter((user) => user.isActive)
);

export const selectLoadingUsers = createSelector(
  selectUserState,
  (usersState) => usersState.loading
);
