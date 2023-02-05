import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, reducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStoreModule {}
