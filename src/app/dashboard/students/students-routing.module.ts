import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { StudentDetailPageComponent } from './pages/student-detail-page/student-detail-page.component';
import { ComissionsHistoryPageComponent } from './pages/comissions-history-page/comissions-history-page.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsPageComponent,
  },
  {
    path: ':id',
    component: StudentDetailPageComponent,
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
export class StudentsRoutingModule {}
