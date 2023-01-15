import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsPageComponent } from './pages/inscriptions-page/inscriptions-page.component';
import { StudentsListPageComponent } from './pages/students-list-page/students-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: InscriptionsPageComponent,
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
export class InscriptionsRoutingModule {}
