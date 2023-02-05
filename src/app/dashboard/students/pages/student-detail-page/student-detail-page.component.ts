import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Student } from '../../models/student.model';
import { resetStudentsState, loadStudents } from '../../store/student.actions';
import {
  selectIsActiveStudentsArray,
  selectLoadingStudents,
} from '../../store/student.selectors';

@Component({
  selector: 'app-student-detail-page',
  templateUrl: './student-detail-page.component.html',
})
export class StudentDetailPageComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
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
