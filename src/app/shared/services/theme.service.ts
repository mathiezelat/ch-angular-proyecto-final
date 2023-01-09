import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false)
  public isDarkTheme$ = this.isDarkTheme.asObservable()

  constructor(@Inject(DOCUMENT) private readonly document: Document){
    const isDarkThemeLocal = localStorage.getItem('dark') === 'true'

    this.isDarkTheme.next(isDarkThemeLocal)

    this.isDarkTheme.subscribe((value) => {
      if (value) {
        this.document.documentElement.classList.add('dark');
        localStorage.setItem('dark', 'true')
      } else {
        this.document.documentElement.classList.remove('dark');
        localStorage.setItem('dark', 'false')
      }
    })
  }

  toggleDarkTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value);
  }
}
