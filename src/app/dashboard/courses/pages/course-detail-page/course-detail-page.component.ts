import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetCoursesState, loadCourses } from '../../store/course.actions';
import {
  selectIsActiveCoursesArray,
  selectLoadingCourses,
} from '../../store/course.selectors';

@Component({
  selector: 'app-course-detail-page',
  templateUrl: './course-detail-page.component.html',
})
export class CourseDetailPageComponent implements OnInit, OnDestroy {
  course: Course | null = null;
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
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
