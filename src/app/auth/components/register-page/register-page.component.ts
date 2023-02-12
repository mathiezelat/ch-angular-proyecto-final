import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../../store/auth.selectors';
import { authStateChanged, register } from '../../store/auth.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit, OnDestroy {
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
  public firstNameControl = new FormControl<string>('', [Validators.required]);
  public lastNameControl = new FormControl<string>('', [Validators.required]);
  public addressControl = new FormControl<string>('', [Validators.required]);
  public phoneControl = new FormControl<string>('', [Validators.required]);
  public avatarControl = new FormControl<string>('', [
    Validators.required,
    Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/),
  ]);

  registerForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    address: this.addressControl,
    phone: this.phoneControl,
    avatar: this.avatarControl,
  });

  constructor(private readonly store: Store, private readonly router: Router) {}
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
          this.router.navigate(['dashboard', 'home']);
        }

        if (state.error) {
          this.error = state.error;
        }
      });
  }

  register() {
    this.loading = true;

    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.store.dispatch(
        register({
          authUser: {
            email: this.registerForm.get('email')?.value || '',
            password: this.registerForm.get('password')?.value || '',
            firstName: this.registerForm.get('firstName')?.value || '',
            lastName: this.registerForm.get('lastName')?.value || '',
            address: this.registerForm.get('address')?.value || '',
            phone: this.registerForm.get('phone')?.value || '',
            avatar: this.registerForm.get('avatar')?.value || '',
          },
        })
      );
    }
  }
}
