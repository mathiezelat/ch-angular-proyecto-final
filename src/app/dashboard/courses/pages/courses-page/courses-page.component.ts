import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../../../core/models';
import { CourseDialogComponent } from '../../components/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
})
export class CoursesPageComponent {
  constructor(
    private readonly dialogService: MatDialog,
    public readonly coursesService: CoursesService
  ) {}

  displayedColumns = [
    'id',
    'title',
    'category',
    'duration',
    'price',
    'edit',
    'delete',
  ];

  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, {
      data: {
        title: 'Agregar curso',
      },
    });

    dialog.afterClosed().subscribe((newCourse: Course) => {
      newCourse && this.coursesService.addCourse(newCourse);
    });
  }

  editCourse(course: Course) {
    const dialog = this.dialogService.open(CourseDialogComponent, {
      data: {
        title: 'Modificar curso',
        course,
      },
    });

    dialog.afterClosed().subscribe((editCourse: Course) => {
      editCourse && this.coursesService.editCourse(course.id, editCourse);
    });
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id);
  }
}
