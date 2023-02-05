import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseDetailPageComponent } from './pages/course-detail-page/course-detail-page.component';
import { ComissionsHistoryPageComponent } from './pages/comissions-history-page/comissions-history-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent,
  },
  {
    path: ':id',
    component: CourseDetailPageComponent,
  },
  {
    path: ':id/commissions-history',
    component: ComissionsHistoryPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
