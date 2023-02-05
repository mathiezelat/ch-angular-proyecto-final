import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
  },
  {
    path: ':id',
    component: UserDetailPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersRoutingModule {}
