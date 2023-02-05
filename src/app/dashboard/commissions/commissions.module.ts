import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionDialogComponent } from './components/commission-dialog/commission-dialog.component';
import { CommissionsPageComponent } from './pages/commissions-page/commissions-page.component';
import { CommissionDetailPageComponent } from './pages/commission-detail-page/commission-detail-page.component';
import { StudentsListPageComponent } from './pages/students-list-page/students-list-page.component';

import { CommissionsRoutingModule } from './commissions-routing.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CommissionsPageComponent,
    CommissionDetailPageComponent,
    CommissionDialogComponent,
    StudentsListPageComponent,
  ],
  imports: [CommonModule, CommissionsRoutingModule, SharedModule],
})
export class CommissionsModule {}
