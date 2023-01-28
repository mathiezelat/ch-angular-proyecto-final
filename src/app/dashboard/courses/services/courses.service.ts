import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses = new BehaviorSubject<Course[]>([]);
  public courses$ = this.courses.asObservable();

  private apiURL = `${environment.apiUrl1}/courses`;

  constructor(private readonly http: HttpClient) {
    this.getCourses();
  }

  getCourse(id: string) {
    return this.courses.value.find((course) => course.id === id);
  }

  getCourses() {
    this.http.get<Course[]>(this.apiURL).subscribe((courses) => {
      this.courses.next(courses);
    });
  }

  addCourse(newCourse: Course) {
    this.http.post<Course>(this.apiURL, newCourse).subscribe((course) => {
      this.courses.next([...this.courses.value, course]);
    });
  }

  editCourse(id: string, editCourse: Course) {
    this.http
      .put<Course>(`${this.apiURL}/${id}`, editCourse)
      .subscribe((editedCourse) => {
        const editedCourses = this.courses.value.map((course) => {
          if (id === course.id) {
            return editedCourse;
          }
          return course;
        });

        this.courses.next(editedCourses);
      });
  }

  deleteCourse(id: string) {
    this.http.delete(`${this.apiURL}/${id}`).subscribe(() => {
      const deletedCourses = this.courses.value.filter(
        (course) => course.id !== id
      );

      this.courses.next(deletedCourses);
    });
  }
}
