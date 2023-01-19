import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';
import {
  SingleUserResponse,
  LoginSuccessful,
} from '../../core/models/reqres.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  public apiUrl = 'https://reqres.in/api';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(
    data: { email: string; password: string },
    isAdmin: boolean
  ): Observable<User> {
    return this.http.post<LoginSuccessful>(`${this.apiUrl}/login`, data).pipe(
      tap(({ token }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('admin', String(isAdmin));
      }),
      mergeMap(() =>
        this.http.get<SingleUserResponse>(`${this.apiUrl}/users/7`)
      ),
      map(
        ({ data }) =>
          new User(
            data.id,
            data.email,
            data.first_name,
            data.last_name,
            data.avatar,
            true
          )
      ),
      tap((user) => this.user.next(user))
    );
  }

  verifyToken(): Observable<boolean> {
    const lsToken = localStorage.getItem('token');
    const lsAdmin = localStorage.getItem('admin');

    return of(lsToken).pipe(
      tap((token) => {
        if (!token) throw new Error('Token not exists');
      }),
      mergeMap(() => {
        return this.http.get<SingleUserResponse>(`${this.apiUrl}/users/7`);
      }),
      map(
        ({ data }) =>
          new User(
            data.id,
            data.email,
            data.first_name,
            data.last_name,
            data.avatar,
            lsAdmin === 'true'
          )
      ),
      tap((user) => {
        this.user.next(user);
      }),
      map((user) => {
        return !!user;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');

    this.user.next(null);

    this.router.navigate(['auth', 'login']);
  }
}
