import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from './auth/auth-store.module';
import { UsersStoreModule } from './dashboard/users/users-store.module';
import { CoursesStoreModule } from './dashboard/courses/courses-store.module';
import { StudentsStoreModule } from './dashboard/students/students-store.module';
import { CommissionsStoreModule } from './dashboard/commissions/commissions-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AuthStoreModule,
    UsersStoreModule,
    CoursesStoreModule,
    StudentsStoreModule,
    CommissionsStoreModule,
  ],
})
export class AppStoreModule {}
