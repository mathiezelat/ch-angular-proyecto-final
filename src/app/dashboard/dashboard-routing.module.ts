import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((module) => module.HomeModule),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./students/students.module').then(
            (module) => module.StudentsModule
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then(
            (module) => module.CoursesModule
          ),
      },
      {
        path: 'commissions',
        loadChildren: () =>
          import('./commissions/commissions.module').then(
            (module) => module.CommissionsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((module) => module.UsersModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(
            (module) => module.ProfileModule
          ),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
