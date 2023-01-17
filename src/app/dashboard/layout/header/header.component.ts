import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav;

  constructor(
    private readonly authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }
}
