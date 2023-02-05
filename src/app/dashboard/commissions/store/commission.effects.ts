import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, take, from } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  docData,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import * as CommissionActions from './commission.actions';
import { Commission } from '../model/commission.model';

@Injectable()
export class CommissionEffects {
  loadCommissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionActions.loadCommissions),
      concatMap(() =>
        this.getCommissions().pipe(
          take(1),
          map((data) => CommissionActions.loadCommissionsSuccess({ data })),
          catchError((error) =>
            of(CommissionActions.loadCommissionsFailure({ error }))
          )
        )
      )
    );
  });

  createCommissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionActions.createCommission),
      concatMap((action) =>
        this.createCommissions(action.data).pipe(
          take(1),
          map((data) => CommissionActions.createCommissionSuccess({ data })),
          catchError((error) =>
            of(CommissionActions.createCommissionFailure({ error }))
          )
        )
      )
    );
  });

  updateCommissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionActions.updateCommission),
      concatMap((action) =>
        this.updateCommissions(action.data).pipe(
          take(1),
          map((data) => CommissionActions.updateCommissionSuccess({ data })),
          catchError((error) =>
            of(CommissionActions.updateCommissionFailure({ error }))
          )
        )
      )
    );
  });

  deleteCommissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionActions.deleteCommission),
      concatMap((action) =>
        this.deleteCommissions(action.data).pipe(
          take(1),
          map((data) => CommissionActions.deleteCommissionSuccess({ data })),
          catchError((error) =>
            of(CommissionActions.deleteCommissionFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly firestore: Firestore
  ) {}

  private getCommissions(): Observable<Commission[]> {
    const commissionsRef = collection(this.firestore, 'commissions');

    return collectionData(commissionsRef, { idField: 'id' }) as Observable<
      Commission[]
    >;
  }

  private createCommissions(commission: Commission): Observable<Commission> {
    const commissionsRef = collection(this.firestore, 'commissions');

    return from(addDoc(commissionsRef, commission)).pipe(
      switchMap((docRef) => {
        const courseDocRef = doc(
          this.firestore,
          `courses/${commission.course.id}`
        );

        updateDoc(courseDocRef, {
          ...commission.course,
          commissions: [
            ...commission.course.commissions,
            {
              course: commission.course.title,
              id: docRef.id,
              start: commission.start,
              end: commission.end,
            },
          ],
        });

        for (let student of commission.students) {
          const studentDocRef = doc(this.firestore, `students/${student.id}`);

          updateDoc(studentDocRef, {
            ...student,
            commissions: [
              ...student.commissions,
              {
                course: commission.course.title,
                id: docRef.id,
                start: commission.start,
                end: commission.end,
              },
            ],
          });
        }

        return docData(docRef, { idField: 'id' }) as Observable<Commission>;
      })
    );
  }

  private updateCommissions(commission: Commission): Observable<Commission> {
    const commissionDocRef = doc(
      this.firestore,
      `commissions/${commission.id}`
    );

    const courseDocRef = doc(this.firestore, `courses/${commission.course.id}`);

    const courseCommissions = commission.course.commissions.filter(
      (courseCommission) => courseCommission.id !== commission.id
    );

    updateDoc(courseDocRef, {
      ...commission.course,
      commissions: [
        ...courseCommissions,
        {
          course: commission.course.title,
          id: commission.id,
          start: commission.start,
          end: commission.end,
        },
      ],
    });

    for (let student of commission.students) {
      const studentDocRef = doc(this.firestore, `students/${student.id}`);

      const studentCommissions = student.commissions.filter(
        (studentCommission) => studentCommission.id !== commission.id
      );

      updateDoc(studentDocRef, {
        ...student,
        commissions: [
          ...studentCommissions,
          {
            course: commission.course.title,
            id: commission.id,
            start: commission.start,
            end: commission.end,
          },
        ],
      });
    }

    return from(updateDoc(commissionDocRef, { ...commission })).pipe(
      switchMap(() => {
        return docData(commissionDocRef, {
          idField: 'id',
        }) as Observable<Commission>;
      })
    );
  }

  private deleteCommissions(commission: Commission): Observable<Commission> {
    const commissionDocRef = doc(
      this.firestore,
      `commissions/${commission.id}`
    );

    return from(
      updateDoc(commissionDocRef, { ...commission, isActive: false })
    ).pipe(
      switchMap(() => {
        return docData(commissionDocRef, {
          idField: 'id',
        }) as Observable<Commission>;
      })
    );
  }
}
