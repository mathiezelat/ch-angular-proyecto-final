import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap, mergeMap, concat } from 'rxjs';
import { User } from '../../../core/models/user';
import { HttpClient } from '@angular/common/http';
import { UsersResponse } from '../../../core/models/reqres.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = new BehaviorSubject<User[]>([]);
  public users$ = this.users.asObservable();

  private apiUrl = 'https://reqres.in/api';

  constructor(private readonly http: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    this.http
      .get<UsersResponse>(`${this.apiUrl}/users`)
      .pipe(
        map(({ data }) => {
          return data.map((user) => {
            return new User(
              user.id,
              user.email,
              user.first_name,
              user.last_name,
              user.avatar,
              false
            );
          });
        })
      )
      .subscribe((users) => {
        this.users.next(users);
      });
  }
}
