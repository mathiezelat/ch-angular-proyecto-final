import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { CourseDialogComponent } from '../../components/course-dialog/course-dialog.component';
import { Store } from '@ngrx/store';
import {
  loadCourses,
  createCourse,
  resetCoursesState,
} from '../../store/course.actions';
import { selectCourseState } from '../../store/course.selectors';
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
    'duration',
    'price',
    'edit',
    'delete',
  ];
  courses: Course[] = [];
  loading = true;

  constructor(
    private readonly dialogService: MatDialog,
    // public readonly coursesService: CoursesService,
    private readonly store: Store
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetCoursesState());
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.store.select(selectCourseState).subscribe((state) => {
      this.courses = state.data;
      this.loading = state.loading;
    });
  }

  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, {
      data: {
        title: 'Agregar curso',
      },
    });

    dialog
      .afterClosed()
      .subscribe(
        (newCourse: {
          title: string;
          category: string;
          duration: string;
          price: number;
        }) => {
          newCourse && this.store.dispatch(createCourse({ data: newCourse }));
        }
      );
  }

  editCourse(course: Course) {
    const dialog = this.dialogService.open(CourseDialogComponent, {
      data: {
        title: 'Modificar curso',
        course,
      },
    });

    dialog.afterClosed().subscribe((editCourse: Course) => {
      // editCourse && this.coursesService.editCourse(course.id, editCourse);
    });
  }

  deleteCourse(id: string) {
    // this.coursesService.deleteCourse(id);
  }
}
