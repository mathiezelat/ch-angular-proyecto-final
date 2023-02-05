import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { StoreModule } from '@ngrx/store';
import { courseFeatureKey, reducer } from './store/course.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(courseFeatureKey, reducer),
    EffectsModule.forFeature([CourseEffects]),
  ],
})
export class CoursesStoreModule {}
