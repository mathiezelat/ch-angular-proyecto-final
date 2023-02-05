import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { logOut } from '../../../auth/store/auth.actions';
import { selectAuthState } from '../../../auth/store/auth.selectors';
import { User } from '../../users/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav!: MatSidenav;

  public user: User | null = null;
  private destroyed$ = new Subject();

  constructor(private readonly router: Router, private readonly store: Store) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectAuthState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        if (!state.authenticatedUser) {
          this.router.navigate(['auth', 'login']);
        }

        this.user = state.authenticatedUser;
      });
  }

  logOut() {
    this.store.dispatch(logOut());
  }
}
