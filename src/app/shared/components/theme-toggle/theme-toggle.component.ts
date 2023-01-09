import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html'
})
export class ThemeToggleComponent {
  constructor(public readonly themeService: ThemeService){}

  onToggle(): void {
    this.themeService.toggleDarkTheme()
  }
}
