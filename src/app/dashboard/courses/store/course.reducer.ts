import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.actions';
import { Course } from '../models/course.model';

export const courseFeatureKey = 'course';

export interface State {
  data: Course[];
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

  on(CourseActions.loadCourses, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  on(CourseActions.createCourse, (state) => ({ ...state, loading: true })),
  on(CourseActions.createCourseSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: [...state.data, action.data],
  })),
  on(CourseActions.createCourseFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(CourseActions.updateCourse, (state) => ({ ...state, loading: true })),
  on(CourseActions.updateCourseSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((course) => {
      if (course.id === action.data.id) {
        return { ...course, ...action.data };
      }
      return course;
    }),
  })),
  on(CourseActions.updateCourseFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(CourseActions.deleteCourse, (state) => ({ ...state, loading: true })),
  on(CourseActions.deleteCourseSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: state.data.map((course) => {
      if (course.id === action.data.id) {
        return { ...course, ...action.data };
      }
      return course;
    }),
  })),
  on(CourseActions.deleteCourseFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(CourseActions.resetCoursesState, () => initialState)
);
