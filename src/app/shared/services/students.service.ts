import { Injectable } from '@angular/core';
import { Student } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  public students: Student[] = [
    new Student(1, 'John', 'Cena', '12345678', 6, true),
  ];

  constructor() {}

  getStudents() {
    return this.students;
  }

  addStudent(student: Student) {
    const lastId = this.students[this.students.length - 1]?.id || 0;

    const newStudent = new Student(
      lastId + 1,
      student.firstName,
      student.lastName,
      student.dni,
      student.note,
      student.isActive
    );

    this.students = [...this.students, newStudent];
  }

  editStudent(id: number, editStudent: Student) {
    this.students = this.students.map((stu) => {
      if (stu.id === id) {
        return { ...stu, ...editStudent };
      }

      return stu;
    });
  }

  removeStudent(id: number) {
    this.students = this.students.filter((student) => student.id !== id);
  }
}
