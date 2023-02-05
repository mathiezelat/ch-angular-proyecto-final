import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectIsActiveStudentsArray = createSelector(
  selectStudentState,
  (studentsState) => studentsState.data.filter((student) => student.isActive)
);

export const selectLoadingStudents = createSelector(
  selectStudentState,
  (studentsState) => studentsState.loading
);
