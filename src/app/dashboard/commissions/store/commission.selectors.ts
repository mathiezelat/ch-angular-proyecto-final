import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCommission from './commission.reducer';

export const selectCommissionState =
  createFeatureSelector<fromCommission.State>(
    fromCommission.commissionFeatureKey
  );

export const selectIsActiveCommissionsArray = createSelector(
  selectCommissionState,
  (commissionState) =>
    commissionState.data.filter((commission) => commission.isActive)
);

export const selectLoadingCommission = createSelector(
  selectCommissionState,
  (commissionState) => commissionState.loading
);
