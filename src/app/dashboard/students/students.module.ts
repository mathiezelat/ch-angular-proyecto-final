import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [StudentsPageComponent, StudentDialogComponent],
  imports: [CommonModule, StudentsRoutingModule, SharedModule],
  exports: [StudentsPageComponent, StudentDialogComponent],
})
export class StudentsModule {}
