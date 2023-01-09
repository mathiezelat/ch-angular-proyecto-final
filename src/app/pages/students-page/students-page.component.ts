import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../models/student.model';
import { StudentDialogComponent } from '../../shared/components/student-dialog/student-dialog.component';
import { StudentsService } from '../../shared/services/students.service';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
})
export class StudentsPageComponent implements OnInit {
  public students: Student[] = [];

  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'dni',
    'note',
    'isActive',
    'edit',
    'delete',
  ];

  constructor(
    private readonly dialogService: MatDialog,
    private readonly studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.students = this.studentsService.getStudents();
  }

  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: {
        title: 'Agregar alumno',
      },
    });

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.studentsService.addStudent(value);

        this.getStudents();
      }
    });
  }

  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: {
        title: 'Modificar alumno',
        student,
      },
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.studentsService.editStudent(student.id, data);

        this.getStudents();
      }
    });
  }

  removeStudent(student: Student) {
    this.studentsService.removeStudent(student.id);

    this.getStudents();
  }
}
