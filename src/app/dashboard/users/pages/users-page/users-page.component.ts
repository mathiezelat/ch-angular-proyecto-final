import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { loadUsers } from '../../store/user.actions';
import {
  selectUsersArray,
  selectTotalUsersNumber,
} from '../../store/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  public displayedColumns = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
  ];
  public users: User[] = [];
  public totalUsers: Observable<number>;
  public perPage = 6;
  public perPageOptions = [3, 6, 12, 18];

  constructor(private store: Store) {
    this.totalUsers = this.store.select(selectTotalUsersNumber);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ page: 1, per_page: this.perPage }));

    this.store.select(selectUsersArray).subscribe((users) => {
      this.users = users;
    });
  }

  onPageChange(e: PageEvent) {
    this.store.dispatch(
      loadUsers({ page: e.pageIndex + 1, per_page: e.pageSize })
    );
  }
}
