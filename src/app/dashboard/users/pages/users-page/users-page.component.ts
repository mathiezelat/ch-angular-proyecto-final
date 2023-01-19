import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent {
  displayedColumns = ['id', 'email', 'firstName', 'lastName'];

  constructor(public readonly usersService: UsersService) {}
}
