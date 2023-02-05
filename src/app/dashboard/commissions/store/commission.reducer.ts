import { Action, createReducer, on } from '@ngrx/store';
import * as CommissionActions from './commission.actions';
import { Commission } from '../model/commission.model';

export const commissionFeatureKey = 'commission';

export interface State {
  data: Commission[];
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

  on(CommissionActions.loadCommissions, (state) => ({
    ...state,
    loading: true,
  })),
  on(CommissionActions.loadCommissionsSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: action.data,
  })),
  on(CommissionActions.loadCommissionsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(CommissionActions.createCommission, (state) => ({
    ...state,
    loading: true,
  })),
  on(CommissionActions.createCommissionSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: [...state.data, action.data],
  })),
  on(CommissionActions.createCommissionFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(CommissionActions.updateCommission, (state) => ({
    ...state,
    loading: true,
  })),
  on(CommissionActions.updateCommissionSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((commission) => {
      if (commission.id === action.data.id) {
        return {
          ...commission,
          ...action.data,
        };
      }
      return commission;
    }),
  })),
  on(CommissionActions.updateCommissionFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(CommissionActions.deleteCommission, (state) => ({
    ...state,
    loading: true,
  })),
  on(CommissionActions.deleteCommissionSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((commission) => {
      if (commission.id === action.data.id) {
        return { ...commission, ...action.data };
      }
      return commission;
    }),
  })),
  on(CommissionActions.deleteCommissionFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(CommissionActions.resetCommissionsState, () => initialState)
);
