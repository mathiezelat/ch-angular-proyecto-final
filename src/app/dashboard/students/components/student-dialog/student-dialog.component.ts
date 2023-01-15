import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../../core/models';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
})
export class StudentDialogComponent {
  public isEdit: boolean = false;
  public title: string = '';

  firstNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  lastNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  dniControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);
  isActiveControl = new FormControl(true);

  studentForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    dni: this.dniControl,
    isActive: this.isActiveControl,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; student: Student }
  ) {
    const { title, student } = data;

    this.title = title;

    if (student) {
      this.studentForm.patchValue(student);
      this.isEdit = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);

      this.studentForm.reset();
    }
  }
}
