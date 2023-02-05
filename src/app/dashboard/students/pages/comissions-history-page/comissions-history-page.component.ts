import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Student } from '../../models/student.model';
import { loadStudents, resetStudentsState } from '../../store/student.actions';
import {
  selectIsActiveStudentsArray,
  selectLoadingStudents,
} from '../../store/student.selectors';

@Component({
  selector: 'app-comissions-history-page',
  templateUrl: './comissions-history-page.component.html',
})
export class ComissionsHistoryPageComponent {
  displayedColumns = ['id', 'course', 'start', 'end'];

  student: Student | null = null;
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetStudentsState());
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.store.dispatch(loadStudents());

    this.store.select(selectIsActiveStudentsArray).subscribe((state) => {
      const student = state.find((student) => student.id === id);

      if (student) {
        this.student = student;
      }
    });

    this.store.select(selectLoadingStudents).subscribe((state) => {
      this.loading = state;
    });
  }
}
