import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionsPageComponent } from './pages/commissions-page/commissions-page.component';
import { StudentsListPageComponent } from './pages/students-list-page/students-list-page.component';
import { CommissionDetailPageComponent } from './pages/commission-detail-page/commission-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: CommissionsPageComponent,
  },
  {
    path: ':id',
    component: CommissionDetailPageComponent,
  },
  {
    path: ':id/students',
    component: StudentsListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionsRoutingModule {}
