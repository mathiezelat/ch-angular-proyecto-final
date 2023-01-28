import { Component, Input, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject, takeUntil, Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app-state.model';
import { authenticatedUserSelector } from '../../../auth/store/auth.selectors';
import { User } from '../../users/models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnDestroy {
  @Input() sidenav!: MatSidenav;

  // public user: User | null = null;

  public user: Observable<User | null>;

  // private destroyed$ = new Subject();

  constructor(
    public readonly authService: AuthService,
    private readonly store: Store<AppState>
  ) {
    // this.authService.user$
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((user) => {
    //     if (user) this.user = user;
    //   });

    this.user = this.store.select(authenticatedUserSelector);
  }
  ngOnDestroy(): void {
    // this.destroyed$.next(true);
  }
}
