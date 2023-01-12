import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsPageComponent } from './pages/inscriptions-page/inscriptions-page.component';

const routes: Routes = [
  {
    path: '',
    component: InscriptionsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionsRoutingModule {}
