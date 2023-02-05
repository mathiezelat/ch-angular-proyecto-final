import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectIsActiveCoursesArray = createSelector(
  selectCourseState,
  (coursesState) => coursesState.data.filter((course) => course.isActive)
);

export const selectLoadingCourses = createSelector(
  selectCourseState,
  (coursesState) => coursesState.loading
);
