import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../users/models/user.model';
import { selectAuthState } from '../../../../auth/store/auth.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  private destroyed$ = new Subject();

  constructor(private readonly store: Store) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectAuthState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.user = state.authenticatedUser;
      });
  }
}
