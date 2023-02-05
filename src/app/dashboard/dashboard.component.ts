import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
// import { AppState } from '../core/models/app-state.model';
// import { authenticatedUserSelector } from '../auth/store/auth.selectors';
import { User } from './users/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  // public user: User | null = null;
  // private destroyed$ = new Subject();
  // constructor(private readonly store: Store<AppState>) {
  //   this.store
  //     .select(authenticatedUserSelector)
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((user) => {
  //       this.user = user;
  //     });
  // }
  // ngOnDestroy(): void {
  //   this.destroyed$.next(true);
  // }
}
