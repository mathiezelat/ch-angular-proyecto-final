import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Student } from '../../../students/models/student.model';
import {
  loadCommissions,
  resetCommissionsState,
} from '../../store/commission.actions';
import {
  selectIsActiveCommissionsArray,
  selectLoadingCommission,
} from '../../store/commission.selectors';

@Component({
  selector: 'app-students-list-page',
  templateUrl: './students-list-page.component.html',
})
export class StudentsListPageComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'firstName', 'lastName', 'dni'];

  students: Student[] = [];
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
        this.students = commission.students;
      }
    });

    this.store.select(selectLoadingCommission).subscribe((state) => {
      this.loading = state;
    });
  }
}
