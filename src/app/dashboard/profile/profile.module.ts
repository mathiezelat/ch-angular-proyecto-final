import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';

@NgModule({
  declarations: [ProfilePageComponent, ProfileDialogComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
