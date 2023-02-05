import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { loadCourses, resetCoursesState } from '../../store/course.actions';
import {
  selectIsActiveCoursesArray,
  selectLoadingCourses,
} from '../../store/course.selectors';

@Component({
  selector: 'app-comissions-history-page',
  templateUrl: './comissions-history-page.component.html',
})
export class ComissionsHistoryPageComponent {
  displayedColumns = ['id', 'start', 'end'];

  course: Course | null = null;
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetCoursesState());
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.store.dispatch(loadCourses());

    this.store.select(selectIsActiveCoursesArray).subscribe((state) => {
      const course = state.find((courses) => courses.id === id);

      if (course) {
        this.course = course;
      }
    });

    this.store.select(selectLoadingCourses).subscribe((state) => {
      this.loading = state;
    });
  }
}
