import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
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
  private token = new BehaviorSubject<string | null>(null);
  public token$ = this.token.asObservable();

  private profile = new BehaviorSubject<User | null>(null);
  public profile$ = this.profile.asObservable();

  public apiUrl = 'https://reqres.in/api';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    const token = localStorage.getItem('token');

    if (token) {
      this.token.next(token);

      this.http
        .get<SingleUserResponse>(`${this.apiUrl}/users/7`)
        .pipe(
          map(
            ({ data }) =>
              new User(
                data.id,
                data.email,
                data.first_name,
                data.last_name,
                data.avatar
              )
          )
        )
        .subscribe((user) => {
          this.profile.next(user);
        });
    }
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<LoginSuccessful>(`${this.apiUrl}/login`, data).pipe(
      tap(({ token }) => {
        localStorage.setItem('token', token);

        this.token.next(token);
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
            data.avatar
          )
      ),
      tap((user) => this.profile.next(user))
    );
  }

  logout() {
    localStorage.removeItem('token');

    this.token.next(null);
    this.profile.next(null);

    this.router.navigate(['auth', 'login']);
  }

  isLogged() {
    return this.token.pipe(map((token) => !!token));
  }
}
