import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, of, from, take } from 'rxjs';
import * as CourseActions from './course.actions';
import { Course } from '../models/course.model';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  docData,
  updateDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      concatMap(() =>
        this.getCourses().pipe(
          take(1),
          map((data) => CourseActions.loadCoursesSuccess({ data })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.createCourse),
      concatMap((action) =>
        this.createCourse(action.data).pipe(
          take(1),
          map((data) => CourseActions.createCourseSuccess({ data })),
          catchError((error) =>
            of(CourseActions.createCourseFailure({ error }))
          )
        )
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      concatMap((action) =>
        this.updateCourse(action.data).pipe(
          take(1),
          map((data) => CourseActions.updateCourseSuccess({ data })),
          catchError((error) =>
            of(CourseActions.updateCourseFailure({ error }))
          )
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      concatMap((action) =>
        this.deleteCourse(action.data).pipe(
          take(1),
          map((data) => CourseActions.deleteCourseSuccess({ data })),
          catchError((error) =>
            of(CourseActions.deleteCourseFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly firestore: Firestore
  ) {}

  private getCourses(): Observable<Course[]> {
    const coursesRef = collection(this.firestore, 'courses');

    return collectionData(coursesRef, { idField: 'id' }) as Observable<
      Course[]
    >;
  }

  private createCourse(course: Course): Observable<Course> {
    const coursesRef = collection(this.firestore, 'courses');

    return from(addDoc(coursesRef, course)).pipe(
      switchMap((docRef) => {
        return docData(docRef, { idField: 'id' }) as Observable<Course>;
      })
    );
  }

  private updateCourse(course: Course): Observable<Course> {
    const courseDocRef = doc(this.firestore, `courses/${course.id}`);

    return from(updateDoc(courseDocRef, { ...course })).pipe(
      switchMap(() => {
        return docData(courseDocRef, { idField: 'id' }) as Observable<Course>;
      })
    );
  }

  private deleteCourse(course: Course): Observable<Course> {
    const courseDocRef = doc(this.firestore, `courses/${course.id}`);

    return from(updateDoc(courseDocRef, { ...course, isActive: false })).pipe(
      switchMap(() => {
        return docData(courseDocRef, { idField: 'id' }) as Observable<Course>;
      })
    );
  }
}
