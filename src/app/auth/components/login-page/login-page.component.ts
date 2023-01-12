import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginForm.reset();
    }
  }
}
