import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../core/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public user: User | null = null;

  private destroyed$ = new Subject();

  constructor(public readonly authService: AuthService) {
    this.authService.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        if (user) this.user = user;
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
