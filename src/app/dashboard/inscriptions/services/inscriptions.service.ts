import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inscription } from '../../../core/models/inscription.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  private inscriptions = new BehaviorSubject<Inscription[]>([]);
  public inscriptions$ = this.inscriptions.asObservable();

  private apiURL = `${environment.apiUrl2}/inscriptions`;

  constructor(private readonly http: HttpClient) {
    this.getInscriptions();
  }

  getInscriptions() {
    this.http.get<Inscription[]>(this.apiURL).subscribe((inscriptions) => {
      this.inscriptions.next(inscriptions);
    });
  }

  addInscription(newInscription: Inscription) {
    this.http
      .post<Inscription>(this.apiURL, newInscription)
      .subscribe((inscription) => {
        this.inscriptions.next([...this.inscriptions.value, inscription]);
      });
  }

  editInscription(id: string, editInscription: Inscription) {
    this.http
      .put<Inscription>(`${this.apiURL}/${id}`, editInscription)
      .subscribe((editedInscription) => {
        const editedInscriptions = this.inscriptions.value.map(
          (inscription) => {
            if (editedInscription.id === inscription.id) {
              return editedInscription;
            }

            return inscription;
          }
        );

        this.inscriptions.next(editedInscriptions);
      });
  }

  deleteInscription(id: string) {
    this.http.delete(`${this.apiURL}/${id}`).subscribe(() => {
      const deletedInscriptions = this.inscriptions.value.filter(
        (inscription) => id !== inscription.id
      );

      this.inscriptions.next(deletedInscriptions);
    });
  }
}
