import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Commission } from '../../model/commission.model';
import { Store } from '@ngrx/store';
import { Student } from '../../../students/models/student.model';
import { Course } from '../../../courses/models/course.model';
import { Timestamp } from 'firebase/firestore';
import {
  selectIsActiveStudentsArray,
  selectLoadingStudents,
} from '../../../students/store/student.selectors';
import {
  selectIsActiveCoursesArray,
  selectLoadingCourses,
} from '../../../courses/store/course.selectors';
import {
  resetCoursesState,
  loadCourses,
} from '../../../courses/store/course.actions';
import {
  resetStudentsState,
  loadStudents,
} from '../../../students/store/student.actions';

@Component({
  selector: 'app-commission-dialog',
  templateUrl: './commission-dialog.component.html',
})
export class CommissionDialogComponent implements OnInit, OnDestroy {
  public isEdit: boolean = false;
  public title: string = '';

  courses: Course[] = [];
  students: Student[] = [];

  loadingCourses = true;
  loadingStudents = true;

  courseControl = new FormControl<Course | null>(null, [Validators.required]);
  studentsControl = new FormControl<Student[]>([]);
  startControl = new FormControl<Timestamp | null>(null);
  endControl = new FormControl<Timestamp | null>(null);
  isActiveControl = new FormControl<boolean>(true, [Validators.required]);

  commissionForm = new FormGroup({
    course: this.courseControl,
    students: this.studentsControl,
    start: this.startControl,
    end: this.endControl,
    isActive: this.isActiveControl,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CommissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; commission: Commission },
    private readonly store: Store
  ) {
    const { title, commission } = data;

    this.title = title;

    if (commission) {
      this.commissionForm.patchValue(commission);
      this.isEdit = true;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCoursesState());
    this.store.dispatch(resetStudentsState());
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.store.dispatch(loadStudents());

    this.store.select(selectIsActiveCoursesArray).subscribe((state) => {
      this.courses = state;
    });
    this.store.select(selectLoadingCourses).subscribe((state) => {
      this.loadingCourses = state;
    });

    this.store.select(selectIsActiveStudentsArray).subscribe((state) => {
      this.students = state;
    });
    this.store.select(selectLoadingStudents).subscribe((state) => {
      this.loadingStudents = state;
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.commissionForm.markAllAsTouched();
    if (this.commissionForm.valid) {
      this.dialogRef.close(this.commissionForm.value);

      this.commissionForm.reset();
    }
  }
}
