import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../users/models/user.model';
import { selectAuthState } from '../../../../auth/store/auth.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../../components/profile-dialog/profile-dialog.component';
import { update } from '../../../../auth/store/auth.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  public user: User | null = null;
  public loading: boolean = false;

  constructor(
    private readonly dialogService: MatDialog,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectAuthState).subscribe((state) => {
      this.user = state.authenticatedUser;
      this.loading = state.loading;
    });
  }

  editProfile() {
    const dialog = this.dialogService.open(ProfileDialogComponent, {
      data: {
        title: 'Modificar perfíl',
        profile: this.user,
      },
    });

    dialog.afterClosed().subscribe((editUser: User) => {
      editUser &&
        this.user &&
        this.store.dispatch(
          update({ user: { ...editUser, id: this.user?.id } })
        );
    });
  }
}
