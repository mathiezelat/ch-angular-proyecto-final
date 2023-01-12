import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsPageComponent } from './pages/inscriptions-page/inscriptions-page.component';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [InscriptionsPageComponent, InscriptionDialogComponent],
  imports: [CommonModule, InscriptionsRoutingModule, SharedModule],
})
export class InscriptionsModule {}
