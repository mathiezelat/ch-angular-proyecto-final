import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models/course.model';
import { Commission } from '../../../commissions/model/commission.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
})
export class CourseDialogComponent {
  public isEdit: boolean = false;
  public title: string = '';

  titleControl = new FormControl('', [Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);
  hoursControl = new FormControl(NaN, [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1),
  ]);
  classesControl = new FormControl(NaN, [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1),
  ]);
  teacherControl = new FormControl('', [Validators.required]);
  priceControl = new FormControl(NaN, [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1),
  ]);
  isActiveControl = new FormControl(true, [Validators.required]);
  commissionsControl: FormControl<Commission[] | null> = new FormControl([]);

  courseForm = new FormGroup({
    title: this.titleControl,
    category: this.categoryControl,
    hours: this.hoursControl,
    classes: this.classesControl,
    teacher: this.teacherControl,
    price: this.priceControl,
    isActive: this.isActiveControl,
    commissions: this.commissionsControl,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; course: Course }
  ) {
    const { title, course } = data;

    this.title = title;

    if (course) {
      this.courseForm.patchValue(course);
      this.isEdit = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);

      this.courseForm.reset();
    }
  }
}
