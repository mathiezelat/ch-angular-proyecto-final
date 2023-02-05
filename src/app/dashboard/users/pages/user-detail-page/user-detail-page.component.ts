import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetUsersState, loadUsers } from '../../store/user.actions';
import {
  selectIsActiveUsersArray,
  selectLoadingUsers,
} from '../../store/user.selectors';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  public loading: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetUsersState());
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.store.dispatch(loadUsers());

    this.store.select(selectIsActiveUsersArray).subscribe((state) => {
      const user = state.find((user) => user.id === id);

      if (user) {
        this.user = user;
      }
    });

    this.store.select(selectLoadingUsers).subscribe((state) => {
      this.loading = state;
    });
  }
}
