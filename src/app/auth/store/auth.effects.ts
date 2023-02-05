import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  Observable,
  catchError,
  concatMap,
  map,
  of,
  from,
  switchMap,
  take,
} from 'rxjs';
import {
  Firestore,
  docData,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@angular/fire/auth';
import * as AuthActions from './auth.actions';

import { User } from '../../dashboard/users/models/user.model';
import { AuthUser } from '../models/auth.model';
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) => {
        return this.login(action.authUser).pipe(
          take(1),
          map((user) => AuthActions.loginSuccess({ authenticatedUser: user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      concatMap((action) => {
        return this.register(action.authUser).pipe(
          take(1),
          map((user) =>
            AuthActions.registerSuccess({ authenticatedUser: user })
          ),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        );
      })
    )
  );

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.update),
      concatMap((action) =>
        this.update(action.user).pipe(
          take(1),
          map((user) => AuthActions.updateSuccess({ authenticatedUser: user })),
          catchError((error) => of(AuthActions.updateFailure({ error })))
        )
      )
    );
  });

  authStateChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authStateChanged),
      concatMap(() => {
        return this.authStateChanged().pipe(
          take(1),
          map((user) =>
            AuthActions.authStateChangedSuccess({
              authenticatedUser: user,
            })
          ),
          catchError((error) =>
            of(AuthActions.authStateChangedFailure({ error }))
          )
        );
      })
    )
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      concatMap(() => {
        return this.logOut().pipe(
          map(() => AuthActions.logOutSuccess()),
          catchError((error) => of(AuthActions.logOutFailure({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private readonly firestore: Firestore,
    private readonly auth: Auth
  ) {}

  private login(authUser: AuthUser): Observable<User> {
    return from(
      signInWithEmailAndPassword(this.auth, authUser.email, authUser.password)
    ).pipe(
      switchMap((userCredential) => {
        const userDocRef = doc(
          this.firestore,
          'users',
          userCredential.user.uid
        );

        return docData(userDocRef, { idField: 'id' }) as Observable<User>;
      })
    );
  }

  private register(authUser: AuthUser): Observable<User> {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        authUser.email,
        authUser.password
      )
    ).pipe(
      switchMap((userCredential) => {
        const user: User = {
          id: userCredential.user.uid,
          email: authUser.email,
          firstName: authUser.firstName || 'USER_FIRSTNAME',
          lastName: authUser.lastName || 'USER_LASTNAME',
          avatar:
            authUser.avatar ||
            'https://static.thenounproject.com/png/5034901-200.png',
          isAdmin: false,
          isActive: true,
        };

        const userDocRef = doc(
          this.firestore,
          'users',
          userCredential.user.uid
        );

        return from(setDoc(userDocRef, user)).pipe(
          switchMap(() => {
            return docData(userDocRef, { idField: 'id' }) as Observable<User>;
          })
        );
      })
    );
  }

  private update(user: User): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${user.id}`);

    return from(updateDoc(userDocRef, { ...user })).pipe(
      switchMap(() => {
        return docData(userDocRef, { idField: 'id' }) as Observable<User>;
      })
    );
  }

  private authStateChanged(): Observable<User | null> {
    return new Observable((observable) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const userDocRef = doc(this.firestore, 'users', user.uid);

          docData(userDocRef, { idField: 'id' }).subscribe((docData) => {
            observable.next(docData as User);
          });
        } else {
          observable.next(null);
        }
      });
    });
  }

  private logOut() {
    return from(signOut(this.auth));
  }
}
