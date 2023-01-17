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
  public emailControl = new FormControl('eve.holt@reqres.in', [
    Validators.required,
  ]);
  public passwordControl = new FormControl('cityslicka', [Validators.required]);

  constructor(
    private readonly authService: AuthService,
    public readonly router: Router
  ) {
    this.authService.isLogged().subscribe((isLogged) => {
      if (isLogged) {
        router.navigate(['/dashboard/students']);
      }
    });
  }

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.get('email')?.value || '',
          password: this.loginForm.get('password')?.value || '',
        })
        .subscribe((user) => {
          this.loading = false;

          if (user) {
            this.router.navigate(['dashboard', 'students']);
          }
        });

      this.loginForm.reset();
    }
  }
}
