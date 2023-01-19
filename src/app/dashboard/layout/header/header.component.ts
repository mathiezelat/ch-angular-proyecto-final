import { Component, Input, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnDestroy {
  @Input() sidenav!: MatSidenav;

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
