import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CommissionEffects } from './store/commission.effects';
import { StoreModule } from '@ngrx/store';
import { commissionFeatureKey, reducer } from './store/commission.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(commissionFeatureKey, reducer),
    EffectsModule.forFeature([CommissionEffects]),
  ],
})
export class CommissionsStoreModule {}
