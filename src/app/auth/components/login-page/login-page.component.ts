import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  public loading = false;
  public emailControl = new FormControl<string>('eve.holt@reqres.in', [
    Validators.required,
  ]);
  public passwordControl = new FormControl<string>('cityslicka', [
    Validators.required,
  ]);
  public isAdminControl = new FormControl<boolean>(false, [
    Validators.required,
  ]);

  constructor(
    private readonly authService: AuthService,
    public readonly router: Router
  ) {}

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
    isAdmin: this.isAdminControl,
  });

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loading = true;

      this.authService
        .login(
          {
            email: this.loginForm.get('email')?.value || '',
            password: this.loginForm.get('password')?.value || '',
          },
          this.loginForm.get('isAdmin')?.value || false
        )
        .subscribe((user) => {
          this.loading = false;

          if (user) {
            this.router.navigate(['dashboard', 'students']);
          }
        });
    }
  }
}
