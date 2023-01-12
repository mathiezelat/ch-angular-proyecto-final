import { Injectable } from '@angular/core';
import { User } from '../../core/models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  login(user: User) {}
}
