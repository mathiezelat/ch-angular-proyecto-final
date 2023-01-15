import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionsService } from '../../services/inscriptions.service';
import { tap, BehaviorSubject } from 'rxjs';
import { Student } from '../../../../core/models/student.model';

@Component({
  selector: 'app-students-list-page',
  templateUrl: './students-list-page.component.html',
})
export class StudentsListPageComponent implements OnInit {
  private students = new BehaviorSubject<Student[]>([]);
  public students$ = this.students.asObservable();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly inscriptionsService: InscriptionsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.inscriptionsService.getInscription(id).subscribe((inscription) => {
      this.students.next(inscription?.students || []);
    });
  }

  displayedColumns = ['id', 'firstName', 'lastName', 'dni', 'isActive'];
}
