import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inscription } from '../../../../core/models/inscription.model';
import { Course } from '../../../../core/models/course.model';
import { Student } from '../../../../core/models/student.model';
import { StudentsService } from '../../../students/services/students.service';
import { CoursesService } from '../../../courses/services/courses.service';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
})
export class InscriptionDialogComponent {
  public isEdit: boolean = false;
  public title: string = '';

  courseControl = new FormControl<Course | null>(null, [Validators.required]);
  studentsControl = new FormControl<Student[]>([]);

  inscriptionForm = new FormGroup({
    course: this.courseControl,
    students: this.studentsControl,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<InscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; inscription: Inscription },
    public studentsService: StudentsService,
    public coursesService: CoursesService
  ) {
    const { title, inscription } = data;

    this.title = title;

    if (inscription) {
      this.inscriptionForm.patchValue(inscription);
      this.isEdit = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.inscriptionForm.markAllAsTouched();
    if (this.inscriptionForm.valid) {
      this.dialogRef.close(this.inscriptionForm.value);

      this.inscriptionForm.reset();
    }
  }
}
