import { Course } from './course.model';
import { Student } from './student.model';

export class Inscription {
  constructor(
    public id: string,
    public course: Course,
    public students: Student[]
  ) {}
}
