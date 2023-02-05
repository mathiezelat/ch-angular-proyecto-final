import { Timestamp } from 'firebase/firestore';
import { Course } from '../../courses/models/course.model';
import { Student } from '../../students/models/student.model';

export interface Commission {
  id?: string;
  course: Course;
  students: Student[];
  start: Timestamp;
  end: Timestamp;
  isActive: boolean;
}
