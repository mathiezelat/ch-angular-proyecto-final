import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { ActivePipe } from './pipes/active.pipe';

@NgModule({
  declarations: [ThemeToggleComponent, ActivePipe],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    ThemeToggleComponent,
    ActivePipe,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
