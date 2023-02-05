import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CommissionDialogComponent } from '../../components/commission-dialog/commission-dialog.component';
import { Commission } from '../../model/commission.model';
import { deleteCommission } from '../../store/commission.actions';
import {
  createCommission,
  updateCommission,
} from '../../store/commission.actions';
import {
  resetCommissionsState,
  loadCommissions,
} from '../../store/commission.actions';
import {
  selectIsActiveCommissionsArray,
  selectLoadingCommission,
} from '../../store/commission.selectors';

@Component({
  selector: 'app-commissions-page',
  templateUrl: './commissions-page.component.html',
})
export class CommissionsPageComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'id',
    'course',
    'students',
    'start',
    'end',
    'viewDetail',
    'edit',
    'delete',
  ];

  commissions: Commission[] = [];
  loading = true;

  constructor(
    private readonly dialogService: MatDialog,
    private readonly store: Store
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetCommissionsState());
  }

  ngOnInit(): void {
    this.store.dispatch(loadCommissions());
    this.store.select(selectIsActiveCommissionsArray).subscribe((state) => {
      this.commissions = state;
    });
    this.store.select(selectLoadingCommission).subscribe((state) => {
      this.loading = state;
    });
  }

  addCommission() {
    const dialog = this.dialogService.open(CommissionDialogComponent, {
      data: {
        title: 'Agregar comisión',
      },
    });

    dialog.afterClosed().subscribe((newCommission: Commission) => {
      newCommission &&
        this.store.dispatch(createCommission({ data: newCommission }));
    });
  }

  editCommission(commission: Commission) {
    const dialog = this.dialogService.open(CommissionDialogComponent, {
      data: {
        title: 'Modificar comisión',
        commission,
      },
    });

    dialog.afterClosed().subscribe((editCommission: Commission) => {
      editCommission &&
        this.store.dispatch(
          updateCommission({ data: { ...editCommission, id: commission.id } })
        );
    });
  }

  deleteCommission(commission: Commission) {
    this.store.dispatch(deleteCommission({ data: commission }));
  }
}
