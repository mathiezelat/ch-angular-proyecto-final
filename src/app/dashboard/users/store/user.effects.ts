import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, skip } from 'rxjs/operators';
import { from, Observable, of, take } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  docData,
  updateDoc,
  doc,
} from '@angular/fire/firestore';

import * as UserActions from './user.actions';
import { User } from '../models/user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.getUsers().pipe(
          skip(1),
          take(1),
          map((data) => UserActions.loadUsersSuccess({ data })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap((action) =>
        this.updateUser(action.data).pipe(
          take(1),
          map((data) => UserActions.updateUserSuccess({ data })),
          catchError((error) => of(UserActions.updateUserFailure({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap((action) =>
        this.deleteUser(action.data).pipe(
          take(1),
          map((data) => UserActions.deleteUserSuccess({ data })),
          catchError((error) => of(UserActions.deleteUserFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly firestore: Firestore
  ) {}

  private getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');

    return collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  private updateUser(user: User): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${user.id}`);

    return from(updateDoc(userDocRef, { ...user })).pipe(
      switchMap(() => {
        return docData(userDocRef, { idField: 'id' }) as Observable<User>;
      })
    );
  }

  private deleteUser(user: User): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${user.id}`);

    return from(updateDoc(userDocRef, { ...user, isActive: false })).pipe(
      switchMap(() => {
        return docData(userDocRef, { idField: 'id' }) as Observable<User>;
      })
    );
  }
}
