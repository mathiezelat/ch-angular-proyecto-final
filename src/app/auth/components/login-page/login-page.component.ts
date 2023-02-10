import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { login, authStateChanged } from '../../store/auth.actions';
import { selectAuthState } from '../../store/auth.selectors';
import { User } from '../../../dashboard/users/models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  public loading = false;
  public hide = true;
  public error: any = null;

  public emailControl = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(7),
  ]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private readonly store: Store, public readonly router: Router) {}
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(authStateChanged());

    this.store
      .select(selectAuthState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.authenticatedUser) {
          if (state.authenticatedUser.isActive) {
            this.router.navigate(['dashboard', 'home']);
          } else {
            this.error = { code: 'auth/user-not-active' };
          }
        }

        if (state.error) {
          this.error = state.error;
        }
      });
  }

  login() {
    this.loading = true;

    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.store.dispatch(
        login({
          authUser: {
            email: this.loginForm.get('email')?.value || '',
            password: this.loginForm.get('password')?.value || '',
          },
        })
      );
    }
  }
}
