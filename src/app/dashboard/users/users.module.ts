import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserDetailPageComponent,
    UserDialogComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
