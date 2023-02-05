import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentDetailPageComponent } from './pages/student-detail-page/student-detail-page.component';
import { ComissionsHistoryPageComponent } from './pages/comissions-history-page/comissions-history-page.component';

@NgModule({
  declarations: [
    StudentsPageComponent,
    StudentDetailPageComponent,
    ComissionsHistoryPageComponent,
    StudentDialogComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, SharedModule],
})
export class StudentsModule {}
