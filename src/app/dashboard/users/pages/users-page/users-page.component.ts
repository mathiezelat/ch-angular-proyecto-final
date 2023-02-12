import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import {
  deleteUser,
  loadUsers,
  resetUsersState,
  updateUser,
} from '../../store/user.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  selectIsActiveUsersArray,
  selectLoadingUsers,
} from '../../store/user.selectors';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { selectAuthUser } from '../../../../auth/store/auth.selectors';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit, OnDestroy {
  public displayedColumns = [
    'id',
    'avatar',
    'firstName',
    'lastName',
    'address',
    'phone',
    'email',
    'viewDetail',
  ];
  public users: User[] = [];
  public loading = false;
  public isAdmin: boolean = false;

  constructor(
    private readonly dialogService: MatDialog,
    private readonly store: Store
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(resetUsersState());
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select(selectIsActiveUsersArray).subscribe((state) => {
      this.users = state;
    });
    this.store.select(selectLoadingUsers).subscribe((state) => {
      this.loading = state;
    });
    this.store.select(selectAuthUser).subscribe((state) => {
      if (state?.isAdmin) {
        this.isAdmin = true;
        this.displayedColumns = [...this.displayedColumns, 'edit', 'delete'];
      }
    });
  }

  editUser(user: User) {
    const dialog = this.dialogService.open(UserDialogComponent, {
      data: {
        title: 'Modificar usuario',
        user,
      },
    });

    dialog.afterClosed().subscribe((editUser: User) => {
      editUser &&
        this.store.dispatch(updateUser({ data: { ...editUser, id: user.id } }));
    });
  }

  removeUser(user: User) {
    this.store.dispatch(deleteUser({ data: user }));
  }
}
