import { Injectable } from '@angular/core';
import { Student } from '../../../core/models';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students = new BehaviorSubject<Student[]>([]);
  public students$ = this.students.asObservable();

  private apiURL = `${environment.apiUrl1}/students`;

  constructor(private readonly http: HttpClient) {
    this.getStudents();
  }

  getStudents() {
    this.http.get<Student[]>(this.apiURL).subscribe((students) => {
      this.students.next(students);
    });
  }

  addStudent(newStudent: Student) {
    this.http.post<Student>(this.apiURL, newStudent).subscribe((student) => {
      this.students.next([...this.students.value, student]);
    });
  }

  editStudent(id: string, editStudent: Student) {
    this.http
      .put<Student>(`${this.apiURL}/${id}`, editStudent)
      .subscribe((editedStudent) => {
        const editedStudents = this.students.value.map((student) => {
          if (editedStudent.id === student.id) {
            return editedStudent;
          }

          return student;
        });

        this.students.next(editedStudents);
      });
  }

  deleteStudent(id: string) {
    this.http.delete(`${this.apiURL}/${id}`).subscribe(() => {
      const deletedStudents = this.students.value.filter(
        (student) => id !== student.id
      );

      this.students.next(deletedStudents);
    });
  }
}
