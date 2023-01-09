import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses = new BehaviorSubject<Course[]>([
    new Course(
      1,
      'Angular',
      'Programación',
      '9 semanas',
      'Lunes y Miércoles de 20:30 a 22:30',
      35000
    ),
    new Course(
      2,
      'TypeScript',
      'Programación',
      '6 semanas',
      'Martes y Jueves de 20:30 a 22:30',
      20000
    ),
  ]);
  public courses$ = this.courses.asObservable();

  constructor() {}

  getCourse(id: number) {
    return this.courses.value.find((course) => course.id === id);
  }

  addCourse(newCourse: Course) {
    const lastId = this.courses.value[this.courses.value.length - 1]?.id || 0;

    newCourse.id = lastId + 1;

    this.courses.next([...this.courses.value, newCourse]);
  }

  editCourse(id: number, editCourse: Course) {
    const editedCourse = this.courses.value.map((course) => {
      if (id === course.id) {
        return { ...course, ...editCourse };
      }
      return course;
    });

    this.courses.next(editedCourse);
  }

  deleteCourse(id: number) {
    const deletedCourse = this.courses.value.filter(
      (course) => course.id !== id
    );

    this.courses.next(deletedCourse);
  }
}
