import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(this.THEME_KEY) as 'light' | 'dark';
      if (savedTheme) {
        this.setTheme(savedTheme);
      }
    }
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme.set(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  toggleTheme() {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }
}
