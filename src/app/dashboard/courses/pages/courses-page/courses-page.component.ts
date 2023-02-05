import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../../components/course-dialog/course-dialog.component';
import { Store } from '@ngrx/store';
import {
  loadCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  resetCoursesState,
} from '../../store/course.actions';
import {
  selectIsActiveCoursesArray,
  selectLoadingCourses,
} from '../../store/course.selectors';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'id',
    'title',
    'category',
    'price',
    'viewDetail',
    'viewCommissionHistory',
    'edit',
    'delete',
  ];
  courses: Course[] = [];
  loading = true;

  constructor(
    private readonly dialogService: MatDialog,
    private readonly store: Store
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetCoursesState());
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.store.select(selectIsActiveCoursesArray).subscribe((state) => {
      this.courses = state;
    });
    this.store.select(selectLoadingCourses).subscribe((state) => {
      this.loading = state;
    });
  }

  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, {
      data: {
        title: 'Agregar curso',
      },
    });

    dialog.afterClosed().subscribe((newCourse: Course) => {
      newCourse && this.store.dispatch(createCourse({ data: newCourse }));
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
      editCourse &&
        this.store.dispatch(
          updateCourse({ data: { ...editCourse, id: course.id } })
        );
    });
  }

  deleteCourse(course: Course) {
    this.store.dispatch(deleteCourse({ data: course }));
  }
}
