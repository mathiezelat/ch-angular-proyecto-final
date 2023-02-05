import { Component, OnInit, OnDestroy } from '@angular/core';
import { Commission } from '../../model/commission.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectIsActiveCommissionsArray,
  selectLoadingCommission,
} from '../../store/commission.selectors';
import {
  resetCommissionsState,
  loadCommissions,
} from '../../store/commission.actions';

@Component({
  selector: 'app-commission-detail-page',
  templateUrl: './commission-detail-page.component.html',
})
export class CommissionDetailPageComponent implements OnInit, OnDestroy {
  commission: Commission | null = null;
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(resetCommissionsState());
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.store.dispatch(loadCommissions());

    this.store.select(selectIsActiveCommissionsArray).subscribe((state) => {
      const commission = state.find((commission) => commission.id === id);

      if (commission) {
        this.commission = commission;
      }
    });

    this.store.select(selectLoadingCommission).subscribe((state) => {
      this.loading = state;
    });
  }
}
