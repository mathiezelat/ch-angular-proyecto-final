import { createAction, props } from '@ngrx/store';
import { Student } from '../models/student.model';

export const loadStudents = createAction('[Student] Load Students');

export const loadStudentsSuccess = createAction(
  '[Student] Load Students Success',
  props<{ data: Student[] }>()
);

export const loadStudentsFailure = createAction(
  '[Student] Load Students Failure',
  props<{ error: unknown }>()
);

export const createStudent = createAction(
  '[Student] Create Students',
  props<{ data: Student }>()
);

export const createStudentSuccess = createAction(
  '[Student] Create Student Success',
  props<{ data: Student }>()
);

export const createStudentFailure = createAction(
  '[Student] Create Student Failure',
  props<{ error: unknown }>()
);

export const updateStudent = createAction(
  '[Student] Update Student',
  props<{ data: Student }>()
);

export const updateStudentSuccess = createAction(
  '[Student] Update Student Success',
  props<{ data: Student }>()
);

export const updateStudentFailure = createAction(
  '[Student] Update Student Failure',
  props<{ error: unknown }>()
);

export const deleteStudent = createAction(
  '[Student] Delete Student',
  props<{ data: Student }>()
);

export const deleteStudentSuccess = createAction(
  '[Student] Delete Student Success',
  props<{ data: Student }>()
);

export const deleteStudentFailure = createAction(
  '[Student] Delete Student Failure',
  props<{ error: unknown }>()
);

export const resetStudentsState = createAction('[Course] Reset Students State');
