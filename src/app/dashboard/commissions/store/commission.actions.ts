import { createAction, props } from '@ngrx/store';
import { Commission } from '../model/commission.model';

export const loadCommissions = createAction('[Commission] Load Commissions');

export const loadCommissionsSuccess = createAction(
  '[Commission] Load Commissions Success',
  props<{ data: Commission[] }>()
);

export const loadCommissionsFailure = createAction(
  '[Commission] Load Commissions Failure',
  props<{ error: unknown }>()
);

export const createCommission = createAction(
  '[Commission] Create Commission',
  props<{ data: Commission }>()
);

export const createCommissionSuccess = createAction(
  '[Commission] Create Commission Success',
  props<{ data: Commission }>()
);

export const createCommissionFailure = createAction(
  '[Commission] Create Commission Failure',
  props<{ error: unknown }>()
);

export const updateCommission = createAction(
  '[Commission] Update Commission',
  props<{ data: Commission }>()
);

export const updateCommissionSuccess = createAction(
  '[Commission] Update Commission Success',
  props<{ data: Commission }>()
);

export const updateCommissionFailure = createAction(
  '[Commission] Update Commission Failure',
  props<{ error: unknown }>()
);

export const deleteCommission = createAction(
  '[Commission] Delete Commission',
  props<{ data: Commission }>()
);

export const deleteCommissionSuccess = createAction(
  '[Commission] Delete Commission Success',
  props<{ data: Commission }>()
);

export const deleteCommissionFailure = createAction(
  '[Commission] Delete Commission Failure',
  props<{ error: unknown }>()
);

export const resetCommissionsState = createAction(
  '[Commission] Reset Delete State'
);
