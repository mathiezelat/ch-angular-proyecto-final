import { Action, createReducer, on } from '@ngrx/store';
import * as StudentActions from './student.actions';
import { Student } from '../models/student.model';

export const studentFeatureKey = 'student';

export interface State {
  data: Student[];
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

  on(StudentActions.loadStudents, (state) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.loadStudentsSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: action.data,
  })),
  on(StudentActions.loadStudentsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(StudentActions.createStudent, (state) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.createStudentSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: [...state.data, action.data],
  })),
  on(StudentActions.createStudentFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(StudentActions.updateStudent, (state) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.updateStudentSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((student) => {
      if (student.id === action.data.id) {
        return { ...student, ...action.data };
      }
      return student;
    }),
  })),
  on(StudentActions.updateStudentFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(StudentActions.deleteStudent, (state) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.deleteStudentSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((student) => {
      if (student.id === action.data.id) {
        return { ...student, ...action.data };
      }
      return student;
    }),
  })),
  on(StudentActions.deleteStudentFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(StudentActions.resetStudentsState, () => initialState)
);
