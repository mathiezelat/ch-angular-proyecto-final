import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../../components/student-dialog/student-dialog.component';
import { Store } from '@ngrx/store';
import {
  loadStudents,
  resetStudentsState,
  createStudent,
} from '../../store/student.actions';
import {
  selectIsActiveStudentsArray,
  selectLoadingStudents,
} from '../../store/student.selectors';
import { Student } from '../../models/student.model';
import { updateStudent, deleteStudent } from '../../store/student.actions';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'dni',
    'isActive',
    'viewDetail',
    'viewCommissionHistory',
    'edit',
    'delete',
  ];
  students: Student[] = [];
  loading = true;

  constructor(
    private readonly dialogService: MatDialog,
    private readonly store: Store
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetStudentsState());
  }
  ngOnInit(): void {
    this.store.dispatch(loadStudents());
    this.store.select(selectIsActiveStudentsArray).subscribe((state) => {
      this.students = state;
    });
    this.store.select(selectLoadingStudents).subscribe((state) => {
      this.loading = state;
    });
  }

  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: {
        title: 'Agregar alumno',
      },
    });

    dialog.afterClosed().subscribe((newStudent: Student) => {
      newStudent && this.store.dispatch(createStudent({ data: newStudent }));
    });
  }

  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: {
        title: 'Modificar alumno',
        student,
      },
    });

    dialog.afterClosed().subscribe((editStudent: Student) => {
      student &&
        this.store.dispatch(
          updateStudent({ data: { ...editStudent, id: student.id } })
        );
    });
  }

  removeStudent(student: Student) {
    this.store.dispatch(deleteStudent({ data: student }));
  }
}
