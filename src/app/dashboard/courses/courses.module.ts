import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailPageComponent } from './pages/course-detail-page/course-detail-page.component';
import { ComissionsHistoryPageComponent } from './pages/comissions-history-page/comissions-history-page.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseDetailPageComponent,
    ComissionsHistoryPageComponent,
    CourseDialogComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
