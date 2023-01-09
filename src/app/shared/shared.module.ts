import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { PageWrapperComponent } from './layout/page-wrapper/page-wrapper.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { ActivePipe } from './pipes/active.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    PageWrapperComponent,
    ThemeToggleComponent,
    StudentDialogComponent,
    CourseDialogComponent,
    ActivePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    PageWrapperComponent,
    ThemeToggleComponent,
    StudentDialogComponent,
    CourseDialogComponent,
    ActivePipe,
  ],
})
export class SharedModule {}
