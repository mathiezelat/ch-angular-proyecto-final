import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course.model';

export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ data: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: unknown }>()
);

export const createCourse = createAction(
  '[Course] Create Course',
  props<{
    data: Course;
  }>()
);

export const createCourseSuccess = createAction(
  '[Course] Create Course Success',
  props<{ data: Course }>()
);

export const createCourseFailure = createAction(
  '[Course] Create Course Failure',
  props<{ error: unknown }>()
);

export const updateCourse = createAction(
  '[Course] Update Course',
  props<{
    data: Course;
  }>()
);

export const updateCourseSuccess = createAction(
  '[Course] Update Course Success',
  props<{ data: Course }>()
);

export const updateCourseFailure = createAction(
  '[Course] Update Course Failure',
  props<{ error: unknown }>()
);

export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{
    data: Course;
  }>()
);

export const deleteCourseSuccess = createAction(
  '[Course] Delete Course Success',
  props<{ data: Course }>()
);

export const deleteCourseFailure = createAction(
  '[Course] Delete Course Failure',
  props<{ error: unknown }>()
);

export const resetCoursesState = createAction('[Course] Reset Courses State');
