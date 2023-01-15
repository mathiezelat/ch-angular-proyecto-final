import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../../components/student-dialog/student-dialog.component';
import { StudentsService } from '../../services/students.service';
import { Student } from './../../../../core/models/student.model';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
})
export class StudentsPageComponent {
  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'dni',
    'isActive',
    'edit',
    'delete',
  ];

  constructor(
    private readonly dialogService: MatDialog,
    public readonly studentsService: StudentsService
  ) {}

  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: {
        title: 'Agregar alumno',
      },
    });

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.studentsService.addStudent(value);
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
      }
    });
  }

  removeStudent(student: Student) {
    this.studentsService.deleteStudent(student.id);
  }
}
