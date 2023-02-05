import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, of, from, take } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  docData,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import * as StudentActions from './student.actions';
import { Student } from '../models/student.model';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.getStudents().pipe(
          take(1),
          map((data) => StudentActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createStudent),
      concatMap((action) =>
        this.createStudent(action.data).pipe(
          take(1),
          map((data) => StudentActions.createStudentSuccess({ data })),
          catchError((error) =>
            of(StudentActions.createStudentFailure({ error }))
          )
        )
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      concatMap((action) =>
        this.updateStudent(action.data).pipe(
          take(1),
          map((data) => StudentActions.updateStudentSuccess({ data })),
          catchError((error) =>
            of(StudentActions.updateStudentFailure({ error }))
          )
        )
      )
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      concatMap((action) =>
        this.deleteStudent(action.data).pipe(
          take(1),
          map((data) => StudentActions.deleteStudentSuccess({ data })),
          catchError((error) =>
            of(StudentActions.deleteStudentFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly firestore: Firestore
  ) {}

  private getStudents(): Observable<Student[]> {
    const studentsRef = collection(this.firestore, 'students');

    return collectionData(studentsRef, { idField: 'id' }) as Observable<
      Student[]
    >;
  }

  private createStudent(student: Student): Observable<Student> {
    const studentsRef = collection(this.firestore, 'students');

    return from(addDoc(studentsRef, student)).pipe(
      switchMap((docRef) => {
        return docData(docRef, { idField: 'id' }) as Observable<Student>;
      })
    );
  }

  private updateStudent(student: Student): Observable<Student> {
    const studentDocRef = doc(this.firestore, `students/${student.id}`);

    return from(updateDoc(studentDocRef, { ...student })).pipe(
      switchMap(() => {
        return docData(studentDocRef, { idField: 'id' }) as Observable<Student>;
      })
    );
  }

  private deleteStudent(student: Student): Observable<Student> {
    const studentDocRef = doc(this.firestore, `students/${student.id}`);

    return from(updateDoc(studentDocRef, { ...student, isActive: false })).pipe(
      switchMap(() => {
        return docData(studentDocRef, { idField: 'id' }) as Observable<Student>;
      })
    );
  }
}
